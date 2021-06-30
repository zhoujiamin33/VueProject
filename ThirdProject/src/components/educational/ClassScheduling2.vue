<template>
	<el-col :span="24" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
				<div class="el-center-title-content">
					<div class="ivn-page-header-main">
						<div class="ivn-page-header-row">
							<div class="ivu-page-header-title">排课管理</div>
						</div>
						<div class="ivn-page-header-row">
							<div class="ivu-page-header-content">
								排课管理
							</div>
						</div>
					</div>
				</div>
				<div style="margin-left:450px;margin-top:0px;margin-left:-150px;" :rules="rules">
					<el-select  v-model="form.classlist"  placeholder="请选择排课班级" 
						collapse-tags multiple filterable clearable style="width: 200px;margin-top: 20px;margin-left:370px;">
					    <el-option  v-for="classes in classesdata" :label="classes.classesName" :value="classes.classesId" style="width: 150px;"></el-option>
					</el-select>
					输入排课次数：
					<el-input v-model="form.coursecount" placeholder="请输入排课次数"
					 @change="chaosan"  max="3" min="0" type="number" style="width: 150px;align-self: center;"></el-input>&nbsp;
					<el-button type="primary" @click="insertScheduling">点击排课</el-button>
					
					<!-- 排课设置 -->
					
					<el-button type="primary" style="margin-left:30px;" @click="dialogform=true">
							排课设置			
					</el-button>	  
				
					
					<!-- 可用选择弹窗 -->
					<el-dialog title="排课设置" v-model="dialogform">
						<el-form>
							<el-form-item label="可用教室：">
								<el-select v-model="form.classrooms" filterable placeholder="请选择时段"  style="width: 200px;" multiple clearable collapse-tags>
								   <el-option  v-for="item in classroomdata" :value="item.classroomId" :label="item.classroomName"  style="width: 150px;"></el-option>
								</el-select>
							</el-form-item>
							
							
							<el-form-item label="可用时间：">
								<el-select v-model="form.periods" filterable placeholder="请选择时段"  style="width: 200px;" multiple clearable collapse-tags>
									<el-option  v-for="period in periodData" :label="period.period" :value="period.periodId" style="width: 150px;"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="可安排教师：">
								<el-select v-model="form.emps" filterable placeholder="请选择教师"  style="width: 200px;" multiple clearable collapse-tags>
									<el-option  v-for="emp in Empdata" :label="emp.empName" :value="emp.empId" style="width: 150px;"></el-option>
								</el-select>
							</el-form-item>
							<el-button type="primary" @click="sessionsetting">立即创建</el-button>
							<el-button @click="dialogform=false">取消</el-button>
						</el-form>
					</el-dialog>
				</div>
			</el-col>
		
			<!-- 课程表 -->
		
			<el-table  :data="tableData" border style="width: 100%; margin-top:200px;"
				:header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column prop="schedulingId" label="编号" align="center"> </el-table-column>
				<el-table-column prop="classes.classesName" label="班级名称"  width="180"> </el-table-column>
				<el-table-column prop="classroomId" label="上课教室"> </el-table-column>
				<el-table-column prop="period.period" label="上课教师"> </el-table-column>
				<el-table-column prop="address" label="上课时间"> </el-table-column>
				<el-table-column prop="address" label="上课时长"> </el-table-column>
			</el-table>
</template>

