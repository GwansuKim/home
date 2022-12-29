const url = "/customers";

selectAll();
insert();
remove();
update();
oneselect();

function selectAll() {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      //list 클리어
      list.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        const tr = `
          <tr data-id="${res[i].id}">
            <td><input type="checkbox" /></td>
            <td>${res[i].id}</td>
            <td>${res[i].name}</td>
            <td>${res[i].email}</td>
            <td>${res[i].phone}</td>
            <td>${res[i].address}</td>
            <td>
            <button id="delbtn">삭제</button>
            <button id="selbtn">조회</button>
            </td>
          </tr>
          `;
        list.innerHTML += tr;
      }
    });
}

function insert() {
  let addbtn = document.getElementsByClassName("btn");
  addbtn[0].addEventListener("click", function () {
    let data = {
      id: id.value,
      name: name1.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        selectAll();
      });
  });
}

function remove() {
  list.addEventListener("click", function (ev) {
    let id = ev.target.closest("tr").children[1].innerText;
    if (ev.target.id == "delbtn") {
      fetch(`${url}/${id}`, { method: "DELETE" }).then(() => {
        selectAll();
      });
    }
  });
}

function oneselect() {
  list.addEventListener("click", function (ev) {
    let id = ev.target.closest("tr").children[1].innerText;
    if (ev.target.id == "selbtn") {
      fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then((res) => {
          document.getElementsByClassName("form-control")[0].value = res.id;
          name1.value = res.name;
          email.value = res.email;
          phone.value = res.phone;
          address.value = res.address;
        });
    }
  });
}

function update() {
  let addbtn = document.getElementsByClassName("btn");
  addbtn[1].addEventListener("click", function () {
    let data = {
      id: id.value,
      name: name1.value,
      email: email.value,
      phone: phone.value,
      address: address.value,
    };
    fetch(`${url}/${id.value}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        selectAll();
      });
  });
}
