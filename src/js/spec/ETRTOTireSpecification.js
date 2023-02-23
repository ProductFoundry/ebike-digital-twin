/* Official ETRTO Code
 */

define('js/spec/ETRTOTireSpecification', ['js/spec/Specification'], function (Specification) {
  function ETRTOTireSpecification() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.specs = JSON.parse(xhttp.responseText).ebikes;
      }
    };
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/05366cd9-963e-4692-bee7-d11a1384f381", true);
    xhttp.send();
  }

  ETRTOTireSpecification.prototype.getSpec = function (tireId) {
    return new Specification().getSpec.call(this, tireId)
  }

  return ETRTOTireSpecification;
});