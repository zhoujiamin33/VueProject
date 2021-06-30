<template>
	<div style="margin-top:10px;">
	  	<!-- 搜索框、输入框 、按钮-->
	  	<div style="margin-left:10px;line-height: 40px;">
	  		<el-row style="text-align: center;">
	  			是否审核：
	  			<el-select  v-model="pageInfo.Approval"  placeholder="请选择">
	  				<el-option value="1" label="已审核"></el-option><el-option value="0" label="未审核"></el-option>
	  			</el-select>
	  			补缴日期：
	  			<el-date-picker v-model="pageInfo.value1" type="date"  placeholder="选择开始日期"> </el-date-picker>
	  			<el-date-picker v-model="pageInfo.value2" type="date"  placeholder="选择结束日期"> </el-date-picker>
				经办人：
				<el-input  v-model="pageInfo.input" style="width: 150px;"></el-input>
	  			<el-button style="margin-left: 20px;" @click="selectByContionrefund">查询</el-button>
	  			
	  		</el-row>
	  	</div>
	 </div>	
		<!-- 表格 -->
		<div style="position: relative;margin-top: 50px;"  >
			<el-table :data="tableData"  border style="width:100%;margin-left:10px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column fixed  type="selection"> </el-table-column>
			    <el-table-column fixed prop="refundId" label="缴费编号" align="center"> </el-table-column>
				<el-table-column  prop="refundtype" label="退费类型" align="center"> </el-table-column>
				<el-table-column prop="student.studentName" label="退费学员" align="center"> </el-table-column>
			    <el-table-column prop="dropMoney" label="回退金额" align="center"> </el-table-column>
			    <el-table-column prop="addname" label="退费办理人" align="center"> </el-table-column>
			    <el-table-column prop="addtime"  label="退费日期"  align="center"> </el-table-column>
			    <el-table-column fixed="right" label="操作" align="center">
			      <template #default="scope">
					<p v-if="scope.row.cwApproval==0">
						<el-button type="warning" icon="el-icon-warning-outline" circle size="mini" @click="updateapproval(scope.row)"></el-button>
						<el-button type="danger" size="mini" circle icon="el-icon-minus" @click="deleterefund(scope.row)"></el-button>
					</p>
					<p v-if="scope.row.cwApproval==1">
					  <el-button type="success" icon="el-icon-check" circle size="mini" @click="updateRevokeapproval(scope.row)"></el-button>
					  <el-button type="danger" size="mini" circle icon="el-icon-minus" @click="deleterefund(scope.row)"></el-button>
					</p>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		<!-- 底部金额总结 -->
		<div style="display: flex; justify-content: space-between; margin-top: 20px;">
			<!-- 底部金额总结 -->
			<span style="margin-top:15px;font-size: 14px;margin-left:10px;">缴费总额：已审核金额：未审核金额：</span>
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
	
</template>

<script>
	import qs from 'qs'
	import moment from "moment"
	export default{
		name:"returnmoney",
		data(){
			return {
				tableData:[],
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:4,//每页多少条数据
					total:0,
					Approval:"",
					value1:"",
					value2:"",
					input:"",
				}
			}
		},
		methods:{
			//多条件查询
			selectByContionrefund(){
				const _this=this
				this.pageInfo.value1=moment(this.pageInfo.value1).format("YYYY-MM-DD")
				this.pageInfo.value2=moment(this.pageInfo.value2).format("YYYY-MM-DD")
				this.axios.get("http://localhost:8089/threeproject/selectByContionRefund",{
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
			handleSizeChange(pagesize) {
			    var _this=this
			    this.pageInfo.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/selectAllRefund",{
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
				this.axios.get("http://localhost:8089/threeproject/selectAllRefund",{
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
			// 审核
			updateapproval(row){
				const _this=this
				console.log(row.refundId)
				this.axios.put("http://localhost:8089/threeproject/updateapprovalrefund",row,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.axios.get("http://localhost:8089/threeproject/selectAllRefund",{
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
				}).catch(function(error){
					console.log(error)
				})
			},
			updateRevokeapproval(row){
				const _this=this
				console.log(row.refundId)
				
				this.axios.put("http://localhost:8089/threeproject/updateRevokeapprovalrefund",row,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.axios.get("http://localhost:8089/threeproject/selectAllRefund",{
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
				}).catch(function(error){
					console.log(error)
				})
			},
			deleterefund(row){
				const _this=this
				this.axios.put("http://localhost:8089/threeproject/deleterefund",row,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.axios.get("http://localhost:8089/threeproject/selectAllRefund",{
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
				}).catch(function(error){
					console.log(error)
				})
			}
		},
		created(){
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/selectAllRefund",{
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
		}
	}
</script>

<style>
</style>
