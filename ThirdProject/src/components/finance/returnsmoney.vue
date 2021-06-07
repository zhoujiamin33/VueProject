<template>
	<div style="margin-top:10px;">
	  	<!-- 搜索框、输入框 、按钮-->
	  	<div style="margin-left:10px;line-height: 40px;">
	  		<el-row style="text-align: center;">
	  			是否审核：
	  			<el-select  v-model="Approval"  placeholder="请选择">
	  				<el-option>已审核</el-option><el-option>未审核</el-option>
	  			</el-select>
	  			补缴日期：
	  			<el-date-picker v-model="value2"  type="daterange" align="right"  unlink-panels 
	  			      range-separator="至" 
	  			      start-placeholder="开始日期"
	  			      end-placeholder="结束日期"
	  			      :shortcuts="shortcuts">
	  			</el-date-picker>
				经办人：
				<el-input  v-model="course" style="width: 150px;"></el-input>
	  			<el-button style="margin-left: 20px;">查询</el-button>
	  			
	  		</el-row>
	  	</div>
	 </div>	
		<!-- 表格 -->
		<div style="position: relative;margin-top: 50px;">
			<el-table :data="tableData"  border style="width:100%;margin-left:10px;">
				<el-table-column fixed  type="selection"> </el-table-column>
			    <el-table-column fixed prop="date" label="缴费编号" width="150"> </el-table-column>
				<el-table-column  prop="date" label="退费类型" width="150"> </el-table-column>
			    <el-table-column prop="province" label="回退金额"  width="120"> </el-table-column>
			    <el-table-column prop="city" label="退费办理人" width="120"> </el-table-column>
			    <el-table-column prop="address"  label="退费日期"  width="600"> </el-table-column>
			    <el-table-column prop="zip" label="退费学员" width="120"> </el-table-column>
				<el-table-column prop="zip" label="退费明细" width="120"> </el-table-column>
			    <el-table-column fixed="right" label="操作" width="150">
			      <template #default="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
			        <el-button type="text" size="small">撤销</el-button>
					<el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		<!-- 底部金额总结 -->
		<div style="margin-top: 20px;margin-left:-1020px;font-size: 14px;">
			退费总额：已审核金额：未审核金额：
		</div>
	
</template>

<script>
	export default{
		name:"returnmoney",
		data(){
			return {
				Approval:"",student:"",course:"",value2:"",
				tableData:[
				{checked:"",date: '2016-05-02', name: '王小虎1',  address: '上海市普陀区金沙江路 1518 弄'},
				{checked:"",date: '2016-05-02', name: '王小虎2',  address: '上海市普陀区金沙江路 1518 弄'},
				{checked:"",date: '2016-05-02', name: '王小虎3',  address: '上海市普陀区金沙江路 1518 弄'},
				{checked:"",date: '2016-05-02', name: '王小虎4',  address: '上海市普陀区金沙江路 1518 弄'},
				{checked:"",date: '2016-05-02', name: '王小虎4',  address: '上海市普陀区金沙江路 1518 弄'},]
			}
		}
	}
</script>

<style>
</style>
