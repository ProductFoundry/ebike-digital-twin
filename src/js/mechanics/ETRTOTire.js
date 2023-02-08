/* Model of the physical EBike */
define([], function () {

    function ETRTOTire() {        
    }

    ETRTOTire.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    return ETRTOTire;

})