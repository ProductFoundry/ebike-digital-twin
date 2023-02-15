/* Official Bicycle Specification
 */

define('js/spec/ShiftingSystemSpecification', ['text!./../../specs/shiftingSystems.json', './Specification'], function (shiftingSystems, Specification) {
  function ShiftingSystemSpecification() {
    this.specs = JSON.parse(shiftingSystems).shiftingSystems;
  }

  ShiftingSystemSpecification.prototype.getSpec = function (shiftingSystemId) {
    Specification.call(this, shiftingSystemId)
  }

  return ShiftingSystemSpecification;
});