<template>
	<!-- <div class="common-layout"> -->
	<el-container>
		<el-header>Header</el-header>
		<el-container>
			<!-- <el-aside :style="{width:auto}" height="100%">
				
			</el-aside> -->
			<el-main style="padding: 0px;">
				<el-dialog title="增加" v-model="dialogFormVisible" :close-on-click-modal="false">
					<el-form :model="AnnType">
					<el-form-item>
						<el-input v-model="AnnType.announcementtypeName" placeholder="单位类型名称"></el-input>
						<el-input v-model="AnnType.addname" placeholder="增加人"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="">取 消</el-button>
						<el-button type="primary" @click="AnnTypeAdd">确 定</el-button>
					</span>
				</template>
				</el-dialog>
				<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
					<el-form :model="AnnType">
					<el-form-item>
						<el-input v-model="AnnType.announcementtypeName" placeholder="单位类型名称"></el-input>
						<el-input v-model="AnnType.updatename" placeholder="修改人"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="">取 消</el-button>
						<el-button type="primary" @click="AnnTypeUpdate">确 定</el-button>
					</span>
				</template>
				</el-dialog>
				<el-button @click="dialogFormVisible = true">新增</el-button>
				<el-button @click="switch1" :style="{display:dis1}">以删除类型</el-button>
				<el-button @click="switch2" :style="{display:dis2}">未删除类型</el-button>
				<el-table ref="unittype" :data="tableData">
					<el-table-column prop="announcementtypeName" label="单位类型">
					</el-table-column>
					<el-table-column prop="addname" label="增加人">
					</el-table-column>
					<el-table-column prop="addtime" label="增加时间">
					</el-table-column>
					<el-table-column prop="updatename" label="修改人">
					</el-table-column>
					<el-table-column prop="updatetime" label="修改时间">
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template #default="scope">
							<el-button @click="AnnTypeupdate(scope.row)">修改</el-button>
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
				AnnType:{
					announcementtypeId:null,
					announcementtypeName:null,
					addname:null,
					addtime:null,
					updatename:null,
					updatetime:null,
					deletename:null,
					deletetime:null,
					timeliness:null
				},
				dis1:'',
				dis2:'none'
			}
		},
		methods: {
			AnnTypeAdd(){
				const _this = this
				this.axios.post("http://localhost:8089/thirdtroject/AnnTypeAdd",this.AnnType,{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
					.then(function(response) {
						var type=response.data
						_this.tableData.push(type)
						_this.dialogFormVisible=false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			AnnTypeUpdate(){
				const _this = this
				this.axios.put("http://localhost:8089/thirdtroject/AnnTypeUpdate",this.AnnType,{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
					.then(function(response) {
						var anntype=response.data
						var row =_this.tableData.filter(t=>t.announcementtypeId==anntype.announcementtypeId)[0]
							row.announcementtypeName=anntype.announcementtypeName
							row.updatename=anntype.updatename
						_this.dialogFormVisible2=false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			AnnTypeupdate(row){
				this.AnnType.announcementtypeId=row.announcementtypeId
				this.AnnType.announcementtypeName=row.announcementtypeName
				this.AnnType.updatename=row.updatename
				this.dialogFormVisible2=true
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
					this.axios.get("http://localhost:8089/thirdtroject/findUnitType/"+row.unittypeId,{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
						.then(function(response) {
							console.log(response)
							if(response.data!=0){
								console.log("不能删除！")
								return;
							}
							_this.axios.put("http://localhost:8089/thirdtroject/AnnTypeDel",row)
							.then(function(response){
								var ann=response.data
								var rows =_this.tableData.filter(t=>t.announcementtypeId!=ann.announcementtypeId)
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
				    console.log(row.announcementtypeId)
				  });
			},
			switch1(){
				this.dis1="none"
				this.dis2=""
				
			},
			switch2(){
				this.dis2="none"
				this.dis1=""
			}
		},
		created() {
			const this_ = this
			this.axios.get("http://localhost:8089/thirdtroject/findAnnType")
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

	/* .el-header {
		background-color: #B3C0D1;
		color: #333; */
		/* text-align: center; */
	/* 	line-height: 60px;
	} */

	/* .el-aside {
		background-color: #D3DCE6;
		color: #333; */
		/* text-align: center; */
	/* 	height: 100%;
		width: 100%;
	} */

	/* .el-main {
		background-color: #E9EEF3;
		color: #333; */
		/* text-align: left; */
		/* line-height: 160px; */
	/* } */

	.el-container {
		height: 100%;
	}
</style>
