define('main', ['DataFileReader', 'MachinePropagation'], function (DataFileReader, MachinePropagation) {
  let timer;
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