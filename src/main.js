define('main', ['js/runner/DataFileReader',
  'js/runner/MachinePropagation',
  'js/spec/SpecRealizer',
  'js/tools/Draggable',
  'js/tools/Gsap'],
  function (DataFileReader, MachinePropagation, SpecRealizer, Draggable, gsap) {
    gsap.gsap.registerPlugin(Draggable);
    let timer;
    function getValues(dvalues, u) {
      let values = [], unit = u ? u : 1;
      if (dvalues.indexOf("[") > -1) {
        const start = parseInt(dvalues.substring(1, dvalues.indexOf("-")));
        const end = parseInt(dvalues.substring(dvalues.indexOf("-") + 1, dvalues.length));
        for (let i = start; i <= end; i += unit) {
          values.push(i);
        }
      } else {
        values = inputslider.dataset.values.split(',')
      }
      return values;
    }


    document.querySelectorAll('.inputslider').forEach(
      (inputslider) => {
        let unit = 1;
        if (inputslider.dataset.unit) {
          unit = parseInt(inputslider.dataset.unit);
        }
        let values = getValues(inputslider.dataset.values, unit);

        let value = parseFloat(inputslider.dataset.value),
          min = parseFloat(values.first()),
          max = parseFloat(values.last()),
          input = inputslider.querySelector('input'),
          area = inputslider.querySelector('.area'),
          knob = inputslider.querySelector('.knob'),
          fill = inputslider.querySelector('.fill');


        values.forEach(
          (value, i) => {
            values[i] = value = parseFloat(value);

            let span = document.createElement('span');
            span.innerText = value;
            span.setAttribute('data-value', value);

            if (i == 0) {
              span.addClass('selected');
              input.value = value;
            }

            span.style.left = gsap.gsap.utils.mapRange(min, max, 0, 100, value) + '%';

            inputslider.querySelector('.values').appendChild(span);
          }
        );

        Draggable.default.create(knob, {
          type: 'x',
          edgeResistance: 1,
          bounds: area,
          throwProps: false,
          onDrag: function () {
            handleInputslider(this, false, unit);
          },
          onDragEnd: function () {
            handleInputslider(this, false, unit);
          }
        }
        );
      }
    );



    function handleInputslider(instance, snap, unit) {

      let inputslider = instance.target.closest('.inputslider'),
        fill = inputslider.querySelector('.fill'),
        values = getValues(inputslider.dataset.values, unit),
        min = parseFloat(values.first()),
        max = parseFloat(values.last()),
        xPercent = gsap.gsap.utils.mapRange(0, instance.maxX, 0, 100, instance.x),
        relativeValue = gsap.gsap.utils.mapRange(0, instance.maxX, min, max, instance.x),
        finalValue = gsap.gsap.utils.snap(values, relativeValue),
        snapX = gsap.gsap.utils.mapRange(min, max, 0, instance.maxX, finalValue),
        fillWidth = gsap.gsap.utils.mapRange(0, instance.maxX, 0, 100, snapX);

      if (snap) {
        gsap.gsap.to(instance.target, { duration: .2, x: snapX });
        gsap.gsap.to(fill, { duration: .2, width: fillWidth + '%' });
      } else {
        values.forEach(
          (value, i) => {
            values[i] = parseFloat(value);
          }
        );
      }
      fill.style.width = xPercent + '%';
      inputslider.querySelectorAll('.values span').forEach(
        (span) => {
          if (parseFloat(span.dataset.value) == finalValue) {
            span.addClass('selected');
          } else {
            span.removeClass('selected');
          }
        }
      );

      inputslider.querySelector('input').value = finalValue;
    }
    $("#start").on("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      const start = $(e.currentTarget);
      if (start.hasClass("started")) {
        start.removeClass("started");
        start.addClass("btn-primary");
        start.removeClass("btn-secondary");
        start[0].innerHTML = "Start";
        $("#pause").attr("disabled", true);
        timer.stop();
      } else {
        start.addClass("started");
        start.removeClass("btn-primary");
        start.addClass("btn-secondary");
        start[0].innerHTML = "Stop";

        timer = startTimer(0, "timer");
        $("#pause").removeAttr("disabled");
        $("#pause").off("click");
        $("#pause").on("click", function (event) {
          event.stopPropagation();
          event.preventDefault();
          const el = $(event.currentTarget);
          const paused = el.hasClass("paused")
          if (!paused) {
            timer.pause();
            el.addClass("paused");
            el.removeClass("btn-primary");
            el.addClass("btn-danger");
            el[0].innerHTML = "Resume";
          } else {
            timer.resume();
            el.removeClass("paused");
            el.addClass("btn-primary");
            el.removeClass("btn-danger");
            el[0].innerHTML = "Pause";

          }
        })
      }
    })

    const fileInput = $(".files")
    const reportTable = $("#assets tbody");
    let mpArray = new Array();
    const specRealizer = new SpecRealizer("Ebike Model 1");
    $(fileInput).on('change', (e) => {
      const { files } = e.target;
      const f = new DataFileReader(files[0]);
      const check = function () {
        const events = f.getEvents();
        if (events) {
          events.forEach((event, i) => {
            mpArray[i] = new MachinePropagation(event.bikeSpecification, event.timestamp, event.numRotation);
          });
          mpArray.forEach(a => {
            const tr = $("<tr></tr>")
            $(tr).append("<td>" + a.bike.etrtoSpecification.etrtoValue + "</td>")
              .append("<td>" + new Date(a.timestamp * 1000).toTimeString().split(" ")[0] + "</td>")
              .append("<td>" + a.wheelRotations + " pm </td>")
              .append("<td>" + a.speed + " kmph </td>")
            $(reportTable).append(tr)
          })
          return;
        }
        setTimeout(check, 1000);
      }

      check();


    });


  });