/* Official ETRTO Code
 */

define('js/spec/CadenceSensorSpecification', ['js/spec/Specification'], function (Specification) {
  function CadenceSensorSpecification() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.specs = JSON.parse(xhttp.responseText).cadenceSensors;
      }
    };
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/d7024f84-8aa4-45f7-b1b0-37519cbbaaea", false);
    xhttp.send();
  }

  CadenceSensorSpecification.prototype.getSpec = function (specId) {
    return new Specification().getSpec.call(this, specId)
  }

  return CadenceSensorSpecification;
});