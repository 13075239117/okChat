<template lang="">
    <v-main class="color">
        <top></top>
        <inputMsg></inputMsg>
    </v-main>
</template>
<script>
    import inputMsg from './input.vue'
    import top from './top.vue'
    export default {
        name:'chat',
        components:{
            top,
            inputMsg
        }
    }
</script>
<style lang="less" scoped>
   
    .color{
        background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
    }
    
</style>