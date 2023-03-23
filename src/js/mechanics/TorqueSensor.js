/* EBike Tire */
define('js/mechanics/TorqueSensor', [], function () {

    function TorqueSensor() {
        this.position = null;
        this.reading = null;
        this.timestamp = null;
        this.motorPosition = null;
    }

    TorqueSensor.prototype.addAttribute = function (attribute, value) {
        this[attribute] = value;
    }

    TorqueSensor.prototype.init = function (ebike) {
        this.motorPosition = ebike.motor.position;
        this.getEffectiveGearRatio = ebike.getEffectiveGearRatio;
    }

    TorqueSensor.prototype.getRiderTorque = function () {
        if (this.motorPosition === "crank") {
            if (this.position === "crank") {
                return this.getTotalTorque() - this.getMotorTorque();
            } else if (this.position === "rear") {
                console.error("Missing calculations");
            }
        } else if (this.motorPosition === "rear") {
            if (this.position === "crank") {
                return this.reading;
            } else if (this.position === "rear") {
                const tgt = this.reading;// total geared torque
                const mt = this.getMotorTorque();
                const ght = tgt - mt;
                const effectiveGear = this.ebike.getEffectiveGearRatio();
                const ht = ght / effectiveGear;
                return ht;
            }
        } else {
            console.error("Unknown motor position");
        }

    }
    TorqueSensor.prototype.getMotorTorque = function () {
        if (this.motor) {
            const t = this.getMotorTorque();
            if (!t) console.error("Motor torque error: ", t);
            return
        } else {
            console.error("Motor reference unavailable");
        }
    }
    TorqueSensor.prototype.getTotalTorque = function () {
        if (this.motorPosition === "crank") {
            if (this.position === "crank") {
                return this.reading;
            } else if (this.position === "rear") {
                console.error("Missing calculation of total torque");
            }
        } else if (this.motorPosition === "rear") {
            if (this.position === "crank") {
                console.error("Missing calculation of total torque");
            } else if (this.position === "rear") {
                const tgt = this.reading;
                const mt = this.getMotorTorque();
                const ght = tgt - mt;
                const effectiveGear = this.ebike.getEffectiveGearRatio();
                const ht = ght / effectiveGear;
                const tt = ht + mt;
                return tt;
            }
        }

    }
    return TorqueSensor;
})