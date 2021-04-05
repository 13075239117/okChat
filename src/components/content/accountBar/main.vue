<template lang="">

    <div>
        <v-app app>
           <top></top>
            <list></list>
        </v-app>
    </div>

</template>
<script>
    import top from './topBar.vue'
    import list from './list.vue'
    export default {
        data() {
            return {
                
            }
        },
        components: {
            top,
            list
        }
    }
</script>
<style lang="less" scoped>
    .main {
        position: fixed;
        top: 0;
        
    }
</style>