<template lang="">
  <div>
    <asideBar @click.native='a'></asideBar>
    <keep-alive include='chat'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import asideBar from 'components/content/allTabbar/asideTabbar.vue'
  import topTabbar from 'components/content/allTabbar/topTabbar.vue'
  import mianTabbar from 'components/content/allTabbar/mainTabbar.vue'
  import bottomTabbar from 'components/content/allTabbar/bottomTabbar.vue'
  export default {
    data() {
      return {
        ifRouterAlive: true,
      }
    },
    // provide() {
    //   return {
    //     reload: this.reload
    //   }
    // },
    methods: {
      // reload() {
      //   this.ifRouterAlive = false;
      //   this.$nextTick(() => {
      //     this.ifRouterAlive = true;
      //   });
      // },
      a() {
        // this.$router.push('/mainPage/msg')
        // console.log(789);
      }
    },
    components: {
      asideBar,
      topTabbar,
      mianTabbar,
      bottomTabbar
    },
    created() {

    },
  }
</script>
<style lang="less" scoped>

</style>