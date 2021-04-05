<template lang="">
    <div id="faceBody">
        <div class="media">
            <video src="" autoplay id="media"></video>
            <!-- <button id="capture" @click='capture'></button> -->
            <canvas width="320" height="240" id="canvas" v-show=false @click='ok'></canvas>
        </div>
        <!-- <div class="back"><span>账号登录</span></div> -->
    </div>
</template>
<script>
    import randomTool from 'components/common/randomTool.js'
    import axios from 'axios'
    import path from "path"
    import url from "url"
    export default {
        data() {
            return {
                mediaStop: '',
                formfile: '',
                isPhoto: false,
                reface: true,
                reface1: true
            }
        },
        props: {
            user1: {
                type: Boolean,
                default() {
                    return false
                }
            },
            a: 456
        },
        methods: {
            ok() {
                console.log('re:' + this.reface);
            },
            pop(title, content, type) {
                const h = this.$createElement;
                this.$notify({
                    title: title,
                    message: h('i', { style: 'color: teal' }, content),
                    type: type,
                    position: 'bottom-right',
                    duration: 1000
                    // onClick:()=>{
                    //     this.$router.push('/login')
                    // }
                });
            },
            revideo() {
                var a = 1
                var video = document.querySelector('video')
                video.addEventListener('click', () => {
                    if (this.reface1) {
                        console.log('点击重新刷脸登录');
                        this.reface1 = false
                        this.capture()
                        // } else {
                        //     console.log('刷脸失败，请用账号密码登录' + a++);
                        // }

                    }
                })

            },
            capture() {
                // console.log(this.user1);
                var closetimeout;
                var control = true
                var a = 1
                // console.log(this);
                const phototime = setInterval(() => {
                    // console.log(this);
                    console.log('刷脸验证时间:' + a++ + '秒');
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
                        this.formfile.append('uploadImg', imgurl)
                        this.formfile.append('name', this.user)
                        // console.log(this.user1);
                        axios({
                            method: 'post',
                            url: '/faceLogin',
                            data: this.formfile
                        }).then(async res => {
                            console.log(res.data);
                            console.log('cookie:' + document.cookie);
                            if (res.data.user_list) {
                                clearInterval(phototime)
                                this.isPhoto = true
                                if (this.isPhoto) {
                                    clearTimeout(closetimeout)
                                    console.log('timeout已关闭，登陆成功！');
                                }


                                //登录验证
                                var cookiesValue = randomTool(5)
                                // document.cookie = "loginCookie=;expires=Thu, 18 Dec 1970 12:00:00 GMT;"
                                document.cookie = "loginCookie=" + cookiesValue + "";
                                const res1 = await axios({
                                    method: 'post',
                                    url: '/login',
                                    data: {
                                        mail:res.data.email,
                                        password:res.data.password
                                    },
                                })
                                // .then(res1 => {
                                // console.log(res1.data);
                                // this.$store.state.userid = res1.data.userid
                                // this.title = res1.data.title
                                // this.content = res1.data.content
                                // this.type = res1.data.type
                                // const h = this.$createElement;
                                // console.log(res);
                                // this.$notify({
                                //     title: this.title,
                                //     message: h('i', { style: 'color: teal' }, this.content),
                                //     type: this.type,
                                //     position: 'bottom-right',
                                //     duration: 1000
                                //     // onClick:()=>{
                                //     //     this.$router.push('/login')
                                //     // }
                                // });
                                // if (this.type == 'success') {
                                //     setTimeout(() => {
                                //         this.$router.push('/mainPage')
                                //     }, 1500)
                                // }

                                // }).catch((err) => {
                                //     console.log(err);
                                // });



                                this.pop(res.data.title, res.data.content, res.data.type)
                                if (res.data.user_list[0].score >= 80) {
                                    setTimeout(() => {
                                        this.$router.push('/mainPage')
                                    }, 1500)
                                }
                            } else {
                                this.pop(res.data.title, res.data.content, res.data.type)
                            }
                        })
                        if (control) {
                            console.log('control');
                            closetimeout = setTimeout(() => {
                                console.log('刷脸登陆失败');
                                if (this.reface) {
                                    this.revideo()
                                }
                                this.reface = false
                                console.log(this.reface);
                                clearInterval(phototime)
                                if (this.reface1 == false) {
                                    const h = this.$createElement;
                                    this.$notify({
                                        title: '刷脸登陆失败',
                                        message: h('i', { style: 'color: teal' }, '正在跳转'),
                                        type: 'error',
                                        position: 'bottom-right',
                                        duration: 3000
                                        // onClick:()=>{
                                        //     this.$router.push('/login')
                                        // }
                                    });
                                }
                            }, 8000)
                        }

                        control = false
                    }
                    else {
                        clearInterval(phototime)
                    }
                }, 1000)
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
            console.log(media);
            this.capture()
        },

        beforeDestroy() {
            // 关闭摄像头
            this.mediaStop.getTracks().forEach(function (track) {
                track.stop();
            });
        },
        destroyed() {
            // console.log(456);
        },
    }
</script>
<style scoped lang="less">
    #faceBody {
        width: 100%;
        height: 100vh;
        position: relative;
        /* background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%); */
        /* background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%); */
    }

    .media {

        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);

        #media {
            width: 220px;
            height: 220px;
            border: 1 solid black;
            border-radius: 60%;
            /* transform: translateY(180deg) */
            transform: rotateY(180deg);
        }

    }
</style>