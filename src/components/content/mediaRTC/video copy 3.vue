<template lang="">
    <div>
        <div class="friend" v-if='isopen'>
            <video src="" autoplay id="friend" autoplay></video>
            <video src="" autoplay id="myself" autoplay></video>
            <div @click='callFri' class="call">call</div>
            <div @click='acceptFri' class="accept">accept</div>
        </div>
    </div>
</template>
<script>
    // import vconsole from './vconsole.min.js'
    import socketClient from 'components/content/network/WebSocket.js'
    export default {
        data() {
            return {
                offer: '',
                answer: '',
                callStream: '',
                acceptStream: '',
                myMedia: '',
                friMedia: '',
                friMedia: '',
                isopen: true,
                peer: '',
                friVideo: '',
                myVideo: '',
                ws: '',
                sendMsg: {
                    userId: this.$route.query.userId,
                    friId: this.$route.query.friId
                },
                accept: [],
                videoAccept: {},
                timer: '',
                track: ''
            }
        },
        methods: {
            send() {

            },
            async callFri() {
                this.callStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 250,
                        height: 250,
                        sourceId: 'default',
                        facingMode: { exact: "user" }
                    },
                    audio: false,
                    // facingMode: { exact: "user" }
                })
                console.log(this.callStream);
                this.myVideo.srcObject = this.callStream
                this.myMedia = this.callStream
                this.addTrack(this.callStream)
                this.offer = await this.peer.createOffer()
                this.peer.setLocalDescription(this.offer)
                this.ws.send(JSON.stringify({
                    type: 'offer',
                    sdp: this.offer,
                    userId: this.$route.query.userId,
                    friId: this.$route.query.friId
                }))
                console.log(this.offer);
            },
            async acceptFri() {
                this.acceptStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 250,
                        height: 250,
                        sourceId: 'default',
                        facingMode: { exact: "user" }
                    },
                    audio: false,
                    // facingMode: { exact: "user" }
                })
                // this.friMedia = this.acceptStream
                this.myVideo.srcObject = this.acceptStream
                this.myMedia = this.acceptStream
                this.addTrack(this.acceptStream)
                console.log(878982);
                console.log('userId: ' + this.$route.query.userId,
                    ' friId:' + this.$route.query.friId);

            },
            ontrack() {
                this.peer.ontrack = e => {
                    // console.log('track');
                    if (e && e.streams) {
                        console.log('streams');
                        // console.log(this.friVideo);
                        this.friVideo.srcObject = e.streams[0];
                    }
                };
            },
            addTrack(a) {
                a.getTracks().forEach(async track => {
                    await this.peer.addTrack(track, a)
                    console.log('addstream');
                })
            },
            onice() {
                // console.log('ice?');
                this.peer.onicecandidate = e => {
                    console.log('ice');
                    if (e.candidate) {
                        console.log('iceice');
                        this.ws.send(JSON.stringify({
                            type: '_ice_candidate',
                            iceCandidate: e.candidate,
                            userId: this.$route.query.userId,
                            friId: this.$route.query.friId
                        }))
                    }
                    else {
                        console.log('iceice');
                    }
                }
            },
            async onOffer(type, sdp) {
               await this.acceptFri()
                console.log('offeraccept');
                const offerSdp = new RTCSessionDescription(sdp);
                this.peer.setRemoteDescription(offerSdp).then(async () => {
                    console.log(this.peer.createAnswer);
                    this.answer = await this.peer.createAnswer()
                    this.peer.setLocalDescription(this.answer)
                    this.ws.send(JSON.stringify({
                        type: 'answer',
                        sdp: this.answer,
                        userId: this.$route.query.userId,
                        friId: this.$route.query.friId
                    }))
                });
            },
            async onAnswer(type, sdp) {
                console.log('answeraccept');
                console.log(sdp);
                const offerSdp = new RTCSessionDescription(sdp);
                this.peer.setRemoteDescription(offerSdp).then(() => {
                    console.log('answerokok');
                })

            },
            onCandidate(iceCandidate) {
                console.log('iceok');
                this.peer.addIceCandidate(iceCandidate);
            }
        },
        created() {
            // var vConsole = new VConsole();
            this.peer = new RTCPeerConnection()
            this.ws = new WebSocket(`wss://${location.host}/socket`)

        },
        beforeMount() {
            // this.ws.send(JSON.stringify({ a: 'k' }))
            this.onice()
            this.ontrack()

        },
        mounted() {
            this.ws.onopen = e => {
                console.log('connect');
                // console.log(e);
                this.ws.send(JSON.stringify({
                    userId: this.$route.query.userId,
                    friId: this.$route.query.friId
                }))
            }
            console.log('userId: ' + this.$route.query.userId,
                ' friId:' + this.$route.query.friId);
            // this.ws.onopen = () => {
            //     this.ws.send(JSON.stringify({
            //         userId: this.$route.query.userId,
            //         friId: this.$route.query.friId
            //     }));
            //     console.log('已连接');
            // }
            this.ws.onmessage = event => {
                this.videoAccept = JSON.parse(event.data)
                const { type, sdp, iceCandidate } = this.videoAccept
                console.log(type);
                switch (type) {
                    case "offer":
                        this.onOffer(type, sdp);
                        break;
                    case "answer":
                        // console.log(sdp);
                        this.onAnswer(type, sdp);
                        break;
                    case "_ice_candidate":
                        this.onCandidate(iceCandidate);
                        break;
                    default:
                        break;
                }
            }
            //1:获取节点元素
            this.friVideo = document.querySelector('#friend')
            this.myVideo = document.querySelector('#myself')
            //2:websocket连接
            // this.ws = new WebSocket(`wss://${location.host}/socket`)
            // //3:创建peerconnection连接实例
            // 
            // 4:获取本地摄像头麦克风


            //添加轨道集，这些轨道将被发送到另一对等方
            console.log('beforestream');

        },
        beforeDestroy() {
            this.ws.close()
            // this.myMedia.getTracks().forEach(function (track) {
            //     track.stop();
            // });
            let self = this;
            this.peer.close();
            // this.peer.onicecandidate = null;
            // this.peer.onaddstream = null;
            // if ( this.friVideo.srcObject) {
            //     this.friMedia.getTracks().forEach(function (track) {
            //         track.stop();
            //     });
            // }
            if (this.myVideo.srcObject.getTracks()) {
                this.myMedia.getTracks().forEach(function (track) {
                    track.stop();
                });
            }

        },
        updated() {
            console.log(9898 + this.videoAccept);
            // if (this.videoAccept) {

            // }
        },

        //结束视频通话
        // let self = this;
        // self.pc.close();
        // self.pc.onicecandidate = null;
        // self.pc.onaddstream = null;
        // self.thisvideo.srcObject.getTracks()[0].stop();
        // self.thisvideo.srcObject.getTracks()[1].stop()

    }
</script>
<style lang="less" scoped>
    .call {
        width: 100px;
        height: 100px;
        /* padding: 100px; */
        border: 1px solid red;
    }

    .accept {
        width: 100px;
        height: 100px;
        margin-top: 100px;
        /* padding: 100px; */
        border: 1px solid red;
    }

    .friend {
        position: relative;
        width: 100vw;
        height: 100vh;
        /* bottom: 2vh;
        left: 2vh; */
    }

    #myself {
        /* position: absolute; */
        width: 40%;
        height: 20%;
        border: 1px solid red;
        /* z-index: 100; */
        float: right;

    }

    #friend {
        position: absolute;
        width: 100%;
        height: 50%;
        border: 1px solid red;
    }
</style>