<template>
	<div>
		<div style="margin-left: -815px;">
			快速检索：
			<el-select v-model="value" placeholder="请选择" style="margin-top:50px; width: 120px;" clearable>
				<el-option label="班级名称" value="班级名称"></el-option>
				<el-option label="班级编号" value="班级编号"></el-option>
				<el-option label="上课教师" value="上课教师"></el-option>
			</el-select>
			<el-input placeholder="请输入内容" v-model="input"  clearable style="width: 230px;" />
		</div>
		<div>
			<el-row style="margin-top: -40px;margin-left:1120px;">
				<el-button @click="selectByContion">查询</el-button>
			    <el-button  type="primary" @click="dialogFormVisible=true">新增</el-button>
			</el-row>
		</div>
			
		<el-dialog title="新增班级" v-model="dialogFormVisible" width="55%">
			 <el-descriptions class="margin-top" title="带边框列表" :column="2" :size="size" border>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-location-outline"></i>年届管理
				  </template>
				  <el-select v-model="session">
					<el-option v-for="year in yeardata" :value="year.sessionName" :label="year.sessionName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-tickets"></i>学期管理
				  </template>
				  <el-select v-model="semester">
				  	<el-option v-for="term in schoolterm" :value="term.semesterName" :label="term.semesterName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>培训类别
				  </template>
				  <el-select v-model="form.classtype" @change="selectCourse(classtype)">
					<el-option v-for="type in coursetype" :value="type.classtypeName" :label="type.classtypeName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>开设课程
				  </template>
				  <el-select v-model="form.courseId">
					<el-option v-for="courses in course" :value="courses.courseId" :label="courses.courseName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>使用教材
				  </template>
				  <el-select v-model="form.userbookId">
					<el-option v-for="books in book" :value="books.bookId" :label="books.bookname"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>带班教师
				  </template>
				  <el-select v-model="form.empId">
					<el-option v-for="emp in empdata" :value="emp.empId" :label="emp.empName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<template #extra>
				  <el-button type="primary" size="small" @click="addClass">新增</el-button>
				</template>
			</el-descriptions>
		</el-dialog>
		
		<!-- 修改班级 -->
		<el-dialog title="修改班级" v-model="dialogFormEdit" width="75%">
			 <el-descriptions class="margin-top" title="带边框列表" :column="2" :size="size" border>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>选择教室
				  </template>
				  <el-select v-model="formEdit.classroomId">
					<el-option v-for="room in classRoom" :value="room.classroomId" :label="room.classroomName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>使用教材
				  </template>
				  <el-select v-model="formEdit.userbookId">
					<el-option v-for="books in book" :value="books.bookId" :label="books.bookname"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>开始日期
				  </template>
				   <el-date-picker
				        v-model="formEdit.starteddate"
				        align="center"
				        type="date"
				        placeholder="选择日期"
				        :disabled-date="disabledDate"
				        :shortcuts="shortcuts">
				    </el-date-picker>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>计划结束日期
				  </template>
				 <el-date-picker
				      v-model="formEdit.enddate"
				      align="center"
				      type="date"
				      placeholder="选择日期"
				      :disabled-date="disabledDate"
				      :shortcuts="shortcuts">
				  </el-date-picker>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>教员老师
				  </template>
				  <el-select v-model="formEdit.teacherId">
					<el-option v-for="emp in empdata" :value="emp.empId" :label="emp.empName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>带班教师
				  </template>
				  <el-select v-model="formEdit.empId">
					<el-option v-for="emp in empdata" :value="emp.empId" :label="emp.empName"></el-option>
				  </el-select>
				</el-descriptions-item>
				<template #extra>
				  <el-button type="primary" size="small" @click="updateClass">保存</el-button>
				</template>
			</el-descriptions>
		</el-dialog>
		<!-- 查看班级详情 -->
		<el-dialog title="查看班级详情" v-model="dialogFormsee" width="75%">
			 <el-descriptions class="margin-top"  :column="3" :size="size" border>
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>班级号
				  </template>
				 <el-input v-model="form.classesNumber"></el-input>
				</el-descriptions-item> 
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>班级名称
				  </template>
				 <el-input v-model="form.classesName"></el-input>
				</el-descriptions-item> 
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>教室
				  </template>
				 <el-input v-model="form.classroomName"></el-input>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>使用教材
				  </template>
				 <el-input v-model="form.bookname"></el-input>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>开始日期
				  </template>
				    <el-date-picker
				        v-model="form.starteddate" align="center" type="date"
				        placeholder="选择日期" :disabled-date="disabledDate" :shortcuts="shortcuts">
				    </el-date-picker>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>计划结束日期
				  </template>
				 <el-date-picker 
					 v-model="form.enddate" align="center" type="date" placeholder="选择日期" 
					 :disabled-date="disabledDate" :shortcuts="shortcuts">
				 </el-date-picker>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>教员老师
				  </template>
				 <el-input v-model="form.teacherName"></el-input>
				</el-descriptions-item>
				
				<el-descriptions-item>
				  <template #label>
					<i class="el-icon-office-building"></i>带班教师
				  </template>
				  <el-input v-model="form.empName"></el-input>
				</el-descriptions-item>
				
				<template #extra>
				  <el-button type="primary" size="small" @click="updateClass">保存</el-button>
				</template>
			</el-descriptions>
			<p>班级学员</p>
			<el-table :data="selectStudent" height="250" border style="width: 100%">
			    <el-table-column prop="selectById" label="编号" width="180"></el-table-column>
			    <el-table-column prop="studentName" label="姓名"  width="180"></el-table-column>
			    <el-table-column prop="studentPhone" label="联系电话"></el-table-column>
			</el-table>
		</el-dialog>
		
		<!-- 派课 -->
		<el-dialog title="派课" v-model="dialogFormtokei" width="75%">
			
		</el-dialog>
	</div>
	<!-- 表格 -->
	<div style="margin-top: 30px;">
		<el-table :data="tableData" height="300" border style="width:100%;margin-left:10px;">
			<el-table-column fixed  type="selection" align="center"> </el-table-column>
		    <el-table-column fixed prop="classesNumber" label="班级编号" width="150" align="center"></el-table-column>
			<el-table-column  prop="classesName" label="班级名称" width="200" align="center"></el-table-column>
		    <el-table-column prop="starteddate" label="培训期限"  width="200" align="center"></el-table-column>
		    <el-table-column prop="emp.empName"  label="任课老师"  width="150" align="center"> </el-table-column>
		    <el-table-column prop="zip" label="班级人数" width="120" align="center"> </el-table-column>
			<el-table-column prop="zip" label="开班状态" width="200" align="center">
				<template v-slot="scope">
					<p v-if="scope.row.classesOpen==0">
						<el-button type="warning" icon="el-icon-more-outline" circle size="mini" @click="updateClassesOpen1(scope.row)"></el-button>
					</p>
					<p v-if="scope.row.classesOpen==1">
						<el-button type="success" icon="el-icon-check" circle size="mini" @click="updateClassesOpen0(scope.row)"></el-button>
					</p>
				</template>
			</el-table-column>
		    <el-table-column fixed="right" label="操作" width="150" align="center">
		      <template #default="scope">
				<el-button @click="show(scope.row)" type="text" size="small">查看</el-button>
				<el-button @click="showEdit(scope.row)" type="text" size="small">修改</el-button>
				<el-button @click="selectById(scope.row)" type="text" size="small">派课</el-button>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { defineComponent, ref } from 'vue'
	export default  {
	    name:"ClassesVue",
		data (){
			return{
				switchvalue:"",
				value:"",
				input:"",
				tableData:[],
				//年届名称
				session:"",
				// 学期名称
				semester:"",
				// 课类
				classtype:"",
				//新增弹窗
				dialogFormVisible:false,
				yeardata:[],schoolterm:[],course:[],coursetype:[],book:[],classRoom:[],empdata:[],
				//新增表单
				form:{
					classtype:"",
					classesName:"",
					userbookId:"",
					courseId:"",
					classesNumber:"",
					classroomName:"",
					bookname:"",
					starteddate:"",
					enddate:"",
					teacherName:"",
					empName:""
				},
				dialogFormEdit:false,
				//修改表单
				formEdit:{
					classesId:"",classroomId:"",userbookId:"",starteddate:"",enddate:"",teacherId:"",empId:""
				},
				dialogFormsee:false,
				//修改班级状态的id
				form2:{
					classesId:"",
					updatename:"",
					courseId:""
				},
				dialogFormtokei:false,
				//根据id查询班级信息
				selectById:[],
				//给开班的班级添加第一节课程详细
				form3:{
					classesId:"",
					detailcourseId:""
				},
				//根据课程id查询课程详细表序列号为100的数据
				detailsdata:[],
				selectStudent:[]
			}
		},
		 setup() {
		    return {
		      input: ref('')
		    }
		  },
		  methods:{
			  // 根据课类名查询课程
			 selectCourse(classtypeId){
				const _this=this
				classtypeId=this.form.classtype
				this.axios.get("http://localhost:8089/threeproject/selectByCourseTypeId/"+classtypeId)
					.then(function(response) {
					console.log(response)
					_this.course=response.data
				}).catch(function(error) {
					console.log(error)
				}) 
			 },
			 //新增班级
			 addClass(){
				 const _this=this
				 this.form.classesName=this.session+this.semester+this.form.classtype
				 console.log(this.form)
				 this.axios.post("http://localhost:8089/threeproject/insertClass",this.form)
				 .then(function(response){
					_this.selectAll()
					_this.dialogFormVisible=false
					_this.form={}
				 }).catch(function(error){
					 console.log(error)
				 })
			 },
			 //修改显示
			 showEdit(row){
				this.formEdit.classesId=row.classesId
				this.formEdit.classroomId=row.classroomId,
				this.formEdit.userbookId=row.userbookId,
				this.formEdit.starteddate=row.starteddate,
				this.formEdit.enddate=row.enddate,
				this.formEdit.teacherId=row.teacherId,
				this.formEdit.empId=row.empId, 
				this.dialogFormEdit=true
			 },
			 // 查看显示
			 show(row){
				console.log(row+"heihei")
			 	this.form.classesNumber=row.classesNumber,
			 	this.form.classesName=row.classesName,
			 	this.form.classroomName=row.classroom.classroomName,
			 	this.form.bookname=row.book.bookname,
			 	this.form.starteddate=row.starteddate,
			 	this.form.enddate=row.enddate,
				//教员老师
			 	this.form.teacherName=row.emp.teacherName, 
				//带班老师
				this.form.empName=row.emp.empName, 
			 	this.dialogFormsee=true	
				this.selectByClass(row.classesId)
			 },
			 //修改班级
			 updateClass(){
				const _this=this
				this.axios.put("http://localhost:8089/threeproject/updateClass",this.formEdit)
				.then(function(response){
					console.log(response)
					_this.selectAll()
					_this.dialogFormEdit=false
				}).catch(function(error){
					console.log(error)
				})
			 },
			 // 多条件查询
			 selectByContion(){
				const _this=this
				 this.axios.get("http://localhost:8089/threeproject/selectByContion/"+this.value+"/"+this.input)
				.then(function(response){
					console.log(response)
					_this.tableData=response.data
				}).catch(function(error){
					console.log(error)
				})
			 },
			 selectAll(){
				 const _this=this
				 this.axios.get("http://localhost:8089/threeproject/findAllClass")
				 .then(function(response){
				 	console.log(response)
				 	_this.tableData=response.data
				 }).catch(function(error){
				 	console.log(error)
				 })
			 },
			 //修改为已开班状态
			 updateClassesOpen1(row){
				 const _this=this
				 this.form2.classesId=row.classesId
				 this.form2.updatename="admin"
				 this.form2.courseId=row.courseId
				 this.axios.put("http://localhost:8089/threeproject/updateClassesOpen1",this.form2)
				 .then(function(response){
					 _this.selectByCourseKey100(_this.form2.courseId,_this.form2.classesId)
					 _this.axios.get("http://localhost:8089/threeproject/findAllClass")
					 .then(function(response){
						console.log(response)
						_this.tableData=response.data
					 }).catch(function(error){
						console.log(error)
					 })
				 }).catch(function(error){
				 	console.log(error)
				 })
			 },
			 //根据课程id查询课程详细表序列号为100的数据
			 selectByCourseKey100(courseid,classesId){
				 const _this=this
				 this.axios.get("http://localhost:8089/threeproject/selectByCourseKey100/"+courseid)
				 .then(function(response){
					 console.log(response)
					 _this.detailsdata=response.data
					 //把课程详细表序列号为100的数据赋值给刚刚新增的班级
					 _this.form3.classesId=classesId
					 _this.form3.detailcourseId=response.data.detailcourseId
					 _this.axios.put("http://localhost:8089/threeproject/updateDetails",_this.form3)
					 .then(function(response){
						 console.log(response)
					 }).catch(function(error){
						 console.log(error)
					 })
				 }).catch(function(error){
					 console.log(error)
				 })
			 },
			//赋值课程详细数据同时新增排课表
			 //修改为未开班状态
			 updateClassesOpen0(row){
			 	const _this=this
				this.form2.classesId=row.classesId
				this.form2.updatename="admin"
			 	this.axios.put("http://localhost:8089/threeproject/updateClassesOpen0",this.form2)
			 	.then(function(response){
			 		_this.axios.get("http://localhost:8089/threeproject/findAllClass")
			 		.then(function(response){
			 			console.log(response)
			 			_this.tableData=response.data
			 		}).catch(function(error){
			 			console.log(error)
			 		})
			 	}).catch(function(error){
			 		console.log(error)
			 	})			 
			 },
			 //根据班级id查询班级详细信息
			 selectById(row){
				 const _this=this
				 this.selectByClass(row.classesId)
				 this.axios.get("http://localhost:8089/threeproject/selectById/"+row.classesId)
				 .then(function(response){
					console.log(response)
					_this.selectById=response.data
					_this.dialogFormtokei=true
				 }).catch(function(error){
					 console.log(error)
				 })
			 },
			 selectByClass(classesId){
				const _this=this
				this.axios.get("http://localhost:8089/threeproject/selectByClass/"+classesId)
				.then(function(response){
					_this.selectStudent=response.data
					console.log(response)				
				}).catch(function(error){
					console.log(error)				 
				}) 
			 }
		  },
		  created() {
		  	const _this=this
		  	this.axios.get("http://localhost:8089/threeproject/findAllClass")
		  	.then(function(response){
		  		console.log(response)
				_this.tableData=response.data
		  	}).catch(function(error){
				console.log(error)
			}),
			// 年届
			this.axios.get("http://localhost:8089/threeproject/findyear")
				.then(function(response) {
				console.log(response)
				_this.yeardata=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			// 学期
			this.axios.get("http://localhost:8089/threeproject/findSemester")
				.then(function(response) {
				console.log(response)
				_this.schoolterm=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			// 课类
			this.axios.get("http://localhost:8089/threeproject/findClassType")
				.then(function(response) {
				console.log(response)
				_this.coursetype=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			// 使用教材
			this.axios.get("http://localhost:8089/threeproject/selectAllBook")
				.then(function(response) {
				console.log(response)
				_this.book=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			//查询所有教室
			this.axios.get("http://localhost:8089/threeproject/findAllClassRoom")
				.then(function(response) {
				console.log(response)
				_this.classRoom=response.data
			}).catch(function(error) {
				console.log(error)
			})
			//查询教师
			this.axios.get("http://localhost:8089/threeproject/findEmp")
				.then(function(response) {
				console.log(response)
				_this.empdata=response.data
			}).catch(function(error) {
				console.log(error)
			})
		}
	}
</script>

<style>
</style>
