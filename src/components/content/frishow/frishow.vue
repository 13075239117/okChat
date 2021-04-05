<template lang="">
    <v-main class="show" style="overflow: auto;">
        <input type="file" style="display: none;" id="select">
        <v-card class="mx-auto" max-width="344">
            <v-img src="./迪丽热巴.jpg" height="200px">
                <v-card-title class="white--text mt-8">
                    <v-avatar size="56">
                        <img id="me" @click='changeAvatar' alt="user" :src="avatar">
                    </v-avatar>
                    <p class="ml-3">
                        {{$route.query.username}}
                    </p>
                </v-card-title>

            </v-img>

            <v-text-field v-model="input" hide-details flat label="个性签名" solo>
                <template v-slot:append>
                    <v-btn icon v-if='isdelete()' @click='deletee'>
                        <v-icon size='4vh'>mdi-account-multiple-minus</v-icon>
                    </v-btn>
                </template>
            </v-text-field>
            <!-- <div @click="logout" style="float: right;margin-right: 2vh;">注销</div> -->
            <!-- <div @click="registerFace" style="margin-left: 1vh;">刷脸注册</div> -->
            <!-- <v-timeline align-top dense> -->
            <v-col cols="12" v-for="(item, index) in e" :key="index" dark style="padding: 0.5vh 0.5vh;">

                <div>
                    <span>{{item.date}}</span>
                </div>
                <v-card color='#1F7087'>
                    <v-card-title class="avatar">
                        <v-avatar color="grey darken-3" size='40'>
                            <v-img class="elevation-6" alt="" :src='aaa(item)'>
                            </v-img>
                        </v-avatar>
                        <span class="title font-weight-light" rows='1'> {{$route.query.username}}</span>
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
                    <v-text-field autocomplete="off" v-if='ii==index' color='red' hide-details flat solo
                        v-model='input1' :id='`text${index}`'>
                        <template v-slot:append>
                            <v-btn class="mx-0" depressed @click='commit(item.userid,item.date,index)'>
                                回复
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
                    <div style="display: none;" :id='`commit${index}`'>
                        <v-list-item v-for='(item1,index1) in $store.state.commitShow[item.userid][item.date]'
                            :key="index1">
                            <v-avatar color="grey darken-3" size='30'>
                                <v-img class="elevation-6" alt="" :src="imgg(item1)">
                                </v-img>
                            </v-avatar>
                            <v-card-subtitle v-text="`${item1.username} : ${item1.msg}`">{{item1.username}}
                            </v-card-subtitle>
                        </v-list-item>
                    </div>
                </v-card>
            </v-col>
            <!-- </v-timeline> -->

        </v-card>
    </v-main>
