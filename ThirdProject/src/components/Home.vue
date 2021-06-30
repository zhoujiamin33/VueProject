<template>
	<el-container>

		<!-- 头部 -->
		<el-header>
			<div style="height:50px;width:200px;">
				<el-avatar style="margin-top: 10px;margin-left:10px;" src="../public/logo.381d6a3e.png"></el-avatar>
				<h3 style="color:#ffffff ;width: 200px;margin-top: -70px;margin-left:65px;">卓越培训系统</h3>
			</div>
			<div style="width: 100%; height:50px;box-shadow: 0 2px 3px -1px  #ffffff;">
				<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"></el-radio-group>
				<div class="photo" style="width:150px;text-align: center;margin-left:30px;">
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<div style="margin-top: -70px;width: 270px;">
							<span class="el-dropdown-link" style="color: #FFFFFF;">{{this.$store.state.updateUserInfo.username}}</span>
							<el-button type="text" @click.native="logout">注销退出</el-button>
					</div>
				</div>
			</div>

		</el-header>

		<el-container>
			<!-- 侧边栏 -->
			<el-aside :width="isCollapse?'65px':'200px'">
				<!-- <el-aside width="auto"> -->
				<!-- <el-scrollbar style="height: 100%;"> -->
				<el-scrollbar>
					<!-- 收起导航栏 -->
					<div style="color: #fff; background-color:#ffffff; 
					cursor: pointer;" :class="{'web-top-close-nav':isCollapse}">
						<i style="font-size: 30px; color: #000000;" class="open-close-nav"
							:class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
							@click="openCloseNav"></i>
					</div>
					<el-menu :default-active="$route.path" :uniqueOpened="true" router background-color="#ffffff" text-color="#000000" active-text-color="#409EFF"
						class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transithion="false"
						unique-opened>

						<!-- 侧边栏内容 -->
						<el-submenu :index="menu.id" v-for="menu in logninfo.menus">
							<template #title>
								<span>{{ menu.menuName }}</span>
							</template>
							<el-menu-item-group>
								<template #title>
								</template>
								<el-menu-item :index="subItem.url" v-for="subItem in menu.asideChildren"
									:key="subItem.id">
									{{ subItem.menuName }}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<!-- 主体部 -->
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	// import tags from './tags.vue'
	import {
		h,
		ref,
		reactive,
		onBeforeMount,
		onMounted
	} from 'vue';
	
	import {
		useStore
	} from "vuex";
	export default {
		// components:{tags},
		name: 'HomeView',
		data() {
			return {
				isCollapse: false,
				parentList: [],
				childrenList: []
			}
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			Switch() {
				this.isCollapse = !this.isCollapse
			},
			// 展开收起按钮
			openCloseNav() {
				this.isCollapse = !this.isCollapse;
				this.paramThis.isCollapse = this.isCollapse;
			},
			logout() {
				if(this.$store.state.updateUserInfo.token===""){
					this.$message.error('错了哦，这是一条错误消息');
				}else{
					const _this=this
					this.axios.post("http://localhost:8089/threeproject/signout")
						.then(function(response){
							console.log("已退出")
							_this.$store.commit("updateUserInfo",null)
							sessionStorage.setItem('refresh',"false")
							_this.asideMenus = _this.$store.getters.asideMenus("/logout")
							_this.$router.push({
								path: "/login"
							})
						}).catch(function(error){
							console.log(error)
						})
				}
			}
		},
		mounted: function() {
			window.addEventListener('beforeunload', () => {
				//刷新前将目前登录的用户保存到sessionStorage中
				sessionStorage.setItem('state', JSON.stringify(this.$store.state))
				sessionStorage.setItem("refresh", "true")
			})
		},
		created: function() {
			//全局监听，页面刷新的时候将store里state的值存到sessionStorage中，
			//然后从sessionStorage中获取，再赋值给store。然后再把session里面
			//存的删除即可，相当于中间件的作用。在页面加载时读取sessionStorage
			//里的状态信息
			//console.group("in main.js created............................begin")
		
			if (sessionStorage.getItem("state")) {
				//替换 store 的根状态，状态合并
				//Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性
				//，复制到目标对象（target）。Object.assign(target, source1, source2);
				this.store.replaceState(
					Object.assign({},
						this.store.state,
						JSON.parse(sessionStorage.getItem("state"))
					)
				)
				
				this.logninfo.username = this.store.state.updateUserInfo.username
				this.logninfo.isValidate = this.store.state.updateUserInfo.isValidate
				this.logninfo.token = this.store.state.updateUserInfo.token
				this.logninfo.menus = this.store.state.updateUserInfo.menus
			}
		
		},
		setup() {
			const store = useStore();
			const logninfo = ref(store.state.updateUserInfo)
			console.log("logninfo")
			console.log(logninfo)
			return {
				logninfo,
				store
			}
		}
		// created(){
		// 	const _this=this
		// 	this.axios.get("http://localhost:8089/threeproject/findParent")
		// 	.then(function(response){
		// 		console.log(response)
		// 		_this.parentList=response.data
		// 	}).catch(function(error){
		// 		console.log(error)
		// 	}),
		// 	this.axios.get("http://localhost:8089/threeproject/findChildren")
		// 	.then(function(response){
		// 		console.log(response)
		// 		_this.childrenList=response.data
		// 	}).catch(function(error){
		// 		console.log(error)
		// 	})
		// }
	}
</script>
<style>
	.el-menu-item-group__title {
		padding: 0px 0px 0px 0px;
	}

	a {
		text-decoration: none;
	}

	.el-dropdown-link {
		cursor: pointer;
		color: #409EFF;
	}

	.el-icon-arrow-down {
		font-size: 12px;
	}

	.photo {
		width: 50px;
		height: 50px;
		margin-top: -100px;
		position: absolute;
		left: 82%;
		margin-right: 20px;
	}

	.el-header {
		background-color: #626262;
		font-size: 20px;
		line-height: 60px;
		font-size: 22px;
	}

	.el-header img {
		vertical-align: middle;
	}

	.el-aside {
		background-color: #eaeaea;
		display: block;
		overflow-y: scroll;
		height: 650px;
	}

	.el-main {
		background-color: #ffffff;
		color: #333;
		text-align: center;
		height: 100%;
	}

	.el-container {
		height: 100%;
	}
</style>
