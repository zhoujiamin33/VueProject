<template>
		<div style="width:100%;height:90%;margin-top: 20px;">
			<div>
				<el-button type="primary"  style="width:100px;margin-top:20px; margin-right: -900px;margin-bottom: 20px;" @click="dialogFormVisible=true">点击排课</el-button>
			</div>
			<!-- 排课弹窗 -->
			<el-dialog :rules="rules" title=" 排课" v-model="dialogFormVisible" style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);">
				<el-descriptions class="margin-top" :column="3" direction="vertical" style="margin-left: 20px;">
				  <el-descriptions-item label="班级" >
					  <el-select v-model="form.classesId" filterable placeholder="请选择排课班级" @change="selectClassesdetails(form.classesId)"  style="width: 200px;">
					      <el-option  v-for="classes in classesdata" :label="classes.classesName" :value="classes.classesId" style="width: 150px;"></el-option>
					  </el-select>
				  </el-descriptions-item>
				  <el-descriptions-item label="教室">
				  	  <el-input v-model="form2.classroomName"  style="width: 150px;align-self: center;"></el-input>		  
				  </el-descriptions-item>
				  <el-descriptions-item label="教员" >
				  	  <el-input v-model="form2.empName"  style="width: 150px;align-self: center;"></el-input>		  
				  </el-descriptions-item>
				  <el-descriptions-item label="时段">
				  		<el-select v-model="form.periods" filterable placeholder="请选择时段"  style="width: 200px;" multiple clearable multiple-limit=2>
				  		    <el-option  v-for="item in Trainingperiods" :label="item.period" :value="item.periodId" style="width: 150px;"></el-option>
				  		</el-select>		 
				  </el-descriptions-item>
				  <el-descriptions-item label="课程">
					  <el-input v-model="form2.courseName" style="width: 150px;align-self: center;"></el-input>
				  </el-descriptions-item>
				  <el-descriptions-item label="当前进度">
					  <el-input v-model="form2.detailcourseName"  style="width: 150px;align-self: center;"></el-input>
				  </el-descriptions-item>
				  <el-descriptions-item label="本周上课次数">
				  		<el-input v-model="form2.Coursecount"  type="number" style="width: 150px;align-self: center;"></el-input>			  
				  </el-descriptions-item>
				  <el-descriptions-item label="剩余课时">
				  		<el-input v-model="form2.shengyuHours"  style="width: 150px;align-self: center;"></el-input>			  
				  </el-descriptions-item>
				</el-descriptions> 
				<el-button type="primary"  style="width:100px;margin-top:40px; "  @click="dialogFormVisible=false">取消排课</el-button>
				<el-button type="primary"  style="width:100px;margin-top:40px; " @click="insertScheduling">排课生成</el-button>
			</el-dialog>
			
			<!-- 课程表 -->
			<el-table :data="tableData" height="400" border style="width:100%;margin-left:10px;">
				<el-table-column fixed  type="selection" align="center"> </el-table-column>
				<el-table-column fixed prop="schedulingId" label="编号" align="center"></el-table-column>
				<el-table-column  prop="period.period" label="上课时间" align="center"></el-table-column>
				<el-table-column prop="classes.classesName" label="上课班级"  align="center"></el-table-column>
				<el-table-column prop="classes.emp.empName"  label="任课老师"  align="center"> </el-table-column>
				<el-table-column prop="classes.classroom.classroomName"  label="上课教室"  align="center"> </el-table-column>
				<el-table-column prop="classes.detailcourse.detailcourseName" label="课程内容"  align="center"> </el-table-column>
				<el-table-column prop="schedulingState" label="课程状态" align="center">
					<template v-slot="scope">
						<p v-if="scope.row.schedulingState==0">
							<el-button type="warning" icon="el-icon-more-outline" circle size="mini" @click="updateClassesOpen1(scope.row)"></el-button>
						</p>
						<p v-if="scope.row.schedulingState==1">
							<el-button type="success" icon="el-icon-check" circle size="mini" @click="updateClassesOpen0(scope.row)"></el-button>
						</p>
					</template>
				</el-table-column>
			</el-table>
		</div>
