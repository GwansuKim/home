const url = "/calendar";

document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    expandRows: true,
    headerToolbar: {
      left: "prevYear,prev",
      center: "title",
      right: "today next,nextYear",
    },
    showNonCurrentDates: false,
    initialView: "dayGridMonth",
    events: "/calendar/re", //서버url
    dateClick: function (info) {
      let num =
        info.date.getFullYear() +
        "" +
        ("00" + (info.date.getMonth() + 1).toString()).slice(-2) +
        info.date.getDate();
      location.href = `/accountNote/${num}`;
    },
    locale: "ko",
    selectable: true,
  });
  calendar.render();

  /* document
    .getElementsByClassName("fc-next-button")[0]
    .addEventListener("click", function () {
      calendar.prev(); // call method
      totalPrice();
    });

  document
    .getElementsByClassName("fc-prev-button")[0]
    .addEventListener("click", function () {
      calendar.next(); // call method
      totalPrice();
    }); */

  btnout.addEventListener("click", () => {
    location.href = "/logout";
  });

  totalPrice();
  monthlycategory();

  function totalPrice() {
    fetch(`${url}/re`)
      .then((res) => res.json())
      .then((res) => {
        if (res.length) {
          document.getElementById("totalbtn").addEventListener("click", () => {
            let ym =
              calendar.getDate().getFullYear() +
              "" +
              (calendar.getDate().getMonth() + 1);
            let total = 0;
            for (let i = 0; i < res.length; i++) {
              if (res[i].concat == ym) {
                total += parseInt(res[i].title);
              }
            }
            document.getElementById("totalprice").innerText =
              "총 금액 : " + total + " 원";
          });
        }
      });
  }

  function monthlycategory() {
    monthly.addEventListener("click", () => {
      let md = calendar.getDate();
      location.href =
        "/monthlycategory/" + md.getFullYear() + "" + (md.getMonth() + 1);
    });
  }
});
