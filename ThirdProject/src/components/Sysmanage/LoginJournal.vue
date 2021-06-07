<template>
	<div style="margin-bottom: 10px;">
		<el-button>登录日志汇总</el-button>
		<el-button>登录日志明细</el-button>
		<el-button>操作日志明细</el-button>
	</div>
	<div style="margin-bottom: 10px;">
		<span>开始时间：</span>
		  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" ></el-date-picker>
		  <span>截至时间：</span>
		    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" ></el-date-picker>
			<span>操作人员：</span>
			<el-input placeholder="请输入内容" v-model="form.query" style="width: 100px;" clearable
				@clear="serchVal">
			</el-input>
			<span>登录入口：</span>
			<el-select v-model="form.select">
				<el-option label="全部" value="1"></el-option>
				<el-option label="pc" value="2"></el-option>
			</el-select>
	</div>
	<div style="margin-bottom: 30px;">
		<el-button >查询</el-button>
		<el-button >重置</el-button>
		<el-button >导出</el-button>
	</div>
	<el-table :data="tableData" border>
		<el-table-column prop="empId" label="Id">
		</el-table-column>
		<el-table-column type="selection">
		</el-table-column>
		<el-table-column prop="deptName" label="用户编码">
		</el-table-column>
		<el-table-column prop="empName" label="用户名称">
		</el-table-column>
		<el-table-column prop="empSex" label="登录次数">
		</el-table-column>
	</el-table>
				
</template>

<script>
	export default{
		data(){
			return{
				form:{
					date1:'',
					date2:'',
					query:'',
					select:''
				}
			}
		}
	}
</script>

<style>
	span{
	font-size: 12px;
		font-weight: 400;
	}
</style>
