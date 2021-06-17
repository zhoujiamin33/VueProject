<template>
	<!-- 学员档案 -->
	<div class="mian">
		<div class="mainbody">
			<div style="margin-right: 320px;display: flex;">
				<span style="margin-top: 10px;width: 90px;">快速检索：</span>
				<el-select v-model="pageInfo.index" placeholder="请选择">
					<el-option label="姓名" value="Student_Name"></el-option>
					<el-option label="电话" value="Student_Phone"></el-option>
				</el-select>

				<el-input placeholder="请输入内容" v-model="pageInfo.value" style="width: 100px;" clearable
					@clear="serchVal">
				</el-input>
			</div>
			<div style="display: flex;">
				<el-button @click="selectName">查询</el-button>
				<el-button @click="shengpi">通过审批</el-button>
				<el-button @click="open">办理退卡</el-button>
				<el-button @click="del">删除</el-button>
			</div>
		</div>

		<el-table :data="Stutable" border @selection-change="handleSelectionChange">
			<el-table-column prop="studentId" label="Id">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="studytime" label="报名时间">
			</el-table-column>
			<el-table-column prop="register.consultant" label="姓名">
			</el-table-column>
			<el-table-column prop="address" label="联系地址">
			</el-table-column>
			<el-table-column prop="register.phone" label="联系电话">
			</el-table-column>
			<el-table-column prop="studentState" label="状态">
				<template v-slot="scope">
					<p v-if="scope.row.studentState==0">已报名</p>
					<p v-if="scope.row.studentState==1">未报名</p>
				</template>
			</el-table-column>
			<el-table-column prop="source.sourceName" label="生源渠道">
			</el-table-column>
			<!-- <el-table-column prop="register.consultant" label="咨询编号">
			</el-table-column> -->
			<el-table-column prop="index" label="操作">
				<template #default="scope">
					<el-button type="text" @click="bubao(scope.row)">补报</el-button>
					<!-- <el-button type="text">拍照</el-button> -->
					<el-button type="text" @click="editstu(scope.row)">修改</el-button>
					<el-button type="text" @click="look(scope.row)">查看</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
		
		<!-- 修改 -->
		<el-dialog title="修改学员" v-model="dialogFormVisible2">
			<el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
				<el-form-item label="生源渠道:" required prop="sourceId">
					<el-select v-model="addForm.sourceId" placeholder="请选择生源渠道" style="width: 178px;">
						<el-option :label="item.sourceName" :value="item.sourceId" v-for="item in Source"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="姓名:" prop="studentName" label-width="80px" required>
					<el-input v-model="addForm.studentName"></el-input>
				</el-form-item>
				<el-form-item label="性别:" prop="sex" label-width="90px">
					<el-radio v-model="addForm.sex" label="男">男</el-radio>
					<el-radio v-model="addForm.sex" label="女">女</el-radio>
				</el-form-item>
				<el-form-item label="居住地址:" prop="address" required>
					<el-input v-model="addForm.address"></el-input>
				</el-form-item>
				<el-form-item label="移动电话:" prop="studentPhone">
					<el-input v-model="addForm.studentPhone"></el-input>
				</el-form-item>
				<el-form-item label="家长姓名:" prop="parentname">
					<el-input v-model="addForm.parentname"></el-input>
				</el-form-item>
				<el-form-item label="家长手机:" prop="parentphone" required>
					<el-input v-model="addForm.parentphone"></el-input>
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
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="Updatestu">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<!--  补报-->
		<el-dialog title="课程预报" v-model="dialogFormVisible4">
			<div>
				单号：XS2021060421144&nbsp;学号：2 &nbsp; 姓名：貂蝉 &nbsp; 添加日期：2021/6/4
			</div>
			<p>预报课程</p>
			<el-table border>
				<el-table-column label="课程名称" prop=""></el-table-column>
				<el-table-column label="课时数" prop=""></el-table-column>
				<el-table-column label="课程费用" prop=""></el-table-column>
				<el-table-column label="优惠打折" prop=""></el-table-column>
				<el-table-column label="扣课时数" prop=""></el-table-column>
				<el-table-column label="实收费用" prop=""></el-table-column>
				<el-table-column label="操作">
					<el-button type="text">删除</el-button>
				</el-table-column>
			</el-table>
			<el-descriptions :model="addForm" class="margin-top" title="预报信息" :column="2" :size="size" border>
				<el-descriptions-item >
					<template #label>
						<i class="el-icon-user"></i>
						课程选择:
					</template>
					<div style="display: flex;width: 150px;"> 
					<el-select  v-model="addForm.sourceId" placeholder="请选择课类" style="width: 178px;">
						<el-option :label="item.sourceName" :value="item.sourceId" v-for="item in Source"></el-option>
					</el-select>
					<el-select v-model="addForm.sourceId" placeholder="请选择课程" style="width: 178px;">
						<el-option :label="item.sourceName" :value="item.sourceId" v-for="item in Source"></el-option>
					</el-select>
					</div>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						课时数:
					</template>
					<el-input v-model="register.consultant"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						费用:
					</template>
					<el-input v-model="register.phone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						优惠折扣:
					</template>
					<el-input v-model="addForm.parentname"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						扣课时数:
					</template>
					<el-input v-model="addForm.parentphone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						备注:
					</template>
					<el-input v-model="addForm.parentphone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<el-button>添加预报</el-button>
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions :model="addForm" class="margin-top"  :column="2" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						费用总额:
					</template>
					<el-input v-model="addForm.parentphone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						缴费方式:
					</template>
					<el-select v-model="addForm.sourceId" placeholder="请选择缴费方式" style="width: 178px;">
						<el-option label="item.sourceName" value="item.sourceId">全额缴费</el-option>
						<el-option label="item.sourceName" value="item.sourceId">预缴费</el-option>
					</el-select>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						课程顾问:
					</template>
					<!-- <el-input v-model="register.emp.empId"></el-input> -->
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						录入人:
					</template>
					<el-input v-model="addForm.studytime"></el-input>
				</el-descriptions-item>

			</el-descriptions>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible4 = false">关闭</el-button>
					<el-button type="primary" @click="Addstudent">确定添加</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 查看 -->
		<!-- 课程顾问：连接了咨询登记的编号 -->
		<el-dialog title="查看学员" v-model="dialogFormVisible3" width="80%">
			<el-descriptions :model="addForm" class="margin-top" title="带边框列表" :column="3" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						学号:
					</template>
					<el-input v-model="addForm.studentNumber"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						姓名:
					</template>
					<el-input v-model="addForm.studentName"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						移动电话:
					</template>
					<el-input v-model="addForm.studentPhone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						家长姓名:
					</template>
					<el-input v-model="addForm.parentname"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						家长手机:
					</template>
					<el-input v-model="addForm.parentphone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						课程顾问:
					</template>
					<!-- <el-input v-model="register.emp.empId"></el-input> -->
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						注册日期:
					</template>
					<el-input v-model="addForm.studytime"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						入学备注:
					</template>
					<el-input v-model="addForm.entrance"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
						:on-preview="handlePictureCardPreview" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-descriptions-item>

			</el-descriptions>
			<p>学员报班记录</p>
			<el-table :data="StudentStatus" border style="width: 100%">
				<el-table-column prop="studentstatusId" label="Id">
				</el-table-column>
				
				<el-table-column prop="classes.classesName" label="班级名称">
				<template v-slot="scope">
					<p v-if="scope.row.status==0">请选择班级</p>
					<!-- <p v-if="scope.row.status==1"></p> -->
				</template>
				</el-table-column>
				<el-table-column prop="signuptime" label="报班时间">
				</el-table-column>
				<el-table-column prop="course.courseName" label="报班课程">
				</el-table-column>
				<el-table-column prop="course.courseMoney" label="应收">
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template v-slot="scope">
						<p v-if="scope.row.status==0">待分班</p>
						<p v-if="scope.row.status==1">已分班</p>
						<p v-if="scope.row.status==2">已退学</p>
						<p v-if="scope.row.status==3">已停课</p>
					</template>
				</el-table-column>
				<el-table-column prop="beizhu" label="备注">
				</el-table-column>
				<el-table-column prop="tk" label="停课/复课">
					<template v-slot="scope">
						<p v-if="scope.row.status==3">
							<el-button type="text" @click="updatesuspendestate(scope.row)">复课</el-button>
						</p>
						<p v-if="scope.row.status!=3">
							<el-button type="text" @click="showsupend(scope.row)">停课</el-button>
						</p>
						
					</template>
					
				</el-table-column>
				<el-table-column prop="zb" label="转班">
					<el-button type="text">转班</el-button>
				</el-table-column>
				<el-table-column prop="zb" label="退学">
					<el-button type="text" @click="dialogFormVisible6=true">退学</el-button>
				</el-table-column>
				<el-table-column prop="cz" label="修改">
					<el-button type="text"><i class="el-icon-edit"></i></el-button>
				</el-table-column>
			</el-table>


		</el-dialog>
		<el-dialog v-model="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
		
		<!-- 停课 -->
		<el-dialog v-model="dialogFormVisible5">
			<el-descriptions :model="addForm" class="margin-top" title="学员停课" :column="1" :size="size" border >
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						班级编号:
					</template>
					<el-input v-model="addForm.classesId" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						班级名称:
					</template>
					<el-input v-model="Classes.classesName" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						上课时段:
					</template>
					<el-input v-model="register.phone" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						培训时间:
					</template>
					<el-input v-model="addForm.parentname" disabled></el-input>
				</el-descriptions-item>
				<!-- <el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						报班备注:
					</template>
					<el-input v-model="addForm.parentphone"></el-input>
				</el-descriptions-item> -->
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						停课理由:
					</template>
					<el-input v-model="addForm.suspendeReason"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<el-button @click="addsupende">停课登记</el-button>
					<el-button @click="dialogFormVisible5=false">返回</el-button>
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
	<!-- 退学 -->	
	<el-dialog title="查看学员退学信息" v-model="dialogFormVisible6">
		<el-descriptions :model="addForm" class="margin-top" title="查看学员退学信息" :column="1" :size="size" border >
			<el-descriptions-item >
				<template #label>
					<i class="el-icon-user"></i>
					学号:
				</template>
				<el-input v-model="register.consultant"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-mobile-phone"></i>
					退学学员:
				</template>
				<el-input v-model="register.consultant"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-location-outline"></i>
					班级编号:
				</template>
				<el-input v-model="register.phone"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-location-outline"></i>
					班级名称:
				</template>
				<el-input v-model="register.phone"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-tickets"></i>
					培训时间:
				</template>
				<el-input v-model="addForm.parentname"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-tickets"></i>
					实收学费:
				</template>
				<el-input v-model="addForm.parentname"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-office-building"></i>
					报班备注:
				</template>
				<el-input v-model="addForm.parentphone"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-office-building"></i>
					退学理由:
				</template>
				<el-input v-model="addForm.parentphone"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-tickets"></i>
					退还金额:
				</template>
				<el-input v-model="addForm.parentname"></el-input>元
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-tickets"></i>
					经办人:
				</template>
				<el-input v-model="addForm.parentname"></el-input>
			</el-descriptions-item>
			<el-descriptions-item>
				<el-button>确认退学</el-button>
				<el-button @click="dialogFormVisible6=false">返回</el-button>
			</el-descriptions-item>
		</el-descriptions>
	</el-dialog>
	</div>

