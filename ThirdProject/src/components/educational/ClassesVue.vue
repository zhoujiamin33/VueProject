<template>
	<div>
		<div style="margin-left: -660px;">
			快速检索：
			<el-select v-model="select" placeholder="请选择" style="margin-top:50px;">
				<el-option label="班级名称" value="1">班级名称</el-option>
				<el-option label="班级编号" value="2">班级编号</el-option>
				<el-option label="上课教师" value="3">上课教师</el-option>
			</el-select>
			<el-input placeholder="请输入内容" v-model="input"  clearable style="width: 120px;"> </el-input>
		</div>
		<div>
			<el-row style="margin-top: -40px;margin-left:970px;">
			   <el-button @click="dialogFormVisible=true">新增</el-button>
			</el-row>
		</div>	
			<!-- 新增弹窗 -->
			<el-dialog title="新增班级" v-model="dialogFormVisible">
			  <el-form :model="form">
				  
			    <div style="display: flex;justify-content: space-between;">
					<el-form-item label="班级名称" :label-width="formLabelWidth">
					  <el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="培训期限" :label-width="formLabelWidth">
					  <el-date-picker v-model="form.value2"  type="daterange" align="right"  unlink-panels
					        range-separator="至"  start-placeholder="开始日期"
					        end-placeholder="结束日期" :shortcuts="shortcuts" style="width: 300px;">
					  </el-date-picker>
					</el-form-item>
					
				</div>
				
			   <div style="display: flex;justify-content: space-between;">
				   <el-form-item label="年届管理" :label-width="formLabelWidth">
				     <el-select v-model="form.year">
				   	  <el-option></el-option>
				     </el-select>
					</el-form-item> 
					<el-form-item label="学期管理" :label-width="formLabelWidth">
					  <el-select v-model="form.schoolterm">
						  <el-option></el-option>
					  </el-select>
					</el-form-item>
			   </div>
			   <div style="display: flex;justify-content: space-between;">
				   
				   <el-form-item label="培训类别" :label-width="formLabelWidth">
				     <el-select v-model="form.coursetype">
				   	  <el-option></el-option>
				     </el-select>
				   </el-form-item>
				   <el-form-item label="开设课程" :label-width="formLabelWidth">
				     <el-select v-model="form.course">
				   	  <el-option></el-option>
				     </el-select>
				   </el-form-item>
			   </div>
				
				<div style="display: flex;justify-content: space-between;">
					
					<el-form-item label="使用教材" :label-width="formLabelWidth">
					  <el-select v-model="form.books">
						  <el-option></el-option>
					  </el-select>
					</el-form-item>
					<el-form-item label="开班人数" :label-width="formLabelWidth">
					  <el-select v-model="form.catacity">
						  <el-option></el-option>
					  </el-select>
					</el-form-item>
				</div>
				
				<div style="display: flex;justify-content: space-between;">
					<div>
						<el-form-item label="开班设置" :label-width="formLabelWidth" >
						  <el-select v-model="form.openclass" style="width: 120px;">
							  <el-option></el-option>
						  </el-select>
						</el-form-item>
					</div>
					<div style="display: flex;justify-content: space-between;margin-left:150px;">
						<el-form-item label="课时" :label-width="formLabelWidth" style="margin-left:-300px ;">
						  <el-input v-model="form.classhours" style="width: 120px;"></el-input>
						</el-form-item>
						<el-form-item label="学费" :label-width="formLabelWidth" style="margin-left: -300px;">
						  <el-input v-model="form.money" style="width: 120px;"> </el-input>
						</el-form-item>
					</div>
				</div>
				
				
			  </el-form>
			  <template #footer>
			    <span class="dialog-footer">
			      <el-button @click="dialogFormVisible = false">取 消</el-button>
			      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			    </span>
			  </template>
			</el-dialog>
		
	</div>
	<!-- 表格 -->
	<div style="margin-top: 30px;">
		<el-table :data="tableData"  border style="width:100%;margin-left:10px;">
			<el-table-column fixed  type="selection"> </el-table-column>
		    <el-table-column fixed prop="date" label="班级编号" width="150"> </el-table-column>
			<el-table-column  prop="date" label="班级名称" width="150">
				<template #default="scope">
					<a href="#" @click="del(scope.row)">{{scope.row.data}}</a>
				</template>
			</el-table-column>
		    <el-table-column prop="province" label="培训期限"  width="120"> </el-table-column>
		    <el-table-column prop="city" label="上课安排" width="120"> </el-table-column>
		    <el-table-column prop="address"  label="任课老师"  width="600"> </el-table-column>
		    <el-table-column prop="zip" label="班级人数" width="120"> </el-table-column>
			<el-table-column prop="zip" label="派课" width="120"> </el-table-column>
			<el-table-column prop="zip" label="开班状态" width="120"> </el-table-column>
		    <el-table-column fixed="right" label="操作" width="100">
		      <template #default="scope">
				<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
		      </template>
		    </el-table-column>
		</el-table>
	</div>
	<!-- 分页 -->
	<div class="block" style="margin-left:-130px;margin-top: 10px;">
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
	import { defineComponent, ref } from 'vue'
	export default  {
	    name:"ClassesVue",
		data (){
			return{
				pageInfo:{
					currentPage: 1,//标识当前页码
					pagesize:2,//每页多少条数据
					total:0
				},
				select:"",
				input:"",
				tableData:[],
				dialogFormVisible:false,
				form:{
					name:"",value2:"",openclass:"",year:"",schoolterm:"",coursetype:"",course:"",catacity:"",books:"",classhours:"",
					money:"",
				}
			}
		},
		 setup() {
		    return {
		      input: ref('')
		    }
		  }
	}
</script>

<style>
</style>
