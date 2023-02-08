/* Official Bicycle Specification
 */

define(['text!./../../specs/ebikes.json'], function (ebikes) {
  function BicycleSpecification() {
    this.ebikeSpecs = JSON.parse(ebikes).ebikes;
  }

  BicycleSpecification.prototype.getSpec = function(ebikeId) {
    const ebikeSpec = this.ebikeSpecs.filter(e => e.id === ebikeId)[0];
    if (!ebikeSpec) {
      alert("Invalid ebike spec ID");
    } else {
      return ebikeSpec;
    }
  }

  return BicycleSpecification;
});