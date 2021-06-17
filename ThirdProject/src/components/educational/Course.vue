<template>
	<!-- 删除、修改开停设状态 -->
	<div style="margin-top: 35px;">
		<el-row style="margin-left:1095px;margin-bottom: 10px;">
		  <el-button @click="dialogFormVisible=true" type="primary" icon="el-icon-plus">新增</el-button>
		  
		</el-row>
		<!-- 新增弹窗 -->
		<el-dialog title="新增课程" v-model="dialogFormVisible">
		  <el-form :model="form">
		    <div >
				<div style="display: flex; justify-content: space-between;">
					<el-form-item label="课程类型" >
					  <el-select v-model="form.classtypeId" autocomplete="off" >
						  <el-option v-for="item in typedata" :value="item.classtypeId" :label="item.classtypeName"></el-option>
					  </el-select>
					</el-form-item>
					<el-form-item label="课程名称" >
					  <el-input v-model="form.courseName" autocomplete="off"></el-input>
					</el-form-item>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<el-form-item label="课时" 
					 :rules="[{ type: 'number', message: '年龄必须为数字值'}]">
					  <el-input v-model="form.classhours" autocomplete="off"></el-input>节
					</el-form-item>
					<el-form-item label="费用" >
					  <el-input v-model="form.courseMoney" autocomplete="off"></el-input>元
					</el-form-item>
				</div>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取 消</el-button>
		      <el-button type="primary" @click="addCourse">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
		<!-- 修改弹窗 -->
		<el-dialog title="修改课程" v-model="dialogFormVisible2">
		  <el-form :model="form">
		    <div >
				<div style="display: flex; justify-content: space-between;">
					<el-form-item label="课程编号">
					  <el-input v-model="form.courseId" autocomplete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="课程名称" >
					  <el-input v-model="form.courseName" autocomplete="off"></el-input>
					</el-form-item>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<el-form-item label="课时" 
					 :rules="[{ type: 'number', message: '年龄必须为数字值'}]">
					  <el-input v-model="form.classhours" autocomplete="off"></el-input>节
					</el-form-item>
					<el-form-item label="费用" >
					  <el-input v-model="form.courseMoney" autocomplete="off"></el-input>元
					</el-form-item>
				</div>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		      <el-button type="primary" @click="updateCourse">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
		<!--课程详细弹窗 -->
		<el-dialog title="查看课程详细" v-model="findDetail">
			<el-row style="margin-left:570px;margin-bottom: 10px;width: 300px;">
				<el-button @click="dialogDetailForm=true" type="primary" icon="el-icon-plus"  size="mini">新增</el-button>
				<el-button  type="danger" icon="el-icon-minus"  size="mini">删除</el-button>
			</el-row>	
			<el-table :data="detailData" border style="width:100%;margin-left:10px;" ref="singleTable" highlight-current-row>
			    <el-table-column  type="selection"> </el-table-column>
				<el-table-column  prop="serial" label="序列号"></el-table-column>
			    <el-table-column  prop="detailcourseName" label="课程详细名称">
					<template #default="scope">
						<a href="#" @click="showRowDetail(scope.row)">{{scope.row.detailcourseName}}</a>
					</template>
				</el-table-column>
			  </el-table>
			  <div class="block2" style="margin-top:20px;width:430px;">
			      <el-pagination
			  	  每页大小发生改变时怎么处理
			        @size-change="handleSizeChange2"
			        @current-change="handleCurrentChange2"
			  	  当前页码
			        :current-page="pageInfo2.currentPage"
			        :page-sizes="[2, 3, 6, 10]"
			  	  每页数据
			        :page-size="pageInfo2.pagesize"
			        layout="total, sizes, prev, pager, next, jumper"
			        :total="pageInfo2.total">
			      </el-pagination>
			  </div> 
			  <!-- 新增课程详细 -->
			  <el-dialog title="新增课程详细" v-model="dialogDetailForm" style="width:300px;">
				  <el-form :model="detailsForm" style="display: flex;justify-content: space-between;">
					<el-form-item label="课程序列号">
						<el-input v-model="detailsForm.serial" autocomplete="off"></el-input>
					</el-form-item>  
				  	<el-form-item label="课程详细名称" >
				  		<el-input v-model="detailsForm.detailcourseName" autocomplete="off"></el-input>
				  	</el-form-item>
				  </el-form>
				  <template #footer>
				    <span class="dialog-footer">
				      <el-button @click="dialogDetailForm = false">取 消</el-button>
				      <el-button type="primary" @click="addDetails">保存并新建</el-button>
				    </span>
				  </template>
			  </el-dialog>
			  
			  <!-- 修改课程详细 -->
			  <el-dialog title="修改课程详细" v-model="dialogDetailForm2" style="width:300px;">
			  		<el-form :model="detailsForm" style="display: flex;justify-content: space-between;">
			  			<el-form-item label="课程序列号">
			  				<el-input v-model="detailsForm.serial" autocomplete="off"></el-input>
			  			</el-form-item>  
			  		<el-form-item label="课程详细名称">
			  			<el-input v-model="detailsForm.detailcourseName" autocomplete="off"></el-input>
			  		</el-form-item>
			  		</el-form>
			  		<template #footer>
			  			<span class="dialog-footer">
			  				<el-button @click="dialogDetailForm2 = false">取 消</el-button>
			  				<el-button type="primary" @click="updateDetails">保存并新建</el-button>
			  			</span>
			  		</template>
			  </el-dialog>
		</el-dialog>	
	</div>
	<!-- 表格 -->
	<div>
		<el-table :data="tableData" border style="width:100%;margin-left:5px;" ref="singleTable" highlight-current-row
		@selection-change="handleSelectionChange">
		    <el-table-column fixed  type="selection" align="center"> </el-table-column>
		    <el-table-column fixed prop="courseId" label="编号" width="150" align="center"> </el-table-column>
		    <el-table-column fixed prop="courseName" label="课程名称" width="150" align="center">
				<template #default="scope">
					<a href="#" @click="findDetailCourses(scope.row.courseId)">{{scope.row.courseName}}</a>
				</template>
			</el-table-column>
		    <el-table-column  prop="classtype.classtypeName" label="课程类型" width="150" align="center" > </el-table-column>
		    <el-table-column prop="classhours" label="课时量"  width="120" align="center"> </el-table-column>
		    <el-table-column prop="courseMoney" label="费用" width="120" align="center"> </el-table-column>
		    <el-table-column  fixed="right" prop="courseState"  label="开设状态" width="200" align="center">
				<template #default="scope">
					<p v-if="scope.row.courseState==0">
						<el-button type="warning" icon="el-icon-warning-outline" circle size="mini" @click="updateapproval(scope.row)"></el-button>
					</p>
					<p v-if="scope.row.courseState==1">
						<el-button type="success" icon="el-icon-check" circle size="mini" @click="updateRevokeapproval(scope.row)"></el-button>
					</p>
				</template>
		    </el-table-column>
			<el-table-column fixed="right" label="操作"  width="100" align="center">
				<template #default="scope">
					<el-button type="text" size="small" @click="setCurrent(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		  </el-table>
	</div>
	<div class="block" style="margin-top:20px;width: 730px;text-align: end;">
	    <el-pagination
		  每页大小发生改变时怎么处理
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
		  当前页码
	      :current-page="pageInfo.currentPage"
	      :page-sizes="[2, 3, 6, 10]"
		  每页数据
	      :page-size="pageInfo.pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="pageInfo.total">
	    </el-pagination>
	</div> 
