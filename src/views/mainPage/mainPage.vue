<template lang="">
    <div>
       <allTabbar></allTabbar>
       <!-- <router-view></router-view> -->
    </div>
</template>
<script>
    import allTabbar from 'components/content/allTabbar/allTabbar.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{
        allTabbar
    },
    beforeRouteLeave (to, from, next) {
        // ...
        console.log(to);
        if(to.path == '/login' || to.path == '/register')
        {
            next(false)
        }
        else{
            next(true)
        }
    }
}
</script>
<style lang="">
    
</style>