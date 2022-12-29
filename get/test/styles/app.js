const usersContainer = document.querySelector('.flex-containerl')
const button = document.querySelector('button')
const feed = document.querySelector('#feed')

userID = null

window.addEventListener('load', () => {
    getAllUsers()
})
    function getAllUsers () {

    fetch('http://185.252.29.19:5050/api/allchickens')
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                usersContainer.insertAdjacentHTML('beforeend', `
                <h3 class="mt-4 mb-4">${user.chickenId}</h3>
                <div class="col-md-4">
                  <!-- Widget: user widget style 2 -->
                  <div class="card card-widget widget-user-2">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header bg-warning">
                      <div class="widget-user-image">
                        <img class="img-circle elevation-2" src="../dist/img/user7-128x128.jpg" alt="User Avatar">
                      </div>
                      <!-- /.widget-user-image -->
                      <h3 class="widget-user-username">Nadia Carmichael</h3>
                      <h5 class="widget-user-desc">Lead Developer</h5>
                    </div>
                    <div class="card-footer p-0">
                      <ul class="nav flex-column">
                        <li class="nav-item">
                          <a href="#" class="nav-link">
                            Projects <span class="float-right badge bg-primary">31</span>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a href="#" class="nav-link">
                            Tasks <span class="float-right badge bg-info">5</span>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a href="#" class="nav-link">
                            Completed Projects <span class="float-right badge bg-success">12</span>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a href="#" class="nav-link">
                            Followers <span class="float-right badge bg-danger">842</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- /.widget-user -->
                </div>
                <!-- /.col -->
                <div class="col-md-4">
                  <!-- Widget: user widget style 1 -->
                  <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header bg-info">
                      <h3 class="widget-user-username">Alexander Pierce</h3>
                      <h5 class="widget-user-desc">Founder & CEO</h5>
                    </div>
                    <div class="widget-user-image">
                      <img class="img-circle elevation-2" src="../dist/img/user1-128x128.jpg" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                          <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                  <!-- /.widget-user -->
                </div>
                <!-- /.col -->
                <div class="col-md-4">
                  <!-- Widget: user widget style 1 -->
                  <div class="card card-widget widget-user">
                    <!-- Add the bg color to the header using any of the bg-* classes -->
                    <div class="widget-user-header text-white"
                         style="background: url('../dist/img/photo1.png') center center;">
                      <h3 class="widget-user-username text-right">Elizabeth Pierce</h3>
                      <h5 class="widget-user-desc text-right">Web Designer</h5>
                    </div>
                    <div class="widget-user-image">
                      <img class="img-circle" src="../dist/img/user3-128x128.jpg" alt="User Avatar">
                    </div>
                    <div class="card-footer">
                      <div class="row">
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">3,200</h5>
                            <span class="description-text">SALES</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4 border-right">
                          <div class="description-block">
                            <h5 class="description-header">13,000</h5>
                            <span class="description-text">FOLLOWERS</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                        <div class="col-sm-4">
                          <div class="description-block">
                            <h5 class="description-header">35</h5>
                            <span class="description-text">PRODUCTS</span>
                          </div>
                          <!-- /.description-block -->
                        </div>
                        <!-- /.col -->
                      </div>
                      <!-- /.row -->
                    </div>
                  </div>
                  <!-- /.widget-user -->
                </div>
                <!-- /.col -->
            


                `)
            });
        })
}

function openEditModal(id) {
    userID = id
}
function updateUser () {
   
    const userNewData = {
        far: farm.value , // از مقدار لاگین ورودی باید گرفته بشه
        owner: owner.value // از مقدار لاگین ورودی باید گرفته بشه
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${userID}.json`, {
        method: 'PUT',
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(userNewData)
    })
        .then(res => {
            console.log(res)
            getAllUsers()
        })

}

button.addEventListener('click', (e) => {

    e.preventDefault()

    let userEdit = {
        farm: farm.value  [date], // از مقدار لاگین ورودی باید گرفته بشه
        owner: owner.value // از مقدار لاگین ورودی باید گرفته بشه
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userEdit)
    })
    .then(res =>{
         console.log(res)
         getAllUsers()
    })

})
function insertFeed(){
if(farm == farm.value  ){  // یعنی اگر هر فارمی مقدار لاگین ورودی را گرفته بود

    
        let userInsert = {
            FeedingCompany : feed.value  [date]
        }
    
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userInsert)
        })
        .then(res =>{
             console.log(res)
             getAllUsers()
        })
    
    }

}
const date = new Date()

const confing = {
    weekday : 'long',
    year : 'numeric',
    month: 'long',
    day : 'numeric'
}