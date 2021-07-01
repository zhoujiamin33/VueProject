<template>
	<!-- <div class="common-layout"> -->
	<el-container :style="{height:height}">
		<el-container>
			<el-main style="padding: 0px;">
				<el-container style="border: #409EFF 1px solid;">
					<!-- <el-header>
						<span style="font-size: 14px;">快速检索</span>
						<el-select style="margin-left: 10px;" v-model="AnnSelect" placeholder="请输选择内容">
							<el-option label="1" value="1"></el-option>
						</el-select>
						<el-input style="width: 200px;margin-left: 10px;" v-model="AnnSearch" placeholder="请输入内容">
						</el-input>
						<el-button icon="el-icon-search" style="border: #FFF solid 1px;"></el-button>
					</el-header> -->
					<el-main>

						<div class="edit">
							<el-button @click="endform2">新增</el-button>
							<el-dialog title="新增" v-model="dialogFormVisible" :close-on-click-modal="false">
								<!-- :inline="true" -->
								<el-form :model="Unit" class="" :rules="forRules" ref="Unit">
									<el-form-item prop="unitName">
										<el-input style="width: 90%;" v-model="Unit.unitName" autocomplete="off"
											placeholder="单位名称"></el-input>
									</el-form-item>
									<el-form-item prop="unitLevel">
										<el-select v-model="Unit.unittypeId" placeholder="单位类型" filterable allow-create
											default-first-option>
											<el-option v-for="itms in UnitType" :label="itms.unittypeName"
												:value="itms.unittypeId"></el-option>

										</el-select>&nbsp;
										<el-input v-model="Unit.unitLevel" placeholder="单位级别" @blur="dwjb"
											:style="{border:borders}"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="Unit.unitPhone" placeholder="单位电话"></el-input>&nbsp;
										<el-input v-model="Unit.director" placeholder="负责人"></el-input>
									</el-form-item>
									<el-form-item prop="unitAddress">
										<el-input style="width: 90%;" v-model="Unit.unitAddress" placeholder="单位地址">
										</el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="Unit.mailcode" placeholder="邮政编码"></el-input>
										<el-input v-model="Unit.email" placeholder="邮箱"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="Unit.profile" type="textarea" rows="12" placeholder="简介">
										</el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="Unit.remarks" type="textarea" rows="12" placeholder="备注">
										</el-input>
									</el-form-item>
								</el-form>
								<template #footer>
									<span class="dialog-footer">
										<el-button @click="qxxx">取 消</el-button>
										<el-button type="primary" @click="UnitAdd">确 定</el-button>
									</span>
								</template>
							</el-dialog>
							<el-button @click="cutoff">删除</el-button>
						</div>
						<el-table ref="multipleTable" :data="Units" height="500" tooltip-effect="dark"
							@selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="单位名称" width="220">
								<template #default="scope"><a href="#"
										@click="showEdit1(scope.row)">{{ scope.row.unitName }}</a></template>
							</el-table-column>
							<el-table-column prop="unitPhone" label="单位电话" width="230">
							</el-table-column>
							<el-table-column prop="email" label="电子邮箱" width="210" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="unitAddress" label="单位地址" width="360" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="profile" label="简介" width="260" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="Unit" class="" :rules="forRules" ref="Unit">
								<el-form-item prop="unitName">
									<el-input style="width: 90%;" v-model="Unit.unitName" autocomplete="off"
										placeholder="单位名称"></el-input>
								</el-form-item>
								<el-form-item prop="unitLevel">
									<el-select v-model="Unit.unittypeId" placeholder="单位类型" filterable allow-create
										default-first-option>
										<el-option v-for="itms in UnitType" :label="itms.unittypeName"
											:value="itms.unittypeId"></el-option>
									</el-select>&nbsp;
									<el-input v-model="Unit.unitLevel" placeholder="单位级别" @blur="dwjb"
										:style="{border:borders}"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="Unit.unitPhone" placeholder="单位电话"></el-input>&nbsp;
									<el-input v-model="Unit.director" placeholder="负责人"></el-input>
								</el-form-item>
								<el-form-item prop="unitAddress">
									<el-input style="width: 90%;" v-model="Unit.unitAddress" placeholder="单位地址">
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="Unit.mailcode" placeholder="邮政编码"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="Unit.profile" type="textarea" rows="12" placeholder="简介">
									</el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="Unit.remarks" type="textarea" rows="12" placeholder="备注">
									</el-input>
								</el-form-item>
							</el-form>
							<template #footer>
								<span class="dialog-footer">
									<el-button @click="qxxx">取 消</el-button>
									<el-button type="primary" @click="UpdateUnit">确 定</el-button>
								</span>
							</template>
						</el-dialog>
					</el-main>
					<el-footer>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
								:current-page="pageInfo.currentPage" :page-sizes="[2, 5, 10, 20]"
								:page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
								:total="pageInfo.total">
							</el-pagination>
						</div>
					</el-footer>
				</el-container>
			</el-main>
		</el-container>
	</el-container>
	<!-- </div> -->
