/* The Specification Prototype
 */

define([], function (shiftingSystems, Specification) {
  function Specification() {
    this.specs = JSON.parse(shiftingSystems).shiftingSystems;
  }

  Specification.prototype.getSpec = function(specId) {
    const spec = this.specs.filter(e => e.id === specId)[0];
    if (!spec) {
      alert("Invalid spec ID " + specId);
    } else {
      return spec;
    }
  }

  return Specification;
});