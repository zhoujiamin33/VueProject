<template>
	<!-- 停课 -->
	<div class="mian">
			<div class="mainbody">
				<div style="margin-right: 320px;display: flex;">
					<span style="margin-top: 10px;width: 90px;">快速检索：</span>
					<el-select v-model="pageInfo.index" placeholder="请选择">
						<el-option label="班级" value="班级"></el-option>
						<el-option label="姓名" value="姓名"></el-option>
						<el-option label="学号" value="学号"></el-option>
					</el-select>
		
					<el-input placeholder="请输入内容" v-model="pageInfo.value" style="width: 100px;" clearable
						@clear="serchVal">
					</el-input>
				</div>
				<div style="display: flex;">
					<el-button @click="showsupende">查询</el-button>
					<el-button @click="tgsp">通过审批</el-button>
					<el-button @click="del">删除</el-button>
				</div>
			</div>
		
			<el-table :data="SuspendeData" border @selection-change="handleSelectionChange" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column prop="suspendeId" label="Id">
				</el-table-column>
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="suspendeTime" label="停课日期">
				</el-table-column>
				<el-table-column prop="student.studentNumber" label="学号">
				</el-table-column>
				<el-table-column prop="student.studentName" label="姓名">
				</el-table-column>
				<el-table-column prop="classes.classesName" label="班级名称">
				</el-table-column>
				<el-table-column prop="suspendeReason" label="理由">
				</el-table-column>
				<el-table-column prop="suspendeHandler" label="经办人">
				</el-table-column>
				<el-table-column prop="suspendeApproval" label="状态">
					<template v-slot="scope">
						<p v-if="scope.row.suspendeApproval==0"><i class=" el-icon-s-custom" style="font-size: 25px; "></i></p>
					<p v-if="scope.row.suspendeApproval==1"><i class=" el-icon-s-custom" style="font-size: 25px; color: red"></i></p>
					</template>
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
		import qs from 'qs'
		export default {
			data() {
				return {
					select: "",
					SuspendeData: [],
					//请求用户列表的参数
					pageInfo: {
						index:'',
						value: '',
						currentPage: 1,
						pagesize: 3,
						total: 0
					},
					chektable:[]//保存选择的选项
					      
				}
			},
			methods: {
				// 被复选框选中获取到的值
				handleSelectionChange(row) {
					console.log(row)
					this.chektable = row;
				},
				tgsp() {
					const _this=this
					this.$confirm('确定要审批通过吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (_this.chektable.length == 0) {
							_this.$message({
								showClose: true,
								message: '请选择审批的学员!',
								type: 'error'
							});
						} else {
							var ids=_this.chektable.map(item =>item.suspendeId).join()
								_this.updateapproval(ids)
							_this.$message({
								type: 'success',
								message: '审批成功!'
							});
						}
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消审批'
						});
					});
				},
				del() {
					const _this=this
					this.$confirm('确定要删除该学员吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (_this.chektable.length == 0) {
							_this.$message({
								showClose: true,
								message: '请选择删除内容!',
								type: 'error'
							});
						} else {
							var ids=_this.chektable.map(item =>item.suspendeId).join()
								_this.delsuspend(ids)
							_this.$message({
								type: 'success',
								message: '删除成功!'
							});
						}
						
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				},
				//审批
				updateapproval(suspendeId){
					const _this = this;
					this.axios.put("http://localhost:8089/threeproject/updateapproval/"+suspendeId)
						.then(function(response) {
							_this.showsupende()
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				},
				//删除
				delsuspend(suspendeId){
					const _this = this;
					this.axios.put("http://localhost:8089/threeproject/delsuspend/"+suspendeId)
						.then(function(response) {
							_this.showsupende()
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				},
				// 分页
				handleCurrentChange(currentPage) {
					var _this = this
					this.pageInfo.currentPage = currentPage
					var ps = qs.stringify(this.pageInfo)
					console.log(ps)
					this.showsupende()
				},
				handleSizeChange(pagesize) {
					var _this = this
					this.pageInfo.pagesize = pagesize
					var ps = qs.stringify(this.pageInfo)
					console.log(ps)
					this.showsupende()
				},
				showsupende(){
					const _this = this;
					this.axios.get("http://localhost:8089/threeproject/findAllsuspende",{params:this.pageInfo})
						.then(function(response) {
							_this.SuspendeData= response.data.list
							_this.pageInfo.total = response.data.total
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				}
			},
			created() {
				this.showsupende()
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
	
