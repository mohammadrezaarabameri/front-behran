const table = document.querySelector("#book-list");
const itemTable = document.getElementById("item--list-table");
const card = document.getElementsByClassName("content")[0];
const button = document.querySelector("button");
const feed = document.querySelector("#feed");
const searchInput = document.getElementById("search-chicken");
const searchIcon = document.querySelector(".fas .fa-search");

const batchList = document.getElementById("batch-list");
const batchListTable = document.getElementById("batch-list-table");
const deleteAssetBtn = document.getElementById("batch--delete-asset");

const batchCheckBox = document.getElementById("batch-check-box");
const assetCheckBox = document.getElementById("asset-check-box");
const addAssetToBatchBtn = document.getElementById("add-asset-to-batch");

const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

// modal
const modalBody = document.getElementById("modal-body");
const save = document.getElementById("save");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const modal = document.getElementById("modal-default");
const batchIds = document.getElementById("batches--id");
const profileCard = document.getElementById("profile-card");
const inventorySidebar = document.getElementById("inventory-sidebar");
const blockedInvenory = document.getElementById("blocked-amount");
const usernameSidebar = document.getElementById("username-sidebar");

const HOST = "http://116.203.61.236:4000";

const getChickenByOwner =
  "channels/mychannel/chaincodes/broilerChickenCC/assets/owner";

const setChickenForSale =
  "channels/mychannel/chaincodes/broilerChickenCC/collection/Market/asset/public";

const getAssetsInMarket = "collection/Market/objects";

const getAssetHistory =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/history";

const getBatchesByOwner =
  "channels/mychannel/chaincodes/broilerChickenCC/batchs/owner";

const changeStatus =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/status/change";
const changeMetaData =
  "channels/mychannel/chaincodes/broilerChickenCC/attr/put";

const changeMetaDataForBatch =
  "channels/mychannel/chaincodes/broilerChickenCC/batch/attr/put";

const addAssetToBatch =
  "channels/mychannel/chaincodes/broilerChickenCC/batch/add";

const getBatchAssets =
  "channels/mychannel/chaincodes/broilerChickenCC/batch/assets";

const deleteAssetFromBatch =
  "channels/mychannel/chaincodes/broilerChickenCC/batch/remove";

const getUsersRole = "organizations/roles";

const changeAssetOwnership =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/owner/change";

const getTokenURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/token";

const getChickensURL = `${HOST}/${getChickenByOwner}`;
const setChickenForSaleURL = `${HOST}/${setChickenForSale}`;
const getAssetsURL = `${HOST}/${getAssetsInMarket}`;
const getAssetHistoryURL = `${HOST}/${getAssetHistory}`;
const getChickensBatchURL = `${HOST}/${getBatchesByOwner}`;
const changeAssetStatusURL = `${HOST}/${changeStatus}`;
const changeMetaDataURL = `${HOST}/${changeMetaData}`;
const addAssetToBatchURL = `${HOST}/${addAssetToBatch}`;
const getBatchAssetsURL = `${HOST}/${getBatchAssets}`;
const deleteAssetFromBatchURL = `${HOST}/${deleteAssetFromBatch}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const changeAssetOwnershipURL = `${HOST}/${changeAssetOwnership}`;
const changeMetaDataForBatchURL = `${HOST}/${changeMetaDataForBatch}`;

let assets = null;
let batchId_ = null;

let assetsToAddBatch = [];
let assetsMetadata = [];
let assetsStatus = [];
let user = null;
let currUserRole = null;
let assetsOfBatch = [];

// "userData" saves all fetched data from asset owner api
// todo: change name required
let userData = null;

// NOTICE: this is for demo
const warehouseOwner = "username@OrgB2";
const retailerWarehouseOwner = "username@OrgD2";

const token = localStorage.getItem("token");

// status objects
const produced = {
  name: "Produced",
  color: "badge-info",
};

const wasted = {
  name: "Wasted",
  color: "badge-danger",
};

const warehouse = {
  name: "Warehouse",
  color: "badge-success",
};

const readyToSale = {
  name: "FinalProduct",
  color: "badge-success",
};

const paid = {
  name: "paid",
  color: "badge-info",
};

const roles = {
  retailer: "Retailer",
  wholeSaler: "wholeSaler",
  warehouse: "Warehouse",
  factory: "Factory",
};

// combine all status into one array
const AssetStatus = [
  {
    name: produced.name,
    color: produced.color,
  },
  {
    name: wasted.name,
    color: wasted.color,
  },
  {
    name: warehouse.name,
    color: warehouse.color,
  },
  {
    name: readyToSale.name,
    color: readyToSale.color,
  },
  {
    name: paid.name,
    color: paid.color,
  },
];

let userID = null;

// NOTICE: change name require ChickenID -> AssetID
let ChickenID = null;
let chickenPrice = null;

const usersData = null;
let checkedAll = true;
let selectStatus = null;

let metaProducedDate,
  metaType,
  metaMaterial,
  selectedMetaDataKey,
  selectedMetaDataVal;
let modalSignal = "";
let transferToWarehouse = null;

const headerReq = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const saveBtnSignal = {
  // todo: add signal here
};

const showModal = (statement, msgError, msgSuccess) => {
  if (card.getElementsByClassName("alert").length !== 0) {
    alerts = card.getElementsByClassName("alert");
    for (let index = 0; index < alerts.length; index++) {
      alerts[index].remove();
    }
  }
  if (
    document.getElementById("alert-1") == undefined ||
    document.getElementById("alert-1") == null ||
    document.getElementById("alert-2") == undefined ||
    document.getElementById("alert-2") == null
  ) {
    if (!statement) {
      card.insertAdjacentHTML(
        "beforebegin",
        `
  <div class="alert alert-danger" role="alert" id='alert-1'>
         ${msgError}
  </div>
  `
      );
      let alert1 = document.getElementById("alert-1");
      setTimeout(() => alert1.remove(), 3000);
    } else {
      card.insertAdjacentHTML(
        "beforebegin",
        `
  <div class="alert alert-success" role="alert" id='alert-2'>
          ${msgSuccess}
  </div>
  `
      );
      let alert2 = document.getElementById("alert-2");
      setTimeout(() => alert2.remove(), 3000);
    }
  }
};

const changeAssetOwner = (assId, newOwner) => {
  const data = {
    id: assId,
    newOwner: newOwner,
  };

  fetch(changeAssetOwnershipURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }
      if (data.result?.message) {
        let userIndex = userData.findIndex((obj) => obj.id === assId);
        userData.splice(userIndex, 1);
        getAllChickens(userData);

        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Ownership of Asset with ${assId} changed; 
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      } else {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Ownership change failed
        </div>
        `
        );

        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      }
    });
};

