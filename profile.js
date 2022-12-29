const HOST = "http://116.203.61.236:4000";

const addMoneyURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/token/buy";
const getTokenURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/token";

const getBidsForAssetURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/asset/bids";
const getAssetURL = HOST + "/collection/Market/objects";
const sellChickenURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/asset/sell";
const getUsersRole = "organizations/roles";
const getUserHistory = "collection/Logs/user/history";
const changeStatus =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/status/change";
const changeStatusOfAssetsInBatch =
  "channels/mychannel/chaincodes/broilerChickenCC/assetsInBatch/status/change";

const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const getUserHistoryURL = `${HOST}/${getUserHistory}`;
const changeAssetStatusURL = `${HOST}/${changeStatus}`;
const changeStatusOfAssetsInBatchURL = `${HOST}/${changeStatusOfAssetsInBatch}`;

const amount = document.getElementById("amount");
const addMoneyBtn = document.getElementById("add-money");
const token = localStorage.getItem("token");
const addMoneyBox = document.getElementById("timeline");
const requestContent = document.querySelector("#request-content");
const userHistoryTable = document.getElementById("user-history-table");

const inventoryAmount = document.getElementById("inventory");
const blockedInvenory = document.getElementById("blocked-amount");
const username = document.querySelector(".profile-username");
const profileCard = document.getElementById("profile-card");
const containerfluid = document.getElementById("confirm");

const inventorySidebar = document.getElementById("inventory-sidebar");
const usernameSidebar = document.getElementById("username-sidebar");

const requestTabSection = document.getElementById("request-tab-section");
const activityTabSection = document.getElementById("activity-tab-section");
const timelineTabSection = document.getElementById("timeline-tab-section");

const requestTabPanelSection = document.getElementById("requests");
const activityTabPanelSection = document.getElementById("activity");
const timelineTabPanelSection = document.getElementById("requests");

// sidebar buttons
const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

let assetsData = [];

const paid = {
  name: "Paid",
};

let confirmBtn = null;

const addMoney = (amount) => {
  const data = {
    price: amount,
  };

  fetch(addMoneyURL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result.message === "Transacion successful.") {
        addMoneyBox.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-1'>
                ${data.result.message}
            </div>
        `
        );
        inventoryAmount.textContent = data.result.result.amount;

        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        addMoneyBox.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-danger" role="alert" id='alert-2'>
                ${data.result.message}
            </div>  
        `
        );

        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

addMoneyBtn.addEventListener("click", (e) => {
  let amountToAdd = Number(amount.value);
  addMoney(amountToAdd);
  amount.value = "";
});

const carveOutUsername = (username) => {
  return username.split("@")[0];
};

const getToken = () => {
  fetch(getTokenURL, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error !== "null") {
        console.log(data);

        // for all page
        inventorySidebar.textContent = data.result?.amount;
        blockedInvenory.textContent = data.result?.blockAmount;
        usernameSidebar.textContent = carveOutUsername(data.result?.user);
        setRoleAccess(data.result.user);
      } else {
        profileCard.insertAdjacentHTML(
          "afterbegin",
          `
                <div class="alert alert-danger" role="alert">
                    Failed to load user data;
                </div>
            `
        );
      }
    });
};

const getUser = async () => {
  let user = null;
  let res = await fetch(getTokenURL, {
    method: "GET",
    headers: headers,
  });

  let data = await res.json();
  return data.result.user;
};

