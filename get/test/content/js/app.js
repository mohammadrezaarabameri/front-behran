const usersContainer = document.querySelector('#wrap-users')
// const button = document.querySelector('button')
// const feed = document.querySelector('#feed')


userID = null

window.addEventListener('load', () => {
    getAllUsers()
})
    function getAllUsers () {

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                usersContainer.insertAdjacentHTML('beforeend', `
                <div class="user">
                <div class="user-profile-wrap">
                    <div class="user-profile-description">
                    <h3 class="user-explanations">ID:</h3><h1 class="user-profile-name">${user.address.zipcode} - <span class="user-age">2022/05/21</span><h1>
                        <h3 class="user-explanations">Mother Company:</h3><h1 class="user-profile-name"> ${user.company.name} </h1>
                        <h3 class="user-explanations">Price:</h3><h1 class="user-profile-name"> 12000 </h1>
                        <h3 class="user-explanations">Farm:</h3><h1 class="user-profile-name"> ${user.farm}</h1> //  خالی هست در ابتدا و باید ثبت بشه به همره تاریخش
                        <h3 class="user-explanations">Feeding Company:</h3><h1 class="user-profile-name">${user.company.name} </h1> //خالی هست در ابتدا و  باید بعد از قارم مقدار دهی بشه
                        <h3 class="user-explanations">Slaughterhouse:</h3><h1 class="user-profile-name">${user.company.name} </h1> //خالی میمونه
                        <h3 class="user-explanations">Owner:</h3><h1 class="user-profile-name">${user.company.name} </h1> //ویرایش باید بشه
                        <h3 class="user-explanations">Number: ${user.id}</h3>

                    </div>
                </div>
                    <button class="delete-user-btn" onclick="openEditModal('${user.id}')">select buy</button>
                </div>
            </div>


                `)
            });
        })
}

// function openEditModal(id) {
//     userID = id
// }
// function updateUser () {
//     const userNewData = {
//         farm: farm.value , // از مقدار لاگین ورودی باید گرفته بشه
//         owner: owner.value // از مقدار لاگین ورودی باید گرفته بشه
//     }

//     fetch(`https://jsonplaceholder.typicode.com/users/${userID}.json`, {
//         method: 'PUT',
//         headers: {
//             "Content-type": 'application/json'
//         },
//         body: JSON.stringify(userNewData)
//     })
//         .then(res => {
//             console.log(res)
//             getAllUsers()
//         })

// }

// button.addEventListener('click', (e) => {

//     e.preventDefault()

//     let userEdit = {
//         farm: farm.value <br> [date], // از مقدار لاگین ورودی باید گرفته بشه
//         owner: owner.value // از مقدار لاگین ورودی باید گرفته بشه
//     }

//     fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'PUT',
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(userEdit)
//     })
//     .then(res =>{
//          console.log(res)
//          getAllUsers()
//     })

// })

// if(farm == farm.value  ){  // یعنی اگر هر فارمی مقدار لاگین ورودی را گرفته بود
//    function insertFeed(){
    
//         let userInsert = {
//             FeedingCompany : feed.value <br> [date]
//         }
    
//         fetch('https://jsonplaceholder.typicode.com/posts', {
//             method: 'PUT',
//             headers: {
//                 "Content-type": "application/json"
//             },
//             body: JSON.stringify(userInsert)
//         })
//         .then(res =>{
//              console.log(res)
//              getAllUsers()
//         })
    
//     }

// }
// const date = new Date()

// const confing = {
//     weekday : 'long',
//     year : 'numeric',
//     month: 'long',
//     day : 'numeric'
// }