const setChickenForSaleReq = (assId, price) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const data = {
    assetId: assId,
    price: price,
  };

  fetch(setChickenForSaleURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status === 401) {
        location.replace("../../login-v2.html");
      } else {
        return res.json();
      }
    })
    .then((data) => {
      // loading
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }

      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Status change failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        let userIndex = userData.findIndex((obj) => obj.id === ChickenID);
        let colorStatus = AssetStatus.filter(
          (obj) => obj.name === readyToSale.name
        )[0];

        userData[userIndex].status = readyToSale.name;
        userData[userIndex].price = price;
        userData[userIndex].statusColor = colorStatus.color;

        changeStatusColorOnServer(
          ChickenID,
          readyToSale.name,
          userData[userIndex].type
        );

        itemTable.innerHTML = "";
        getAllBatches(userData);
        getAllChickens(userData);
      }
    });
};

// determine color of status base on its status code
const giveStatusColor = (data) => {
  let statusObj = null;
  for (let i = 0; i < data.result.length; i++) {
    statusObj = AssetStatus.filter((obj) => obj.name === data.result[i].status);
    if (statusObj.length > 0) {
      data.result[i].statusColor = statusObj[0].color;
    } else {
      data.result[i].statusColor = produced.color;
    }
  }

  return data;
};

// request to backend for change status
const changeStatusColorOnServer = (chickenId, selectedVal, assetType = "") => {
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
    .then((data) => {
      if (
        selectedVal === warehouse.name &&
        assetType.toLowerCase() === "batch"
      ) {
        changeAssetOwner(chickenId, warehouseOwner);
      } else if (
        selectedVal === warehouse.name &&
        assetType.toLowerCase() === "chicken"
      ) {
        changeAssetOwner(chickenId, retailerWarehouseOwner);
      } else {
        if ($("#modal-default").hasClass("show")) {
          $("#modal-default").modal("toggle");
        }
      }
    });
};

const addMetaData = (chickenID, key, value, ins, multiple = 1) => {
  const data = {
    id: chickenID,
    key: key,
    value: value,
    instruction: ins,
  };

  fetch(changeMetaDataURL, {
    method: "POST",
    headers: headerReq,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (multiple == 1) {
        $("#modal-default").modal("toggle");
      }
      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-1") == undefined ||
          document.getElementById("alert-1") == null
        ) {
          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Metadata couldn't be added at the moment!
        </div>
        `
          );
          let alert1 = document.getElementById("alert-1");
          setTimeout(() => alert1.remove(), 3000);
        }
      } else {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-2") == undefined ||
          document.getElementById("alert-2") == null
        ) {
          if (assetsOfBatch.length > 0) {
            let batchAssetObj = assetsOfBatch.filter(
              (asset) => asset.id === chickenID
            )[0];
            batchAssetObj.attrs.push({
              key: key,
              value: value,
              instruction: ins,
            });
          } else {
            let assetObj = userData.filter(
              (asset) => asset.id === chickenID
            )[0];
            assetObj.attrs.push({ key: key, value: value, instruction: ins });
          }

          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Asset Metadata Added Successfully!
        </div>
        `
          );
          let alert2 = document.getElementById("alert-2");
          setTimeout(() => alert2.remove(), 3000);
        }
      }
    });
};

