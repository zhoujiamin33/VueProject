<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk" style="margin-bottom: 20px;">
				<b>快速索引：</b>
				<el-select filterable v-model="pageInfo.value" placeholder="请选择">
					<el-option label="咨询人" value="咨询人"></el-option>
					<el-option label="电话号码" value="电话号码"></el-option>
					<el-option label="接待人" value="接待人"></el-option>
				</el-select>
				<el-input style="width: 120px;" placeholder="请输入内容" v-model="pageInfo.input" clearable>
				</el-input>
				

			</div>

			<div style="">
				<el-button @click="selectRegisterlivery()">查询</el-button>

				<el-button @click="dialogFormVisible = true">新增</el-button>
				<el-button @click="shengpi">审批</el-button>

				<el-button @click="delRegister">删除</el-button>
				<div>
					<el-dialog :required="true" title="新增咨询登记信息" v-model="dialogFormVisible" :before-close="cls">

						<el-form :inline="true" :model="form" ref="ruleForm" class="demo-ruleForm">

							<div style="display: flex; justify-content: space-between;">

								<el-form-item label="咨询方式 :" prop="zxfs">
									<el-select v-model="form.consultationmode" placeholder="请选择咨询方式">
										<el-option label="上门咨询" value="上门咨询"></el-option>
										<el-option label="电话咨询" value="电话咨询"></el-option>
										<el-option label="网络咨询" value="网络咨询"></el-option>
									</el-select>
								</el-form-item>
							</div>

							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="咨询人 :" prop="zxr">
									<el-input v-model="form.consultant" style="width:150px"></el-input>
								</el-form-item>
								<el-form-item label="信息渠道 :" prop="xxqd">

									<el-select v-model="form.sourceId" placeholder="请选择信息渠道">
										<el-option v-for="item in SourceDate" :label="item.sourceName"
											:value="item.sourceId"></el-option>
									</el-select>


								</el-form-item>

							</div>



							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="性别 :" prop="sex">
									<el-radio-group v-model="form.sex">
										<el-radio label="男"></el-radio>
										<el-radio label="女"></el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="联系电话 :" prop="lxdh">
									<el-input v-model="form.phone"></el-input>
								</el-form-item>
							</div>
							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="咨询内容 :" prop="zxnr">
									<el-input type="textarea" v-model="form.consultcontent"></el-input>
								</el-form-item>
								<el-form-item label="咨询课程 :" prop="zxkc">
									<el-select v-model="form.courseId" placeholder="请选择课程">
										<el-option v-for="item in CourseDate" :label="item.courseName"
											:value="item.courseId"></el-option>
									</el-select>
								</el-form-item>


							</div>
							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="咨询意向 :" prop="zxnr">
									<el-select v-model="form.attentstate" placeholder="请选择意向" style="width: 200px;">
										<el-option label="有意向" value="0"></el-option>
										<el-option label="无意向" value="1"></el-option>
										<el-option label="已就读" value="2"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="接待人 :" prop="name">
									<el-select v-model="form.empId">
										<el-option v-for="item in EmpData" :key="item.empId" :label="item.empName"
											:value="item.empId"></el-option>
									</el-select>
									<!-- <el-input v-model="form.addname" style="width:150px;"></el-input> -->
								</el-form-item>
							</div>


						</el-form>

						<template #footer>
							<span class="dialog-footer">
								<el-button type="primary" @click="addConsultation">新建并保存</el-button>
								<el-button @click="dialogFormVisible = false">取 消</el-button>
							</span>
						</template>
					</el-dialog>
				</div>
			</div>
		</div>

		<div>
			<el-table ref="multipleTable" :data="ConsultationDate" tooltip-effect="dark"
				style="width: 100%;margin-left: ;" @selection-change="handleSelectionChange" :before-close="cls">
				<el-table-column type="selection" width="45">
				</el-table-column>
				<el-table-column prop="registerId" label="Id" width="50">
				</el-table-column>
				<el-table-column prop="planreturnvisit" label="咨询日期" width="110">
				</el-table-column>
				<el-table-column prop="consultant" label="咨询人" width="90px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="sex" label="性別" width="50px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="consultcontent" label="咨询内容" width="170px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="phone" label="联系电话" show-overflow-tooltip width="110px">
				</el-table-column>
				<el-table-column prop="course.courseName" label="咨询课程" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="source.sourceName" label="生源渠道" show-overflow-tooltip width="110px">
				</el-table-column>
				<el-table-column prop="paystate" label="缴费状态" show-overflow-tooltip>
					<template v-slot="scope1">
						<p v-if="scope1.row.paystate==0">未缴费</p>
						<p v-if="scope1.row.paystate==2">已缴费</p>
					</template>
				</el-table-column>
				<el-table-column prop="emp.empName" label="接待人" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="attentstate" label="状态" width="70px" show-overflow-tooltip>
					<template v-slot="scope">
						<p v-if="scope.row.attentstate==0">有意向</p>
						<p v-if="scope.row.attentstate==1">无意向</p>
						<p v-if="scope.row.attentstate==2">已就读</p>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="130">
					<template #default="scope">
						<el-button type="text" @click="shengpi">审批</el-button>
						<el-button type="text" @click="showEdit(scope.row)">修改</el-button>
						<el-button type="text" @click="showEdit2(scope.row)">回访</el-button>
					</template>

				</el-table-column>
			</el-table>

			<!-- 修改 -->
			<div>
				<el-dialog v-model="dialogFormVisible2" title="修改咨询登记信息" :before-close="cls">
					<el-form :inline="true" :model="form" ref="ruleForm" class="demo-ruleForm">
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="咨询人 :" prop="zxr">
								<el-input v-model="form.consultant" style="width:150px"></el-input>
							</el-form-item>
							<el-form-item label="咨询方式 :" prop="zxfs">
								<el-select v-model="form.consultationmode" placeholder="请选择咨询方式">
									<el-option label="上门咨询" value="上门咨询"></el-option>
									<el-option label="电话咨询" value="电话咨询"></el-option>
									<el-option label="网络咨询" value="网络咨询"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">
							
							<el-form-item label="联系电话 :" prop="lxdh">
								<el-input v-model="form.phone" style="width:150px"></el-input>
							</el-form-item>
							<el-form-item label="信息渠道 :" prop="xxqd">
								<el-select v-model="form.sourceId" placeholder="请选择信息渠道">
									<el-option v-for="item in SourceDate" :label="item.sourceName"
										:value="item.sourceId"></el-option>
								</el-select>
							</el-form-item>

						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="性别 :" prop="sex">
								<el-radio-group v-model="form.sex">
									<el-radio label="男"></el-radio>
									<el-radio label="女"></el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="咨询意向 :" prop="zxnr">
								<el-select v-model="form.attentstate" placeholder="请选择意向">
									<el-option label="有意向" :value="0"></el-option>
									<el-option label="无意向" :value="1"></el-option>
									<el-option label="已就业" :value="2"></el-option>
								</el-select>
							</el-form-item>

						</div>
						<div style="display: flex; justify-content: space-between;">
							
							<el-form-item label="咨询内容 :" prop="zxnr">
								<el-input type="textarea" v-model="form.consultcontent"></el-input>
							</el-form-item>
							<el-form-item label="咨询课程 :" prop="zxkc">
								<el-select v-model="form.courseId" placeholder="请选择课程">
									<el-option v-for="item in CourseDate" :key="item.courseId" :label="item.courseName"
										:value="item.courseId"></el-option>
								</el-select>
							</el-form-item>


						</div>
						<div style="display: flex; justify-content: space-between;">
							
						</div>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="updateRegister()">保存</el-button>
							<el-button>取 消</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
			<!-- //回访 -->
			<el-dialog title="客户回访信息" :data="ConsultationDate" v-model="dialogFormVisible3" :before-close="cls">

				<el-form :inline="true" :model="form" class="demo-ruleForm">

					<div style="display: flex; justify-content: space-between;">
						<el-form-item label="接待人 :" prop="receptionist">
							<el-input disabled v-model="form.addname" style="width:220px"></el-input>
						</el-form-item>
						<el-form-item label="咨询日期 :" prop="handovertime">
							<el-input disabled v-model="form.planreturnvisit" style="width:220px"></el-input>
						</el-form-item>
					</div>
					<div style="display: flex; justify-content: space-between;">
						<el-form-item label="咨询人 :" prop="receptionist">
							<el-input disabled v-model="form.consultant" style="width:220px"></el-input>
						</el-form-item>
						<el-form-item label="性别 :" prop="handovertime">
							<el-input disabled v-model="form.sex" style="width:220px"></el-input>
						</el-form-item>
					</div>
					<div style="display: flex; justify-content: space-between;">
						<el-form-item label="咨询课程 :" prop="zxkc">
							<el-select disabled v-model="form.courseId" placeholder="请选择课程">
								<el-option v-for="item in CourseDate" :key="item.courseId" :label="item.courseName"
									:value="item.courseId"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="联系电话 :" prop="receptionist">
							<el-input disabled v-model="form.phone" style="width:220px"></el-input>
						</el-form-item>

					</div>
					<div style="display: flex; justify-content: space-between;">
						<el-form-item label="信息渠道 :" prop="xxqd">
							<el-select disabled v-model="form.sourceId" placeholder="请选择信息渠道">
								<el-option v-for="item in SourceDate" :label="item.sourceName" :value="item.sourceId">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="咨询方式 :" prop="handovertime">
							<el-input disabled v-model="form.consultationmode" style="width:220px"></el-input>
						</el-form-item>
					</div>
					<div style="display: flex; justify-content: space-between;">
						
						<el-form-item label="咨询内容 :" prop="handovertime">
							<el-input disabled v-model="form.consultcontent" style="width:220px"></el-input>
						</el-form-item>
					</div>

					<div style="text-align: center;"><b style="font-size: 17px;">回访列表</b></div>
					<el-button @click="delReturnvisit" style="margin-left: 600px;">删除</el-button>
					<div>

						<el-form :inline="true" :model="retform" class="demo-ruleForm">
							<el-table :data="ReturnvisitDate" stripe style="width: 100%"
								@selection-change="handleSelectionChange2" @filter-change="filterChange">
								<el-table-column type="selection" width="45">
								</el-table-column>
								<el-table-column prop="returnvisitId" label="ID" width="80px">
								</el-table-column>
								<el-table-column prop="returnvisitdate" label="回访日期" width="130px">
								</el-table-column>
								<el-table-column prop="returnvisitmode" label="回访方式" width="130px">
								</el-table-column>
								<el-table-column prop="returnvisitback" label="回访内容" width="">
								</el-table-column>
								<el-table-column prop="empId" label="回访人" width="90px">
								</el-table-column>

							</el-table>
						</el-form>

					</div>

					<div style="display: flex; justify-content: space-between; margin-top: 40px;">
						<el-form-item label="回访方式 :" prop="sex">
							<el-radio-group v-model="retform.returnvisitmode">
								<el-radio label="微信QQ回访"></el-radio>
								<el-radio label="电话回访"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="回复内容 :" prop="replycontent">
							<el-input v-model="retform.returnvisitback" style="width: 200px;"></el-input>
						</el-form-item>
					</div>


				</el-form>

				<template #footer>
					<span class="dialog-footer">
						<el-button type="primary" @click="addReturnvisit">保存</el-button>
						<el-button @click="modify = false">取 消</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
		<div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize"
				layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>

