<template>
	<div class="z-boby">
		<div class="mianboby">
			<div class="mianwbk">
				<b>所属部门：</b>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<b>快速索引：</b>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option v-for="item in kssy" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
					<el-input style="width: 120px;" placeholder="请输入内容" v-model="input" clearable>
					</el-input>
			</div>

			<div style="">
				<el-button>查询</el-button>
			</div>
		</div>
		<div class="mianbiao">
			<el-table :data="tableData" border >
				<el-table-column fixed prop="id" label="" width="50">
				</el-table-column>
				<el-table-column prop="usernumber" label="用户编码" width="">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="">
				</el-table-column>
				<el-table-column prop="six" label="性别" width="100">
				</el-table-column>
				<el-table-column prop="department" label="部门" width="">
				</el-table-column>
				<el-table-column prop="position" label="职位" width="">
				</el-table-column>
				<el-table-column prop="state" label="状态" width="">
				</el-table-column>
				<el-table-column prop="company" label="所属公司" width="300">
				</el-table-column>

			</el-table>
		</div>
	</div>


</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'

	export default {
		methods: {
			handleClick(row) {
				console.log(row);
			}
		},
		data() {
			return {
				options: [{
					value: '选项1',
					label: '总部'
				}, {
					value: '选项2',
					label: '财务部'
				}, {
					value: '选项3',
					label: '技术部'
				}, {
					value: '选项4',
					label: '行政部'
				}, {
					value: '选项5',
					label: '招生部'
				}],
				kssy: [{
					value: '选项1',
					label: '编码'
				}, {
					value: '选项2',
					label: '姓名'
				}],
				value: '',
				tableData: [{
					id: '1',
					usernumber:"admin",
					name: '王小虎',
					six: '男',
					department: '技术部',
					position: '部门经理',
					state: '正常',
					company:'嘉敏文化有限公司'
				}, {
					id: '2',
					usernumber:'user',
					name: '王小虎',
					six: '女',
					department: '财务部',
					position: '部门经理',
					state: '正常',
					company:'嘉敏文化有限公司'
				}]
			}
		},
		setup() {
			return {
				input: ref('')
			}
		}
	}
</script>

<style>
	el-table-column {}

	.z-boby {
		height: 500px;
	}

	.mianwbk {}

	.mianboby {
		display: flex;

		justify-content: space-between;
		align-content: center
	}

	.mianbiao {
		align-items: flex-start;
	}
</style>
