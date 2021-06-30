import {createStore} from 'vuex'

const store=createStore({
	state:{
		updateUserInfo:{
			id:'',
			username:"",
			isValidate:false,
			token:"",
			menus:[]
		}
	},
	getters:{
		token:(state)=>{
			return state.updateUserInfo.token
		},
		menus:(state)=>{
			return state.updateUserInfo.menus
		},
		isValidate:(state)=>{
			return state.updateUserInfo.isValidate
		},
		asideMenus:(state)=>(path)=>{
			if(state.updateUserInfo.menus==null)return
			console.log("store过滤菜单,%o",state.updateUserInfo.menus)
			var m=state.updateUserInfo.menus.filter(aside=>aside.url==path)
			if(m.length>0){
				//console.log("m=",m[0].asideChildren)
				return m[0].asideChildren
			}
			return null
			 
		}
	},
	mutations:{
		updateUserInfo(state,user){
			if(user==null){
				sessionStorage.removeItem('state')
				console.log("清空用户信息")
				state.updateUserInfo.username=null
				state.updateUserInfo.isValidate=false
				state.updateUserInfo.token=null
				state.updateUserInfo.menus=null
				
			}else{
				console.log("更新用户状态.......用户名:%s",user.username)
				state.updateUserInfo.username=user.username
				state.updateUserInfo.isValidate=true
				state.updateUserInfo.token=user.token
				state.updateUserInfo.menus=user.menus
				console.log("更新用户状态.......用户信息:%o",state.updateUserInfo.menus[0].menuName)
				sessionStorage.setItem('state', JSON.stringify(state))
			}
			
		}
	}
	
})
export default store