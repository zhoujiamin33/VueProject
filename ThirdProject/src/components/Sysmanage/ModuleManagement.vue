<template>
	<div style="float: left;width: 25%;height: 100%;">
		<span>部门</span>
		 <el-tree :data="MenuDate" ref="Menutree" show-checkbox
  node-key="id"
  :default-expand-all="true"
  :default-checked-keys="roleMenu"
  :props="defaultProps"
  @check="changeMenu"></el-tree>
	</div>
	<div style="float:right;width: 74%;height: 100%;">
		<div style="margin-bottom: 30px;">
			<el-button>保存</el-button>
		</div>
				 <el-form ref="form" :model="form" label-width="90px" :inline="true" style="width: 100%;text-align: center;margin-top: 50px;">
				 <!-- <el-form-item label="模块类型:" required >
				    <el-input v-model="form.positionId" style="width: 220px;"></el-input>
				  </el-form-item> -->
				  <el-form-item label="模块编码:" required style="margin-left: 20px;">
				    <el-input v-model="form.id" style="width: 220px;" ></el-input>
				  </el-form-item>
				  <el-form-item label="模块名称:" required>
				     <el-input v-model="form.menuName" style="width: 220px;" ></el-input>
				  </el-form-item>
				  <el-form-item label="上级模块:" style="margin-left: 20px;">
				    <el-input v-model="form.menuPid" style="width: 220px;"></el-input>
				  </el-form-item>
				  <el-form-item label="文件路径:" >
				    <el-input v-model="form.method" style="width: 220px;"></el-input>
				  </el-form-item>
				 <!-- <el-form-item label="图片路径:" style="margin-left: 20px;" >
				    <el-input v-model="form.positioncz" style="width: 220px;"></el-input>
				  </el-form-item> -->
				  <!-- <el-form-item label="模块性质:" >
				    <el-select v-model="form.positiontype" placeholder="请选择" style="width: 220px;">
				    	<el-option label="客服部门" value="1"></el-option>
				    	<el-option label="销售部门" value="2"></el-option>
						<el-option label="常规部门" value="3"></el-option>
				    </el-select>
				  </el-form-item> -->
				  <el-form-item label="模块状态:" style="margin-left: 30px;
padding-right: 70px;">
				    <el-radio v-model="form.status" label="0">启用</el-radio>
				    <el-radio v-model="form.status" label="1">禁用</el-radio>
				  </el-form-item>
				  <!-- <el-form-item label="功能描述:">
				    <el-input v-model="form.beizhu" style="width: 220px;"></el-input>
				  </el-form-item> -->
				<!--  <el-form-item label="操作权限:" style="margin-left: 30px;
padding-right: 50px;">
				    <el-radio v-model="form.authority" label="0">控制</el-radio>
				    <el-radio v-model="form.authority" label="1">不控制</el-radio>
				  </el-form-item>
				  <el-form-item label="数据查看权限:" label-width="120px" >
				    <el-checkbox v-model="form.checked1">公司</el-checkbox>
				    <el-checkbox v-model="form.checked2">个人</el-checkbox>
					 <el-checkbox v-model="form.checked3">部门</el-checkbox>
				  </el-form-item> -->
				  </el-form>
				  </div>
				 
				  
				
</template>

<script>
	export default{
		data(){
			return{
				form:{
					id:'',
					menuName:'',
					menuPid:'',
					method:'',
					status:''
					
				},
				// MenuDate: [{
				//           label: '1',
				//           children: [{
				//             label: '二级 1-1',
				//             children: [{
				//               label: '三级 1-1-1'
				//             }]
				//           }]
				//         }, {
				//           label: '一级 2',
				//           children: [{
				//             label: '二级 2-1',
				//             children: [{
				//               label: '三级 2-1-1'
				//             }]
				//           }, {
				//             label: '二级 2-2',
				//             children: [{
				//               label: '三级 2-2-1'
				//             }]
				//           }]
				//         }, {
				//           label: '一级 3',
				//           children: [{
				//             label: '二级 3-1',
				//             children: [{
				//               label: '三级 3-1-1'
				//             }]
				//           }, {
				//             label: '二级 3-2',
				//             children: [{
				//               label: '三级 3-2-1'
				//             }] ,
				// 			}]
    //     }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
		 MenuDate: [],
		       
			}
		},
		 methods: {
		      handleNodeClick(data) {
		        console.log(data);
		      },
			  
			  
					       
		    },
			
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findsysmenu",
			{
				
				headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
			}
			})
				.then(function(response) {
					_this.MenuDate = response.data
					// 循环遍历整个树
					 const newRoleMenu = [] // 处理数据后的菜单数组
					 this.MenuDate.forEach(item => {
					    if (this.roleMenu.includes(item.id)) {
					      if (item.hasChildren) { // 是否有子菜单
					      	// 默认一级菜单 下的子菜单，都选中时保留该id, 否则去掉
					        let isAllChecked = true 
					        item.children.forEach(subItem => {
					          if (isAllChecked && !this.roleMenu.includes(subItem.id)) {
					            isAllChecked = false
					          }
					          if (this.roleMenu.includes(subItem.id)) {
					            newRoleMenu.push(subItem.id)
					          }
					        })
					        if (isAllChecked) {
					          newRoleMenu.push(item.id)
					        }
					      } else {
					        newRoleMenu.push(item.id)
					      }
					    }
					  })
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			
		}
	}
</script>

<style>
</style>
