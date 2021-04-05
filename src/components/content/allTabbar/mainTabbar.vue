<template lang="">
  <div class="main">
    <head></head>
    <message></message>
  </div>
</template>
<script>
  import message from 'components/content/messageBar/message.vue'
  import head from 'components/content/messageBar/head.vue'
  export default {
    data() {
      return {
        
      }
    },
    components:{
      message
    }
  }
</script>
<style lang="less" scoped>
  .main{
    float: left;
    position: relative;
    left: 20vh;
    top: 0;
  }
</style>