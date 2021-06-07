<template>
	<div>
		<!-- 搜索按钮 -->
		<div style="margin-top:35px;display: flex;justify-content: space-between">
		  <el-input placeholder="请输入搜索内容" v-model="pageInfo.searchinput" class="input-with-select" style="width:400px;margin-left:10px;">
		    <template #append  style="height: 10px;">
		      <el-button icon="el-icon-search" @click="SelectByName"></el-button>
		    </template>
		  </el-input>
		  <!-- 新增按钮 -->
		  <el-row style="margin-bottom: 10px;margin-right:0px;">
		    <el-button type="primary" icon="el-icon-plus" style="margin-left:10px;" @click="dialogFormVisible=true">新增课类</el-button>
			<el-button icon="el-icon-minus" style="margin-left:10px;"  type="danger" @click="cutoff">删除</el-button>
		  </el-row>
		</div>
		
		<!-- 新增弹窗 -->
		<el-dialog title="新增课类" v-model="dialogFormVisible">
		  <el-form :model="form">
		    <div style="text-align: center;">
				<el-form-item label="课类名称" :label-width="formLabelWidth">
				  <el-input v-model="form.classtypeName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新增人员" :label-width="formLabelWidth">
				  <el-input v-model="form.addname" autocomplete="off"></el-input>
				</el-form-item>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible = false">取 消</el-button>
		      <el-button type="primary" @click="addType">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
		<!-- 修改弹窗 -->
		<el-dialog title="修改课类" v-model="dialogFormVisible2">
		  <el-form :model="form">
		    <div style="text-align: center;">
				<el-form-item label="课类编号" :label-width="formLabelWidth">
				  <el-input v-model="form.classtypeId" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item label="课类名称" :label-width="formLabelWidth">
				  <el-input v-model="form.classtypeName" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新增人员" :label-width="formLabelWidth">
				  <el-input v-model="form.addname" autocomplete="off"></el-input>
				</el-form-item>
			</div>
		  </el-form>
		  <template #footer>
		    <span class="dialog-footer">
		      <el-button @click="dialogFormVisible2 = false">取 消</el-button>
		      <el-button type="primary" :plain="true" @click="updateType">保存并新建</el-button>
		    </span>
		  </template>
		</el-dialog>
		
	</div>
	<div>
		<el-table :data="tableData" border stripe style="width:100%;margin-left:10px;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="55" align="center"></el-table-column>
			<el-table-column prop="classtypeId" label="编号" align="center"></el-table-column>
		    <el-table-column prop="classtypeName"  label="课类名称"  align="center"></el-table-column>
			<el-table-column fixed="right" label="操作"  width="100">
				<!-- #:v-slot-->
				<!-- scope 定义的一个对象的名字 
				scope.row 当前行-->
				<template #default="scope">
					<!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
					<el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
					<!-- <el-button type="text" size="small" @click="del(scope.row)">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
	</div>
	<!-- 分页 -->
	<div class="block" style="margin-right: 390px;margin-top: 10px;">
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
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'
export default{
	name:"classtype",
	data (){
		return{
			pageInfo:{
				searchinput:"",
				currentPage: 1,//标识当前页码
				pagesize:2,//每页多少条数据
				total:0
			},
			tableData:[],
			form:{
				classtypeName:"",addname:"",classtypeId:""
			},
			dialogFormVisible:false,
			dialogFormVisible2:false,
			multipleSelection:[]
		}
	},
	 methods: {
		//循环保存被选中的id
		handleSelectionChange(val) {
			this.multipleSelection = [];
			for (var i=0;i<val.length;i++) {
				this.multipleSelection.push(val[i].classtypeId);
			}
			console.log(val)
		}, 
		cutoff() {
			// var deletename="默认"
			if (this.multipleSelection.length == 0) {
				this.$alert('<strong>请至选中一个！</strong>', '提示', {
				dangerouslyUseHTMLString: true,
				});
			}else {
				const _this = this
				this.$confirm('是否删除？', '删除', {
				distinguishCancelAndClose: true,
				confirmButtonText: '是',
				cancelButtonText: '否',
				type:"warning"
			}).then(() => {
				_this.axios.put("http://localhost:8089/threeproject/updateCourseType/"+this.multipleSelection)
				.then(function(response){
					var row=response
					_this.axios.get("http://localhost:8089/threeproject/findPage",{params:_this.pageInfo})
					.then(function(response) {
						_this.tableData = response.data.list
						_this.pageInfo.total=response.data.total
						console.log(_this.UnitType)
					}).catch(function(error) {
						console.log(error)
					})
				}).catch(function(errer){
					console.log(errer)
				})
					console.log("43321")
				}).catch(action => {
					console.log("2")
				});
			}
		},
		handleSizeChange(pagesize) {
		    var _this=this
		    this.pageInfo.pagesize=pagesize
			var ps = qs.stringify(this.pageInfo)
			console.log(ps)
		    this.axios.get("http://localhost:8089/threeproject/findPage",{params:this.pageInfo})
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
			this.axios.get("http://localhost:8089/threeproject/findPage",{params:this.pageInfo})
			.then(function(response){
				console.log(response.data)
				_this.tableData=response.data.list
			}).catch(function(error){
				console.log(error)
			})
		},
		 // 模糊查询后分页显示
		 SelectByName(){
			 const _this=this
			 this.axios.get("http://localhost:8089/threeproject/findPage",{params:this.pageInfo})
			 .then(function(response){
				 console.log(response)
				 _this.tableData=response.data.list
				 _this.pageInfo.total = response.data.total
			 }).catch(function(error){
				 console.log(error)
			 })
		 },
		 // 修改方法
		 updateType(){
			 const _this=this
			 this.axios.put("http://localhost:8089/threeproject/updateType",this.form)
			 .then(function(response){
				 console.log(response)
				 var classtype=response.data
				 var datas=_this.tableData.filter(d=>d.classtypeId==classtype.classtypeId)[0]
				 datas.classtypeName=classtype.classtypeName
				 datas.addname=classtype.addname
				 _this.dialogFormVisible2=false
				 ElMessage.success({
				    message: '修改成功',
				    type: 'success'
				 })
			 }).catch(function(error){
				 console.log(error)
			 })
		 },
		 // 显示修改数据
		  showEdit(row){
			  this.form.classtypeId=row.classtypeId
			  this.form.classtypeName=row.classtypeName
			  this.form.addname=row.addname
			  this.dialogFormVisible2=true
		  },
		  handelclick(row){
			  console.log(row)
		  },
		  // 新增方法
		  addType(){
			  const _this=this
			  this.axios.post("http://localhost:8089/threeproject/addcoursetype",this.form)
			  .then(function(response){
				  console.log(response)
				  var classtype=response.data
				  _this.tableData.push(classtype)
				 _this.dialogFormVisible=false
				 ElMessage.success({
				    message: '新增成功',
				    type: 'success'
				 })
			  }).catch(function(error){
				  console.log(error)
			  })
		  }
	    },
	created() {
		// 在界面分页显示数据
		const _this=this
		this.axios.get("http://localhost:8089/threeproject/findPage",{params:this.pageInfo})
		.then(function(response) {
			console.log(response)
			_this.tableData=response.data.list
			_this.pageInfo.total = response.data.total
		}).catch(function(error) {
			console.log(error)
		})
	}
}
</script>

<style>
</style>
