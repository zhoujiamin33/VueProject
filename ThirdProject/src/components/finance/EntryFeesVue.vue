<template>
	<div style="margin-top:40px;width: 100%;">
	 	<!-- 搜索框、输入框 、按钮-->
	 	<div style="margin-left:10px;line-height: 40px;">
	 		<el-row >
	 			是否审核：
	 			<el-select  v-model="pageInfo.ApprovalState"  placeholder="请选择" >
	 				<el-option value="1" label="已审核">已审核</el-option>
					<el-option value="0" label="未审核">未审核</el-option>
	 			</el-select>
	 			<span style="margin-left: 20px;font-size: 15px;">缴费日期：</span>
	 			  <el-date-picker v-model="pageInfo.startTime"  align="center" type="date"
	 			      placeholder="开始日期" :disabled-date="disabledDate" :shortcuts="shortcuts"></el-date-picker>至
				  <el-date-picker v-model="pageInfo.endTime"  align="center" type="date"
				      placeholder="结束日期" :disabled-date="disabledDate" :shortcuts="shortcuts"></el-date-picker>
				
	 			<el-button style="margin-left:140px;" @click="selectBycontionEntry">查询</el-button>
				<el-button type="primary"  style="margin-left:90px;" @click="dialogFormVisible=true">新增报班</el-button>
	 		</el-row>
	 	</div>
	</div>	
		<!-- 表格 -->
		<div style="position: relative;margin-top: 50px;" >
			<el-table :data="tableData"  border style="width: 100%;margin-left:5px;" :header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column fixed  type="selection" align="center"> </el-table-column>
			    <el-table-column fixed prop="feesId" label="缴费编号" align="center"> </el-table-column>
				<el-table-column  prop="feesName" label="单据号"  width="200"  align="center"> </el-table-column>
			    <el-table-column prop="register.consultant" label="缴费学员"  align="center"> </el-table-column>
			    <el-table-column prop="feesReceivable" label="应收金额"  align="center"> </el-table-column>
			    <el-table-column prop="feesType"  label="缴费方式" align="center" > 
					<template v-slot="scope">
						<p v-if="scope.row.feesType==0">全额缴费</p>
						<p v-if="scope.row.feesType==1">预交缴费</p>
					</template>
				</el-table-column>
			    <el-table-column prop="feesAdvance" label="预交金额"  align="center"> </el-table-column>
				<el-table-column prop="receipts" label="实收金额"  align="center"> </el-table-column>
				<el-table-column prop="addname" label="录入人"  align="center"> </el-table-column>
			    <el-table-column fixed="right" label="操作"  align="center">
			      <template #default="scope">
					<p v-if="scope.row.approvalstate==0">
						<el-button type="warning" icon="el-icon-warning-outline" circle size="mini" @click="updateapproval(scope.row)"></el-button>
						<el-button type="danger" size="mini" circle icon="el-icon-minus" @click="deleteEntryfees(scope.row)"></el-button>
					</p>
			        <p v-if="scope.row.approvalstate==1">
					  <el-button type="success" icon="el-icon-check" circle size="mini" @click="updateRevokeapproval(scope.row)"></el-button>
					  <el-button type="danger" size="mini" circle icon="el-icon-minus" @click="deleteEntryfees(scope.row)"></el-button>
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
		<!-- 新增报班缴费 -->
		<el-dialog title=" 新增报班缴费" v-model="dialogFormVisible" width="55%">
		  <el-form :model="form">
		    <div>
				<div style="display: flex;justify-content: space-between;">
					 <el-form-item label="缴费人" > 
					  <el-select v-model="form.registerId" @change="selectByregisterId(form.registerId)">
						  <el-option v-for="item in regAttentState" :value="item.registerId" :label="item.consultant"></el-option>
					  </el-select>
				</el-form-item> 
				<el-form-item label="应收金额" v-model="form.feesReceivable">
					  <el-input v-model="coursedata.courseMoney"></el-input>
				</el-form-item>
				</div>
				<div style="display: flex;justify-content: space-between;">
					<div>
						<el-form-item label="缴费方式"  style="width:80px">
						  <el-select v-model="form.feesType" class="typeselect">
							  <el-option value="0" label="全额缴费">全额缴费</el-option>
							  <el-option value="1" label="预交缴费">预交缴费</el-option>
						  </el-select>
						</el-form-item>
						<el-form-item label="预交金额"   style="width:80px">
						  <el-input v-model="form.feesAdvance" style="width:80px"/>
						</el-form-item>
					</div>
					<div>
						<el-form-item label="实收金额">
						  <el-input v-model="form.receipts"></el-input>
						</el-form-item>
					</div>
				</div>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取 消</el-button>
		      <el-button type="primary" @click="addEntryFees">保存并新建</el-button>
		    </span>
		  </template>
		
		
		</el-dialog>
