import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'

import login from '../components/Login.vue'
import Home from '../components/Home.vue'
import DefaultMain from '../components/main.vue'
import store from "../store/index.js"
import { storeKey } from 'vuex'
// import { t } from 'element-plus/lib/locale'

const modules =
	import.meta.glob('../components/**/*.vue');
import {
	createStore
} from 'vuex'

const routes=[
	{
		path:'/login',
		name:'login',
		component:login
	},
	{
		path:'/HomeView',
		name:'HomeView',
		component:Home,
		children:[
			{
				path:'/subjectView',
				name:'subjectView',
				meta: {
					title: '系统首页'
				},
				component:DefaultMain
			}
		]
	}

]

// 路由管理器
const router=createRouter({
	history:createWebHistory(),
	routes
	// routes:routes
})

export function rout(){
	console.log("aa")
	// const rightList = JSON.parse(sessionStorage.getItem('menulist'))
	// const currentRouter = router.options.routes
	const state = JSON.parse(sessionStorage.getItem('state'));
	for (var i = 0; i <  state.updateUserInfo.menus.length; i++) {
		let chm =state.updateUserInfo.menus[i].asideChildren
			for (var k = 0; k < chm.length; k++) {
				if (chm[k].url != null)  {
					let cpath = '../components/' + chm[k].componentPath
					const rouc = {
						path: chm[k].url,
						name: chm[k].componentName,
						component: modules[`${cpath}`]
					}
					router.addRoute("HomeView", rouc)
				}
		}
	}
	//_this.$store.commit("setrightList", response.data.data.menus);
	// console.log(rightList)
	//router.addRoute("Errors", Errors)
}

//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach(function(to, from, next) {
	console.log("in main.js to:" + to.path + "  from:" + from.path)
	const state = JSON.parse(sessionStorage.getItem('state'));
	console.log("+++++++++++=")
	console.log(state)
	if ((to.name !== 'login' && state == null) || (to.name !== 'login' && !state.updateUserInfo.isValidate)) {
		console.log("跳至登录")
		console.log("state=%o", state)
		next({
			name: 'login'
		})
	} else {
		//console.log("modules=%o", modules)
		console.log("state===%o",state)
		if (sessionStorage.getItem('refresh') == "true" && state.updateUserInfo.menus!=null ) {
			console.log("---------------------------------------------------")
			rout(); 
			sessionStorage.setItem("refresh", "false")
			next({
				path: to.path
			})
			return
		}
		next()
		
	}
	
})


export default router