<template>
	<el-container>
		
		<!-- 头部 -->
		<el-header>
			<div style="height:50px;width:200px;">
				<el-avatar src="./public/logo.381d6a3e.png" style="margin-top: 10px;margin-left:10px;"></el-avatar>
				<h3 style="color:#ffffff ;width: 200px;margin-top: -70px;margin-left:65px;">卓越培训系统</h3>
			</div>
			<div style="width: 100%; height:50px;box-shadow: 0 2px 3px -1px  #bababa;">
				<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;"></el-radio-group>
				   <i class="el-icon-full-screen"
				   style=" position: absolute; left: 81%; top: 10px; padding: 5px 10px; font-size:33px;color: #FFFFFF;" @click=""></i>
				<div class="photo" style="width:150px;text-align: center;">
				    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>
					<div style="margin-top: -70px;width: 270px;">
						<el-dropdown >
						  <span class="el-dropdown-link">Tsm管理员<i class="el-icon-arrow-down el-icon--right"></i></span>
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
			<el-aside  :width="isCollapse?'65px':'200px'" >
			<!-- <el-aside width="auto"> --> 
				<!-- <el-scrollbar style="height: 100%;"> -->
				<el-scrollbar>
				<!-- 收起导航栏 -->
				<div style="color: #fff; background-color:#e8eaee; 
					cursor: pointer;"  :class="{'web-top-close-nav':isCollapse}">
					<i style="font-size: 30px; color: #303133;" class="open-close-nav" :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
						@click="openCloseNav"></i>
				</div>		
				<el-menu default-active="2" background-color="#dcdee1" text-color="#fff"
					active-text-color="#409EFF" class="el-menu-vertical-demo" :collapse="isCollapse"
					:collapse-transithion="false" unique-opened>
						
					<!-- 侧边栏内容 -->
					<el-submenu :index="menu.parentId" v-for="menu in parentList">
						<template #title>
							<i :class="menu.menuIcon"></i>
							<span style="font-size: 15px;color: #666;">{{menu.menuName}}</span>
						</template>
							
						<el-menu-item-group  v-for="childs in childrenList">
							<el-menu-item  v-if="childs.parentId==menu.parentId">
								<router-link :to="childs.menuPath" style="color:aliceblue">
									<el-menu-item index="6-1" style="color: #666;">	
									   <i :class="childs.menuIcon"></i>
										{{childs.menuName}}
									</el-menu-item>	
								</router-link>
							</el-menu-item>
						</el-menu-item-group>
						
					</el-submenu>
					
				</el-menu>
				</el-scrollbar>
			</el-aside>
			
			<!-- 主体部 -->
			<el-main>
				<div style="width: 100%; height:30px;margin-top:-20px;">
					<i class="el-icon-s-home" style="margin-left:-1220px;" @herf="{ path: '/' }">首页</i>
				</div>
				
				<!-- 标签 -->
				<!-- <template>
					<el-breadcrumb separator-class="el-icon-arrow-right">
					  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					  <el-breadcrumb-item :to="{ path: '/classtype' }">课类维护</el-breadcrumb-item>
					  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
					  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
					</el-breadcrumb>
				</template> -->
				<!-- 路由 -->
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>

</template>

<script>
	// import tags from './tags.vue'
	export default {
		// components:{tags},
		name: 'MainVue',
		data() {
			return {
				isCollapse: false,
				parentList:[],
				childrenList:[]
			}
		},
		methods: {
			handleOpen(key, keyPath) {
			    console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
			    console.log(key, keyPath);
			},
			Switch(){
				this.isCollapse=!this.isCollapse
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
			logout(){
				
			}
		},
		created(){
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findParent")
			.then(function(response){
				console.log(response)
				_this.parentList=response.data
			}).catch(function(error){
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/findChildren")
			.then(function(response){
				console.log(response)
				_this.childrenList=response.data
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>
<style>
	.el-menu-item-group__title{
		padding: 0px 0px 0px 0px;
	}
	  a{
		  text-decoration: none;
	  }
	  .el-dropdown-link {
	    cursor: pointer;
	    color: #409EFF;
	  }
	  .el-icon-arrow-down {
	    font-size: 12px;
	  }
	.photo{
		width: 50px;
		height: 50px;
		margin-top: -100px;
		position: absolute;
		left: 82%;
		margin-right: 20px;
	}
	.el-header {
		background-color:#333333;
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
		height:650px;
	}

	.el-main {
		background-color: #ffffff;
		color: #333;
		text-align: center;
		height:100%;
	}

	.el-container {
		height: 100%;
	}
</style>
