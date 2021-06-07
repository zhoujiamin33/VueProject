<template>
	<div>
		<div class="mianboby">
			<div style="">
				<el-button type="" @click="dialogFormVisible = true" style="margin-left: 1200px;">新增</el-button>
				<el-dialog prop="theoryCenterId" :required="true" title="新增学期信息" v-model="dialogFormVisible">
				  <el-form :model="form">
				    <el-form-item prop="theoryCenterId" :required="true" label="学期名称:" :label-width="formLabelWidth">
				      <el-input v-model="form.name" autocomplete="off"></el-input>
				    </el-form-item>
				  </el-form>
				  <template #footer>
				    <span class="dialog-footer">
						<el-button type="primary" @click="dialogFormVisible = false">新建并保存</el-button>
						<el-button @click="dialogFormVisible = false">取 消</el-button>
				    </span>
				  </template>
				</el-dialog>
			</div>
		</div>
		<div>	
		<el-table :data="tableData" border style="width: 80%;margin-left: 200px;">
			<el-table-column fixed prop="id" label="" width="95px">
				</el-table-column>
			<el-table-column fixed prop="termname" label="学期名称" width="1200px">
			</el-table-column>
		</el-table>		
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [{
					id: '1',
					termname:"春季"
					
				}, {
					id: '2',
					termname:'夏季'
				}, {
					id: '3',
					termname:'秋季'
				}, {
					id: '4',
					termname:'冬季'
				}],	
				dialogTableVisible: false,
				dialogFormVisible: false,
				form: {
				  name: '',
				  region: '',
				  date1: '',
				  date2: '',
				  delivery: false,
				  type: [],
				  resource: '',
				  desc: ''
				},
				formLabelWidth: '120px'	
					
			}
		}
	}
</script>

<style>
</style>
