/* Official Bicycle Specification
 */

define('BicycleSpecification', ['ETRTOTireSpecification'], function (ETRTOTireSpecification) {
  function BicycleSpecification(etrto) {
    this.etrtoSpecification = new ETRTOTireSpecification(etrto);
  }

  return BicycleSpecification;
});