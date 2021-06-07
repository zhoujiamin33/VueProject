<template>
	<!-- 学员档案 -->
	<div class="mian">
		<div class="mainbody">
			<div style="margin-right: 320px;display: flex;">
				<span style="margin-top: 10px;width: 90px;">快速检索：</span>
				<el-select v-model="select" placeholder="请选择">
					<el-option label="姓名" value="1"></el-option>
					<el-option label="电话" value="2"></el-option>
				</el-select>

				<el-input placeholder="请输入内容" v-model="pageInfo.query" style="width: 100px;" clearable
					@clear="serchVal">
				</el-input>
			</div>
			<div style="display: flex;">
				<el-button @click="getstudentList">查询</el-button>
				<el-button @click="tgsp">通过审批</el-button>
				<el-button @click="dialogFormVisible = true">新增</el-button>
				<el-button @click="open">办理退卡</el-button>
				<el-button @click="del">删除</el-button>
			</div>
		</div>

		<el-table :data="Stutable" border>
			<el-table-column prop="studentId" label="Id">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="studytime" label="报名时间">
			</el-table-column>
			<el-table-column prop="studentName" label="姓名">
			</el-table-column>
			<el-table-column prop="address" label="联系地址">
			</el-table-column>
			<el-table-column prop="studentPhone" label="联系电话">
			</el-table-column>
			<el-table-column prop="studentState" label="状态">
			</el-table-column>
			<el-table-column prop="index" label="操作">
				<template #default="scope">
					<el-button type="text">补报</el-button>
					<!-- <el-button type="text">拍照</el-button> -->
					<el-button type="text" @click="dialogFormupdate= true">修改</el-button>
					<el-button type="text">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
		<!-- 新增按钮 -->
		<el-dialog title="新增学员" v-model="dialogFormVisible">
			<el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
				<el-form-item label="生源渠道:" required prop="sourceId">
					<el-select v-model="addForm.sourceId" placeholder="请选择生源渠道" style="width: 178px;">
						<el-option label="其他" value="1"></el-option>
						<el-option label="北京" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名:" prop="studentName" label-width="80px" required>
					<el-input v-model="addForm.studentName"></el-input>
				</el-form-item>
				<el-form-item label="性别:" prop="sex" label-width="90px">
					<el-radio v-model="addForm.sex" label="0">男</el-radio>
					<el-radio v-model="addForm.sex" label="1">女</el-radio>
				</el-form-item>
				<el-form-item label="居住地址:" prop="address" required style="margin-left: 60px;">
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="移动电话:" prop="studentPhone">
					<el-input v-model="addForm.studentPhone"></el-input>
				</el-form-item>
				<el-form-item label="家长姓名:" prop="parentName" >
					<el-input v-model="addForm.parentName"></el-input>
				</el-form-item>
				<el-form-item label="家长手机:" prop="parentPhone" required>
					<el-input v-model="addForm.parentPhone"></el-input>
				</el-form-item>
				<el-form-item label="入学备注:" prop="entrance">
					<el-input v-model="addForm.entrance"></el-input>
				</el-form-item>
				<el-form-item label="课程顾问:" prop="empName" required>
					<el-input v-model="addForm.empName"></el-input>
				</el-form-item>
				<el-form-item label="录入人:" prop="empName" label-width="80px">
					<el-input v-model="addForm.empName2"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="Addstudent">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 修改 -->
		<el-dialog title="修改学员" v-model="dialogFormVisible2">
			<el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
				<el-form-item label="生源渠道:" required prop="sourceId">
					<el-select v-model="addForm.sourceId" placeholder="请选择生源渠道" style="width: 210px;">
						<el-option label="其他" value="1"></el-option>
						<el-option label="北京" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名:" prop="studentName" label-width="80px" required>
					<el-input v-model="addForm.studentName"></el-input>
				</el-form-item>
				<el-form-item label="性别:" prop="sex" label-width="90px">
					<el-radio v-model="addForm.sex" label="0">男</el-radio>
					<el-radio v-model="addForm.sex" label="1">女</el-radio>
				</el-form-item>
				<el-form-item label="居住地址:" prop="address" required>
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="移动电话:" prop="studentPhone">
					<el-input v-model="addForm.studentPhone"></el-input>
				</el-form-item>
				<el-form-item label="家长姓名:" prop="parentName">
					<el-input v-model="addForm.parentName"></el-input>
				</el-form-item>
				<el-form-item label="家长手机:" prop="parentPhone" required>
					<el-input v-model="addForm.parentPhone"></el-input>
				</el-form-item>
				<el-form-item label="入学备注:" prop="entrance">
					<el-input v-model="addForm.entrance"></el-input>
				</el-form-item>
				<el-form-item label="课程顾问:" prop="empName" required>
					<el-input v-model="addForm.empName"></el-input>
				</el-form-item>
				<el-form-item label="录入人:" prop="empName" label-width="80px">
					<el-input v-model="addForm.empName2"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="Addstudent">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				select: "",
				//用户列表
				// {id:1,schoolName:"大河东",AddTime:"2020-02-03",StudentName:"小红",address:"地点",phone:"18985748576",State:"是"}
				Stutable: [],
				//请求用户列表的参数
				pageInfo: {
					query: '',
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				addForm: {
					sourceId: '',
					studentName: '',
					sex: '',
					studentPhone: '',
					parentname: '',
					parentphone: '',
					entrance: '',
					empName: '',
					empName2: '',
					address: ''
				},
				dialogFormVisible: false,
				dialogFormVisible2: false,
				rules: {
					studentName: [{
							required: true,
							message: '请输入学生姓名',
							trigger: "blur"
						},
						{
							min: 2,
							max: 5,
							message: "长度在2到5个字符",
							trigger: "blur"
						}
					],
					parentName: [{
							required: true,
							message: '请输入家长姓名',
							trigger: "blur"
						},
						{
							min: 2,
							max: 5,
							message: "长度在2到5个字符",
							trigger: "blur"
						}
					]
				}

			}
		},
		methods: {
			getstudentList() {

			},
			open() {
				this.$confirm('确定要对选择办理退卡吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '办理成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消办理'
					});
				});
			},
			tgsp() {
				this.$confirm('确定要审批通过吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '审批通过!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消审批'
					});
				});
			},
			del() {
				this.$confirm('确定要删除该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},

			// 新增学员
			Addstudent() {

				const _this = this
				this.axios.post("http://localhost:8089/student/student", this.addForm)
					.then(function(response) {
						var student = response.data
						_this.Stutable.push(student)
						_this.dialogFormVisible = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			// 显示所有学员信息
			const _this = this;
			this.axios.get("http://localhost:8089/student/findstudent")
				.then(function(response) {
					_this.Stutable = response.data
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
		display: flex;
		font-size: 20px;
		float: left;
		padding: 10px 0;

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
