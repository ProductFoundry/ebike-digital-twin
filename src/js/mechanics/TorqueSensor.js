/* EBike Tire */
define('js/mechanics/TorqueSensor', [], function () {

    function TorqueSensor() {
        this.position = null;
        this.reading = null;
        this.timestamp = null;
    }

    TorqueSensor.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    TorqueSensor.prototype.init = function () {
    }

    return TorqueSensor;

})