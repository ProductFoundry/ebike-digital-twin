/* Model of the Shifting System */
define('js/mechanics/ShiftingSystem', [], function () {

    function ShiftingSystem() {
    }

    ShiftingSystem.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    return ShiftingSystem;

})