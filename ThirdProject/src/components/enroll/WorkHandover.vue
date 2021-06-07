<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk" style="">
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
					<el-dialog prop="theoryCenterId" :required="true" title="新增交接信息" v-model="dialogFormVisible">

						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
							class="demo-ruleForm">
							<el-form-item label="交接事项 :" prop="jjsx">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item label="交接人 :" prop="jjr">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
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
			<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style=""
							@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column label="" width="50">
					<template #default="scope">{{ scope.row.id }}</template>
				</el-table-column>
				<el-table-column prop="handovermatters" label="交接事项" width="300">
				</el-table-column>


				<el-table-column prop="handoverperson" label="交接人" show-overflow-tooltip width="110px">
				</el-table-column>
				<el-table-column prop="handovertime" label="交接时间" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="numberofreplies" label="回复次数" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="state" label="状态" show-overflow-tooltip>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<el-button type="text" @click="reply = true">回复</el-button>
				</el-table-column>
			</el-table>

			<!-- 修改 -->
			<div>
				<el-dialog prop="theoryCenterId" :required="true" title="修改咨询登记信息" v-model="reply">

					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="交接事项 :" prop="name">
							<el-input v-model="ruleForm.name"></el-input>
						</el-form-item>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="接待人 :" prop="receptionist">
								<el-input v-model="ruleForm.receptionist"></el-input>
							</el-form-item>
							<el-form-item label="交接时间 :" prop="handovertime">
								<el-input v-model="ruleForm.handovertime"></el-input>
							</el-form-item>
						</div>

						<div style="text-align: center;"><b style="font-size: 17px;">上下班回复列表</b></div>
						<div>
							<el-table :data="hfjmtableData" stripe style="width: 100%">
								<el-table-column prop="hfjmid" label="" width="80px">
								</el-table-column>
								<el-table-column prop="hfjmdate" label="日期" width="130px">
								</el-table-column>
								<el-table-column prop="hfnr" label="回复内容" width="320px">
								</el-table-column>
								<el-table-column prop="hfjmname" label="回复人" width="190px">
								</el-table-column>

							</el-table>
						</div>
						<div style="display: flex; justify-content: space-between;">
							<el-form-item label="回复人 :" prop="asd">
								<el-input v-model="ruleForm.asd"></el-input>
							</el-form-item>
							<el-form-item label="回复时间 :" prop="qwe">
								<el-input v-model="ruleForm.qwe"></el-input>
							</el-form-item>
						</div>
						<div>
							<el-form-item label="回复内容 :" prop="replycontent">
								<el-input v-model="ruleForm.replycontent"></el-input>
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
				reply: false,
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
					handovermatters: '2020-01-05',
					handoverperson: '阿萨大',
					handovertime: '男',
					numberofreplies: '2',
					state: '正常'
				}, {
					id: '2',
					handovermatters: '2020-01-05',
					handoverperson: '阿萨大',
					handovertime: '男',
					numberofreplies: '2',
					state: '正常'
				}, {
					id: '3',
					handovermatters: '2020-01-05',
					handoverperson: '阿萨大',
					handovertime: '男',
					numberofreplies: '2',
					state: '正常'
				}, {
					id: '4',
					handovermatters: '2020-01-05',
					handoverperson: '阿萨大',
					handovertime: '男',
					numberofreplies: '2',
					state: '正常'
				}, {
					id: '5',
					handovermatters: '2020-01-05',
					handoverperson: '阿萨大',
					handovertime: '男',
					numberofreplies: '2',
					state: '正常'
				}],
				ruleForm: {
					jjsx: '',
					jjr: '',
					delivery: false,
					type: [],

				},
				rules: {
					jjsx: [{
							required: true,
							message: '请输入相关交接事项',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					jjr: [{
						required: true,
						message: '请输入交接人姓名',
						trigger: 'blur'
					}, {
						min: 3,
						max: 5,
						message: '长度在 3 到 5 个字符',
						trigger: 'blur'
					}]


				},
				hfjmtableData: [{
					hfjmid: '1',
					hfjmdate: '2016-05-02',
					hfnr: '阿巴斯u弟弟撒v',
					hfjmname: '王小虎'

				}, {
					hfjmid: '2',
					hfjmdate: '2016-05-02',
					hfnr: '从v把撒旦飞洒u弟弟撒v',
					hfjmname: '王小虎'
				}, {
					hfjmid: '3',
					hfjmdate: '2016-05-02',
					hfnr: '啊实打实大苏打u弟弟撒v',
					hfjmname: '王小虎'
				}, {
					hfjmid: '4',
					hfjmdate: '2016-05-02',
					hfnr: '会让他很舒服u弟弟撒v',
					hfjmname: '王小虎'
				}]
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
