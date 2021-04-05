<template lang="">
    <v-row >
        <v-col cols='12'>
            <div class="io">
                <textarea name="" id="text"></textarea>
                <v-btn icon class="send" @click='send'>
                    <v-icon size='4vh'>mdi-near-me</v-icon>
                </v-btn>
            </div>
            <input type="file" style="display: none;" id="select" multiple>
            <div class="ex">
                <div class="selectImg" @click='photo'></div>
            </div>


        </v-col>
    </v-row>
    <!-- </v-container> -->
</template>
<script>
    import axios from 'axios'
    import $ from 'jquery'
    export default {
        data() {
            return {
                selectImg: ''
            }
        },
        methods: {
            send() {
                var msg = document.querySelector('#text').value
                this.$store.commit('showTime', !this.$store.state.send)
                var imgList = document.querySelectorAll('.image1')
                var imgs = [];
                for (let i of imgList) {
                    console.log(typeof i.children[0].getAttribute('src'));
                    imgs.push(i.children[0].getAttribute('src'))
                }
                var showT = {
                    msg,
                    imgs
                }
                // console.log(imgs.length !== 0 && msg !== '');
                if (imgs.length !== 0 || msg !== '') {
                    axios({
                        method: 'post',
                        url: 'userShow',
                        data: {
                            userid: this.$store.state.user[0].id,
                            username:this.$store.state.user[0].username,
                            msg,
                            img: imgs
                        }
                    })
                }
                axios({
                    method: 'get',
                    url: 'userShow',
                }).then(res => {
                    this.$store.commit('showAll', res.data)
                    console.log(this.$store.state.showAll);
                    // var base64Str = res.data.img.data.toString('base64')
                    // console.log(base64Str);
                    // let reader = new FileReader()
                    // reader.readAsDataURL(res.data.img.data)//blob
                    // reader.onload = function (e) {
                    //     console.log(e.target.result);//base64
                    // }
                })

            },
            photo() {
                this.selectImg.click()
            }

        },
        mounted() {
            this.selectImg = $('#select')
            // console.log(this.selectImg[0]);
            var a = $('.ex')
            // console.log(a.children('.selectImg'));
            this.selectImg.on('change', function () {
                var files = this.files
                $.each(files, function (key, value) {
                    // console.log(this);
                    var fr = new FileReader()
                    var div = document.createElement('div')
                    div.className = 'image1'
                    var img = document.createElement('img')
                    var mask = document.createElement('div')
                    mask.className = 'mask'
                    mask.innerText = '删除'

                    fr.readAsDataURL(value)
                    fr.onload = function () {
                        // console.log(this);
                        img.src = this.result
                        div.appendChild(img)
                        div.appendChild(mask)
                        a.prepend(div)

                    }

                })
            })
        },
        updated() {
            console.log(5555);
        },
    }

</script>
<style scoped>
    .ex {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
    }

    #file {
        /* display: none; */
    }

    #pl {
        width: 20vw !important;
    }

    .io {
        border: 1px solid red;
        border-radius: 1vh;
        height: 12vh;
    }

    .ok {
        border: 1px solid red;
    }

    #text {
        cursor: pointer;
        resize: none;
        border: 1px solid red;
        width: 85%;
        height: 10vh;
    }

    .selectImg {
        /* flex:1; */
        border: 1px solid red;
        /* float: left; */
        width: 33%;
        height: 10vh;
    }

    .ex>>>.image1 {
        border: 1px solid red;
        float: left;
        width: 33%;
        height: 10vh;
        position: relative;
    }

    .ex>>>.image1 img {
        width: 100%;
        height: 100%;
    }

    .ex>>>.mask {
        width: 100%;
        height: 10vh;
        position: absolute;
        background: rgba(0, 0, 0, 0.6);
        opacity: 0;
        /* float: left; */
    }

    .ex>>>.image1:hover .mask {
        opacity: 1;
    }

    .send {
        float: right;
        margin-top: 5vh;
    }
</style>