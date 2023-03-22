/* Model of the physical EBike */
define('js/mechanics/EBike', [], function () {

    function EBike() {
        this.id = null;
        this.name = null;
        this.frontSprocket = null;
        this.rearSprocket = null;
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
        this.motorPosition = null;
        this.torqueSensorPosition = null;
    }

    EBike.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    EBike.prototype.init = function () {
        if (this.rearShiftingSystem) {
            if (this.rearShiftingSystem.type === "derailleur") {
                this.rearSprocket = this.rearShiftingSystem.selectedGear;
            }
        }
        if (this.frontShiftingSystem) {
            if (this.frontShiftingSystem.type === "derailleur") {
                this.frontSprocket = this.frontShiftingSystem.selectedGear;
            }
        }
        this.primaryGearRatio = this.frontSprocket / this.rearSprocket;
        this.tire.init();
    }

    EBike.prototype.setSelectedGear = function (position, selectedGear) {
        if (position === "front") {
            this.frontShiftingSystem.selectedGear = selectedGear;
            if (this.frontShiftingSystem.type === "derailleur") {
                this.primaryGearRatio = selectedGear / this.rearSprocket;
            }
        } else if (position === "rear") {
            this.rearShiftingSystem.selectedGear = selectedGear;
            if (this.rearShiftingSystem.type === "derailleur") {
                this.primaryGearRatio = this.frontSprocket / selectedGear;
            }
        } else {
            // mid
            this.midShiftingSystem.selectedGear = selectedGear;
        }
    }

    EBike.prototype.setTorqueReading = function () {
    }

    EBike.prototype.setCadenceReading = function () {
    }

    return EBike;

})