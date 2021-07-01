<template>
	<div>
		<el-button @click="dialogFormVisible=true" style="float: right;margin-bottom: 20px;">新增</el-button>
		<el-table :data="tableData" border>
			<el-table-column fixed prop="bookId" label="教材编号"> </el-table-column>
			<el-table-column prop="kuang" type="selection"> </el-table-column>
			<el-table-column prop="bookname" label="教材名称"> </el-table-column>
			<el-table-column prop="deliverycount" label="库存"> </el-table-column>
			<el-table-column prop="booksprice" label="教材售价"> </el-table-column>
			<el-table-column prop="bookjprice" label="教材进价"> </el-table-column>
			<el-table-column prop="safestock" label="安全库存"> </el-table-column>
			<el-table-column prop="press" label="出版社"> </el-table-column>
			<el-table-column label="操作" width="120">
				<template #default="scope">
					<el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" @click="delBook(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="添加教材" v-model="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="教材名称: " style="margin-left: 200px;">
					<el-input v-model="form.bookname" style="margin-left: -200px;"></el-input>
				</el-form-item>
				<el-form-item label="库存: " style="margin-left: 228px;">
					<el-input v-model="form.deliverycount" style="margin-left: -200px;"></el-input>
				</el-form-item>
				<el-form-item label="教材售价: " style="margin-left: 200px;">
					<el-input v-model="form.booksprice" style="margin-left: -200px;"></el-input>
				</el-form-item>
				<el-form-item label="教材进价: " style="margin-left: 200px;">
					<el-input v-model="form.bookjprice" style="margin-left: -200px;"></el-input>
				</el-form-item>
				<el-form-item label="安全库存: " style="margin-left: 200px;">
					<el-input v-model="form.safestock" style="margin-left: -200px;"></el-input>
				</el-form-item>
				<el-form-item label="出版社: " style="margin-left: 215px;">
					<el-input v-model="form.press" style="margin-left: -200px;"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="addBook">确 定</el-button>
				</span>
			</template>
		</el-dialog>

		<!-- 修改 -->
		<el-dialog title="修改入库" v-model="xgrk">
			<template #footer>
				<span class="dialog-footer">
					<el-button style="margin-left: -100px;" type="primary" @click="upeBook">保 存</el-button>
					<el-button @click="xgrk=false">关 闭</el-button>
				</span>
			</template>
			<el-form :model="form" label-width="80px" size="mini">
				<el-form-item label="教材名称 :" style="margin-left: 170px;">
					<el-input style="width: 300px;margin-left: -148px;" v-model="form.bookname" clearable></el-input>
				</el-form-item>
				<el-form-item label="库存 :" style="margin-left: 170px;">
					<el-input style="width: 300px;margin-left: -148px;" v-model="form.deliverycount" clearable></el-input>
				</el-form-item>
				<el-form-item label="教材售价 :" style="margin-left: 170px;">
					<el-input style="width: 300px;margin-left: -148px;" v-model="form.booksprice" clearable></el-input>
				</el-form-item>
				<el-form-item label="教材进价 :" style="margin-left: 170px;">
					<el-input style="width: 300px;margin-left: -148px;" v-model="form.bookjprice" clearable></el-input>
				</el-form-item>
				<el-form-item label="安全库存 :" style="margin-left: 170px;">
					<el-input style="width: 300px;margin-left: -148px;" v-model="form.safestock" clearable></el-input>
				</el-form-item>
				<el-form-item label="出版社 :" style="margin-left: 170px;">
					<el-input style="width: 300px;margin-left: -148px;" v-model="form.press" clearable></el-input>
				</el-form-item>
			</el-form>
			
		</el-dialog>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
		 :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
		</el-pagination>
	</div>
</template>

<script>
	import qs from "qs"
	export default {
		name: "Book",
		data() {
			return {
				pageInfo: {
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				tableData: [],
				dialogFormVisible: false,
				form: {
					bookId: "",
					bookname: "",
					deliverycount: "",
					booksprice: "",
					bookjprice: "",
					safestock: "",
					press: ""
				},
				xgrk: false
			}
		},
		methods: {
			showEdit(row) {
				this.form.bookId = row.bookId
				this.form.bookname = row.bookname
				this.form.deliverycount = row.deliverycount
				this.form.booksprice = row.booksprice
				this.form.bookjprice = row.bookjprice
				this.form.safestock = row.safestock
				this.form.press = row.press
				this.xgrk = true
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage3", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPage3", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			//增加
			addBook() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/addBook", this.form, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPage3", {
								headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
								},
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},

			//删除
			delBook(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.delete("http://localhost:8089/threeproject/deleteBook?bookId=" + row.bookId, {
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token,
							}
						})
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findPage3", {
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									},
									params: _this.pageInfo
								})
								.then(function(response) {
									_this.tableData = response.data.list
									_this.pageInfo.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							var book = response.data
							var rows = _this.tableData
								.filter(t => t.bookId != row.bookId)
							_this.tableData = rows
							for (var key in _this.form) {
								delete _this.form[key]
							}
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


			//修改
			upeBook() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/upeBook", this.form, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						var book = response.data
						console.log(response.data)
						var row = _this.tableData.filter(t => t.bookId == book.bookId)[0]
						row.bookname = book.bookname
						row.deliverycount = book.deliverycount
						row.booksprice = book.booksprice
						row.bookjprice = book.bookjprice
						row.safestock = book.safestock
						row.press = book.press
						_this.xgrk = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findPage3", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
					params: this.pageInfo
				})
				.then(function(response) {
					_this.tableData = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
</style>
