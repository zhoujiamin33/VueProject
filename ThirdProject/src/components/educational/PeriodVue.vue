<template>
	<div>
		<div style=" width:650px;margin-left: -140px;">
			开课时段：
			<el-input placeholder="请输入内容" v-model="input"  clearable style="width: 150px"> </el-input>
			<el-row style="margin-left: 450px;margin-top: -40px;">
			  <el-button >新增</el-button>
			</el-row>
		</div>
		<!-- 表格 -->
		<div>
			<el-table :data="tableData" stripe style="width: 80%;margin-left:90px;">
				<el-table-column prop="name" type="selection" width="180"> </el-table-column>
			    <el-table-column prop="date"  label="编号"  width="180"> </el-table-column>
			    <el-table-column prop="address" label="培训时段"> </el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
				  <template #default="scope">
				    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
					<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
				  </template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
	export default{
		name:"period",
		data(){
			return{
				input:"",
				tableData:[{date: '2016-05-02',checked:"", name: '王小虎',  province: '上海'}]
			}
		}
	}
</script>

<style>
</style>