const addMetaDataToBatch = (batchId, key, value, ins) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;
  const data = {
    batchId: batchId,
    key: key,
    value: value,
    instruction: ins,
  };

  fetch(changeMetaDataForBatchURL, {
    method: "POST",
    headers: headerReq,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      $("#modal-default").modal("toggle");
      if (card.getElementsByClassName("alert").length !== 0) {
        alerts = card.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      // TODO: change required
      if (data.result === null || data.success == false) {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-1") == undefined ||
          document.getElementById("alert-1") == null
        ) {
          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Metadata couldn't be added at the moment!
        </div>
        `
          );
          let alert1 = document.getElementById("alert-1");
          setTimeout(() => alert1.remove(), 3000);
        }
      } else {
        metaTitle = null;
        metaValue = null;
        metaInstruction = null;

        if (
          document.getElementById("alert-2") == undefined ||
          document.getElementById("alert-2") == null
        ) {
          let assetObj = userData.filter((asset) => asset.id === batchId)[0];
          assetObj.attrs.push({ key: key, value: value, instruction: ins });

          card.insertAdjacentHTML(
            "beforebegin",
            `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Asset Metadata Added Successfully!
        </div>
        `
          );
          let alert2 = document.getElementById("alert-2");
          setTimeout(() => alert2.remove(), 3000);
        }
      }
    });
};

// remove asset from batch //
const removeAssetFromBatch = (assetIDs = [], batchID) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const addBatchData = {
    batchId: batchID,
    assetsIds: assetIDs,
  };

  fetch(deleteAssetFromBatchURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addBatchData),
  })
    .then((res) => res.json())
    .then((data) => {
      // loading
      $("#modal-default").modal("toggle");

      if (data.result === 400) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Transation Failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Item(s) delete from Batch Successfully
        </div>
        `
        );

        for (let i = 0; i < assetIDs.length; i++) {
          let batchItemIndex = assetsOfBatch.findIndex(
            (obj) => obj.id === assetIDs[i]
          );
          assetsOfBatch.splice(batchItemIndex, 1);
        }

        replaceAssetsOfBatch(assetsOfBatch, batchID);

        let batchIndex = userData.findIndex((obj) => obj.id === batchID);
        userData[batchIndex].childesCount = assetsOfBatch.length;

        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

const deleteItemFromBatch = (batchId) => {
  removeAssetFromBatch([ChickenID], batchId);
};

deleteAssetBtn.addEventListener("click", (e) => {
  // data-toggle="modal" data-target="#modal-default"
  // loading
  $("#modal-default").modal("toggle");
  setModalOnDeleteAssetsOfBatch();
});

////////

const setModalOnDeleteAssetsOfBatch = () => {
  modalSignal = "DELETE";
  save.style.display = "block";
  save.textContent = "Yes";

  modalBody.innerHTML = "";
  modalTitle.textContent = "unpacked assets";
  modalBody.innerText =
    "Are you sure, you want to remove item(s) from this batch?";
};

const addSelectedAssetToBatch = (assetIDs = [], batchID) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const addBatchData = {
    batchId: batchID,
    assetsIds: assetIDs,
  };

  fetch(addAssetToBatchURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addBatchData),
  })
    .then((res) => res.json())
    .then((data) => {
      // loading
      $("#modal-default").modal("toggle");

      if (data.result === 400) {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-danger" role="alert" id='alert-1'>
                Transation Failed
        </div>
        `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      } else {
        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
                Transaction Successful
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);

        let batchIndex = userData.findIndex((item) => item.id === batchID);
        userData[batchIndex].childesCount += assetIDs.length;

        assetIDs.forEach((item) => {
          let itemIndex = userData.findIndex((asset) => asset.id === item);
          userData.splice(itemIndex, 1);
        });

        getAllBatches(userData);
        getAllChickens(userData);
      }
    });
};

const setModalonEdit = (assetId) => {
  modalSignal = "EDIT";
  save.style.display = "block";

  modalBody.innerHTML = "";
  modalTitle.textContent = "Change status";
  modalBody.insertAdjacentHTML(
    "beforeend",
    `
    <div class='container'>
      <select class="form-control" id="status-select">
        <option class="${wasted.color}" value="${wasted.name}">${wasted.name}</option>
        </select>
        </div>
        `
  );
  selectStatus = document.getElementById("status-select");

  let assetObj;
  if (assetsOfBatch.length > 0) {
    assetObj = assetsOfBatch.find((obj) => obj.id === ChickenID);
  } else {
    assetObj = userData.find((obj) => obj.id === ChickenID);
  }

  if (currUserRole == roles.factory) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
      <option class="${produced.color}" value="${produced.name}">${produced.name}</option>
    `
    );
  }

  if (
    assetObj.type.toLowerCase() === "batch" &&
    assetObj.childesCount > 0 &&
    assetObj.price == 0 &&
    currUserRole == roles.factory
  ) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
    <option class="${warehouse.color}" value="${warehouse.name}">${warehouse.name}</option>
    `
    );
  } else if (
    assetObj.type.toLowerCase() !== "batch" &&
    assetObj.childesCount >= 0 &&
    assetObj.price == 0 &&
    currUserRole == roles.retailer
  ) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
    <option class="${readyToSale.color}" value="${readyToSale.name}">${readyToSale.name}</option>
    `
    );

    selectStatus.addEventListener("change", (e) => {
      if (e.target.value == readyToSale.name) {
        modalBody.insertAdjacentHTML(
          "beforeend",
          `
            <input type='number' id='chicken-price' name='chicken-price' class='form-control mt-2' placeholder='Enter the price' require />
        `
        );

        chickenPrice = document.getElementById("chicken-price");
      } else {
        if (modalBody.querySelector("input"))
          modalBody.querySelector("input").remove();
      }
    });
  } else if (
    assetObj.type.toLowerCase() === "batch" &&
    assetObj.childesCount > 0 &&
    assetObj.price == 0 &&
    currUserRole == roles.wholeSaler
  ) {
    selectStatus.insertAdjacentHTML(
      `beforeend`,
      `
    <option class="${readyToSale.color}" value="${readyToSale.name}">${readyToSale.name}</option>
    `
    );

    selectStatus.addEventListener("change", (e) => {
      if (e.target.value == readyToSale.name) {
        modalBody.insertAdjacentHTML(
          "beforeend",
          `
            <input type='number' id='chicken-price' name='chicken-price' class='form-control mt-2' placeholder='Enter the price' require />
        `
        );

        chickenPrice = document.getElementById("chicken-price");
      } else {
        if (modalBody.querySelector("input"))
          modalBody.querySelector("input").remove();
      }
    });
  }
};

