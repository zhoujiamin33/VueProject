<template>
	<!-- 职位 -->
		<div class="mian">
				<div class="mainbody" style="width: 100%;display: flex;">
					<span style="margin-top: 10px;width: 90px;">快速检索：</span>
						<el-select v-model="select">
							<el-option label="职位名称" value="1" ></el-option>
							<el-option label="职位描述" value="2"></el-option>
						</el-select>
			
						<el-input placeholder="请输入内容" v-model="pageInfo.positionName" style="width: 100px;" clearable
							@clear="serchVal">
						
						</el-input>
						<el-button type="primary" @click="findpositionname"><i class="el-icon-search"/>查询</el-button>
				</div>
				<div style="margin-bottom: 30px;display: flex;">
					<el-button type="primary" @click="dialogFormVisible=true">新增</el-button>
				</div>
				
			
				<el-table :data="tableData" border :header-cell-style="{background:'#eef1f6',color:'#606266'}">
					<el-table-column prop="positionId" label="Id">
					</el-table-column>
					<el-table-column prop="positionName" label="职位名称">
					</el-table-column>
					<el-table-column prop="jobdescription" label="职位描述">
					</el-table-column>
					<el-table-column prop="describe" label="操作">
						<template #default="scope">
						<el-button type="primary" @click="positionEdit(scope.row)">修改</el-button>
						<el-button type="primary" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
						layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
					</el-pagination>
				</div>
			</div>
			<!-- 新增学员 -->
			<el-dialog v-model="dialogFormVisible">
				<el-descriptions :model="addForm" class="margin-top" title="部门新增" :column="1" :size="size" border>
					<el-descriptions-item>
						<template #label>
							<i class="el-icon-mobile-phone"></i>
							职位名称:
						</template>
						  <el-input v-model="addForm.positionName"></el-input>
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<i class="el-icon-location-outline"></i>
							职位描述:
						</template>
					<el-input v-model="addForm.jobdescription"></el-input>
					</el-descriptions-item>
					<el-descriptions-item>
						<template #label>
							<i class="el-icon-location-outline"></i>
							职位职责:
						</template>
					<el-input  v-model="addForm.duty" type="textarea"></el-input>
					</el-descriptions-item>
				
				</el-descriptions>
			
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="Addstudent">确 定</el-button>
					</span>
				</template>
			</el-dialog>
			
			<!-- 修改 -->
		<el-dialog v-model="dialogFormVisible2">
			<el-descriptions :model="addForm" class="margin-top" title="部门新增" :column="1" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						职位名称:
					</template>
					  <el-input v-model="addForm.positionName"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						职位描述:
					</template>
				<el-input v-model="addForm.jobdescription"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						职位职责:
					</template>
				<el-input  v-model="addForm.duty" type="textarea"></el-input>
				</el-descriptions-item>
			
			</el-descriptions>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible2 = false">取 消</el-button>
						<el-button type="primary" @click="updateposition">确 定</el-button>
					</span>
				</template>
			</el-dialog>
		</template>
		
		<script>
			import qs from 'qs'
			export default {
				data() {
					return {
						select: "",
						//用户列表
						// {id:1,schoolName:"大河东",AddTime:"2020-02-03",StudentName:"小红",address:"地点",phone:"18985748576",State:"是"}
						tableData: [],
						
						//请求用户列表的参数
						pageInfo: {
							positionName: '',
							currentPage: 1,
							pagesize: 2,
							total: 0
						},
						addForm:{
							positionName:'',
							jobdescription:'',
							duty:'',
							addname:'',
							positionId:'',
							deletename:'',
							updatename:''
						},
						 dialogFormVisible: false,
						 dialogFormVisible2:false,
						 rules:{
							 positionName:[{
								 required: true,
								 message: '请输入职位名称',
								 trigger: "blur"
							 },
						{
							min: 2,
							max: 5,
							message: "长度在2到5个字符",
							trigger: "blur"
						}]
						 }
						      
					}
				},
				methods: {
					 Addstudent(){
						 const _this = this;
						 this.addForm.addname=this.$store.state.updateUserInfo.username
						this.axios.post("http://localhost:8089/threeproject/addposition", this.addForm,
						{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
						}
						})
						.then(function(response) {
							console.log(response)
							var dept=response.data
							
							_this.tableData.push(dept)
						_this.dialogFormVisible = false
							
						}).catch(function(error) {
							console.log(error)
						})
					 },
					 positionEdit(row){
						 this.dialogFormVisible2 = true
						 this.addForm.positionName=row.positionName
						 this.addForm.jobdescription=row.jobdescription
						 // this.addForm.duty=row.duty
						 this.addForm.addname=row.addname
						 this.addForm.positionId=row.positionId
					 },
					 updateposition(){
						 const _this = this
						 this.addForm.updatename=this.$store.state.updateUserInfo.username
						 this.axios.put("http://localhost:8089/threeproject/updateposition", this.addForm,
						 {
						 	headers: {
						 		'content-type': 'application/json',
						 		'jwtAuth': _this.$store.getters.token
						 }
						 })
						 .then(function(response) {
						 	console.log(response)
						 	var dept=response.data
						 var row=_this.tableData.filter(d=>d.positionId==dept.positionId)[0]
						 row.positionName=dept.positionName
						 row.jobdescription=dept.jobdescription
						 row.addname=dept.addname
						 // row.duty=dept.duty
						 _this.dialogFormVisible2 = false
						}).catch(function(error) {
						 	console.log(error)
						 })
					 },
					 del(row){
						const _this = this
						 this.axios.put("http://localhost:8089/threeproject/delTimeLiness",
						 {
						 	params: {
						 		'positionId':row.positionId,
								'deletename':this.$store.state.updateUserInfo.username
						 	},
						 	headers: {
						 		'content-type': 'application/json',
						 		'jwtAuth': _this.$store.getters.token
						 }
						 })
						 .then(function(response) {
						 	console.log(response)
							_this.axios.get("http://localhost:8089/threeproject/findpositionname",
							{
								params: this.pageInfo,
								headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
							}
							})
								.then(function(response) {
									_this.tableData = response.data.list
									_this.pageInfo.total=response.data.total
									console.log(response)
								}).catch(function(error) {
									console.log(error)
								})
						 console.log("------------"+dept)
						}).catch(function(error) {
						 	console.log(error)
						 })
					 },
					 findpositionname(){
						 const _this = this;
						
						 this.axios.get("http://localhost:8089/threeproject/findpositionname",
						 {
						 	params: this.pageInfo,
						 	headers: {
						 		'content-type': 'application/json',
						 		'jwtAuth': _this.$store.getters.token
						 }
						 })
						 	.then(function(response) {
						 		_this.tableData = response.data.list
						 		_this.pageInfo.total=response.data.total
						 	
						 		console.log(response)
						 	}).catch(function(error) {
						 		console.log(error)
						 	})
							
					 },
					 
					 // 分页
					 handleCurrentChange(currentPage) {
					 	var _this = this
					 	this.pageInfo.currentPage = currentPage
					 	var ps = qs.stringify(this.pageInfo)
					 	console.log(ps)
					 	this.axios.get("http://localhost:8089/threeproject/findpositionname", {
						params: this.pageInfo,
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
					}
					})
					 		.then(function(response) {
					 			console.log("-------------------------------------------")
					 			console.log(response.data)
					 			_this.tableData = response.data.list
					 		}).catch(function(error) {
					 			console.log(error)
					 		})
					 },
					 handleSizeChange(pagesize) {
					 	var _this = this
					 	this.pageInfo.pagesize = pagesize
					 	var ps = qs.stringify(this.pageInfo)
					 	console.log(ps)
					 	this.axios.get("http://localhost:8089/threeproject/findpositionname", {
						params: this.pageInfo,
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
					}
					})
					 		.then(function(response) {
					 			console.log("-------------------------------------------")
					 			console.log(response.data)
					 			_this.tableData = response.data.list
					 		}).catch(function(error) {
					 			console.log(error)
					 		})
					 }
				},
				created() {
					const _this = this;
					console.log(this.pageInfo.pagesize, this.pageInfo.currentPage)
					this.axios.get("http://localhost:8089/threeproject/findpositionname",{
						params: this.pageInfo,
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
					}
					})
						.then(function(response) {
							_this.tableData = response.data.list
							_this.pageInfo.total=response.data.total
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			}
		</script>
		
		<style>
			.mian {
				margin: 0px;
				padding: 0px;
			}
		
			.mainbody {
				font-size: 20px;
				padding: 10px 0;
				/* margin-right: 320px; */
		
			}
		
			.block {
				/* position: relative; */
				align-items: center;
				margin-left: 30%;
			}
			span{
				font-size: 12px;
				font-weight: 400;
			}
		</style>
		
	

