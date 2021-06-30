<template>
		<!-- 用户初始化密码 -->
	<el-form ref="form" :model="form" label-width="90px"  style="width: 60%;text-align: center;margin-top: 50px;">
	  <el-form-item label="用户编码:" required style="margin-left: 10px;">
	    <el-input v-model="form.EmpId" ></el-input>
	  </el-form-item>
	  <el-form-item label="用户姓名:"  style="margin-left: 10px;">
	    <el-input v-model="form.EmpName" disabled></el-input>
	  </el-form-item>
	  <el-form-item label="新密码:" required  style="margin-left: 10px;">
	    <el-input v-model="form.password"  show-password></el-input>
	  </el-form-item>
	  <el-form-item label="确认密码:" required style="margin-left: 10px;">
	    <el-input v-model="form.password1"  show-password></el-input>
	  </el-form-item>
	  <el-button type="primary">确定初始化</el-button>
	  </el-form>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	export default defineComponent ({
		data(){
			return{
				form:{
					EmpId:'',
					EmpName:'',
					password:'',
					password1:''
					
				}
			}
		},
		methods:{
			xiugai(){
				// this.form.EmpId=this.$store.state.updateUserInfo.userid
				this.form.empName=this.$store.state.updateUserInfo.username
				
			}
		},
		created(){
		this.form.empName=this.$store.state.updateUserInfo.username
		
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findalldept",
			{
				headers: {
				'content-type': 'application/json',
				'jwtAuth': _this.$store.getters.token
			}
			})
			.then(function(response) {
				_this.Data1 = response.data
				console.log(response)
			}).catch(function(error) {
				console.log(error)
			})
		}
	  // setup() {
	  //   return {
	  //     password: ref(''),
		 //  password1: ref(''),
		 //  EmpId:ref(''),
		 //  EmpName:ref('')
	  //   }
	  // }
	})
</script>

<style>
</style>
