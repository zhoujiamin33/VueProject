<template>
	<div>
		<div class="a" style="margin-left: -320px;">
			<b class="b" style="font-size: 15px;">快速检索：</b>
			<el-select style="" v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input style="width: 180px;" v-model="input" placeholder="请输入内容" clearable></el-input>
			<el-button style="float:right;margin-left: 10px;">删除</el-button>
			<el-button style="float:right">销售开单</el-button>
			<el-button style="float:right">查询</el-button>
		</div>
		<div style="width: 81%; margin-left: 230px;margin-top: 50px;">
			<el-table :data="tableData"  stripe border style="width: 100%">
				<el-table-column type="index" width="50" align="center"> </el-table-column>
				<el-table-column type="selection"  width="50" align="center"> </el-table-column>
				<el-table-column prop="xsbh"  label="销售编号" width="180" align="center"></el-table-column>
				<el-table-column prop="date" label="销售日期" width="540" align="center"> </el-table-column>
				<el-table-column prop="jcmc" label="教材名称" align="center"> </el-table-column>
				<el-table-column prop="sl" label="数量" align="center"> </el-table-column>
				<el-table-column prop="sj" label="售价"  align="center"> </el-table-column>
				<el-table-column prop="zk" label="折扣" align="center"> </el-table-column>
				<el-table-column prop="hj" label="合计" align="center"> </el-table-column>
				<el-table-column prop="xq"  label="校区" align="center" width="100"> </el-table-column>
				<el-table-column  prop="gmz" label="购买者" align="center" width="100"> </el-table-column>
			    <el-table-column  prop="kcgw" label="课程顾问" align="center" width="100"> </el-table-column>
				<el-table-column prop="lrr" label="录入人" align="center" width="100"> </el-table-column>
			</el-table>
		</div>
		<div style="font-size: 15px;">
			<b>当日销售收入：</b>
			<span></span>
			<b>元</b>
			<span>|</span>
			<b>当日销售：</b>
			<span></span>
			<b>本</b>
			<span>|</span>
			<b>共销售：</b>
			<span></span>
			<b>本</b>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default{
	name:"BookDelivery",
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
		    label: '课程顾问'
		}, {
		    value: '选项4',
		    label: '购买者'
		}],
		value: '',
		tableData: [{
			xsbh: '北大分校区',
			date: '丹朱围棋教学习题册',
			jcmc: '0.01',
			sl: '45.25',
			sj: '123',
			zk: '1231',
			hj: '123',
			xq: '青岛出版社',
			gmz: 'TSM管理员',
			kcgw: 'adda',
			lrr: 'ddsd'	         
			},{
			xsbh: '北大分校区',
			date: '丹朱围棋教学习题册',
			jcmc: '0.01',
			sl: '45.25',
			sj: '123',
			zk: '1231',
			hj: '123',
			xq: '青岛出版社',
			gmz: 'TSM管理员',
			kcgw: 'adda',
			lrr: 'ddsd'
			},{
			  xsbh: '北大分校区',
			  date: '丹朱围棋教学习题册',
			  jcmc: '0.01',
			  sl: '45.25',
			  sj: '123',
			  zk: '1231',
			  hj: '123',
			  xq: '青岛出版社',
			  gmz: 'TSM管理员',
			  kcgw: 'adda',
			  lrr: 'ddsd'
			},{
			  xsbh: '北大分校区',
			  date: '丹朱围棋教学习题册',
			  jcmc: '0.01',
			  sl: '45.25',
			  sj: '123',
			  zk: '1231',
			  hj: '123',
			  xq: '青岛出版社',
			  gmz: 'TSM管理员',
			  kcgw: 'adda',
			  lrr: 'ddsd'
			},{
			  xsbh: '北大分校区',
			  date: '丹朱围棋教学习题册',
			  jcmc: '0.01',
			  sl: '45.25',
			  sj: '123',
			  zk: '1231',
			  hj: '123',
			  xq: '青岛出版社',
			  gmz: 'TSM管理员',
			  kcgw: 'adda',
			  lrr: 'ddsd'
			},{
			  xsbh: '北大分校区',
			  date: '丹朱围棋教学习题册',
			  jcmc: '0.01',
			  sl: '45.25',
			  sj: '123',
			  zk: '1231',
			  hj: '123',
			  xq: '青岛出版社',
			  gmz: 'TSM管理员',
			  kcgw: 'adda',
			  lrr: 'ddsd'
			},{
			  xsbh: '北大分校区',
			  date: '丹朱围棋教学习题册',
			  jcmc: '0.01',
			  sl: '45.25',
			  sj: '123',
			  zk: '1231',
			  hj: '123',
			  xq: '青岛出版社',
			  gmz: 'TSM管理员',
			  kcgw: 'adda',
			  lrr: 'ddsd'
			},{
			  xsbh: '北大分校区',
			  date: '丹朱围棋教学习题册',
			  jcmc: '0.01',
			  sl: '45.25',
			  sj: '123',
			  zk: '1231',
			  hj: '123',
			  xq: '青岛出版社',
			  gmz: 'TSM管理员',
			  kcgw: 'adda',
			  lrr: 'ddsd'
			}],	       
		        
		}
	}
}
</script>

<style>
</style>
