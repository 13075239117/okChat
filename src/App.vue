<template>
  <div>
    <!-- <transition> -->
    <router-view></router-view>
    <!-- </transition> -->

    <!-- <login></login>  -->
  </div>
</template>
<script>
  import axios from 'axios'
  import register from 'views/register/register.vue'
  import login from 'views/login/login.vue'
  export default {
    data() {
      return {
        ws: '',
        ws2: '',
        ws3: '',
        ws4: ''
      }
    },
    computed: {
      //动态提醒
      isshow() {

        console.log(this.$store.state.dom1);//更改颜色red
        return this.$store.state.isshow
      },
      web() {
        return this.$store.state.user
      }
    },
    watch: {
      web() {
        // console.log(this.ws2.readyState);
        setTimeout(() => {
          if (this.ws2.readyState == 1) {
            console.log('vvvvideo');
            // console.log(5555);
            this.ws2.send(JSON.stringify({
              userId: this.$store.state.user[0].id
            }))
            this.ws3.send(JSON.stringify({
              userId: this.$store.state.user[0].id
            }))
          }
        }, 2000);

      },
      isshow() {
        // console.log(444);
        this.$store.state.dom1[2].style.color = 'red'
        console.log('get!');
        this.$notify({
          title: '你有新的动态',
          // message: '你有新的动态',
          // type: 'success',
          position: 'top-right',
          duration: 3000,
          customClass: 'ok',

        });
      }
    },
    methods: {
      reload() {


        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload", () => {
          console.log("存vuex前的数据")
          console.log(this.$store.state.user, JSON.parse(sessionStorage.getItem("store")))

          sessionStorage.setItem("store", JSON.stringify(this.$store.state))

          console.log("存vuex后的数据")
          console.log(this.$store.state, JSON.parse(sessionStorage.getItem("store")))
        })

        // 在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store")) {
          console.log("读取sessionstorage前的数据")
          console.log(this.$store.state, JSON.parse(sessionStorage.getItem("store")))

          this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))

          console.log("读取sessionstorage后的数据")
          console.log(this.$store.state, JSON.parse(sessionStorage.getItem("store")))
        }


      },
      chatwebsocket() {
        if ("WebSocket" in window) {
          console.log("您的浏览器支持 WebSocket!");

          this.ws2 = new WebSocket(`wss://${location.host}/websocket`)
          // this.global.setWs(this.ws);
          this.ws2.onopen = e => {
            console.log('chat已连接');
            // console.log(this.ws2.readyState);
            // this.ws.send('showshowshow!')
            this.$store.commit('onWs2', this.ws2)

          };

          this.ws2.onclose = e => {
            // 关闭 websocket
            console.log("chat连接已关闭...");
            setTimeout(() => {
              this.chatwebsocket();
            }, 2000);
          };
        } else {
          // 浏览器不支持 WebSocket
          console.log("您的浏览器不支持 WebSocket!");
        }
      },
      localSocket() {
        // let that = this;
        if ("WebSocket" in window) {
          console.log("您的浏览器支持 WebSocket!");

          this.ws = new WebSocket(`wss://${location.host}/show`)
          // this.global.setWs(this.ws);
          this.ws.onopen = e => {
            console.log('show已连接');
            // this.ws.send('showshowshow!')
            this.$store.commit('onWs', this.ws)
          };

          this.ws.onclose = e => {
            // 关闭 websocket
            console.log("连接已关闭...");
            setTimeout(() => {
              this.localSocket();
            }, 2000);
          };
        } else {
          // 浏览器不支持 WebSocket
          console.log("您的浏览器不支持 WebSocket!");
        }
      },
      videowebsocket() {
        if ("WebSocket" in window) {
          console.log("您的浏览器支持 WebSocket!");

          this.ws3 = new WebSocket(`wss://${location.host}/video`)
          // this.global.setWs(this.ws);
          this.ws3.onopen = e => {
            console.log('video已连接');
            // console.log(this.ws3.readyState);
            // this.ws.send('showshowshow!')
            this.$store.commit('onWs3', this.ws3)

          };

          this.ws3.onclose = e => {
            // 关闭 websocket
            console.log("video连接已关闭...");
            setTimeout(() => {
              this.videowebsocket();
            }, 2000);
          };
          this.ws3.onmessage = e => {
            const res = JSON.parse(e.data)
            console.log(res);
            switch (res.sign) {
              case 'accept':
                var name = this.$store.state.friend.find(item => item.id == res.userId).username
                this.$confirm(`是否接听${name}的来电`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  console.log(555656);
                  this.$router.push({
                    path: '/video',
                    query: {
                      userId: res.friId,
                      friId: res.userId,
                      // friName: this.$route.query.username
                    }
                  })
                  this.ws3.send(JSON.stringify({

                    userId: res.friId,
                    friId: res.userId,
                    sign: 'OK'
                    // friName: this.$route.query.username

                  }))
                  console.log('OKOKO');

                }).catch(() => {
                  this.ws3.send(JSON.stringify({

                    userId: res.friId,
                    friId: res.userId,
                    sign: 'fuck'
                    // friName: this.$route.query.username

                  }))
                });

                console.log('video accept');
                break;
              case 'fuck':
                // console.log('对方已拒绝');
                this.$notify({
                  title: '对方已拒绝',
                  // message: '你有新的动态',
                  // type: 'success',
                  position: 'top-right',
                  duration: 3000,
                  customClass: 'ok',

                });
                // this.$confirm(`'对方已拒绝'`, '提示', {
                //   confirmButtonText: '确定',
                //   // cancelButtonText: '取消',
                //   type: 'warning'
                // }).then(() => {

                // }).catch(() => {

                // });
                break;
              case 'OK':
                this.$notify({
                  title: '对方已准备就绪',
                  // message: '你有新的动态',
                  type: 'success',
                  position: 'top-right',
                  duration: 3000,
                  customClass: 'ok',

                });
                break;
              default:
                break;
            }

          }
        } else {
          // 浏览器不支持 WebSocket
          console.log("您的浏览器不支持 WebSocket!");
        }
      },
      randomwebbsocket() {
        if ("WebSocket" in window) {
          console.log("您的浏览器支持 WebSocket!");

          this.ws4 = new WebSocket(`wss://${location.host}/random`)
          // this.global.setWs(this.ws);
          this.ws4.onopen = e => {
            console.log('randomvideo已连接');
            // console.log(this.ws4.readyState);
            // this.ws.send('showshowshow!')
            this.$store.commit('onWs4', this.ws4)

          };

          this.ws4.onclose = e => {
            // 关闭 websocket
            console.log("video连接已关闭...");
            setTimeout(() => {
              this.randomwebbsocket();
            }, 2000);
          };
          this.ws4.onmessage = e => {
            const res = JSON.parse(e.data)
            console.log('okokok');
            console.log(res);
            switch (res.sign) {
              case 'accept':
                var name = 'joy'
                this.$confirm(`是否接听${name}的来电`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  console.log(555656);
                  this.$router.push({
                    path: '/video',
                    query: {
                      userId: res.friId,
                      friId: res.userId,
                      // friName: this.$route.query.username
                    }
                  })
                  this.ws4.send(JSON.stringify({

                    userId: res.friId,
                    friId: res.userId,
                    sign: 'OK'
                    // friName: this.$route.query.username

                  }))
                  // console.log('OKOKO');

                }).catch(() => {
                  this.ws4.send(JSON.stringify({

                    userId: res.friId,
                    friId: res.userId,
                    sign: 'fuck'
                    // friName: this.$route.query.username

                  }))
                });

                console.log('video accept');
                break;
              case 'fuck':
                // console.log('对方已拒绝');
                this.$notify({
                  title: '对方已拒绝',
                  // message: '你有新的动态',
                  // type: 'success',
                  position: 'top-right',
                  duration: 3000,
                  customClass: 'ok',

                });
                break;
              case 'OK':
                this.$notify({
                  title: '对方已准备就绪',
                  // message: '你有新的动态',
                  type: 'success',
                  position: 'top-right',
                  duration: 3000,
                  customClass: 'ok',

                });
                this.$router.push({
                  path: '/video',
                  query: {
                    userId: res.friId,
                    friId: res.userId,
                    // friName: this.$route.query.username
                  }
                })
                break;
              default:
                break;
            }

          }
        } else {
          // 浏览器不支持 WebSocket
          console.log("您的浏览器不支持 WebSocket!");
        }
      },

    },
    components: {
      login
    },
    async created() {
      const res = await axios({
        method: 'get',
        url: '/account',
        // data: this.formfile
      })
      // console.log(res.data);
      this.$store.commit('userAdd', res.data.user)
      this.chatwebsocket()
      this.localSocket()
      this.videowebsocket()
      this.randomwebbsocket()
    },
    mounted() {
      // window.addEventListener('unload', async () => {
      //   console.log(window.location.pathname);
      //   // console.log(window.location.host);
      //   if (window.location.pathname !== '/mainPage/recentMsg') {
      //     window.location.href = '/mainPage/recentMsg'

      //   }
      //   // await sessionStorage.setItem('state', JSON.stringify(this.$store.state))

      // })

    },
  }
</script>

<style>
  * {
    left: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    /* text-decoration: none; */
    /* box-sizing: border-box; */
  }

  .ok {
    background: rgb(121, 233, 130) !important;
    /* color: green; */
    height: 5vh;
    float: right;
    margin-left: 7vh;
  }

  /* .v-enter {
    opacity: 0;
}

.v-enter-to {
    opacity: 1;
}
.v-enter-active{
    transition:1s;
}
.v-leave {
    opacity:1;
}

.v-leave-to {
    opacity:0;
}

.v-leave-active {
    transition:1s;

} */
</style>