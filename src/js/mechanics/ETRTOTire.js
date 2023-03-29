/* EBike Tire */
define('js/mechanics/ETRTOTire', [], function () {

    function ETRTOTire() {
    }

    ETRTOTire.prototype.init = function () {
        if (this.radius && this.rimDiameter) {
            this.tireCircumference = ((2 * this.radius) + this.rimDiameter) * 3.14;
        }
    }

    return ETRTOTire;

})