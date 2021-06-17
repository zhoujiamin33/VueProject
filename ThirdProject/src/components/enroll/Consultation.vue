<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk">
				<b>快速索引：</b>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option v-for="item in kssy" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>&nbsp;
				<el-input style="width: 120px;" placeholder="请输入内容" v-model="input" clearable>
				</el-input>
				<!-- <span class=""> -->&nbsp;&nbsp;&nbsp;<b>咨询时间:</b>&nbsp;
				<!-- </span> -->
				<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>

			</div>

			<div style="">
				<el-button>查询</el-button>

				<el-button @click="dialogFormVisible = true">新增</el-button>
				<el-button @click="shengpi">审批</el-button>

				<el-button @click="delRegister">删除</el-button>
				<div>
					<el-dialog :required="true" title="新增咨询登记信息" v-model="dialogFormVisible">

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
				style="width: 100%;margin-left: ;" @selection-change="handleSelectionChange">
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
				<el-table-column prop="" label="回访次数" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="paystate" label="缴费状态" show-overflow-tooltip>
					<template v-slot="scope1">
						<p v-if="scope1.row.paystate==0">未缴费</p>
						<p v-if="scope1.row.paystate==2">已缴费</p>
					</template>
				</el-table-column>
				<el-table-column prop="addname" label="接待人" show-overflow-tooltip>
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
				<el-dialog v-model="dialogFormVisible2" title="修改咨询登记信息">
					<el-form :inline="true" :model="form" ref="ruleForm" class="demo-ruleForm">
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="接待人 :" prop="name">
								<el-input v-model="form.addname" style="width:150px"></el-input>
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
							<el-form-item label="咨询意向 :" prop="zxnr">
								<el-select v-model="form.attentstate" placeholder="请选择意向">
									<el-option label="有意向" :value="0"></el-option>
									<el-option label="无意向" :value="1"></el-option>
									<el-option label="已就业" :value="2"></el-option>
								</el-select>
							</el-form-item>

						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="联系电话 :" prop="lxdh">
								<el-input v-model="form.phone" style="width:150px"></el-input>
							</el-form-item>

							<el-form-item label="咨询课程 :" prop="zxkc">
								<el-select v-model="form.courseId" placeholder="请选择课程">
									<el-option v-for="item in CourseDate" :key="item.courseId" :label="item.courseName"
										:value="item.courseId"></el-option>
								</el-select>
							</el-form-item>


						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="咨询内容 :" prop="zxnr">
								<el-input type="textarea" v-model="form.consultcontent"></el-input>
							</el-form-item>
							<el-form-item label="时效性 :">
								<el-select v-model="form.timeliness" placeholder="请选择意向">
									<el-option label="未过期" :value="0"></el-option>
									<el-option label="已过期" :value="1"></el-option>
								</el-select>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">

							<el-form-item label="缴费状态 :">
								<el-select v-model="form.paystate" placeholder="请选择缴费状态">
									<el-option v-for="item in options" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							</el-form-item>
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
			<el-dialog title="客户回访信息" :data="ConsultationDate" v-model="dialogFormVisible3">

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
						<el-form-item label="回访次数 :" prop="receptionist">
							<el-input disabled v-model="" style="width:220px"></el-input>
						</el-form-item>
						<el-form-item label="咨询内容 :" prop="handovertime">
							<el-input disabled v-model="form.consultcontent" style="width:220px"></el-input>
						</el-form-item>
					</div>

					<div style="text-align: center;"><b style="font-size: 17px;">上下班回复列表</b></div>
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

	</div>
	
</template>

<script>
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
				options: [{
					value: 0,
					label: '未缴费'
				}, {
					value: 2,
					label: '已缴费'
				}],
				kssy: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				shortcuts: [{
					text: '最近一周',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
						return [start, end]
					})(),
				}, {
					text: '最近一个月',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
						return [start, end]
					})(),
				}, {
					text: '最近三个月',
					value: (() => {
						const end = new Date()
						const start = new Date()
						start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
						return [start, end]
					})(),
				}],
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
					empId:''
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
		created(){
		    this.tableData = this.tableTempData // tableTempData为临时静态数据
		},
		computed: {
		    num: function () {
		        return this.tableData.length
		    }
		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = [];
				this.multipleSelection = val;
				console.log(val + "--------------")
			},
			handleSelectionChange2(val) {
				this.multipleSelection2 = [];
				this.multipleSelection2 = val;

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
			huifan(registerId) {
				registerId = this.form.registerId
				console.log(registerId)
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findAllReturnvisit/" + registerId)
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
			//回访次数
			filterChange (filters) {
			    for (const key in filters) {
			        if (filters[key].length > 0) {
			            // 配合data中定义的数据枚举数组type，确定操作的是那一列
			            if (filters[key][0].substr(0, 1) === 'p') {
			                let queryParams = null
			                // 获取选中的枚举值
			                queryParams = filters[key][0].substr(1, 2)
			                // 1、用的是静态数据，根据枚举值确定tableData
			                // 2、如果用的是http请求的话，将queryParams作为参数去获取结果集，赋值给tableData即可
			                if (queryParams === '') {
			                    this.tableData = this.tableTempData
			                } else {
			                    this.tableData = this.tableTempData.filter((item) => item.status === queryParams)
			                }
			            }
			        }
			    }
			},
			addConsultation() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddRegister", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllRegister")
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
				this.axios.post("http://localhost:8089/threeproject/AddReturnvisit", this.retform)
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
				this.axios.put("http://localhost:8089/threeproject/updateRegister", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findAllRegister")
							.then(function(response) {
								_this.ConsultationDate = response.data
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
				_this.multipleSelection.forEach(item => {
					console.log(item)
					item.lastupdatename = "启用人"
					this.axios.put("http://localhost:8089/threeproject/DelReg/" + item.registerId)
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findAllRegister")
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
			shengpi() {
				const _this = this
				this.$confirm('确定要审核该学员吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var registerId = _this.multipleSelection.map(item => item.registerId).join()
					console.log(registerId)
					this.axios.get("http://localhost:8089/threeproject/findRegisterId/" + registerId)
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
					this.axios.put("http://localhost:8089/threeproject/DelRet/" + item.returnvisitId)
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findAllReturnvisit/" + item
									.registerId)
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
			this.axios.get("http://localhost:8089/threeproject/findAllRegister")
				.then(function(response) {
					_this.ConsultationDate = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),

				this.axios.get("http://localhost:8089/threeproject/findCourse")
				.then(function(response) {
					_this.CourseDate = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findSource")
				.then(function(response) {
					_this.SourceDate = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findEmp")
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
	/* 	.mianboby {
		/* 	display: flex;
		justify-content: space-between;
		align-content: center; */
	margin-left: "600px"
	}

	*/
</style>