const changeAssetOfBatchStatus = (batchId, selectedVal) => {
  const statusData = {
    batchId: batchId,
    status: selectedVal,
  };

  fetch(changeStatusOfAssetsInBatchURL, {
    method: "POST",
    body: JSON.stringify(statusData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("batch");
      console.log(data);
    });
};

const changeAssetStatus = (chickenId, selectedVal) => {
  const statusData = {
    id: chickenId,
    status: selectedVal,
  };

  fetch(changeAssetStatusURL, {
    method: "POST",
    body: JSON.stringify(statusData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {});
};

const sellChickenToCustomer = (idx, customer) => {
  const data = {
    id: idx,
    customer: customer,
  };

  fetch(sellChickenURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      confirmBtn.innerHTML = "";
      confirmBtn.innerText = "Confirm";

      console.log(data);

      if (data.result?.message.includes("successful")) {
        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-3'>
                ${data.result.message}
            </div>
        `
        );

        let alert3 = document.getElementById("alert-3");
        setTimeout(() => alert3.remove(), 3000);
      } else if (data.success === false) {
        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-danger" role="alert" id='alert-2'>
                ${data.message}
            </div>  
        `
        );

        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      } else {
        containerfluid.insertAdjacentHTML(
          "afterbegin",
          `
            <div class="alert alert-success" role="alert" id='alert-3'>
                ${data.result.message}
            </div>
        `
        );
        let alert3 = document.getElementById("alert-3");
        setTimeout(() => alert3.remove(), 3000);
      }
    });
};

const getSelectedCustomer = async (radio_name, asset_id) => {
  radio_type = document.getElementsByName(radio_name);
  confirmBtn = document.getElementById(radio_name);

  confirmBtn.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
    </div>
  </div>`;

  for (i = 0; i < radio_type.length; i++) {
    if (radio_type[i].checked) {
      let userToSell = radio_type[i].value;

      let assetObj = assetsData.filter((item) => item._id === asset_id)[0];
      if (assetObj.asset.type.toLowerCase() === "batch") {
        changeAssetOfBatchStatus(asset_id, paid.name);
        sellChickenToCustomer(asset_id, userToSell);
      } else {
        changeAssetStatus(asset_id, paid.name);
        sellChickenToCustomer(asset_id, userToSell);
      }
    }
  }
};

const setRequests = async () => {
  let res = await fetch(getAssetURL, {
    method: "GET",
    headers: headers,
  });

  let data = await res.json();

  let user = await getUser();

  if (data.success) {
    assetsData = data.message;
    data.message.forEach((asset, index) => {
      if (asset.asset.owner === user) {
        requestContent.insertAdjacentHTML(
          "beforeend",
          `
                    <tr style="text-align: center; font-size: 16px;">
                        <td>${index + 1}</td>
                        <td>${asset._id}</td>
                        <td> ${asset.asset.type} </td>
                        <td> ${asset.price} $</td>
                        <td id="bid-${index}">
                        </td>
                        <td><button class="btn btn-primary1" id="bid-radio-${index}" onclick="getSelectedCustomer('bid-radio-${index}', '${
            asset._id
          }')">Confirm</button></td>
                    </tr>

                `
        );

        let bidIndex = document.getElementById(`bid-${index}`);
        Object.keys(asset.bids).forEach((bid, j) => {
          bidIndex.insertAdjacentHTML(
            "beforeend",
            `
                    <div class="custom-control custom-radio">
                        <input class="custom-control-input" value="${bid}" type="radio" id="bid-radio-${j}-${index}" name="bid-radio-${index}">
                        <label for="bid-radio-${j}-${index}" class="custom-control-label">
                            ${bid}- ${asset.bids[bid]}$
                        </label>
                    </div>
                    `
          );
        });
      }
    });
  }
};

const setRoleAccess = (currUser) => {
  fetch(getUsersRoleURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        let userRole = data.message.filter(
          (userRoleObj) => userRoleObj.username === currUser
        )[0];
        switch (userRole.role) {
          case "Factory":
            listSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            activityTabSection.style.display = "block";
            timelineTabSection.style.display = "block";

            activityTabPanelSection.classList.add("active");
            activityTabSection.classList.add("active");

            return;

          case "Warehouse":
            warehouseSection.style.display = "block";
            shopSection.style.display = "block";
            requestSection.style.display = "block";

            requestTabSection.style.display = "block";

            requestTabPanelSection.classList.add("active");
            requestTabSection.classList.add("active");
            // window.location.replace("./Warehouse.html");
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            activityTabSection.style.display = "block";
            timelineTabSection.style.display = "block";

            // activityTabPanelSection.classList.add("active");
            // activityTabSection.classList.add("active");

            requestTabSection.style.display = "block";

            requestTabPanelSection.classList.add("active");
            requestTabSection.classList.add("active");
            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            activityTabSection.style.display = "block";
            timelineTabSection.style.display = "block";

            // activityTabPanelSection.classList.add("active");
            // activityTabSection.classList.add("active");

            requestTabSection.style.display = "block";

            requestTabPanelSection.classList.add("active");
            requestTabSection.classList.add("active");
            return;
        }
      }
    });
};

const formatUserHistoryDateField = (dateStr) => {
  // format --> Fri Nov 18 2022 23:12:00 GMT+0000 (Coordinated Universal Time)
  index = dateStr.indexOf("GMT");
  return dateStr.substring(4, index - 1);
};

const setUserHistoryTable = () => {
  fetch(getUserHistoryURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result.length > 0) {
        data.result.forEach((item, index) => {
          userHistoryTable.insertAdjacentHTML(
            "beforeend",
            `
                <tr
                style="text-align: center; font-size: 16px"
              >
                <td>${index + 1}</td>
                <td>${item._id}</td>
                <td>${item.tx}</td>
                <td>${formatUserHistoryDateField(item.date)}</td>
                <td></td>
              </tr>

          `
          );
        });
      }
    });
};

window.addEventListener("load", async () => {
  getToken();
  await setRequests();
  setUserHistoryTable();
});
