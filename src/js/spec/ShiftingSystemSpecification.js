/* Official Bicycle Specification
 */

define('js/spec/ShiftingSystemSpecification', ['js/spec/Specification'], function (Specification) {
  function ShiftingSystemSpecification() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.specs = JSON.parse(xhttp.responseText).shiftingSystems;
      }
    };
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/f786ddb6-c634-4c8b-99c6-e1ea33fb3928", false);
    xhttp.send();
  }

  ShiftingSystemSpecification.prototype.getSpec = function (shiftingSystemId) {
    return new Specification().getSpec.call(this, shiftingSystemId)
  }

  return ShiftingSystemSpecification;
});