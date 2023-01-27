/* Reads Specs and realizes the entity
 */
define('SpecRealizer', ['text!./specs/ebikes.json'], function (ebikes) {

    function SpecRealizer(ebikeId) {
        const ebikeSpecs = JSON.parse(ebikes).ebikes;
        const ebike = ebikeSpecs.filter(e => e.id === ebikeId)[0];
        console.log("Create new instance");
    }




    SpecRealizer.prototype.getEvents = function () {
        return this.events;
    };

    return SpecRealizer;
});