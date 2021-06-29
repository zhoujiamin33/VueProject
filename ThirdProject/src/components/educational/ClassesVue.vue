<template>
	<div>
		<div style="margin-left: -815px;">
			快速检索：
			<el-select v-model="pageInfo.value" placeholder="请选择" style="margin-top:50px; width: 120px;" clearable>
				<el-option label="全部" value="9"></el-option>
				<el-option label="班级名称" value="2"></el-option>
				<el-option label="班级编号" value="3"></el-option>
				<el-option label="上课教师" value="4"></el-option>
				<el-option label="已开班" value="1"></el-option>
				<el-option label="未开班" value="0"></el-option>
			</el-select>
			<el-input placeholder="请输入内容" v-model="pageInfo.input"  clearable style="width: 230px;" />
		</div>
		<div>
			<el-row style="margin-top: -40px;margin-left:1120px;">
				<el-button @click="selectByContion">查询</el-button>
			    <el-button  type="primary" @click="dialogFormVisible=true">新增</el-button>
			</el-row>
		</div>
		<!-- 新增班级 -->
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
		<el-table :data="tableData" border style="width:100%;margin-left:10px;"
		:header-cell-style="{background:'#eef1f6',color:'#606266'}">
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
	<!-- 分页 -->
	<div class="block" style="margin-right:590px;margin-top: 10px;">
	    <el-pagination
		  每页大小发生改变时怎么处理
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
		  当前页码
	      :current-page="pageInfo.currentPage"
	      :page-sizes="[3, 5, 7, 10]"
		  每页数据
	      :page-size="pageInfo.pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageInfo.total">
	    </el-pagination>
	</div> 
</template>

<script>
	import qs from 'qs'
	import { defineComponent, ref } from 'vue'
	export default  {
	    name:"ClassesVue",
		data (){
			return{
				pageInfo:{
					value:"",
					input:"",
					currentPage: 1,//标识当前页码
					pagesize:4,//每页多少条数据
					total:0
				},
				switchvalue:"",
				
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
					empName:"",
					addname:""
				},
				dialogFormEdit:false,
				//修改表单
				formEdit:{
					classesId:"",classroomId:"",userbookId:"",starteddate:"",enddate:"",teacherId:"",empId:"",updatename:""
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
				this.axios.get("http://localhost:8089/threeproject/selectByCourseTypeId?classtypeId="+classtypeId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
					console.log(response)
					_this.course=response.data
				}).catch(function(error) {
					console.log(error)
				}) 
			 },
			 handleSizeChange(pagesize) {
			     var _this=this
			     this.pageInfo.pagesize=pagesize
			 	var ps = qs.stringify(this.pageInfo)
			 	console.log(ps)
			     this.axios.get("http://localhost:8089/threeproject/findAllClass",{
					params:this.pageInfo
					},{
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
			 	this.axios.get("http://localhost:8089/threeproject/findAllClass",{
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
			 //新增班级
			 addClass(){
				 const _this=this
				 this.form.classesName=this.session+this.semester+this.form.classtype
				 console.log(this.form)
				 this.addname=this.$store.state.updateUserInfo.username
				 this.axios.post("http://localhost:8089/threeproject/insertClass",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
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
				this.formEdit.updatename=this.$store.state.updateUserInfo.username
				this.axios.put("http://localhost:8089/threeproject/updateClass",this.formEdit,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
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
				 this.axios.get("http://localhost:8089/threeproject/selectByContion",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.tableData=response.data.list
					_this.pageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
			 },
			 selectAll(){
				 const _this=this
				 this.axios.get("http://localhost:8089/threeproject/findAllClass",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				 .then(function(response){
				 	console.log(response)
				 	_this.tableData=response.data.list
				 	_this.pageInfo.total=response.data.total
				 }).catch(function(error){
				 	console.log(error)
				 })
			 },
			 //修改为已开班状态
			 updateClassesOpen1(row){
				 const _this=this
				 this.form2.classesId=row.classesId
				 this.form2.updatename=this.$store.state.updateUserInfo.username
				 this.form2.courseId=row.courseId
				 this.axios.put("http://localhost:8089/threeproject/updateClassesOpen1",this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				 .then(function(response){
					 _this.selectByCourseKey100(_this.form2.courseId,_this.form2.classesId)
					 _this.selectAll();
					
				 }).catch(function(error){
				 	console.log(error)
				 })
			 },
			 //根据课程id查询课程详细表序列号为100的数据
			 selectByCourseKey100(courseid,classesId){
				 const _this=this
				 this.axios.get("http://localhost:8089/threeproject/selectByCourseKey100?courseid="+courseid,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				 .then(function(response){
					 console.log(response)
					 _this.detailsdata=response.data
					 //把课程详细表序列号为100的数据赋值给刚刚新增的班级
					 _this.form3.classesId=classesId
					 _this.form3.detailcourseId=response.data.detailcourseId
					 _this.axios.put("http://localhost:8089/threeproject/updateDetails",_this.form3,{
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
				 }).catch(function(error){
					 console.log(error)
				 })
			 },
			//赋值课程详细数据同时新增排课表
			 //修改为未开班状态
			 updateClassesOpen0(row){
			 	const _this=this
				this.form2.classesId=row.classesId
				this.form2.updatename=this.$store.state.updateUserInfo.username
			 	this.axios.put("http://localhost:8089/threeproject/updateClassesOpen0",this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			 	.then(function(response){
					_this.selectAll()
			 	}).catch(function(error){
			 		console.log(error)
			 	})			 
			 },
			 //根据班级id查询班级详细信息
			 selectById(row){
				 const _this=this
				 this.selectByClass(row.classesId)
				 this.axios.get("http://localhost:8089/threeproject/selectById?classesId="+row.classesId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
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
				this.axios.get("http://localhost:8089/threeproject/selectByClass?classesId="+classesId,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
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
		  	this.axios.get("http://localhost:8089/threeproject/findAllClass",{
					params:this.pageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
		  	.then(function(response){
		  		console.log(response)
				_this.tableData=response.data.list
				_this.pageInfo.total=response.data.total
		  	}).catch(function(error){
				console.log(error)
			}),
			// 年届
			this.axios.get("http://localhost:8089/threeproject/findyear",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
				console.log(response)
				_this.yeardata=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			// 学期
			this.axios.get("http://localhost:8089/threeproject/findSemester",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
				console.log(response)
				_this.schoolterm=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			// 课类
			this.axios.get("http://localhost:8089/threeproject/findClassType",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
				console.log(response)
				_this.coursetype=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			// 使用教材
			this.axios.get("http://localhost:8089/threeproject/selectAllBook",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
				console.log(response)
				_this.book=response.data
			}).catch(function(error) {
				console.log(error)
			}),
			//查询所有教室
			this.axios.get("http://localhost:8089/threeproject/findAllClassRoom",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
				console.log(response)
				_this.classRoom=response.data
			}).catch(function(error) {
				console.log(error)
			})
			//查询教师
			this.axios.get("http://localhost:8089/threeproject/findEmp",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
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
