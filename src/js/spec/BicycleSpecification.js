/* Official Bicycle Specification
 */

define('js/spec/BicycleSpecification', ['js/spec/Specification'], function (Specification) {
  function BicycleSpecification() {  
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (obj) => {
      if (obj.currentTarget.readyState == 4 && obj.currentTarget.status == 200) {
        this.specs = JSON.parse(xhttp.responseText).ebikes;
      } 
    }
    // Sync call
    xhttp.open("GET", "https://api.jsonstorage.net/v1/json/f3dd63ab-aad8-4608-9dbc-df9f7a5b050f/ada06260-47a1-43f6-a3ad-0e2a4524e28e", false);
    xhttp.send();  
  }

  BicycleSpecification.prototype.getSpec =  function (ebikeId) {
    return new Specification().getSpec.call(this, ebikeId);
  }

  BicycleSpecification.prototype.getAllSpecs = function () {
    return this.specs;
  }

  return BicycleSpecification;
});