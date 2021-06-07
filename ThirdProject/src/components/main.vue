<template>
	<el-container>
	  <el-aside  :width="isCollapse?'65px':'200px'" >
		<div style="height:60px;border: #E8E7E7 solid 1px;">
			<img src="../../public/favicon.ico" />
		</div>
	  	<el-scrollbar>
	  	<!-- 收起导航栏 -->
	  	<div style="color: #fff; background-color: rgb(74,80,100); 
	  		cursor: pointer;"  :class="{'web-top-close-nav':isCollapse}">
	  		<i style="font-size: 30px;" class="open-close-nav" :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}"
	  			@click="openCloseNav"></i>
	  	</div>		
	  	<el-menu default-active="2" background-color="rgb(50, 65, 87)" text-color="#fff"
	  		active-text-color="#409EFF" class="el-menu-vertical-demo" :collapse="isCollapse"
	  		:collapse-transithion="false" unique-opened>
			
			<el-submenu index="1">
			    <template #title><i class="el-icon-message"></i>导航一</template>
			        <el-menu-item-group>
			          <el-menu-item index="1-1">选项1</el-menu-item>
			          <el-menu-item index="1-2">选项2</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group >
			          <el-menu-item index="1-3">选项3</el-menu-item>
			        </el-menu-item-group>
			        <el-submenu index="1-4">
			          <template #title>选项4</template>
			          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
			        </el-submenu>
			</el-submenu>
			<el-submenu index="2">
			    <template #title><i class="el-icon-message"></i>导航一</template>
			        <el-menu-item-group>
			          <el-menu-item index="1-1">选项1</el-menu-item>
			          <el-menu-item index="1-2">选项2</el-menu-item>
			        </el-menu-item-group>
			        <el-menu-item-group >
			          <el-menu-item index="1-3">选项3</el-menu-item>
			        </el-menu-item-group>
			        <el-submenu index="1-4">
			          <template #title>选项4</template>
			          <el-menu-item index="1-4-1">选项4-1</el-menu-item>
			        </el-submenu>
			</el-submenu>
	    </el-menu>
	    </el-scrollbar>
	  </el-aside>
	
	  <el-container>
	    <el-header style="background-color: #FFFFFF;border: #2C3E50 solid 1px;box-shadow: 10px 10px 5px #888888;height: 60px;" >
			    <el-dropdown>
					<i class="el-icon-s-home" style="margin-left: 15px; font-size:18px;"></i>
					<span style="margin-left:5px; font-size:14px;">首页</span>
			    <template #dropdown>
			      <el-dropdown-menu>
			          <el-dropdown-item>查看</el-dropdown-item>
			          <el-dropdown-item>新增</el-dropdown-item>
			          <el-dropdown-item>删除</el-dropdown-item>
			      </el-dropdown-menu>
			    </template>
			   </el-dropdown>
			  <div class="photo" style="width:150px;text-align: center;margin-top: 10px;">
			      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
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
	    </el-header>
	
	    <el-main>
	      
	    </el-main>
	  </el-container>
	</el-container>
</template>

<style>
   .header{
		
		
	}
  .el-aside {
    color: #55ffff;
	height: 100%;
  }
</style>

<script>
  export default {
    data() {
    
      return {
        isCollapse: false,
      }
    },
	methods:{
		Switch(){
			this.isCollapse=!this.isCollapse
		},
		// 展开收起按钮
		openCloseNav() {
			this.isCollapse = !this.isCollapse;
			this.paramThis.isCollapse = this.isCollapse;
		},
	}
  }
</script>