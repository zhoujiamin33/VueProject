<template>
	<div style="float: left;width: 25%;height: 100%;">
		<span>部门</span>

		<el-tree :data="Data1" :props="defaultProps" @node-click="handleNodeClick"   show-checkbox></el-tree>
	

	</div>
	<div style="float:right;width: 74%;height: 100%;">
		<div style="margin-bottom: 30px;">
			
			<el-button @click="AddDept" v-show="!form.show">保存</el-button>
			<div v-show="form.show">
			 <el-button @click="show()">新增</el-button>
			<el-button @click="updatedept">保存</el-button>
			 <el-button @click="delDept(Data1)">删除</el-button>
			</div>
			
		</div>
			
			
				<el-form ref="form" :model="form" label-width="90px" :inline="true" style="width: 100%;text-align: center;margin-top: 50px;">
				  <el-form-item label="编码:"  style="display: none;">
				    <el-input v-model="form.deptId" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门编码:" required >
				    <el-input v-model="form.deptSortnumber" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门名称:" required style="margin-left: 20px;">
				    <el-input v-model="form.deptName" style="width: 220px;" ></el-input>
				  </el-form-item>
				  <el-form-item label="上级部门:" required>
				    <el-select v-model="form.superiorsDeptId" placeholder="请选择" style="width: 220px;">
				    	<el-option label="总经理" value="1"></el-option>
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
					deptId:'',
					deptSortnumber:'',
					deptName:'',
					superiorsDeptId:'',
					positionfzr:'',
					positionphone:'',
					positioncz:'',
					positiontype:'',
					beizhu:'',
					show:false
				},
				Data1: [],
				
        defaultProps: {
          children: 'children',
          label: 'deptName'
        }
			}
		},
		 methods: {
			  // 点击进入显示该内容
		      handleNodeClick(Data1) {
		        this.form.deptSortnumber=Data1.deptSortnumber
		        this.form.deptName=Data1.deptName
		        this.form.superiorsDeptId=Data1.superiorsDeptId
		        this.form.positionfzr=Data1.positionfzr
		        this.form.positionphone=Data1.positionphone
		        this.form.positioncz=Data1.positioncz
		        this.form.positiontype=Data1.positiontype
		        this.form.beizhu=Data1.beizhu
				this.form.deptId=Data1.deptId
				 this.form.show=true
		      },
			  show(){
				 this.form={
				 	deptId:'',
				 	deptSortnumber:'',
				 	deptName:'',
				 	superiorsDeptId:'',
				 	positionfzr:'',
				 	positionphone:'',
				 	positioncz:'',
				 	positiontype:'',
				 	beizhu:'',
				 	show:false
				 }
				
			  },
			  AddDept(){
				  const _this = this
				 
				  this.axios.post("http://localhost:8089/threeproject/dept", this.form)
				  .then(function(response) {
				  	console.log(response)
				  	var dept=response.data
				  	_this.Data1.push(dept)
				_this.form={
					deptSortnumber:'',
					deptName:'',
					superiorsDeptId:'',
					positionfzr:'',
					positionphone:'',
					positioncz:'',
					positiontype:'',
					beizhu:''
				}
				  }).catch(function(error) {
				  	console.log(error)
				  })
			  },
			 
			  updatedept(){
				  const _this = this
				    this.axios.put("http://localhost:8089/threeproject/dept", this.form)
				    .then(function(response) {
				    	console.log(response)
				    	var dept=response.data
				    	var row=_this.Data1.filter(d=>d.deptSortnumber==dept.deptSortnumber)[0]
				    	row.deptSortnumber=dept.deptSortnumber
				    	row.deptName=dept.deptName
				    	row.superiorsDeptId=dept.superiorsDeptId
				    	row.positionfzr=dept.positionfzr
				    	row.positionphone=dept.positionphone
				    	row.positioncz=dept.positioncz
				    	row.positiontype=dept.positiontype
				    	row.beizhu=dept.beizhu
						row.deptId=dept.deptId
				  _this.form={
					  
				  	deptSortnumber:'',
				  	deptName:'',
				  	superiorsDeptId:'',
				  	positionfzr:'',
				  	positionphone:'',
				  	positioncz:'',
				  	positiontype:'',
				  	beizhu:''
				  }
				    }).catch(function(error) {
				    	console.log(error)
				    })

			  },
			  delDept(Data1) {
			  				const _this = this
			  				var flag=true
			  				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
			  				          confirmButtonText: '确定',
			  				          cancelButtonText: '取消',
			  				          type: 'warning'
			  				        }).then(() => {
			  							_this.axios.put("http://localhost:8089/threeproject/dept/"+_this.form.deptId)
			  								.then(function(response) {
			  									var dept = response.data
			  									var rows = _this.Data1
			  										.filter(d => d.deptId != dept.deptId)
			  									console.log("del rows:%o",rows)
			  									_this.Data1=rows
												_this.form={
																	  
													deptSortnumber:'',
													deptName:'',
													superiorsDeptId:'',
													positionfzr:'',
													positionphone:'',
													positioncz:'',
													positiontype:'',
													beizhu:''
												}
											_this.axios.get("http://localhost:8089/threeproject/findalldept")
												.then(function(response) {
													_this.Data1 = response.data
													console.log(response)
												}).catch(function(error) {
													console.log(error)
												})
			  								}).catch(function(error) {
												
			  									console.log(error)
			  								})
			  				        }).catch(() => {
			  							this.$message({
			  							  type: 'error',
			  							  message: '取消删除!'
			  							});
			  				        });	
			  			}
		    },
			created() {
				const _this = this;
			this.axios.get("http://localhost:8089/threeproject/findalldept")
				.then(function(response) {
					_this.Data1 = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			}
			
		
	}
</script>

<style>

</style>
