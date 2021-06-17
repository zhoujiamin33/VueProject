<template>
	<div>
		<div class="mianboby">
			<div>
				<el-button type="" @click="dialogFormVisible = true">新增</el-button>
				<el-dialog title="新增年届信息" v-model="dialogFormVisible">
					<el-form :model="form">
						<el-form-item label="年届名称:" :label-width="formLabelWidth">
							<el-input v-model="form.sessionName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="添加人名称:" :label-width="formLabelWidth">
							<el-input v-model="form.addname" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="addSession">新建并保存</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>

			</div>
			<el-dialog title="修改年届信息" v-model="dialogFormVisible2">
				<el-form :model="form">
					<el-form-item label="id" :label-width="formLabelWidth">
						<el-input v-model="form.sessionId" autocomplete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="年届名称" :label-width="formLabelWidth">
						<el-input v-model="form.sessionName" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="修改人名称" :label-width="formLabelWidth">
						<el-input v-model="form.addname" autocomplete="off"></el-input>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible2 = false">取 消</el-button>
						<el-button type="primary" @click="updateSession()">确 定</el-button>
					</span>
				</template>
			</el-dialog>
		</div>

		<div>
			<el-table :data="SessionDate" border>
				<el-table-column fixed prop="sessionId" label="" width="95px">
				</el-table-column>

				<el-table-column fixed prop="sessionName" label="年届名称" width="">
				</el-table-column>
				<el-table-column label="操作" width="130">
					<template #default="scope">
						<!-- #default="scope"  作用域插槽 -->
						<el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
						<!-- <el-button type="text" size="small" @click="delDept(scope.row)">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize"
				layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
			</el-pagination>
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
				SessionDate: [],
				dialogFormVisible2: false,
				dialogFormVisible: false,
				formLabelWidth: '100px',
				form: {
					sessionId: "",
					sessionName: "",
					addname: ""
				},
				formLabelWidth: '120px'
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			addSession() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/Session", this.form)
				this.axios.get("http://localhost:8089/threeproject/findPageSession", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response)
						var session = response.data
						_this.SessionDate.push(session)
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateSession() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/Session", this.form)
					.then(function(response) {
						var session = response.data
						console.log("session:%o", session)
						var row = _this.SessionDate.filter(d => d.sessionId == session.sessionId)[0]
						console.log("---------:%o", row)
						row.sessionName = session.sessionName
						console.log("-----------3")
						row.addname = session.addname
						_this.dialogFormVisible2 = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.form.sessionId = row.sessionId
				this.form.sessionName = row.sessionName
				this.form.addname = row.addname
				this.dialogFormVisible2 = true
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPageSession", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SessionDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPageSession", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SessionDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			const _this = this
			// this.axios.get("http://localhost:8089/threeproject/findSessions")
			// 	.then(function(response) {
			// 		_this.SessionDate = response.data
			// 		console.log(response)
			// 	}).catch(function(error) {
			// 		console.log(error)
			// 	})
			this.axios.get("http://localhost:8089/threeproject/findPageSession", {
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.SessionDate = response.data.list
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