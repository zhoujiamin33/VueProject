<template>
	<!-- 转班 -->
<div class="mian">
		<div class="mainbody">
			<div style="margin-right: 320px;display: flex;">
			<span style="margin-top: 10px;width: 90px;">快速检索：</span>
				<el-select v-model="select" placeholder="请选择">
					<el-option label="姓名" value="1"></el-option>
					<el-option label="学号" value="2"></el-option>
					<el-option label="原班级" value="3"></el-option>
					<el-option label="转入班" value="4"></el-option>
				</el-select>
	
				<el-input placeholder="请输入内容" v-model="pageInfo.query" style="width: 100px;" clearable
					@clear="serchVal">
				</el-input>
			</div>
			<div style="display: flex;">
				<el-button @click="getstudentList">查询</el-button>
				<el-button @click="tgsp()">通过审批</el-button>
				<el-button @click="qxzb()">取消转班</el-button>
			</div>
		</div>
	
		<el-table :data="tableData" border>
			<el-table-column prop="studentId" label="Id">
			</el-table-column>
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column prop="studytime" label="补报日期">
			</el-table-column>
			<el-table-column prop="studentName" label="姓名">
			</el-table-column>
			<el-table-column prop="address" label="课程名称">
			</el-table-column>
			<el-table-column prop="studentPhone" label="课程费用">
			</el-table-column>
			<el-table-column prop="studentState" label="实际收费">
			</el-table-column>
			<el-table-column prop="studentState" label="扣课实数">
			</el-table-column>
			<el-table-column prop="studentState" label="备注">
			</el-table-column>
			<el-table-column prop="studentState" label="课程顾问">
			</el-table-column>
			<el-table-column prop="studentState" label="录入人">
			</el-table-column>
			<el-table-column prop="studentState" label="状态">
			</el-table-column>
			<el-table-column prop="index" label="操作">
				<!-- <template #default="scope">
					<el-button type="text">补报</el-button>
					<el-button type="text" @click="dialogFormupdate= true">修改</el-button>
					<el-button type="text">查看</el-button>
				</template> -->
			</el-table-column>
		</el-table>
	
		<div class="block">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				select: "",
				//用户列表
				// {id:1,schoolName:"大河东",AddTime:"2020-02-03",StudentName:"小红",address:"地点",phone:"18985748576",State:"是"}
				tableData: [],
				//请求用户列表的参数
				pageInfo: {
					query: '',
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				addForm:{
					name:'',
					Student_Phone:'',
					ParentName:'',
					Entrance:'',
					address:'',
				},
				 dialogFormVisible: false,
				 dialogFormupdate:false,
				      
			}
		},
		methods: {
			getstudentList() {

			},
			tgsp() {
				this.$confirm('确定要审批通过吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '审批通过!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消审批'
					});
				});
			},
			qxzb() {
				this.$confirm('确定要取消转班吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '取消转班成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消转班'
					});
				});
			}
			
		},
		created() {
			// const _this = this;
			// this.axios.get("http://localhost:8089/student/findstudent")
			// 	.then(function(response) {
			// 		_this.tableData = response.data
			// 		console.log(response)
			// 	}).catch(function(error) {
			// 		console.log(error)
			// 	})
		}
	}
</script>

<style>
	.mian {
		margin: 0px;
		padding: 0px;
	}

	.mainbody {
		display: flex;
		font-size: 20px;
		float: left;
		padding: 10px 0;

	}

	.block {
		/* position: relative; */
		align-items: center;
		margin-left: 30%;
	}
	span{
	font-size: 12px;
		font-weight: 400;
	}
</style>


