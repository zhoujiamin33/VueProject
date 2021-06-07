<template>
	<div>
		<!-- 输入框、搜索框 -->
		<div class="a">
			<b class="b" style="font-size: 15px;">快速检索：</b>
			<el-select style="" v-model="value" placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input style="width: 180px;" v-model="input" placeholder="请输入内容" clearable></el-input>
			<el-button style="float:right;margin-left: 10px;">导出</el-button>
			<el-button style="float:right">删除</el-button>
			<el-button style="float:right">教材入库</el-button>
			<el-button style="float:right;">查询</el-button>
		</div>
		<!-- 表格 -->
		<div style="width: 80%;margin-left: 200px;margin-top: 40px;">
			<el-table :data="tableData" stripe border style="width: 100%">
				<el-table-column  type="index"  width="50" align="center"> </el-table-column>
				<el-table-column type="selection" width="50" align="center"> </el-table-column>
				<el-table-column prop="school" label="校区" width="180" align="center"> </el-table-column>
				<el-table-column prop="name" label="教材名称"  width="540"  align="center"> </el-table-column>
				<el-table-column  prop="Purchaseprice"  label="进价" align="center"> </el-table-column>
				<el-table-column   prop="price" label="售价"  align="center"> </el-table-column>
				<el-table-column prop="Storagevolume" label="入库量" align="center"> </el-table-column>
				<el-table-column prop="Inventory" label="库存量" align="center"> </el-table-column>
				<el-table-column prop="safetystock" label="安全库存" align="center"> </el-table-column>
				<el-table-column prop="press" label="出版社" align="center" width="100"> </el-table-column>
				<el-table-column  prop="Warehousekeeper" label="入库员" align="center"  width="100"> </el-table-column>
				<el-table-column fixed="right" label="操作"  width="150" align="center">
					<template #default="scope">
					    <el-button @click="handleClick(scope.row)" type="text" size="small">追加库存</el-button>
					    <el-button type="text" size="small">修改入库</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div style="font-size: 15px;text-align: center;">
			<b>库存成本：</b>
			<span></span>
			<b>元</b>
			<span>|</span>
			<b>库存数量：</b>
			<span></span>
			<b>本</b>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default{
	name:"BookStorage",
	setup() {
		return {
		   input: ref('')
		}
    },
	data() {
		return {
		    options: [{
		       value: '选项1',
		       label: '校区'
		    }, {
		       value: '选项2',
		       label: '教材名'
		    }, {
		       value: '选项3',
		       label: '入库人'
		    }],
			value: '',
		    tableData: [{
				school: '北大分校区',
				name: '丹朱围棋教学习题册',
				Purchaseprice: '0.01',
				price: '45.25',
				Storagevolume: '123',
				Inventory: '1231',
				safetystock: '123',
				press: '青岛出版社',
				Warehousekeeper: 'TSM管理员'
				},{
				school: '北大分校区',
				name: '丹朱围棋教学习题册',
				Purchaseprice: '0.01',
				price: '45.25',
				Storagevolume: '123',
				Inventory: '1231',
				safetystock: '123',
				press: '青岛出版社',
				Warehousekeeper: 'TSM管理员'          
				},{
				  school: '北大分校区',
				  name: '丹朱围棋教学习题册',
				  Purchaseprice: '0.01',
				  price: '45.25',
				  Storagevolume: '123',
				  Inventory: '1231',
				  safetystock: '123',
				  press: '青岛出版社',
				  Warehousekeeper: 'TSM管理员'
				},{
				  school: '北大分校区',
				  name: '丹朱围棋教学习题册',
				  Purchaseprice: '0.01',
				  price: '45.25',
				  Storagevolume: '123',
				  Inventory: '1231',
				  safetystock: '123',
				  press: '青岛出版社',
				  Warehousekeeper: 'TSM管理员'
				},{
				  school: '北大分校区',
				  name: '丹朱围棋教学习题册',
				  Purchaseprice: '0.01',
				  price: '45.25',
				  Storagevolume: '123',
				  Inventory: '1231',
				  safetystock: '123',
				  press: '青岛出版社',
				  Warehousekeeper: 'TSM管理员'
				},{
				  school: '北大分校区',
				  name: '丹朱围棋教学习题册',
				  Purchaseprice: '0.01',
				  price: '45.25',
				  Storagevolume: '123',
				  Inventory: '1231',
				  safetystock: '123',
				  press: '青岛出版社',
				  Warehousekeeper: 'TSM管理员'
				}],        
		        
		      }
		}
	}
</script>

<style>
</style>
