/* Model of the physical EBike */
define([], function () {

    function EBike() {        
    }

    EBike.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    return EBike;

})