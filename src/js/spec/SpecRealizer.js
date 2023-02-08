/* Reads Specs and realizes the entity
 */
define(['js/spec/BicycleSpecification',
    'js/spec/ShiftingSystemSpecification',
    'js/spec/ETRTOTireSpecification',
    'js/mechanics/EBike',
    'js/mechanics/ShiftingSystem',
    'js/mechanics/ETRTOTire'
],
    function (BicycleSpecification,
        ShiftingSystemSpecification,
        ETRTOTireSpecification,
        EBike,
        ShiftingSystem,
        ETRTOTire) {

        function SpecRealizer(ebikeSpecId) {
            this.ebikeSpecId = ebikeSpecId;
            this.ebikeSpec = new BicycleSpecification().getSpec(this.ebikeSpecId);
            this.ebike = new EBike();
            this.realize(this.ebike, this.ebikeSpec);
        }

        SpecRealizer.prototype.realize = function (entity, spec) {
            const attributes = Object.keys(spec).filter(k => k !== "id");
            attributes.forEach(a => {
                if (a.indexOf("SpecId") > -1) {
                    const Specification = this.getSpecClass(a);
                    const specification = new Specification();
                    const Entity = this.getEntityClass(a);
                    const aName = a.substring(0, a.indexOf("SpecId"));
                    entity.addAttribute(aName, new Entity());
                    this.realize(entity[aName], specification);
                } else {
                    entity.addAttribute(a, spec[a]);
                }
            })
        }

        SpecRealizer.prototype.specMap = {
            "rearShiftingSystemSpecId": ShiftingSystemSpecification,
            "tireSpecId": ETRTOTireSpecification
        }

        SpecRealizer.prototype.entityMap = {
            "rearShiftingSystemSpecId": ShiftingSystem,
            "tireSpecId": ETRTOTire
        }

        SpecRealizer.prototype.getSpecClass = function (specIdAttribute) {
            return this.specMap[specIdAttribute];
        }

        SpecRealizer.prototype.getEntityClass = function (specIdAttribute) {
            return this.entityMap[specIdAttribute];
        }

        SpecRealizer.prototype.getRealAttributes = function (spec) {
            const entity = {};
            const keys = Object.keys(this.spec).filter(k => k !== "id");
            keys.forEach(k => entity[k] = spec[k]);
            return entity;
        };

        return SpecRealizer;
    });