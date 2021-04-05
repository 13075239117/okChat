<template lang="">
    <div>
        <div class="friend" v-if='isopen'>
            <video src="" autoplay id="friend"></video>
            <video src="" autoplay id="myself" @click='videoInit()'></video>
        </div>
    </div>
</template>
<script>
    import socketClient from 'components/content/network/WebSocket.js'
    export default {
        data() {
            return {
                myMedia: '',
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
                videoAccept: {}
            }
        },
        methods: {
            async videoInit(peer) {
                var userId = this.$route.query.userId
                var friId = this.$route.query.friId
                var ws = new WebSocket(`wss://${location.host}/socket`)
                this.ws = ws
                var peer = new RTCPeerConnection()
                //3:发送ice信息给对等方,发送候选人
                peer.onicecandidate = e => {
                    // console.log('ice');
                    if (e.candidate) {
                        // console.log('iceice');
                        ws.send(JSON.stringify({
                            type: '_ice_candidate',
                            iceCandidate: e.candidate,
                            userId,
                            friId
                        }))
                    }
                    else {
                        console.log('iceice');
                    }
                }
                peer.ontrack = e => {
                    console.log('track');
                    if (e && e.streams) {
                        console.log('streams');
                        // console.log(this.friVideo);
                        this.friVideo.srcObject = e.streams[0];
                    }
                };
                const sendMsg = this.sendMsg
                ws.addEventListener('open', function (event) {
                    this.send(JSON.stringify(sendMsg));
                    console.log('已连接');
                });
                ws.onmessage = async function (event) {
                    // resolve(res)
                    // console.log(event.data);
                    this.videoAccept = JSON.parse(event.data)

                    // console.log(this.videoAccept);
                    const { type, sdp, iceCandidate} = this.videoAccept
                    console.log(type);
                    if (type == 'offer') {
                        console.log(type);
                        // console.log(this.peer);
                        const offersdp = await new RTCSessionDescription(sdp)
                        peer.setRemoteDescription(offersdp).then(async () => {
                            await peer.createAnswer(answer => {
                                console.log(987);
                                ws.send(JSON.stringify({
                                    type: 'answer',
                                    sdp: answer,
                                    userId,
                                    friId
                                }))
                                this.peer.setLocalDescription(answer)
                            })
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                    if (type == 'answer') {
                        console.log('answer');
                        const offersdp = await new RTCSessionDescription(sdp)
                        await peer.setRemoteDescription(offsdp)
                        
                    }
                    if (type == '_ice_candidate' ) {
                        console.log('ice_candidate');
                        await peer.addIceCandidate(iceCandidate);
                    }
                    // accept.push(event.data)
                    // console.log(event.data);
                    // ws.close()

                }
                ws.onclose = function (e) {
                    // reject("Connection closed.")

                    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
                    console.log(e);
                };

                //1:获取本地摄像头麦克风
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 250,
                        height: 250,
                        // sourceId: 'default',
                        facingMode: { exact: "user" }
                    },
                    audio: true,
                    // facingMode: { exact: "user" }
                })

                this.myVideo.srcObject = stream
                this.myMedia = stream
                //添加轨道集，这些轨道将被发送到另一对等方
                stream.getTracks().forEach(async track => {
                    await peer.addTrack(track, stream)
                })
                //2:创建发起方会话描述对象offer，设置本地sdp,媒体会话，网络信等息、安全特性、传输策略
                //并且发送到对等方
                peer.createOffer().then(async offer => {
                    console.log('local');
                    await peer.setLocalDescription(offer)
                    console.log(peer);
                    // console.log(88+this.$route.query.userId);
                    ws.send(JSON.stringify({
                        type: 'offer',
                        sdp: offer,
                        userId: this.$route.query.userId,
                        friId: this.$route.query.friId
                    }))
                })
                console.log('ppplllkkk');
                //4:接收会话信息和ice信息




            },
            ok() {
                this.ws.send(JSON.stringify({
                    o: 'asd'
                }))
                console.log(this.accept);
            }
        },
        created() {
            // this.peer = new RTCPeerConnection()
            // //3:发送ice信息给对等方,发送候选人
            // this.peer.onicecandidate = e => {
            //     // console.log('ice');
            //     if (e.candidate) {
            //         console.log('iceice');
            //         this.ws.send(JSON.stringify({
            //             type: '_ice_candidate',
            //             iceCanditate: e.candidate
            //         }))
            //     }
            //     else {
            //         console.log('iceice');
            //     }
            // }
            //5:建立连接后开始传输接收
            // this.peer.ontrack = e => {
            //     console.log('track');
            //     if (e && e.streams) {
            //         console.log('streams');
            //         friVideo.srcObject = e.streams[0];
            //     }
            // };

        },
        async mounted() {
            this.friVideo = document.querySelector('#friend')
            this.myVideo = document.querySelector('#myself')
            // this.ws = new WebSocket("ws://127.0.0.1:5001")
            // socketClient(this.ws, this.sendMsg, this.accept, this.videoAccept)
            // this.videoInit()
            // this.ws.addEventListener('open', function (event) {
            //     this.ws.send(JSON.stringify('sendMsg'));
            //     console.log('66已连接');
            // });
            console.log(this.$route.query);
        },
        beforeDestroy() {
            this.ws.close()
            this.myMedia.getTracks().forEach(function (track) {
                track.stop();
            });
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
        height: 100%;
        border: 1px solid red;
    }
</style>