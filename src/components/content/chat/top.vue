<template lang="">

    <v-card dark flat class="top">
        <!-- <v-btn absolute bottom color="pink" right fab>
                <v-icon>mdi-plus</v-icon>
            </v-btn> -->
        <v-card-title class="pa-2 purple lighten-3">
            <!-- <v-btn icon>
                    <v-icon>mdi-menu</v-icon>
                </v-btn> -->
            <h3 class="title font-weight-light text-center grow">
                {{username}}
            </h3>
            <v-avatar>
                <v-img :src='avatar' @click='entershow'>
                </v-img>
            </v-avatar>
        </v-card-title>
    </v-card>

</template>
<script>
    export default {
        data() {
            return {
                username: '',
                id: '',
                avatar: ''
            }
        },
        created() {
            // console.log(this.$route.query);
            this.username = this.$route.query.username
            this.id = this.$route.query.id
            // console.log(this.$bus.$on());
            // this.$bus.$on('avatar',(item) => {
            console.log(this.id);
            // })
            for (let item of this.$store.state.friend) {
                if (item.id == this.id) {
                    //require('@/assets/img/王力宏.jpg')
                    // this.avatar = "require(@/assets"+item.avatar+")"
                    // console.log(this.avatar);
                    this.avatar = item.avatar
                }
            }
            // this.avatar =this.$store.state.user[0].avatar
        },
        methods: {
            entershow() {
                this.$router.push({
                    path: '/mainPage/frishow',
                    query: {
                        id: this.$route.query.id,
                        username: this.$route.query.username,
                        email: this.$route.query.email,
                        // fri:true
                    }
                })
            }
        },
    }
</script>
<style lang="less" scoped>
    .pa-2 {
        height: 100%;
    }

    .fill-height {
        background: rgb(135, 135, 201);
    }

    .row {
        margin-left: 1%;
    }

    .top {
        height: 9vh;
    }
</style>