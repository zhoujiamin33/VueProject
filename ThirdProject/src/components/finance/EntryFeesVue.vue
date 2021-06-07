<template>
	<div style="margin-top:40px;width: 100%;">
	 	<!-- 搜索框、输入框 、按钮-->
	 	<div style="margin-left:10px;line-height: 40px;">
	 		<el-row >
	 			是否审核：
	 			<el-select  v-model="Approval"  placeholder="请选择" >
	 				<el-option>已审核</el-option>
					<el-option>未审核</el-option>
	 			</el-select>
	 			缴费日期：
	 			<el-date-picker v-model="value2"  type="daterange" align="right"  unlink-panels 
	 			      range-separator="至" 
	 			      start-placeholder="开始日期"
	 			      end-placeholder="结束日期"
	 			      :shortcuts="shortcuts">
	 			</el-date-picker>
				经办人：
				<el-input  v-model="course" style="width: 150px;"></el-input>
	 			<el-button style="margin-left: 20px;">查询</el-button>
				<el-button type="primary" icon="el-icon-plus" style="margin-left:125px;" @click="dialogFormVisible=true">新增报班</el-button>
	 		</el-row>
	 	</div>
	</div>	
		<!-- 表格 -->
		<div style="position: relative;margin-top: 50px;">
			<el-table :data="tableData"  border style="width: 100%;margin-left:5px;">
				<el-table-column fixed  type="selection" align="center"> </el-table-column>
			    <el-table-column fixed prop="feesId" label="缴费编号" align="center"> </el-table-column>
				<el-table-column  prop="feesName" label="单据号"  width="150"  align="center"> </el-table-column>
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
				<!-- <el-table-column prop="feesState" label="缴费状态"> 
					<template v-slot="scope">
						<p v-if="scope.row.feesState==0">未缴费</p>
						<p v-if="scope.row.feesState==1">待缴费</p>
						<p v-if="scope.row.feesState==2">已缴费</p>
					</template>
				</el-table-column> -->
			    <el-table-column fixed="right" label="操作"  align="center">
			      <template #default="scope">
			        <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
			        <el-button type="text" size="small">撤销</el-button>
					<el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		</div>
		<div style="display: flex; justify-content: space-between;">
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
		
		
		<!-- 新增报班缴费 -->
		<el-dialog title=" 新增报班缴费" v-model="dialogFormVisible">
		  <el-form :model="form">
		    <div>
				<div style="display: flex;justify-content: space-between;">
					<el-form-item label="咨询编号" :label-width="formLabelWidth">
					  <el-input v-model="registerId" autocomplete="off" ></el-input>
					</el-form-item>
					<el-form-item label="应收金额" :label-width="formLabelWidth">
					  <el-input v-model="feesReceivable" autocomplete="off"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="缴费方式" :label-width="formLabelWidth" style="width: 120px">
					  <el-select v-model="feesType">
						  <option value="0" label="全额缴费">全额缴费</option>
						  <option value="1" label="预交缴费">预交缴费</option>
					  </el-select>
					</el-form-item>
					<el-form-item label="预交金额" :label-width="formLabelWidth"  style="width:80px">
					  <el-input v-model="feesAdvance" autocomplete="off"/>
					</el-form-item>
					<el-form-item label="实收金额" :label-width="formLabelWidth"  style="width:80px">
					  <el-input v-model="receipts" autocomplete="off"></el-input>
					</el-form-item>
				</div>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取 消</el-button>
		      <el-button type="primary" @click="updateType">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
</template>

<script>
	import qs from 'qs'
	export default{
		name:"entryfees",
		data(){
			return {
				Approval:"",student:"",course:"",value2:"",
				tableData:[],
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:2,//每页多少条数据
					total:0
				},
				dialogFormVisible:false,
				form:{
					registerId:"",feesReceivable:"",feesType:"",feesAdvance:"",receipts:"",
				},
			}
		},
		methods:{
			handleSizeChange(pagesize) {
			    var _this=this
			    this.pageInfo.pagesize=pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
			    this.axios.get("http://localhost:8089/threeproject/findEntryFees",{params:this.pageInfo})
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
				this.axios.get("http://localhost:8089/threeproject/findEntryFees",{params:this.pageInfo})
				.then(function(response){
					console.log(response.data)
					_this.tableData=response.data.list
				}).catch(function(error){
					console.log(error)
				})
			},
			addEntryFees(){
				const _this=this
				this.axios.post("http://localhost:8089/threeproject/insertEntryFees",this.form)
			}
		},
		created() {
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findEntryFees",{params:this.pageInfo})
			.then(function(response) {
				console.log(response)
				_this.tableData=response.data.list
				_this.pageInfo.total = response.data.total
			}).catch(function(error) {
				console.log(error)
			})
		},
		computed:{
			
		}
	}
</script>

<style>
</style>
