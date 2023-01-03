document.addEventListener("DOMContentLoaded", function () {
  calendarInit();
});
const url = "/calendar";
/*
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
*/

function calendarInit() {
  // 날짜 정보 가져오기
  var date = new Date(); // 현재 날짜(로컬 기준) 가져오기
  var utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // uct 표준시 도출
  var kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
  var today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

  var thisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  // 달력에서 표기하는 날짜 객체

  var currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  var currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
  var currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

  // kst 기준 현재시간
  //console.log(thisMonth.getFullYear());
  //console.log(thisMonth.getMonth() + 1);
  //console.log(thisMonth.getDate());

  // 캘린더 렌더링
  renderCalender(thisMonth);

  function renderCalender(thisMonth) {
    // 렌더링을 위한 데이터 정리
    currentYear = thisMonth.getFullYear();
    currentMonth = thisMonth.getMonth();
    currentDate = thisMonth.getDate();

    // 이전 달의 마지막 날 날짜와 요일 구하기
    var startDay = new Date(currentYear, currentMonth, 0);
    var prevDate = startDay.getDate();
    var prevDay = startDay.getDay();

    // 이번 달의 마지막날 날짜와 요일 구하기
    const endDay = new Date(currentYear, currentMonth + 1, 0);
    var nextDate = endDay.getDate();
    var nextDay = endDay.getDay();

    // console.log(prevDate, prevDay, nextDate, nextDay);

    // 현재 월 표기
    let ym = document.getElementsByClassName("year-month")[0];
    ym.innerHTML = currentYear + "." + (currentMonth + 1);

    // 렌더링 html 요소 생성
    calendar = document.querySelector(".dates");
    calendar.innerHTML = "";

    // 지난달
    for (let i = prevDate - prevDay + 1; i <= prevDate; i++) {
      calendar.innerHTML =
        calendar.innerHTML + '<div class="day prev disable">' + i + "</div>";
    }
    // 이번달
    for (let i = 1; i <= nextDate; i++) {
      calendar.innerHTML += '<div class="day current">' + i + "</div>";
    }
    // 다음달
    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
      calendar.innerHTML =
        calendar.innerHTML + '<div class="day next disable">' + i + "</div>";
    }

    getPrice();

    // 오늘 날짜 표기
    if (today.getMonth() == currentMonth) {
      todayDate = today.getDate();
      var currentMonthDate = document.querySelectorAll(".dates .current");
      currentMonthDate[todayDate - 1].classList.add("today");
    }
  }

  // 이전달로 이동
  document
    .getElementsByClassName("go-prev")[0]
    .addEventListener("click", function () {
      thisMonth = new Date(currentYear, currentMonth - 1, 1);
      renderCalender(thisMonth);
    });

  // 다음달로 이동
  document
    .getElementsByClassName("go-next")[0]
    .addEventListener("click", function () {
      thisMonth = new Date(currentYear, currentMonth + 1, 1);
      renderCalender(thisMonth);
    });

  function getPrice() {
    const data = thisMonth.getFullYear() + "" + (thisMonth.getMonth() + 1);
    fetch(`${url}/re`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ month: data }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          wel_user.innerHTML = res[0].username + "님의 소비노트";
          for (let i = 0; i < res.length; i++) {
            tt_price.innerHTML += res[i].price;
          }
        }
      });
  }
}

let current = document.getElementsByClassName("dates");
current[0].addEventListener("click", (ev) => {
  if (ev.target.classList.contains("current")) {
    let num = ev.target.innerHTML;
    location.href = `/accountNote/${num}`;
  }
});
