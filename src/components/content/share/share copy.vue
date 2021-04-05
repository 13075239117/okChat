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
            <v-container>
                <div>
                    <span style="text-align: center;display: block;">{{today}}</span>
                </div>
                <v-col cols="12" v-for='(item,index) in e' :key='index' dark style="padding: 0.5vh 0.5vh;">
                    <v-card color='rgb(121,233,130)'>
                        <v-card-title class="avatar">
                            <v-avatar color="grey darken-3" size='40'>
                                <v-img class="elevation-6" alt=""
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
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
                                <v-icon v-if='iii==index' color='red'>mdi-cards-heart</v-icon>
                                <v-icon v-else>mdi-heart-outline</v-icon>
                            </v-btn>

                            <v-btn icon @click.stop='redd(index)'>
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
                        <div v-for='item1 in okokok[item.userid][item.date]'>
                            <v-list-item>
                                <v-avatar color="grey darken-3" size='30'>
                                    <v-img class="elevation-6" alt=""
                                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light">
                                    </v-img>
                                </v-avatar>
                                <v-card-subtitle v-text="item1.msg"></v-card-subtitle>
                            </v-list-item>
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
        data() {
            return {
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
                iscommitt: true,
                okokok: ''
            }
        },
        computed: {

        },

        methods: {
            iscommit(userid, date) {
                for (let i of this.$store.state.commitShow) {
                    if (i.userid == userid && i.date == date) {
                        return this.iscommitt
                    } else {
                        return !this.iscommitt
                    }
                }
                return !this.iscommitt
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
            reddd(index) {
                this.iii = this.iii == null ? index : null
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
           
            console.log(88888);
            console.log(this.$store.state);

            this.okokok = this.$store.state.commitShow
            console.log(this.$store.state.commitShow[1]['2021.03.30 12:12']);
            var dateTime = new Date();
            this.today = JSON.stringify(dateTime).split('T')[0].split('"')[1]
            axios({
                method: 'get',
                url: 'userShow',
            }).then(res => {
                this.$store.commit('showAll', res.data)
                console.log(this.$store.state.showAll);
                this.e = this.$store.state.showAll

                this.e.map(item => item.date = this.getDate(item.date))
                console.log(this.e);

            })
            // console.log(e);
        },
        components: {
            push
        },
        // watch:{
        //     newStyle(){
        //         this.$nextTick(() => {
        //         console.log(document.querySelector('.viewer-open'));
        //     })
        //     }
        // },
        mounted() {
            console.log(this.$store.state.);
            //接收信息并刷新，通知个人根据uerid
            this.$store.state.ws.onmessage = e => {
                var data = JSON.parse(e.data)
                this.$store.commit('commitShow', data)
                console.log(data);
            }

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