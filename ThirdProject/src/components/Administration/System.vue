<template>
	<el-container :style="{height:height}">
		<el-container>
			<el-main style="padding: 0px;">
				<el-container style="border: #409EFF 1px solid;">
					
					<el-main>
						<!-- <el-header> -->
							<span style="font-size: 14px;">快速检索</span>
							<el-select style="margin-left: 10px;" v-model="pageInfo.index" placeholder="请输选择内容">
								<el-option label="主题" value="System_Theme"></el-option>
								<el-option label="内容" value="System_Content"></el-option>
							</el-select>
							<el-input style="width: 200px;margin-left: 10px;" v-model="pageInfo.value" placeholder="请输入内容">
							</el-input>
							<el-button @click="findConditional" icon="el-icon-search" style="border: #FFF solid 1px;"></el-button>
						<!-- </el-header> -->
						<div class="edit">
							<el-button @click="newAnn">新增</el-button>
							<el-dialog title="新增" v-model="dialogFormVisible" :close-on-click-modal="false">
								<!-- :inline="true" -->

								<el-form :model="form2" :rules="forRules" ref="form2">
									<el-form-item prop="systemtypeId">
										<el-select v-model="form2.systemtypeId" placeholder="分类">
											<el-option v-for="itms in SystemType" :label="itms.systemtypeName" :value="itms.systemtypeId"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item class="qwe" prop="systemTheme">
										<el-input style="width: 100%;" v-model="form2.systemTheme" autocomplete="off" placeholder="主题"></el-input>
									</el-form-item>
									<el-form-item>
										<el-select v-model="form2.deptId" placeholder="部门">
											<el-option v-for="itms in dept" :label="itms.deptName" :value="itms.deptId">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.systemContent" type="textarea" rows="15" placeholder="内容!"></el-input>
									</el-form-item>
									<el-form-item>
										<textarea style="width: 600px;vertical-align: middle;" placeholder="允许查看用户" disabled="disabled" v-model="form2.names"></textarea>
										<i class="el-icon-search" @click="dialogFormVisible3 = true" style="cursor: pointer;background: #409EFF;margin-right: 10px;"></i>
										<el-dialog title="选择可查看人" v-model="dialogFormVisible3" :close-on-click-modal="false" append-to-body>
											<el-transfer v-model="yesemp" :props="{key: 'empId',label: 'empName'}" :titles="['未关联', '已关联']" :data="noemp"
											 @change="change"></el-transfer>
											<div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 10px;">
												<el-button @click="CancelSys(0)">取 消</el-button>
												<el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
											</div>
										</el-dialog>
									</el-form-item>
								</el-form>
								<template #footer>
									<span class="dialog-footer">
										<el-button @click="CancelSys(1)">取 消</el-button>
										<el-button type="primary" @click="AddSystem">确 定</el-button>
									</span>
								</template>
							</el-dialog>

							<el-button @click="release">发布</el-button>
							<el-button @click="suspend">暂停</el-button>
							<el-button @click="cutoff">删除</el-button>
						</div>
						<el-table ref="multipleTable" :data="System" height="500" tooltip-effect="dark" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="标题" width="180">
								<template #default="scope"><a href="#" @click="showEdit1(scope.row)">{{ scope.row.systemTheme }}</a></template>
							</el-table-column>

							<el-table-column prop="names" label="允许查看用户" width="200" show-overflow-tooltip>

							</el-table-column>
							<el-table-column prop="systemtype.systemtypeName" label="类型" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="systemState" label="状态" show-overflow-tooltip>
								<template v-slot="scope">
									<p v-if="scope.row.systemState==0">录用</p>
									<p v-if="scope.row.systemState==1">已发布</p>
									<p v-if="scope.row.systemState==2">停用</p>
								</template>
							</el-table-column>
							<el-table-column prop="addtime" label="创建时间" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="form2" :rules="forRules" ref="form2">
								<el-form-item prop="systemtypeId">
									<el-select v-model="form2.systemtypeId" placeholder="分类">
										<el-option v-for="itms in SystemType" :label="itms.systemtypeName" :value="itms.systemtypeId"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item class="qwe" prop="systemTheme">
									<el-input style="width: 100%;" v-model="form2.systemTheme" autocomplete="off" placeholder="主题"></el-input>
								</el-form-item>
								<el-form-item>
									<el-select v-model="form2.deptId" placeholder="部门">
										<el-option v-for="itms in dept" :label="itms.deptName" :value="itms.deptId">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.systemContent" type="textarea" rows="15" placeholder="内容!"></el-input>
								</el-form-item>
								<el-form-item>
									<textarea style="width: 600px;vertical-align: middle;" placeholder="允许查看用户" disabled="disabled" v-model="form2.names"></textarea>
									<i class="el-icon-search" @click="dialogFormVisible3 = true" style="cursor: pointer;background: #409EFF;margin-right: 10px;"></i>
									
								</el-form-item>
							</el-form>
							<template #footer>
								<span class="dialog-footer">
									<el-button @click="">取 消</el-button>
									<el-button type="primary" @click="UpdateSystem">确 定</el-button>
								</span>
							</template>
						</el-dialog>
					</el-main>
					<el-footer>
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
							 :page-sizes="[2, 5, 10, 20]" :page-size="pageInfo.pagesize" layout="total, sizes, prev, pager, next, jumper"
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
				noemp: [],

				yesemp: [],
					
				isCollapse: false,
				height: document.documentElement.clientHeight,
				width: document.documentElement.clientWidth,
				auto: '200px',
				System: [],
				SystemType: [],
				dept: [],

				multipleSelection: [],

				//分页初始定位页数
				pageInfo: {
					currentPage: 1, //识别当前页码
					pagesize: 2, //每页多少条数据
					total: 0,
					index: '',
					value: ''
				},
				//隐藏页面
				dialogFormVisible: false,
				dialogFormVisible2: false,
				dialogFormVisible3: false,
				form2: {
					systemId: '',
					systemtypeId: '',
					systemTheme: '',
					deptId: '',
					systemContent: "",
					systemState: '',
					addname: '',
					addtime: '',
					publishname: '',
					publishtime: '',
					suspendname: '',
					suspendtime: '',
					updatename: '',
					updatetime: '',
					deletename: '',
					deletetime: '',
					timeliness: '',
					names: ''
				},
				//新增验证
				forRules: {
					SystemType_Id: [{
						required: true,
						message: '不能为空',
						tigger: ['blur', 'change']
					}],
					systemTheme: [{
						required: true,
						message: '不能为空',
						tigger: 'blur'
					}],
				}
			};
		},
		methods: {
			CancelSys(row) {
				if(row===0){
					this.dialogFormVisible3 = false
					this.yesemp = []
					this.form2.names=null
				}else{
					this.dialogFormVisible = false
					this.yesemp = []
					this.form2 = []
				}
				
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			cuts(item) {
				this.axios.put("http://localhost:8089/threeproject/delSystem", item,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
					}).catch(function(errer) {

						console.log(errer)
					})
			},
			cutoff() {
				if (this.multipleSelection.length == 0) {
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
							_this.multipleSelection.forEach(item => {
								item.deletename = this.$store.state.updateUserInfo.username
								this.cuts(item)
							});
							_this.pageInfo.currentPage=1
							_this.axios.get("http://localhost:8089/threeproject/findConditional", {
								headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
								},
									params: this.pageInfo
								})
								.then(function(response) {
									_this.System = response.data.list
									_this.pageInfo.total = response.data.total
									console.log(response)
								}).catch(function(error) {
									console.log(error)
								})
						}).catch(action => {
							console.log("2")
						});
				}
			},
			showEdit1(row) {
				console.log(row)
				this.form2 = {}
				this.form2.systemId = row.systemId
				this.form2.systemTheme = row.systemTheme
				this.form2.deptId = row.deptId
				this.form2.systemContent = row.systemContent
				this.form2.systemtypeId = row.systemtypeId
				this.form2.names=row.names
				this.dialogFormVisible2 = true
			},
			UpdateSystem() {
				const _this = this
				this.form2.updatename =this.$store.state.updateUserInfo.username
				console.log(this.form2)
				this.axios.put("http://localhost:8089/threeproject/UpdateSystem", this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						var sys = response.data
						console.log("response内容：")
						console.log(response)
						var row = _this.System.filter(t => t.systemId == sys.systemId)[0]
						row.systemTheme = sys.systemTheme
						row.deptId = sys.deptId
						row.endTime = sys.endTime
						row.systemContent = sys.systemContent
						row.systemtypeId = sys.systemtypeId
						row.updatetime = sys.updatetime

					}).catch(function(error) {
						console.log(error)
					})
				this.dialogFormVisible2 = false
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8089/threeproject/findConditional", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
						params: this.pageInfo
					})
					.then(function(response) {
						for (var i = 0; i < response.data.list.length; i++) {
							var str = ""
							for (var j = 0; j < response.data.list[i].emps.length; j++) {
								str += response.data.list[i].emps[j].empName + " "
							}
							response.data.list[i].names = str
						}
						_this.System = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8089/threeproject/findConditional", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
						params: this.pageInfo
					})
					.then(function(response) {
						for (var i = 0; i < response.data.list.length; i++) {
							var str = ""
							for (var j = 0; j < response.data.list[i].emps.length; j++) {
								str += response.data.list[i].emps[j].empName + " "
							}
							response.data.list[i].names = str
						}
						_this.System = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			release() {
				if (this.multipleSelection.length != 0) {
					const _this = this
					this.$confirm('是否启用？', '启用', {
							distinguishCancelAndClose: true,
							confirmButtonText: '是',
							cancelButtonText: '否',
							type: "warning"
						})
						.then(() => {
							_this.multipleSelection.forEach(item => {
								item.deletename = _this.$store.state.updateUserInfo.username
								this.axios.put("http://localhost:8089/threeproject/UpdatePublish", item,{
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									}
								})
									.then(function(response) {
										console.log("response启用内容：")
										console.log(response)
										var sys = response.data
										var row = _this.System.filter(t => t.systemId == sys.systemId)[0]
										row.systemState = sys.systemState
									}).catch(function(errer) {
										console.log(errer)
									})
							})
						}).catch(action => {
							console.log("2")
						});
				} else {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				}
			},
			suspend() {
				if (this.multipleSelection.length != 0) {
					const _this = this
					this.$confirm('是否停用？', '停用', {
							distinguishCancelAndClose: true,
							confirmButtonText: '是',
							cancelButtonText: '否',
							type: "warning"
						})
						.then(() => {
							_this.multipleSelection.forEach(item => {
								item.deletename = _this.$store.state.updateUserInfo.username
								this.axios.put("http://localhost:8089/threeproject/UpdateSuspend", item,{
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									}
								})
									.then(function(response) {
										console.log("response禁用内容：")
										console.log(response)
										var sys = response.data
										var row = _this.System.filter(t => t.systemId == sys.systemId)[0]
										row.systemState = sys.systemState
									}).catch(function(errer) {
										console.log(errer)
									})
							});
							// this.findConditional()
						}).catch(action => {
							console.log("2")
						});

				} else {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				}
			},
			change() {
				
				this.noemp.forEach(({
					empId,
					empName
				}) => {
					this.yesemp.forEach(item => {
						if (item === empId) {
							this.form2.names += empName + " "
						}
					})
				})
			},
			newAnn() {
				
				this.dialogFormVisible = true
			},
			AddSystem() {
				if (this.form2.systemtypeId != '') {
					if (this.form2.systemTheme != '') {
						if (this.form2.deptId != '') {
							if (this.yesemp.length != 0) {
								const _this = this
								this.form2.addname = _this.$store.state.updateUserInfo.username
								console.log(this.form2)
								this.axios.post("http://localhost:8089/threeproject/AddSystem", this.form2,{
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									}
								})
									.then(function(response) {
										var sys = response.data
										sys.names = _this.value
										_this.System.push(sys)
										_this.dialogFormVisible = false
										_this.axios.delete("http://localhost:8089/threeproject/AddSystemSelect",{
											params:{
												id:response.data.systemId,
												yesemp:qs.stringify(_this.yesemp)
											},
											headers: {
												'content-type': 'application/json',
												'jwtAuth': _this.$store.getters.token
											}
										})
											.then(function(response) {
												console.log(response)
											}).catch(function(error) {
												console.log(error)
											})
										console.log(response)
									}).catch(function(error) {
										console.log(error)
									})
								this.dialogFormVisible = false
							} else {
								this.$alert('<strong>请选择可查看人！</strong>', '提示', {
									dangerouslyUseHTMLString: true,
								});
							}
						} else {
							this.$alert('<strong>请选择部门</strong>', '提示', {
								dangerouslyUseHTMLString: true,
							});
						}
					} else {
						this.$alert('<strong>规章主题不能为空</strong>', '提示', {
							dangerouslyUseHTMLString: true,
						});
					}
				} else {
					this.$alert('<strong>规章分类不能为空</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					})
				}
			},
			findConditional() {
				const _this = this
				this.pageInfo.currentPage = 1
				this.pageInfo.total = 2
				console.log(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findConditional", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
						params: this.pageInfo
					})
					.then(function(response) {
						for (var i = 0; i < response.data.list.length; i++) {
							var str = ""
							for (var j = 0; j < response.data.list[i].emps.length; j++) {
								str += response.data.list[i].emps[j].empName + " "
							}
							response.data.list[i].names = str
						}
						_this.System = response.data.list
						_this.pageInfo.total = response.data.total
						console.log(response)
						console.log(str)
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			const _this = this
			this.findConditional(),
				this.axios.get("http://localhost:8089/threeproject/findAllSysType",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.SystemType = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findalldept",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {

					_this.dept = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/selectEmp",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.noemp = response.data
					console.log(response)
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

	.qwe .el-input>input {
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

	.el-main {
		color: #333;
	}

	.is-vertical {}

	.el-container {
		height: 100%;
	}
</style>
