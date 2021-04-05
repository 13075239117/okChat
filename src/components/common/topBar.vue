<template lang="">
    <div class="top">
        <div class="left">
            <slot name='left'></slot>
        </div>
        <div class="center">
            <slot name='center'></slot>
        </div>
        <div class="right">
            <slot name=right></slot>
        </div>
    </div>
</template>
<script>
    export default {

    }
</script>
<style lang="less" scoped>
    .top {
        width: 100%;
        height: 100%;
        .left {
            width: 20%;
            /* background: green; */
            height: 100%;
            float: left;

        }

        .center {
            width: 60%;
            /* background: blue; */
            height: 100%;
            float: left;

        }

        .right {
            width: 20%;
            /* background: green; */
            height: 100%;
            float: left;

        }
    }
</style>