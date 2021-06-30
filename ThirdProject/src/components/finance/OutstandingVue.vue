<template>
	 <el-tabs type="border-card" style="margin-top: 40px;">
	   <el-tab-pane label="欠费补缴">
	 	 <div style="margin-top:10px;">
	 	   	<!-- 搜索框、输入框 、按钮-->
	 	   	<div style="margin-left:10px;line-height: 40px;">
	 	   		<el-row style="text-align: center;">
	 	   			<div style="margin-top: 15px">
	 	   			  <el-input placeholder="请输入内容" v-model="input" class="input-with-select" >
	 	   			    <template #prepend>
	 	   			      <el-select v-model="select" placeholder="请选择" style="width:110px;">
	 	   			        <el-option label="学员姓名" value="1">学员姓名</el-option>
	 	   			        <el-option label="未缴清" value="2">未缴清</el-option>
							<el-option label="已缴清" value="2">已缴清</el-option>
	 	   			      </el-select>
	 	   			    </template>
	 	   			    <template #append>
	 	   			      <el-button icon="el-icon-search"></el-button>
	 	   			    </template>
	 	   			  </el-input>
	 	   			</div>
	 	   		</el-row>
	 	   	</div>
	 	</div>	
	 	<!-- 表格 -->
	 	<div style="position: relative;margin-top: 50px;"  >
	 		<el-table :data="tableData"  border style="width: 100%;margin-left:10px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
	 			<el-table-column fixed  type="selection"> </el-table-column>
	 			<el-table-column  prop="feesId" label="报班缴费编号" align="center" > </el-table-column>
	 			<el-table-column prop="entryfees.register.consultant"  label="补缴学员" align="center"></el-table-column>
				<el-table-column prop="entryfees.feesReceivable" label="应缴总额" align="center"></el-table-column>
	 			<el-table-column prop="entryfees.feesaccumulated" label="累计欠费" align="center"></el-table-column>
				<el-table-column prop="phone" label="联系电话" align="center"> </el-table-column>
	 			<el-table-column fixed="right" label="操作" align="center">
	 			    <template #default="scope">
						<p v-if="scope.row.entryfees.feesaccumulated==0">已缴清</p>
						<p v-if="scope.row.entryfees.feesaccumulated!=0">
							<el-button @click="qianfei(scope.row)" type="text" size="small">学费补缴</el-button>
						</p>
	 			     </template>
	 			</el-table-column>
	 		</el-table>
	 	</div>
		<div style="display: flex; justify-content: space-between  ;text-align: center;" >
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
		<!-- 补缴弹窗 -->
		<el-dialog title="学费补缴" v-model="dialogoutStanding">
			 <p align="left">班级报读记录</p>
			 <el-table :data="qianfeidata" height="200" border style="width: 100%">
				 <el-table-column prop="date" fixed label="编号" width="80"></el-table-column>
				 <el-table-column prop="register.consultant" label="学员姓名" width="180"></el-table-column>
				 <el-table-column prop="date" label="报读日期" width="180"></el-table-column>
				 <el-table-column prop="qianfeidata.register.course.courseName" label="报读课程"  width="180"></el-table-column>
				 <el-table-column prop="address" label="学费总额"></el-table-column>
			 </el-table>
			 <p align="left">费用信息统计</p>
			 <el-descriptions class="margin-top"  :column="2" :size="size" border >
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>报班缴费编号
				  </template>
				 <el-input v-model="form.feesId"></el-input>
				</el-descriptions-item>  
				 
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>应缴总额
				  </template>
				 <el-input v-model="form.feesReceivable"></el-input>
				</el-descriptions-item> 
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>预交金额
				  </template>
				 <el-input v-model="form.feesAdvance"></el-input>
				</el-descriptions-item> 
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>累计欠费
				  </template>
				 <el-input v-model="form.feesaccumulated"></el-input>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>补缴金额
				  </template>
				 <el-input v-model="form.AlongMoney"></el-input>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>经办人
				  </template>
				   <el-input v-model="form.addname"></el-input>
				</el-descriptions-item>
			 </el-descriptions>
			 <template #footer>
				<span class="dialog-footer">
				  <el-button @click="dialogoutStanding=false">取 消</el-button>
				  <el-button type="primary" @click="addoutstanding">保存并新建</el-button>
				</span>
			 </template>
		</el-dialog>
	   </el-tab-pane>
	   
	   <el-tab-pane label="补缴管理">
	   	 	 <div style="margin-top:10px;">
	   	 	   	<!-- 搜索框、输入框 、按钮-->
	   	 	   	<div style="margin-left:10px;line-height: 40px;">
	   	 	   		<el-row style="text-align: center;">
	   	 	   			是否审核：
	   	 	   			<el-select  v-model="pageInfo2.Approval"  placeholder="请选择">
	   	 	   				<el-option value="0" label="已审核">已审核</el-option><el-option value="1" label="已审核">未审核</el-option>
	   	 	   			</el-select>
	   	 	   			补缴日期：
	   	 	   			<el-date-picker v-model="pageInfo2.value1" type="date"  placeholder="选择开始日期"> </el-date-picker>
						<el-date-picker v-model="pageInfo2.value2" type="date"  placeholder="选择结束日期"> </el-date-picker>
	   	 	   			<el-button style="margin-left: 20px;" @click="selectByContionout">查询</el-button>
	   	 	   		</el-row>
	   	 	   	</div>
	   	 	</div>	
	   	 	<!-- 表格 -->
	   	 	<div style="position: relative;margin-top: 50px;"  :header-cell-style="{background:'#eef1f6',color:'#606266'}">
	   	 		<el-table :data="tableData2"  border style="width: 100%;margin-left:10px;">
	   	 			<el-table-column fixed  type="selection" align="center"> </el-table-column>
	   	 			<el-table-column fixed prop="outstandingId" label="补缴编号" align="center"> </el-table-column>
	   	 			<el-table-column  prop="outstandingName" label="单据号" align="center"> </el-table-column>
	   	 			<!-- <el-table-column prop="feesId" label="报班缴费编号" align="center"> </el-table-column> -->
	   	 			<el-table-column prop="outstandingDate" label="补缴日期" align="center"> </el-table-column>
	   	 			<el-table-column prop="entryfees.register.consultant"  label="补缴学员" align="center"> </el-table-column>
	   	 			<el-table-column prop="alongmoney" label="补缴金额" align="center"> </el-table-column>
	   	 			<el-table-column prop="accumulated" label="累计欠费" align="center"> </el-table-column>
	   	 			<el-table-column prop="addname"  label="经办人" align="center"> </el-table-column>
	   	 			<el-table-column fixed="right" label="操作" align="center">
	   	 			    <template #default="scope">
	   	 			    	<p v-if="scope.row.approvalstate==0">
	   	 			    		<el-button type="warning" icon="el-icon-warning-outline" circle size="mini" @click="updateapproval(scope.row)"></el-button>
	   	 			    		<el-button type="danger" size="mini" circle icon="el-icon-minus" @click="deleteoutstanding(scope.row)"></el-button>
	   	 			    	</p>
							 <p v-if="scope.row.approvalstate==1">
								<el-button type="success" icon="el-icon-check" circle size="mini" @click="updateRevokeapproval(scope.row)"></el-button>
								<el-button type="danger" size="mini" circle icon="el-icon-minus" @click="deleteoutstanding(scope.row)"></el-button>
							 </p>
	   	 			    </template>
	   	 			</el-table-column>
	   	 		</el-table>
	   	 	</div>
			<div style="display: flex; justify-content: space-between; margin-top: 20px;margin-left: 300px;">
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
	</el-tabs> 