</template>

<script>
	import qs from 'qs'
	import moment from "moment"
	export default{
		name:"entryfees",
		data(){
			return {
				value:"",
				tableData:[],
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:4,//每页多少条数据
					total:0,
					ApprovalState:"",
					startTime:"",
					endTime:"",
				},
				dialogFormVisible:false,//报班缴费
				dialogFormbubao:false,//补报缴费
				rekereport:[],
				reportForm:{
					supplementaryId:"",feesReceivable:"",payment:"",feesAdvance:"",receipts:"",addname:""
				},
				form:{
					registerId:"",feesReceivable:"",feesType:"",feesAdvance:"",receipts:"",feesaccumulated:"",addname:""
				},
				//查询咨询状态为有意向的学员的信息
				regAttentState:[],
				//根据id查询咨询登记表中的信息
				registerdata:[],
				coursedata:[],
				coursedata2:[],
				// 修改缴费状态时传咨询登记id
				registerId:"",
				//课程Id
					courseId:"",
				//日期
				disabledDate(time) {
				    return time.getTime() > Date.now()
				},
				shortcuts: [{
				    text: 'Today',
				    value: new Date(),
				}, {
				    text: 'Yesterday',
				    value: (() => {
				    const date = new Date()
				    date.setTime(date.getTime() - 3600 * 1000 * 24)
				        return date
				      })(),
				    }, {
				      text: 'A week ago',
				      value: (() => {
				      const date = new Date()
				      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
				      return date
				    })(),
				}]
			}
		},
		methods:{
			handleSizeChange(pagesize) {
			    var _this=this
			    this.pageInfo.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
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
				this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
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
			//新增报班缴费
			addEntryFees(){
				const _this=this
				this.form.addname=this.$store.state.updateUserInfo.username
				this.form.feesReceivable=this.coursedata.courseMoney
				console.log(this.form.registerId)
				this.form.feesaccumulated=this.coursedata.courseMoney-this.form.feesAdvance
				console.log(this.form.feesaccumulated+"asadsa")
				this.axios.post("http://localhost:8089/threeproject/insertEntry",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
					params:_this.pageInfo,	
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.tableData=response.data.list
						_this.pageInfo.total = response.data.total
						console.log(this.registerId+"sads")
					}).catch(function(error) {
						console.log(error)
					})
					_this.updatepaystate(_this.form.registerId)
					console.log(_this.form.registerId+"ghj")
					_this.dialogFormVisible=false
					//清空表单
					_this.form={}
					_this.coursedata=[]
				}).catch(function(error){
					console.log(error)
				})
			},
			updateapproval(row){
				const _this=this
				console.log(row.feesId)
				this.axios.put("http://localhost:8089/threeproject/updateapproval",row,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
					params:_this.pageInfo,	
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						// var entryfees=response.data
						// var datas=_this.tableData.filter(d=>d.feesId==entryfees.feesId)[0]
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
				console.log(row.feesId)
				this.axios.put("http://localhost:8089/threeproject/updateRevokeapproval",row,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
					params:_this.pageInfo,	
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						// var entryfees=response.data
						// var datas=_this.tableData.filter(d=>d.feesId==entryfees.feesId)[0]
						_this.tableData=response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(error){
					console.log(error)
				})
			},
			deleteEntryfees(row){
				const _this=this
				this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(()=>{
						_this.axios.put("http://localhost:8089/threeproject/deleteEntryfees",row,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					_this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
					params:_this.pageInfo,			
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
							.then(function(response) {
								console.log(response)
								// var entryfees=response.data
								// var rows=_this.tableData.filter(d=>d.feesId!=row.feesId)
								_this.tableData=response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
							// var entryfees=response.data
							// // 删除后更新数据
							// var rows=_this.tableData.filter(d=>d.feesId!=row.feesId)
							// console.log("del rows:%o",rows)
							// _this.deptData=rows
						}).catch(function(error){
							console.log(error)
				      })
				}).catch(function(){
					this.$message({
						type: 'error',
						message: '取消删除!'
					});
				})
			},
			//根据咨询登记id查询课程id,并根据课程id查询应缴金额
			selectByregisterId(registerId){
				const _this=this
				this.form.registerId=registerId
				console.log("0000"+registerId)
				this.axios.get("http://localhost:8089/threeproject/selectByregisterId?registerId="+this.form.registerId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					console.log(response)
					_this.registerdata=response.data
					_this.courseId=response.data.courseId
					// _this.updatepaystate(response.data.registerIds)
					console.log(_this.courseId+"xixixix")
					_this.axios.get("http://localhost:8089/threeproject/selectByCourseId?courseId="+_this.courseId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response){
						console.log(response)
						_this.coursedata=response.data
						console.log("1111:"+response.data.courseId)
						
					}).catch(function(error){
						console.log(error)
					})
				}).catch(function(error) {
					console.log(error)
				})
			},
			//修改咨询登记表的缴费状态
			updatepaystate(registerId){
				this.registerId=registerId
				const _this=this
				this.axios.delete("http://localhost:8089/threeproject/updatepaystate?registerId="+this.registerId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
				this.axios.get("http://localhost:8089/threeproject/selectAttentState",{
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
				.then(function(response) {
					console.log(response)
					_this.regAttentState=response.data
				}).catch(function(error) {
					console.log(error)
				})
				}).catch(function(error){
					console.log(error)
				})
			},
			//多条件查询
			selectBycontionEntry(){
				const _this=this
				console.log(this.pageInfo.ApprovalState+"abc")
				// this.pageInfo.value2=moment(this.value).format("YYYY-MM-DD")
				// this.pageInfo.value2=this.value.toLocaleString()
				console.log(this.pageInfo.value2)
				console.log(this.pageInfo.input+"abcdef")
				console.log(this.pageInfo.value2+"date2")
				console.log(this.pageInfo.currentPage+"currentPage")
				this.axios.get("http://localhost:8089/threeproject/selectBycontionEntry",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					console.log(response)
					_this.tableData=response.data.list
					_this.pageInfo.total=response.data.total
				}).catch(function(error) {
					console.log(error)
				})
			},
			
			// 根据补报Id查询金额等信息
			selectByreport(supplementaryId){
				supplementaryId=this.reportForm.supplementaryId
				const _this=this
				this.axios.get("http://localhost:8089/threeproject/selectBysuppId?supplementaryId="+supplementaryId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(repsose){
					console.log(response)
					_this.reportForm=response.data
					_this.courseId=_this.reportForm.courseId
					_this.axios.get("http://localhost:8089/threeproject/selectByCourseId?courseId=",_this.courseId,{
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
						.then(function(response){
							console.log(response)
							console.log("1111:"+response.data.courseId)
							_this.coursedata2=response.data
						}).catch(function(error){
							console.log(error)
						})
				}).catch(function(error){
					console.log(error)
				})
			},
			//新增补报
			insertReportEntry(){
				const _this=this
				this.reportForm.addname=this.$store.state.userInfo.userName
				this.axios.post("http://localhost:8089/threeproject/insertEntry",this.reportForm,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
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
					_this.reportForm={}
				}).catch(function(error){
					console.log(error)
				})
			}
		},
		created() {
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findEntryFees",{
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
			this.axios.get("http://localhost:8089/threeproject/selectAttentState",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response) {
				console.log(response)
				_this.regAttentState=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			//查询补报管理信息
			this.axios.get("http://localhost:8089/threeproject/selectsupplementary",{
				headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
				}
			})
			.then(function(response){
				_this.rekereport=response.data
				console.log(response)
			}).catch(function(error){
				console.log(error)
			})	
		}
	}
</script>

<style>
	 .typeselect{
		width:  80px;
	}
</style>
