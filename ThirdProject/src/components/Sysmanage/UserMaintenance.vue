<template>
	<!-- 职位 -->
		<div class="mian">
				<div class="mainbody" style="width: 100%;">
					<span style="margin-top: 10px;width: 90px;">所属部门：</span>
					<el-select v-model="select">
					
					</el-select>
					<span style="margin-top: 10px;width: 90px;">快速检索：</span>
						<el-select v-model="select">
							<el-option label="用户编码" value="1"></el-option>
							<el-option label="姓名" value="2"></el-option>
							<el-option label="性别" value="3"></el-option>
							<el-option label="状态" value="4"></el-option>
							<el-option label="移动电话" value="5"></el-option>
							<el-option label="办公电话" value="6"></el-option>
							<el-option label="职位" value="7"></el-option>
							<el-option label="角色" value="8"></el-option>
							
						</el-select>
			
						<el-input placeholder="请输入内容" v-model="pageInfo.query" style="width: 100px;" clearable
							@clear="serchVal">
						
						</el-input>
						<el-button><i class="el-icon-search"></i></el-button>
				</div>
				<div style="margin-bottom: 30px;">
					<el-button>新增</el-button>
					<el-button @click="qidong()">启动</el-button>
					<el-button @click="jiny()">禁用</el-button>
					<el-button @click="del()">删除</el-button>
					<el-button>导入</el-button>
					<el-button>导出</el-button>
				</div>
				
			
				<el-table :data="tableData" border>
					<el-table-column prop="empId" label="Id">
					</el-table-column>
					<el-table-column type="selection">
					</el-table-column>
					<el-table-column prop="deptName" label="编码">
					</el-table-column>
					<el-table-column prop="empName" label="姓名">
					</el-table-column>
					<el-table-column prop="empSex" label="性别">
					</el-table-column>
					<el-table-column prop="deptId" label="部门">
					</el-table-column>
					<el-table-column prop="positionId" label="职位">
					</el-table-column>
					<el-table-column prop="juese" label="角色">
					</el-table-column>
					<el-table-column prop="empPhone" label="移动电话">
					</el-table-column>
					<el-table-column prop="workersstate" label="状态">
					</el-table-column>
					<el-table-column prop="addtime" label="建档日期">
					</el-table-column>
					<el-table-column prop="index" label="操作">
						<el-button>附加角色</el-button>
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
					 qidong() {
					        this.$confirm('确定要对选择启动吗?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(() => {
					          this.$message({
					            type: 'success',
					            message: '启动成功!'
					          });
					        }).catch(() => {
					          this.$message({
					            type: 'info',
					            message: '已取消启动'
					          });
					        });
					      },
						  jiny() {
						  	this.$confirm('确定要对该选择禁用吗?', '提示', {
						  		confirmButtonText: '确定',
						  		cancelButtonText: '取消',
						  		type: 'warning'
						  	}).then(() => {
						  		this.$message({
						  			type: 'success',
						  			message: '禁用成功!'
						  		});
						  	}).catch(() => {
						  		this.$message({
						  			type: 'info',
						  			message: '已取消禁用'
						  		});
						  	});
						  },
						  del() {
						  	this.$confirm('确定要删除该学员吗?', '提示', {
						  		confirmButtonText: '确定',
						  		cancelButtonText: '取消',
						  		type: 'warning'
						  	}).then(() => {
						  		this.$message({
						  			type: 'success',
						  			message: '删除成功!'
						  		});
						  	}).catch(() => {
						  		this.$message({
						  			type: 'info',
						  			message: '已取消删除'
						  		});
						  	});
						  },
						  
				},
				created() {
					const _this = this;
					this.axios.get("http://localhost:8089/student/findstudent")
						.then(function(response) {
							_this.tableData = response.data
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			}
		</script>
		
		<style>
			.mian {
				margin: 0px;
				padding: 0px;
			}
		
			.mainbody {
				font-size: 20px;
				padding: 10px 0;
				/* margin-right: 320px; */
		
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
		
	