</template>

<script>
	export default  {
		name:"ClassScheduling",
		data(){
			return{
				tableData:[],
				dialogFormVisible:false,
				form:{
					class:"",
					value:[],
					//新增排课数据的字段
					classesId:"",
					periods:[],
					addname:""
				},
				form2:{
					//所有课段
					Trainingperiods:[],
					classesdata:[],
					//课程
					courseName:"",
					// 教员
					empName:"",
					// 教室
					classroomName:"",
					//当前进度
					detailcourseName:"",
					DetailCourse:[],
					//剩余课时
					shengyuHours:"",
					Coursecount:2,
					periods:[],
				},
				rules: {
				    Coursecount: [
				      { required: true, message: '请输入本周上课次数', trigger: 'blur' },
				      { min: 0, max: 3,  trigger: 'blur' }
				    ]
				},
				removedata:[],
				schedulingId:""
			}
		},
		methods:{
			//根据班级id查询班级详细课程进度
			selectClassesdetails(classesId){
				const _this=this
				this.axios.get("http://localhost:8089/threeproject/selectById/"+classesId)
				.then(function(response){
					console.log(response)
					_this.form2.DetailCourse=response.data
					_this.form2.detailcourseName=response.data.detailcourse.detailcourseName
					_this.form2.courseName=response.data.course.courseName
					_this.form2.classroomName=response.data.classroom.classroomName
					_this.form2.empName=response.data.emp.empName
					//剩余课时
					_this.form2.shengyuHours=response.data.course.classhours-response.data.whendetails
				}).catch(function(error){
					console.log(error)
				})
			},
			//新增排课表
			insertScheduling(){
				this.form2.periods=this.form.periods
				const _this=this
				this.selectremove(this.form2.periods,this.form2.classroomName,this.form2.empName)
				this.$confirm('您确定要生成排课吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.removedata.schedulingId != null) {
						_this.$message({
							showClose: true,
							message: '排课冲突请重新选择!',
							type: 'error'
						});
					} else {
						_this.form.addname="admin"
						_this.axios.post("http://localhost:8089/threeproject/insertSheduling",_this.form)
						.then(function(response){
							console.log(response)
							_this.axios.get("http://localhost:8089/threeproject/selectAllScheduling")
							.then(function(response){
								console.log(response)
								_this.tableData=response.data
							}).catch(function(error){
								console.log(error)
							})
						}).catch(function(error){
							console.log(error)
						})
						_this.dialogFormVisible = false
					}
				}).catch(() => {
					this.$message({
						type: 'error',
						message: '已取消排课操作'
					});
				});
			},
			//查询排课表选择的时间段、教室、教师有没有被使用
			selectremove(periods,classroomName,empName){
				const _this=this
				this.form2.periods=this.form.periods
				console.log(this.form2.periods)
				for(var i=0; i<this.form2.periods.length;i++ ){
					console.log(this.form2.periods[i]+"abc4")
					this.axios.get("http://localhost:8089/threeproject/selectremove/"+this.form2.periods[i]+"/"+this.form2.classroomName+"/"+this.form2.empName)
					.then(function(response){
						_this.removedata=response.data
						_this.schedulingId=response.data.schedulingId
						console.log(_this.schedulingId+"rrr")
						console.log(response)
					}).catch(function(error){
						console.log(error)
					})
				}
				
			},
		},
		created(){
			//查询所有课段
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findTrainingperiods")
			.then(function(response){
				_this.Trainingperiods=response.data
			}).catch(function(error){
				console.log(error)
			}),
			//查询所有已开班的班级
			this.axios.get("http://localhost:8089/threeproject/selectOpen")
			.then(function(response){
				_this.classesdata=response.data
				console.log(response)
			}).catch(function(error){
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/selectAllScheduling")
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
