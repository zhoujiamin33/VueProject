<template>
	<div>
		<div class="a">
			<b class="b" style="font-size: 15px;margin-left: -582px;">快速检索：</b>
			<el-select style="margin-bottom: 8px;" v-model="value" placeholder="请选择">
				<el-option label="教材名" value="教材名"></el-option>
				<el-option label="经办人" value="经办人"></el-option>
			</el-select>
			<el-input style="width: 180px;" v-model="input" placeholder="请输入内容" clearable></el-input>
			<el-button style="float:right;margin-left: 10px;">删除</el-button>
			<el-button style="float:right" @click="thkd=true">退回开单</el-button>
			<el-button style="float:right" @click="selectBookback">查询</el-button>

			<el-dialog title="退回开单" v-model="thkd">
				<el-form :model="form" label-width="80px" size="mini">
					<el-button @click="a()" style="margin-left: 568px;margin-bottom: 5px;" size="small">添加退回教材</el-button>
					<el-form-item>
						<el-table :data="tableData1" border style="width: 100%;margin-left: -40px;" max-height="600">
							<el-table-column prop="course.bookname" label="退回教材" align="center">
							</el-table-column>
							<el-table-column prop="course.booksprice" label="教材售价" align="center">
							</el-table-column>
							<el-table-column prop="course.backcount" label="退回数量" align="center">
							</el-table-column>
							<el-table-column prop="course.backmoney" label="退回金额" align="center">
							</el-table-column>
							<el-table-column fixed="right" label="操作" width="150" align="center">
								<template #default="scope">
									<el-button @click="delCourserecorddetails(scope.row)" type="text" size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>

					</el-form-item>
					<el-form-item label="破损原因: ">
						<el-input style="width: 260px;margin-left: -60px;" v-model="form.causeofdamage" clearable></el-input>
						<b style="font-weight: 400;margin-left: 20px;">退回总额：</b>
						<el-input style="width: 260px;" v-model="price" clearable disabled></el-input>
					</el-form-item>
					<el-form-item label="单号: ">
						<el-input style="width: 260px;margin-left: -60px;" v-model="form.returnnumber" clearable></el-input>
						<b style="font-weight: 400;margin-left: 36px;">录入人：</b>
						<el-input style="width: 260px;" v-model="form.empName" clearable></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button style="margin-left: -100px;" type="primary" @click="addBookback">退回提交</el-button>
						<el-button @click="thkd=false">关 闭</el-button>
					</span>
				</template>
			</el-dialog>


			<el-dialog title="选择教材" width="47%" v-model="thkd1">
				<el-form :model="form1" label-width="80px" size="mini">
					<el-form-item label="退回教材 :">
						<el-select style="margin-left: -442px;width: 193px;" v-model="form1.book.bookId" placeholder="请选择" autocomplete="off" @change="selectbooksprice()">
							<el-option v-for="item in bookdata" :key="item.bookId" :label="item.bookname" :value="item.bookId" />
						</el-select>
					</el-form-item>
					<el-form-item label="教材售价 :">
						<el-input style="width: 193px;margin-left: -442px;" disabled v-model="bookdata.booksprice" clearable></el-input>
					</el-form-item>
					<el-form-item label="退回数量 :">
						<el-input style="width: 193px;margin-left: -442px;" v-model="form1.course.backcount" clearable></el-input>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button style="margin-left: -100px;" type="primary" @click="showEdit">保 存</el-button>
						<el-button @click="thkd1=false">关 闭</el-button>
					</span>
				</template>
			</el-dialog>


		</div>
		<div>
			<el-table :data="tableData" stripe border style="width: 100%">
				<el-table-column type="index" width="50" align="center">
				</el-table-column>
				<el-table-column type="selection" width="50" align="center">
				</el-table-column>
				<el-table-column prop="returnnumber" label="退回编号" align="center">
				</el-table-column>
				<el-table-column prop="storagetime" label="退回日期" width="170" align="center">
				</el-table-column>
				<el-table-column prop="causeofdamage" label="退回原因" align="center">
				</el-table-column>
				<el-table-column prop="book.bookname" label="教材名称" align="center">
				</el-table-column>
				<el-table-column prop="backcount" label="数量" align="center">
				</el-table-column>
				<el-table-column prop="book.booksprice" label="售价" align="center">
				</el-table-column>
				<el-table-column prop="backmoney" label="退回金额" align="center">
				</el-table-column>
				<el-table-column prop="emp.empName" label="录入人" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="updateBookback(scope.row)">删除</el-button>
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
		name: "BookBack",
		data() {
			return {
				form1: {
					book: {},
					course: {}
				},
				form: {
					bookbackId: "",
					bookId: "",
					bookname: "",
					storagetime: "",
					causeofdamage: "",
					backcount: "",
					backmoney: "",
					returnnumber: "",
					empId: "",
					empName: "",
					timeliness: ""
				},
				tableData1: [],
				tableData: [],
				receipts: 0,
				value: "",
				input:"",
				pageInfo: {
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				bookdata: [],
				thkd1: false,
				thkd: false,
			}
		},
		methods: {
			a() {
				this.thkd1 = true;
				this.selectAllBooks();
			},
			showEdit() {
				var courserecorddetails = {
					course: {
						bookname: "",
						booksprice: 0,
						backcount: "",
						backmoney: 0,
					},
				};
				courserecorddetails.course.bookname = this.bookdata.bookname
				courserecorddetails.course.booksprice = this.bookdata.booksprice
				courserecorddetails.course.backcount = this.form1.course.backcount
				courserecorddetails.course.backmoney = this.bookdata.booksprice * this.form1.course.backcount
				this.tableData1.push(courserecorddetails);
				this.thkd1 = false
			},
			selectbooksprice() {
				var _this = this
				this.axios.get("http://localhost:8089/threeproject/selectbooksprice/" + this.form1.book.bookId)
					.then(function(response) {
						console.log(response)
						_this.bookdata = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPage6", {
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
				this.axios.get("http://localhost:8089/threeproject/findPage6", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			// //删除
			// delBookback(row) {
			// 	const _this = this
			// 	var flag = true
			// 	this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 	}).then(() => {
			// 		_this.axios.delete("http://localhost:8089/threeproject/delBookback/" + row.bookbackId)
			// 			.then(function(response) {
			// 				_this.axios.get("http://localhost:8089/threeproject/findPage6", {
			// 						params: _this.pageInfo
			// 					})
			// 					.then(function(response) {
			// 						_this.tableData = response.data.list
			// 						_this.pageInfo.total = response.data.total
			// 					}).catch(function(error) {
			// 						console.log(error)
			// 					})
			// 				var bookback = response.data
			// 				var rows = _this.tableData
			// 					.filter(t => t.bookbackId != row.bookbackId)
			// 				_this.tableData = rows
			// 				for (var key in _this.form) {
			// 					delete _this.form[key]
			// 				}
			// 			}).catch(function(error) {
			// 				console.log(error)
			// 			})
			// 	}).catch(() => {
			// 		this.$message({
			// 			type: 'error',
			// 			message: '取消删除!'
			// 		});
			// 	});
			// },
			
			
			
			//修改
			updateBookback() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/updateBookback", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPage6", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						var bookback = response.data
						var row = _this.tableData.filter(i => i.bookbackId == bookback.bookbackId)[0]
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			
			//多条件查询
			selectBookback() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectBookback/"+this.value+"/"+this.input)
					.then(function(response) {
						console.log(response)
						_this.tableData = response.data
					}).catch(function(error) {
						console.log(error)
					})
			},
			
			selectAllBooks() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectAllBook")
					.then(function(response) {
						console.log(response)
						_this.bookdata = response.data
					}).catch(function(error) {
						console.log(error)
					})
			},
			//增加
			addBookback() {
				const _this = this
				this.form.bookId = this.form1.book.bookId
				this.form.backcount = this.form1.course.backcount
				this.form.backmoney = this.bookdata.booksprice * this.form1.course.backcount
				this.axios.post("http://localhost:8089/threeproject/addBookback", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPage6", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.thkd = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		computed: {
			// 计算属性的 getter
			price: { // eslint-disable-line no-unused-vars
				get: function() {
					let sum = 0;
					this.tableData1.forEach((item) => {
						sum += item.course.backmoney;
					})
					return sum
				},
				set: function(value) {
					this.receipts = value; //最后修改了msg    
				}
			}
		},

		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findPage6", {
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
