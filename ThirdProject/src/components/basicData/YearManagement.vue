<template>
	<div>
		<div class="mianboby">
			<div style="">
				<el-button type="" @click="dialogFormVisible = true">新增</el-button>
				<el-dialog prop="theoryCenterId" :required="true" title="新增年届信息" v-model="dialogFormVisible">
				  <el-form :model="form">
				    <el-form-item prop="theoryCenterId" :required="true" label="年届名称:" :label-width="formLabelWidth">
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
			<el-table :data="tableData" border style="width: 80%;margin-left: 300px;">
				<el-table-column fixed prop="id" label="" width="95px">
					</el-table-column>
				<el-table-column fixed prop="yeartitle" label="年届名称" width="1200px">
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
				yeartitle:"2018"
				}, {
				id: '2',
				yeartitle:'2019'
				}, {
				id: '3',
				yeartitle:'2020'
				}, {
				id: '4',
				yeartitle:'2021'
				}],gridData: [{
			  date: '2016-05-02',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  date: '2016-05-04',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  date: '2016-05-01',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
			}, {
			  date: '2016-05-03',
			  name: '王小虎',
			  address: '上海市普陀区金沙江路 1518 弄'
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
	.mianboby {
			display: flex;
			justify-content: flex-end;
			align-content: center;
		}
		.el-table th>.cell {
		    display: inline-block;
		    box-sizing: border-box;
		    width: 100%;
			text-align: center;
		}
</style>
