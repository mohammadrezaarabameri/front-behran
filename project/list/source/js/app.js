const HOST = "http://116.203.61.236:4000";

// batch input info
const batchName = document.getElementById("batch--batch-name");
const batchBreed = document.getElementById("batch--breed");
const batchCount = document.getElementById("batch--count");
const batchCountSection = document.getElementById("count--section");
const batchBirthday = document.getElementById("batch--birthday");

// chicken input info
const chickenBreed = document.getElementById("chicken--breed");
const chickenCount = document.getElementById("chicken--count");
const chickenBirthday = document.getElementById("chicken--birthday");

const BatchTable = document.getElementById("batch-list");
const ChickenTable = document.getElementById("chicken-list");

const amount = document.getElementById("amount");
const addMoneyBtn = document.getElementById("add-money");
const addMoneyBox = document.getElementById("timeline");
const requestContent = document.querySelector("#request-content");

const inventoryAmount = document.getElementById("inventory");
const blockedInvenory = document.getElementById("blocked-amount");
const profileCard = document.getElementById("profile-card");

const inventorySidebar = document.getElementById("inventory-sidebar");
const usernameSidebar = document.getElementById("username-sidebar");

const addBatchBtn = document.getElementById("add-batch");
const addChickenBtn = document.getElementById("add-chicken");

const typeSelect = document.getElementById("add-type-select");

const itemTypeSection = document.getElementById("item--type");
const itemTypeSelect = document.getElementById("add-item-type-select");

// sidebar buttons
const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const addChicken =
  "channels/mychannel/chaincodes/broilerChickenCC/chicken/create";
const addBulkChicken =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/create/bulk";
const addBulkChickenInBatch =
  "channels/mychannel/chaincodes/broilerChickenCC/batch/create/asset/bulk";

const addMoney = "channels/mychannel/chaincodes/broilerChickenCC/token/buy";
const getTokenEndpoint = "channels/mychannel/chaincodes/broilerChickenCC/token";
const getBidsForAsset =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/bids";
const getAsset = "collection/Market/objects";
const sellChicken =
  "channels/mychannel/chaincodes/broilerChickenCC/chicken/sell";

const addEmptyBatch =
  "channels/mychannel/chaincodes/broilerChickenCC/batch/create";

const getUsersRole = "organizations/roles";

const addMoneyURL = `${HOST}/${addMoney}`;
const getTokenURL = `${HOST}/${getTokenEndpoint}`;
const getBidsForAssetURL = `${HOST}/${getBidsForAsset}`;
const getAssetURL = `${HOST}/${getAsset}`;
const sellChickenURL = `${HOST}/${sellChicken}`;
const addChickenURL = `${HOST}/${addChicken}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
// const getUsersRoleURL = `${HOST}/${getUsersRole}`;

// add any number of asset
const addBulkChickenURL = `${HOST}/${addBulkChicken}`;

// add batch with childesCount = 10
const addBulkChickenInBatchURL = `${HOST}/${addBulkChickenInBatch}`;

// add batch with childesCount = 0
const addEmptyBatchURL = `${HOST}/${addEmptyBatch}`;

const token = localStorage.getItem("token");

const baseValueForFullBatch = 10;
const baseValueForEmptyBatch = 0;

let str =
  "Successfully added the chicken asset with key 26e6d7df-424e-406a-9e41-6898d265af22";

let username = null;
const carveOutUsername = (username) => {
  return username.split("@")[0];
};

const getToken = () => {
  fetch(getTokenURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error !== "null") {
        // for all page
        inventorySidebar.textContent = data.result?.amount;
        blockedInvenory.textContent = data.result?.blockAmount;
        usernameSidebar.textContent = carveOutUsername(data.result?.user);
        setRoleAccess(data.result.user);
      }
    });
};

window.addEventListener("load", async () => {
  getToken();
  // set count input field to 0 and disbale it
  // empty batch is our default option
  batchCount.value = baseValueForEmptyBatch;
  batchCount.setAttribute("disabled", true);
});

const addBulk = (count) => {
  const additionalData = {
    assetType: "Chicken",
    tag: "",
    status: "Produced",
    price: 0,
  };

  const data = {
    count: count,
    ...additionalData,
  };

  fetch(addBulkChickenURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    type: "cors",
    cache: "default",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result !== undefined) {
        data.result.body.forEach((item) => {
          BatchTable.insertAdjacentHTML(
            "beforeend",
            `
            
              <tr>
                <th>${item.id}</th>
                <th>${item.owner}</th>
                <th>1</th>
              </tr>
          
               `
          );
        });
      } // add modal
      disbaleLoadingForElement();
    });
  batchCount.value = 1;
};

const addBatch = () => {
  const data = {
    assetType: "Chicken",
    tag: "",
    status: "Produced",
    price: 0,
  };

  fetch(addBulkChickenInBatchURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    type: "cors",
    cache: "default",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result !== undefined) {
        BatchTable.insertAdjacentHTML(
          "beforeend",
          `
            
              <tr>
                <th>${data.result.body.id}</th>
                <th>${data.result.body.owner}</th>
                <th>${data.result.body.childesCount}</th>
              </tr>
          
               `
        );
      } // add modal
      disbaleLoadingForElement();
    });
};

const addBulkBatch = () => {
  const data = {
    tag: "",
    status: "Produced",
    price: 0,
  };

  fetch(addEmptyBatchURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    type: "cors",
    cache: "default",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result !== undefined) {
        console.log(data);
        BatchTable.insertAdjacentHTML(
          "beforeend",
          `<tr>
                <th>${data.result.body.id}</th>
                <th>${data.result.body.owner}</th>
                <th>${data.result.body.childesCount}</th>
            </tr>
          `
        );
      } // add modal
      disbaleLoadingForElement();
    });
};

typeSelect.addEventListener("change", (e) => {
  let selectedVal = typeSelect.options[typeSelect.selectedIndex].value;

  switch (selectedVal.toLowerCase()) {
    case "emptybatch":
      batchCount.value = baseValueForEmptyBatch;
      batchCount.setAttribute("disabled", true);
      return;

    case "fullbatch":
      batchCount.value = baseValueForFullBatch;
      batchCount.setAttribute("disabled", true);
      return;

    case "bulk":
      batchCount.value = 1;
      batchCount.removeAttribute("disabled");
      return;
  }
});

const enableLoadingForElement = () => {
  addBatchBtn.innerHTML =
    '<div class="spinner-border text-primary" role="status">';
  addBatchBtn.setAttribute("disabled", true);
};

const disbaleLoadingForElement = () => {
  addBatchBtn.innerHTML = "";
  addBatchBtn.innerText = "Add Oil";
  addBatchBtn.removeAttribute("disabled");
};

addBatchBtn.addEventListener("click", (e) => {
  enableLoadingForElement();

  e.preventDefault();
  let selectedVal = typeSelect.options[typeSelect.selectedIndex].value;
  let count = Number(batchCount.value);

  switch (selectedVal.toLowerCase()) {
    case "emptybatch":
      addBulkBatch();
      return;

    case "fullbatch":
      addBatch();
      return;

    case "bulk":
      addBulk(count);
      return;
  }
});

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
            return;

          case "Warehouse":
            warehouseSection.style.display = "block";
            shopSection.style.display = "block";
            requestSection.style.display = "block";
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            requestSection.style.display = "block";
            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            requestSection.style.display = "block";
            return;
        }
      }
    });
};
