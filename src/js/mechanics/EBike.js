/* Model of the physical EBike */
define('js/mechanics/EBike', [], function () {

    function EBike() {
        this.id = null;
        this.name = null;
        this.frontSprocket = null;
        this.rearSprocket = null;
        this.rearShiftingSystemSpecId = null;
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
        this.torqueSensor.position = this.torqueSensorPosition;
        this.cadenceSensor.position = this.cadenceSensorPosition;
        this.motor.position = this.motorPosition;
        delete this.torqueSensorPosition;
        delete this.cadenceSensorPosition;
        delete this.motorPosition;
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
        if (this.frontSprocket && this.rearSprocket) {
            // Else it could be the rig with given PGR
            this.primaryGearRatio = this.frontSprocket / this.rearSprocket;
        }
        this.tire.init();
        this.torqueSensor.init(this);
    }

    EBike.prototype.setSelectedGear = function (position, selectedGear) {
        if (position === "front") {
            this.frontShiftingSystem.selectedGear = selectedGear;
            if (this.frontShiftingSystem.type === "derailleur") {
                this.primaryGearRatio = selectedGear / this.rearSprocket;
            } else {
                this.secondaryGearRatio = selectedGear;
            }
        } else if (position === "rear") {
            this.rearShiftingSystem.selectedGear = selectedGear;
            if (this.rearShiftingSystem.type === "derailleur") {
                this.primaryGearRatio = this.frontSprocket / selectedGear;
            } else {
                this.secondaryGearRatio = selectedGear;
            }
        }
    }

    EBike.prototype.getEffectiveGearRatio = function () {
        if (!this.primaryGearRatio || !this.secondaryGearRatio) {
            console.error("Gear ratio error");
        }
        return this.primaryGearRatio * this.secondaryGearRatio;
    }

    EBike.prototype.setTorqueReading = function () {
    }

    EBike.prototype.setCadenceReading = function () {
    }

    return EBike;

})