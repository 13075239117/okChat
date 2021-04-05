import { setTimeout } from 'core-js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isread2:{},//chat的isread
		newCommit:[],//新评论
		temporaryMsg: '',
		send: true,
		user: '',
		friend: [],
		index: [],
		arr: [],
		userid: '',
		friDetail: {},
		dialog: Boolean,
		isfindd:false,//搜索好友
		dom1: '',//好友动态监测
		isread: false,
		isred1: false,//好友动态监测
		isred2: false,//聊天动态监测
		ischat: false,//全局聊天
		isshow: false,//全局动态
		isvideo: false,
		ws: '',//全局空间动态websocket
		ws2:'',//全局聊天webocket
		ws3:'',//全局视频video
		ws4:'',//随机video
		commitShow: [],//所有评论
		isfrilistShow: true,//是否展示show
		showMsg: [],//个人show
		userLabel: '',//个人label
		showAll: [],//所有show
		recentFri: {},//friid和date
		recentMsgg: {},//friid和msg
		recentUpdate: []//frid和item
	},
	mutations: {
		add(state, accept) {
			state.arr.push(accept)
			// console.log(accept);
			// console.log(accept);
			// state.friend = []
		},
		sum(state) {
			//这里省略了
			for (let i of state.arr) {
				// console.log(state.index);
				if (state.index.indexOf(i['id']) == -1) {
					state.index.push(i.id)
					state.friend.push(i)
				}
			}

			// console.log(state.friend);
		},
		userAdd(state, accept) {
			state.user = accept
		},
		fridetaill(state, accept) {
			state.friDetail = accept
			// console.log(state.friDetail);
		},
		fridetaill2(state) {
			state.friDetail = {}
		},
		dialog(state, accept) {
			state.dialog = accept
			// console.log(state.dialog);
		},
		friShow(state, accept) {
			state.isfrilistShow = accept
			console.log('frilistShow:' + state.isfrilistShow);
		},
		showTime(state, accept) {
			state.send = accept
		},
		showMessage(state, accept) {
			state.showMsg = accept

			// console.log(state.showMsg);
		},
		onWs(state, accept) {
			state.ws = accept
		},
		onWs2(state, accept) {
			state.ws2 = accept
		},
		onWs3(state, accept) {
			state.ws3 = accept
		},
		onWs4(state, accept) {
			state.ws4 = accept
		},
		newCommit(state,accept){
			state.newCommit.push(accept)
		},
		//所有评论，个人通知使用userid和isread
		commitShow(state, accept) {
			accept
			let allUserid = []
			let allDate = []
			for (let i of accept) {
				if (allUserid.indexOf(i.userid) == -1) {
					allUserid.push(i.userid)
				}

			} //去重拿所有userid
			// console.log();
			var a = {}
			var c = {}
			var t = {}
			for (let y of allUserid) {
				a[y] = accept.filter(item => item.userid == y)
				t[y] = {}
				for (let u of a[y]) {
					if (allDate.indexOf(u.userdate) == -1) {
						allDate.push(u.userdate)
					} //拿到a[y]里面不重复的date				
				}
				// console.log(allDate);
				for (let o of allDate) {
					// console.log(o);	
					c[o] = a[y].filter(item => item.userdate == o)
					t[y][o] = c[o]
				}
			}

			state.commitShow = t
			console.log(t);
		},//所有评论。//头像，名字，commitid,userid,msg，是否已读,userdate
		showAll(state, accept) {
			//展示所有动态
			state.showAll = accept
			// console.log(state.showAll);
		},
		userLabel(state, accept) {
			state.userLabel = accept
		},
		recentFri(state, accept) {
			//发送和接收调用
			//保持最新的id和date
			var key = Object.keys(accept)[0]
			var value = Object.values(accept)[0]
			// console.log(key);
			// console.log(value);
			state.recentFri[key] = value
			// console.log(state.recentFri);
		},
		recentMsgg(state, accept) {
			//发送和接收调用
			var key = Object.keys(accept)[0]
			var value = Object.values(accept)[0]
			// console.log(key);
			// console.log(value);
			//有friid和msg
			state.recentMsgg[key] = value
			// console.log(state.recentMsgg);
			console.log(state.friend);
		},
		temMsg(state, accept) {
			state.temporaryMsg = accept
		},
		isread2(state,accept){
			state.isread2 = accept
		},//chat的isread
		recentUpdate(state, accept) {
			//主页刷新调用
			//fri实时更新,friid和item数据
			// console.log(state.recentFri);
			var keys = Object.keys(state.recentFri)
			var value = Object.values(state.recentFri)
			var newVal = value.sort((a, b) => b - a)
			// console.log(newVal);
			var o = []//重新排序后的id
			var y = []//重新排序的item
			var a, b, c;
			c = state.friend
			if (state.recentFri) {
				for (let i of newVal) {
					// console.log('key:' + i);
					a = keys.find(item => state.recentFri[item] == i)//id
					o.push(a)

					b = c.find(item => item.id == a)

					y.push(b)
					console.log(y);
				}

				state.recentUpdate = y //重新排序的item
				console.log('排序后的item和id:', state.recentUpdate);
				console.log('重新排序:' + o);

			}

		},

	},
	actions: {
		recentUpdate({ dispatch, state, commit }, accept) {
			//主页刷新调用
			//fri实时更新,friid和item数据
			// console.log(state.recentFri);
			var t = 0;

			var keys = Object.keys(state.recentFri)
			var value = Object.values(state.recentFri)
			var newVal = value.sort((a, b) => b - a)
			// console.log(newVal);
			var o = []//重新排序后的id
			var y = []//重新排序的item
			var a, b, c;
			c = state.friend
			if (state.recentFri) {
				for (let i of newVal) {
					// console.log('key:' + i);
					a = keys.find(item => state.recentFri[item] == i)//id
					o.push(a)
					// console.log(a);
					// console.log(c);
					if (c.length!==0) {
						for (let u of c) {
							// console.log(55465464);
							// console.log('u.id',u.id);
							if (u.id == a) {
								// console.log(u.id, a);
								y.push(u)
								// console.log(y);
								break;
							}
						}
					}else{
						console.log('?????');
					}
					// b = c.find(item => item.id == a)

					// y.push(b)
					// console.log(y);
				}

				state.recentUpdate = y //重新排序的item
				// console.log(state.recentUpdate[0]);
				// console.log(y[0] == 'undefined');

				console.log('排序后的item和id:', state.recentUpdate);
				console.log('重新排序:' + o);
				// t += 1
				// console.log(t);
				// console.log(state.recentUpdate.length);
				// dispatch('recentUpdate')

			}
		}
	},
	getters: {

	},
	modules: {}
})
export default store