</template>

<script>
	import qs from "qs"
	import {
		defineComponent,
		ref
	} from 'vue'



	export default {
		setup() {
			return {
				input: ref('')
			}
		},
		data() {
			
			return {
				pageInfo: {
					value:"",
					input:"",
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				options: [{
					value: 0,
					label: '未缴费'
				}, {
					value: 2,
					label: '已缴费'
				}],
				value: '',
				value1: '',
				value2: '',
				CourseDate: [],
				SourceDate: [],
				multipleSelection: [],
				ConsultationDate: [],
				ReturnvisitDate: [],
				dialogFormVisible3: false,
				dialogFormVisible2: false,
				dialogFormVisible: false,
				form: {
					course: {
					},
					courseName: '',
					registerId: '',
					addtime: '',
					consultant: '',
					sex: '',
					consultcontent: '',
					phone: '',
					courseId: '',
					sourceId: '',
					addname: '',
					consultationmode: '',
					attentstate: '',
					sourcename: '',
					timeliness: '',
					planreturnvisit: '',
					paystate: '',
					empId: '',
					lastupdatename:'',
					deletename:''
				},
				retform: {
					returnvisitId: '',
					registerId: '',
					comments: '',
					returnvisitmode: '',
					returnvisitdate: '',
					returnvisitback: '',
					empId: ''
				},
				EmpData: '',
				rules: {
					name: [{
							required: true,
							message: '请输入接待人名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					zxfs: [{
						required: true,
						message: '请输入咨询方式',
						trigger: 'change'
					}],
					xxqd: [{

						required: true,
						message: '请输入信息渠道',
						trigger: 'change'
					}],
					zxr: [{
						required: true,
						message: '请输入咨询人姓名',
						trigger: 'blur'
					}, {
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}],
					lxdh: [{
						required: true,
						message: '请输入咨询人联系电话',
						trigger: 'blur'
					}, {
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}],
					zxkc: [{
						type: 'date',
						required: true,
						message: '请选择课程',
						trigger: 'change'
					}],
					zxnr: [{
						required: true,
						message: '请输入咨询内容',
						trigger: 'blur'
					}]
				}
			}
		},
		created() {
			this.tableData = this.tableTempData // tableTempData为临时静态数据
		},
		computed: {
			num: function() {
				return this.tableData.length
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			handleSelectionChange(val) {
				this.multipleSelection = [];
				this.multipleSelection = val;
				console.log(val + "--------------")
			},
			handleSelectionChange2(val) {
				this.multipleSelection2 = [];
				this.multipleSelection2 = val;
			},
			cls() {
				this.dialogFormVisible = false
				this.dialogFormVisible2 = false
				this.dialogFormVisible3 = false
				for (var key in this.form) {
					delete this.form[key];
					console.log("111")
				}
			},
			showEdit(row) {
				console.log(row);
				this.form.planreturnvisit = row.planreturnvisit;
				this.form.courseName = row.courseName;
				this.form.registerId = row.registerId;
				this.form.courseId = row.courseId;
				this.form.consultant = row.consultant;
				this.form.sex = row.sex;
				this.form.sourceId = row.sourceId;
				this.form.attentstate = row.attentstate;
				this.form.consultationmode = row.consultationmode
				this.form.timeliness = row.timeliness
				this.form.addname = row.addname
				this.form.consultcontent = row.consultcontent
				this.form.phone = row.phone
				this.form.paystate = row.paystate

				this.dialogFormVisible2 = true
			},
			showEdit2(row) {
				console.log(row);
				this.form.planreturnvisit = row.planreturnvisit;
				this.form.courseName = row.courseName;
				this.form.registerId = row.registerId;
				this.form.courseId = row.courseId;
				this.form.consultant = row.consultant;
				this.form.sex = row.sex;
				this.form.sourceId = row.sourceId;
				this.form.attentstate = row.attentstate;
				this.form.consultationmode = row.consultationmode
				this.form.timeliness = row.timeliness
				this.form.addname = row.addname
				this.form.consultcontent = row.consultcontent
				this.form.phone = row.phone
				this.form.paystate = row.paystate
				this.dialogFormVisible3 = true
				//回访显示
				this.huifan(this.form.registerId)
			},
			
			//多条件查询
			selectRegisterlivery() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectRegisterlivery", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
						params: this.pageInfo
						
					})
					.then(function(response) {
						console.log(response)
						_this.ConsultationDate = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPageRegister", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.ConsultationDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPageRegister", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.ConsultationDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			huifan(registerId) {
				registerId = this.form.registerId
				console.log(registerId)
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findAllReturnvisit?registerId="+registerId, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						console.log("1---------------------------------------------")
						console.log(response)
						_this.ReturnvisitDate = response.data;
						console.log("2---------------------------------------------")
						console.log(_this.ReturnvisitDate)
					}).catch(function(error) {
						console.log(error)
					})
			},
			addConsultation() {
				const _this = this
				this.form.addname=this.$store.state.updateUserInfo.username
				this.axios.post("http://localhost:8089/threeproject/AddRegister", this.form, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllRegister", {
								headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
								}
							})
							.then(function(response) {
								_this.ConsultationDate = response.data
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						console.log(response)
						var register = response.data
						_this.ConsultationDate.push(register)
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			//添加回访记录
			addReturnvisit(row) {
				this.retform.registerId = this.form.registerId;
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddReturnvisit", this.retform, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						console.log(_this.retform.registerId)
						var returnvisit = response.data
						_this.ReturnvisitDate.push(returnvisit)
						_this.dialogFormVisible3 = false
						for (var key in _this.retform) {
							delete _this.retform[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateRegister() {
				const _this = this
				console.log("-=-===-=-=-=-=------===-==-")
				this.axios.put("http://localhost:8089/threeproject/updateRegister", this.form, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPageRegister", {
								headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
								},
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.ConsultationDate = response.data.list
								_this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible2 = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			delRegister() {
				const _this = this
				this.form.deletename=this.$store.state.updateUserInfo.username
				_this.multipleSelection.forEach(item => {
					console.log(item)

					this.axios.delete("http://localhost:8089/threeproject/DelReg", {
							params:{
								"registerId": item.registerId
							},
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findAllRegister", {
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									}
								})
								.then(function(response) {
									_this.ConsultationDate = response.data
									console.log(response)
								}).catch(function(error) {
									console.log(error)
								})
							var Reg = response.data
							console.log("response内容:")
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				})
			},
			//新增学员交接表:从前端获取的咨询id
			shengpi(row) {
				const _this = this
				this.$confirm('确定要审核该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var registerId = _this.multipleSelection.map(item => item.registerId).join()
					console.log(registerId + "-------")
					this.axios.get("http://localhost:8089/threeproject/findRegisterId?registerId=" + registerId, {
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
						.then(function(response) {
							_this.ReturnvisitDate = response.data

							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消审批'
					});
				});
			},
			delReturnvisit() {
				const _this = this
				_this.multipleSelection2.forEach(item => {
					console.log(item)
					item.lastupdatename = "启用人"
					this.axios.delete("http://localhost:8089/threeproject/DelRet",{
							params:{
								"returnvisitId": item.returnvisitId
							},
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findAllReturnvisit?registerId=" + item
									.registerId, {
										headers: {
											'content-type': 'application/json',
											'jwtAuth': _this.$store.getters.token
										}
									})
								.then(function(response) {
									console.log("1---------------------------------------------")
									console.log(response)
									_this.ReturnvisitDate = response.data;
									console.log("2---------------------------------------------")
									console.log(_this.ReturnvisitDate)
								}).catch(function(error) {
									console.log(error)
								})

							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				})
			}
		},
		created() {
			const _this = this
				this.axios.get("http://localhost:8089/threeproject/findPageRegister", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						_this.ConsultationDate = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					}),

				this.axios.get("http://localhost:8089/threeproject/findCourse", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.CourseDate = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findSource", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.SourceDate = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findEmp", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.EmpData = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
		},
	};
</script>

<style>
	.mianboby {
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
</style>
