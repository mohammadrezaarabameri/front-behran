const usersContainer = document.querySelector(".row");
const button = document.querySelector("button");
const feed = document.querySelector("#feed");

const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");

const firstname = document.querySelector(".firstname");
const lastname = document.querySelector(".lastname");
const password = document.querySelector(".password");

const productSection = document.querySelector(".content-wrapper");

let userID = null;
let totalPriceOfAsset = 0;

const HOST = "http://116.203.61.236:4000";
const getAssetsInMarket = "collection/Market/objects";
const bidAsset = "channels/mychannel/chaincodes/broilerChickenCC/asset/bid";
const getUsersRole = "organizations/roles";

const getTokenURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/token";

const inventorySidebar = document.getElementById("inventory-sidebar");
const blockedInvenory = document.getElementById("blocked-amount");
const usernameSidebar = document.getElementById("username-sidebar");

// sidebar buttons
const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const getAssetsURL = `${HOST}/${getAssetsInMarket}`;
const bidAssetURL = `${HOST}/${bidAsset}`;
const getUsersRoleURL = `${HOST}/${getUsersRole}`;
const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
const setActive = (e) => {
  console.log(e);
};

// TODO: add alert

// place on bid button
const setBidOnAsset = (assetId, assetOwner, price) => {
  modalBody.innerHTML = `
  <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
  </div>
</div>
  `;

  const data = {
    assetId: assetId,
    assetOwner: assetOwner,
    price: price,
  };

  fetch(bidAssetURL, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      // loading
      $("#modal-default").modal("toggle");

      if (data.success === false) {
        productSection.insertAdjacentHTML(
          "afterbegin",
          `
      <div class="alert alert-danger" role="alert" id='alert-2'>
              Transaction Failed - ${data.message}
      </div>
      `
        );
        let alert2 = document.getElementById("alert-2");
        setTimeout(() => alert2.remove(), 3000);
      } else if (data.error == null) {
        productSection.insertAdjacentHTML(
          "afterbegin",
          `
      <div class="alert alert-success" role="alert" id='alert-1'>
              Product with ID: ${assetId} & Price: ${price} added to Cart
      </div>
      `
        );
        let alert1 = document.getElementById("alert-1");
        setTimeout(() => alert1.remove(), 3000);
      }
    });
};

