<template>
	<!-- 用户-->
	<div class="mian">
		<div class="mainbody" style="width: 100%;">
			<span style="margin-top: 10px;width: 90px;">所属部门：</span>
			<el-select >

			</el-select>
			<span style="margin-top: 10px;width: 90px;">快速检索：</span>
			<el-select v-model="pageInfo.index">
				<el-option label="用户编码" value="empId"></el-option>
				<el-option label="姓名" value="Emp_Name"></el-option>
				<el-option label="性别" value="Emp_Sex"></el-option>
				<el-option label="状态" value="workersstate"></el-option>
				<el-option label="移动电话" value="empPhone"></el-option>
				<!-- <el-option label="办公电话" value="6"></el-option> -->
				<!-- <el-option label="职位" value="7"></el-option> -->
				<!-- <el-option label="角色" value="8"></el-option> -->

			</el-select>

			<el-input placeholder="请输入内容" v-model="pageInfo.value" style="width: 100px;" clearable @clear="serchVal">

			</el-input>
			<el-button @click="findemp_Name"><i class="el-icon-search"></i></el-button>
		</div>
		<div style="margin-bottom: 30px;">
			<el-button @click="dialogFormVisible=true">新增</el-button>
			<el-button @click="qidong">启动</el-button>
			<el-button @click="jiny">禁用</el-button>
			<el-button @click="del">删除</el-button>
			<el-button>导入</el-button>
			<el-button>导出</el-button>
		</div>

		<!-- 新增按钮 -->
		<el-dialog title="新增用户" v-model="dialogFormVisible">
			<el-form :model="addForm" :inline="true">
				<el-form-item label="用户编码:" required p>
					<el-input v-model="addForm.jobnumber"></el-input>
				</el-form-item>
				<el-form-item label="姓名:" label-width="80px" required>
					<el-input v-model="addForm.empName"></el-input>
				</el-form-item>
				<el-form-item label="登录密码:" label-width="90px">
					<el-input type="password" v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码:" label-width="90px">
					<el-input type="password" v-model="addForm.password1"></el-input>
				</el-form-item>
				<el-form-item label="所属部门:" label-width="90px">
					<el-select v-model="addForm.deptId" placeholder="请选择" style="width: 178px;">
						<el-option :label="item.deptName" :value="item.deptId" v-for="item in Data1"></el-option>

					</el-select>
				</el-form-item>
				<el-form-item label="职位:" label-width="90px">
					<el-select v-model="addForm.positionId" placeholder="请选择" style="width: 178px;">
						<el-option :label="item.positionName" :value="item.positionId" v-for="item in Position">
						</el-option>
					</el-select>

				</el-form-item>
				<el-form-item label="性别:" label-width="90px">
					<el-radio v-model="addForm.empSex" label="男" value="男">男</el-radio>
					<el-radio v-model="addForm.empSex" label="女" value="女">女</el-radio>
				</el-form-item>
				<el-form-item label="出生日期:" label-width="90px" style="margin-left: 80px;">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday" style="width: 178px;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态:" label-width="90px">
					<el-select v-model="addForm.workersstate" placeholder="请选择" style="width: 178px;">
						<el-option label="正常" value="0"></el-option>
						<el-option label="禁用" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注:" style="margin-left: 40px;">
					<el-input v-model="addForm.remarks"></el-input>
				</el-form-item>
				<el-form-item label="电子邮件:" style="margin-left: 10px;">
					<el-input v-model="addForm.eMail"></el-input>
				</el-form-item>
				<el-form-item label="职工电话:" style="margin-left: 40px;">
					<el-input v-model="addForm.empPhone"></el-input>
				</el-form-item>
				<el-form-item label="居住地址:" style="margin-left: 40px;">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="AddEmp">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 编辑按钮 -->
		<el-dialog title="编辑用户" v-model="dialogFormVisible2">
			<el-form :model="addForm" :inline="true">
				<el-form-item label="用户编码:" required p>
					<el-input v-model="addForm.jobnumber"></el-input>
				</el-form-item>
				<el-form-item label="姓名:" label-width="80px" required>
					<el-input v-model="addForm.empName"></el-input>
				</el-form-item>
				<el-form-item label="登录密码:" label-width="90px">
					<el-input type="password" v-model="addForm.password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码:" label-width="90px">
					<el-input type="password" v-model="addForm.password1"></el-input>
				</el-form-item>
				<el-form-item label="所属部门:" label-width="90px">
					<el-select v-model="addForm.deptId" placeholder="请选择" style="width: 178px;">
						<el-option :label="item.deptName" :value="item.deptId" v-for="item in Data1"></el-option>

					</el-select>
				</el-form-item>
				<el-form-item label="职位:" label-width="90px">
					<el-select v-model="addForm.positionId" placeholder="请选择" style="width: 178px;">
						<el-option :label="item.positionName" :value="item.positionId" v-for="item in Position">
						</el-option>
					</el-select>

				</el-form-item>
				<el-form-item label="性别:" label-width="90px">
					<el-radio v-model="addForm.empSex" label="男" value="男">男</el-radio>
					<el-radio v-model="addForm.empSex" label="女" value="女">女</el-radio>
				</el-form-item>
				<el-form-item label="出生日期:" label-width="90px" style="margin-left: 80px;">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday" style="width: 178px;">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="状态:" label-width="90px">
					<el-select v-model="addForm.workersstate" placeholder="请选择" style="width: 178px;">
						<el-option label="正常" :value="0">
							正常
						</el-option>
						<el-option label="禁用" :value="1">
							禁用
						</el-option>

					</el-select>
				</el-form-item>
				<el-form-item label="备注:" style="margin-left: 40px;">
					<el-input v-model="addForm.remarks"></el-input>
				</el-form-item>
				<el-form-item label="电子邮件:" style="margin-left: 10px;">
					<el-input v-model="addForm.eMail"></el-input>
				</el-form-item>
				<el-form-item label="职工电话:" style="margin-left: 40px;">
					<el-input v-model="addForm.empPhone"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="updateEmp()">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<el-table :data="tableData" border @selection-change="handleSelectionChange">
			<el-table-column prop="empId" label="Id">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="jobnumber" label="编码">
			</el-table-column>
			<el-table-column prop="empName" label="姓名">
			</el-table-column>
			<el-table-column prop="empSex" label="性别">
			</el-table-column>
			<el-table-column prop="deptList.deptName" label="部门">
			</el-table-column>
			<el-table-column prop="positionList.positionName" label="职位">
			</el-table-column>
			<el-table-column prop="empPhone" label="移动电话">
			</el-table-column>
			<el-table-column prop="workersstate" label="状态">
				<template v-slot="scope">
					<p v-if="scope.row.workersstate==0">正常</p>
					<p v-if="scope.row.workersstate==1">禁用</p>
				</template>
			</el-table-column>
			<el-table-column prop="addtime" label="建档日期">
			</el-table-column>
			<el-table-column prop="index" label="操作">
				<template #default="scope">
					<el-button>附加角色</el-button>
					<el-button @click="Eidt(scope.row)">修改</el-button>
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
</template>

