<template>
	<div style="margin-bottom: 10px;display: flex;">
		<span style="margin-top: 10px;">开始时间：</span>
		  <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" ></el-date-picker>
		  <span style="margin-top: 10px;">截至时间：</span>
		    <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" ></el-date-picker>
			<span style="margin-top: 10px;">操作人员：</span>
			<el-input placeholder="请输入内容" v-model="form.query" style="width: 100px;" clearable
				@clear="serchVal">
			</el-input>
		<!-- 	<span>登录入口：</span>
			<el-select v-model="form.select">
				<el-option label="全部" value="1"></el-option>
				<el-option label="pc" value="2"></el-option>
			</el-select> -->
	</div>
	<div style="margin-bottom: 30px;display: flex;">
		<el-button type="primary" >查询</el-button>
		<el-button type="primary">重置</el-button>
		<el-button type="primary" >删除</el-button>
	</div>


	<el-table :data="Opjournal" border :header-cell-style="{background:'#eef1f6',color:'#606266'}" >
		<el-table-column type="selection">
		</el-table-column>
		<el-table-column prop="opjournalId" label="Id">
		</el-table-column>
	
		<el-table-column prop="empId" label="用户编码">
		</el-table-column>
		<el-table-column prop="emp.empName" label="操作人员">
		</el-table-column>
		<el-table-column prop="optime" label="操作日期">
		</el-table-column>
		<el-table-column prop="opcontent" label="操作模块名称">
		</el-table-column>
	</el-table>
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
						layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
					</el-pagination>
				</div>
</template>

<script>
	import qs from 'qs'
	export default{
		data(){
			return{
				form:{
					date1:'',
					date2:'',
					query:'',
					select:''
				},
				Opjournal:[],
				pageInfo: {
					index: '', //下拉框选项
					value: '', //值
					currentPage: 1,
					pagesize: 3,
					total: 0,
				},
			}
		},
		methods:{
			// 分页
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.selectName()
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.selectName()
			},
			selectName(){
					const _this = this;
				this.axios.get("http://localhost:8089/threeproject/findopjournal",
					{
						params: this.pageInfo,
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
					}
					})
						.then(function(response) {
							_this.Opjournal = response.data.list
							_this.pageInfo.total = response.data.total
							console.log("++++++++++++++++++++++++++++++++++++++")
						
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			
		},
		created(){
		
			this.selectName()
			}
	}
</script>

<style>
	span{
	font-size: 12px;
		font-weight: 400;
	}
</style>
