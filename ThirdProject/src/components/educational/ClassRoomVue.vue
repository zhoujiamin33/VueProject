<template>
	<div>
		<el-row style="margin-left:1030px;margin-bottom: 10px;">
		  <el-button @click="dialogFormVisible=true" style="margin-left:200px;" type="primary">新增</el-button>
		</el-row>
		<!-- 新增弹窗 -->
		<el-dialog title="新增教室" v-model="dialogFormVisible">
		  <el-form :model="form">
		    <div style="display: flex;justify-content: space-between;">
				<el-form-item label="教室名称" :label-width="formLabelWidth">
				  <el-input v-model="form.classroomName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="容纳量" :label-width="formLabelWidth">
				  <el-input v-model="form.cacacity"></el-input>
				</el-form-item>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取 消</el-button>
		      <el-button type="primary" @click="addRoom">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
		<!--修改弹窗 -->
		<el-dialog title="修改教室" v-model="dialogFormVisible2">
		  <el-form :model="form">
		    <div>
				<el-form-item label="教室编号" :label-width="formLabelWidth">
				  <el-input v-model="form.classroomId" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="教室名称" :label-width="formLabelWidth">
				  <el-input v-model="form.classroomName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="容纳量" :label-width="formLabelWidth">
				  <el-input v-model="form.cacacity"></el-input>
				</el-form-item>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		      <el-button type="primary" @click="updateRoom">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
	</div>
	<div>
		<el-table :data="tableData" border stripe style="width:100%;margin-left:5px;margin-top:40px;"
		:header-cell-style="{background:'#eef1f6',color:'#606266'}">
		    <el-table-column  label="教室名" align="center" >
				<template #default="scope">
					<a href="#" @click="showEdit(scope.row)" >{{scope.row.classroomName}}</a>
					
				</template>
			</el-table-column>
		    <el-table-column prop="cacacity" label="容纳量" align="center"> </el-table-column>
			<el-table-column fixed="right" label="操作"  width="100"  align="center">
				<template #default="scope">
					<el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
					<!-- <el-button type="text" size="small" @click="dialogFormVisible=true">新增</el-button> -->
				</template>
			</el-table-column>
		</el-table>
	</div>
	<div class="block" style="margin-top: 10px;margin-right:375px;">
	    <el-pagination
		  每页大小发生改变时怎么处理
	      @size-change="handleSizeChange"
	      @current-change="handleCurrentChange"
		  当前页码
	      :current-page="PageInfo.currentPage"
	      :page-sizes="[2, 3, 6, 10]"
		  每页数据
	      :page-size="PageInfo.pagesize"
	      layout="total, sizes, prev, pager, next, jumper"
	      :total="PageInfo.total">
	    </el-pagination>
	</div> 
</template>


<script>
	import qs from 'qs'
export default{
	name:"ClassRoomVue",
	data (){
		return{
			PageInfo:{
				currentPage: 1,//标识当前页码
				pagesize:5,//每页多少条数据
				total:0
			},
			tableData:[],
			form:{
				classroomId:"", classroomName:"",cacacity:"",addname:"",updatename:""
			},
			dialogFormVisible:false,
			dialogFormVisible2:false
		}
	},
	 methods: {
	     handleSizeChange(pagesize) {
	         var _this=this
	         this.PageInfo.pagesize=pagesize
	     	var ps = qs.stringify(this.PageInfo)
	     	console.log(ps)
	         this.axios.get("http://localhost:8089/threeproject/findClassroom",{
					params:this.PageInfo,	
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
	     	this.PageInfo.currentPage=currentPage
	     	var ps = qs.stringify(this.PageInfo)
	     	this.axios.get("http://localhost:8089/threeproject/findClassroom",{
					params:this.PageInfo,
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
		 // 新增方法
		 addRoom(){
		 	const _this=this
			this.form.addname=this.$store.state.updateUserInfo.username
		 	this.axios.post("http://localhost:8089/threeproject/addClassRoom",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
		 	.then(function(response){
				_this.axios.get("http://localhost:8089/threeproject/findClassroom",{
					params:_this.PageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response){
					console.log(response)
					_this.tableData=response.data.list
					_this.PageInfo.total=response.data.total
				}).catch(function(error){
					console.log(error)
				})
		 		_this.dialogFormVisible=false
				_this.form={}
		 	}).catch(function(error){
		 		console.log(error)
		 	})
		 },
		 showEdit(row){
			 this.form.classroomId=row.classroomId
			 this.form.classroomName=row.classroomName
			 this.form.cacacity=row.cacacity
			 this.dialogFormVisible2=true
		 },
		 updateRoom(){
		 	const _this=this
			this.form.updatename=this.$store.state.updateUserInfo.username
		 	this.axios.put("http://localhost:8089/threeproject/updateClassRoom",this.form,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
		 	.then(function(response){
		 		var classroom=response.data
				var datas=_this.tableData.filter(d=>d.classroomId==classroom.classroomId)[0]
				datas.classroomName=classroom.classroomName
				datas.cacacity=classroom.cacacity
		 		_this.dialogFormVisible2=false
		 	}).catch(function(error){
		 		console.log(error)
		 	})
		 },
	    },
		created() {
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findClassroom",{
					params:this.PageInfo,
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
			.then(function(response){
				console.log(response)
				_this.tableData=response.data.list
				_this.PageInfo.total=response.data.total
			}).catch(function(error){
				console.log(error)
			})
		}
}
</script>

<style>
</style>
