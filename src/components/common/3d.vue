<template lang="">
    <div>

    </div>
</template>
<script>
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js"
    export default {
        data() {
            return {
                camera:'',
                scene:'',
                renderer:'',
                lon:90,//经度
                lat:0,//纬度
                phi:0,//相机聚焦点，弧度
                theta:0,
                touchX:'',//移动端的下，y
                touchY:'',
                imgSrc:[]
            }
        },
        methods: {
            
        },
        mounted() {
            
        },
    }
</script>
<style lang="">

</style>