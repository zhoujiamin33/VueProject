<template>
	<!-- 补报 -->
	<div class="mian">
		<div class="mainbody">
			<div style="margin-right: 320px;display: flex;">
				<span style="margin-top: 10px;width: 90px;font-size: 15px;">快速检索：</span>
				<el-select v-model="pageInfo.index" placeholder="请选择">
					<el-option label="课程名称" value="课程名称"></el-option>
					<el-option label="姓名" value="姓名"></el-option>
					<el-option label="学号" value="学号"></el-option>
				</el-select>

				<el-input placeholder="请输入内容" v-model="pageInfo.vlaue" style="width: 120px;" clearable
					@clear="serchVal">
				</el-input>
			</div>
			<div style="margin-left: 260px;">
				<el-button type="primary" @click="shwosu">查询</el-button>
				<el-button type="success" @click="tgsp()">通过审批</el-button>
				<el-button type="danger" @click="qxbb()">取消补报</el-button>
			</div>
		</div>

		<el-table :data="tableData" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="supplementaryId" label="Id">
			</el-table-column>
			
			<el-table-column prop="addtime" label="补报日期" align="center">
			</el-table-column>
			<el-table-column prop="student.studentName" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="supplementaryName" label="课程名称" align="center">
			</el-table-column>
			<el-table-column prop="course.courseMoney" label="课程费用" align="center">
			</el-table-column>
			<el-table-column prop="course.courseMoney" label="实际收费" align="center">
			</el-table-column>
			<el-table-column prop="无" label="扣课实数" align="center">无
			</el-table-column>
			<el-table-column prop="addname" label="课程顾问" align="center">
			</el-table-column>
			<el-table-column prop="addname" label="录入人" align="center">
			</el-table-column>
			<el-table-column prop="state" label="状态" align="center">
				<template v-slot="scope">
					<p v-if="scope.row.state==0"><i class=" el-icon-s-custom" style="font-size: 25px; "></i></p>
					<p v-if="scope.row.state==1"><i class=" el-icon-s-custom" style="font-size: 25px; color: red"></i></p>
				</template>

			</el-table-column>
			<el-table-column prop="index" label="操作">
				<template v-slot="scope">
					<p v-if="scope.row.state==0"></p>
					<p v-if="scope.row.state==1">
						<el-button type="text" @click="showclasses(scope.row)">请选择班级</el-button>
					</p>
				</template>
			</el-table-column>
		</el-table>

		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
		<!-- 选择班级 -->
		<el-dialog title="为学生选择班级" v-model="dialogFormVisible7">
			<el-descriptions :model="addForm" class="margin-top" title="为学生选择班级" :column="2" :size="size" border>
				<!-- <el-descriptions-item >
				<template #label>
					<i class="el-icon-user"></i>
					编号:
				</template>
				<el-input v-model="addForm.studentId"></el-input>
			</el-descriptions-item> -->
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						课程类别:
					</template>
					{{this.addForm.courseName}}

				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						班级名称:
					</template>
					{{this.addForm.classesName}}
					<!-- <el-select v-model="addForm.classesId" > -->
					<!-- <el-option v-for="i in Classes"  :label="i.classesName" :value="i.classesId" 
						></el-option> -->
					<!-- @click.native ="findClassId(i.classesId)" -->
					<!-- </el-select> -->


				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						班级编号:
					</template>
					{{this.addForm.classesId}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						班级名称:
					</template>
					{{this.addForm.classesName}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						所报人数:
					</template>

				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						教师:
					</template>
					<el-input v-model="addForm.empName"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						开始时间:
					</template>
					<el-input v-model="addForm.starteddate"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						结束时间:
					</template>
					<el-input v-model="addForm.enddate"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						备注:
					</template>
					<el-input v-model="addForm.dropReason"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<el-button @click="AddclassesId">保存</el-button>
					<el-button @click="dialogFormVisible7=false">关闭</el-button>
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
				select: "",
				//用户列表
				// {id:1,schoolName:"大河东",AddTime:"2020-02-03",StudentName:"小红",address:"地点",phone:"18985748576",State:"是"}
				tableData: [],
				//请求用户列表的参数
				pageInfo: {
					index:'',
					value: '',
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				addForm: {
					studentId: '',
					courseId: '',
					courseName: '',
					classesName: '',
					classesId: '',
					course: [],
					student: [],
					starteddate: '',
					enddate: '',
					teacherNmae: '',
					empName: '',
					supplementaryId: ''

				},
				supplementaryform: {
					supplementaryId: '',
					supplementaryName: '',
					payment: '', //缴费方式
					addname: '', //录入人
					courseId: '', //课程编号
					courseName: '', //课程名称
					courseMoney: '', //应收费用
					detailsupplementaryName: '',
					classhours: '',
					studentId: ''
				},
				dialogFormVisible7: false,
				// 被复选框选中的值
				chektable: [],
				Classes:[]

			}
		},
		methods: {
			// 被复选框选中获取到的值
			handleSelectionChange(row) {
				console.log(row)
				this.chektable = row;
			},
			tgsp() {
				const _this = this
				this.$confirm('确定要审批通过吗?', '提示', {
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
						var ids = _this.chektable.map(item => item.supplementaryId).join()
						_this.updatesupplementarystate(ids)
						_this.$message({
							type: 'success',
							message: '审批通过!'
						});
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消审批'
					});
				});
			},
			qxbb() {
				const _this = this
				this.$confirm('确定要取消该学员的补报吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.chektable.length == 0) {
						_this.$message({
							showClose: true,
							message: '请选择取消的内容!',
							type: 'error'
						});
					} else {
						var ids = _this.chektable.map(item => item.supplementaryId).join()
						_this.updatesupplementarystate0(ids)
						_this.$message({
							type: 'success',
							message: '取消补报成功!'
						});
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消补报'
					});
				});
			},
			//选择班级
			showclasses(row) {
				this.addForm.studentId = row.studentId
				this.addForm.supplementaryId = row.supplementaryId
				this.addForm.courseId = row.supplementaryId
				this.addForm.supplementaryName = row.supplementaryName
				this.findcourseId(this.addForm.courseId)
				this.dialogFormVisible7 = true
			},
			// 审核状态
			updatesupplementarystate(supplementaryId) {
				const _this = this
				console.log("---hhh" + this.$store.state.updateUserInfo.username)
				
				this.axios.delete("http://localhost:8089/threeproject/updatesupplementarystate" ,
				{
					params: {
						'supplementaryId':supplementaryId,
						'updatename':this.$store.state.updateUserInfo.username
					},
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.insertReportEntry(supplementaryId)
						_this.findsupplementary()
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			updatesupplementarystate0(supplementaryId) {
				console.log("---" + supplementaryId)
				const _this = this
				this.axios.delete("http://localhost:8089/threeproject/updatesupplementarystate0" ,
				{
					params: {
						'supplementaryId':supplementaryId,
						'deletename':this.$store.state.updateUserInfo.username
					},
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.findsupplementary()
					}).catch(function(error) {
						console.log(error)
					})
			},
			findcourseId(courseId) {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findcourseId" ,
				{
					params: {
						'courseId':courseId
					},
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.Classes = response.data
						_this.addForm.classesId = _this.Classes.classesId
						_this.addForm.classesName = _this.Classes.classesName
						_this.addForm.teacherNmae = _this.Classes.teacherId
						_this.addForm.empName = _this.Classes.emp.empName
						_this.addForm.starteddate = _this.Classes.starteddate
						_this.addForm.enddate = _this.Classes.enddate
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
				this.findsupplementary()
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.findsupplementary()
			},
			findsupplementary() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findsupplementary", {
						params: this.pageInfo,
			
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
			
					})
					.then(function(response) {
						_this.tableData = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//财务新增补报
			insertReportEntry(supplementaryId) {
				const _this = this
				this.supplementaryform.addname = this.$store.state.updateUserInfo.username
				this.supplementaryform.supplementaryId=supplementaryId
				this.axios.post("http://localhost:8089/threeproject/insertEntry", this.supplementaryform, {
					params:{
						'supplementaryId':this.supplementaryform.supplementaryId
					},
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						console.log(response)
						_this.supplementaryform = {}
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			const _this = this;
			this.findsupplementary(),
				// 查询所有班级
				this.axios.get("http://localhost:8089/threeproject/findAllClass",
				{
					
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
				.then(function(response) {
					_this.Classes = response.data
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

	span {
		font-size: 12px;
		font-weight: 400;
	}
</style>