const putOnBidForProductInModal = (assetId, assetOwner1, basePrice) => {
  modalBody.innerHTML = "";
  modalBody.insertAdjacentHTML(
    "beforeend",
    `
    <p>
    Your bid price should greater than or equal to base price

    </p>
    <input type='number' id='bid-price' name='bid-price' class='form-control mt-2' placeholder='Enter the price' require />
  `
  );

  // bidPriceAdded.value = basePrice;

  save.addEventListener("click", () => {
    let bidPriceAdded = document.getElementById("bid-price");
    bidPriceAdded.setAttribute("min", basePrice);

    if (Number(bidPriceAdded.value) < basePrice) {
      // loading
      if ($("#modal-default").hasClass("show")) {
        $("#modal-default").modal("toggle");
      }

      if (productSection.getElementsByClassName("alert").length > 0) {
        let alerts = productSection.getElementsByClassName("alert");
        for (let index = 0; index < alerts.length; index++) {
          alerts[index].remove();
        }
      }

      productSection.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="alert alert-danger" role="alert" id='alert-3'>
              Transaction Failed - Your bid Price should be higher than base price
      </div>
      `
      );
      let alert3 = document.getElementById("alert-3");
      setTimeout(() => alert3.remove(), 3000);
    } else {
      setBidOnAsset(assetId, assetOwner1, Number(bidPriceAdded.value));
    }
    bidPriceAdded.value = "";
  });
};

window.addEventListener("load", () => {
  getAllAssetsInMarket();
});

function getAllAssetsInMarket() {
  fetch(getAssetsURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.message.forEach((chicken, index) => {
        usersContainer.insertAdjacentHTML(
          "afterbegin",
          `
                
                <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="card card-widget widget-user">
                  <div class="widget-user-header bg-info" style="height: 30%">
                    <h3 class="widget-user-username"> ${carveOutUsername(
                      chicken.asset.owner
                    )}</h3>
                  </div>

                  <!-- tabs block -->
                  <div class="card card-primary card-tabs">
                  <div class="card-header p-0 pt-1">
                    <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active" id="custom-tabs-one-single-tab-${index}" data-toggle="pill" href="#custom-tabs-one-single-${index}" role="tab" aria-controls="custom-tabs-one-single" aria-selected="true">Asset</a>
                      </li>
                      <li class="nav-item" style="display: none;">
                        <a class="nav-link" id="custom-tabs-one-details-tab-${index}" data-toggle="pill" href="#custom-tabs-one-details-${index}" role="tab" aria-controls="custom-tabs-one-details" aria-selected="false">Details</a>
                      </li>
                      
                    </ul>
                  </div>
                  <div class="card-body">
                    <div class="tab-content" id="custom-tabs-one-tabContent">
                      <div class="tab-pane fade show active" id="custom-tabs-one-single-${index}" role="tabpanel" aria-labelledby="custom-tabs-one-single-tab-${index}">
                      <div class="card-footer">
                    <div class="row">
                      <div class="col-sm-4 border-right">
                        <div class="description-block">
                          <h5 class="description-header">PRODUCT</h5>
                          <span class="description-text">OIL</span>
                        </div>
                        <!-- /.description-block -->
                      </div>
                      <!-- /.col -->
                      <div class="col-sm-4 border-right">
                        <div class="description-block">
                          <h5 class="description-header">NUMBER</h5>
                          <span class="description-text">
                          ${
                            Number(chicken.asset.childesCount) > 0
                              ? chicken.asset.childesCount
                              : 1
                          }
                          </span>
                          </span>
                        </div>
                        <!-- /.description-block -->
                      </div>
                      <!-- /.col -->
                      <div class="col-sm-4">
                        <div class="description-block">
                          <h5 class="description-header">Base Price</h5>
                          <span class="description-text" id="price-${index}">${
            chicken.price
          }</span>
                        </div>
                        <!-- /.description-block -->
                        </div>

                      <button class="btn btn-primary" data-toggle="modal" data-target="#modal-default" onclick="putOnBidForProductInModal('${
                        chicken._id
                      }', '${chicken.asset.owner}',  ${
            chicken.price
          })" style="width: 100%">Place Your Bid</button>

                      <!-- /.col -->
                    </div>
                    <!-- /.row -->
                    </div>
                      
                    </div>
                      <div class="tab-pane fade" id="custom-tabs-one-details-${index}" role="tabpanel" aria-labelledby="custom-tabs-one-details-tab-${index}">
                        <p>breed: ${chicken.asset.breed}</p>
                        <p>birthday: ${chicken.asset.birthday}</p>
                      </div>
                    </div>
                  </div>
                  <!-- /.card -->
                </div>
                  <!-- end tabs block -->


                </div>
                <!-- /.widget-user -->
              </div>


                `
        );
      });
    });
}

function openEditModal(id) {
  userID = id;
}

let username = null;
//name for proifle
const carveOutUsername = (username) => {
  return username.split("@")[0];
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
            return;

          case "Warehouse":
            warehouseSection.style.display = "block";
            shopSection.style.display = "block";
            requestSection.style.display = "block";
            // window.location.replace("./Warehouse.html");
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
            historySection.style.display = "block";
            addMoneySection.style.display = "block";
            requestSection.style.display = "block";
            return;
        }
      }
    });
};

const getToken = () => {
  fetch(getTokenURL, {
    method: "GET",
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error !== "null") {
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

const sellChickenToCustomer = (_id, customer) => {
  const data = {
    id: _id,
    customer: customer,
  };

  fetch(sellChickenURL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      /**
      productSection.insertAdjacentHTML('afterbegin', `
          <div class="alert alert-success" role="alert" id='alert-1'>
                  Product with ID: ${assetId} & Price: ${price} added to Cart
          </div>
          `)
      let alert1 = document.getElementById('alert-1');
      setTimeout(() => alert1.remove(), 3000 ) 


       */
    });
};

//name for proifle

window.addEventListener("load", async () => {
  await getToken();
});