</template>

<script>
	import qs from 'qs'
	// import moment from "moment"
	export default{
		name:"outstanding",
		data(){
			return{
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:2,//每页多少条数据
					total:0
				},
				pageInfo2:{
					currentPage: 1,//标识当前页码
					pagesize:2,//每页多少条数据
					total:0,
					value1:"",
					value2:"",
					Approval:"",
				},
				selectkey:{
					select:"",
					input:""
				},
				tableData:[],
				tableData2:[],
				dialogoutStanding:false,
				tabledata3:[],
				leijiqianfei:0,
				//新增学费补缴数据biaodan
				form:{
					feesId:"",
					//总金额
					feesReceivable:"",
					//预交金额
					feesAdvance:"",
					//累计欠费
					Accumulated:"",
					//补缴金额
					AlongMoney:"",
					addname:"",
					//累计欠费2
					feesaccumulated:""
				},
				form2:{
					feesId:"",
					//总金额
					feesReceivable:"",
					//预交金额
					feesAdvance:"",
					//累计欠费
					accumulated:"",
					//补缴金额
					alongmoney:"",
					addname:""
				},
				//修改报班缴费的累计欠费字段
				form3:{
					feesId:"",
					Fees_Accumulated:""
				},
				PutDeleteForm:{
					outstandingId:"",
					updatename:"",
					approvalname:"",
					revokeappname:""
				}
			}
		},
		methods:{
			handleSizeChange(pagesize) {
			    var _this=this
			    this.pageInfo.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			    .then(function(response){
			    	console.log("-------------------------------------------")
			    	console.log(response.data)
			    	_this.tableData2=response.data.list
			    }).catch(function(error){
			    	console.log(error)
			    })
			},
			handleCurrentChange(currentPage) {
				var _this=this
				this.pageInfo.currentPage=currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response.data)
					_this.tableData2=response.data.list
				}).catch(function(error){
					console.log(error)
				})
			},
			handleSizeChange2(pagesize) {
			    var _this=this
			    this.pageInfo2.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo2)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/findAlloutstanding",{
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
				var ps = qs.stringify(this.pageInfo2)
				this.axios.get("http://localhost:8089/threeproject/findAlloutstanding",{
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
			qianfei(row){
				console.log(row.feesId)
				this.selectByFeeId(row.feesId)
			},
			//根据报班缴费id查询数据
			selectByFeeId(feesId){
				console.log(feesId+"-------")
				const _this=this
				this.axios.get("http://localhost:8089/threeproject/selectByfeeidtoentry?feesId="+feesId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.form=response.data
					console.log(response)
					_this.dialogoutStanding=true
				}).catch(function(error){
					console.log(error)
				})
			},
			// 欠费补缴多条件查询
			selectbyContion(select,input){
				const _this=this
				feeId=this.entryfeeId
				this.axios.get("http://localhost:8089/threeproject/selectBycontion",this.selectkey,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.qianfeidata=response.data.list
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			},
			//补缴管理的多条件查询
			selectByContionout(){
				this.pageInfo2.value1=moment(this.pageInfo2.value1).format("YYYY-MM-DD")
				this.pageInfo2.value2=moment(this.pageInfo2.value2).format("YYYY-MM-DD")
				console.log(this.pageInfo2.value1+"value1")
				console.log(this.pageInfo2.value2+"value2")
				console.log(this.pageInfo2.Approval+"Approval")
				const _this=this
				this.axios.get("http://localhost:8089/threeproject/selectByContionout",this.pageInfo2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.tableData2=response.data
				}).catch(function(error){
					console.log(error)
				})
			},
			
			// 新增欠费补缴（修改报班缴费的累计欠费,）
			addoutstanding(){
				const _this=this
				this.form2.feesId=this.form.feesId
				this.selectByFeeId(this.form2.feesId)
				console.log(this.form2.feesId+"feesId")
				this.form2.feesReceivable=this.form.feesReceivable
				this.form2.feesAdvance=this.form.feesAdvance
				this.form2.alongmoney=this.form.AlongMoney
				//累计欠费----//补缴金额
				this.form2.accumulated=this.form.feesaccumulated-this.form.AlongMoney
				this.form2.addname=this.$store.state.updateUserInfo.username
				this.axios.post("http://localhost:8089/threeproject/insertoutstanding",this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
					params:_this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response){
						console.log(response)
						_this.tableData2=response.data.list
						_this.pageInfo.total=response.data.total
					}).catch(function(error){
						console.log(error)
					})
					//修改报班缴费的累计欠费
					_this.updateAccumulated1(_this.form.feesId,_this.form.feesaccumulated,_this.form2.alongmoney)
					console.log(_this.form.feesId+"asdc"+_this.form.feesaccumulated)
					_this.form={}
					_this.form2={}
					_this.dialogoutStanding=false
					console.log(response)
				}).catch(function(error){
					console.log(error)
				})
			},
			// 补缴之后，修改报班缴费的累计欠费
			updateAccumulated1(feesId,feesaccumulated,alongmoney){
				const _this=this
				this.form3.feesId=feesId
				//累计欠费减去补缴的金额
				this.form3.feesaccumulated=feesaccumulated-alongmoney
				this.axios.put("http://localhost:8089/threeproject/updateFeesAccumulated",this.form3,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					// var entryfees=response.data
					// var row =_this.form.filter(d=>d.feesId==dept.feesId)[0]
				}).catch(function(error){
					console.log(error)
				})
			},
			//审核
			updateapproval(row){
				const _this=this
				this.PutDeleteForm.approvalname=this.$store.state.updateUserInfo.username
				this.PutDeleteForm.outstandingId=row.outstandingId
				this.axios.put("http://localhost:8089/threeproject/updateApprovalState",this.PutDeleteForm,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
					params:_this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response){
						console.log(response)
						_this.tableData2=response.data.list
						_this.pageInfo.total=response.data.total
					}).catch(function(error){
						console.log(error)
					})
				}).catch(function(error){
					console.log(error)
				})
			},
			// 撤销审核
			updateRevokeapproval(row){
				const _this=this
				this.PutDeleteForm.revokeappname=this.$store.state.updateUserInfo.username
				this.PutDeleteForm.outstandingId=row.outstandingId
				this.axios.put("http://localhost:8089/threeproject/updateReApprovalState",this.PutDeleteForm,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
					params:_this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response){
						console.log(response)
						_this.tableData2=response.data.list
						_this.pageInfo.total=response.data.total
					}).catch(function(error){
						console.log(error)
					})
				}).catch(function(error){
					console.log(error)
				})
			},
			// 删除
			deleteoutstanding(row){
				const _this=this
				this.PutDeleteForm.updatename=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/deleteoutstanding",this.PutDeleteForm,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
					params:_this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response){
						console.log(response)
						_this.tableData2=response.data.list
						_this.pageInfo.total=response.data.total
					}).catch(function(error){
						console.log(error)
					})
				}).catch(function(error){
					console.log(error)
				})
			}
		},
		created() {
			//查询报班缴费数据中缴费方式未预交的数据
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findAlloutstanding",{
				    params:this.pageInfo2,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.tableData=response.data.list
				_this.pageInfo2.total=response.data.total
			}).catch(function(error){
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/selectoutstanding",{
				    params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.tableData2=response.data.list
				_this.pageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>
</style>
