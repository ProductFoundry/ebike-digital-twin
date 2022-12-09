define('main', ['DataFileReader', 'MachinePropagation'], function (DataFileReader, MachinePropagation) {
  const fileInput = $(".files")
  const reportTable = $("#assets tbody");
  let mpArray = new Array();
  $(fileInput).on('change', (e) => {
    const { files } = e.target;
    const f = new DataFileReader(files[0]);
    const check = function () {
      const events = f.getEvents();
      if (events) {
        events.forEach((event,i) => {
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