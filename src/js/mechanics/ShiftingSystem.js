/* Model of the Shifting System */
define([], function () {

    function ShiftingSystem() {        
    }

    ShiftingSystem.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    return ShiftingSystem;

})