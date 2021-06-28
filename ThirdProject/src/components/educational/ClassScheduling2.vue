<template>
			<div style="margin-left: -950px;" :rules="rules">
				<el-select  v-model="form.classlist"  placeholder="请选择排课班级" 
					collapse-tags multiple filterable clearable style="width: 200px;margin-top: -20px;margin-left:370px;">
				    <el-option  v-for="classes in classesdata" :label="classes.classesName" :value="classes.classesId" style="width: 150px;"></el-option>
				</el-select>
				输入排课次数：
				<el-input v-model="form.coursecount" placeholder="请输入排课次数"
				 @change="chaosan"  max="3" min="0" type="number" style="width: 150px;align-self: center;"></el-input>&nbsp;
				<el-button type="primary" @click="insertScheduling">点击排课</el-button>
				
				<!-- 排课设置 -->
				
				<el-button type="primary" style="margin-left:30px;" @click="dialogform=true">
						排课设置<i class="el-icon-arrow-down el-icon--right"></i>				
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
			<!-- 课程表 -->
		
			<el-table  :data="tableData" border style="width: 100%; margin-top: 20px;"
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
				classroom:[],
				props: {
				    label: 'name',
				    children: 'zones'       
				},
				tableData:[]
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
			insertScheduling(){
				const _this=this
				this.form.addname="admin"
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
			this.axios.get("http://localhost:8089/threeproject/findEmp",{
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
	
</style>
