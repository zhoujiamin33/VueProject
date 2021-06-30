<template>
	<el-tabs type="border-card"  style="margin-top: 40px;">
	  <el-tab-pane label="教材入库支出">
		  <div style="margin-top:10px;">
		  	<!-- 搜索框、输入框 、按钮-->
		  	<div style="margin-left:5px;line-height: 40px;">
		  		<el-row style="text-align: center;">
		  			
		  			支出日期：
		  			<el-date-picker v-model="pageInfo.startTime" type="date"  placeholder="选择开始日期"> </el-date-picker>
		  			<el-date-picker v-model="pageInfo.endTime" type="date"  placeholder="选择结束日期"> </el-date-picker>
					
		  			<el-button style="margin-left: 10px;" @click="selectBycontionBook">查询</el-button>
					<el-button type="danger" >删除</el-button>
		  		</el-row>
		  	</div>
		 </div>	
		<!-- 表格 -->
		<div style="position: relative;margin-top: 50px;"  >
		 	<el-table :data="tableData"  border style="width:100%;margin-left:5px;" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}">
		 		<el-table-column fixed  type="selection"> </el-table-column>
		 		<el-table-column  prop="expensesName" label="单据号" width="200"> </el-table-column>
		 	    <el-table-column prop="expensesDate" label="收支日期"  align="center"> </el-table-column>
		 	    <el-table-column prop="expensesDetails" label="收支明细" align="center"> </el-table-column>
		 	    <el-table-column prop="refundCount"  label="入库数量"  align="center"> </el-table-column>
		 	    <el-table-column prop="totalmoney" label="支出总额" align="center"> </el-table-column>
		 		<el-table-column prop="zip" label="审核状态" align="center">
		 			<template #default="scope">
		 				<p v-if="scope.row.approval==0">
		 					<el-button type="warning" icon="el-icon-warning-outline" circle size="mini" @click="updateApproval(scope.row)"></el-button>
		 				</p>				
		 			    <p v-if="scope.row.approval==1">
		 					<el-button type="success" icon="el-icon-check" circle size="mini" @click="updateReApproval(scope.row)"></el-button>			
		 			    </p>
		 			</template>
		 		</el-table-column>
		 	</el-table>
		 </div>
		<div style="display: flex; justify-content: space-between;margin-top: 20px;margin-left: 400px;">
			<!-- 底部金额总结 -->
			<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			当前页码
			:current-page="pageInfo.currentPage"
			:page-sizes="[2, 4, 6, 10]"
			每页数据
			:page-size="pageInfo.pagesize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="pageInfo.total">
			</el-pagination>	
		</div>
	  </el-tab-pane>
	  <el-tab-pane label="教材出库收支">
		  <div style="margin-top:10px;">
		    	<!-- 搜索框、输入框 、按钮-->
		    	<div style="margin-left:10px;line-height: 40px;">
		    		<el-row style="text-align: center;">
		    			收入日期：
		    			<el-date-picker v-model="pageInfo2.startTime" type="date"  placeholder="选择开始日期"> </el-date-picker>
		    			<el-date-picker v-model="pageInfo2.endTime" type="date"  placeholder="选择结束日期"> </el-date-picker>
		    			<el-button style="margin-left:60px;" @click="selectBycontionBook2">查询</el-button>
		    			<el-button type="danger" >删除</el-button>
		    			<!-- <el-button type="primary" icon="el-icon-plus" style="margin-left:10px;">新增出库</el-button> -->
		    		</el-row>
		    	</div>
		   </div>	
		  <!-- 表格 -->
		  <div style="position: relative;margin-top: 50px;">
		   	<el-table :data="tableData2"  border style="width:100%;margin-left:5px;" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}">
		   		<el-table-column fixed  type="selection"> </el-table-column>
		   		<el-table-column  prop="refundName" label="单据号" width="200" align="center"> </el-table-column>
		   	    <el-table-column prop="refundDate" label="收支日期" align="center" > </el-table-column>
		   	    <el-table-column prop="refundDetails" label="收支明细" align="center"> </el-table-column>
		   	    <el-table-column prop="refundCount"  label="出库数量" align="center"> </el-table-column>
		   	    <el-table-column prop="totalmoney" label="收入总额" align="center"> </el-table-column>
		   		<el-table-column prop="zip" label="审核状态"  align="center">
					<template #default="scope">
						<p v-if="scope.row.approval==0">
							<el-button type="warning" icon="el-icon-warning-outline" circle size="mini" @click="updateApprovalincome(scope.row)"></el-button>
						</p>				
					    <p v-if="scope.row.approval==1">
							<el-button type="success" icon="el-icon-check" circle size="mini" @click="updateReApprovalincome(scope.row)"></el-button>			
					    </p>
					</template>
				</el-table-column>
		   	</el-table>
		   </div>
		  <div style="display: flex; justify-content: space-between;margin-top: 20px;margin-left: 400px;">
		  	<!-- 底部金额总结 -->
		  		<el-pagination
		  		@size-change="handleSizeChange2"
		  		@current-change="handleCurrentChange2"
		  		当前页码
		  		:current-page="pageInfo2.currentPage"
		  		:page-sizes="[2, 4, 6, 10]"
		  		每页数据
		  		:page-size="pageInfo2.pagesize"
		  		layout="total, sizes, prev, pager, next, jumper"
		  		:total="pageInfo2.total">
		  		</el-pagination>
		  </div>
	  </el-tab-pane>
	</el-tabs>
</template>

