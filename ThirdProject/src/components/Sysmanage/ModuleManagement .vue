<template>
	<div style="float: left;width: 25%;height: 100%;">
		<span>部门</span>
		<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
	</div>
	<div style="float:right;width: 74%;height: 100%;">
		<div style="margin-bottom: 30px;">
			<el-button>保存</el-button>
		</div>
			
			
				<el-form ref="form" :model="form" label-width="90px" :inline="true" style="width: 100%;text-align: center;margin-top: 50px;">
				  <el-form-item label="部门编码:" required >
				    <el-input v-model="form.positionId" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门名称:" required style="margin-left: 20px;">
				    <el-input v-model="form.positionName" style="width: 220px;" ></el-input>
				  </el-form-item>
				  <el-form-item label="上级部门:" required>
				    <el-select v-model="select" placeholder="请选择" style="width: 220px;">
				    	<el-option label="客服部门" value="1"></el-option>
				    	<el-option label="销售部门" value="2"></el-option>
				    	<el-option label="常规部门" value="3"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="部门负责人:" style="margin-left: 20px;">
				    <el-input v-model="positionfzr" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门电话:" >
				    <el-input v-model="positionphone" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门传真:" style="margin-left: 20px;" >
				    <el-input v-model="positioncz" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="部门类型:" >
				    <el-select v-model="positiontype" placeholder="请选择" style="width: 220px;">
				    	<el-option label="客服部门" value="1"></el-option>
				    	<el-option label="销售部门" value="2"></el-option>
						<el-option label="常规部门" value="3"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="备注:" style="margin-left: 20px;">
				    <el-input v-model="beizhu" style="width: 220px;"></el-input>
				  </el-form-item>
				  </el-form>
				  </div>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					positionId:'',
					positionName:''
				},
				data: [{
				          label: '一级 1',
				          children: [{
				            label: '二级 1-1',
				            children: [{
				              label: '三级 1-1-1'
				            }]
				          }]
				        }, {
				          label: '一级 2',
				          children: [{
				            label: '二级 2-1',
				            children: [{
				              label: '三级 2-1-1'
				            }]
				          }, {
				            label: '二级 2-2',
				            children: [{
				              label: '三级 2-2-1'
				            }]
				          }]
				        }, {
				          label: '一级 3',
				          children: [{
				            label: '二级 3-1',
				            children: [{
				              label: '三级 3-1-1'
				            }]
				          }, {
				            label: '二级 3-2',
				            children: [{
				              label: '三级 3-2-1'
				            }] ,
							}]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
			}
		},
		 methods: {
		      handleNodeClick(data) {
		        console.log(data);
		      }
		    }
		
	}
</script>

<style>
</style>