<script>
	import qs from 'qs'
	export default {
		
		data() {
			return {
				Data1: [],
				Position: [],
				
				//用户列表
				// {id:1,schoolName:"大河东",AddTime:"2020-02-03",StudentName:"小红",address:"地点",phone:"18985748576",State:"是"}
				tableData: [],
				//请求用户列表的参数
				pageInfo: {
					index: '',//下拉框选择的内容
					value: '',
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				addForm: {
					jobnumber: '',
					password: '',
					password1: '',
					positionId: '',
					deptId: '',
					empSex: '',
					birthday: '',
					workersstate: '',
					remarks: '',
					eMail: '',
					empPhone: '',
					empName: '',
					empId: '',
					address:''
				},
				dialogFormVisible: false,
				dialogFormVisible2: false,
				//复选框内容
				checkrow: []

			}
		},
		methods: {
			getstudentList() {

			},
			Eidt(row) {
				this.addForm.jobnumber = row.jobnumber
				this.addForm.password = row.password
				this.addForm.password1 = row.password
				this.addForm.positionId = row.positionId
				this.addForm.deptId = row.deptId
				this.addForm.empSex = row.empSex
				this.addForm.birthday = row.birthday
				this.addForm.workersstate = row.workersstate
				this.addForm.remarks = row.remarks
				this.addForm.eMail = row.eMail
				this.addForm.empPhone = row.empPhone
				this.addForm.empName = row.empName
				this.addForm.empId = row.empId
				this.dialogFormVisible2 = true
			},
			
			
			// 被复选框选中获取到的值
			handleSelectionChange(row){
				console.log(row)
				this.checkrow=row;
			},
			// 禁用
			jiny() {
				const _this=this
				this.$confirm('确定要对该选择禁用吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log("1111111111")
					if(_this.checkrow.length==0){
						_this.$message({
							showClose: true,
							message: '请选择删除内容!',
							type: 'error'
						});
					}else {
						console.log("88888")
						_this.checkrow.forEach(item => {
							console.log("禁用："+item.empId)
							_this.Eidtstate(item.empId,1)
						});
						
					}
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消禁用'
					});
				});
			},
			// 启动
			qidong() {
				const _this=this
				this.$confirm('确定要对选择启动吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(_this.checkrow.length==0){
						_this.$message({
							showClose: true,
							message: '请选择删除内容!',
							type: 'error'
						});
					}else{
						_this.checkrow.forEach(item => {
							console.log(item.empId)
							_this.Eidtstate(item.empId,0)
						});
						
					}
					
				}).catch(() => {
					console.log(error)
				});
			},
			Eidtstate(empId,workersstate){
				this.addForm.empId=empId
				this.addForm.workersstate=workersstate
				// this.addForm.deletename=deletename
				console.log("aaaaaaa"+this.addForm.empId,this.addForm.workersstate)
				const _this = this;
				this.axios.put("http://localhost:8089/threeproject/updatestat?eworkersstate="+workersstate+"?empId="+empId)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllEmp", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total=response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
							
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 批量删除
			del() {
				const _this=this
				this.$confirm('确定要删除该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(_this.checkrow.length==0){
						_this.$message({
							showClose: true,
							message: '请选择删除内容!',
							type: 'error'
						});
					}else{
						_this.checkrow.forEach(item => {
							console.log(item.empId)
							_this.delstudent(item.empId)
						});
						
					}
					
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消删除'
					});
				});
			},
			//删除
			delstudent(empId){
				this.addForm.empId=empId
				// this.addForm.deletename=deletename
				console.log(this.addForm.empId)
				const _this = this;
				this.axios.put("http://localhost:8089/threeproject/deltimelimeness?empId="+this.addForm.empId)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllEmp", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total=response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
							
					}).catch(function(error) {
						console.log(error)
					})
			},
			AddEmp() {
				console.log(this.addForm)
				const _this = this;
				this.axios.post("http://localhost:8089/threeproject/addemp", this.addForm)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllEmp", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						console.log(response)
						var dept = response.data
						_this.tableData.push(dept)
						console.log(_this.tableData)
						_this.dialogFormVisible = false

					}).catch(function(error) {
						console.log(error)
					})
			},
			// 被选中
			checkrowall() {
				this.$refs.checkrow.toggleAllSelection();
			},
			//修改
			updateEmp() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/updateemp", this.addForm)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllEmp", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total=response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						console.log(response)
						var dept = response.data
						// _this.DeptData.push(dept)
						var row = _this.tableData.filter(d => d.empId == dept.empId)[0]
						row.jobnumber = dept.jobnumber
						row.password = dept.password
						row.password1 = dept.password
						row.positionId = dept.positionId
						row.deptId = dept.deptId
						row.empSex = dept.empSex
						row.birthday = dept.birthday
						row.workersstate = dept.workersstate
						row.remarks = dept.remarks
						row.eMail = dept.eMail
						row.empPhone = dept.empPhone
						row.empName = dept.empName
						_this.dialogFormVisible2 = false
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
				this.axios.get("http://localhost:8089/threeproject/findalls", {
						params: this.pageInfo
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
				this.axios.get("http://localhost:8089/threeproject/findalls", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log("-------------------------------------------")
						console.log(response.data)
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			//多条件模糊查询
		
			//查询名称
			findemp_Name(){
				console.log(this.pageInfo.select1,this.pageInfo.input)
				const _this = this;
				this.axios.get("http://localhost:8089/threeproject/findalls", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
						_this.pageInfo.total=response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}
			

		},
		created() {
			const _this = this;
			this.findemp_Name(),
				this.axios.get("http://localhost:8089/threeproject/findalldept")
				.then(function(response) {
					_this.Data1 = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findallposition")
				.then(function(response) {
					_this.Position = response.data
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

	span {
		font-size: 12px;
		font-weight: 400;
	}
</style>