const minimizeDateStr = (dateStr) => {
  let a = dateStr.replace("UTC", "");
  return a.substring(0, a.lastIndexOf("+") - 1);
};

const setModalOnMetadataView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "Metadata";

  let assetObj;
  if (assetsOfBatch.length > 0) {
    assetObj = assetsOfBatch.filter((asset) => asset.id === ChickenID)[0];
  } else {
    assetObj = userData.filter((asset) => asset.id === ChickenID)[0];
  }

  if (assetObj.attrs.length > 0) {
    modalBody.insertAdjacentHTML(
      "beforeend",
      `
        <table
        class="table table-bordered table-striped"
        style="max-width: 100%"
        id="metadata-list-table"
      >
      <thead>
      <tr>
          <th scope="col">attribute</th>
          <th scope="col">Value</th>
          <th scope="col">Instruction</th>
      </tr>
      </thead>
        <tbody id="metadata-list"></tbody>
      </table>
        `
    );

    let metaDataList = document.getElementById("metadata-list");

    assetObj.attrs.forEach((item) => {
      metaDataList.insertAdjacentHTML(
        "beforeend",
        `                
              <td>${item.key}</td>
              <td>${item.value}</td>
              <td>${item.instruction}</td>
            `
      );
    });
  } else {
    modalBody.insertAdjacentHTML(
      "beforeend",
      `
      <h3>There's No data</h3>
    `
    );
  }
  save.style.display = "none";
};

const setModalOnView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "View";

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(getAssetHistoryURL + `?id=${ChickenID}`, config)
    .then((res) => res.json())
    .then((data) => {
      let results = data.result;

      results.forEach((item) => {
        modalBody.insertAdjacentHTML(
          "afterbegin",
          `
                    <!-- Timelime example  -->

                        <!-- The time line -->
                        <div class="timeline">
                          <!-- timeline time label -->
                          <div class="time-label1">
                            <span class="bg-warning">Oil-ID:${item.asset.SerialNumber.substring(
                              0,
                              10
                            )}</span>
                            </div> 

                          <!-- /.timeline-label -->
                          <!-- timeline item -->
                          <div>
                            <!-- <i class="fas fa-envelope bg-blue"></i> -->
                            <div class="timeline-item">
                              <span class="time">
                              <i class="fas fa-clock"></i> ${minimizeDateStr(
                                item.timestamp
                              )}</span>
                              
                              ${
                                item.asset.status !== ""
                                  ? `Status: ${item.asset.status}<br/>`
                                  : ""
                              }
                              ${
                                item.asset.price !== 0
                                  ? `Price: ${item.asset.price} <br />`
                                  : ""
                              }

                              Owner: ${item.asset.owner}
                              <br/>

                              ${
                                item.asset.forSale
                                  ? `For Sale: ${item.asset.forSale}<br/>`
                                  : ""
                              }
                              
                              Asset-Step: "${item.asset.txType}"
                            
                            <!-- loop -->
                            
                            <!-- loop -->
                             
                            </div>
                          </div>
                          <!-- END timeline item -->
                          <!-- timeline item -->
                         
                          
                         
                              
                          <!-- END timeline item -->
                         
                        </div>
                      </div>
                      <!-- /.col -->
                    </div>
                    </div>
                    </div>
                    <!-- /.timeline -->
                    
          
                          `
        );
      });
    });

  save.style.display = "none";
};

