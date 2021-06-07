<template>
	<div style="margin-bottom: 20px;">
		<router-link to="/loginRestrictions"><el-button style="margin-right: 10px;">已限制用户</el-button></router-link>
		<router-link to="/loginRestrictions2"><el-button>未限制用户</el-button></router-link>
	</div>
	<div style="margin-bottom: 30px;">
		<el-button @click="open()">取消限制</el-button>
	</div>
	<el-table :data="Stutable" border>
		<el-table-column prop="studentId" label="Id">
		</el-table-column>
		<el-table-column type="selection">
		</el-table-column>
		<el-table-column prop="studytime" label="编码">
		</el-table-column>
		<el-table-column prop="studentName" label="姓名">
		</el-table-column>
		<el-table-column prop="address" label="部门">
		</el-table-column>
		<el-table-column prop="studentPhone" label="职位">
		</el-table-column>
		<el-table-column prop="studentState" label="移动电话">
		</el-table-column>
		<el-table-column prop="index" label="办公电话">
		</el-table-column>
		<el-table-column prop="index" label="Email地址">
		</el-table-column>
	</el-table>
	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			open() {
				        this.$confirm('确定要取消限制吗?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          this.$message({
				            type: 'success',
				            message: '取消限制成功!'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消限制'
				          });
				        });
				      }
			
		}
	}
</script>

<style>
</style>
