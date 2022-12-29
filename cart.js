const HOST = "http://116.203.61.236:4000";

// combination of 2 below urls --> cart
const getAssetURL = HOST + "/collection/Market/objects";
const getTokenURL =
  HOST + "/channels/mychannel/chaincodes/broilerChickenCC/token";
const getUsersRole = "organizations/roles";

const tableContent = document.querySelector(".table-content");
const token = localStorage.getItem("token");

const inventorySidebar = document.getElementById("inventory-sidebar");
const blockedInvenory = document.getElementById("blocked-amount");
const usernameSidebar = document.getElementById("username-sidebar");

const productionSection = document.getElementById("production-section");
const warehouseSection = document.getElementById("warehouse-section");
const requestSection = document.getElementById("request-section");
const shopSection = document.getElementById("shop-section");
const listSection = document.getElementById("list-section");
const addMoneySection = document.getElementById("add-money-section");
const historySection = document.getElementById("history-section");

const getUsersRoleURL = `${HOST}/${getUsersRole}`;

/*
because we don't have api endpoints to get chickens that are pending
we get them from market assets and filter them
*/

const headers = {
  Authorization: `Bearer ${token}`,
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

const getCartDataForUser = async () => {
  let res = await fetch(getAssetURL, {
    method: "GET",
    headers: headers,
  });

  let data = await res.json();

  let user = await getUser();

  if (data.success) {
    data.message.forEach((asset, index) => {
      if (Object.keys(asset.bids).includes(user)) {
        tableContent.insertAdjacentHTML(
          "beforeend",
          `
                    <tr style="text-align: center; font-size: 16px;">
                        <td>${index + 1}</td>
                        <td>${asset._id}</td>
                        <td> ${asset.asset.owner} </td>
                        <td> ${asset.price} $</td>
                        <td> ${asset.bids[user]} $</td>
                        <td> 1</td>
                        <td> ${asset.asset.forSale ? "Pending" : "Sold"} </td>
                    </tr>

                `
        );
        //usernameSidebar.textContent = carveOutUsername(asset.owner)
      }
    });
  }
};

window.addEventListener("load", async () => {
  await getCartDataForUser();
});

let username = "";
const carveOutUsername = (username1) => {
  if (username1.includes("@")) {
    return username1.split("@")[0];
  } else {
    return username1;
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
      //
    });
};

window.addEventListener("load", async () => {
  await getToken();
});
