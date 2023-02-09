/* Official ETRTO Code
 */

define(['text!./../../specs/tires.json', './Specification'], function (tires, Specification) {
  function ETRTOTireSpecification() {
    this.specs = JSON.parse(tires).tires;
  }

  ETRTOTireSpecification.prototype.getSpec = function (tireId) {
    Specification.call(this, tireId)
  }

  return ETRTOTireSpecification;
});