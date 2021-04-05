<template lang="">
    <div class="registerBody">
        <div class="content">
            <div class="back " @click='back'><i class="el-icon-back" style="font-size: 40px;color: black;"></i></div>
            <registerFlash></registerFlash>
            <div class="login">
                <form action="http://127.0.0.1:3000/faceRegister" method="POST" class="form">
                    <div ref="img" class="img" @click='selectImg'><img src="~assets/img/Chat.png" alt=""></div>
                    <div>头像：<input type="file" name="uploadImg" id="img" v-show=false>
                    </div>
                    <div>电子邮箱:<input type="email" name="mail"></div>
                    <div>账号：<input type="text" name="user"></div>
                    <div>密码：<input type="password" name="password"></div>
                    <div>确认密码：<input type="password" name="ispassword"></div>
                    <div><button class="registerButton" disabled="true" type="button" @click='postImg'>注册</button></div>
                </form>
            </div>
            <!-- <el-button  @click="open1">
                可自动关闭
            </el-button> -->
        </div>
    </div>
</template>
<!-- <link rel="stylesheet" href="~assets/css/loginFlash.css">
<script src="~assets/js/loginFlash.js"></script> -->
<script>
    import $ from 'jquery'
    import axios from 'axios'
    import registerFlash from 'components/common/registerFlash.vue'
    export default {
        data() {
            return {
                formfile: '',
                img: '',
                title: '',
                content: '',
            }
        },

        components: {
            registerFlash
        },

        methods: {
            back() {
                this.$router.push('/login')
            },
            open1() {
                const h = this.$createElement;

                this.$notify({
                    title: this.title,
                    message: h('i', { style: 'color: teal' }, this.content),
                    type: 'success',
                    position: 'bottom-right'
                });
            },
            selectImg() {
                document.querySelectorAll('input')[0].click()
            },
            postImg() {
                var thiss = this
                this.formfile = new FormData()
                var that = this.formfile
                var img = document.querySelector("#img")
                // this.formfile.append('uploadImg', img.files[0])
                console.log($('form').serialize());
                that.append('ok', $('form').serialize())
                // console.log(this.formfile)
                var fr = new FileReader()
                fr.readAsDataURL(img.files[0])
                var b;
                fr.onload = function () {
                    // that.append('avatar', this.result)
                    b = this.result
                    // console.log(b);
                    // console.log(that);
                    // document.querySelector('#me').src = this.result
                    // axios({
                    //     method: 'post',
                    //     url: '/userShow/reAvatar',
                    //     data: {
                    //         userid: that.$store.state.user[0].id,
                    //         username: that.$store.state.user[0].username,
                    //         avatar: this.result
                    //     }
                    // })


                    axios({
                        method: 'post',
                        headers: {
                            // Authorization: `Bearer ${access_token}`
                            // "Access-Control-Allow-Origin": '*'
                        },
                        url: '/register/registerImg',
                        data: {
                            ok: $('form').serialize(),
                            avatar: b
                        },
                        processData: false,
                        contentType: false,
                        // async: false, // 使用同步操作 
                        timeout: 5000000, //超时时间：50秒 
                    }).then(res => {
                        // console.log(res);                
                        if (res) {
                            console.log(res);
                            this.title = res.data.title
                            this.content = res.data.content
                            const h = thiss.$createElement;
                            thiss.$notify({
                                title: thiss.title,
                                message: h('i', { style: 'color: teal' }, this.content),
                                type: 'success',
                                position: 'bottom-right',
                                duration: 1000
                                // onClick:()=>{
                                //     this.$router.push('/login')
                                // }
                            });
                            setTimeout(() => {
                                thiss.$router.push('/login')
                            }, 1500)
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }

                // axios({
                //     method: 'post',
                //     url: 'http://127.0.0.1:3000/Register',
                //     data: $('form').serialize(),
                // }).then(res => {
                //     console.log(res);
                // });
            }
        },
        created() {

        },
        mounted() {
            let imgStyle = this.$refs.img.style
            // console.log(this.$refs.img.style.width = '150px');
            // imgStyle.height = '200px'
            // console.log(imgStyle);
            var focu = document.querySelectorAll('input')
            // console.log(focu);
            // focu.
            focu[1].addEventListener('focus', function () {
                console.log(12);
                focu[1].className = 'focu'
            })
            var divform = document.querySelector('form')
            var divinputs = document.querySelectorAll('form input')
            var registerButton = document.querySelector('.registerButton')
            // console.log(divinputs);
            divform.oninput = function a() {
                // console.log(123);
                let istrue = true
                divinputs.forEach(item => {
                    if (item.value == '') {
                        istrue = false
                    }
                });
                if (divinputs[3].value == divinputs[4].value && istrue) {
                    // console.log('干就完了！');
                    // console.log();
                    registerButton.disabled = false
                }
            }
            var img = document.querySelector("#img")
            var img1 = document.querySelector('img')
            // console.log(this.formfile);
            img.addEventListener('change', function () {
                console.log(this.files);
                var url = URL.createObjectURL(this.files[0])
                img1.src = url
                URL.revokeObjectURL(URL.createObjectURL(this.files[0]));

            })
        },
        updated() {

        },
    }
</script>
<style scoped>
    body {}

    registerBody {
        /* height: 100%; */
        min-height: 100vh;
        /* background: rgb(50, 187, 50); */
    }

    .img {
        /* position: absolute; */
        margin-left: 22.5%;
        /* border: 1px solid red; */
        width: 45%;
        height: 25%;
    }

    .img img {
        width: 100%;
        height: 100%;
        border-radius: 60%;
        /* overflow:hidden; */
        opacity: 0.8;
    }

    .content {
        position: relative;
        color: white;
        height: 100%;
        /* width: 100%;  */
    }

    .login {
        position: absolute;
        top: 20%;
        left: 20%;
        height: 50%;
        width: 70%;
    }

    .form {
        height: 100%;
        color: black;
    }

    input {
        font-size: large;
        width: 100%;
        /* opacity: 0.1; */
        /* background: rgba(0, 0, 0, 0.1); */
        color: blanchedalmond;
        border-style: 0, 0, solid, 0;
        background: none;
        border: none;
        border-bottom: 1px solid black;
        outline: none;
        /* filter:Alpha(opacity=1); opacity: 0.1; */
        /* color:red; */
        /* border:rgba(0,0, 0, 0.5); */
    }

    /* .focu ::after {
        content: 12;
        position: absolute;
        height: 2px;
        background: linear-gradient(red, blue, black);
        width: 100%;
        transition: .5;
    } */

    /* .focu ::after{
        width: 100%;
    } */
</style>