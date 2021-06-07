<template>
	<div style="float: left;width: 25%;height: 100%;">
		<span>部门</span>
		<el-tree :data="Data1" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
	</div>
	<div style="float:right;width: 74%;height: 100%;">
		<div style="margin-bottom: 30px;">
			<el-button @click="AddDept">保存</el-button>
		</div>
			
			
				<el-form ref="form" :model="form" label-width="90px" :inline="true" style="width: 100%;text-align: center;margin-top: 50px;">
				  <el-form-item label="部门编码:" required >
				    <el-input v-model="form.deptSortnumber" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门名称:" required style="margin-left: 20px;">
				    <el-input v-model="form.deptName" style="width: 220px;" ></el-input>
				  </el-form-item>
				  <el-form-item label="上级部门:" required>
				    <el-select v-model="form.superiorsDeptId" placeholder="请选择" style="width: 220px;">
				    	<el-option label="客服部门" value="1"></el-option>
				    	<el-option label="销售部门" value="2"></el-option>
				    	<el-option label="常规部门" value="3"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="部门负责人:" style="margin-left: 20px;">
				    <el-input v-model="form.positionfzr" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门电话:" >
				    <el-input v-model="form.positionphone" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门传真:" style="margin-left: 20px;" >
				    <el-input v-model="form.positioncz" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门类型:" >
				    <el-select v-model="form.positiontype" placeholder="请选择" style="width: 220px;">
				    	<el-option label="客服部门" value="1"></el-option>
				    	<el-option label="销售部门" value="2"></el-option>
						<el-option label="常规部门" value="3"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="备注:" style="margin-left: 20px;">
				    <el-input v-model="form.beizhu" style="width: 220px;"></el-input>
				  </el-form-item>
				  </el-form>
				  </div>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					deptSortnumber:'',
					deptName:'',
					superiorsDeptId:'',
					positionfzr:'',
					positionphone:'',
					positioncz:'',
					positiontype:'',
					beizhu:''
				},
				Data1: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
			}
		},
		 methods: {
		      handleNodeClick(data) {
		        console.log(data);
		      },
			  AddDept(){
				  const _this = this
				  this.axios.post("http://localhost:8089/student/dept", this.form)
				  .then(function(response) {
				  	console.log(response)
				  	var dept=response.data
				  	_this.Data1.push(dept)
				  }).catch(function(error) {
				  	console.log(error)
				  })
			  }
		    },
			created() {
				const _this = this;
				this.axios.get("http://localhost:8089/student/findalldept")
					.then(function(response) {
						_this.data1 = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}
		
	}
</script>

<style>
</style>
