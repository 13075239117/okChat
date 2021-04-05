<template lang="">
    <v-app class="chat">
        <mainMsg></mainMsg>
        <!-- <top></top>
        <inputMsg></inputMsg> -->
    </v-app>
</template>
<script>
    import mainMsg from './main.vue'
    export default {
        components:{
            mainMsg,
        }
    }
</script>
<style lang="less" scoped>
    .chat {
        position: fixed; 
        right: 0;
    }
  
</style>