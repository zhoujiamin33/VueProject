<template>
<div style="display: flex;
margin-bottom: 10px;">
			<el-button @click="dialogFormVisible=true">新增</el-button>
			</div>
			<el-table :data="Data1" style="width: 100%" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column prop="deptId" label="Id">
				</el-table-column>
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="deptSortnumber" label="部门编码">
				</el-table-column>
				<el-table-column prop="deptName" label="部门名称">
				</el-table-column>
				<el-table-column prop="superiorsDeptId" label="上级部门">
				</el-table-column>
				<el-table-column prop="index" label="操作"  fixed="right">
					<template #default="scope">
						<el-button type="text" @click="handleNodeClick(scope.row)">修改</el-button>
						<el-button type="text" @click="delDept(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 新增 -->
			<el-dialog v-model="dialogFormVisible">
				<el-descriptions :model="addForm" class="margin-top" title="部门新增" :column="1" :size="size" border>
					<el-descriptions-item>
						<template #label>
							<i class="el-icon-mobile-phone"></i>
							部门编码:
						</template>
						    <el-input v-model="form.deptSortnumber" style="width: 220px;"></el-input>
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<i class="el-icon-location-outline"></i>
							部门名称:
						</template>
					<el-input v-model="form.deptName" style="width: 220px;" ></el-input>
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<i class="el-icon-tickets"></i>
							上级部门:
						</template>
					<el-select v-model="form.superiorsDeptId" placeholder="请选择" style="width: 220px;">
						<el-option label="总经理" value="1"></el-option>
						<el-option label="销售部门" value="2"></el-option>
						<el-option label="常规部门" value="3"></el-option>
					</el-select>
					</el-descriptions-item>
					<el-descriptions-item>
						<el-button @click="AddDept">确定</el-button>
						<el-button @click="dialogFormVisible=false">返回</el-button>
					</el-descriptions-item>
				</el-descriptions>
			</el-dialog>
				<!-- 修改 -->
				<el-dialog v-model="dialogFormVisible2">
					<el-descriptions :model="addForm" class="margin-top" title="部门新增" :column="1" :size="size" border>
						<el-descriptions-item>
							<template #label>
								<i class="el-icon-user"></i>
								编码:
							</template>
					<el-input v-model="form.deptId" style="width: 220px;"></el-input>
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<i class="el-icon-mobile-phone"></i>
								部门编码:
							</template>
							    <el-input v-model="form.deptSortnumber" style="width: 220px;"></el-input>
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<i class="el-icon-location-outline"></i>
								部门名称:
							</template>
						<el-input v-model="form.deptName" style="width: 220px;" ></el-input>
						</el-descriptions-item>
						<el-descriptions-item>
							<template #label>
								<i class="el-icon-tickets"></i>
								上级部门:
							</template>
						<el-select v-model="form.superiorsDeptId" placeholder="请选择" style="width: 220px;">
							<el-option label="总经理" value="1"></el-option>
							<el-option label="销售部门" value="2"></el-option>
							<el-option label="常规部门" value="3"></el-option>
						</el-select>
						</el-descriptions-item>
						<el-descriptions-item>
							<el-button @click="updatedept">确定</el-button>
							<el-button @click="dialogFormVisible2=false">返回</el-button>
						</el-descriptions-item>
					</el-descriptions>
				</el-dialog>
				
				  
				 
</template>

<script>
	export default{
		data(){
			return{
				form:{
					deptId:'',
					deptSortnumber:'',
					deptName:'',
					superiorsDeptId:''
				},
				Data1: [],
				dialogFormVisible:false,
				dialogFormVisible2:false,
        defaultProps: {
          children: 'children',
          label: 'deptName'
        }
			}
		},
		 methods: {
			  // 点击进入显示该内容
		      handleNodeClick(row) {
				this.dialogFormVisible2=true
		        this.form.deptSortnumber=row.deptSortnumber
		        this.form.deptName=row.deptName
		        this.form.superiorsDeptId=row.superiorsDeptId
				this.form.deptId=row.deptId
				
		      },
			
			  AddDept(){
				  const _this = this
				 
				  this.axios.post("http://localhost:8089/threeproject/dept", this.form)
				  .then(function(response) {
				  	console.log(response)
				  	var dept=response.data
				  	_this.Data1.push(dept)
					_this.dialogFormVisible=false
				_this.form={
					deptSortnumber:'',
					deptName:'',
					superiorsDeptId:''
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
						row.deptId=dept.deptId
						_this.dialogFormVisible2=false
				  _this.form={
				  	deptSortnumber:'',
				  	deptName:'',
				  	superiorsDeptId:''
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
