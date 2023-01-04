const url = "/calendar";

let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
let utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // uct 표준시 도출
let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

let thisMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate()
);

let daynum = document.querySelectorAll(".fc-daygrid-day-number");

var calendarEl = document.getElementById("calendar");
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",
  events: "/calendar/re", //서버url
  dateClick: function (info) {
    let num =
      info.date.getFullYear() +
      "" +
      (info.date.getMonth() + 1) +
      info.date.getDate();
    location.href = `/accountNote/${num}`;
  },
});
calendar.render();

function dayPrice() {
  fetch(`${url}/re`)
    .then((res) => res.json())
    .then((res) => {
      if (res.length) {
        let total = 0;
        for (let i = 0; i < res.length; i++) {
          total += parseInt(res[i].title);
        }
        totalprice.innerText = "총 금액 : " + total + " 원";
      }
    });
}
dayPrice();