const setModalOnInfo = () => {
  modalSignal = "INFO";
  save.style.display = "block";

  modalBody.innerHTML = "";
  modalTitle.textContent = "Info";

  const inputData = [
    {
      name: "Production Date",
      value: "produced-date",
    },
    {
      name: "Type Of Product",
      value: "type",
    },
    {
      name: "Materials",
      value: "material",
    },
  ];

  modalBody.insertAdjacentHTML(
    "beforeend",
    `<div class="form-group" id="info-data">
        <label>Info Option</label>
        <select class="custom-select mb-3" id="info-select">
        </select>
        <div id='meta-select-change'>
        <label for="producedDate">Produced Date</label>
        <input type="date" class="form-control" id="meta--produced-date" placeholder="choose a date">
        </div>
    </div>`
  );

  const infoSelect = document.getElementById("info-select");
  const selectChange = document.getElementById("meta-select-change");
  metaProducedDate = document.getElementById("meta--produced-date");
  selectedMetaDataVal = "produced-date";

  inputData.forEach((item) => {
    infoSelect.insertAdjacentHTML(
      "afterbegin",
      `<option value="${item.value}">${item.name}</option>`
    );
  });

  infoSelect.addEventListener("change", (e) => {
    selectedMetaDataVal = infoSelect.options[infoSelect.selectedIndex].value;
    selectChange.innerHTML = "";
    switch (selectedMetaDataVal) {
      case "produced-date":
        selectChange.insertAdjacentHTML(
          "beforeend",
          `
          <label for="producedDate">Produced Date</label>
          <input type="date" class="form-control" id="meta--produced-date" placeholder="choose a date">
            `
        );

        metaProducedDate = document.getElementById("meta--produced-date");
        return;

      case "type":
        selectChange.insertAdjacentHTML(
          "beforeend",
          `
            <label for="assetType">Type</label>
            <input type="text" class="form-control" id="meta--type" placeholder="Enter type of asset">
              `
        );

        metaType = document.getElementById("meta--type");
        return;

      case "material":
        selectChange.insertAdjacentHTML(
          "beforeend",
          `
            <label for="material">Material</label>
            <input type="text" class="form-control" id="meta--material" placeholder="Enter consumed material">
              `
        );
        metaMaterial = document.getElementById("meta--material");
        return;
    }
  });

  //   metaProducedDate = document.getElementById("meta--produced-date");
  //   metaType = document.getElementById("meta--type");
  //   metaMaterial = document.getElementById("meta--material");
};

const getSelectedBatch = () => {
  let batchSelect = document.getElementById("batch-select");
  let selectedBatch = batchSelect.options[batchSelect.selectedIndex].value;
  return [
    selectedBatch.substring(0, selectedBatch.lastIndexOf("-")),
    Number(
      selectedBatch.substring(
        selectedBatch.lastIndexOf("-") + 1,
        selectedBatch.length
      )
    ),
  ];
};

const setModalOnAddToBatch = () => {
  save.style.display = "block";

  modalSignal = "ADD_TO_BATCH";
  modalBody.innerHTML = "";
  modalTitle.textContent = "Add Asset To Batch";
  let batchIDs = userData.filter(
    (item) => item.type.toLowerCase() === "batch" && item.childesCount < 10
  );

  modalBody.insertAdjacentHTML(
    "beforeend",
    `
    <div class="form-group">
        <label>Batch</label>
        <select class="custom-select" id="batch-select">
        </select>
    </div>`
  );

  let batchSelect = document.getElementById("batch-select");
  if (batchIDs.length > 0) {
    batchIDs.forEach((item) => {
      batchSelect.insertAdjacentHTML(
        "afterbegin",
        `
        <option value="${item.id}-${item.childesCount}">${item.SerialNumber} - count: ${item.childesCount}</option>
        `
      );
    });
  }
};

const getSelectedValueForStatus = () => {
  selectStatus = document.getElementById("status-select");
  let userSelectedValue =
    selectStatus.options[selectStatus.selectedIndex].value;
  return userSelectedValue;
};

