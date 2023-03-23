/* EBike Tire */
define('js/mechanics/Motor', [], function () {

    function Motor() {
        this.position = null;
        this.current = null;
        this.timestamp = null;
        this.torqueCoefficient = 2300;
        this.torque = null;
    }

    Motor.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    Motor.prototype.init = function () {
    }

    Motor.prototype.getTorque = function () {
        const ktsi = (this.torqueCoefficient * 2 * 3.14)/60 // rpm/v to rad/s
        const kv = 1/ktsi;
        const torque = kv * this.current;
        return torque;
    }

    Motor.prototype.setCurrent = function (current) {
        this.current = current;
        this.torque = this.getTorque();
    }
    return Motor;

})