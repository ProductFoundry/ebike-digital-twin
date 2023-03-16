/* Reads Specs and realizes the entity
 */
define('js/spec/SpecRealizer',
    ['js/spec/BicycleSpecification',
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
            const bs = new BicycleSpecification();
            this.ebikeSpecId = ebikeSpecId;
            this.ebike = new EBike();
            this.ebikeSpec = bs.getSpec(this.ebikeSpecId);
            this.ebike = this.realize(this.ebike, this.ebikeSpec);
        }

        SpecRealizer.prototype.realize = function (entity, spec) {
            const attributes = Object.keys(spec);
            attributes.forEach(a => {
                if (a.indexOf("SpecId") > -1) {
                    const Specification = this.getSpecClass(a);
                    const specification = new Specification().getSpec(spec[a]);
                    const Entity = this.getEntityClass(a);
                    const aName = a.substring(0, a.indexOf("SpecId"));
                    const child = this.realize(new Entity(), specification);
                    entity.addAttribute(a, spec[a]);
                    entity.addAttribute(aName, child);
                } else {
                    entity.addAttribute(a, spec[a]);
                }
            })
            return entity;
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

        SpecRealizer.prototype.getEbikeEntity = function () {
            return this.ebike;
        }

        return SpecRealizer;
    });