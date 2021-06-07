<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk" style="margin-left: 200px;">
				<b>快速索引：</b>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option v-for="item in kssy" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input style="width: 120px;" placeholder="请输入内容" v-model="input" clearable>
				</el-input>


				<span class="demonstration">&nbsp;<b>咨询时间:</b>&nbsp;</span>
				<el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>

			</div>

			<div style="">
				<el-button>查询</el-button>

				<el-button type="" @click="dialogFormVisible = true">新增</el-button>
				<el-button>删除</el-button>
				<div>
					<el-dialog prop="theoryCenterId" :required="true" title="新增咨询登记信息" v-model="dialogFormVisible" >

						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
							class="demo-ruleForm">
							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="接待人 :" prop="name" >
									<el-input v-model="ruleForm.name" style="width:100px;"></el-input>
								</el-form-item>
								<el-form-item label="咨询方式 :" prop="zxfs" style="width: -120px;">
									<el-select v-model="ruleForm.zxfs" placeholder="请选择校区">
										<el-option label="上门咨询" value="smzx"></el-option>
										<el-option label="电话咨询" value="dhzx"></el-option>
										<el-option label="网络咨询" value="dhzx"></el-option>
									</el-select>
								</el-form-item>
							</div>

							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="信息渠道 :" prop="xxqd" >
									<el-select v-model="ruleForm.xxqd" placeholder="请选择活动区域" style="width: 100px;">
										<el-option label="老用户推荐" value="lyhtj"></el-option>
										<el-option label="其他渠道" value="qtqd"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="咨询人 :" prop="zxr">
									<el-input v-model="ruleForm.zxr"></el-input>
								</el-form-item>
							</div>
							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="性别 :" prop="resource">
									<el-radio-group v-model="ruleForm.resource">
										<el-radio label="男"></el-radio>
										<el-radio label="女"></el-radio>
									</el-radio-group>
								</el-form-item>
								<el-form-item label="联系电话 :" prop="lxdh">
									<el-input v-model="ruleForm.lxdh"></el-input>
								</el-form-item>
							</div>
							<div style="display: flex; justify-content: space-between;">
								<el-form-item label="咨询课程 :" prop="zxkc">
									<el-select v-model="ruleForm.zxkc" placeholder="请选择课程" style="width: 200px;">
										<el-option label="篮球" value="lyhtj"></el-option>
										<el-option label="游泳" value="qtqd"></el-option>
									</el-select>
								</el-form-item>

								<el-form-item label="咨询内容 :" prop="zxnr">
									<el-input type="textarea" v-model="ruleForm.zxnr"></el-input>
								</el-form-item>
							</div>
							<div style="display: flex; justify-content: space-between;">

								<el-form-item label="回访日期 :" prop="jhhfrq">
									<el-input v-model="ruleForm.jhhfrq"></el-input>
								</el-form-item>
								<el-form-item label="咨询日期 :" prop="zxrq">
									<el-input v-model="ruleForm.zxrq"></el-input>
								</el-form-item>
							</div>


						</el-form>

						<template #footer>
							<span class="dialog-footer">
								<el-button type="primary" @click="dialogFormVisible = false">新建并保存</el-button>
								<el-button @click="dialogFormVisible = false">取 消</el-button>
							</span>
						</template>
					</el-dialog>
				</div>


			</div>
		</div>

		<div>
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 80%;margin-left:200px;margin-top: 10px;"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="" width="50">
					<template #default="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="advisorydate" label="咨询日期" width="120">
				</el-table-column>
				<el-table-column prop="consultant" label="咨询人" width="90px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="six" label="性別" width="50px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="content" label="咨询内容" width="300px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="number" label="联系电话" show-overflow-tooltip width="110px">
				</el-table-column>
				<el-table-column prop="consultationcourse" label="咨询课程" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="sourceofstudents" label="生源渠道" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="numberofreplies" label="回访次数" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="receptionist" label="接待人" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="state" label="状态" width="80px" show-overflow-tooltip>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<el-button type="text" @click="modify = true">修改</el-button>
					<el-button type="text" @click="returnvisit = true">回访</el-button>
				</el-table-column>
			</el-table>
			
			<!-- 修改 -->
			<div>
				<el-dialog prop="theoryCenterId" :required="true" title="修改咨询登记信息" v-model="modify">

					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="接待人 :" prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="咨询方式 :" prop="zxfs">
								<el-select v-model="ruleForm.zxfs" placeholder="请选择校区" style="width: 200px;">
									<el-option label="上门咨询" value="smzx"></el-option>
									<el-option label="电话咨询" value="dhzx"></el-option>
									<el-option label="网络咨询" value="dhzx"></el-option>
								</el-select>
							</el-form-item>
						</div>

						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="信息渠道 :" prop="xxqd">
								<el-select v-model="ruleForm.xxqd" placeholder="请选择活动区域" style="width: 200px;">
									<el-option label="老用户推荐" value="lyhtj"></el-option>
									<el-option label="其他渠道" value="qtqd"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="咨询人 :" prop="zxr">
								<el-input v-model="ruleForm.zxr"></el-input>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="性别 :" prop="resource">
								<el-radio-group v-model="ruleForm.resource">
									<el-radio label="男"></el-radio>
									<el-radio label="女"></el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="联系电话 :" prop="lxdh">
								<el-input v-model="ruleForm.lxdh"></el-input>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="咨询课程 :" prop="zxkc">
								<el-select v-model="ruleForm.zxkc" placeholder="请选择课程" style="width: 200px;">
									<el-option label="篮球" value="lyhtj"></el-option>
									<el-option label="游泳" value="qtqd"></el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="咨询内容 :" prop="zxnr">
								<el-input type="textarea" v-model="ruleForm.zxnr"></el-input>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">

							<el-form-item label="回访日期 :" prop="jhhfrq">
								<el-input v-model="ruleForm.jhhfrq"></el-input>
							</el-form-item>
							<el-form-item label="咨询日期 :" prop="zxrq">
								<el-input v-model="ruleForm.zxrq"></el-input>
							</el-form-item>
						</div>


					</el-form>

					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="modify = false">保存</el-button>
							<el-button @click="modify = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
			
			<!-- //回访 -->
			<div style="">
				<el-dialog prop="theoryCenterId" :required="true" title="客户回访信息" v-model="returnvisit">
			
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="接待人 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 120px; height: 20px;"></el-input>
							</el-form-item>
							<el-form-item label="咨询日期 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 130px;"></el-input>
							</el-form-item>
							<el-form-item label="计划回访 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 130px;"></el-input>
							</el-form-item>
						</div>
			
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="咨询人 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 120px;"></el-input>
							</el-form-item>
							<el-form-item label="性别 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 130px;"></el-input>
							</el-form-item>
							<el-form-item label="咨询课程 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 130px;"></el-input>
							</el-form-item>
						</div>
						
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="生源渠道 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 120px;"></el-input>
							</el-form-item>
							<el-form-item label="联系电话 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 130px;"></el-input>
							</el-form-item>
							<el-form-item label="咨询方式 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 130px;"></el-input>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="回访次数 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 120px;"></el-input>
							</el-form-item>
						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="咨询内容 :" prop="name">
								<el-input v-model="ruleForm.name" style="width: 550px;"></el-input>
							</el-form-item>
						</div>
					</el-form>
			
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="returnvisit = false">保存</el-button>
							<el-button @click="returnvisit = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
			
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px',
				dialogTableVisible: false,
				modify: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				returnvisit: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				



				tableData: [{
					id: '1',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '哀伤与东亚v对飒飒大大是比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}, {
					id: '2',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '滚哈哀伤与东亚v对比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}, {
					id: '3',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '啊发发哀伤与东亚v对比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}, {
					id: '4',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '给如果台湾哀伤与东亚v对比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}, {
					id: '5',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '哀伤与东亚v对比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}, {
					id: '6',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '哀伤与东亚v对比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}, {
					id: '7',
					advisorydate: '2020-01-05',
					consultant: '阿萨大',
					six: '男',
					content: '哀伤与东亚v对比度哎',
					number: '345676543',
					consultationcourse: '篮球',
					sourceofstudents: '老用户介绍',
					numberofreplies: '2',
					receptionist: '政痿',
					state: '正常'
				}],
				ruleForm: {
					name: '',
					zxfs: '',
					xxqd: '',
					zxr: '',
					lxdh: '',
					delivery: false,
					type: [],
					resource: '',
					jhhfrq: '',
					zxrq: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
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
						message: '请选择咨询方式',
						trigger: 'change'
					}],
					xxqd: [{

						required: true,
						message: '请选择信息渠道',
						trigger: 'change'
					}],
					zxr: [{
						required: true,
						message: '请选择咨询人姓名',
						trigger: 'blur'
					}, {
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}],
					jhhfrq: [{
						required: true,
						message: '请填写计划回访日期',
						trigger: 'blur'
					}, {
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}],
					lxdh: [{
						required: true,
						message: '请选择咨询人姓名',
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
						message: '请填写',
						trigger: 'blur'
					}]
				}
			}
		}

	};
</script>

<style>
	.mianboby {
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
</style>
