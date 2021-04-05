<template lang="">
    <v-app app>
        <v-main id="faceBody" app>

            <div class="media">
                <video src="" autoplay id="media"></video>
                <button id="capture" @click='capture'>拍照</button>
                <canvas width="320" height="240" id="canvas"></canvas>
            </div>
            <!-- <div class="back"><span>账号登录</span></div> -->
            <div v-if='register'><h1>注册成功！</h1></div>
        </v-main>
    </v-app>

</template>
<script>
    import axios from 'axios'
    import path from "path"
    import url from "url"
    export default {
        data() {
            return {
                mediaStop: '',
                register:false
            }
        },
        methods: {
           async capture() {
                // console.log(this.user1);
                var closetimeout;
                var control = true
                var a = 1
                // console.log(this);
                // const phototime = setInterval(() => {
                // console.log(this);
                // console.log('刷脸验证时间:' + a++ + '秒');
                const media = document.querySelector('#media')
                // console.log(media);
                const capture = document.querySelector('#capture')
                const canvas = document.querySelector('#canvas')
                const context = canvas.getContext('2d')
                if (context) {
                    context.drawImage(media, 0, 0)
                    // console.log(context);
                    const imgurl = canvas.toDataURL("image/png")//转化为img
                    // img.src = imgurl
                    // console.log(imgurl);
                    this.formfile = new FormData()
                    await this.formfile.append('uploadImg', imgurl)
                    await this.formfile.append('user', JSON.stringify({
                        email: this.$store.state.user[0].email,
                        password: this.$store.state.user[0].password,
                        id: this.$store.state.user[0].id
                    }))
                    console.log( this.formfile);
                    // console.log(this.user1);
                    axios({
                        method: 'post',
                        url: '/faceRegister',
                        data: this.formfile
                    }).then(res => {
                        console.log(res.data);
                        if (res.data == 'SUCCESS') {
                            console.log('注册成功');
                            this.register = true
                        }else{
                            console.log('注册失败，请重试。。');
                            this.register = false
                        }
                        // console.log('cookie:' + document.cookie);
                        // if (res.data.user_list) {
                        //     clearInterval(phototime)
                        //     this.isPhoto = true
                        //     if (this.isPhoto) {
                        //         clearTimeout(closetimeout)
                        //         console.log('timeout已关闭，登陆成功！');
                        //     }
                        //     this.pop(res.data.title, res.data.content, res.data.type)
                        //     if (res.data.user_list[0].score >= 80) {
                        //         setTimeout(() => {
                        //             this.$router.push('/mainPage')
                        //         }, 1500)
                        //     }
                        // } else {
                        //     this.pop(res.data.title, res.data.content, res.data.type)
                        // }
                    })
                    // if (control) {
                    //     console.log('control');
                    //     closetimeout = setTimeout(() => {
                    //         console.log('刷脸登陆失败');
                    //         if (this.reface) {
                    //             this.revideo()
                    //         }
                    //         this.reface = false
                    //         console.log(this.reface);
                    //         clearInterval(phototime)
                    //         if (this.reface1 == false) {
                    //             const h = this.$createElement;
                    //             this.$notify({
                    //                 title: '刷脸登陆失败',
                    //                 message: h('i', { style: 'color: teal' }, '正在跳转'),
                    //                 type: 'error',
                    //                 position: 'bottom-right',
                    //                 duration: 3000
                    //                 // onClick:()=>{
                    //                 //     this.$router.push('/login')
                    //                 // }
                    //             });
                    //         }
                    //     }, 8000)
                    // }

                    // control = false
                }
                // else {
                //     clearInterval(phototime)
                // }
                // }, 1000)
            }

        },
        mounted() {
            // document.querySelector('body').setAttribute('style', 'background: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);')
            // console.log(this.user1);
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: 250,
                    height: 250,
                    sourceId: 'default',
                    facingMode: { exact: "user" }
                },
                audio: false
            }).then(stream => {
                media.srcObject = stream
                media.play()
                this.mediaStop = stream
            })
            // console.log(media);
            // this.capture()
        },

        beforeDestroy() {
            // 关闭摄像头
            this.mediaStop.getTracks().forEach(function (track) {
                track.stop();
            });
        },
    }
</script>
<style lang="less" scoped>
    #faceBody {
        position: fixed;
        top: 0;
        right: 0;
    }
</style>