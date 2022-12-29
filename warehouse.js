const HOST = "http://116.203.61.236:4000";

const getAssetsByOwner =
  "channels/mychannel/chaincodes/broilerChickenCC/assets/owner";

const getChickenHistory =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/history";
const getTokenEndpoint = "channels/mychannel/chaincodes/broilerChickenCC/token";
const getUsersRole = "organizations/roles";
const getAssetHistory =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/history";
const setChickenForSale =
  "channels/mychannel/chaincodes/broilerChickenCC/collection/Market/asset/public";

const changeStatus =
  "channels/mychannel/chaincodes/broilerChickenCC/asset/status/change";

const getAssetsURL = `${HOST}/${getAssetsByOwner}`;
const getChickenHistoryURL = `${HOST}/${getChickenHistory}`;
const getTokenURL = `${HOST}/${getTokenEndpoint}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const getAssetHistoryURL = `${HOST}/${getAssetHistory}`;
const setChickenForSaleURL = `${HOST}/${setChickenForSale}`;
const changeAssetStatusURL = `${HOST}/${changeStatus}`;

const warehouseTableList = document.getElementById("warehouse-list-table");
const modalBody = document.getElementById("modal-body");
const modalTitle = document.getElementsByClassName("modal-title")[0];
const save = document.getElementById("save");
const card = document.getElementsByClassName("content")[0];

// sidebar buttons
const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const inventorySidebar = document.getElementById("inventory-sidebar");
const blockedInvenory = document.getElementById("blocked-amount");
const usernameSidebar = document.getElementById("username-sidebar");

const token = localStorage.getItem("token");

const headerReq = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

let modalSignal = null;
let assetData = null;
let assetId = null;
let assetPrice = null;
let selectedAssets = [];
let username = null;

const warehouse = {
  name: "Warehouse",
  color: "badge-success",
};

const readyToSale = {
  name: "FinalProduct",
  color: "badge-info",
};

const AssetStatus = [
  {
    name: warehouse.name,
    color: warehouse.color,
  },
  {
    name: readyToSale.name,
    color: readyToSale.color,
  },
];

const giveStatusColor = (data) => {
  for (let i = 0; i < data.result.length; i++) {
    if (data.result[i].status === warehouse.name) {
      data.result[i].statusColor = warehouse.color;
    } else if (data.result[i].status === readyToSale.name) {
      data.result[i].statusColor = readyToSale.color;
    }
  }
  return data;
};

const getAllAssets = async () => {
  const res = await fetch(getAssetsURL, {
    headers: headerReq,
  });
  const data = await res.json();

  let colorizedData = giveStatusColor(data);

  return colorizedData.result;
};

const minimizeDateStr = (dateStr) => {
  let a = dateStr.replace("UTC", "");
  return a.substring(0, a.lastIndexOf("+") - 1);
};

// modal --> view asset history
const setModalOnView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "History";

  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  fetch(getAssetHistoryURL + `?id=${assetId}`, config)
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

const setModalOnMetadataView = () => {
  modalBody.innerHTML = "";
  modalTitle.textContent = "Metadata";

  let assetObj = assetData.filter((asset) => asset.id === assetId)[0];
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

const changeStatusColorOnServer = (assetId, selectedVal) => {
  const statusData = {
    id: assetId,
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

const setChickenForSaleReq = (assId, price) => {
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
        let assetIndex = assetData.findIndex((obj) => obj.id === assId);

        assetData[assetIndex].status = readyToSale.name;
        assetData[assetIndex].price = price;
        assetData[assetIndex].statusColor = readyToSale.color;
        changeStatusColorOnServer(assId, readyToSale.name);

        warehouseTableList.innerHTML = "";
        getAllWarehouseAsset(assetData);

        card.insertAdjacentHTML(
          "beforebegin",
          `
        <div class="alert alert-success" role="alert" id='alert-2'>
               Item Successfully Set For Sale
        </div>
        `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      }
    });
};

const setModalonEdit = () => {
  modalSignal = "EDIT";
  save.style.display = "block";

  modalBody.innerHTML = "";
  modalTitle.textContent = "Ready To Sale";
  modalBody.insertAdjacentHTML(
    "beforeend",
    `
      <div class='container'>
        <input type='number' id='asset-price' name='asset-price' class='form-control mt-2' placeholder='Enter the price' require />
      </div>
        `
  );
  assetPrice = document.getElementById("asset-price");
};

save.addEventListener("click", (e) => {
  switch (modalSignal) {
    case "EDIT":
      if (assetPrice !== null) {
        if (assetPrice.value !== "") {
          if (selectedAssets.length > 0) {
            selectedAssets.forEach((item) => {
              setChickenForSale(item, Number(assetPrice.value.trim()));
            });
          } else {
            console.log("here");
            setChickenForSaleReq(
              assetId.trim(),
              Number(assetPrice.value.trim())
            );
          }
        }
        assetPrice.value = "";
      }
      return;
  }
});

const getAllWarehouseAsset = (data = []) => {
  const statusFilter = "warehouse";
  const typeFilter = "batch";
  const itemTypeFilter = "chicken";

  const batchWarehouse = "username@OrgD2";

  if (data.length > 0) {
    if (data[0].owner === batchWarehouse) {
      data = data.filter(
        (item) =>
          (item.status.toLowerCase() === statusFilter ||
            item.status.toLowerCase() === readyToSale.name.toLowerCase()) &&
          item.type.toLowerCase() === itemTypeFilter
      );
    } else {
      data = data.filter(
        (item) =>
          (item.status.toLowerCase() === statusFilter ||
            item.status.toLowerCase() === readyToSale.name.toLowerCase()) &&
          item.type.toLowerCase() === typeFilter
      );
    }
  }
  // data = data.filter(
  //   (item) =>
  //     (item.status.toLowerCase() === statusFilter ||
  //       item.status.toLowerCase() === readyToSale.name.toLowerCase()) &&
  //     item.type.toLowerCase() === typeFilter
  // );

  // cleare the table then replace it
  warehouseTableList.innerHTML = "";
  warehouseTableList.insertAdjacentHTML(
    "beforeend",
    `
    <thead>
        <tr>
            <th scope="col">
            <input
                type="checkbox"
                value=""
                id="warehouse-check-box"
            />
            <label for="check1"></label>
            </th>
            <th scope="col">ID</th>
            <th scope="col">Count</th>
            <th scope="col">Price</th>
            <th scope="col">status</th>
            <th scope="col"></th>
        </tr>
        </thead>
        <tbody id="warehouse-list"></tbody>
    `
  );

  let warehouseList = document.getElementById("warehouse-list");

  data.forEach((asset, index) => {
    warehouseList.insertAdjacentHTML(
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
          
          <td id='asset-price-${index}'>${asset.childesCount}</td>
          <td id='asset-price-${index}'>${asset.price}</td>
          <td>
          <span class="badge ${asset.statusColor}">${
        asset.status ? asset.status : "Produced"
      }</span>
          </td>
          <td>
          <a class="btn btn-default btn-sm" id="history-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        asset.id
      }'); setModalOnView();" href="#">
          <i class="fa fa-history">
          </i>
      </a>
      <a class="btn btn-default btn-sm" id="view-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        asset.id
      }'); setModalOnMetadataView();" href="#">
          <i class="fas fa-eye">
          </i>
      </a>
      <a class="btn btn-default btn-sm" id="edit-${index}" data-toggle="modal" data-target="#modal-default" onClick="openEditModal('${
        asset.id
      }'); setModalonEdit()" href="#">
        <i class="fas fa-pencil-alt">
        </i>
    </a>
      </td>
        </tr>
         `
    );
    // usernameSidebar.textContent = carveOutUsername(chicken.owner);
  });
};

function openEditModal(assId) {
  assetId = assId;
}

const carveOutUsername = (username) => {
  return username.split("@")[0];
};

const carveOutPrice = (data = [], key) => {
  let filteredData = data.filter((obj) => obj._id === key);
  if (filteredData.length === 0) return 0;
  return filteredData[0].price;
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
        username = currUser;
        switch (userRole.role) {
          case "Factory":
            listSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            return;

          case "Warehouse":
            shopSection.style.display = "block";
            warehouseSection.style.display = "block";
            requestSection.style.display = "block";
            // window.location.replace("./Warehouse.html");
            return;

          case "Wholesaler":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            return;

          case "Retailer":
            listSection.style.display = "block";
            shopSection.style.display = "block";
            productionSection.style.display = "block";
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            return;
        }
      }
    });
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
        //
      }
    });
};

window.addEventListener("load", async () => {
  getToken();
  const info = await getAllAssets();
  assetData = info;
  getAllWarehouseAsset(info);
});
