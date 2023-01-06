function password() {
  document.getElementById("login-form-submit").addEventListener("click", () => {
    let data = { username: username.value, birthdate: birthdate.value };
    fetch(`/passwordlookup`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        document.getElementById("passwordlookup").value = res[0].password;
      });
  });
}

password();