<script>
	export default  {
		name:"ClassScheduling2",
		data(){
			return{
				 value: new Date(),
				 classesdata:[],
				 classroomdata:[],
				 Empdata:[],
				 periodData:[],
				 form:{
					 classlist:[],
					 coursecount:2,
					 classrooms:[],
					 periods:[],
					 emps:[],
					 addname:""
				 },
				dialogform:false,
				dialogVisible:false,
				classroom:[],
				props: {
					multiple: true
				},
				tableData:[],
				listall:[]
			}	
		},
		methods:{
			handleCommand(command) {
			    this.$message(command)
			},
			teachertime(){
				this.dialogform=true
			},
			//判断派课次数
			chaosan(){
				if(this.form.Coursecount>=3 || this.form.Coursecount<=0){
					alert("一周排课次数不能大于3小于0")	
					// this.form.Coursecount=2
				}
			},
			//
		
			insertScheduling(){
				const _this=this
				this.form.addname=this.$store.state.updateUserInfo.username
				console.log(this.form.coursecount+"ddd")
				console.log(this.form.classrooms+"ddd")
				console.log(this.form.classlist+"ddd")
				console.log(this.form.periods+"ddd")
				console.log(this.form.emps+"ddd")
				this.axios.post("http://localhost:8089/threeproject/insertSheduling",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
				}).catch(function(error){
					console.log(error)
				})
			},
			//保存排课设置
			sessionsetting(){
			  alert("保存成功")
			  this.dialogform=false
			 
			}
		},
		created() {
			const _this=this
			//查询所有已开班的班级
			this.axios.get("http://localhost:8089/threeproject/selectOpen",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				_this.classesdata=response.data
				console.log(response)
			}).catch(function(error){
				console.log(error)
			}),
			//查询所有教室
			this.axios.get("http://localhost:8089/threeproject/findAllClassRoom",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.classroomdata=response.data
			}).catch(function(error){
				console.log(error)
			}),
			//查询所有时段
			this.axios.get("http://localhost:8089/threeproject/findTrainingperiods",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.periodData=response.data
			}).catch(function(error){
				console.log(error)
			})
			//查询所有教师
			this.axios.get("http://localhost:8089/threeproject/selectEmpteacher",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.Empdata=response.data
			}).catch(function(error){
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/selectAllScheduling",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.tableData=response.data
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>
	.ivu-divider {
			margin: 0 8px;
			display: inline-block;
			height: .9em;
			width: 1px;
			vertical-align: middle;
			position: relative;
			top: -.06em;
			font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
			font-size: 14px;
			line-height: 1.5;
			color: #515a6e;
			box-sizing: border-box;
			list-style: none;
			background: #e8eaec;
		}
	
		.el-center-top-labels {
			background-color: #FFF;
			height: 99px;
			margin-bottom: 20px;
		}
	
		.el-col {
			border-radius: 0px;
		}
	
		.el-center-title-content {
			padding: 16px 32px 0 32px;
		}
	
		.ivu-page-header-main {
			width: 100%;
		}
	
		.ivu-page-header-row {
			width: 100%;
		}
	
		.ivu-page-header-title {
			margin-bottom: 16px;
		}
	
		.ivu-page-header-title {
			display: inline-block;
			color: #17233d;
			font-weight: 500;
			font-size: 20px;
		}
	
		.ivu-page-header-content {
			font-size: 14px;
			margin-bottom: 16px;
			color: #515a6e;
		}
	
		.el-table-show-one-s {
			margin: 0 23px;
		}
	
		.el-select-table-one-s {
			float: left;
			margin-left: 30px;
			margin-top: 15px;
			font-size: 14px;
			color: #515a6e;
		}
	
		.el-select-table-two-s {
			margin-top: 15px;
			margin-right: 30px;
			float: right;
		}
	
		.el-input-one-s {
			height: 32px;
			width: 193px;
			margin-right: 30px;
		}
	
		.grid-content {
			height: 65px;
			border-radius: 0px;
		}
	
		.bg-purple-dark1 {
			background: #FFF;
		}
	
		.el-top-background-one-s {
			-webkit-border-top-left-radius: 4px;
			-webkit-border-top-right-radius: 4px;
		}
	
		.el-table-one-s {
			padding-top: 20px;
			height: 100%;
			padding-left: 15px;
			padding-right: 15px;
		}
	
		.el-table__body-wrapper {
			height: 100%;
		}
	
		.el-pagin-show-one-s {
			padding-top: 15px;
			padding-bottom: 15px;
			background: #FFF;
			margin-bottom: 30px;
			-webkit-border-bottom-left-radius: 4px;
			-webkit-border-bottom-right-radius: 4px;
		}
	
		/* switch按钮样式 */
		.switch .el-switch__label {
			position: absolute;
			display: none;
			color: #fff !important;
		}
	
		/*打开时文字位置设置*/
		.switch .el-switch__label--right {
			z-index: 1;
		}
	
		/* 调整打开时文字的显示位子 */
		.switch .el-switch__label--right span {
			margin-right: 9px;
		}
	
		/*关闭时文字位置设置*/
		.switch .el-switch__label--left {
			z-index: 1;
		}
	
		/* 调整关闭时文字的显示位子 */
		.switch .el-switch__label--left span {
			margin-left: 9px;
		}
	
		/*显示文字*/
		.switch .el-switch__label.is-active {
			display: block;
		}
	
		/* 调整按钮的宽度 */
		.switch.el-switch .el-switch__core,
		.el-switch .el-switch__label {
			width: 60px !important;
			margin: 0;
		}
	
		.el-table .cell {
			padding-left: 9px;
		}
	
		.el-button {
			width: min-content;
		}	
</style>