</template>


<script>
	import qs from 'qs'
export default{
	name:"classtype",
	data (){
		return{ 
			value:"",
			type:"",
			pageInfo:{
				currentPage:1,//标识当前页码
				pagesize:2,//每页多少条数据
				total:0
			},
			pageInfo2:{
				currentPage:1,//标识当前页码
				pagesize:2,//每页多少条数据
				total:0,
				courseId:""
			},
			detailsForm:{
				courseId:"",detailcourseId:"",detailcourseName:"",serial:""
			},
			typedata:[],
			tableData:[],
			form:{
				courseId:"", classtypeId:"",courseName:"",courseMoney:"",classhours:""
			},
			detailData:[],
			dialogFormVisible:false,
			dialogFormVisible2:false,
			findDetail:false,
			dialogDetailForm:false,
			dialogDetailForm2:false,
			multipleSelection:[]
		}
	},
	 methods: {
		 handleSelectionChange(val) {
		 	this.multipleSelection = [];
		 	console.log(val)
		 }, 
		 handleSizeChange(pagesize) {
		     var _this=this
		     this.pageInfo.pagesize=pagesize
		 	var ps = qs.stringify(this.pageInfo)
		 	console.log(ps)
		     this.axios.get("http://localhost:8089/threeproject/findcourse",{params:this.pageInfo})
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
		 	this.axios.get("http://localhost:8089/threeproject/findcourse",{params:this.pageInfo})
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
		 	var ps = qs.stringify(this.pageInfo2)
		 	console.log(ps)
		     this.axios.get("http://localhost:8089/threeproject/findDetailCourses",{params:this.pageInfo2})
		     .then(function(response){
		     	console.log("-------------------------------------------")
		     	console.log(response.data)
		     	_this.detailData=response.data.list
		     }).catch(function(error){
		     	console.log(error)
		     })
		 },
		 handleCurrentChange2(currentPage) {
		 	var _this=this
		 	this.pageInfo2.currentPage=currentPage
		 	var ps = qs.stringify(this.pageInfo2)
		 	this.axios.get("http://localhost:8089/threeproject/findDetailCourses",{params:this.pageInfo2})
		 	.then(function(response){
		 		console.log(response.data)
		 		_this.detailData=response.data.list
		 	}).catch(function(error){
		 		console.log(error)
		 	})
		 },
		 //新增弹窗取消不了
		  addCourse(){
			  const _this=this
			  this.axios.post("http://localhost:8089/threeproject/addCourse",this.form)
			  .then(function(response){
				  _this.axios.get("http://localhost:8089/threeproject/findcourse",{params:_this.pageInfo})
				  .then(function(response){
					  console.log(response)
					  _this.tableData=response.data.list
					  _this.pageInfo.total=response.data.total 
				  }).catch(function(error){
					  console.log(error)
				  })
				_this.dialogFormVisible=false
				_this.form={}
			  }).catch(function(error){
				  console.log(error)
			  })
		  },
		  //修改课程
		  updateCourse(){
		  	const _this=this
		  	this.axios.put("http://localhost:8089/threeproject/updateCourse",this.form)
		  	.then(function(response){
		  		console.log(response)
		  		var course=response.data
				var datas=_this.tableData.filter(d=>d.courseId==course.courseId)[0]
		  		datas.courseName=course.courseName
				datas.courseMoney=course.courseMoney
				datas.classhours=course.classhours
		  		_this.dialogFormVisible2=false
				this.$refs[form].resetFields()
		  	}).catch(function(error){
		  		console.log(error)
		  	})
		  },
		  //修改课程状态
		  updateCourseState(row){
			 const _this=this
			 console.log(row)
			 this.axios.put("http://localhost:8089/threeproject/updateCourse",row)
			 .then(function(response){
			 	console.log(response)
			 	var course=response.data
			 	var datas=_this.tableData.filter(d=>d.courseId==course.courseId)[0]
			 }).catch(function(error){
			 	console.log(error)
			 }) 
		  },
		  //查询课程详细表
		  findDetailCourses(courseId){
			  this.findDetail=true
			  // this.scope.row.courseId=row.courseId
			  const _this=this
			  this.pageInfo2.courseId=courseId
			  console.log(this.pageInfo2)
			  this.axios.get("http://localhost:8089/threeproject/findDetailCourses",{params:this.pageInfo2})
			  .then(function(response){
			  	_this.detailData=response.data.list
			  	_this.pageInfo2.total=response.data.total
			  	console.log(response)
			  }).catch(function(error){
			  	console.log(error)
			  })
		  },
		  //新增课程详细
		  addDetails(){
			const _this=this
			this.detailsForm.courseId=this.pageInfo2.courseId
			console.log(this.detailData)
			console.log(this.detailsForm)
			this.axios.post("http://localhost:8089/threeproject/addDetails",this.detailsForm)
			.then(function(response){
				_this.axios.get("http://localhost:8089/threeproject/findDetailCourses",{params:_this.pageInfo2})
				.then(function(response){
					console.log(response)
					_this.detailData=response.data.list
					_this.pageInfo2.total=response.data.total 
				}).catch(function(error){
					console.log(error)
				})
				_this.dialogDetailForm=false
				for(var key in _this.detailsForm){
					delete _this.detailsForm[key];
				}
			}).catch(function(error){
				console.log(error)
			}) 
		  },
		  //显示课程
		  setCurrent(row) {
		    // this.$refs.singleTable.setCurrentRow(row);
		  	this.form.courseId=row.courseId
		  	this.form.courseName=row.courseName
		  	this.form.courseMoney=row.courseMoney
		  	this.form.classhours=row.classhours
		  	this.form.courseState=row.courseState
		  	this.dialogFormVisible2=true
		  },
		  //显示课程详细
		  showRowDetail(row){
			this.detailsForm.detailcourseId=row.detailcourseId
			this.detailsForm.serial=row.serial
			this.detailsForm.detailcourseName=row.detailcourseName
			this.dialogDetailForm2=true
			console.log("课程详细"+this.detailsForm)
		  },
		  //修改课程详细
		  updateDetails(){
			  const _this=this
			  this.axios.put("http://localhost:8089/threeproject/updateDetails",this.detailsForm)
			  .then(function(response){
				   var detailcourse=response.data
				   var row=_this.detailData.filter(d=>d.detailcourseId=detailcourse.detailcourseId)[0]
				   row.detailcourseName=detailcourse.detailcourseName
				   row.serial=detailcourse.serial
				   _this.dialogDetailForm2=false
				   for(var key in _this.detailsForm){
				   	delete _this.detailsForm[key];
				   }
			  }).catch(function(error){
				  console.log(error)
			  })
		  }
	    },
		created() {
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findcoursetype")
			.then(function(response){
				_this.typedata=response.data
				console.log(response)
			}).catch(function(error){
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/findcourse",{params:this.pageInfo})
			.then(function(response){
				_this.tableData=response.data.list
				_this.pageInfo.total=response.data.total 
				console.log(response)
			}).catch(function(error){
				console.log(error)
			})
		}
}
</script>

<style>
</style>



