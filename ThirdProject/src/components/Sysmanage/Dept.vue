<template>
	<!-- 职位 -->
		<div class="mian">
				<div class="mainbody" style="width: 100%;">
					<span style="margin-top: 10px;width: 90px;">快速检索：</span>
						<el-select v-model="select">
							<el-option label="职位名称" value="1" ></el-option>
							<el-option label="职位描述" value="2"></el-option>
						</el-select>
			
						<el-input placeholder="请输入内容" v-model="pageInfo.query" style="width: 100px;" clearable
							@clear="serchVal">
						
						</el-input>
						<el-button><i class="el-icon-search"></i></el-button>
				</div>
				<div style="margin-bottom: 30px;">
					<el-button @click="dialogFormVisible=true">新增</el-button>
				</div>
				
			
				<el-table :data="tableData" border>
					<el-table-column prop="deptId" label="Id">
					</el-table-column>
					<el-table-column prop="deptName" label="职位名称">
					</el-table-column>
					<el-table-column prop="ms" label="职位描述">
					</el-table-column>
				</el-table>
			
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
						:current-page="pageInfo.currentPage" :page-sizes="[2, 3, 6, 10]" :page-size="pageInfo.pagesize"
						layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
					</el-pagination>
				</div>
			</div>
			<el-dialog title="新增学员" v-model="dialogFormVisible">
				<el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
					<el-form-item label="职位名称:" prop="studentName" label-width="90px" required>
						<el-input v-model="addForm.deptName"></el-input>
					</el-form-item>
					<el-form-item label="职位描述:" prop="sex" label-width="90px">
						<el-input v-model="addForm.describe"></el-input>
					</el-form-item>
					<el-form-item label="职位职责:" prop="sex" label-width="90px">
						<el-input v-model="addForm.duty"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="Addstudent">确 定</el-button>
					</span>
				</template>
			</el-dialog>
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
							deptName:'',
							describe:'',
							duty:''
						},
						 dialogFormVisible: false,
						 dialogFormupdate:false,
						      
					}
				},
				methods: {
					getstudentList() {
		
					},
					 open() {
					        this.$confirm('确定要对选择办理退卡吗?', '提示', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'warning'
					        }).then(() => {
					          this.$message({
					            type: 'success',
					            message: '办理成功!'
					          });
					        }).catch(() => {
					          this.$message({
					            type: 'info',
					            message: '已取消办理'
					          });
					        });
					      }
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
		
	

