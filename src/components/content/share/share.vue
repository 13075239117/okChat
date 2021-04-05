<template lang="">
    <v-app app>
        <v-app-bar dark color="rgb(121, 233, 130)" class="top" app>
            <v-toolbar-title class="center">Share We</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click='push'>
                <v-icon size='30'>mdi-plus</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main class="main" style="overflow: auto;" v-if='this.$store.state.send'>
            <!-- <div>888</div> -->
            <v-container>
                <div>
                    <div @click='read' v-if='!$store.state.isred1'
                        style="position: absolute;float: right;border-radius: 1vh;color: rgb(121, 233, 130);font-size: 4vh;top: 0;left: 80%;">
                        <span class="mdi mdi-star-circle"></span>
                    </div>
                    <div v-else @click='read'
                        style="position: absolute;float: right;border-radius: 1vh;color: red;font-size: 4vh;top: 0;left: 80%;">
                        <span class="mdi mdi-star-circle"></span>
                    </div>
                    <span style="text-align: center;display: block;">{{today}}</span>
                </div>
                <v-dialog v-model="dialog" max-width="290">
                    <v-card>
                        <!-- <v-card-title class="headline">
                            Use Google's location service?
                        </v-card-title> -->
                        <!-- <div>{{newCommit}}</div> -->
                        <v-card-subtitle @click='toMyshow' v-if='newCommit.length!==0'
                            v-for='(item3,index3) in newCommit' :key="index3" style="font-size: 2vh; padding-top: 2vh;">
                            {{item3.username}}评论你{{item3.userdate}}的动态说:{{item3.msg}}
                        </v-card-subtitle>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="green darken-1" text @click="dialog = false" icon>
                                <v-icon>mdi-check-bold</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-col cols="12" v-for='(item,index) in e' :key='index' dark style="padding: 0.5vh 0.5vh;">
                    <v-card color='rgb(121,233,130)'>
                        <v-card-title class="avatar">
                            <v-avatar color="grey darken-3" size='40'>
                                <v-img class="elevation-6" alt="" :src="item.avatar">
                                </v-img>
                            </v-avatar>
                            <span class="title font-weight-light" rows='1'>{{item.username}}</span>
                        </v-card-title>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div v-if='item.msg'>
                                <v-card-title class="headline" v-text="item.msg"></v-card-title>
                                <v-card-subtitle v-text="item.msg"></v-card-subtitle>
                            </div>

                            <v-avatar class="ma-3" size="125" tile v-if='item.img'>
                                <img @click='bigPicture(index)' :class="`pic${index}`" :src="item.img"
                                    style="width: 100%;height: 100%;">
                            </v-avatar>
                        </div>
                        <div style="display: flex;flex-direction: row-reverse;">

                            <v-btn icon style="margin-right: 1vh;" @click.stop='reddd(index)'>
                                <v-icon style="display: none;" :id='`heartin${index}`' color='red'>mdi-cards-heart
                                </v-icon>
                                <v-icon style="display: block;" :id='`heartout${index}`'>mdi-heart-outline</v-icon>
                            </v-btn>

                            <v-btn style="margin-top: 0.4vh;" icon @click.stop='redd(index)'>
                                <v-icon>mdi-message-outline</v-icon>
                            </v-btn>
                        </div>
                        <div style="background: rgb(121, 233, 130);"></div>
                        <v-text-field autocomplete="off" v-if='ii==index' color='red' hide-details flat solo
                            v-model='input' :id='`text${index}`'>
                            <template v-slot:append>
                                <v-btn class="mx-0" depressed @click='commit(item.userid,item.date,index)'>
                                    评论
                                </v-btn>
                            </template>
                        </v-text-field>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="redddd(index)">
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-divider></v-divider>
                        <div>
                            <!-- 888888 -->
                            <div style="display: none;" :id='`commit${index}`'>
                                <v-list-item
                                    v-if='$store.state.commitShow && $store.state.commitShow[item.userid][item.date] !==undefined'
                                    v-for='(item1,index1) in $store.state.commitShow[item.userid][item.date] '
                                    :key="index1">
                                    <v-avatar @click='frishow(item1,index1)' color="grey darken-3" size='30'>
                                        <v-img class="elevation-6" alt="" :src="imgg(item1)">
                                        </v-img>
                                    </v-avatar>
                                    <v-card-subtitle v-text="`${item1.username} : ${item1.msg}`">{{item1.username}}
                                    </v-card-subtitle>
                                </v-list-item>
                            </div>
                            <!-- </div> -->
                        </div>


                    </v-card>
                    <div>
                        <span style="margin-left: 40vw;">{{item.date}}</span>
                    </div>
                </v-col>
            </v-container>

            </v-container>
        </v-main>
        <v-main class="main" v-else>
            <v-container fluid class="push">
                <push></push>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    import axios from 'axios'
    import push from './push'
    export default {
        name: 'share',
        data() {
            return {
                newCommit: [],//新动态
                dialog: false,
                is1: false,
                show: false,
                place: '输入不能为空白',
                input: '',
                today: '',
                ispush: true,
                items: [],
                absolute: true,
                overlay: false,
                e: [],
                newStyle: true,
                red: 'red',
                isred: false,
                ii: null,
                iii: null,
                iiii: null,
                iscommitt: true,
                okokok: ''
            }
        },
        computed: {

        },

        methods: {
            frishow(item, index) {
                console.log(item);
                if (item.commitid == this.$store.state.user[0].id) {
                    this.$router.push('myshow')
                } else {
                    this.$router.push({
                        path: '/mainPage/frishow',
                        query: {
                            id: item.commitid,
                            username: item.username,
                            email: item.email,
                            // fri:false
                        }
                    })
                }
                console.log(index);
            },
            imgg(item1) {
                // console.log( );
                var y = this.$store.state.friend.find(item3 => item3.id == item1.commitid)
                // console.log(y);
                // console.log(typeof y);

                // console.log( Object.keys(y));
                return y ? y.avatar : this.$store.state.user[0].avatar
            },
            toMyshow() {
                this.$router.push('myShow')
            },
            read() {
                this.$store.state.isred1 = false
                axios({
                    method: 'post',
                    url: '/isread',
                    data: {
                        userid: this.$store.state.user[0].id
                    }
                })
                this.dialog = true
            },
            async commit(commitId, date, index) {
                console.log(commitId);
                console.log(date);

                var a = document.querySelector(`#text${index}`)

                if (!this.input) {
                    a.setAttribute('placeholder', this.place)
                } else {
                    const commitdate = new Date().getTime()
                    var data = {
                        userid: commitId,
                        commitid: this.$store.state.user[0].id,
                        msg: this.input,
                        userdate: date,
                        commitdate,
                        isread: 'false'
                    }
                    this.$store.state.ws.send(JSON.stringify(data))

                    console.log(this.ii);
                    this.ii = null
                    this.input = ''
                }




            },
            redddd(index) {
                var a = document.querySelector(`#commit${index}`)

                if (a.style.display == 'none') {
                    a.style.display = 'block'
                } else {
                    a.style.display = 'none'
                }

            },
            reddd(index) {
                var a = document.querySelector(`#heartin${index}`)
                var b = document.querySelector(`#heartout${index}`)
                if (a.style.display == 'none') {
                    a.style.display = 'block'
                } else {
                    a.style.display = 'none'
                }
                if (b.style.display == 'none') {
                    b.style.display = 'block'
                } else {
                    b.style.display = 'none'
                }

            },
            redd(index) {
                // console.log(index);
                this.ii = this.ii == null ? index : null
            },

            getDate(number) {
                var date = new Date(number);
                // 按重写的自定义格式，格式化日期
                var dateTime = date.toLocaleString(date);
                // console.log(dateTime);
                return dateTime
            },
            async bigPicture(index) {
                var i = document.querySelector(`.pic${index}`)
                // console.log(i);
                var view = new Viewer(i, {
                    title: false,
                    navbar: false,
                    movable: true,
                    // top:'50vh',
                    toolbar: {
                        // play: {
                        //     size: 'large'
                        // }
                    },
                    fullscreen: true,
                    // inline:true,
                    // show: function () {
                    //     view.update();
                    // },
                    hide: function () { //在图片消失的时候销毁view
                        view.destroy()
                    }
                })
                // console.log(document.querySelector('.viewer-open'));
                this.newStyle = !this.newStyle
                // console.log(this.newStyle);
            },
            big(index) {

            },
            push() {
                // this.ispush = !this.ispush
                //切换
                this.$store.commit('showTime', !this.$store.state.send)
            },

        },
        created() {
            //TEST
            var a = this.$store.state.friend.find(item => item.id==2).username
            console.log('username',a);
            console.log();
                
            
            // console.log(this.$store.state.friend.find(item => item.id == 2).avatar);
            //刷新
            window.addEventListener('load', async () => {
                console.log(window.location.pathname);
                // console.log(window.location.host);
                if (window.location.pathname !== '/mainPage/recentMsg') {
                    window.location.href = '/mainPage/recentMsg'

                }
                // await sessionStorage.setItem('state', JSON.stringify(this.$store.state))

            })
            // console.log('share');


            // this.$store.state.commitShow = []
            if (this.$store.state.commitShow.length !== 0) {
                console.log(this.$store.state.commitShow);
                console.log(8888888);
            }
            console.log('已进入share');
            // axios({
            //     method:'post',
            //     url:''
            // })
            // this.$store.state.isshow = false
            console.log(this.$store.state.commitShow);
            this.okokok = this.$store.state.commitShow
            console.log(this.okokok);
            // console.log(this.$store.state.commitShow[1]['2021.03.30 12:12']);
            var dateTime = new Date();
            this.today = JSON.stringify(dateTime).split('T')[0].split('"')[1]
            axios({
                method: 'get',
                url: 'userShow',
            }).then(res => {
                console.log('usershowall', res.data);
                this.$store.commit('showAll', res.data)
                // console.log(this.$store.state.showAll);
                this.e = this.$store.state.showAll
                this.e.map(item => item.date = this.getDate(item.date))
                // console.log(this.e);

            })
            if (this.$store.state.user) {
                axios({
                    method: 'post',
                    url: 'commit',
                    data: {
                        userid: this.$store.state.showAll.userid,
                        commitid: this.$store.state.user[0].id,
                        msg: '',
                        // userdate: this.e.userdate,
                        // commitdate,
                        isread: 'false'
                    }
                }).then(res => {
                    // console.log(res.data);
                    var y;
                    this.$store.commit('commitShow', res.data)
                    console.log('获取成功');
                    // console.log(this.$store.state.commitShow);
                    var myself = res.data.filter(item => item.userid == this.$store.state.user[0].id && item.commitid !== item.userid)
                    console.log(myself);
                    if (!myself.every(item => item.isread == 'true')) {
                        y = myself.filter(item => item.isread == 'false')
                        this.newCommit = y
                        console.log(this.newCommit);
                        console.log('你有未读消息');
                        this.$store.state.isred1 = true
                        this.$store.state.isshow = !this.$store.state.isshow
                    }
                })
            }
            // console.log(e);
        },
        components: {
            push
        },

        mounted() {
            console.log(this.$store.state.commitShow);
            //初始化
            // setTimeout(() => {

            // }, 500);

            // this.$notify.info({
            //     title: '消息',
            //     message: '这是一条消息的提示消息'
            // });
            // const h = this.$createElement;
            // console.log(res);

            // console.log(this.$store.state.ws);
            //接收信息并刷新，通知个人根据uerid
            setTimeout(() => {
                this.$store.state.ws.onmessage = e => {
                    var y;
                    console.log('收到新动态');
                    var data = JSON.parse(e.data)
                    this.$store.commit('commitShow', data)
                    // console.log(data);
                    var myself = data.filter(item => item.userid == this.$store.state.user[0].id && item.commitid !== item.userid)
                    if (!myself.every(item => item.isread == 'true')) {

                        console.log('你有未读动态');
                        y = myself.filter(item => item.isread == 'false')
                        this.newCommit = y
                        console.log(this.newCommit);
                        this.$store.state.isred1 = true
                        this.$store.state.isshow = !this.$store.state.isshow
                    }
                    // console.log();
                }
            }, 800);

            let dom = document.querySelector('body');

            // return new Promise((resolve, rejected) => {
            let MutationObserver =
                window.MutationObserver ||
                window.WebKitMutationObserver ||
                window.MozMutationObserver;
            let observer = new MutationObserver(mutationList => {
                //这里是观察到标签样式改变就会执行的函数
                // console.log(mutationList);
                // console.log(document.querySelector('.viewer-open'));
                var a = document.querySelector('.viewer-move')
                if (a !== null) {
                    // console.log(555);
                    a.style.top = '4vh'
                }
            });
            observer.observe(dom, {
                attributes: true,
                attributeFilter: ["class"],
                attributeOldValue: true,
                // childList: true,
                subtree: true
            });

        },
        updated() {
            // this.$bus.$on('ok',(res) => {
            //     console.log(res);
            // })
            // console.log('update');

        },
    }
