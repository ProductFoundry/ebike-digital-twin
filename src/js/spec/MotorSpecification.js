/* Official ETRTO Code
 */

define('js/spec/MotorSpecification', ['js/spec/Specification'], function (Specification) {
  function MotorSpecification() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.specs = JSON.parse(xhttp.responseText).motors;
      }
    };
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/6483cc6c-06be-4aee-b8bc-7d8c1a69441e", false);
    xhttp.send();
  }

  MotorSpecification.prototype.getSpec = function (specId) {
    return new Specification().getSpec.call(this, specId)
  }

  return MotorSpecification;
});