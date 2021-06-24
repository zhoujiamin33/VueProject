<template>
	<div>
		<div class="a">
			<b class="b" style="font-size: 15px;margin-left: -582px;">快速检索：</b>
			<el-select style="margin-bottom: 8px;" v-model="value" placeholder="请选择">
				<el-option label="教材名" value="教材名"></el-option>
				<el-option label="录入人" value="录入人"></el-option>
				<el-option label="购买者" value="购买者"></el-option>
			</el-select>
			<el-input style="width: 180px;" v-model="input" placeholder="请输入内容" clearable></el-input>
			<el-button style="float:right;margin-left: 10px;">删除</el-button>
			<el-button style="float:right" @click="xskd=true">销售开单</el-button>
			<el-button style="float:right" @click="selectBookdelivery">查询</el-button>

			<!-- 新增 -->
			<el-dialog title="销售开单" v-model="xskd">
				<el-form :model="form" label-width="80px" size="mini">
					<el-button @click="a()" style="margin-left: 590px;margin-bottom: 5px;" size="small">添加教材</el-button>
					<el-form-item>
						<el-table :data="tableData1" border style="width: 100%;margin-left: -40px;" max-height="600">
							<el-table-column prop="course.bookname" label="出售教材" align="center">
							</el-table-column>
							<el-table-column prop="course.booksprice" label="教材售价" align="center">
							</el-table-column>
							<el-table-column prop="course.deliverycount" label="出售数量" align="center">
							</el-table-column>
							<el-table-column prop="course.receivablemoney" label="应收金额" align="center">
							</el-table-column>
							<el-table-column fixed="right" label="操作" width="150" align="center">
								<template #default="scope">
									<el-button @click="delCourserecorddetails(scope.row)" type="text" size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>

					</el-form-item>
					<el-form-item>
						<b style="margin-left: -80px;">购选教材结算信息</b>
					</el-form-item>
					<el-form-item label="销售单号: ">
						<el-input style="width: 260px;margin-left: -60px;" v-model="form.salenumber" clearable></el-input>
						<b style="font-weight: 400;margin-left: 20px;">合计金额：</b>
						<el-input style="width: 260px;" disabled v-model="price" clearable></el-input>
					</el-form-item>
					<el-form-item label="经办人: ">
						<el-input style="width: 260px;margin-left: -60px;" v-model="form.empName" clearable></el-input>
						<b style="font-weight: 400;margin-left: 36px;">购买者：</b>
						<el-input style="width: 260px;" v-model="form.studentName" clearable></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button style="margin-left: -100px;" type="primary" @click="addDeliveryddetails">保 存</el-button>
						<el-button @click="xskd=false">关 闭</el-button>
					</span>
				</template>
			</el-dialog>


			<el-dialog title="选择教材" width="47%" v-model="xskd1">
				<el-form :model="form1" label-width="80px" size="mini">
					<el-form-item label="出售教材 :">
						<el-select style="margin-left: -442px;width: 193px;" v-model="form1.book.bookId" placeholder="请选择" autocomplete="off"
						 @change="selectbooksprice()">
							<el-option v-for="item in bookdata" :key="item.bookId" :label="item.bookname" :value="item.bookId" />
						</el-select>
					</el-form-item>
					<el-form-item label="教材售价 :">
						<el-input style="width: 193px;margin-left: -442px;" disabled v-model="bookdata.booksprice" clearable></el-input>
					</el-form-item>
					<el-form-item label="出售数量 :">
						<el-input style="width: 193px;margin-left: -442px;" v-model="form1.course.deliverycount" clearable></el-input>
					</el-form-item>

				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button style="margin-left: -100px;" type="primary" @click="showEdit">保 存</el-button>
						<el-button @click="xskd1=false">关 闭</el-button>
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
				<el-table-column prop="bookdelivery.salenumber" label="销售编号" align="center" width="80px">
				</el-table-column>
				<el-table-column prop="bookdelivery.deliverytime" label="销售日期" align="center" width="170px">
				</el-table-column>
				<el-table-column prop="book.bookname" label="教材名称" align="center">
				</el-table-column>
				<el-table-column prop="deliverycount" label="数量" align="center">
				</el-table-column>
				<el-table-column prop="book.booksprice" label="售价" align="center">
				</el-table-column>
				<el-table-column prop="receivablemoney" label="合计" align="center">
				</el-table-column>
				<el-table-column prop="student.studentName" label="购买者" align="center">
				</el-table-column>
				<el-table-column prop="emp.empName" label="录入人" align="center">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="deldeliveryDdetails(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
				 :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
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
		name: "BookDelivery",
		data() {
			return {
				pageInfo: {
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				input: "",
				value: "",
				receipts: 0,
				tableData: [],

				xskd: false,

				bookdata: [],

				tableData1: [],
				form1: {
					book: {},
					course: {}
				},
				form: {
					bookdeliveryId: "",
					studentId: "",
					studentName: "",
					bookId: "",
					bookname: "",
					empId: "",
					empName: "",
					tota: "",
					salenumber: "",
					deliverytime: "",
					deliverycount: "",
					receivablemoney: "",
					booksprice: ""
				},
				courserecorddetails: {
					course: {
						bookname: "",
						booksprice: 0,
						deliverycount: "",
						receivablemoney: 0
					},
				},


				xskd1: false,
			  //新增教材出库收入
			  form2:{
				  addname:"",deliverycount:"",bookId:"",bookdeliveryId:""
				}
			}
		},
		methods: {
			delCourserecorddetails(row) {
				this.tableData1.splice(this.tableData1.indexOf(row), 1)
			},
			a() {
				this.xskd1 = true;
				this.selectAllBooks();
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
			showEdit() {
				var courserecorddetails = {
					course: {
						bookname: "",
						booksprice: 0,
						deliverycount: "",
						receivablemoney: 0
					},
				};
				courserecorddetails.course.bookname = this.bookdata.bookname
				courserecorddetails.course.booksprice = this.bookdata.booksprice
				courserecorddetails.course.deliverycount = this.form1.course.deliverycount
				courserecorddetails.course.receivablemoney = this.bookdata.booksprice * this.form1.course.deliverycount
				this.tableData1.push(courserecorddetails);
				this.xskd1 = false
			},


			//增加
			addDeliveryddetails() {
				const _this = this
				this.form.tota = this.price
				this.axios.post("http://localhost:8089/threeproject/addBookdelivery", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findPage4", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						console.log(response)
						_this.add(response.data.bookdeliveryId)
						_this.xskd = false
						_this.insertincome(response.data.bookdeliveryId)
						// for (var key in _this.form) {
						// 	delete _this.form[key]
						// }
						_this.form={}
					}).catch(function(error) {
						console.log(error)
					})
			},
			add(row) {
				const _this = this
				this.form.bookId = this.form1.book.bookId
				this.form.deliverycount = this.form1.course.deliverycount
				this.form.receivablemoney = this.bookdata.booksprice * this.form1.course.deliverycount
				this.form.bookdeliveryId = row
				this.axios.post("http://localhost:8089/threeproject/addDeliveryddetails", this.form)
					.then(function(response) {
						console.log("ID" + row)
						_this.axios.get("http://localhost:8089/threeproject/findPage4", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			//新增教材出库收入
			insertincome(bookdeliveryId){
				const _this=this
				this.form2.addname="admin"
				this.form2.bookdeliveryId=bookdeliveryId
				console.log(this.form2.bookdeliveryId+"def")
				this.form2.refundCount=this.form.deliverycount
				console.log(this.form2.deliverycount+"igh")
				this.form2.bookId=this.form.bookId
				console.log(this.form2.bookId+"abc")
				this.axios.post("http://localhost:8089/threeproject/insertincome",this.form2)
				.then(function(repsonse){
					console.log(repsonse)
				}).catch(function(error){
					console.log(error)
				})
			},
			//多条件查询
			selectBookdelivery() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectBookdelivery/"+this.value+"/"+this.input)
					.then(function(response) {
						console.log(response)
						_this.tableData = response.data
					}).catch(function(error) {
						console.log(error)
					})
			},


			//删除
			deldeliveryDdetails(row) {
				const _this = this
				var flag = true
				this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.axios.delete("http://localhost:8089/threeproject/deldeliveryDdetails/" + row.deliveryddetailsId)
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findPage4", {
									params: _this.pageInfo
								})
								.then(function(response) {
									_this.tableData = response.data.list
									_this.pageInfo.total = response.data.total
								}).catch(function(error) {
									console.log(error)
								})
							var deliveryDdetails = response.data
							var rows = _this.tableData
								.filter(t => t.deliveryddetailsId != row.deliveryddetailsId)
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
				this.axios.get("http://localhost:8089/threeproject/findPage4", {
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
				this.axios.get("http://localhost:8089/threeproject/findPage4", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
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
			}
		},
		computed: {
			// 计算属性的 getter
			price: { // eslint-disable-line no-unused-vars
				get: function() {
					let sum = 0;
					this.tableData1.forEach((item) => {
						//遍历prodAllPrice这个字段，并累加
						sum += item.course.receivablemoney;
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
			this.axios.get("http://localhost:8089/threeproject/findPage4", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.tableData = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
		},

	}
</script>

<style>

</style>
