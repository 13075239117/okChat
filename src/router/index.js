import vue from 'vue'
import Router from 'vue-router'

const login = () => import('views/login/login.vue')
const mainPage = () => import('views/mainPage/mainPage.vue')
const msgTabbar = () => import('components/content/messageBar/message.vue')
const accountTabbar = () => import('components/content/accountBar/main.vue')
const faceLogin = () => import('components/content/Login/faceBar.vue')
const secret = () => import('components/content/Login/secret.vue')
const video = () => import('components/content/mediaRTC/video.vue')
const chat = () => import('components/content/chat/chat.vue')
const share = () => import('components/content/share/share.vue')
const myShow = () => import('components/content/myShow/main.vue')
const faceRegister = () => import('components/content/myShow/faceRegister.vue')
const register = () => import('views/register/register.vue')
const frishow = () => import('components/content/frishow/main.vue')

vue.use(Router)
const routes = [{
    path: '',
    redirect: '/login'
},
{
    path: '/login',
    component: login
},
{
    path: '/mainPage',
    component: mainPage,
    redirect: '/mainPage/recentMsg',
    children: [
        {
            path: 'recentMsg',
            component: msgTabbar,
        },
        {
            path: 'account',
            component: accountTabbar,
        },
        {
            path: 'chat',
            component: chat,

        },
        {
            path: 'share',
            component: share
        },
        {
            path: 'myShow',
            component: myShow
        },
        {
            path: 'myShow/faceRegister',
            component: faceRegister
        },
        {
            path: 'frishow',
            component: frishow
        },
    ]
},
{
    path: '/video',
    component: video
},
{
    path: '/secret',
    component: secret
},
{
    path: '/login/faceLogin',
    component: faceLogin
},

{
    path: '/register',
    component: register
}
]
const router = new Router({
    routes,
    mode: 'history'
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router