</script>
<style scoped>
    /* .main >>> .v-image__image{
        background-size: 200px*300px;
    } */
    .ok {
        position: relative;
        /* height: 50vh; */
    }

    /* .ok  :hover {
        opacity: 0.5;
        transition: opacity 2s;
    } */

    .pic {
        height: 25vh;
        margin: 0 auto;
        /* width: 90%; */
    }

    .pic img {
        width: 100%;
        height: 100%;
    }

    .aaa {
        /* color: rgb(red, green, blue); */
        width: 100%;
        height: 20vh;
    }

    .push {
        padding-bottom: 0;
    }

    .main {
        overflow: hidden;
        position: fixed;
        top: 0;
        right: 0;
        background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);
    }

    .avatar {
        padding-top: 1vh;
        padding-bottom: 1vh;
    }

    .img {
        margin: 0 auto;
    }

    .center {
        position: relative;
        left: 50%;
        transform: translateX(-50%);

    }

    .title {
        margin-left: 2vw;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .font-weight-black {
        font-size: 15px;
        padding-top: 1vh;
        padding-bottom: 1vh;
    }

    .a {
        padding-top: 0.5vh;
    }

    .main>>>.el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .main>>>.el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .main>>>.el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    body>>>.viewer-move {
        position: absolute;
        top: 20vh;
    }
</style>