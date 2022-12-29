const usersContainer = document.querySelector('#wrap-users')
const button = document.querySelector('button')
const feed = document.querySelector('#feed')


chickensCount = null

window.addEventListener('load', () => {
    getAllUsers()
})
    function getAllUsers () {

    fetch('http://185.252.29.19:5050/api/allchickens')
        .then(res =>{
             res.json()
             console.log(res);
        })
        .then(data => {
            data.forEach(user => {
                usersContainer.insertAdjacentHTML('beforeend', `
                <div class="user">
                <div class="user-profile-wrap">
                    <div class="user-profile-description">
                    <h3 class="user-explanations">chickenId:</h3><h1 class="user-profile-name">${user.chickenId} - <span class="user-age">2022/05/21</span><h1>
                        <h3 class="user-explanations">Mother Company:</h3><h1 class="user-profile-name"> ${user.motherCompany} </h1>
                        <h3 class="user-explanations">Farm:</h3><h1 class="user-profile-name">${user.chickenFarm}</h1>
                        <h3 class="user-explanations">Feeding Company:</h3><h1 class="user-profile-name">${user.feedingCompany}</h1>
                        <h3 class="user-explanations">Slaughterhouse:</h3><h1 class="user-profile-name">${user.slaughterHouse}</h1>  
                        <h3 class="user-explanations">Owner:</h3><h1 class="user-profile-name">${user.owner} </h1> 

                    </div>
                </div>
                    <button class="put-user-btn" onclick="openEditModal('${user.chickenId}')">Select Buy</button>
                </div>
            


                `)
            });
        })
}
// const chickenFarm = FARM123
function openEditModal(allchickens) {
    chickensCount = allchickens
}
function updateUser () {
    const  chickenNewData = {
        chickenFarm: chickenFarm.value ,
        owner: chickenFarm.value 
    }

    fetch(`http://185.252.29.19:5050/api/updatechicken/${chickensCount}.json`, {
        method: 'PUT',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(chickenNewData)
    })
        .then(res => {
            console.log(res)
            getAllUsers()
        })

}

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