save.addEventListener("click", (e) => {
  // save.setAttribute("disabled", true);

  switch (modalSignal) {
    case "EDIT":
      let selectedVal = getSelectedValueForStatus();

      if (chickenPrice !== null) {
        if (chickenPrice.value !== "") {
          if (assetsToAddBatch.length > 0) {
            assetsToAddBatch.forEach((item) => {
              setChickenForSaleReq(item, Number(chickenPrice.value.trim()));
            });
          } else {
            setChickenForSaleReq(ChickenID, Number(chickenPrice.value.trim()));
          }
        }
        chickenPrice.value = "";
      } else {
        // $("#modal-default").modal("toggle");
        modalBody.innerHTML = `
            <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
            </div>
          </div>
            `;

        let userIndex = userData.findIndex(
          (obj, index) => obj.id === ChickenID
        );
        let colorStatus = AssetStatus.filter(
          (obj) => obj.name === selectedVal
        )[0];

        userData[userIndex].status = selectedVal;
        userData[userIndex].statusColor = colorStatus.color;
        console.log(userData[userIndex].type);
        changeStatusColorOnServer(
          ChickenID,
          selectedVal,
          userData[userIndex].type
        );

        itemTable.innerHTML = "";
        getAllChickens(userData);
        getAllBatches(userData);
      }
      return;

    case "INFO":
      metaProducedDate = metaProducedDate?.value;
      metaType = metaType?.value;
      metaMaterial = metaMaterial?.value;
      selectedMetaDataVal;

      let metaDataOpt = [metaProducedDate, metaType, metaMaterial].filter(
        (item) => item !== undefined && item !== ""
      )[0];

      modalBody.innerHTML = `
      <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
      </div>
    </div>
      `;
      if (assetsToAddBatch.length > 0) {
        assetsToAddBatch.forEach((item, index) =>
          addMetaData(
            item,
            selectedMetaDataVal,
            metaDataOpt,
            "No Instruction",
            index
          )
        );
      } else {
        let assetType = userData.filter(
          (item) => item.id === ChickenID && item.type.toLowerCase() === "batch"
        );

        if (assetType.length > 0) {
          addMetaDataToBatch(
            ChickenID,
            selectedMetaDataVal,
            metaDataOpt,
            "No Instruction"
          );
        } else {
          addMetaData(
            ChickenID,
            selectedMetaDataVal,
            metaDataOpt,
            "No Instruction",
            1
          );
        }
      }
      return;

    case "ADD_TO_BATCH":
      // todo: patch required
      let [selectedBatchId, count] = getSelectedBatch();
      if (assetsToAddBatch.length > 0) {
        if (Number(count) + assetsToAddBatch.length <= 10) {
          addSelectedAssetToBatch(assetsToAddBatch, selectedBatchId);
        } else {
          showModal(false, "The batch should only have 10 item", "");
        }
      } else addSelectedAssetToBatch([ChickenID], selectedBatchId);
      return;

    case "DELETE":
      save.textContent = "Save";
      if (assetsToAddBatch.length > 0) {
        removeAssetFromBatch(assetsToAddBatch, batchId_);
      } else {
        removeAssetFromBatch([ChickenID], batchId_);
      }
      return;
  }
});

const getChickens = async () => {
  const res = await fetch(getChickensURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  let colorizedData = giveStatusColor(data);

  return colorizedData.result;
};

const getAssets = async () => {
  const res = await fetch(getAssetsURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data.message;
};

const searchData = (data = [], keyword = "") => {
  if (keyword === "" || keyword === null || keyword === undefined) return data;

  const filterFunc = (obj) => {
    if (
      obj.SerialNumber.includes(keyword) ||
      obj.owner.includes(keyword) ||
      obj.status.includes(keyword) ||
      obj.price.toString().includes(keyword)
    )
      return obj;
    else return null;
  };
  let searchedData = data.filter(filterFunc);

  return searchedData;
};

searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    table.innerHTML = "";
    const info = await getChickens();
    let data = searchData(info, e.target.value);
    getAllChickens(data);
  }
});

/*
searchIcon.addEventListener('click', async (e) => {
    const info = await getChickens();
    if (e.key === 13) {
        let data = searchData(info, e.target.value);
        getAllChickens(data);

    }
})
*/

const carveOutPrice = (data = [], key) => {
  let filteredData = data.filter((obj) => obj._id === key);
  if (filteredData.length === 0) return 0;
  return filteredData[0].price;
};

const addAssetToList = (assetId) => {
  if (assetsToAddBatch.includes(assetId)) {
    assetsToAddBatch = assetsToAddBatch.filter((item) => item !== assetId);
  } else {
    assetsToAddBatch.push(assetId);
  }
};

