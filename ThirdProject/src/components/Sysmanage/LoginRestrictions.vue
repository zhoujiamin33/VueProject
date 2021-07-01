<template>
	<el-tabs type="border-card">
		<el-tab-pane>
			<template #label>
				<span><i class="el-icon-date"></i> 已限制用户</span>
			</template>
			<div style="margin-bottom: 10px;display: flex;">
				<el-button type="danger" @click="updatewxz()">取消限制</el-button>
			</div>
			<el-table :data="Restrictionsyi" border @selection-change="handleSelectionChange"
				:header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="empId" label="Id">
				</el-table-column>
			
				<el-table-column prop="jobnumber" label="编码">
				</el-table-column>
				<el-table-column prop="empName" label="姓名">
				</el-table-column>
				<el-table-column prop="deptList.deptName" label="部门">
				</el-table-column>
				<el-table-column prop="positionList.positionName" label="职位">
				</el-table-column>
				<el-table-column prop="empPhone" label="移动电话">
				</el-table-column>
			</el-table>

		</el-tab-pane>
		<el-tab-pane label="未限制用户">
			<div style="margin-bottom: 10px;display: flex;">
				<el-button type="primary" @click="updateyxz()">添加限制</el-button>
			</div>
			<el-table :data="Restrictions" border @selection-change="handleSelectionChange"
				:header-cell-style="{background:'#eef1f6',color:'#606266'}">
				<el-table-column prop="empId" label="Id">
				</el-table-column>
				<el-table-column type="selection">
				</el-table-column>
				<el-table-column prop="jobnumber" label="编码">
				</el-table-column>
				<el-table-column prop="empName" label="姓名">
				</el-table-column>
				<el-table-column prop="deptList.deptName" label="部门">
				</el-table-column>
				<el-table-column prop="positionList.positionName" label="职位">
				</el-table-column>
				<el-table-column prop="empPhone" label="移动电话">
				</el-table-column>
			</el-table>
		</el-tab-pane>


	</el-tabs>



</template>

<script>
	export default {
		data() {
			return {
				Restrictions: [],
				Restrictionsyi: [],
				chektable: []
			}
		},
		methods: {
			// 被复选框选中获取到的值
			handleSelectionChange(row) {
				console.log(row)
				this.chektable = row;
			},
			// 添加限制
			updateyxz() {
				const _this = this
				this.$confirm('确定要取消限制吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.chektable.length == 0) {
						_this.$message({
							showClose: true,
							message: '请选择用户!',
							type: 'error'
						});
					} else {
						var ids = _this.chektable.map(item => item.empId).join()

						_this.xz(ids)
						_this.$message({
							type: 'success',
							message: '成功!'
						});

					}


				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消限制'
					});
				});
			},
			// 取消限制
			updatewxz() {
				const _this = this
				this.$confirm('确定要取消限制吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (_this.chektable.length == 0) {
						_this.$message({
							showClose: true,
							message: '请选择用户!',
							type: 'error'
						});
					} else {
						var ids = _this.chektable.map(item => item.empId).join()
						_this.qx(ids)
						_this.$message({
							type: 'success',
							message: '成功!'
						});
					}


				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消限制'
					});
				});
			},
			xz(ids) {
				const _this = this
				this.axios.delete("http://localhost:8089/threeproject/updateyxz" ,
				{
					params:{
						'empId':ids
					},
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.selectweixz()
						_this.selectyixz()
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			qx(ids) {

				const _this = this
				this.axios.delete("http://localhost:8089/threeproject/updatewxz" ,
				{
					params:{
						'empId':ids
					},
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.selectyixz()
						_this.selectweixz()
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})

			},
			selectyixz(){
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectyixz",
				{
				
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.Restrictionsyi = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			selectweixz(){
					const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectweixz",
				{
				
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
				.then(function(response) {
					_this.Restrictions = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			}

		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/selectyixz",
			{
				
				headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
			}
			})
				.then(function(response) {
					_this.Restrictionsyi = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/selectweixz",
				{
				
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
				}
				})
				.then(function(response) {
					_this.Restrictions = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})

		}
	}
</script>

<style>
</style>
