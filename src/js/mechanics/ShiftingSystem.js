/* Model of the Shifting System */
define('js/mechanics/ShiftingSystem', [], function () {

    function ShiftingSystem() {
        this.id = null;
        this.type = null;
        this.availableGearRatios = null;
    }

    ShiftingSystem.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    ShiftingSystem.prototype.getSecondaryGearRatio = function () {
        
    }


    return ShiftingSystem;

})