function getAllChickens(data = []) {
  const filterItemKey = "Chicken";
  data = data.filter((item) => item.type === filterItemKey || item.type === "");
  itemTable.innerHTML = "";
  itemTable.insertAdjacentHTML(
    "beforeend",
    `
  <thead>
  <tr>
    <th scope="col">
      <input
        type="checkbox"
        value=""
        id="asset-check-box"
      />
      <label for="check1"></label>
    </th>
    <th scope="col">ID</th>
    
    <th scope="col">Price</th>
    <th scope="col">status</th>
    <th scope="col"></th>
  </tr>
</thead>
<tbody id="book-list"></tbody>
  `
  );

  let itemTableList = document.getElementById("book-list");

  data.forEach((chicken, index) => {
    // console.log(data);
    itemTableList.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
      <th scope="row">
            <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
        chicken.id
      }')">
            <label for="check1"></label>
      </th>
        <td>${chicken.SerialNumber}</td>
        
        <td id='chicken-price-${index}'>${chicken.price}</td>
        <td>
        <span class="badge ${chicken.statusColor}">${
        chicken.status ? chicken.status : "Produced"
      }</span>
        </td>
        <td>
        <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnView();" href="#">
        <i class="fa fa-history">
        </i>
    </a>
    <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnMetadataView();" href="#">
      <i class="fas fa-eye">
      </i>
  </a>
    <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        chicken.id
      }', '${chicken.id}'); setModalonEdit()" href="#">
        <i class="fas fa-pencil-alt">
        </i>
    </a>
  
    <a class="btn btn-primary btn-sm" id="add-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnAddToBatch()" href="#">
        <i class="fas fa-plus">
    </i>
    </a>
    <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        chicken.id
      }'); setModalOnInfo();" href="#">
      <i class="fas fa-info"></i>
    </a>
    </td>
      </tr>
       `
    );
    usernameSidebar.textContent = carveOutUsername(chicken.owner);
  });
}

const getAllBatches = (data = []) => {
  // clear the table befor adding new data-row into the table
  batchListTable.innerHTML = "";
  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">ID</th>
      <th scope="col">Owner</th>
      <th scope="col">Count</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );
  let batchListAdded = document.getElementById("batch-list");
  // TODO: add if for not successful request
  const batchType = "batch";
  const statusType = "warehouse";

  // filter chickens that the type == 'batch'
  data = data.filter(
    (item) =>
      item.type.toLowerCase() == batchType &&
      item.status.toLowerCase() !== statusType
  );

  data.forEach((batch, index) =>
    batchListAdded.insertAdjacentHTML(
      "afterend",
      `
    
    <tr>
    <th scope="row">
          <input type="checkbox" value="${index}" id="batch-checkbox">
          <label for="check1"></label>
    </th>
      <td>${batch.SerialNumber}</td>
      <td>${batch.owner} </td>
      <td>${batch.childesCount}</td>
      <td>${batch.price}</td>
      <td>
        <span class="badge ${batch.statusColor}">${
        batch.status ? batch.status : "Produced"
      }</span>
        </td>
      
      <td>
      <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        batch.id
      }'); setModalOnView();" href="#">
      <i class="fa fa-history">
      </i>
  </a>
    <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        batch.id
      }'); setModalOnMetadataView();" href="#">
    <i class="fas fa-eye">
    </i>
  </a>
  <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        batch.id
      }', '${batch.id}'); setModalonEdit()" href="#">
      <i class="fas fa-pencil-alt">
      </i>
  </a>
  <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        batch.id
      }'); setModalOnInfo();" href="#">
  <i class="fas fa-info"></i>
</a>
  </td>
    </tr>
    `
    )
  );
};

function openEditModal(index, chickId) {
  userID = index;
  ChickenID = chickId;
}

assetCheckBox.addEventListener("click", (e) => {
  if (checkedAll) {
    checkedAll = !checkedAll;
    selectAll();
  } else {
    checkedAll = !checkedAll;
    UnSelectAll();
  }
});

batchCheckBox.addEventListener("click", (e) => {
  if (checkedAll) {
    data = userData.filter((item) => item.type === "");
    assetsToAddBatch = [];
    data.forEach((item) => assetsToAddBatch.push(item.id));
    checkedAll = !checkedAll;
    selectAll();
  } else {
    assetsToAddBatch = [];
    checkedAll = !checkedAll;
    UnSelectAll();
  }
});

function selectAll() {
  var items = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") {
      items[i].checked = true;
    }
  }
}

function UnSelectAll() {
  var items = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") {
      items[i].checked = false;
    }
  }
}

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
            currUserRole = roles.factory;

            return;

          case "Warehouse":
            warehouseSection.style.display = "block";
            shopSection.style.display = "block";
            requestSection.style.display = "block";
            window.location.replace("./Warehouse.html");
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            requestSection.style.display = "block";
            currUserRole = roles.wholeSaler;

            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            requestSection.style.display = "block";
            currUserRole = roles.retailer;

            return;
        }
      }
    });
};

const replaceAssetsOfBatch = (data = [], batchId) => {
  batchListTable.innerHTML = "";

  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">ID</th>
      <th scope="col">Owner</th>
      <th scope="col">Count</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );

  let batchListAdded = document.getElementById("batch-list");

  data.forEach((asset, index) => {
    batchListAdded.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
    <th scope="row">
          <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
        asset.id
      }')">
          <label for="check1"></label>
    </th>
      <td>${asset.SerialNumber}</td>
      <td>${asset.owner} </td>
      <td>${asset.childesCount} </td>
      <td id='asset-price-${index}'>${carveOutPrice(assets, asset.id)}</td>
      <td>
      <span class="badge ${asset.statusColor}">${
        asset.status ? asset.status : "Produced"
      }</span>
      </td>
      <td>
      <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnView();" href="#">
      <i class="fa fa-history">
      </i>
  </a>
  <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnMetadataView();" href="#">
    <i class="fas fa-eye">
    </i>
  </a>
  <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalonEdit()" href="#">
      <i class="fas fa-pencil-alt">
      </i>
  </a>

  <a class="btn btn-default btn-sm" id="delete-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnDeleteAssetsOfBatch()" href="#">
      <i class="fas fa-trash" style="color: #ff4d4d">
  </i>
  </a>
  <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
        asset.id
      }'); setModalOnInfo();" href="#">
    <i class="fas fa-info"></i>
  </a>
  </td>
    </tr>
     `
    );
  });
};

