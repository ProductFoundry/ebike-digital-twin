/* Official Bicycle Specification
 */

define('js/spec/BicycleSpecification', [], function () {
  function BicycleSpecification() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.ebikeSpecs = JSON.parse(xhttp.responseText).ebikes;
      }
    };
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/ada06260-47a1-43f6-a3ad-0e2a4524e28e", true);
    xhttp.send();
  }

  BicycleSpecification.prototype.getSpec = function (ebikeId) {
    const ebikeSpec = this.ebikeSpecs.filter(e => e.id === ebikeId)[0];
    if (!ebikeSpec) {
      alert("Invalid ebike spec ID");
    } else {
      return ebikeSpec;
    }
  }

  return BicycleSpecification;
});