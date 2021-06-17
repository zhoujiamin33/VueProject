<template>
	<!-- <div class="common-layout"> -->
	<el-container>
		<el-header>Header</el-header>
		<el-container>
			<!-- <el-aside :style="{width:auto}" height="100%">
				
			</el-aside> -->
			<el-main style="padding: 0px;">
				<el-dialog title="增加" v-model="dialogFormVisible" :close-on-click-modal="false">
					<el-form :model="UnitType">
					<el-form-item>
						<el-input v-model="UnitType.unittypeName" placeholder="单位类型名称"></el-input>
						<el-input v-model="UnitType.addname" placeholder="增加人"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="">取 消</el-button>
						<el-button type="primary" @click="UnitTypeAdd">确 定</el-button>
					</span>
				</template>
				</el-dialog>
				<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
					<el-form :model="UnitType">
					<el-form-item>
						<el-input v-model="UnitType.unittypeName" placeholder="单位类型名称"></el-input>
						<el-input v-model="UnitType.updatename" placeholder="修改人"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="">取 消</el-button>
						<el-button type="primary" @click="UnitTypeUpdate">确 定</el-button>
					</span>
				</template>
				</el-dialog>
				<el-button @click="dialogFormVisible = true">新增</el-button>
				<el-table ref="unittype" :data="tableData">
					<el-table-column prop="unittypeName" label="单位类型">
					</el-table-column>
					<el-table-column prop="addname" label="增加人">
					</el-table-column>
					<el-table-column prop="updatename" label="修改人">
					</el-table-column>
					<el-table-column prop="deleteName" label="删除人">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template #default="scope">
							<el-button @click="UnitTypeupdate(scope.row)">修改</el-button>
							<el-button @click="updateTimeLiness(scope.row)" style="color: indianred;">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
	</el-container>
	<!-- </div> -->
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				dialogFormVisible: false,
				dialogFormVisible2: false,
				UnitType:{
					unittypeId:null,
					unittypeName:null,
					addname:null,
					addtime:null,
					updatename:null,
					updatetime:null,
					deletename:null,
					deletetime:null,
					timeliness:null
				}
			}
		},
		methods: {
			UnitTypeAdd(){
				console.log(this.UnitType)
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/UnitTypeAdd",this.UnitType)
					.then(function(response) {
						var unittype=response.data
						_this.tableData.push(unittype)
						_this.dialogFormVisible=false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			UnitTypeUpdate(){
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/UnitTypeUpdate",this.UnitType)
					.then(function(response) {
						var unittype=response.data
						var row =_this.tableData.filter(t=>t.unittypeId==unittype.unittypeId)[0]
							row.unittypeName=unittype.unittypeName
							row.updatename=unittype.updatename
						_this.dialogFormVisible2=false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			UnitTypeupdate(row){
				this.UnitType.unittypeId=row.unittypeId
				this.UnitType.unittypeName=row.unittypeName
				this.UnitType.updatename=row.updatename
				this.dialogFormVisible2=true
			},
			UnitTypeDelete(row){
				const _this = this
				this.$confirm('是否删除？', '删除', {
				  distinguishCancelAndClose: true,
				  confirmButtonText: '是',
				  cancelButtonText: '否',
				  type:"warning"
				})
				  .then(() => {
				    _this.axios.delete("http://localhost:8089/threeproject/UnitTypeDelete/"+row.unittypeId)
					.then(function(response){
						var rows =_this.tableData.filter(t=>t.unittypeId!=row.unittypeId)
						_this.tableData=rows
					}).catch(function(errer){
						console.log(errer)
					})
					console.log("43321")
				  })
				  .catch(action => {
				    console.log("2")
				  });
			},
			updateTimeLiness(row){
				row.deletename="扎讷"
				const _this = this
				this.$confirm('是否删除？', '删除', {
				  distinguishCancelAndClose: true,
				  confirmButtonText: '是',
				  cancelButtonText: '否',
				  type:"warning"
				})
				  .then(() => {
					this.axios.get("http://localhost:8089/threeproject/findUnitType/"+row.unittypeId)
						.then(function(response) {
							console.log(response)
							if(response.data!=0){
								console.log("不能删除！")
								return;
							}
							_this.axios.put("http://localhost:8089/threeproject/updateTimeLiness",row)
							.then(function(response){
								var unittype=response.data
								var rows =_this.tableData.filter(t=>t.unittypeId!=unittype.unittypeId)
								_this.tableData=rows
							}).catch(function(errer){
								console.log(errer)
							})	
							console.log("11111111")
						}).catch(function(error) {
							console.log(error)
						})
				    
				  })
				  .catch(action => {
				    console.log(row.unittypeId)
				  });
				  
			}
		},
		created() {
			const this_ = this
			this.axios.get("http://localhost:8089/threeproject/UnitTypeShowAll")
				.then(function(response) {
					this_.tableData = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
	.edit {
		float: right;
	}

	.edit .el-button {
		border: #303133 solid 1px;
	}

	html,
	body {
		height: 100%;
		width: 100%;
	}

/* 	.el-header {
		background-color: #B3C0D1;
		color: #333; */
		/* text-align: center; */
		/* line-height: 60px; */
	/* } */

/* 	.el-aside {
		background-color: #D3DCE6;
		color: #333; */
		/* text-align: center; */
	/* 	height: 100%;
		width: 100%;
	} */

/* 	.el-main {
		background-color: #E9EEF3;
		color: #333; */
		/* text-align: left; */
		/* line-height: 160px; */
	/* } */

	.el-container {
		height: 100%;
	}
</style>
