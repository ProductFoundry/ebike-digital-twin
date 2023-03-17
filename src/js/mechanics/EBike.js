/* Model of the physical EBike */
define('js/mechanics/EBike', [], function () {

    function EBike() {
        this.id = null;
        this.name = null;
        this.frontSprockets = null;
        this.rearSprockets = null;
        this.rearShiftingSystemSpecId = null;
        this.motorPosition = null;
        this.crankLength = null;
        this.tireSpecId = null;
        this.tire = null;
        this.supportSetting = null;
        this.availableSupportSettings = null;
        this.cadence = null;
        this.torque = null;
        this.rpm = null;
    }

    EBike.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    EBike.prototype.init = function () {
        if (this.rearShiftingSystem) {
            if (this.rearShiftingSystem.type === "hub" || this.rearShiftingSystem.type === "box") {
                if (this.frontSprockets && this.rearSprockets) {
                    this.primaryGearRatio = this.frontSprockets / this.rearSprockets;
                } else {
                    console.error("Front and rear sprocket specification not available");
                }
            } else if (this.rearShiftingSystem.type === "derailleur") {
                // Get selected front and rear sprocket
            }
        } else if (this.frontShiftingSystem) {
            console.error("Front shifting system calculations missing");
        } else {
            // Single speed 
            if (this.frontSprockets && this.rearSprockets) {
                this.primaryGearRatio = this.frontSprockets / this.rearSprockets;
            } else {
                console.error("Front and rear sprocket specification not available");
            }
        }
        this.tire.init();

    }

    return EBike;

})