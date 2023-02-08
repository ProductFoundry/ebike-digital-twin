/* Official Bicycle Specification
 */

define(['text!./../../specs/shiftingSystems.json'], function (shiftingSystems) {
  function ShiftingSystemSpecification() {
    this.shiftingSpecs = JSON.parse(shiftingSystems).shiftingSystems;
  }

  ShiftingSystemSpecification.prototype.getSpec = function(shiftingSystemId) {
    const shiftingSpec = this.shiftingSpecs.filter(e => e.id === shiftingSystemId)[0];
    if (!shiftingSpec) {
      alert("Invalid shiftingSystem spec ID");
    } else {
      return shiftingSpec;
    }
  }

  return ShiftingSystemSpecification;
});