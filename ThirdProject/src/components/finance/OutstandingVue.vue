<template>
	 <el-tabs type="border-card" style="margin-top: 40px;">
	   <el-tab-pane label="欠费补缴">
	 	 <div style="margin-top:10px;">
	 	   	<!-- 搜索框、输入框 、按钮-->
	 	   	<div style="margin-left:10px;line-height: 40px;">
	 	   		<el-row style="text-align: center;">
	 	   			<div style="margin-top: 15px">
	 	   			  <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
	 	   			    <template #prepend>
	 	   			      <el-select v-model="select" placeholder="请选择">
	 	   			        <el-option label="学号" value="1">学号</el-option>
	 	   			        <el-option label="姓名" value="2">姓名</el-option>
	 	   			      </el-select>
	 	   			    </template>
	 	   			    <template #append>
	 	   			      <el-button icon="el-icon-search"></el-button>
	 	   			    </template>
	 	   			  </el-input>
	 	   			</div>
	 	   		</el-row>
	 	   	</div>
	 	</div>	
	 	<!-- 表格 -->
	 	<div style="position: relative;margin-top: 50px;">
	 		<el-table :data="tableData"  border style="width: 100%;margin-left:10px;">
	 			<el-table-column fixed  type="selection"> </el-table-column>
	 			<el-table-column fixed prop="date" label="补缴编号" > </el-table-column>
	 			<el-table-column  prop="date" label="学号" > </el-table-column>
	 			<el-table-column prop="address"  label="补缴学员" > </el-table-column>
	 			<el-table-column prop="zip" label="累计欠费"> </el-table-column>
				<el-table-column prop="zip" label="应缴总额"> </el-table-column>
				<el-table-column prop="zip" label="联系电话"> </el-table-column>
	 			<el-table-column fixed="right" label="操作">
	 			    <template #default="scope">
	 					<el-button @click="handleClick(scope.row)" type="text" size="small">学费补缴</el-button>
	 			     </template>
	 			</el-table-column>
	 		</el-table>
	 	</div>
	 	<div style="display: flex; justify-content: space-between;">
	 		<!-- 底部金额总结 -->
	 		<span style="margin-top:15px;font-size: 14px;margin-left:10px;">退费总额：已审核金额：未审核金额：</span>
	 		<el-pagination
	 		@size-change="handleSizeChange"
	 		@current-change="handleCurrentChange"
	 		当前页码
	 		:current-page="pageInfo.currentPage"
	 		:page-sizes="[2, 4, 6, 10]"
	 		每页数据
	 		:page-size="pageInfo.pagesize"
	 		layout="total, sizes, prev, pager, next, jumper"
	 		:total="pageInfo.total">
	 		</el-pagination>
	 	</div>
	   </el-tab-pane>
	   
	   <el-tab-pane label="补缴管理">
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
	   	 		<el-table :data="tableData"  border style="width: 100%;margin-left:10px;">
	   	 			<el-table-column fixed  type="selection"> </el-table-column>
	   	 			<el-table-column fixed prop="date" label="补缴编号" > </el-table-column>
	   	 			<el-table-column  prop="date" label="单据号" > </el-table-column>
	   	 			<el-table-column prop="province" label="报班缴费编号"> </el-table-column>
	   	 			<el-table-column prop="city" label="补缴日期"> </el-table-column>
	   	 			<el-table-column prop="address"  label="补缴学员" > </el-table-column>
	   	 			<el-table-column prop="zip" label="补缴金额" > </el-table-column>
	   	 			<el-table-column prop="zip" label="累计欠费"> </el-table-column>
	   	 			<el-table-column prop="address"  label="经办人"> </el-table-column>
	   	 			<el-table-column fixed="right" label="操作">
	   	 			    <template #default="scope">
	   	 					<el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
	   	 					<el-button type="text" size="small">撤销</el-button>
	   	 					<el-button type="text" size="small">删除</el-button>
	   	 			     </template>
	   	 			</el-table-column>
	   	 		</el-table>
	   	 	</div>
	   	 	<div style="display: flex; justify-content: space-between;">
	   	 		<!-- 底部金额总结 -->
	   	 		<span style="margin-top:15px;font-size: 14px;margin-left:10px;">退费总额：已审核金额：未审核金额：</span>
	   	 		<el-pagination
	   	 		@size-change="handleSizeChange"
	   	 		@current-change="handleCurrentChange"
	   	 		当前页码
	   	 		:current-page="pageInfo.currentPage"
	   	 		:page-sizes="[2, 4, 6, 10]"
	   	 		每页数据
	   	 		:page-size="pageInfo.pagesize"
	   	 		layout="total, sizes, prev, pager, next, jumper"
	   	 		:total="pageInfo.total">
	   	 		</el-pagination>
	   	 	</div>
	   </el-tab-pane>
	</el-tabs> 
</template>

<script>
	import { defineComponent, ref } from 'vue'
	export default{
		name:"outstanding",
		data(){
			return{
				tableData:[],
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:2,//每页多少条数据
					total:0
				},
				input3: ref(''),
				select: ref('')
			}
		},
		created() {
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findAlloutstanding")
			.then(function(response){
				console.log(response)
				_this.tableData=response.data
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>
</style>
