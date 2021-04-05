<template lang="">
  <div>
    <v-app app>
      <v-main>
        <v-card>
          <v-navigation-drawer :mini-variant.sync="mini" v-model="drawer" :mini-variant="mini" permanent class="a" app>
            <v-list>
              <v-list-item class="px-2">
                <v-list-item-avatar @click='myShow'>
                  <v-img :src="$store.state.user[0].avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-title v-if='$store.state.user[0]'>{{$store.state.user[0].username}}</v-list-item-title>
                <v-list-item-title v-else>暂无</v-list-item-title>
                <v-btn icon @click.stop="mini = !mini">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>{{$store.state.userLabel}}</v-list-item-title>
              </v-list-item>
              <v-list-item dense>
                <v-list-item-subtitle v-if='$store.state.user[0]'>{{$store.state.user[0].email}}</v-list-item-subtitle>
                <v-list-item-subtitle v-else>暂无</v-list-item-subtitle>

              </v-list-item>
            </v-list>
            <v-divider></v-divider>

            <v-list dense>
              <v-list-item v-for="(item,index) in items" :key="item.title" link @click.stop='asideSelect(index)'>
                <v-list-item-icon @click='reder(index)'>
                  <v-icon class="red1" :id='`red${index}`'>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title @click=''>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>
<script>
  export default {
    // inject: ['reload'],
    name: 'asideBar',
    data() {
      return {
        drawer: true,
        items: [
          { title: 'chat', icon: 'mdi-chat' },
          { title: 'myAccount', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
      }
    },
    methods: {
      //动态更新
      reder(index) {
        // var a = document.querySelector(`#red${index}`)
        // // console.log(a.style.color);
        // if (this.$store.isred1) {
        //   a.style.color = 'red'
        // } else {
        //   a.style.color = ''
        // }

      },
      myShow() {
        if (!this.mini) {
          this.$router.push('/mainPage/myShow')
          // console.log(55);
          this.mini = !this.mini
        }//进入个人空间
      },
      asideSelect(item) {
        this.mini = true
        switch (item) {
          case 0:
            this.recentMsg()
            break;
          case 1:
            this.myAccount();
            break;
          case 2:
            this.shareMe();
            break;
          default:
            break;
        }
      },
      myAccount() {
        // console.log('account');
        this.$router.push('/mainPage/account')
      },
      recentMsg() {
        this.$router.push('/mainPage/recentMsg')
      },
      shareMe() {
        // this.reload();
        this.$store.state.dom1[2].style.color = ''
        // location.reload();
        this.$router.push('/mainPage/share')
      }
    },
    created() {
      // console.log(this.$store.state.user);
      console.log('已经进入asideBar');
    },
    mounted() {
      setTimeout(() => {
        var a = document.querySelectorAll(`.red1`)
        this.$store.state.dom1 = a
      }, 1000);
    },
  }
</script>
<style lang="less" scoped>
  .v-navigation-drawer__content {
    border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
    background-color: black !important;
  }

  .a {
    border-right: 1px solid rgba(0, 0, 0, 0.1) !important;
    background-image: linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);

  }
</style>