</template>

<script>
	import qs from 'qs'
	export default {
		data() {
			return {
				isCollapse: false,
				height: document.documentElement.clientHeight,
				width: document.documentElement.clientWidth,
				auto: '200px',
				AnnSearch: '',
				AnnSelect: '',
				Units: [],
				UnitType: [],
				AddIdName:{
					multipleSelection: [],
					name:''
				},
				pageInfo: {
					currentPage: 1, //识别当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				//隐藏新增页面
				dialogFormVisible: false,
				dialogFormVisible2: false,
				Unit: {
					unitId: '',
					unitName: '',
					unittypeId: '',
					unitLevel: '',
					director: '',
					unitAddress: '',
					mailcode: '',
					unitPhone: '',
					email: '',
					profile: '',
					remarks: '',
					addname: '',
					addtime: '',
					updatename: '',
					updatetime: '',
					deletename: '',
					deletetime: '',
					timeliness: ''
				},
				//新增验证
				forRules: {
					unitAddress: [{
						required: true,
						message: '',
						tigger: ['blur', 'change']
					}],
					unitName: [{
						required: true,
						message: '',
						tigger: 'blur'
					}],
				},
				borders: '#fff 1px solid'
			};
		},
		methods: {
			endform2() {
				// this.Unit=[]

				this.dialogFormVisible = true
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			Switch() {
				this.isCollapse = !this.isCollapse
				if (this.auto == "auto") {
					this.auto = '200px'
				} else {
					this.auto = "auto"
				}
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			showEdit1(row) {
				console.log(row)
				this.Unit.unitId = row.unitId
				this.Unit.unitName = row.unitName
				this.Unit.unittypeId = row.unittypeId
				this.Unit.unitLevel = row.unitLevel
				this.Unit.director = row.director
				this.Unit.unitAddress = row.unitAddress
				this.Unit.unitPhone = row.unitPhone
				this.Unit.email = row.email
				this.Unit.profile = row.profile
				this.Unit.mailcode = row.mailcode
				this.Unit.remarks = row.remarks
				this.dialogFormVisible2 = true
			},
			handleSelectionChange(val) {
				this.AddIdName.multipleSelection = [];
				for (var i = 0; i < val.length; i++) {
					this.AddIdName.multipleSelection.push(val[i].unitId);
					
				}
				console.log(this.AddIdName.multipleSelection)
				console.log(val)
			},
			cutoff() {
				if (this.AddIdName.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					const _this = this
					this.$confirm('是否删除？', '删除', {
							distinguishCancelAndClose: true,
							confirmButtonText: '是',
							cancelButtonText: '否',
							type: "warning"
						})
						.then(() => {
							_this.axios.delete("http://localhost:8089/threeproject/delUnit" ,{
								params:{
									multipleSelection:qs.stringify(_this.AddIdName.multipleSelection),
									nu:_this.$store.state.updateUserInfo.username
								},
								headers: {
									'content-type': 'application/json',
									'jwtAuth': this.$store.getters.token
								}
							})
								.then(function(response) {
									console.log(response)
									var row = response
									_this.axios.get("http://localhost:8089/threeproject/findPageUnit", {
										headers: {
											'content-type': 'application/json',
											'jwtAuth': _this.$store.getters.token
										},
											params: _this.pageInfo
										})
										.then(function(response) {
											_this.Units = response.data.list
											_this.pageInfo.total = response.data.total
											console.log(_this.UnitType)
										}).catch(function(error) {
											console.log(error)
										})

								}).catch(function(errer) {
									console.log(errer)
								})
						}).catch(action => {
							console.log("删除失败")
						});
				}
			},
			dwjb() {
				if (this.Unit.unitLevel == '') {
					this.borders = "red 1px solid";
					console.log(this.borders)
				} else {
					this.borders = "#fff 1px solid";
				}
			},
			UnitAdd() {
				console.log(this.Unit)
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/UnitAdd", this.Unit,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
					.then(function(response) {
						var unit = response.data
						_this.Units.push(unit)
						_this.dialogFormVisible = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					}),
					this.Unit=[]
			},
			qxxx(){
				this.dialogFormVisible2 = false
				this.dialogFormVisible = false
				this.Unit=[]
			},
			UpdateUnit() {
				const _this = this
				console.log("this.Unit内容：")
				console.log(this.Unit)
				this.axios.put("http://localhost:8089/threeproject/UpdateUnit", this.Unit,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
					.then(function(response) {
						var unit = response.data
						console.log("response内容：")
						console.log(response)
						var row = _this.Units.filter(u => u.unitId == unit.unitId)[0]
						row.unitName = unit.unitName
						row.unittypeId = unit.unittypeId
						row.unitLevel = unit.unitLevel
						row.director = unit.director
						row.unitAddress = unit.unitAddress
						row.mailcode = unit.mailcode
						row.unitPhone = unit.unitPhone
						row.email = unit.email
						row.profile = unit.profile
						row.remarks = unit.remarks
						_this.dialogFormVisible2 = false

					}).catch(function(error) {
						console.log(error)
					})
			},
			//分页
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo);
				console.log("ps是啥")
				console.log(ps)
				this.findPageUnit()
				// this.axios.get("http://localhost:8089/threeproject/findPageUnit", {
				// 	headers: {
				// 		'content-type': 'application/json',
				// 		'jwtAuth': this.$store.getters.token
				// 	},
				// 		params: this.pageInfo
				// 	})
				// 	.then(function(response) {
				// 		console.log("-----------")
				// 		console.log(response.data)
				// 		_this.Units = response.data.list
				// 	}).catch(function(errer) {
				// 		console.log(errer)
				// 	})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.findPageUnit()
				// this.axios.get("http://localhost:8089/threeproject/findPageUnit", {
				// 	headers: {
				// 		'content-type': 'application/json',
				// 		'jwtAuth': this.$store.getters.token
				// 	},
				// 		params: this.pageInfo
				// 	})
				// 	.then(function(response) {
				// 		console.log("-----------")
				// 		console.log(response.data)
				// 		_this.Units = response.data.list
				// 	}).catch(function(errer) {
				// 		console.log(errer)
				// 	})
			},
			findPageUnit(){
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findPageUnit", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					},
					params: this.pageInfo
				})
				.then(function(response) {
					_this.Units = response.data.list
					_this.pageInfo.total = response.data.total
					console.log(_this.Units)
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			}
		},
		created() {
			const _this = this
			this.findPageUnit()
			this.axios.get("http://localhost:8089/threeproject/selectUnitTypeAll",{
				headers: {
					'content-type': 'application/json',
					'jwtAuth': this.$store.getters.token
				}
			})
				.then(function(response) {
					_this.UnitType = response.data
					console.log(response)
					console.log(_this.UnitType)
				}).catch(function(error) {
					console.log(error)
				})

		}
	}
</script>

<style>
	.el-textarea__inner {
		height: 120px;
	}

	.qwe .el-form-item .el-input>input {
		height: 30px;
	}

	.edit {
		float: right;
	}

	.edit .el-button {
		border: #303133 solid 1px;
	}

	.el-main .el-container .el-main {
		padding: 0px;
		line-height: 0px;
		height: 100%;
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
		width: 100%; */
	/* } */

/* 	.el-main {
		background-color: #E9EEF3;
		color: #333; */
		/* text-align: left; */
		/* line-height: 160px; */
	/* } */

	.is-vertical {}

	.el-container {
		height: 100%;
	}
</style>
