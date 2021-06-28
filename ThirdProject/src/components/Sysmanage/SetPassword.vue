<template>
		<!-- 用户初始化密码 -->
	<el-form ref="form" :model="form" label-width="90px"  style="width: 60%;text-align: center;margin-top: 50px;">
	  <el-form-item label="用户编码:" required style="margin-left: 10px;">
	    <el-input v-model="positionId" ></el-input>
	  </el-form-item>
	  <el-form-item label="用户姓名:"  style="margin-left: 10px;">
	    <el-input v-model="positionName" disabled></el-input>
	  </el-form-item>
	  <el-form-item label="新密码:" required  style="margin-left: 10px;">
	    <el-input v-model="input"  show-password></el-input>
	  </el-form-item>
	  <el-form-item label="确认密码:" required style="margin-left: 10px;">
	    <el-input v-model="input"  show-password></el-input>
	  </el-form-item>
	  <el-button>确定初始化</el-button>
	  </el-form>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	export default defineComponent ({
		data(){
			return{
				
			}
		},
	  setup() {
	    return {
	      input: ref(''),
		  positionId:ref(''),
		  positionName:ref('')
	    }
	  }
	})
</script>

<style>
</style>
