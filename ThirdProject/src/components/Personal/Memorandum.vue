<template>
	<div>
		<div>
			<b style="font-size: 13px;font-weight: 100;margin-left: -8220px;">快速检索：</b>
			<el-select v-model="value" placeholder="请选择" size="mini" style="width: 85px;margin-left: 3px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="value1" placeholder="请选择" size="mini" style="width: 85px;margin-left: 4px;">
				<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-button type="info" plain size="mini" style="color: #000000;margin-left: 5px;">查询</el-button>
		</div>
		<div>
			<el-calendar>
				<template #dateCell="{data}">
					<p @click="dialogFormVisible=true" :class="data.isSelected ? 'is-selected' : ''">
						{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
					</p>
				</template>
			</el-calendar>
			<el-dialog title="新建内容" v-model="dialogFormVisible">
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
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">类型：</b>
						<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 300px;margin-top: 12px;">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">地点：</b>
						<el-input placeholder="请输入内容" v-model="input1" size="mini" style="width: 300px;margin-top: 8px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">开始时间：</b>
						<el-date-picker size="mini" v-model="value3" type="date" placeholder="选择日期" style="width: 170px;margin-top: 12px;">
						</el-date-picker>
						<el-time-select size="mini" v-model="value4" start='00:00' step='00:30' end='23:30' placeholder="选择时间" style="width: 120px;margin-top: 12px;">
						</el-time-select>

						<b style="font-size: 13px;font-weight: 100;margin-left: 4px;">结束时间：</b>
						<el-date-picker size="mini" v-model="value7" type="date" placeholder="选择日期" style="width: 180px;margin-top: 12px;">
						</el-date-picker>
						<el-time-select size="mini" v-model="value8" start='00:00' step='00:30' end='23:30' placeholder="选择时间" style="width: 120px;margin-top: 12px;">
						</el-time-select>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">预约人员：</b>
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="textarea" style="width: 660px;margin-top: 12px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -498px;">提醒方式：</b>
						<el-checkbox v-model="checked" style="margin-left: 3px;margin-top: 12px;">站内消息通知预约人员</el-checkbox>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">内容：</b>
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="textarea1" style="width: 660px;margin-top: 12px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -136px;">重复周期：</b>
						<el-checkbox v-model="checked1" style="margin-left: 3px;margin-top: 12px;">间隔时间</el-checkbox>
						<el-select v-model="value5" disabled placeholder="请选择" size="mini" style="margin-left: 3px;">
							<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<b style="font-size: 13px;font-weight: 100;margin-left: 6px;">终止日期：</b>
						<el-date-picker disabled size="mini" v-model="value6" type="date" placeholder="选择日期" style="width: 180px;margin-top: 12px;">
						</el-date-picker>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -236px;">是否提醒：</b>
						<el-checkbox v-model="checked2" style="margin-left: 3px;margin-top: 12px;">提醒天数</el-checkbox>
						<el-input-number disabled v-model="num" controls-position="right" @change="handleChange" :min="0" size="mini" style="margin-left: -27px;width: 193px;"></el-input-number>
						<b style="font-size: 13px;font-weight: 100;margin-left: 6px;">事件性质：</b>
						<el-checkbox v-model="checked3" style="margin-left: 3px;margin-top: 12px;">私人事情</el-checkbox>
					</div>
				</el-form>
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
		name: "Memorandum",
		data() {
			return {
				num: 0,
				options: [{
					value: '选项1',
					label: '2021'
				}, {
					value: '选项2',
					label: '2022'
				}, {
					value: '选项3',
					label: '2023'
				}, {
					value: '选项4',
					label: '2024'
				}, {
					value: '选项5',
					label: '2025'
				}, {
					value: '选项6',
					label: '2026'
				}, {
					value: '选项7',
					label: '2027'
				}],
				value: '',

				options1: [{
					value: '选项1',
					label: '01月'
				}, {
					value: '选项2',
					label: '02月'
				}, {
					value: '选项3',
					label: '03月'
				}, {
					value: '选项4',
					label: '04月'
				}, {
					value: '选项5',
					label: '05月'
				}, {
					value: '选项6',
					label: '06月'
				}, {
					value: '选项7',
					label: '07月'
				}, {
					value: '选项8',
					label: '08月'
				}, {
					value: '选项9',
					label: '09月'
				}, {
					value: '选项10',
					label: '10月'
				}, {
					value: '选项11',
					label: '11月'
				}, {
					value: '选项12',
					label: '12月'
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

				value3: '',
				value4: '',
				value7: '',
				value8: '',

				textarea: ref(''),
				input: ref(''),
				textarea1: ref(''),
				
				
				options5: [{
					value: '选项1',
					label: '每日'
				}, {
					value: '选项2',
					label: '每周'
				}, {
					value: '选项3',
					label: '每月'
				}, {
					value: '选项4',
					label: '每年'
				}, {
					value: '选项5',
					label: '隔周'
				}, {
					value: '选项6',
					label: '隔月'
				}],
				value5: '',
				
				value6: '',
				
				checked: false,
				checked1: false,
				checked2: false,
				checked3: false,
			}
		},
		methods: {
		      handleChange(value) {
		        console.log(value);
		      }
		    }
	}
</script>

<style>
	.is-selected {
		color: #1989FA;
	}
</style>
