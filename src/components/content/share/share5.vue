<template lang="">
    <div>
        <div  @click='big'>
            <img class="iid" src="./王力宏.jpg" alt="">
        </div>
    </div>
</template>
<script>
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    // import 'Viewerjs/dist/Viewer.css'
    export default {
        methods: {
            big() {
                this.$nextTick(() => {
                    
                })
                const view = new Viewer(document.querySelector('.iid'))
            }
        },
    }
</script>
<style  scoped>
    .iid {
        width: 200px;
        height: 200px;
        position: absolute;
        top: 0;
    }
    .iid >>> img{
        position: absolute;
        top: 40vh !important;
    }
</style>