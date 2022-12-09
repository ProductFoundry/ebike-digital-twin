/* Official ETRTO Code
 */

define('ETRTOTireSpecification', function () {
  function ETRTOTireSpecification(etrtoValue) {
    this.etrtoValue = etrtoValue;
    this.tireCircumference = this.calculateTireCircumference();
  }

  ETRTOTireSpecification.prototype.calculateTireCircumference = function () {
    const tireDiameter = parseInt(this.etrtoValue.split("-")[0]);
    const rimDiameter = parseInt(this.etrtoValue.split("-")[1]);
    return ((2 * tireDiameter) + rimDiameter) * 3.14;
  }
  return ETRTOTireSpecification;
});