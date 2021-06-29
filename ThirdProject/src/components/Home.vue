<template>
	<el-container>

		<!-- 头部 -->
		<el-header>
			<div style="height:50px;width:200px;">
				<el-avatar style="margin-top: 10px;margin-left:10px;"></el-avatar>
				<h3 style="color:#ffffff ;width: 200px;margin-top: -70px;margin-left:65px;">卓越培训系统</h3>
			</div>
			<div style="width: 100%; height:50px;box-shadow: 0 2px 3px -1px  #bababa;">
				<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"></el-radio-group>
				<i class="el-icon-full-screen"
					style=" position: absolute; left: 81%; top: 10px; padding: 5px 10px; font-size:33px;color: #FFFFFF;"
					@click=""></i>
				<div class="photo" style="width:150px;text-align: center;">
					<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
					<div style="margin-top: -70px;width: 270px;">
						<el-dropdown>
							<span class="el-dropdown-link">Tsm管理员<i
									class="el-icon-arrow-down el-icon--right"></i></span>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>修改密码</el-dropdown-item>
									<el-dropdown-item>修改资料</el-dropdown-item>
									<el-dropdown-item @click.native="logout">注销退出</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
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
					<div style="color: #fff; background-color:#e8eaee; 
					cursor: pointer;" :class="{'web-top-close-nav':isCollapse}">
						<i style="font-size: 30px; color: #303133;" class="open-close-nav"
							:class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
							@click="openCloseNav"></i>
					</div>
					<el-menu :default-active="$route.path" :uniqueOpened="true" router background-color="#dcdee1" text-color="#fff" active-text-color="#409EFF"
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
			<!-- <div style="width: 100%; height:30px;margin-top:-20px;">
				<i class="el-icon-s-home" style="margin-left:-1220px;" @herf="{ path: '/' }">首页</i>
			</div> -->
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
			// screen() {
			// // 如果不允许进入全屏，发出不允许提示
			// if (!screenfull.enabled) {
			// this.$message("您的浏览器不能全屏");
			// return false;
			// }
			// screenfull.toggle();
			// this.$message.success("全屏啦");
			// },
			// 	getMenuList() {
			// 		this.$http.get('menus').then(res => {
			// 		console.log(res);
			// 		if (res.data.meta.status != 200) this.$message.error('请求导航栏失败');
			// 		this.menuList = res.data.data;

			// 		})
			// 	},
			// 展开收起按钮
			openCloseNav() {
				this.isCollapse = !this.isCollapse;
				this.paramThis.isCollapse = this.isCollapse;
			},
			logout() {

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
		background-color: #333333;
		font-size: 20px;
		line-height: 60px;
		font-size: 22px;
	}

	.el-header img {
		vertical-align: middle;
	}

	.el-aside {
		background-color: #dcdee1;
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