const getAssetsOfBatch = (batchId) => {
  batchListTable.innerHTML = "";

  batchListTable.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
    <tr>
      <th scope="col">
        <input
          type="checkbox"
          value=""
          id="batch-check-box"
        />
        <label for="check1"></label>
      </th>
      <th scope="col">ID</th>
      <th scope="col">Owner</th>
      <th scope="col">Count</th>
      <th scope="col">Price</th>
      <th scope="col">status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody id="batch-list"></tbody>
  `
  );

  let batchListAdded = document.getElementById("batch-list");

  fetch(getBatchAssetsURL + `?batchId=${batchId}`, {
    headers: headerReq,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.result.length > 0) {
        assetsOfBatch = data.result;

        deleteAssetBtn.style.display = "inline-block";
        batchId_ = batchId;

        let colorizedData = giveStatusColor(data);

        colorizedData.result.forEach((chicken, index) => {
          batchListAdded.insertAdjacentHTML(
            "beforeend",
            `
          <tr>
          <th scope="row">
                <input type="checkbox" value="${index}" id="asset-checkbox" onClick="addAssetToList('${
              chicken.id
            }')">
                <label for="check1"></label>
          </th>
            <td>${chicken.SerialNumber}</td>
            <td>${chicken.owner} </td>
            <td>${chicken.childesCount} </td>
            <td id='chicken-price-${index}'>${carveOutPrice(
              assets,
              chicken.id
            )}</td>
            <td>
            <span class="badge ${chicken.statusColor}">${
              chicken.status ? chicken.status : "Produced"
            }</span>
            </td>
            <td>
            <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnView();" href="#">
            <i class="fa fa-history">
            </i>
        </a>
        <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnMetadataView();" href="#">
          <i class="fas fa-eye">
          </i>
        </a>
        <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalonEdit()" href="#">
            <i class="fas fa-pencil-alt">
            </i>
        </a>

        <a class="btn btn-default btn-sm" id="delete-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnDeleteAssetsOfBatch()" href="#">
            <i class="fas fa-trash" style="color: #ff4d4d">
        </i>
        </a>
        <a class="btn btn-info btn-sm" id="info-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal(${index}, '${
              chicken.id
            }'); setModalOnInfo();" href="#">
          <i class="fas fa-info"></i>
        </a>
        </td>
          </tr>
           `
          );
        });
      } else {
        batchListAdded.insertAdjacentHTML(
          "beforeend",
          `
        <h3> No Asset Found </h3>
      `
        );
      }
    });
};

const setBatchIdDropDown = (data = []) => {
  const batchType = "batch";
  data = data.filter(
    (item) =>
      item.type.toLowerCase() == batchType &&
      item.status.toLowerCase() !== warehouse.name.toLowerCase()
  );

  data.forEach((item, index) =>
    batchIds.insertAdjacentHTML(
      "afterbegin",
      `
    <option value=${item.id}>${item.SerialNumber}</option>
  `
    )
  );
};

batchIds.addEventListener("change", (e) => {
  let selectedBatch = batchIds.options[batchIds.selectedIndex].value;

  if (selectedBatch === "all") {
    getAllBatches(userData);
    assetsOfBatch = [];
  } else getAssetsOfBatch(selectedBatch);
});

window.addEventListener("load", async () => {
  const info = await getChickens();
  userData = info;
  const getAssetsData = await getAssets();
  assets = getAssetsData;
  getAllChickens(info);
  getAllBatches(info);
  setBatchIdDropDown(info);
});

window.addEventListener("load", async () => {
  getToken();
});
