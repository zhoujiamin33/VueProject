<template>
	<el-tabs type="border-card"  style="margin-top: 40px;">
	  <el-tab-pane label="教材入库收支">
		  <div style="margin-top:10px;">
		  	<!-- 搜索框、输入框 、按钮-->
		  	<div style="margin-left:5px;line-height: 40px;">
		  		<el-row style="text-align: center;">
		  			是否审核：
		  			<el-select  v-model="Approval"  placeholder="请选择">
		  				<el-option>已审核</el-option><el-option>未审核</el-option>
		  			</el-select>
		  			缴费日期：
		  			<el-date-picker v-model="value2"  type="daterange" align="right"  unlink-panels 
		  			      range-separator="至" 
		  			      start-placeholder="开始日期"
		  			      end-placeholder="结束日期"
		  			      :shortcuts="shortcuts">
		  			</el-date-picker>
					经办人：
					<el-input  v-model="course" style="width: 150px;"></el-input>
		  			<el-button style="margin-left: 10px;">查询</el-button>
					<el-button type="danger" >删除</el-button>
					<el-button type="primary" icon="el-icon-plus" style="margin-left:10px;">新增入库</el-button>
		  		</el-row>
		  	</div>
		 </div>	
		<!-- 表格 -->
		<div style="position: relative;margin-top: 50px;">
		 	<el-table :data="tableData"  border style="width:100%;margin-left:5px;">
		 		<el-table-column fixed  type="selection"> </el-table-column>
		 		<el-table-column  prop="date" label="单据号" width="150"> </el-table-column>
		 	    <el-table-column prop="province" label="收支日期"  width="120"> </el-table-column>
		 	    <el-table-column prop="city" label="收支明细" width="120"> </el-table-column>
		 	    <el-table-column prop="address"  label="入库数量"  width="600"> </el-table-column>
		 	    <el-table-column prop="zip" label="收支总额" width="120"> </el-table-column>
		 		<el-table-column prop="address"  label="增加人"  width="600"> </el-table-column>
		 		<el-table-column prop="zip" label="缴费状态" width="120"> </el-table-column>
		 	    <el-table-column fixed="right" label="操作" width="100">
		 	      <template #default="scope">
		 	        <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
		 	        <el-button type="text" size="small">撤销</el-button>
		 	      </template>
		 	    </el-table-column>
		 	</el-table>
		 </div>
		<div style="display: flex; justify-content: space-between;">
			<!-- 底部金额总结 -->
				<span style="margin-top:15px;font-size: 14px;margin-left:10px;">缴费总额：已审核金额：未审核金额：</span>
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage4"
				:page-sizes="[100, 200, 300, 400]"
				:page-size="100"
				layout="total, sizes, prev, pager, next, jumper"
				:total="400" style="margin-top:10px;margin-right:-10px;">
				</el-pagination>
		</div>
	  </el-tab-pane>
	  <el-tab-pane label="教材出库收支">
		  <div style="margin-top:10px;">
		    	<!-- 搜索框、输入框 、按钮-->
		    	<div style="margin-left:10px;line-height: 40px;">
		    		<el-row style="text-align: center;">
		    			是否审核：
		    			<el-select  v-model="Approval"  placeholder="请选择">
		    				<el-option>已审核</el-option><el-option>未审核</el-option>
		    			</el-select>
		    			缴费日期：
		    			<el-date-picker v-model="value2"  type="daterange" align="right"  unlink-panels 
		    			      range-separator="至" 
		    			      start-placeholder="开始日期"
		    			      end-placeholder="结束日期"
		    			      :shortcuts="shortcuts">
		    			</el-date-picker>
		  			经办人：
		  			<el-input  v-model="course" style="width: 150px;"></el-input>
		    			<el-button style="margin-left: 10px;">查询</el-button>
		    			<el-button type="danger" >删除</el-button>
		    			<el-button type="primary" icon="el-icon-plus" style="margin-left:10px;">新增出库</el-button>
		    		</el-row>
		    	</div>
		   </div>	
		  <!-- 表格 -->
		  <div style="position: relative;margin-top: 50px;">
		   	<el-table :data="tableData"  border style="width:100%;margin-left:5px;">
		   		<el-table-column fixed  type="selection"> </el-table-column>
		   		<el-table-column  prop="date" label="单据号" width="150"> </el-table-column>
		   	    <el-table-column prop="province" label="收支日期"  width="120"> </el-table-column>
		   	    <el-table-column prop="city" label="收支明细" width="120"> </el-table-column>
		   	    <el-table-column prop="address"  label="出库数量"  width="600"> </el-table-column>
		   	    <el-table-column prop="zip" label="收支总额" width="120"> </el-table-column>
		   		<el-table-column prop="address"  label="增加人"  width="600"> </el-table-column>
		   		<el-table-column prop="zip" label="收支状态" width="120"> </el-table-column>
		   	    <el-table-column fixed="right" label="操作" width="100">
		   	      <template #default="scope">
		   	        <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
		   	        <el-button type="text" size="small">撤销</el-button>
		   	      </template>
		   	    </el-table-column>
		   	</el-table>
		   </div>
		  <div style="display: flex; justify-content: space-between;">
		  	<!-- 底部金额总结 -->
		  		<span style="margin-top:15px;font-size: 14px;margin-left:10px;">缴费总额：已审核金额：未审核金额：</span>
		  		<el-pagination
		  		@size-change="handleSizeChange"
		  		@current-change="handleCurrentChange"
		  		:current-page="currentPage4"
		  		:page-sizes="[100, 200, 300, 400]"
		  		:page-size="100"
		  		layout="total, sizes, prev, pager, next, jumper"
		  		:total="400" style="margin-top:10px;margin-right:10px;">
		  		</el-pagination>
		  </div>
	  </el-tab-pane>
	</el-tabs>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[
				{checked:"",date: '2016-05-02', name: '王小虎1',  address: '上海市普陀区金沙江路 1518 弄'},
				{checked:"",date: '2016-05-02', name: '王小虎2',  address: '上海市普陀区金沙江路 1518 弄'},
				{checked:"",date: '2016-05-02', name: '王小虎3',  address: '上海市普陀区金沙江路 1518 弄'}]
			}
		}
	}
</script>

<style>
</style>
