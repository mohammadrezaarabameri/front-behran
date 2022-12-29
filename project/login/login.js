const username = document.getElementById("username");
const password = document.getElementById("password");

const submitBtn = document.getElementsByName("submit")[0];
const submitBtnSection = document.getElementById("submit-section");
const usernameError = document.getElementById("username-error");

const HOST = "http://116.203.61.236:4000";

const registerUser = "users";
const getUsersRole = "organizations/roles";

const URL = `${HOST}/${registerUser}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;

const setRoleAccess = (currUser, token) => {
  fetch(getUsersRoleURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let userRole = data.message.filter(
        (userRoleObj) => userRoleObj.username === currUser
      )[0];

      switch (userRole.role) {
        case "Warehouse":
          window.location.replace("Warehouse.html");
          return;
        default:
          window.location.replace("liste.html");
          return;
      }
    });
};

const sendRegisterReq = (reqData) => {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token && data.token !== undefined && data.token !== null) {
        localStorage.setItem("token", data.token);
        setRoleAccess(reqData.username, data.token);
      } else {
        usernameError.textContent = "The Credentials are invalid!";
        submitBtnSection.innerHTML = "";
        submitBtn.style.display = "block";
        submitBtnSection.insertAdjacentElement("afterbegin", submitBtn);
        submitBtn.textContent = "Log in";
      }
    });
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    username: username.value,
    password: password.value,
  };

  submitBtn.style.display = "hidden";
  submitBtnSection.innerHTML = `<div class="spinner-border text-primary" role="status">
    </div>`;

  sendRegisterReq(data);
});
