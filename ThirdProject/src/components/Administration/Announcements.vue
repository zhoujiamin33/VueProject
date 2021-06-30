<template>
	<!-- <div class="common-layout"> -->
	<el-container>
		<el-container>
			<el-main style="padding: 0px;">
				<el-container style="border: #409EFF 1px solid;">
					<el-header>
						<span style="font-size: 14px;">快速检索</span>
						<el-input style="width: 200px;margin-left: 10px;" v-model="pageInfo.AnnSearch" placeholder="请输入主题、内容">
						</el-input>
						<el-button @click="AnnQuery" icon="el-icon-search" style="border: #FFF solid 1px;"></el-button>
					</el-header>
					<el-main>
						<div class="edit">
							<el-button @click="dialogFormVisible = true">新增</el-button>
							<el-dialog title="新增" v-model="dialogFormVisible" :close-on-click-modal="false">
								<!-- :inline="true" -->
								<el-form :model="form1" :rules="forRules" ref="form1">
									<el-form-item>
										<el-select v-model="form1.announcementtypeId" placeholder="公告分类">
											<el-option v-for="itms in AnnType" :label="itms.announcementtypeName" :value="itms.announcementtypeId"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item class="qwe" prop="announcementTheme">
										<el-input style="width: 100%;" v-model="form1.announcementTheme" autocomplete="off" placeholder="公告主题"></el-input>
									</el-form-item>
									<el-form-item>
										<el-date-picker v-model="form1.startTime" type="date" placeholder="开始日期" :shortcuts="shortcuts">
										</el-date-picker>
										--
										<el-date-picker @blur="aaaa" v-model="form1.endTime" type="date" placeholder="结束日期" :shortcuts="shortcuts">
										</el-date-picker>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form1.announcementContent" type="textarea" rows="15" placeholder="公告内容"></el-input>
									</el-form-item>
									<el-form-item>
										<i class="el-icon-search" @click="dialogFormVisible3 = true" style="cursor: pointer;background: #409EFF;margin-right: 10px;">选择可查看人</i>
										<el-dialog title="选择可查看人" v-model="dialogFormVisible3" :close-on-click-modal="false" append-to-body>
											<el-transfer v-model="yesemps.yesemp" :props="{key: 'empId',label: 'empName'}" :titles="['未关联', '已关联']" :data="noemp"></el-transfer>

											<div slot="footer" class="dialog-footer" style="text-align: right;margin-top: 10px;">
												<el-button @click="dialogFormVisible3 = false">取 消</el-button>
												<el-button type="primary" @click="dialogFormVisible3 = false">确 定</el-button>
											</div>
										</el-dialog>
									</el-form-item>
								</el-form>
								<template #footer>
									<span class="dialog-footer">
										<el-button @click="CancelSys">取 消</el-button>
										<el-button type="primary" @click="AnnAdd">确 定</el-button>
									</span>
								</template>
							</el-dialog>
							<el-button @click="release">发布</el-button>
							<el-button @click="suspend">暂停</el-button>
							<el-button @click="cutoff">删除</el-button>
						</div>
						<el-table ref="multipleTable" :data="tableData" height="500" tooltip-effect="dark" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="公告主题" width="180">
								<template #default="scope"><a href="#" @click="showEdit1(scope.row)">{{ scope.row.announcementTheme }}</a></template>
							</el-table-column>
							<el-table-column prop="user" label="允许查看用户" width="120">
							</el-table-column>
							<el-table-column prop="startTime" label="开始时间" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="endTime" label="结束时间" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="announcementState" label="状态" show-overflow-tooltip>
								<template v-slot="scope">
									<p v-if="scope.row.announcementState==0">录用</p>
									<p v-if="scope.row.announcementState==1">已发布</p>
									<p v-if="scope.row.announcementState==2">停用</p>
								</template>
							</el-table-column>
							<el-table-column prop="addname" label="录入人" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="addtime" label="录入时间" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="form1" :rules="forRules" ref="form1">
								<el-form-item prop="announcementtypeId">
									<el-select v-model="form1.announcementtypeId" placeholder="公告分类">
										<el-option v-for="itms in AnnType" :label="itms.announcementtypeName" :value="itms.announcementtypeId"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item class="qwe" prop="announcementTheme">
									<el-input style="width: 100%;" v-model="form1.announcementTheme" autocomplete="off" placeholder="公告主题"></el-input>
								</el-form-item>
								<el-form-item>
									<el-date-picker v-model="form1.startTime" type="date" placeholder="开始日期" :shortcuts="shortcuts">
									</el-date-picker>
									--
									<el-date-picker v-model="form1.endTime" type="date" placeholder="结束日期" :shortcuts="shortcuts">
									</el-date-picker>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form1.announcementContent" type="textarea" rows="15" placeholder="公告内容"></el-input>
								</el-form-item>
							</el-form>
							<template #footer>
								<span class="dialog-footer">
									<el-button @click="">取 消</el-button>
									<el-button type="primary" @click="UpdateAnn">确 定</el-button>
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
				yesemps:{
					yesemp: [],
					id:''
				}
				,
				isCollapse: false,
				auto: '200px',
				tableData: [],
				AnnType: [],
				multipleSelection: [],

				//隐藏新增页面
				dialogFormVisible3: false,
				dialogFormVisible: false,
				dialogFormVisible2: false,
				pageInfo: {
					currentPage: 1, //识别当前页码
					pagesize: 2, //每页多少条数据
					total: 0,
					AnnSearch: ''
				},
				form1: {
					announcementId: '',
					announcementtypeId: '',
					startTime: '',
					endTime: '',
					announcementTheme: '',
					announcementContent: '',
					announcementState: '',
					addname: '',
					addtime: '',
					publishname: '',
					publishtime: '',
					suspendname: '',
					suspendtime: '',
					updatename: '',
					updatetime: '',
					deletename: '',
					deletetime: ''
				},
				//新增验证
				forRules: {
					announcementTheme: [{
						required: true,
						message: '不能为空',
						tigger: 'blur'
					}],
				},
				disabledDate(time) {
					return time.getTime() > Date.now()
				},
				shortcuts: [{
					text: 'Today',
					value: new Date(),
				}, {
					text: 'Yesterday',
					value: (() => {
						const date = new Date()
						date.setTime(date.getTime() - 3600 * 1000 * 24)
						return date
					})(),
				}, {
					text: 'A week ago',
					value: (() => {
						const date = new Date()
						date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
						return date
					})(),
				}]

			};
		},
		methods: {
			aaaa() {
				console.log(this.form1)
			},
			CancelSys() {
				this.dialogFormVisible = false
				this.form1 = []
				this.yesemps.yesemp = []
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
			handleSelectionChange(val) {
				this.multipleSelection = [];
				this.multipleSelection = val;
				console.log(this.multipleSelection)

				// for (var i = 0; i < val.length; i++) {
				// 	this.multipleSelection.push(val[i].announcementId);
				// }
			},
			cuts(item) {
				this.axios.put("http://localhost:8089/threeproject/delAnn", item,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
					.then(function(response) {

					}).catch(function(errer) {
						console.log(_this.multipleSelection)
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
								item.deletename = _this.$store.state.updateUserInfo.username
								console.log("删除人"+_this.$store.state.updateUserInfo.username)
								this.cuts(item)
							});
							_this.axios.get("http://localhost:8089/threeproject/findAnns", {
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									},
								
									params: this.pageInfo
								})
								.then(function(response) {
									_this.tableData = response.data.list
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

			handleSizeChange(pagesize) {
				var _this = this
				// this.pageInfo.AnnSearch=null
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8089/threeproject/findAnns", {
					
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
					
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.AnnSearch = ''
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8089/threeproject/findAnns", {
					
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
					
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			showEdit1(row) {
				console.log(row)
				this.form1.announcementId = row.announcementId
				this.form1.announcementtypeId = row.announcementtypeId
				this.form1.announcementTheme = row.announcementTheme
				this.form1.startTime = row.startTime
				this.form1.endTime = row.endTime
				this.form1.announcementContent = row.announcementContent
				this.form1.updatename = this.$store.state.updateUserInfo.username
				this.dialogFormVisible2 = true
			},
			UpdateAnn() {
				const _this = this
				console.log("this.Unit内容：")
				// this.from.updatename=this.$store.state.updateUserInfo.username
				console.log(this.Unit)
				this.axios.put("http://localhost:8089/threeproject/AnnUpdate", this.form1,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						var Ann = response.data
						console.log("response内容：")
						console.log(response)
						var row = _this.tableData.filter(t => t.announcementId == Ann.announcementId)[0]
						row.announcementTheme = Ann.announcementTheme
						row.startTime = Ann.startTime
						row.endTime = Ann.endTime
						row.announcementContent = Ann.announcementContent
						row.updatename = Ann.updatename
						row.updatetime = Ann.updatetime
						_this.dialogFormVisible2 = false

					}).catch(function(error) {
						console.log(error)
					})
			},
			release() {
				if (this.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					const _this = this
					_this.multipleSelection.forEach(item => {
						item.publishname = this.$store.state.updateUserInfo.username
						this.axios.put("http://localhost:8089/threeproject/AnnState", item,{
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
							.then(function(response) {
								var Ann = response.data
								console.log("response内容：")
								console.log(response)
								var row = _this.tableData.filter(t => t.announcementtypeId == Ann.announcementtypeId)[0]
								row.announcementState = Ann.announcementState
								_this.dialogFormVisible2 = false

							}).catch(function(error) {
								console.log(error)
							})
					});

				}

			},
			suspend() {
				if (this.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					const _this = this
					_this.multipleSelection.forEach(item => {
						item.suspendname = this.$store.state.updateUserInfo.username
						console.log(item)
						this.axios.put("http://localhost:8089/threeproject/SuspendAnn", item,{
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
							.then(function(response) {
								var Ann = response.data
								console.log("response内容：")
								console.log(response)
								var row = _this.tableData.filter(t => t.announcementtypeId == Ann.announcementtypeId)[0]
								row.announcementState = Ann.announcementState
								_this.dialogFormVisible2 = false

							}).catch(function(error) {
								console.log(error)
							})
					});
				}
			},
			AnnAdd() {
				const _this = this
				if (this.form1.announcementtypeId != '') {
					if (this.form1.announcementTheme != '') {
						if (this.form1.startTime < this.form1.endTime && this.form1.startTime != '' && this.form1.endTime != '') {
							if (this.yesemps.yesemp.length != 0) {
								console.log("13423")
								this.form1.addname=this.$store.state.updateUserInfo.username
								this.axios.post("http://localhost:8089/threeproject/AnnAdd", this.form1,{
									headers: {
										'content-type': 'application/json',
										'jwtAuth': _this.$store.getters.token
									}
								})
									.then(function(response) {
										_this.yesemps.id=response.data.announcementId 
										var Anns = response.data
										console.log("AnnAdd?????")
										console.log(response)
										_this.tableData.push(Anns)
										_this.dialogFormVisible = false
										_this.axios.post("http://localhost:8089/threeproject/AddAnnSelect" ,{
												headers: {
													'content-type': 'application/json',
													'jwtAuth': _this.$store.getters.token
												},
												params:_this.yesemps
											})
											.then(function(response) {
												console.log(response)
											}).catch(function(error) {
												console.log(error)
											})
									}).catch(function(error) {
										console.log(error)
									})
							} else {
								this.$alert('<strong>请选择可查看人！</strong>', '提示', {
									dangerouslyUseHTMLString: true,
								});
							}
						} else {
							this.$alert('<strong>请正确输入开始结束时间</strong>', '提示', {
								dangerouslyUseHTMLString: true,
							});
						}
					} else {
						this.$alert('<strong>公告主题不能为空</strong>', '提示', {
							dangerouslyUseHTMLString: true,
						});
					}
				} else {
					this.$alert('<strong>公告分类不能为空</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				}



			},
			AnnQuery() {
				const this_ = this
				this.axios.get("http://localhost:8089/threeproject/findAnns", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						this_.tableData = response.data.list
						this_.pageInfo.total = response.data.total
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			const this_ = this
			this.AnnQuery()
			this.axios.get("http://localhost:8089/threeproject/findAnnType",{
				headers: {
					'content-type': 'application/json',
					'jwtAuth': this.$store.getters.token
				}
			})
				.then(function(response) {
					this_.AnnType = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),

				this.axios.get("http://localhost:8089/threeproject/selectEmp",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
				.then(function(response) {
					this_.noemp = response.data
					console.log("拥护！")
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

	.el-header {
		background-color: #B3C0D1;
		color: #333;
		/* text-align: center; */
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		/* text-align: center; */
		height: 100%;
		width: 100%;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		/* text-align: left; */
		/* line-height: 160px; */
	}

	.is-vertical {}

	.el-container {
		height: 100%;
	}
</style>
