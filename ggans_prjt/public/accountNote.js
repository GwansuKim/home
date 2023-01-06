const url = window.location.pathname;

let today =
  url.toString().slice(13).substring(0, 4) +
  "-" +
  url.toString().substring(17, 19) +
  "-" +
  ("00" + url.toString().slice(13).substring(6)).slice(-2);

buydate.value = today;

oneselect();
insert();
remove();
update();

function insert() {
  let addbtn = document.getElementById("insbtn");
  addbtn.addEventListener("click", function () {
    let data = {
      buydate: buydate.value,
      wherebuy: wherebuy.value,
      item: item.value,
      category: category.value,
      price: price.value,
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.reload();
      });
  });
}

function remove() {
  tbody.addEventListener("click", function (ev) {
    let id = ev.target
      .closest("tr")
      .children[0].getElementsByTagName("input")[0].value;
    if (ev.target.id == "delbtn") {
      fetch(`${url}/${id}`, { method: "DELETE" }).then(() => {
        window.location.reload();
      });
    }
  });
}

function oneselect() {
  tbody.addEventListener("click", function (ev) {
    if (ev.target.id == "selbtn") {
      let id = "";
      id = ev.target
        .closest("tr")
        .children[0].getElementsByTagName("input")[0].value;
      tfoot.querySelector("input").value = "";
      wherebuy.value = "";
      item.value = "";
      category.value = "";
      price.value = "";
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          tfoot.querySelector("input").value = res[0].no;
          buydate.value = res[0].dt;
          wherebuy.value = res[0].wherebuy;
          item.value = res[0].item;
          category.value = res[0].category;
          price.value = res[0].price;
        });
    }
  });
}

function update() {
  tfoot.addEventListener("click", function (ev) {
    if (ev.target.id == "updbtn") {
      let data = {
        buydate: buydate.value,
        wherebuy: wherebuy.value,
        item: item.value,
        category: category.value,
        price: price.value,
      };
      let id = ev.target
        .closest("tr")
        .children[0].getElementsByTagName("input")[0].value;

      fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.changedRows > 0) {
            alert("수정 완료");
            window.location.reload();
          } else {
            alert("수정 실패");
            window.location.reload();
          }
        })
        .catch(() => {
          alert("오류");
          window.location.reload();
        });
    }
  });
}

document.getElementById("backbtn").addEventListener("click", () => {
  window.history.back();
});
