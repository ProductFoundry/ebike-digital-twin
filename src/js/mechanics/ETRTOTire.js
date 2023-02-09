/* EBike Tire */
define([], function () {

    function ETRTOTire() {
    }

    ETRTOTire.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
        this.calculateTireCircumference();
    }

    ETRTOTire.prototype.calculateTireCircumference = function () {
        if (this.radius && this.rimDiameter) {
            this.tireCircumference = ((2 * this.radius) + this.rimDiameter) * 3.14;
        }
    }

    return ETRTOTire;

})