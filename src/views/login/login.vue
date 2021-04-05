<template lang="">
    <div>
        <!-- <transition name = 'slide'> -->
        <loginBar class="animate__animated animate__fadeIn">
        </loginBar>
        <!-- </transition> -->
    </div>
</template>
<script>
    import faceBar from 'components/content/Login/faceBar.vue'
    import loginBar from 'components/content/Login/loginBar.vue'
    // F:\web前端\毕业设计\ok\src\components\content\Login\loginBar.vue
    export default {
        methods: {


        },
        components: {
            loginBar,
            faceBar
        },
        mounted() {
            //防止页面后退
            console.log(document.cookie);
          history.pushState(null, null, document.URL);
          window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
          });
        },
        
        // beforeRouteLeave(to, from, next) {
        //     console.log(to);
        //     if (from.path == '/login') {
        //         next(false)
        //     }
        //     else {
        //         next(true)
        //     }
        // }
    }
</script>
<style lang="less" scoped>

</style>