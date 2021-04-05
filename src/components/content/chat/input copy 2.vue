<template lang="">
    <div class="container">
        <div class="content">
            <div class="item item-center"><span>{{time}}</span></div>
            <div class="item item-center"><span>你已添加了{{friName}}，现在可以开始聊天了。</span></div>
            <div class="item item-left" v-for='item in leftMsg'>
                <div class="avatar"><img :src="avatar" />
                </div>
                <div class="bubble bubble-left">{{item}}</div>
            </div>
        </div>
        <div class="input-area">
            <div class="video">
                <button class="view" @click='showView'>视频</button>
            </div>
            <textarea name="text" id="textarea" v-model='message'></textarea>
            <div class="button-area">
                <button id="send-btn" @click='send'>发 送</button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import axios from 'axios'
    import socketClient from 'components/content/network/WebSocket.js'
    export default {
        data() {
            return {
                newMsg:'',
                allMsg: [],
                userrr: {},
                ws: '',
                acceptMsg: '',
                // acceptArr:[],
                nowMsg: {},
                userId: '',
                friId: '',
                time: '12:00',
                leftMsg: [],
                rightMsg: '',
                message: "",
                centerMsg: '',
                friName: '小明',
                avatar: require('@/assets/img/王力宏.jpg')
            }
        },
        methods: {
            showView() {
                // this.$router.push('/video')
                this.$router.push({
                    path: '/video',
                    query: {
                        userId: this.$store.state.user[0].id,
                        friId: this.$route.query.id,
                        friName: this.$route.query.username
                    }
                })
            },
            send() {
                //添加到最近联系人
                 var date = new Date().getTime()
                    this.$store.commit('recentFri', {
                        [this.$route.query.id]:date,
                    })
                 
                this.nowMsg['msg'] = this.message
                this.nowMsg['friId'] = this.$route.query.id
                this.nowMsg['userId'] = this.$store.state.user[0].id
                // console.log(this.$store.state.userid);
                var right = document.createElement('div')
                right.innerHTML = `<div class="item item-right" >
                <div class="bubble bubble-right">${this.message}</div>
                <div class="avatar"><img src=${this.avatar} />
                </div>
            </div>`
                var content = document.querySelector('.content')
                content.appendChild(right)
                this.message = ''
                document.querySelector('#textarea').focus();
                //滚动条置底
                let height = document.querySelector('.content').scrollHeight;
                document.querySelector(".content").scrollTop = height;
                this.ws.send(JSON.stringify(this.nowMsg))
            },
            accept() {

            }
        },
        created() {
            this.userId = this.$store.state.user[0].id
            this.friId = this.$route.query.id
            this.userrr['friId'] = this.$route.query.id
            this.userrr['userId'] = this.$store.state.user[0].id
            // socketClient(this.nowMsg, this.acceptMsg)

            // console.log(this.friId);
            // for (let item of this.$store.state.friend) {
            //     if(item.id == this.id){ 
            //         this.avatar =item.avatar
            //         this.friName = item.username
            //         // console.log(this.avatar);
            //     }
            // }
        },
        mounted() {
            //获取最近信息
            axios({
                method: 'post',
                url: '/chat',
                data: {
                    userId: this.$store.state.user[0].id,
                    friId: this.$route.query.id,
                }
            }).then(res => {
                // console.log(res.data);
                // const allMsg = res.data
                for (let i of res.data) {
                    if (i.userid == this.userId) {
                        var right = document.createElement('div')
                        right.innerHTML = `<div class="item item-right" >
                <div class="bubble bubble-right">${i.msg}</div>
                <div class="avatar"><img src=${this.avatar} />
                </div>
            </div>`
                        var content = document.querySelector('.content')
                        content.appendChild(right)
                        document.querySelector('#textarea').focus();
                        // break;
                    } else {
                        var left = document.createElement('div')
                        left.innerHTML = ` <div class="item item-left" >
                <div class="avatar"><img src=${this.avatar} />
                </div>
                <div class="bubble bubble-left">${i.msg}</div>
            </div>`
                        var content = document.querySelector('.content')
                        content.appendChild(left)
                        // break;
                    }
                }
                let height = document.querySelector('.content').scrollHeight;
                document.querySelector(".content").scrollTop = height;
            })
            this.ws = new WebSocket(`wss://${location.host}/websocket`)
            socketClient(this.ws, this.userrr, this.leftMsg, this.allMsg)
            let btn = document.querySelector('#send-btn')
            let text = document.querySelector('#textarea')
            text.addEventListener('keydown', (e) => {
                var evt = e || event;
                if (evt.keyCode == 13 && evt.altKey) {
                    // console.log(555);
                    btn.click();
                }
            })

        },
        updated() {
            // this.leftMsg.push(this.acceptMsg)
            // console.log(this.allMsg);
        },
        destroyed() {
            this.ws.close() //离开路由之后断开websocket连接
        },
    }
</script>
<style scoped>
    * {
        padding: 0;
        margin: 0;
    }

    body {
        /* height: 100vh; */
        width: 100%;
        display: flex;
        align-items: center;
        /* justify-content: center; */
    }

    .container {
        height: 91vh;
        /* width: 900px; */
        width: 100%;
        border-radius: 4px;
        border: 0.5px solid #e0e0e0;
        background-color: #f5f5f5;
        display: flex;
        flex-flow: column;
        overflow: hidden;
    }

    .content {
        /* width: calc(100% - 40px); */
        padding: 20px;
        overflow-y: scroll;
        flex: 1;
    }

    .content:hover::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
    }

    .content>>>.bubble {
        max-width: 150px;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        color: #000;
        word-wrap: break-word;
        word-break: normal;
    }

    .content>>>.item-left .bubble {
        margin-left: 15px;
        background-color: #fff;
    }

    .content>>>.item-left .bubble:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-top: 10px solid transparent;
        border-right: 10px solid #fff;
        border-bottom: 10px solid transparent;
        left: -20px;
    }

    .content>>>.item-right .bubble {
        margin-right: 15px;
        background-color: #9eea6a;
    }

    .content>>>.item-right .bubble:before {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid #9eea6a;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        right: -20px;
    }

    .content>>>.item {
        margin-top: 15px;
        display: flex;
        width: 100%;
    }

    .content>>>.item.item-right {
        justify-content: flex-end;
    }

    .content>>>.item.item-center {
        justify-content: center;
    }

    .content>>>.item.item-center span {
        font-size: 12px;
        padding: 2px 4px;
        color: #fff;
        background-color: #dadada;
        border-radius: 3px;
        -moz-user-select: none;
        /*火狐*/
        -webkit-user-select: none;
        /*webkit浏览器*/
        -ms-user-select: none;
        /*IE10*/
        -khtml-user-select: none;
        /*早期浏览器*/
        user-select: none;
    }

    .content>>>.avatar img {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    .input-area {
        border-top: 0.5px solid #e0e0e0;
        height: 150px;
        display: flex;
        flex-flow: column;
        background-color: #fff;
    }

    textarea {
        flex: 1;
        padding: 5px;
        font-size: 14px;
        border: none;
        cursor: pointer;
        overflow-y: auto;
        overflow-x: hidden;
        outline: none;
        resize: none;
    }

    .button-area {
        display: flex;
        height: 40px;
        margin-right: 10px;
        line-height: 40px;
        padding: 5px;
        justify-content: flex-end;
    }

    .button-area button {
        width: 80px;
        border: none;
        outline: none;
        border-radius: 4px;
        float: right;
        cursor: pointer;
    }

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width: 10px;
    }

    .video {
        /* float: right; */
        margin-right: 10px;
    }

    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0);
        -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
    }
</style>