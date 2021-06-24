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
		<div style="position: relative;margin-top: 50px;"  >
			<el-table :data="tableData"  border style="width:100%;margin-left:10px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column fixed  type="selection"> </el-table-column>
			    <el-table-column fixed prop="refundId" label="缴费编号" align="center"> </el-table-column>
				<el-table-column  prop="refundtype" label="退费类型" align="center"> </el-table-column>
				<el-table-column prop="student.studentName" label="退费学员" align="center"> </el-table-column>
			    <el-table-column prop="dropMoney" label="回退金额" align="center"> </el-table-column>
			    <el-table-column prop="addname" label="退费办理人" align="center"> </el-table-column>
			    <el-table-column prop="addtime"  label="退费日期"  align="center"> </el-table-column>
			    
			    <el-table-column fixed="right" label="操作" align="center">
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
				tableData:[]
			}
		},
		created(){
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/selectAllRefund")
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
