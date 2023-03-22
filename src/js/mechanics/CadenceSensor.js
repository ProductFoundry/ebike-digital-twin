/* EBike Tire */
define('js/mechanics/CadenceSensor', [], function () {

    function CadenceSensor() {
        this.position = null;
        this.reading = null;
        this.timestamp = null;
    }

    CadenceSensor.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    CadenceSensor.prototype.init = function () {
    }

    return CadenceSensor;

})