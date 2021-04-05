<template lang="">
    <v-card v-if="this.$store.state.dialog">
        <v-card-title class="avatar">
            <span class="title font-weight-light" rows='1'>{{$store.state.friDetail.username}}</span>
            <v-spacer></v-spacer>
            <v-avatar color="grey darken-3" size='6vh'>
                <v-img class="elevation-6" alt="" :src="$store.state.friDetail.avatar">
                </v-img>
            </v-avatar>
        </v-card-title>
        <v-card-title class="email">
            {{this.$store.state.friDetail.email}}
        </v-card-title>
        <v-card-text v-if='$store.state.friDetail.label'>
            {{$store.state.friDetail.label.label}}
        </v-card-text>

        <v-card-actions>

            <!-- <v-spacer></v-spacer> ///移到右边 -->
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancel">
                取消
            </v-btn>

            <v-btn v-if='!$store.state.isfindd' color="green darken-1" text @click='sure'>
                <v-icon>mdi-account-check</v-icon>
            </v-btn>
            <v-btn @click='chat' v-else style="margin-top: 0.4vh;" icon>
                <v-icon>mdi-message-outline</v-icon>
            </v-btn>
        </v-card-actions>

    </v-card>
    <v-card v-else>
        <v-card-title class="email">
            在微信搜索试试？薇♥找不到呢
        </v-card-title>
        <v-card-actions>
            <!-- <v-spacer></v-spacer> ///移到右边 -->
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="cancel">
                取消
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'ok',
        data() {
            return {
                // dialog: true,
                addChange: '',
            }
        },
        methods: {
            chat() {
                this.$router.push({
                    path: '/mainPage/chat',
                    query: {
                        id: this.$store.state.friDetail.id,
                        username: this.$store.state.friDetail.username,
                        email: this.$store.state.friDetail.email,
                    }
                })
                this.$store.commit('friShow', true)
                // console.log(this.$store.state.friDetail);
            },
            sure() {
                // console.log(555);
                console.log(this.$store.state.friDetail);
                this.$store.commit('add', this.$store.state.friDetail)//去重加好友
                this.$store.commit('sum')
                this.$store.commit('friShow', true)
                axios({
                    method: 'post',
                    url: '/account/addfri',
                    data: {
                        search: this.$store.state.friDetail.email
                    }
                })
            },
            cancel() {
                this.$store.commit('friShow', true)
            }
        },

    }
</script>
<style lang="less" scoped>
    .avatar {
        padding-bottom: 1vh;
    }

    .email {
        padding-top: 0;
        padding-bottom: 1vh;
    }
</style>