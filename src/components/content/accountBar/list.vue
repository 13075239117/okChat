<template lang="">
    <v-main class="main">
        <v-list class="list" v-if='$store.state.isfrilistShow' >
            <template v-for="(chat,index) in items">
                <!-- <v-divider v-if='chat.divider' :inset='chat.inset'></v-divider> -->
                <v-divider v-if='index >=1' inset></v-divider>
                <!-- <v-list-item :key="chat.title" @click='enterMsg(index,chat)'> -->
                <v-list-item @click='enterMsg(index,chat)' :key="index" active-class=1 :input-value=false>
                    <!-- <v-divider v-if></v-divider>  -->
                    <v-list-item-avatar>
                        <!-- <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img> -->
                        <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="chat.username"></v-list-item-title>
                    </v-list-item-content>

                    <!-- <v-list-item-icon>
                        <v-icon color='rgb(0,188,212)'>
                            mdi-message-outline
                        </v-icon>
                    </v-list-item-icon> -->

                </v-list-item>
            </template>

            <!-- <v-divider></v-divider> -->
        </v-list>
        <v-list v-else class="list">
            <search></search>
        </v-list>
    </v-main>
</template>
<script>
    import search from './search'
    import axios from 'axios'
    export default {
        data: () => ({
            items: [
                // { avatar: require('@/assets/img/王力宏.jpg'), title: 'ok1', },
                // { avatar: require('@/assets/img/王力宏.jpg'), title: 'ok2', },
                // { avatar: require('@/assets/img/王力宏.jpg'), title: 'ok3' },
            ],
            previous: [{
                title: 'Travis Howard',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
            }],
        }),
        components: {
            search
        },
        methods: {
            enterMsg(index, chat) {
                this.$bus.$emit('avatar', chat.avatar)
                this.$router.push({
                    path: '/mainPage/chat',
                    query: {
                        id: chat.id,
                        username: chat.username,
                        email:chat.email
                    }
                })
            }

        },
        created() {
             //刷新
             window.addEventListener('load', async () => {
                console.log(window.location.pathname);
                // console.log(window.location.host);
                if (window.location.pathname !== '/mainPage/recentMsg') {
                    window.location.href = '/mainPage/recentMsg'

                }
                // await sessionStorage.setItem('state', JSON.stringify(this.$store.state))

            })
            console.log(this.$store.state);
            console.log('account');
            // console.log(this.$store.state.friend);
            this.items = this.$store.state.friend
            console.log(this.items);
            // console.log(this.$store.state.user);
        },
        mounted() {
            //发送最近联系人

        },
    }
</script>
<style lang="less" scoped>
    .main {
        position: fixed;
        top: 0;
        right: 0;
        background: rgb(246, 251, 252);

    }

    .list {
        background: rgb(246, 251, 252);
    }
</style>