</template>

<script>
	import qs from 'qs'
	export default {
		data() {
			return {
				// 学员状态表
				StudentStatus: [],
				//请求用户列表的参数
				pageInfo: {
					index:'',//下拉框选项
					value: '',//值
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				addForm: {
					studentId: '',
					sourceId: '', //课程编号
					studentName: '', 
					studentNumber: '',// 学号
					sex: '',
					studentPhone: '',
					parentname: '',
					parentphone: '',
					entrance: '',
					empName: '',
					empName2: '',
					address: '',
					studytime: '',
					deletename: '',
					classesId: '',
					classesName:'',
					registerId: '', //咨询编号
					suspendeReason:'',//停课理由
					courseId:''//课程
				},


				dialogFormVisible: false, //新增
				dialogFormVisible2: false, //修改
				dialogFormVisible3: false, //查看详情
				dialogFormVisible4: false, //补报
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
				},
				// 生源渠道表
				Source: [],
				register: [], //根据查询出咨询信息
				// 文件上次
				dialogImageUrl: '',
				dialogVisible: false,
				dialogFormVisible5:false,//停课
				dialogFormVisible6:false,//退学
				// 被复选框选中的值
				chektable: [],
				Classes: [], //班级表信息
				Stujiaojie: [],//学员交接
				Supende:[],//停课表
				Stutable:[]
			}
		},
		methods: {
			// 模糊查询
			selectName() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findName", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.Stutable = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},


			// 被复选框选中获取到的值
			handleSelectionChange(row) {
				console.log(row)
				this.chektable = row;
			},
			// 图片上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
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
			// 批量删除
			del() {
				const _this = this
				this.$confirm('确定要删除该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.chektable.length == 0) {
						_this.$message({
							showClose: true,
							message: '请选择删除内容!',
							type: 'error'
						});
					} else {
						var ids=_this.chektable.map(item =>item.studentId).join()
						// _this.chektable.forEach(item => {
						// 	console.log(item.studentId)
							_this.delstudent(ids, "cc")
						// });
						_this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}

				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消删除'
					});
				});
			},

			// 新增学员
			Addstudent() {
				
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/student", this.addForm)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/selectAllclass", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.Stutable = response.data.list
								_this.pageInfo.total = response.data.total
								console.log(response)

							}).catch(function(error) {
								console.log(error)
							})
						var student = response.data
						_this.Stutable.push(student)
						_this.dialogFormVisible = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//修改学员
			editstu(row) {
				console.log("修改学员："+row)
				this.addForm.sourceName = row.sourceName
				this.addForm.studentName = row.studentName
				this.addForm.sex = row.sex
				this.addForm.address = row.address
				this.addForm.studentPhone = row.studentPhone
				this.addForm.parentname = row.parentname
				this.addForm.parentphone = row.parentphone
				this.addForm.entrance = row.entrance
				this.addForm.empName = row.empName
				this.addForm.empName2 = row.empName2
				this.addForm.sourceId = row.sourceId
				this.addForm.studentId = row.studentId
				this.addForm.registerId=row.registerId
				this.dialogFormVisible2 = true
			},
			Updatestu() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/student", this.addForm)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/selectAllclass", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.Stutable = response.data.list
								_this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						console.log(response.data)
						
						_this.dialogFormVisible2 = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//删除
			delstudent(studentId, deletename) {
				this.addForm.studentId = studentId
				this.addForm.deletename = deletename
				console.log(this.addForm.studentId, this.addForm.deletename)
				const _this = this;
				this.axios.put("http://localhost:8089/threeproject/student/" + this.addForm.studentId + "/" + this.addForm
						.deletename)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/selectAllclass", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.Stutable = response.data.list
								_this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})

					}).catch(function(error) {
						console.log(error)
					})
			},
			//查看详细信息
			look(row) {
				this.addForm.sourceName = row.sourceName
				this.addForm.studentName = row.studentName
				this.addForm.sex = row.sex
				this.addForm.address = row.address
				this.addForm.studentPhone = row.studentPhone
				this.addForm.parentname = row.parentname
				this.addForm.parentphone = row.parentphone
				this.addForm.entrance = row.entrance
				this.addForm.sourceId = row.sourceId
				this.addForm.studentId = row.studentId
				this.addForm.studentNumber = row.studentNumber
				this.addForm.studytime = row.studytime
				this.addForm.classesId = row.classesId
				this.addForm.registerId = row.registerId
				this.register.phone = row.register.phone
				this.register.consultant = row.register.consultant
				this.findclassstuId(this.addForm.studentId )
				this.dialogFormVisible3 = true
			},
			findClassId(classesId) {
				console.log(classesId)
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findClassId/" + classesId)
					.then(function(response) {
						_this.Classes = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 根据学员编号查询学员记录和班级
			findclassstuId(studentId) {
				this.StudentStatus=[]
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findstudentId/" +  studentId)
					.then(function(response) {
						_this.StudentStatus.push(response.data) 
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			Addstudentstatus(studentId, classesId) {
				this.StudentStatus.studentId = studentId
				this.StudentStatus.classesId = classesId
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/addstudentstatus", this.StudentStatus)
					.then(function(response) {
						_this.StudentStatus = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//补报按钮
			bubao(row) {
				this.addForm.sourceName = row.sourceName
				this.addForm.studentName = row.studentName
				this.addForm.sex = row.sex
				this.addForm.address = row.address
				this.addForm.studentPhone = row.studentPhone
				this.addForm.parentname = row.parentname
				this.addForm.parentphone = row.parentphone
				this.addForm.entrance = row.entrance
				this.addForm.empName = row.empName
				this.addForm.empName2 = row.empName2
				this.addForm.sourceId = row.sourceId
				this.addForm.studentId = row.studentId
				this.addForm.classes = row.classes
				this.addForm.studentNumber = row.studentNumber
				this.addForm.studytime = row.studytime
				this.dialogFormVisible4 = true
			},
			// 分页
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/selectAllclass", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.Stutable = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/selectAllclass", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.Stutable = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			//新增学员交接表:从前端获取的咨询id
			shengpi() {
				const _this = this
				this.$confirm('确定要审核该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var registerId=_this.chektable.map(item =>item.registerId).join()
				this.axios.get("http://localhost:8089/threeproject/findregisterId/"+registerId)
					.then(function(response) {
						_this.Stujiaojie = response.data
						
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消删除'
					});
				});
				},
				// 停课新增
				showsupend(row){
					console.log("fff"+row)
					// this.addForm.classesName=row.classesName
					this.addForm.classesId=row.classesId
					this.addForm.courseId=row.courseId
					this.addForm.suspendeReason=row.suspendeReason
					console.log(this.addForm.studentName)
					
					this.findClassId(this.addForm.classesId)
					this.dialogFormVisible5=true
				},
				// 新增退学
				addsupende(){
					const _this=this
					this.axios.post("http://localhost:8089/threeproject/addsupende",this.addForm)
						.then(function(response) {
							var supendentity= response.data
							_this.Supende.push(supendentity)
							_this.dialogFormVisible5=false
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				},
				// 把学员状态改为1已分班
				updatesuspendestate(row){
					this.StudentStatus.studentId=row.studentId
					console.log("aaaaaaaaaaaa"+this.StudentStatus.studentId)
					const _this = this
					this.axios.put("http://localhost:8089/threeproject/updatesuspendestate/"+this.StudentStatus.studentId)
						.then(function(response) {
							// _this.StudentStatus=response.data
							_this.findclassstuId(_this.StudentStatus.studentId)
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
		},
		
		created() {
			// 显示所有学员信息
			const _this = this;
			this.axios.get("http://localhost:8089/threeproject/selectAllclass", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.Stutable = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findSource")
				.then(function(response) {
					_this.Source = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				// // 查询咨询登记
				this.axios.get("http://localhost:8089/threeproject/findAllRegister")
				.then(function(response) {
					_this.register = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
				// 在学员交接表查询咨询登记信息；招生审核和教务审核
				// this.axios.get("http://localhost:8089/threeproject/findallsou")
				// .then(function(response) {
				// 	_this.Stujiaojie = response.data
				// 	console.log(response)
				// }).catch(function(error) {
				// 	console.log(error)
				// })


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

	span {
		font-size: 12px;
		font-weight: 400;
	}
</style>
