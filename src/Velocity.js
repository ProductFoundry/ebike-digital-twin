/* The directional speed of an object in motion
 */
define('Velocity', ['Position'], function (Position) {
  // const Position = require('./Position');

  function Velocity(speed, dir, ts) {
    this.speed = speed;
    this.direction = dir;
    this.timestamp = ts;
  }

  Velocity.prototype.calcVelocity = function (p1, p2) {
    const pos1 = new Position(p1.latitude, p1.longitude, p1.timestamp);
    const pos2 = new Position(p2.latitude, p2.longitude, p2.timestamp);
    const distance = pos2.getDistanceFrom(pos1);
    const timeTaken = (pos2.timestamp - pos1.timestamp) / (60 * 60 * 1000);

    const radiansToDegree = (latLong) => {
      return (latLong * 180.0 / Math.PI);
    }

    const lng2 = p2.longitude;
    const lng1 = p1.longitude;
    const lat1 = p1.latitude;
    const lat2 = p2.latitude;
    const dLon = (lng2 - lng1);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let brng = radiansToDegree((Math.atan2(y, x)));
    brng = (360 - ((brng + 360) % 360));

    this.speed = distance / timeTaken;
    this.direction = brng;
    this.timestamp = p2.timestamp;

    return this;
  }
  return Velocity;
});