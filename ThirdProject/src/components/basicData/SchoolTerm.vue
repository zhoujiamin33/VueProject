<template>
	<div>
		<div class="mianboby" >
			<div>
				<el-button type="" @click="dialogFormVisible = true">新增</el-button>
				<el-dialog title="新增学期信息" v-model="dialogFormVisible">
					<el-form :model="form">
						<el-form-item label="学期名称:" :label-width="formLabelWidth">
							<el-input v-model="form.semesterName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="添加人名称:" :label-width="formLabelWidth">
							<el-input v-model="form.addname" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="addSemester">新建并保存</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
			<el-dialog title="修改学期信息" v-model="dialogFormVisible2">
				<el-form :model="form">
					<el-form-item label="id" :label-width="formLabelWidth">
						<el-input v-model="form.semesterId" autocomplete="off" disabled></el-input>
					</el-form-item>

					<el-form-item label="学期名称" :label-width="formLabelWidth">
						<el-input v-model="form.semesterName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="修改人名称" :label-width="formLabelWidth">
						<el-input v-model="form.addname" autocomplete="off"></el-input>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible2 = false">取 消</el-button>
						<el-button type="primary" @click="updateSemester()">确 定</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
		<div>
			<el-table :data="SemesterDate" border>
				<el-table-column fixed prop="semesterId" label="" width="95px">
				</el-table-column>
				<el-table-column fixed prop="semesterName" label="学期名称" width="">
				</el-table-column>
				<el-table-column label="操作" width="130">
					<template #default="scope">
						<!-- #default="scope"  作用域插槽 -->
						<el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
						<!-- <el-button type="text" size="small" @click="delDept(scope.row)">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageInfo.currentPage" :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize"
					layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import qs from "qs"
	export default {
		data() {
			return {
				pageInfo: {
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				SemesterDate: [],
				dialogFormVisible2: false,
				dialogFormVisible: false,
				formLabelWidth: '100px',
				form: {
					semesterId: "",
					semesterName: "",
					addname: ""
				},
				formLabelWidth: '120px'
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			addSemester() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/Semester", this.form)
					.then(function(response) {
						console.log(response)
						var semester = response.data
						_this.SemesterDate.push(semester)
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateSemester() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/Semester", this.form)
					.then(function(response) {
						var semester = response.data
						console.log("semester:%o", semester)
						var row = _this.SemesterDate.filter(d => d.semesterId == semester.semesterId)[0]
						console.log("---------:%o", row)
						row.semesterName = semester.semesterName
						console.log("-----------3")
						row.addname = semester.addname
						_this.dialogFormVisible2 = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.form.semesterId = row.semesterId
				this.form.semesterName = row.semesterName
				this.form.addname = row.addname
				this.dialogFormVisible2 = true
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SemesterDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPage", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SemesterDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			}


		},
		created() {
			const _this = this
			// this.axios.get("http://localhost:8089/threeproject/findSemesters")
			// 	.then(function(response) {
			// 		_this.SemesterDate = response.data
			// 		console.log(response)
			// 	}).catch(function(error) {
			// 		console.log(error)
			// 	}),
			this.axios.get("http://localhost:8089/threeproject/findPageSemester", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.SemesterDate = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
		}




	}
</script>

<style>
	.mianboby {
		display: flex;
		justify-content: flex-end;
		/* align-content: center; */
	}

	/* .el-table th>.cell {
	    display: inline-block;
	    box-sizing: border-box;
	    width: 100%;
		text-align: center;
	} */
</style>
