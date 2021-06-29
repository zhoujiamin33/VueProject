<template>
	<!-- 学员档案 -->
	<div class="mian">
		<div class="mainbody">
			<div style="margin-right: 320px;display: flex;">
				<span style="margin-top: 10px;width: 90px;font-size: 15px;">快速检索：</span>
				<el-select v-model="pageInfo.index" placeholder="请选择">
					<el-option label="姓名" value="Student_Name"></el-option>
					<el-option label="电话" value="Student_Phone"></el-option>
				</el-select>

				<el-input placeholder="请输入内容" v-model="pageInfo.value" style="width: 120px;" clearable
					@clear="serchVal">
				</el-input>
			</div>
			<div style="margin-left: 180px;">
				<el-button @click="selectName">查询</el-button>
				<el-button @click="shengpi">通过审批</el-button>
				<el-button @click="open">办理退卡</el-button>
				<el-button @click="del">删除</el-button>
			</div>
		</div>

		<el-table :data="Stutable" style="width: 100%" border @selection-change="handleSelectionChange"
			:header-cell-style="{background:'#eef1f6',color:'#606266'}">
			<el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column prop="studentId" label="Id" align="center">
			</el-table-column>

			<el-table-column prop="studytime" label="报名时间" align="center">
			</el-table-column>
			<el-table-column prop="studentName" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="address" label="联系地址" align="center">
			</el-table-column>
			<el-table-column prop="studentPhone" label="联系电话" align="center">
			</el-table-column>
			<el-table-column prop="studentState" label="状态" align="center">
				<template v-slot="scope">
					<p v-if="scope.row.studentState==0">
						<i class=" el-icon-s-custom" style="font-size: 25px; "></i>
					</p>
					<p v-if="scope.row.studentState==1"><i class=" el-icon-s-custom"
							style="font-size: 25px; color: red"></i></p>
				</template>
			</el-table-column>
			<el-table-column prop="source.sourceName" label="生源渠道" align="center">
			</el-table-column>

			<el-table-column prop="index" label="操作" fixed="right" align="center">
				<template #default="scope">
					<el-button type="text" @click="bubao(scope.row)">补报</el-button>
					<!-- <el-button type="text">拍照</el-button> -->
					<el-button type="text" @click="editstu(scope.row)">修改</el-button>
					<el-button type="text" @click="look(scope.row),findclassstuId(scope.row.studentId)">查看</el-button>
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
			<el-descriptions :model="addForm" class="margin-top" title="修改学员" :column="2" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						生源渠道:
					</template>
					<el-select v-model="addForm.sourceId" placeholder="请选择生源渠道" style="width: 178px;">
						<el-option :label="item.sourceName" :value="item.sourceId" v-for="item in Source"></el-option>
					</el-select>
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
						性别:
					</template>
					<el-radio v-model="addForm.sex" label="男">男</el-radio>
					<el-radio v-model="addForm.sex" label="女">女</el-radio>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						居住地址:
					</template>
					<el-input v-model="addForm.address"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						移动电话:
					</template>
					<el-input v-model="addForm.studentPhone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						家长姓名:
					</template>
					<el-input v-model="addForm.parentname"></el-input>

				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						移动电话:
					</template>
					<el-input v-model="addForm.parentphone"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						入学备注:
					</template>
					<el-input v-model="addForm.entrance"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						课程顾问:
					</template>
					<el-input v-model="addForm.empName"></el-input>
				</el-descriptions-item>
			</el-descriptions>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="Updatestu">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		<!--  补报-->
		<el-dialog title="课程预报" v-model="dialogFormVisible4" width="60%">
			<el-descriptions :column="4">
				<el-descriptions-item>
					<template #label>
						单号：
					</template>
					XS{{this.addForm.studytime}}{{this.addForm.studentNumber}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						学号：
					</template>
					{{this.addForm.studentNumber}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						姓名：
					</template>
					{{this.addForm.studentName}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						添加日期：
					</template>
					{{this.addForm.studytime}}
				</el-descriptions-item>
			</el-descriptions>
			<el-table border title="预报课程" :data="Supplementary">
				<el-table-column label="课程名称" prop="supplementaryName"></el-table-column>
				<el-table-column label="课时数" prop="classhours"></el-table-column>
				<el-table-column label="课程费用" prop="courseMoney"></el-table-column>
				<el-table-column label="优惠打折" prop="无折扣">无折扣</el-table-column>
				<el-table-column label="扣课时数" prop="0">0</el-table-column>
				<el-table-column label="实收费用" prop="courseMoney"></el-table-column>
				<el-table-column label="操作">
					<el-button type="text" @click="">删除</el-button>
				</el-table-column>
			</el-table>
			<el-descriptions :model="addForm" class="margin-top" title="预报信息" :column="2" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						课程选择:
					</template>
					<div style="display: flex;width: 150px;">
						<el-select v-model="addForm.classtypeId" placeholder="请选择课类" style="width: 178px;"
							@change="findclasstypeId">
							<el-option :label="item.classtypeName" :value="item.classtypeId" v-for="item in classType">
							</el-option>
						</el-select>
						<el-select v-model="addForm.courseId" placeholder="请选择课程" style="width: 178px;"
							@change="selectByCourseId">
							<el-option :label="i.courseName" :value="i.courseId" v-for="i in form.course">
							</el-option>
						</el-select>
					</div>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						课时数:
					</template>
					{{this.addForm.classhours}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						费用:
					</template>
					{{this.addForm.courseMoney}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						优惠折扣:
					</template>
					无优惠
					<!-- <el-input v-model="addForm.parentname"></el-input> -->
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						扣课时数:
					</template>
					0
					<!-- <el-input v-model="addForm.parentphone"></el-input> -->
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						备注:
					</template>
					<!-- <el-input v-model="addForm.parentphone"></el-input> -->
				</el-descriptions-item>
				<el-descriptions-item>
					<el-button @click="AddSupplementary">添加预报</el-button>
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions :model="supplementaryform" class="margin-top" :column="2" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						费用总额:
					</template>
					<el-input v-model="supplementaryform.courseMoney"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						缴费方式:
					</template>
					<el-select v-model="supplementaryform.payment" placeholder="请选择缴费方式" style="width: 178px;">
						<el-option label="全额缴费" value="1">全额缴费</el-option>
						<el-option label="预缴费" value="2">预缴费</el-option>
					</el-select>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						预交金额:
					</template>
					<el-input v-model="supplementaryform.feesAdvance" placeholder="请选择预交金额"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						实收金额:
					</template>
					<el-input v-model="supplementaryform.receipts" placeholder="请选择预交金额"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						课程顾问:
					</template>
					<el-input v-model="supplementaryform.addname"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						录入人:
					</template>
					<el-input v-model="supplementaryform.addname"></el-input>
				</el-descriptions-item>
			</el-descriptions>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible4 = false">关闭</el-button>
					<el-button type="primary" @click="okSupplementary">确定添加</el-button>
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
				<el-table-column type="index" width="50">
				</el-table-column>

				<el-table-column prop="classes.classesId" label="班级编号">
					<template v-slot="scope">
						<p v-if="scope.row.classes.classesId==null">
							<el-button type="text" @click="showclasses(scope.row)">请选择班级</el-button>
						</p>
						<p v-if="scope.row.classes.classesId!=null">
							{{scope.row.classes.classesId}}
						</p>
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
						<!-- 按停课按钮修改学员状态表状态并新增停课表中的一条记录；停课表中按审核通过按钮把未审核改为已审核并审核时间为当前时间、
						审核人当前的登录人 -->
						<!-- <p v-if="scope.row.status==4">停课审核中</p>
						<p v-if="scope.row.status==5">退学审核中</p> -->
					</template>
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
			
				<el-table-column prop="zb" label="退学">
					<template v-slot="scope">

						<el-button type="text" @click="showtuixue(scope.row)">退学</el-button>
					</template>

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
			<el-descriptions :model="addForm" class="margin-top" title="学员停课" :column="1" :size="size" border>
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
					<el-input v-model="addForm.classesName" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-location-outline"></i>
						上课时段:
					</template>
					<el-input v-model="addForm.whendetails" disabled></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						培训时间:
					</template>
					<el-input v-model="addForm.starteddate" disabled></el-input>
				</el-descriptions-item>
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
			<el-descriptions :model="addForm" class="margin-top" title="查看学员退学信息" :column="1" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						学号:
					</template>
					{{this.addForm.studentNumber}}
				
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						退学学员:
					</template>
					{{this.addForm.studentName}}
				
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
					{{this.Classes.classesName}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						培训时间:
					</template>
					{{this.addForm.starteddate}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						实收学费:
					</template>
					{{this.addForm.courseMoney}}
				</el-descriptions-item>
				
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						退学理由:
					</template>
					<el-input v-model="addForm.dropReason"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-tickets"></i>
						经办人:
					</template>
					<el-input v-model="addForm.dropHandler"></el-input>
				</el-descriptions-item>
				<el-descriptions-item>
					<el-button @click="tuixue">确认退学</el-button>
					<el-button @click="dialogFormVisible6=false">返回</el-button>
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>

		<!-- 复课表 -->
		<el-dialog v-model="dialogFormVisible8">
			<el-descriptions :model="addForm" class="margin-top" title="学员停课" :column="1" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						停课编号:
					</template>
					{{this.addForm.suspendeId}}

				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						学员名称:
					</template>
					{{this.addForm.studentName}}

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
						课程编号:
					</template>
					{{this.addForm.courseId}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						班级已上课时:
					</template>
					{{this.addForm.detailcourseName}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						缺课节数:
					</template>
					{{this.addForm.absent}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						复课意向:
					</template>

					<el-select v-model="addForm.intention">
						<el-option label="转班" value="0">转班</el-option>
						<el-option label="跟班" value="1">跟班</el-option>
					</el-select>
				</el-descriptions-item>
				<el-descriptions-item>
					<el-button @click="addback">确定</el-button>
					<el-button @click="dialogFormVisible8=false">返回</el-button>
				</el-descriptions-item>
			</el-descriptions>
		</el-dialog>

		<!-- 选择班级 -->
		<el-dialog title="为学生选择班级" v-model="dialogFormVisible7">
			<el-descriptions :model="addForm" class="margin-top" title="为学生选择班级" :column="2" :size="size" border>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-user"></i>
						课程名称:
					</template>
					{{this.addForm.courseName}}

				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-mobile-phone"></i>
						班级名称:
					</template>
					<el-select v-model="addForm.classesId" @change="selectclassesId">
						<el-option v-for="item in form.classes" :label="item.classesName" :key="item.classesId"
							:value="item.classesId"></el-option>
					</el-select>
					<!-- {{this.addForm.classesName}} -->
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
					{{this.addForm.empName}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						开始时间:
					</template>
					{{this.addForm.starteddate}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template #label>
						<i class="el-icon-office-building"></i>
						结束时间:
					</template>
					{{this.addForm.enddate}}
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
				// 学员状态表
				StudentStatus: [],
				id: 0,
				//请求用户列表的参数
				pageInfo: {
					index: '', //下拉框选项
					value: '', //值
					currentPage: 1,
					pagesize: 3,
					total: 0,
				},
				addForm: {
					studentstatusId: '', //状态编号
					studentId: '',
					sourceId: '', //生源渠道编号
					studentName: '',
					studentNumber: '', // 学号
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
					whendetails:'',//已上课时
					classesName: '', //班级名称
					registerId: '', //咨询编号
					suspendeReason: '', //停课理由
					courseId: '', //课程编号
					courseName: '', //课程名称
					dropReason: '', //退学理由
					dropHandler: '', //退学办理人
					courseMoney: '', //应收费用
					starteddate: '', //开始时间
					enddate: '', //结束时间
					classtypeName: '', //课程名称
					classtypeId: '', //课程编号
					teacherId: '', //教师
					status: '', //学员状态表的状态
					classhours: '', //课时数
					//退费管理的新增人
					addname: '',
					suspendeId: '', //停课编号
					intention: '', //复课意向
					classalreadyon: '', //已上课时
					absent: '', //缺课时
					detailcourseName: '', //详细课程名称
					detailcourseId: '', //详细课程编号
					dropId:''//退学编号
				},
				// 复课表
				Backform: {
					studentstatusId: '', //学员状态id
					studentId: '',
					classesId: '',
					suspendeId: '', //停课编号
					intention: '', //复课意向
					classalreadyon: '', //已上课时
					absent: '', //缺课时
					detailcourseId: '', //详细课程编号
					courseId: '' //课程id
				},
				//财务复课退费表单
				Backform2: {
					backId:"",
					studentId: '',
					classesId: '',
					suspendeId: '', //停课编号
					detailcourseId: '', //详细课程编号
					courseId: '' ,//课程id
					addname:""
				},
				// 退学
				Droportform:{
					studentstatusId: '', //学员状态id
					studentId: '',
					classesId: '',
					dropReason: '', //退学理由
					dropHandler: '', //退学办理人
					detailcourseId: '', //详细课程编号
					courseId: '' //课程id
				},
				form: {
					course: [],
					classes: [],
					emp: []
				},
				Course: [], //课程

				dialogFormVisible: false, //新增
				dialogFormVisible2: false, //修改
				dialogFormVisible3: false, //查看详情
				dialogFormVisible4: false, //补报
				dialogFormVisible7: false, //选择班级
				dialogFormVisible8: false, //复课
				// 生源渠道表
				Source: [],
				register: [], //根据查询出咨询信息
				// 文件上次
				dialogImageUrl: '',
				dialogVisible: false,
				dialogFormVisible5: false, //停课
				dialogFormVisible6: false, //退学
				// 被复选框选中的值
				chektable: [],
				Classes: [], //班级表信息
				Stustate: [], //修改学员交接并新增学员状态表
				Supende: [], //停课表
				Droport: [], //退学表
				Stutable: [], //学员表
				classType: [], //课类表
				Supplementary: [], //预报总表
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
					studentId: '',
					feesAdvance:0,
					receipts:""
				},
				//财务补报
				reportForm:{
					courseMoney:"",
					feesType:"",
					feesAdvance:"",
					addname:"",
					receipts:""
				}
			}

		},
		methods: {
			// 新增学员复课
			addback() {
				this.Backform.studentId = this.addForm.studentId
				this.Backform.classesId = this.addForm.classesId
				this.Backform.detailcourseId = this.addForm.detailcourseId
				this.Backform.suspendeId = this.addForm.suspendeId
				this.Backform.intention = this.addForm.intention
				this.Backform.absent = this.addForm.absent
				this.Backform.courseId = this.addForm.courseId
				this.Backform.studentstatusId=this.addForm.studentstatusId
				console.log("vv"+this.Backform.studentstatusId)
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/Addback?studentstatusId=" +this.Backform.studentstatusId,this.Backform,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log("------------停课开始")
						_this.findclassstuId(_this.Backform.studentId)
						if(_this.Backform.intention==1){
							_this.insertBackRefund(response.data.backId)
						}
					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible8 = false
			},
			//财务新增复课退费
			insertBackRefund(backId){
				const _this = this
				this.Backform2.backId=backId
				console.log(this.Backform2.backId+"qwqw")
				this.Backform2.studentId = this.Backform.studentId
				this.Backform2.classesId = this.Backform.classesId
				this.Backform2.detailcourseId = this.Backform.detailcourseId
				this.Backform2.suspendeId = this.Backform.suspendeId
				this.Backform2.courseId = this.Backform.courseId
				this.Backform2.addname=this.$store.state.updateUserInfo.username
				this.axios.post("http://localhost:8089/threeproject/insertRefund", this.Backform2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 获取课类的编号
			findclasstypeId(classtypeId) {
				console.log("kkk" + classtypeId)
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findclasstypeId?classtypeId=" + classtypeId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.Course = response.data
						_this.form.course = _this.Course
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectByCourseId(courseId) {
				const _this = this
				// 课程表里
				this.axios.get("http://localhost:8089/threeproject/selectByCourseId?courseId=" + courseId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log("-----------课程")
						_this.Course = response.data
						_this.addForm.classhours = _this.Course.classhours
						_this.addForm.courseMoney = _this.Course.courseMoney
						console.log(_this.addForm.courseMoney)
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 新增预报
			AddSupplementary() {
				this.supplementaryform.classhours = this.Course.classhours
				this.supplementaryform.courseId = this.Course.courseId
				this.supplementaryform.courseMoney = this.Course.courseMoney
				this.supplementaryform.supplementaryName = this.Course.courseName
				this.supplementaryform.detailsupplementaryName = this.Course.courseName
				this.supplementaryform.studentId = this.addForm.studentId
				this.Supplementary.push(this.supplementaryform)
			},
			// 确定补报
			okSupplementary() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddSupplementary", this.supplementaryform,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log("------------开始补报")
						_this.insertReportEntry()
						_this.AddDetailsupplementary(response.data.supplementaryId)
						_this.dialogFormVisible4 = false
						// _this.findsupplementary()
						
					}).catch(function(error) {
						console.log(error)
					})
			},
			//财务新增补报
			insertReportEntry(){
				const _this=this
				this.reportForm.courseMoney=this.supplementaryform.courseMoney
				this.reportForm.feesType=this.supplementaryform.payment
				this.reportForm.feesAdvance=this.supplementaryform.feesAdvance
				this.reportForm.addname=this.$store.state.updateUserInfo.username
				this.axios.post("http://localhost:8089/threeproject/insertEntry",this.reportForm,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.reportForm={}
				}).catch(function(error){
					console.log(error)
				})
			},
			AddDetailsupplementary(supplementaryId) {
				this.supplementaryform.supplementaryId = supplementaryId
				console.log("this.supplementaryform.supplementaryId" + this.supplementaryform.supplementaryId)
				console.log("this.supplementaryform.supplementaryId" + this.supplementaryform.detailsupplementaryName)
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddDetailsupplementary", this.supplementaryform,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.Supplementary = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 查询补报课程
			findsupplementary() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findsupplementary", {
						params: this.pageInfo,
						
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						
					},
					)
					.then(function(response) {
						_this.Supplementary = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 模糊查询
			selectName() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findName", {
						params: this.pageInfo,
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						
					},
					)
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
						
						var ids = _this.chektable.map(item => item.studentId).join()
						console.log("+++++++++++++++"+ids)
						// _this.chektable.forEach(item => {
						// 	console.log(item.studentId)
						_this.delstudent(ids)
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

			//修改学员
			editstu(row) {
				console.log("修改学员：" + row)
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
				this.addForm.registerId = row.registerId
				this.dialogFormVisible2 = true
			},
			Updatestu() {
				console.log("------------"+this.addForm.studentName)
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/updatestudent",this.addForm,
				{
					
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.selectName()
						console.log(response.data)

						_this.dialogFormVisible2 = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//删除
			delstudent(studentId) {
				console.log("-----------"+studentId)
				this.addForm.studentId = studentId
				this.addForm.deletename ="哈哈"
				this.addForm.deletename =this.$store.state.updateUserInfo.username
				console.log(this.addForm.studentId, this.addForm.deletename)
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/delstudent" ,
				{
					params:{
						'studentId':this.addForm.studentId,
						'deletename': this.addForm.deletename
						},
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log("==============开始删除")
						_this.selectName()

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
				console.log("学号："+this.addForm.studentNumber)
				this.addForm.studytime = row.studytime
				this.addForm.registerId = row.registerId
				this.addForm.classesId = row.classesId
				this.dialogFormVisible3 = true
			},
			findClassId(classesId) {
				console.log("班级表编号" + classesId)
				const _this = this
				// 学员表中
				this.axios.get("http://localhost:8089/threeproject/findClassId?classesId=" + classesId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.Classes = response.data
						// _this.StudentStatus.classes=_this.Classes
						_this.addForm.classesId = _this.Classes.classesId
						_this.addForm.classesName = _this.Classes.classesName
						_this.addForm.detailcourseId = _this.Classes.detailcourseId
						// _this.addForm.detailcourseName = _this.Classes.detailcourse.detailcourseName
						_this.addForm.whendetails=_this.Classes.whendetails
						console.log("班级名称1：" + _this.addForm.detailcourseName)
						_this.addForm.starteddate = _this.Classes.starteddate
						_this.addForm.enddate = _this.Classes.enddate
						// _this.addForm.empName=response.data.emp.empName
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// // 根据学员编号查询班级编号与姓名
			// findstuclass(studentId) {
			// 	const _this = this
			// 	this.axios.get("http://localhost:8089/threeproject/findstuclass/" + studentId)
			// 		.then(function(response) {
			// 			_this.StudentStatus = response.data
			// 			console.log(response)
			// 		}).catch(function(error) {
			// 			console.log(error)
			// 		})
			// },
			// 根据学员编号查询学员记录和班级:在学员状态表中
			findclassstuId(studentId) {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findstuclass?studentId=" + studentId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.StudentStatus = response.data
						
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},

			// Addstudentstatus(studentId, classesId) {
			// 	this.StudentStatus.studentId = studentId
			// 	this.StudentStatus.classesId = classesId
			// 	const _this = this
			// 	this.axios.post("http://localhost:8089/threeproject/addstudentstatus", this.StudentStatus)
			// 		.then(function(response) {
			// 			_this.StudentStatus = response.data
			// 			console.log(response)
			// 		}).catch(function(error) {
			// 			console.log(error)
			// 		})
			// },
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
				this.selectName()
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.selectName()
			},
			//审核学员并修改学员交接表中的教务审核状态和时间和人
			shengpi() {
				const _this = this
				this.$confirm('确定要审核该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.chektable.length == 0) {
						_this.$message({
							showClose: true,
							message: '请选择学员!',
							type: 'error'
						});
					} else {
						var studentId = _this.chektable.map(item => item.studentId).join()
						this.axios.get("http://localhost:8089/threeproject/findstudentId?studentId=" + studentId,
						{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
							.then(function(response) {
								_this.Stustate = response.data
								_this.selectName()
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})


					}

				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消删除'
					});
				});
			},

			// 停课新增
			showsupend(row) {
				this.addForm.classesId =row.classesId
				const _this = this
				this.$confirm('您确定要对该学员进行停/复课操作吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.addForm.classesId == null) {
						_this.$message({
							showClose: true,
							message: '请选择班级!',
							type: 'error'
						});
					} else if (_this.addForm.status == 2) {
						_this.$message({
							showClose: true,
							message: '该学员已退学!',
							type: 'error'
						});
					}else {
						console.log("fff" + row)
						_this.addForm.studentstatusId = row.studentstatusId
						_this.addForm.classesId = row.classesId
						_this.addForm.courseId = row.courseId
						_this.addForm.suspendeReason = row.suspendeReason
						console.log("dkf"+_this.addForm.classesId)
						_this.selectclassesId(_this.addForm.classesId)//根据班级id查询所以外键的
						_this.dialogFormVisible5 = true
					}
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消停/复课操作'
					});
				});
			},
			// 新增停课
			addsupende() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/addsupende?studentstatusId=" + this.addForm.studentstatusId, this
						.addForm,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						var supendentity = response.data
						_this.Supende = supendentity
						_this.dialogFormVisible5 = false
						_this.findclassstuId(_this.addForm.studentId)
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			// 把学员状态改为1已分班:弹出复课界面，对学员状态表进行修改
			updatesuspendestate(row) {
				if (row.classesId == null) {
					this.$message({
						showClose: true,
						message: '请选择班级!',
						type: 'error'
					});
				} else {
					this.addForm.classesId = row.classesId
					this.addForm.classesName = row.classesName
					this.addForm.courseId = row.courseId
					this.addForm.studentstatusId = row.studentstatusId
					this.addForm.suspendeId = row.suspendeId
					this.addForm.studentstatusId = row.studentstatusId
					this.addForm.absent = 2
					this.findClassId(this.addForm.classesId)
					this.dialogFormVisible8 = true
				}
				
			},
			// findstudentstatusId(studentstatusId) {
				
			// 	this.addForm.studentstatusId=studentstatusId
			// 	console.log("l"+this.addForm.studentstatusId)
			// 	const _this = this
			// 	this.axios.get("http://localhost:8089/threeproject/findstudentstatusId" ,{params:this.addForm} )
			// 		.then(function(response) {
			// 			_this.StudentStatus = response.data
			// 			console.log(response)
			// 		}).catch(function(error) {
			// 			console.log(error)
			// 		})
			// },
			//退学：学员状态表中的状态改为5（退学审核中）；并新增一条退学表（根据学员编号新增）
			showtuixue(row) {
				const _this = this
				this.$confirm('您确定要对该学员进行退学操作吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (row.classesId == null) {
						_this.$message({
							showClose: true,
							message: '请选择班级!',
							type: 'error'
						});
					} else if (row.status == 3) {
						_this.$message({
							showClose: true,
							message: '该学生已停课!',
							type: 'error'
						});
					} else if (row.status == 2) {
						_this.$message({
							showClose: true,
							message: '该学生已退学完!',
							type: 'error'
						});
					} else {
						console.log("fff" + row)
						_this.addForm.classesId = row.classesId
						_this.addForm.classesName = row.classesName
						_this.addForm.courseId = row.courseId
						_this.addForm.suspendeReason = row.suspendeReason
						_this.addForm.courseMoney = row.course.courseMoney
						_this.addForm.studentstatusId=row.studentstatusId
						console.log("classes"+_this.addForm.classesId)
						_this.findClassId(_this.addForm.classesId)
						_this.dialogFormVisible6 = true
					}
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消退学操作'
					});
				});
			},
			tuixue() {
				this.Droportform.studentId=this.addForm.studentId
				this.Droportform.studentstatusId=this.addForm.studentstatusId
				this.Droportform.classesId=this.addForm.classesId
				this.Droportform.dropHandler=this.addForm.dropHandler
				this.Droportform.dropReason=this.addForm.dropReason
				this.Droportform.detailcourseId=this.addForm.detailcourseId
				this.Droportform.courseId=this.addForm.courseId
				console.log("fghjk"+this.Droportform.dropReason)
				
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/Adddropout?studentstatusId="+this.Droportform.studentstatusId,this.Droportform,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log("45678345678开始退学")
						_this.findclassstuId(_this.Droportform.studentId)
						_this.Refund(response.data.dropId)
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
					
					this.dialogFormVisible6 = false
			},
			// 根据学员状态来修改状态
			updatestudentstatusId(studentstatusId,studentId){
				const _this=this
				this.axios.put("http://localhost:8089/threeproject/updatetuixue?studentstatusId=" +studentstatusId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.StudentStatus=response.data
						
						
						_this.findclassstuId(studentId)
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//财务部（退学、退费）
			Refund(dropId) {
				const _this = this
				this.addForm.addname = this.$store.state.updateUserInfo.username
				this.addForm.dropId = dropId
				console.log(this.addForm.studentId + "abc12")
				console.log(this.addForm.dropId + "abc")
				console.log(this.addForm.courseId + "abc")
				this.axios.post("http://localhost:8089/threeproject/insertRefund", this.addForm,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},

			//选择班级
			showclasses(row) {
				if (row.status == 2) {
					this.$message({
						showClose: true,
						message: '该同学已退学!',
						type: 'error'
					});
				} else {
					this.addForm.studentstatusId = row.studentstatusId
					this.addForm.studentId = row.studentId
					this.addForm.courseId = row.course.courseId
					this.addForm.courseName = row.course.courseName
					this.findcourseId(this.addForm.courseId)
					this.dialogFormVisible7 = true
				}

			},
			findcourseId(courseId) {
				console.log("课程编号：" + courseId)
				const _this = this
				// 学员状态表
				this.axios.get("http://localhost:8089/threeproject/findcourseId?courseId=" + courseId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.Classes = response.data
						_this.form.classes = _this.Classes
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectclassesId(classesId) {
				const _this = this
				// 班级表
				this.axios.get("http://localhost:8089/threeproject/selectById?classesId=" + classesId,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.Classes = response.data
						// _this.form.classes=_this.Classes
						// _this.form.classes.classesId = _this.Classes.classesId
						 // console.log("班级名称1：" + _this.Classes.emp)
						_this.addForm.classesName = _this.Classes.classesName
						_this.addForm.teacherId = _this.Classes.teacherId
						_this.addForm.teacherName = _this.Classes.emp.teacherName
						_this.addForm.empName = _this.Classes.emp.empName
						_this.addForm.starteddate = _this.Classes.starteddate
						_this.addForm.enddate = _this.Classes.enddate
						_this.addForm.detailcourseId = _this.Classes.detailcourseId
						 _this.addForm.detailcourseName = _this.Classes.detailcourse.detailcourseName
						 _this.addForm.whendetails=_this.Classes.whendetails
						
						console.log("kk" + _this.addForm.classesName + _this.addForm.starteddate)
						// console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			//保存选择的班级：获取状态表的id修改班级和学员 
			AddclassesId() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/addclassesId", this.addForm,
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						var Date1= response.data
				_this.findclassstuId(_this.addForm.studentId)
				// _this.findstudentstatusId(Data1.studentstatusId)
						_this.dialogFormVisible7 = false

						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}

		},

		created() {
			const _this = this
			this.selectName(),
				this.axios.get("http://localhost:8089/threeproject/findSource",{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
				.then(function(response) {
					_this.Source = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				// // 查询咨询登记
				this.axios.get("http://localhost:8089/threeproject/findAllRegister",
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.register = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				// 查询所有班级
				this.axios.get("http://localhost:8089/threeproject/findAllClass",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.Classes = response.data
					// console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),

				// 课类
				this.axios.get("http://localhost:8089/threeproject/findcoursetype",
				{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					console.log("----------------开始查询课类")
					_this.classType = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})

			// 课程
			// this.axios.get("http://localhost:8089/threeproject/findcourse", {
			// 	params: this.pageInfo
			// })
			// .then(function(response) {
			// 	_this.Course = response.data.list
			// 	_this.pageInfo.total = response.data.total
			// 	console.log(response)
			// }).catch(function(error) {
			// 	console.log(error)
			// })
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
