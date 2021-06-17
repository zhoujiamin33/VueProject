<template>
	<div>
		<el-button @click="dialogFormVisible=true" style="float: right;">新增</el-button>
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
					<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					<el-button @click="showEdit(scope.row)" type="text" size="small">编辑</el-button>
					<el-button type="text" size="small" @click="delTrainingperiod(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="添加教材" v-model="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="教材名称" :label-width="formLabelWidth">
					<el-input v-model="form.bookname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="库存" :label-width="formLabelWidth">
					<el-input v-model="form.deliverycount" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="教材售价" :label-width="formLabelWidth">
					<el-input v-model="form.booksprice" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="教材进价" :label-width="formLabelWidth">
					<el-input v-model="form.bookjprice" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="安全库存" :label-width="formLabelWidth">
					<el-input v-model="form.safestock" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="出版社" :label-width="formLabelWidth">
					<el-input v-model="form.press" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="addBook">确 定</el-button>
				</span>
			</template>
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
				}
			}
		},
		methods: {
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage3", {
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
				this.axios.post("http://localhost:8089/threeproject/addBook", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPage3", {
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
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findPage3", {
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
