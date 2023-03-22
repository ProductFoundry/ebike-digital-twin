/* EBike Tire */
define('js/mechanics/Motor', [], function () {

    function Motor() {
        this.position = null;
        this.current = null;
        this.timestamp = null;
    }

    Motor.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    Motor.prototype.init = function () {
    }

    return Motor;

})