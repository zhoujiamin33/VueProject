<template>
	<div>
		<div class="a">
			<b class="b" style="font-size: 15px;margin-left: -512px;">快速检索：</b>
			<el-select style="margin-bottom: 8px;" v-model="value" placeholder="请选择">
				<el-option label="教材名" value="教材名"></el-option>
				<el-option label="入库人" value="入库人"></el-option>
			</el-select>
			<el-input style="width: 180px;" v-model="input" placeholder="请输入内容" clearable></el-input>
			<el-button style="float:right;margin-left: 10px;">导出</el-button>
			<el-button style="float:right">删除</el-button>
			<el-button style="float:right" @click="jcrk = true">教材入库</el-button>
			<el-button style="float:right;" @click="selectBookstorage">查询</el-button>

			<!-- 新增 -->
			<el-dialog title="教材入库" width="47%" v-model="jcrk">
				<el-form :model="form" label-width="80px" size="mini">
					<el-form-item label="教材名称 :" style="margin-left: 170px;">
						<el-select style="margin-left: -160px;width: 300px;" v-model="form.bookId" placeholder="请选择" autocomplete="off">
							<el-option v-for="item in bookdata" :key="item.value" :label="item.bookname" :value="item.bookId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="入库数量 :" style="margin-left: 170px;">
						<el-input style="width: 300px;margin-left: -148px;" v-model="form.storagecount" placeholder="" clearable></el-input>
						<b style="font-weight: 100;">本</b>
					</el-form-item>
<!-- 					<el-form-item label="入库时间 :" style="margin-left: 170px;">
						<el-date-picker v-model="form.storagetime" type="date" placeholder="选择日期" style="width: 300px;margin-left: -160px;">
						</el-date-picker>
					</el-form-item> -->
				</el-form>
				<template #footer>
					<span class="dialog-footer" style="position: absolute;left: 300px;top: 180px;">
						<el-button  type="primary" @click="addBookstorage">保 存</el-button>
						<el-button @click="jcrk=false">关 闭</el-button>
					</span>
				</template>
			</el-dialog>

			<!-- 修改 -->
			<el-dialog title="修改入库" v-model="xgrk">
				<el-form :model="form" label-width="80px" size="mini" >
					<el-form-item label="教材名称 :" style="margin-left: 170px;">
						<el-select style="margin-left: -160px;width: 300px;" v-model="form.bookId" placeholder="请选择" autocomplete="off" disabled>
							<el-option v-for="item in bookdata" :key="item.value" :label="item.bookname" :value="item.bookId">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="入库数量 :" style="margin-left: 170px;">
						<el-input style="width: 300px;margin-left: -148px;" v-model="form.storagecount" placeholder="" clearable></el-input>
						<b style="font-weight: 100;">本</b>
					</el-form-item>
<!-- 					<el-form-item label="入库时间 :" style="margin-left: 170px;">
						<el-date-picker v-model="form.storagetime" type="date" placeholder="选择日期" style="width: 300px;margin-left: -160px;">
						</el-date-picker>
					</el-form-item> -->
					<el-form-item size="large">
						<el-button type="primary" style="margin-left: -100px;" @click="updateBookstorage">更新</el-button>
						<el-button @click="xgrk=false">关闭</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>


			
		</div>
		<div>
			<el-table :data="tableData" stripe border style="width: 100%">
				<el-table-column type="index" width="50" align="center">
				</el-table-column>
				<el-table-column type="selection" width="50" align="center">
				</el-table-column>
				<el-table-column prop="mbookstorageId" label="教材编号" align="center">
				</el-table-column>
				<el-table-column prop="book.bookname" label="教材名称" align="center">
				</el-table-column>
				<el-table-column prop="book.bookjprice" label="进价" align="center">
				</el-table-column>
				<el-table-column prop="book.booksprice" label="售价" align="center">
				</el-table-column>
				<el-table-column prop="storagecount" label="入库量" align="center">
				</el-table-column>
				<el-table-column prop="book.deliverycount" label="库存量" align="center">
				</el-table-column>
				<el-table-column prop="book.safestock" label="安全库存" align="center">
				</el-table-column>
				<el-table-column prop="book.press" label="出版社" align="center" width="100">
				</el-table-column>
				<el-table-column prop="emp.empName" label="入库员" align="center" width="100">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="showEdit(scope.row)">修改入库</el-button>
						<el-button type="text" size="small" @click="delBookstorage(scope.row)">删除入库</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
			 :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
			</el-pagination>
		</div>

	</div>
</template>

<script>
	import qs from "qs"
	import {
		defineComponent,
		ref
	} from 'vue'
	export default {
		name: "BookStorage",
		data() {
			return {
				bookdata: [],
				pageInfo: {
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				value: '',
				tableData: [],
				jcrk: false,
				form: {
					mbookstorageId: "",
					bookId: "",
					empId: "",
					storagecount: "",
					//storagetime: "",
					totalprice: ""
				},

				disabledDate(time) {
					return time.getTime() > Date.now()
				},
				xgrk: false,
				input: "",
				zjkc: false,
			}
		},
		methods: {
			showEdit(row) {
				this.form.mbookstorageId = row.mbookstorageId
				this.form.bookId = row.bookId
				this.form.storagecount = row.storagecount
				this.form.storagetime = row.storagetime
				this.xgrk = true
			},
			//增加
			addBookstorage() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/addBookstorage", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPage1", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.jcrk = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},

			//修改
			updateBookstorage() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/updateBookstorage", this.form)
					.then(function(response) {
						var bookstorage = response.data
						var book = response.data
						var row = _this.tableData.filter(t => t.mbookstorageId == bookstorage.mbookstorageId)[0]
						row.bookId = book.bookId
						row.storagecount = bookstorage.storagecount
						row.storagetime = bookstorage.storagetime
						_this.xgrk = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			
			//多条件查询
			selectBookstorage() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectBookstorage/"+this.value+"/"+this.input)
					.then(function(response) {
						console.log(response)
						_this.tableData = response.data
					}).catch(function(error) {
						console.log(error)
					})
			},

			//删除
			delBookstorage(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.delete("http://localhost:8089/threeproject/delBookstorage/" + row.mbookstorageId)
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findPage1", {
									params: _this.pageInfo
								})
								.then(function(response) {
									_this.tableData = response.data.list
									_this.pageInfo.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							var bookstorage = response.data
							var rows = _this.tableData
								.filter(t => t.mbookstorageId != row.mbookstorageId)
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

			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage1", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage1", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findPage1", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.tableData = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				}),

				this.axios.get("http://localhost:8089/threeproject/selectAllBook")
				.then(function(response) {
					console.log(response)
					_this.bookdata = response.data
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>

</style>
