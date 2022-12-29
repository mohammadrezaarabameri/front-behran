const button = document.querySelector('#enter')
const usersContainer = document.querySelector('.col-md-12')
const feed = document.querySelector('#feed')
let webLink;

button.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    if(userData){
         button.onclick = ()=>{
          
                fetch(`https://jsonplaceholder.typicode.com/users/${userData}`)  
                  .then(res => res.json())
                  .then(data => {
                    usersContainer.insertAdjacentHTML('beforeend', `
                    <!-- Timelime example  -->

                        <!-- The time line -->
                        <div class="timeline">
                          <!-- timeline time label -->
                          <div class="time-label1">
                          <span class="bg-yellow"> CHicken Id: ${data.id}</span>
                        </div>

                          <!-- /.timeline-label -->
                          <!-- timeline item -->
                          <div>
                            <div class="widget-user-image">
                            <img class="img-circle elevation-21" src="dist/img/closeup-shot-brown-chick-cloth-with-white-scene.jpg" alt="User Avatar">
                            </div>
                            <!-- <i class="fas fa-envelope bg-blue"></i> -->
                            <div class="timeline-item">
                              <span class="time"><i class="fas fa-clock"></i> 12:05</span>
                              <div class="time-label">
                              <span class="bg-yellow">10 Feb. 2022</span>
                            </div>
                              <h3 class="timeline-header"><a href="#">Mother Company </a>  ${data.name}</h3>
                    
                              <div class="timeline-body">
                                Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                quora plaxo ideeli hulu weebly balihoo...
                              </div>
                             
                            </div>
                          </div>
                          <!-- END timeline item -->
                          <!-- timeline item -->
                         
                          <div>
                            <div class="widget-user-image">
                              <img class="img-circle elevation-21" src="dist/img/hens-head-close-up.jpg" alt="User Avatar">
                              </div>
                            <div class="timeline-item">
                              <span class="time"><i class="fas fa-clock"></i> 16:30</span>
                              <div class="time-label">
                              <span class="bg-yellow">16 Feb. 2022</span>
                            </div>
                              <h3 class="timeline-header no-border"><a href="#">CHicken Farm </a> ${data.address.street} request</h3>
                            </div>
                          </div>
                          <!-- END timeline item -->
                          <!-- timeline item -->
                          <div>
                            <!-- <i class="fas fa-comments bg-yellow"></i> -->
                            <div class="timeline-item">
                              <span class="time"><i class="fas fa-clock"></i> 27 mins ago</span>
                              <h3 class="timeline-header"><a href="#">Feeding Company </a> ${data.username}</h3>
                              <div class="timeline-body">
                                Take me to your leader!
                                Switzerland is small and neutral!
                                We are more like Germany, ambitious and misunderstood!
                              </div>
                            </div>
                          </div>
                          <!-- END timeline item -->
                          <!-- timeline time label -->
                          
                          <!-- /.timeline-label -->
                          <!-- timeline item -->
                          <div>
                            <div class="widget-user-image">
                            <img class="img-circle elevation-21" src="dist/img/raw-chicken-meat.jpg" alt="User Avatar">
                            </div>
                            <!-- <i class="fas fa-envelope bg-blue"></i> -->
                            <div class="timeline-item">
                              <span class="time"><i class="fas fa-clock"></i> 12:05</span>
                              <div class="time-label">
                            <span class="bg-yellow">3 Jan. 2022</span>
                          </div>
                              <h3 class="timeline-header"><a href="#">Slaughter House</a> ${data.address.city}</h3>
                    
                              <div class="timeline-body">
                                Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
                                weebly ning heekya handango imeem plugg dopplr jibjab, movity
                                jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
                                quora plaxo ideeli hulu weebly balihoo...
                              </div>
                             
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
                    
          
                          `)
                      });
                  
          }
        }
    }
//     <div><span class="male">Chicken ${data.id} 
// </span><span class="female">Mother Company: ${data.company.name}
// </span><span class="spacer"></span><span class="male">
// 1633 - 1697</span></div>


