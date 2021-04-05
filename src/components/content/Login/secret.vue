<template lang="">
    <div class="loginBody">
        <loginFlash></loginFlash>
        <div class="back animate__animated animate__backInDown" @click='back' v-if='isface'><i class="el-icon-back"></i>
        </div>
        <div class="face">
            <faceBar v-if='isface' ref='faceStyle' :user1='username' class="animate__animated animate__backInDown">
            </faceBar>
        </div>
        <div class="loginContent animate__animated ">
            <h1>暗号</h1>
            <form action="">
                <div >
                    me:<input class="input1" type="email" placeholder="email" name="mail" id="username">
                </div>
                <div >
                    fri:<input class="input2" type="email" placeholder="password" name="password">
                </div>
                <div class="faceLogin">
                    <span @click="createvideo">
                        创建
                    </span>
                </div>
                <div class="button">
                    <input type="button" value="连接" class="btn1" @click='login'>
                </div>
               
                <div class="faceLogin">
                    <span @click="randomvideo">
                        返回
                    </span>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery'
    import axios from 'axios'
    import faceBar from './faceBar.vue'
    import loginFlash from 'components/common/loginFlash.vue'
    import randomTool from 'components/common/randomTool.js'
    export default {
        data() {
            return {
                isface: false,
                formfile: '',
                title: '',
                content: '',
                type: '',
                ispicture: false,
                username: false,
                a: false
            }
        },
        components: {
            faceBar,
            loginFlash
        },
        methods: {
            createvideo() {
                console.log($('.input1').val());
                this.$store.state.ws4.send(JSON.stringify({
                    userId:$('.input1').val(),
                    friId:$('.input2').val(),
                }))
            },
            randomvideo(){
                this.$router.push('/login')
            },

            login() {
                this.$store.state.ws4.send(JSON.stringify({
                    userId:$('.input1').val(),
                    friId:$('.input2').val(),
                    sign:'accept'
                }))
            }

        },
      
        //创建前设置
        mounted() {
            document.querySelector('body').setAttribute('style', 'background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;background-blend-mode: multiply,multiply;')
            
        },
        //销毁前清除
        beforeDestroy() {
            // document.cookie = "expires=;expires=Thu, 18 Dec 1970 12:00:00 GMT;"
            // document.cookie = " 01 Jan 1970 00:00:00 GMT";
            if (document.cookie) {
                console.log(document.cookie);
            }
            this.isface = false
            document.querySelector('body').removeAttribute('style')
        },
    }
</script>
<style scoped lang="less">
    .back {
        margin-left: 10px;
        margin-top: 10px;
        font- width: 10%;

        .el-icon-back {
            /* width: 50px; */
            font-size: 40px;

        }
    }

    .animate__animated.animate__bounce {
        --animate-duration: 2s;
        /* --animate-delay: 2s; */
    }

    .animate__animated.loginContent.animate__fadeOut {
        --animate-duration: 2s;
    }

    .face {
        /* margin-left: 30%;
        margin-top: 10%; */
        left: 30%;
        position: absolute;
        top: 0;
        width: 40%;
        height: 20vh;
        /* border: 1px solid red */
    }

    .loginBody {
        height: 100vh;
        position: relative;
    }

    .loginContent {
        position: absolute;
        /* background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%); */
        top: 30%;
        left: 25%;
        /* transform: translate(-50%, -50%); */
        width: 50%;
        height: 50vh;
        /* background-color: white; */

        h1 {
            background: none;
            text-align: center;
            /* color: */
            color: rgb(61, 241, 172);
            text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0; //字体轮廓
        }

        input {
            /* height: 5vh; */
            /* margin-top: 10px; */
            outline: none;
            background: none;
            border: none;
            border-bottom: 1px solid black;
        }

        .faceLogin {
            position: relative;
            height: 4vh;
            span {
                font-weight: bold;
                margin-top: 3%;
                right: 0;
                position: absolute
            }
        }
    }

    .loginContent .button {
        margin-top: 10px;
        margin-left: 10%;
        width: 80%;
        height: 8%;
        border: 1px solid black;
        border-radius: 10px;
        background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%);
    }

    .loginContent .button2 {
        /* line-height: 8%; */
        display: flex;
        margin-top: 10px;
        /* margin-left: 80%; */
        width: 100%;
        height: 8%;
        border: 1px solid black;
        border-radius: 10px;
        /* background-image: linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%); */
        background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);

        .Nregister {
            flex: 4;
            height: 100%;
            line-height: 32.48px;
            padding-left: 25px
                /* line-height: 100%; */
                /* background:none; */
        }
    }

    .button .btn1 {
        /* margin-left: 50%; */
        font-size: 20px;
        width: 100%;
        height: 100%;
        color: black;
        outline: none;
        border: none;
        /* text-decoration: none; */
    }

    .loginContent .btn2 {
        flex: 6;
        /* height: 100%; */
        line-height: 100%;
        color: black;
        outline: none;
        border: none;
        /* text-decoration: none; */
        cursor: pointer;
        margin-right: 2px;
        font-size: 16px;
        color: rgb(77, 102, 53);
    }
</style>