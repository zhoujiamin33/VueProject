<template>
	<div>
		<div class="a">
			<b class="b" style="font-size: 15px;">快速检索：</b>
			<el-select style="" v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input style="width: 180px;" v-model="input" placeholder="请输入内容" clearable></el-input>
			<el-button style="float:right;margin-left: 10px;">删除</el-button>
			<el-button style="float:right">退回开单</el-button>
			<el-button style="float:right">查询</el-button>
		</div>
		<div>
			<el-table :data="tableData" stripe border style="width: 100%">
				<el-table-column type="index" width="50" align="center">
				</el-table-column>
				<el-table-column type="selection" width="50" align="center">
				</el-table-column>
				<el-table-column prop="thbh" label="退回编号" width="180" align="center">
				</el-table-column>
				<el-table-column prop="date" label="退回日期" width="540" align="center">
				</el-table-column>
				<el-table-column prop="jcmc" label="教材名称" align="center">
				</el-table-column>
				<el-table-column prop="sl" label="数量" align="center">
				</el-table-column>
				<el-table-column prop="sj" label="售价" align="center">
				</el-table-column>
				<el-table-column prop="zk" label="折扣" align="center">
				</el-table-column>
				<el-table-column prop="thje" label="退回金额" align="center">
				</el-table-column>
				<el-table-column prop="xq" label="校区" align="center" width="100">
				</el-table-column>
				<el-table-column prop="kcgw" label="课程顾问" align="center" width="100">
				</el-table-column>
				<el-table-column prop="lrr" label="录入人" align="center" width="100">
				</el-table-column>
			</el-table>
		</div>
		<div style="font-size: 15px;text-align: center;">
			<b>当日退回金额：</b>
			<span></span>
			<b>元</b>
			<span>|</span>
			<b>当日退回：</b>
			<span></span>
			<b>本</b>
			<span>|</span>
			<b>共退回：</b>
			<span></span>
			<b>本</b>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default {
		name: "BookStorage",
		setup() {
			return {
				input: ref('')
			}
		},
		data() {
			return {
				options: [{
					value: '选项1',
					label: '校区'
				}, {
					value: '选项2',
					label: '教材名'
				}, {
					value: '选项3',
					label: '经办人'
				}],
				value: '',
				tableData: [{
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}, {
					thbh: '北大分校区',
					date: '丹朱围棋教学习题册',
					jcmc: '0.01',
					sl: '45.25',
					sj: '123',
					zk: '1231',
					thje: '123',
					xq: '青岛出版社',
					kcgw: 'adda',
					lrr: 'ddsd'
				}],

			}
		}
	}
</script>

<style>

</style>
