/* The Specification Prototype
 */

define('js/spec/Specification', [], function (specs) {
  function Specification() {
  }

  Specification.prototype.getSpec = function (specId) {
    const spec = this.specs.filter(e => e.id === specId)[0];
    if (!spec) {
      alert("Invalid spec ID " + specId);
    } else {
      return spec;
    }
  }

  return Specification;
});