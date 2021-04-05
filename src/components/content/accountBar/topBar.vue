<template lang="">
    <v-app-bar app color="rgb(246, 251, 252)" v-if='isTrue'>
        <!-- <top></top> -->
        <v-toolbar-title v-if='!isfind'>好友</v-toolbar-title>
        <v-text-field v-if='isfind' v-model='input' autocomplete="off" hide-details flat solo>

        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon @click='find'>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon @click='addFri' v-if='!isfind'>
            <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn icon @click='findcancel' v-else>
            <v-icon icon>mdi-close</v-icon>
        </v-btn>
    </v-app-bar>
    <v-app-bar v-else app color="cyan">
        <v-text-field key="a" label="请好友输入邮箱" class="aoa" id="lk" autocomplete="off"></v-text-field>
        <v-btn icon @click=sousuo>
            <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn icon @click='cancell'>
            <v-icon icon>mdi-close</v-icon>
        </v-btn>
    </v-app-bar>
</template>
<script>
    import axios from 'axios'
    export default {
        data: () => ({
            isTrue: true,
            dialog: false,
            isfind: false,
            input: ''
        }),
        methods: {
            //搜索
            find() {
                this.isfind = true
                // console.log(this.input);
                this.$store.state.isfindd= true
                if (this.input) {
                    var t = this.$store.state.friend.find(item => item.username == this.input || item.email == this.input)
                    console.log(t);
                    // this.dialog = false
                    this.$store.commit('fridetaill2')
                    this.$store.commit('friShow', true)
                    if (t) {
                        this.$store.commit('friShow', false)
                        this.$store.commit('fridetaill', t)
                        this.$store.commit('dialog', true)

                    } else {
                        this.$store.commit('friShow', false)
                        this.$store.commit('dialog', false)
                    }
                }
                this.input = ''
            },
            //取消搜索
            findcancel() {
                this.input = ''
                this.isfind = false
            },
            cancell() {
                this.isTrue = true
            },
            addFri() {
                this.isTrue = !this.isTrue
            },
            sousuo() {
                // console.log(555);
                this.$store.state.isfindd= false
                this.dialog = false
                this.$store.commit('fridetaill2')
                this.$store.commit('friShow', false)
                // console.log(this.addChange.value); 
                axios({
                    method: 'post',
                    url: '/account',
                    data: {
                        search: this.addChange.value
                    }
                }).then((result) => {
                    console.log(result.data);
                    if (result.data.addfri) {
                        this.$store.commit('fridetaill', result.data.addfri)
                        this.$store.commit('dialog', true)

                    } else {
                        this.$store.commit('dialog', false)
                    }

                    // this.$store.commit('add', result.data.addfri)//去重加好友
                    // this.$store.commit('sum')
                }).catch((err) => {

                });
            }
        },
        updated() {
            this.addChange = document.querySelector('#lk')
            // console.log(this.addChange);
            if (this.addChange) {
                this.addChange.focus()
                // this.addChange.addEventListener('blur', () => {
                //     this.isTrue = !this.isTrue
                // })

            }

        },
        // props:{
        //     isTrue:{
        //         type:Boolean,
        //         default(){
        //             return true
        //         }
        //     }
        // }
    }
</script>
<style lang="less" scoped>
    .fri {
        top: 0;
        position: fixed;
        right: 0;
        margin: 0 !important;
    }

    .v-dialog {
        /* right: 0 !important; */
        margin: 0 !important;
    }

    .toolbar {
        width: 100% !important;
    }

    .right {
        position: absolute;
        right: 0 !important;
    }

    .aoa {
        margin-top: 5vh;
    }

    .email {
        padding-top: 0 !important;
    }
</style>