/* Reads Specs and realizes the entity
 */
define(['js/spec/BicycleSpecification', 'js/mechanics/EBike'], function (BicycleSpecification, EBike) {

    function SpecRealizer(ebikeId) {
        this.ebikeSpecId = ebikeId;
        this.ebikeSpec = new BicycleSpecification().getSpec(this.ebikeSpecId);
        const attributes = Object.keys(this.ebikeSpec).filter(k => k !== "id");
        const ebike = new EBike();
        attributes.forEach(a => {
            ebike.addAttribute(a, this.ebikeSpec[a]);
        })
    }


    SpecRealizer.prototype.getEvents = function () {
        return {};
    };

    return SpecRealizer;
});