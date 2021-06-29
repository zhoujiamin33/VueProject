<template>
	<div>
		<div style=" width:650px;">
			<el-button type="danger" @click="del(scope.row)" style="margin-left:-420px;margin-bottom: 20px;" icon="el-icon-minus">批量删除</el-button>
			<el-button @click="dialogFormVisible=true" type="primary" icon="el-icon-plus" >新增</el-button>
			<!-- 新增 -->
			<el-dialog title="添加培训时段" v-model="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="培训时段" :label-width="formLabelWidth">
						<el-input v-model="form.period" autocomplete="off"></el-input>
					</el-form-item>
					<!-- <el-form-item label="新增人" :label-width="formLabelWidth">
						<el-input v-model="form.addname" autocomplete="off"></el-input>
					</el-form-item> -->
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button type="primary" @click="addTrainingperiod">确 定</el-button>
					</span>
				</template>
			</el-dialog>
		</div>

		<!-- 修改 -->
		<el-dialog title="修改培训时段" v-model="dialogFormVisible2">
			<el-form :model="form">
				<el-form-item label="编号" :label-width="formLabelWidth">
					<el-input v-model="form.periodId" disabled></el-input> <!-- disabled 只读 -->
				</el-form-item>
				<el-form-item label="培训时间" :label-width="formLabelWidth">
					<el-input v-model="form.period" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="修改人" :label-width="formLabelWidth">
					<el-input v-model="form.addname" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible2 = false">取 消</el-button>
					<el-button type="primary" @click="updateTrainingperiod">确 定</el-button>
				</span>
			</template>
		</el-dialog>


		<!-- 表格 -->
		<div>
			<el-table :data="trainingperiodData" border style="width:100%;margin-left:10px;">
				<el-table-column prop="name" type="selection" align="center"> </el-table-column>
				<el-table-column fixed prop="periodId" label="编号"  align="center"> </el-table-column>
				<el-table-column prop="period" label="培训时段"  align="center"> </el-table-column>
				<el-table-column label="操作"  align="center">
					<template #default="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
						<el-button type="text" size="small" @click="delTrainingperiod(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
		<!-- 分页 -->
		<div style="margin-top:20px">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
			 :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import qs from "qs"
	import { ElMessage } from 'element-plus'
	export default {
		name: "PeriodVue",
		data() {
			return {
				pageInfo:{
					currentPage:1,  //标识当前页码
					pagesize:2,  //每页多少条数据
					total:0
				},
				trainingperiodData: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				formLabelWidth: '100px',
				form: {
					periodId: "",
					period: "",
					addname: "",
					updatename:""
				}
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			showEdit(row) {
				this.form.periodId = row.periodId
				this.form.period = row.period
				this.form.addname = row.addname
				this.dialogFormVisible2 = true
			},

			//增加
			addTrainingperiod() {
				const _this = this
				this.form.addname=this.$store.state.updateUserInfo.username
				this.axios.post("http://localhost:8089/threeproject/trainingperiod", this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						// _this.axios.get("http://localhost:8089/threeproject/findPage2",{
						// 	params:_this.pageInfo
						// })
						// .then(function(response){
						// 		_this.trainingperiodData=response.data.list
						// 		_this.pageInfo.total=response.data.total
						// 	}).catch(function(error) {
						// 		console.log(error)
						// })
						_this.dialogFormVisible=false
						_this.form={}
						_this.selectAllPeriod()
						ElMessage.success({
						   message: '新增成功',
						   type: 'success'
						})
					}).catch(function(error){
						console.log(error)
					})
			},

			//修改
			updateTrainingperiod() {
				const _this = this
				this.form=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/trainingperiod", this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						// var trainingperiod = response.data
						// var row = _this.trainingperiodData.filter(t => t.periodId == trainingperiod.periodId)[0]
						// row.period = trainingperiod.period
						// row.addname = trainingperiod.addname
						_this.dialogFormVisible2 = false
						_this.selectAllPeriod()
						this.$message({
						   message: '修改成功',
						   type: 'success'
						})
					}).catch(function(error) {
						console.log(error)
					})
			},
			//删除
			delTrainingperiod(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.delete("http://localhost:8089/threeproject/trainingperiod?periodId=" + row.periodId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				}).then(function(response) {
							_this.selectAllPeriod()
							this.$message({
							   message: '删除成功',
							   type: 'success'
							})
						}).catch(function(error) {
							console.log(error)
						})
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				});
			},
			selectAllPeriod(){
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findPage2",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.trainingperiodData=response.data.list
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			handleCurrentChange(currentPage){
				var _this=this
				this.pageInfo.currentPage=currentPage
				var ps=qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage2",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response.data)
					_this.trainingperiodData=response.data.list
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(pagesize){
				var _this=this
				this.pageInfo.pagesize=pagesize
				var ps=qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPage2",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response.data)
					_this.trainingperiodData=response.data.list
				}).catch(function(error){
					console.log(error)
				})
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findPage2",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.trainingperiodData=response.data.list
				_this.pageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>
</style>
