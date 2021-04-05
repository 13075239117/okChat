<template lang="">
    <v-main class="main">
        <!-- <v-list three-line>
        </v-list> -->
        <v-list class="list" two-line>
            <v-subheader v-text="header"></v-subheader>
            <!-- <v-card >
                <v-card-title> -->
            <div v-if='$store.state.recentUpdate[0] == undefined'>
                <h1 style=" background-image:-webkit-linear-gradient(bottom,red,#fd8403,yellow); 
                        -webkit-background-clip:text; 
                        -webkit-text-fill-color:transparent; 
                    ">
                    没有?！赶紧找美女聊天吧！
                </h1>
            </div>

            <!-- </v-card-title>
            </v-card> -->
            <template v-else v-for="(chat,index) in $store.state.recentUpdate">
                <v-divider v-if='index >=1' inset></v-divider>
                <v-list-item @click='enterMsg(index,chat)'>
                    <v-list-item-avatar>
                        <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-text="chat.username"></v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-html="$store.state.recentMsgg[chat.id]">
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <!-- <v-divider></v-divider> -->
        </v-list>
    </v-main>
</template>
<script>
    import axios from 'axios'
    export default {
        data: () => ({
            header: '最近联系人',
            items: []
        }),
        methods: {
            enterMsg(index, chat) {
                this.$bus.$emit('avatar', chat.avatar)
                this.$router.push({
                    path: '/mainPage/chat',
                    query: {
                        id: chat.id,
                        username: chat.username
                    }
                })
            }
        },
        async created() {


        },
        async mounted() {
            console.log(this.$store.state.user);
            console.log('message');
            console.log(this.$store.state.friDetail);
            // if (this.$store.state.recentUpdate.length !== 0 && this.$store.state.recentUpdate[0] !== undefined) {
            //     this.items = this.$store.state.recentUpdate
            //     // this.$store.dispatch('recentUpdate')
            //     console.log('dispatch');
            //     // this.$store.commit('recentUpdate')
            // }

            // console.log(this.$store.state);
            // this.items = this.$store.state.recentUpdate
            if (this.$store.state.friend.length == 0 || this.$store.state.recentUpdate[0] == undefined) {
                // console.log(555);
                const res = await axios({
                    method: 'get',
                    url: '/account',
                    // data: this.formfile
                })
                console.log(res.data);
                // this.items = res.data.items
                for (let i of res.data.items) {
                    // console.log(i);
                    this.$store.commit('add', i)
                }
                this.$store.commit('sum')
                this.$store.commit('userAdd', res.data.user)
                axios({
                    method: 'post',
                    url: '/userShow/myShow',
                    data: {
                        userid: this.$store.state.user[0].id
                    }
                }).then((res) => {
                    this.$store.commit('userLabel', res.data.resultt[0].label)
                }).catch((err) => {

                });
                // this.$store.state.user ???2021.3.21
                // console.log(this.items[0].avatar);

            }
            console.log('test');
            if (Object.keys(this.$store.state.recentFri).length == 0) {
                axios({
                    method: 'get',
                    url: '/chat',
                }).then(res => {
                    // console.log(res.data);
                    console.log(res.data);
                    // console.log(this.$store.state.recentFri);
                    // console.log(this.$store.state.recentMsgg);
                    for (let i of res.data[0]) {
                        this.$store.state.recentFri[i.friid] = i.date
                        // console.log(this.$store.state.recentFri);
                    }
                    for (let i of res.data[1]) {
                        this.$store.state.recentMsgg[i.friid] = i.msg
                        // console.log(this.$store.state.recentMsgg);
                    }
                    //渲染最近
                    if (this.$store.state.recentFri && this.$store.state.recentMsgg) {
                        console.log('已拿到数据');
                        console.log('fri:', this.$store.state.friend);
                        this.$store.dispatch('recentUpdate')
                        // console.log(this.$store.state);
                        this.items = this.$store.state.recentUpdate
                    }

                })
            }
            // var a = setInterval(() => {
            //     if (this.$store.state.recentUpdate.length == 0 && this.$store.state.recentFri) {
            //         location.reload()
            //     }else{
            //         clearInterval(a)
            //     }
            //     console.log('刷新');

            // }, 2000);
        },
    }
</script>
<style lang="less" scoped>
    .main {
        position: fixed;
        top: 0;
        right: 0;
    }
</style>