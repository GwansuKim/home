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
  let date = new Date(); // 현재 날짜(로컬 기준) 가져오기
  let utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // uct 표준시 도출
  let kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
  let today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

  let thisMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  // 달력에서 표기하는 날짜 객체

  let currentYear = thisMonth.getFullYear(); // 달력에서 표기하는 연
  let currentMonth = thisMonth.getMonth(); // 달력에서 표기하는 월
  let currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

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
    let startDay = new Date(currentYear, currentMonth, 0);
    let prevDate = startDay.getDate();
    let prevDay = startDay.getDay();

    // 이번 달의 마지막날 날짜와 요일 구하기
    let endDay = new Date(currentYear, currentMonth + 1, 0);
    let nextDate = endDay.getDate();
    let nextDay = endDay.getDay();

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
      calendar.innerHTML += '<div class="day current">' + i + "<BR> </div>";
    }
    // 다음달
    for (let i = 1; i <= (7 - nextDay == 7 ? 0 : 7 - nextDay); i++) {
      calendar.innerHTML =
        calendar.innerHTML + '<div class="day next disable">' + i + "</div>";
    }

    // 오늘 날짜 표기
    if (today.getMonth() == currentMonth) {
      todayDate = today.getDate();
      let currentMonthDate = document.querySelectorAll(".dates .current");
      currentMonthDate[todayDate - 1].classList.add("today");
    }
    getTotal();
    getDay();
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

  function getTotal() {
    let data = thisMonth.getFullYear() + "" + (thisMonth.getMonth() + 1);
    fetch(`${url}/re`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ month: data }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.length) {
          wel_user.innerHTML = res[0].username + "'s<BR>소비 노트";
          let total = 0;
          for (let i = 0; i < res.length; i++) {
            total += res[i].price;
            tt_price.innerHTML = "총액 : " + total;
          }
        } else {
          tt_price.innerHTML = "총액 : 0";
        }
      });
  }
  function getDay() {
    currentYear = thisMonth.getFullYear();
    currentMonth = thisMonth.getMonth();
    let endDay = new Date(currentYear, currentMonth + 1, 0);
    let nextDate = endDay.getDate();
    for (let i = 0; i < nextDate; i++) {
      let daily = document.querySelectorAll(".current");
      let data =
        thisMonth.getFullYear() +
        "" +
        (thisMonth.getMonth() + 1) +
        daily[i].innerText;
      fetch(`${url}/dt`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ day: data }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.length) {
            for (let j = 0; j < res.length; j++) {
              let a = 0;
              a += res[j].price;
              daily[i].innerHTML =
                '<div class="day current">' + (i + 1) + "<br>" + a + "</div>";
            }
          }
        });
    }
  }

  let current = document.getElementsByClassName("dates");
  current[0].addEventListener("click", (ev) => {
    if (ev.target.classList.contains("current")) {
      let num =
        thisMonth.getFullYear() +
        "" +
        (thisMonth.getMonth() + 1) +
        ev.target.innerHTML;
      location.href = `/accountNote/${num}`;
    }
  });
}