<script>
	import qs from 'qs'
	
	import moment from "moment"
	export default{
		data(){
			return {
				tableData:[],
				tableData2:[],
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:4,//每页多少条数据
					total:0,
					startTime:"",
					endTime:""
				},
				pageInfo2:{
					currentPage: 1,//标识当前页码
					pagesize:4,//每页多少条数据
					total:0,
					startTime:"",
					endTime:""
				},
				//审核教材入库表单
				form:{
					approvalname:"",expensesId:"",revokeappname:""
				},
				//审核教材出库表单
				form:{
					approvalname:"",warehouseincomeId:"",revokeappname:""
				}
			}
		},
		methods:{
			selectBycontionBook(){
				const _this=this
				this.pageInfo.value1=moment(this.pageInfo.value1).format("YYYY-MM-DD")
				this.pageInfo.value2=moment(this.pageInfo.value2).format("YYYY-MM-DD")
				this.axios.get("http://localhost:8089/threeproject/selectBycontionBook",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.tableData=response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			selectBycontionBook2(){
				const _this=this
				this.pageInfo2.value1=moment(this.pageInfo2.value1).format("YYYY-MM-DD")
				this.pageInfo2.value2=moment(this.pageInfo2.value2).format("YYYY-MM-DD")
				this.axios.get("http://localhost:8089/threeproject/selectBycontionBook2",{
					params:this.pageInfo2,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.tableData2=response.data.list
					_this.pageInfo2.total = response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange(pagesize) {
			    var _this=this
			    this.pageInfo.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			    .then(function(response){
			    	console.log("-------------------------------------------")
			    	console.log(response.data)
			    	_this.tableData=response.data.list
			    }).catch(function(error){
			    	console.log(error)
			    })
			},
			handleCurrentChange(currentPage) {
				var _this=this
				this.pageInfo.currentPage=currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response.data)
					_this.tableData=response.data.list
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange2(pagesize) {
			    var _this=this
			    this.pageInfo2.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:this.pageInfo2,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			    .then(function(response){
			    	console.log("-------------------------------------------")
			    	console.log(response.data)
			    	_this.tableData=response.data.list
			    }).catch(function(error){
			    	console.log(error)
			    })
			},
			handleCurrentChange2(currentPage) {
				var _this=this
				this.pageInfo2.currentPage=currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:this.pageInfo2,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response.data)
					_this.tableData=response.data.list
				}).catch(function(error){
					console.log(error)
				})
			},
			//审核教材入库
			updateApproval(row){
				const _this=this
				this.form.expensesId=row.expensesId
				this.form.approvalname=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/updateApproval",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:_this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						_this.tableData=response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(error) {
					console.log(error)
				})
			},
			deleteTimeliness(row){
				// var deletename="默认"
				// if (this.multipleSelection.length == 0) {
				// 	this.$alert('<strong>请至选中一个！</strong>', '提示', {
				// 	dangerouslyUseHTMLString: true,
				// 	});
				// }else {
				// 	const _this = this
				// 	this.$confirm('是否删除？', '删除', {
				// 	distinguishCancelAndClose: true,
				// 	confirmButtonText: '是',
				// 	cancelButtonText: '否',
				// 	type:"warning"
				// }).then(() => {
				// 	_this.axios.put("http://localhost:8089/threeproject/deleteTimeliness/"+this.multipleSelection)
				// 	.then(function(response){
				// 		var row=response
				// 		_this.axios.get("http://localhost:8089/threeproject/findPage",{params:_this.pageInfo})
				// 		.then(function(response) {
				// 			_this.tableData = response.data.list
				// 			_this.pageInfo.total=response.data.total
				// 			console.log(_this.UnitType)
				// 		}).catch(function(error) {
				// 			console.log(error)
				// 		})
				// 	}).catch(function(errer){
				// 		console.log(errer)
				// 	})
				// 		console.log("43321")
				// 	}).catch(action => {
				// 		console.log("2")
				// 	});
				// }
				const _this=this
				this.form.expensesId=row.expensesId
				this.form.updatename=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/updateApproval",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:_this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						_this.tableData=response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(error) {
					console.log(error)
				})
			},
			//撤销审核教材入库
			updateReApproval(row){
				const _this=this
				this.form.expensesId=row.expensesId
				this.form.revokeappname=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/updateReApproval",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:_this.pageInfo,	
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						_this.tableData=response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(error) {
					console.log(error)
				})
			},
			//审核教材出库
			updateApprovalincome(row){
				const _this=this
				this.form.warehouseincomeId=row.warehouseincomeId
				this.form.approvalname=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/updateApprovalincome",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.axios.get("http://localhost:8089/threeproject/selectAllincome",{
					params:_this.pageInfo2,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						_this.tableData2=response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(error) {
					console.log(error)
				})
			},
			//撤销审核教材出库
			updateReApprovalincome(row){
				const _this=this
				this.form.warehouseincomeId=row.warehouseincomeId
				this.form.revokeappname=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/updateReApprovalincome",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.axios.get("http://localhost:8089/threeproject/selectAllincome",{
					params:_this.pageInfo2,	
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						_this.tableData2=response.data.list
						_this.pageInfo2.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(error) {
					console.log(error)
				})
			}
			
		},
		created() {
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/selectAllStorage",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response) {
				console.log(response)
				_this.tableData=response.data.list
				_this.pageInfo.total = response.data.total
			}).catch(function(error) {
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/selectAllincome",{
					params:_this.pageInfo2,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response) {
				console.log(response)
				_this.tableData2=response.data.list
				_this.pageInfo2.total = response.data.total
			}).catch(function(error) {
				console.log(error)
			})
		}
	}
</script>

<style>
</style>