</template>
<script>
    import $ from 'jquery'
    import axios from 'axios'
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    export default {
        data() {
            return {
                avatar: '',
                e: [],
                show: false,
                input: '',
                input1: '',
                ii: null,
                iii: null,
                iiii: null,
                iscommitt: true,
                place: '不能为空',
                selectImg: ''
            }
        },
        computed: {

        },
        methods: {
            isdelete() {
                // this.$store.state.friend.some(item => item.id == this.$route.query.id)
                return this.$store.state.friend.some(item => item.id == this.$route.query.id)
            },//删除好友
            deletee() {
                axios({
                    method: 'post',
                    url: '/account/removefri',
                    data: {
                        search: this.$route.query.email
                    }
                }).then(res => {
                    if (res.data == 'success') {
                        window.location.href = '/mainPage/recentMsg'
                    }
                })
            },
            aaa(item) {
                // console.log('item', item);
                var y = this.$store.state.friend.find(item3 => item3.id == item.userid)
                // console.log(y);
                this.avatar = y ? y.avatar : this.$store.state.user[0].avatar
                return y ? y.avatar : this.$store.state.user[0].avatar
            },
            imgg(item1) {
                // console.log(item1);
                var y = this.$store.state.friend.find(item3 => item3.id == item1.commitid)
                return y ? y.avatar : ''
            },
            send() {
                var avatar = document.querySelector('#me').getAttribute('src')
                // console.log(imgs.length !== 0 && msg !== '');
                if (imgsrc) {
                    axios({
                        method: 'post',
                        url: 'userShow',
                        data: {
                            userid: this.$store.state.user[0].id,
                            username: this.$store.state.user[0].username,
                            avatar
                        }
                    })
                }
                // axios({
                //     method: 'get',
                //     url: 'userShow',
                // }).then(res => {
                //     this.$store.commit('showAll', res.data)
                //     console.log(this.$store.state.showAll);

                // })

            },
            //更换头像
            changeAvatar() {
                console.log('avatar');
                this.selectImg.click()
            },//人脸注册
            registerFace() {
                this.$router.push('myShow/faceRegister')
            },
            //注销
            logout() {
                location.replace('/login')
                document.cookie = "loginCookie=;expires=Thu, 18 Dec 1970 12:00:00 GMT;"
            },
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

                if (!this.input1) {
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
            bigPicture(index) {
                var i = document.querySelector(`.pic${index}`)
                // console.log(i);
                var view = new Viewer(i, {
                    title: false,
                    navbar: false,
                    toolbar: {
                        // play: {
                        //     size: 'large'
                        // }
                    },
                    fullscreen: true,
                    hide: function () { //在图片消失的时候销毁view
                        view.destroy()
                    }
                })
            },
            getDate(number) {
                var date = new Date(number);
                // 按重写的自定义格式，格式化日期
                var dateTime = date.toLocaleString(date);
                // console.log(dateTime);
                return dateTime
            },
            label() {
                axios({
                    method: 'post',
                    url: '/userShow/myLabel',
                    data: {
                        userid: this.$route.query.id,
                        label: this.input
                    }
                })
            }
        },
        mounted() {
            axios({
                method: 'get',
                url: 'userShow',
            }).then(res => {
                console.log('usershowall', res.data);
                this.$store.commit('showAll', res.data)
               
                // console.log(this.e);

            })
           




            // console.log(this.$store.state.user);
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
            // console.log('mounted');

            axios({
                method: 'post',
                url: '/userShow/myShow',
                data: {
                    userid: this.$route.query.id
                }
            }).then((res) => {
                // console.log(this.);
                // console.log(result);
                this.$store.commit('showMessage', res.data.result)
                this.input = res.data.resultt[0].label
                // this.$store.commit('userLabel', res.data.resultt[0].label)
                console.log(this.input);
                this.e = this.$store.state.showMsg

                this.e.map(item => item.date = this.getDate(item.date))
                console.log(this.$store.state.showMsg);
            }).catch((err) => {

            });



            //处理图片

            //     this.selectImg = $('#select')
            //     // console.log(this.selectImg[0]);
            //     var a = $('.ex')
            //     var that = this
            //     // console.log(a.children('.selectImg'));
            //     this.selectImg.on('change', function () {
            //         // console.log(that);
            //         var files = this.files
            //         $.each(files, function (key, value) {
            //             // console.log(this);
            //             var fr = new FileReader()
            //             // var div = document.querySelector('')
            //             fr.readAsDataURL(value)
            //             fr.onload = function () {
            //                 // console.log(that);
            //                 document.querySelector('#me').src = this.result
            //                 axios({
            //                     method: 'post',
            //                     url: '/userShow/reAvatar',
            //                     data: {
            //                         userid: that.$store.state.user[0].id,
            //                         username: that.$store.state.user[0].username,
            //                         avatar:this.result
            //                     }
            //                 })
            //             }

            //         })
            //     })
        },
    }
</script>
<style lang="less" scoped>
    .show {
        position: fixed;
        /* margin: 0.8vh; */
        top: 0;
        right: 0;
    }

    .logout {}
</style>