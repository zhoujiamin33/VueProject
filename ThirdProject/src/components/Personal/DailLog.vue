<template>
	<div style="overflow-x: hidden; ">
		<div >
			<b style="font-size: 13px;font-weight: 100;margin-left: -720px;">显示方式：</b>
			<el-select v-model="value" placeholder="请选择" size="mini" style="width: 90px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-checkbox v-model="checked" style="margin-left: 5px;">显示工作外时间</el-checkbox>
			<b style="font-size: 13px;font-weight: 100;margin-left: 60px;">优先级：</b>
			<img src="../assets/绿.gif">&nbsp;低&nbsp;&nbsp;
			<img src="../assets/黄.gif">&nbsp;普通&nbsp;&nbsp;
			<img src="../assets/红.gif">&nbsp;高
			<el-button type="info" @click="dialogFormVisible=true" plain size="mini" style="color: #000000;position: relative;left: 708px;">新建日程</el-button>
		</div>
		<div>
			<el-dialog title="新增日程" v-model="dialogFormVisible">
				<el-form :model="form">
					<div style="margin-top: -30px;margin-left: -422px;">
						<el-button type="primary" size="mini" icon="el-icon-document-checked">保存并新建</el-button>
						<el-button type="primary" size="mini" icon="el-icon-document-delete">保存并返回</el-button>
						<el-button type="primary" size="mini" icon="el-icon-s-fold" @click="dialogFormVisible = false">返回</el-button>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">主题：</b>
						<el-input placeholder="请输入内容" v-model="input" size="mini" style="width: 660px;margin-top: 8px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">分类：</b>
						<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 300px;margin-top: 12px;">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">地点：</b>
						<el-input placeholder="请输入内容" v-model="input1" size="mini" style="width: 300px;margin-top: 8px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">状态：</b>
						<el-select v-model="value3" placeholder="请选择" size="mini" style="width: 300px;margin-top: 12px;">
							<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b style="font-size: 13px;font-weight: 100;margin-left: 7px;">优先级：</b>
						<el-select v-model="value4" placeholder="请选择" size="mini" style="width: 300px;margin-top: 12px;">
							<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">开始时间：</b>
						<el-date-picker size="mini" v-model="value5" type="date" placeholder="选择日期" style="width: 170px;margin-top: 12px;">
						</el-date-picker>
						<el-time-select size="mini" v-model="value6" start='00:00' step='00:30' end='23:30' placeholder="选择时间" style="width: 120px;margin-top: 12px;">
						</el-time-select>

						<b style="font-size: 13px;font-weight: 100;margin-left: 4px;">结束时间：</b>
						<el-date-picker size="mini" v-model="value7" type="date" placeholder="选择日期" style="width: 180px;margin-top: 12px;">
						</el-date-picker>
						<el-time-select size="mini" v-model="value8" start='00:00' step='00:30' end='23:30' placeholder="选择时间" style="width: 120px;margin-top: 12px;">
						</el-time-select>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -582px;">是否全天：</b>
						<el-checkbox v-model="checked1" style="margin-left: 3px;margin-top: 12px;">全天事件</el-checkbox>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">日程描述：</b>
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="textarea" style="width: 660px;margin-top: 12px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">相关附件：</b>
						<el-select v-model="select" placeholder="请选择" style="width: 507px;margin-top: 8px;" size="mini">
						</el-select>
						<el-button type="primary" icon="el-icon-download" size="mini" style="margin-top: 10px;margin-left: 3px;">下载</el-button>
						<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 10px;margin-left: 3px;">删除</el-button>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">选择附件：</b>
						<el-input placeholder="请选择要上传的附件" v-model="input" style="width: 507px;margin-top: 8px;" size="mini">
						</el-input>
						<el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 3px;">浏览.....</el-button>
						<el-button type="primary" icon="el-icon-upload2" size="mini" style="margin-top: 10px;margin-left: 3px;">上传</el-button>
					</div>
				</el-form>
			</el-dialog>
		</div>
		<div>
			<el-calendar style="width: 800px;height: 400px;">
				<template #dateCell="{data}">
					<p :class="data.isSelected ? 'is-selected' : ''">
						{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
					</p>
				</template>
			</el-calendar>
		</div>
		<div>
			<div style="position: relative;left: 250px;bottom: 388px;">
				<b>至今</b>
				<el-select v-model="value1" placeholder="请选择" size="mini" style="width: 150px;">
					<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<b>的日程</b>
			</div>
			<table class="hkgv" cellspacing="0" rules="all" border="1" id="GridView1" style="position: relative;left:802px;bottom: 376px;width: 38%;border: solid 1px #c0c0c0;border-collapse: collapse;">
				<tbody style="display: table-row-group;vertical-align: middle;border-color: inherit;">
					<tr class="hkHeadStyle">
						<th scope="col" style="width: 30px;height: 35px;background-color: #f5f5f5;color: #666666;font-weight: bold;text-align: center;">
							<a href="#">优先</a>
						</th>
						<th scope="col" style="height: 35px;background-color: #f5f5f5;color: #666666;font-weight: bold;text-align: center;">
							<a href="#">主题</a>
						</th>
					</tr>
					<tr>
						<td align="center">
							<img src="../assets/红.gif">
						</td>
						<td>
							<a href="#">
								<span>本系统的服务器定期备份</span>
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default {
		name: "DailLog",
		data() {
			return {
				options: [{
					value: '选项1',
					label: '工作周'
				}, {
					value: '选项2',
					label: '日查询'
				}, {
					value: '选项3',
					label: '周查询'
				}],
				value: '',

				checked: false,
				checked1: false,

				options1: [{
					value: '选项1',
					label: '全部未完成'
				}, {
					value: '选项2',
					label: '未开始'
				}, {
					value: '选项3',
					label: '进行中'
				}, {
					value: '选项4',
					label: '已完成'
				}, {
					value: '选项5',
					label: '正在等待其他人'
				}, {
					value: '选项6',
					label: '已推迟'
				}],
				value1: '',

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

				options2: [{
					value: '选项1',
					label: '任务'
				}, {
					value: '选项2',
					label: '约会'
				}, {
					value: '选项3',
					label: '来访'
				}, {
					value: '选项4',
					label: '会议'
				}, {
					value: '选项5',
					label: '电话'
				}, {
					value: '选项6',
					label: '假期'
				}, {
					value: '选项7',
					label: '外出'
				}, {
					value: '选项8',
					label: '走访'
				}, {
					value: '选项9',
					label: '出差'
				}],
				value2: '',

				options3: [{
					value: '选项1',
					label: '未开始'
				}, {
					value: '选项2',
					label: '进行中'
				}, {
					value: '选项3',
					label: '已完成'
				}, {
					value: '选项4',
					label: '正在等待其他人'
				}, {
					value: '选项5',
					label: '已推迟'
				}],
				value3: '',

				options4: [{
					value: '选项1',
					label: '低'
				}, {
					value: '选项2',
					label: '普通'
				}, {
					value: '选项3',
					label: '高'
				}],
				value4: '',

				value5: '',
				value6: '',

				value7: '',
				value8: '',

				textarea: ref(''),
				input: ref(''),
			}
		}
	}
</script>

<style>
	.is-selected {
		color: #1989FA;
	}
</style>
