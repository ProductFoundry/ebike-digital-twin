/* Model of the physical EBike */
define('js/mechanics/EBike', [], function () {

    function EBike() {
    }

    EBike.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    return EBike;

})