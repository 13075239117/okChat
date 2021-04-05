<template lang="">
    <div>
            <registerBar class="animate__animated animate__fadeIn"></registerBar>
    </div>
</template>
<script>
    import registerBar from 'components/content/register/registerBar.vue'
    // F:\web前端\毕业设计\ok\src\components\content\Login\loginBar.vue
    export default {
        beforeRouteLeave(to, from, next) {
            console.log(to);
            // this.path = this.$route.fullPath;
            // console.log(this.$route.fullPath)
            next()
        },
        components: {
            registerBar
        }
    }
</script>
<style scoped>
    .animate__animated.animate__fadeIn{
        --animate-duration: 2s;
    }
</style>