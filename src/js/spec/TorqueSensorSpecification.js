/* Official ETRTO Code
 */

define('js/spec/TorqueSensorSpecification', ['js/spec/Specification'], function (Specification) {
  function TorqueSensorSpecification() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.specs = JSON.parse(xhttp.responseText).torqueSensors;
      }
    };
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/c7ba76ff-b867-458a-8ed0-b994a1d58422", false);
    xhttp.send();
  }

  TorqueSensorSpecification.prototype.getSpec = function (specId) {
    return new Specification().getSpec.call(this, specId)
  }

  return TorqueSensorSpecification;
});