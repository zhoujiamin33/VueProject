<template>
	<!-- <div class="common-layout"> -->
	<el-container :style="{height:height}">
		<el-container>
			<el-main style="padding: 0px;">
				<el-container style="border: #409EFF 1px solid;">
					<el-header>
						<el-input style="width: 200px;margin-left: 10px;" v-model="pageInfo.SuSearch" placeholder="请输入意见箱名:">
						</el-input>
						<el-button icon="el-icon-search" style="border: #FFF solid 1px;" @click="SuSearch_But"></el-button>
					</el-header>
					<el-main>

						<div class="edit">
							<el-button @click="dialogFormVisible = true">新增</el-button>
							<el-dialog title="新增" v-model="dialogFormVisible" :close-on-click-modal="false">
								<!-- :inline="true" -->
								<el-form :model="form2" class="" :rules="forRules" ref="form2">
									<el-form-item prop="suggestName">
										<el-input style="width: 90%;" v-model="form2.suggestName" autocomplete="off"
											placeholder="意见箱名称"></el-input>
									</el-form-item>
									<el-form-item prop="Dept_Id">
										<el-select v-model="form2.deptId" @change="dwjb" :style="{border:borders}"
											placeholder="部门" filterable allow-create default-first-option>
											<el-option v-for="itms in dept" :label="itms.deptName"
												:value="itms.deptId"></el-option>
<!-- 											<el-option label="技术部" value="1"></el-option> -->
										</el-select>&nbsp;
										<el-input v-model="form2.addname" placeholder="添加人"></el-input>
									</el-form-item>
								</el-form>
								<template #footer>
									<span class="dialog-footer">
										<el-button @click="cancelSuggest">取 消</el-button>
										<el-button type="primary" @click="AddSuggest">确 定</el-button>
									</span>
								</template>
							</el-dialog>
						</div>
						<el-table ref="multipleTable" :data="Suggest" height="500" tooltip-effect="dark"
							@selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="意见箱名称">
								<template #default="scope"><a href="#"
										@click="showEdit1(scope.row)">{{ scope.row.suggestName }}</a></template>
							</el-table-column>
							<el-table-column prop="dept.deptName" label="部门">
							</el-table-column>
						</el-table>
						<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="form2" class="" :rules="forRules" ref="form2">
								<el-form-item prop="suggestName">
									<el-input style="width: 90%;" v-model="form2.suggestName" autocomplete="off"
										placeholder="意见箱名称"></el-input>
								</el-form-item>
								<el-form-item prop="deptId">
									<el-select v-model="form2.deptId" @change="dwjb" :style="{border:borders}"
										placeholder="部门" filterable allow-create default-first-option>
										<el-option v-for="itms in dept" :label="itms.deptName"
											:value="itms.deptId"></el-option>
										
									</el-select>&nbsp;
									<el-input v-model="form2.updatename" placeholder="修改人"></el-input>
								</el-form-item>
							</el-form>
							<template #footer>
								<span class="dialog-footer">
									<el-button style="background: red; color: white;" @click="DelSuggest">删除</el-button>
									<el-button @click="cancelSuggest">取 消</el-button>
									<el-button type="primary" @click="UpdateSuggest">确 定</el-button>
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
				Suggest: [],
				dept:[],

				multipleSelection: [],
				//分页
				pageInfo: {
					currentPage: 1, //识别当前页码
					pagesize: 2, //每页多少条数据
					total: 0,
					SuSearch:''
				},
				//隐藏新增页面
				dialogFormVisible: false,
				dialogFormVisible2: false,
				form2: {
					suggestId: '',
					suggestName: '',
					deptId: '',
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
					suggestName: [{
						required: true,
						message: '',
						tigger: ['blur', 'change']
					}],
					deptId: [{
						required: true,
						message: '',
						tigger: 'blur'
					}],
				},
				borders: '#fff 1px solid'
			};
		},
		methods: {
			SuSearch_But(){
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findNamePageSuggest", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(this.pageInfo)
						_this.Suggest = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			cancelSuggest() {
				this.dialogFormVisible = false
				this.dialogFormVisible2 = false
				this.form2 = []

			},
			DelSuggest(){
				const _this = this
				this.form2.deletename="娜贝拉"
				this.axios.put("http://localhost:8089/threeproject/DelSuggest", this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						console.log(response)
						var Su = response.data
						var row = _this.Suggest.filter(t => t.suggestId != Su.suggestId)
						_this.Suggest=row
						_this.dialogFormVisible2 = false
				
					}).catch(function(error) {
						console.log(error)
					})
			},
			AddSuggest() {
				if (this.form2.suggestName.length === 0 && this.form.dept.length === 0) {
					console.log("必填项为空！")
					return
				}
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddSuggest", this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						// var Su = response.data
						// _this.Suggest.push(Su)
						this.axios.get("http://localhost:8089/threeproject/findPageSuggest", {
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							},
								params: this.pageInfo
							})
							.then(function(response) {
								_this.Suggest = response.data.list
								_this.pageInfo.total = response.data.total
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible = false
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
			},
			UpdateSuggest(){
				if (this.form2.suggestName.length === 0 && this.form.dept.length === 0) {
					console.log("必填项为空！")
					return
				}
				const _this = this
				console.log("this.Suggest内容：")
				console.log(this.Suggest)
				this.axios.put("http://localhost:8089/threeproject/UpdateSuggest", this.form2,{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
					.then(function(response) {
						var Su = response.data
						console.log("response内容：")
						console.log(response)
						var row = _this.Suggest.filter(t => t.suggestId == Su.suggestId)[0]
						row.suggestName = Su.suggestName
						row.deptId = Su.deptId
						_this.dialogFormVisible2 = false
				
					}).catch(function(error) {
						console.log(error)
					})
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
				this.multipleSelection = val;
				console.log(this.multipleSelection)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			submitUpload() {
				this.$refs.upload.submit();
			},
			showEdit1(row) {
				console.log(row)
				this.form2.suggestId = row.suggestId
				this.form2.suggestName = row.suggestName
				this.form2.deptId = row.deptId
				this.form2.updatename = row.updatename
				this.dialogFormVisible2 = true
			},
			release() {
				if (this.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					console.log("选中了！")
				}
			},
			suspend() {
				if (this.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					console.log("选中了！")
				}
			},
			dwjb() {
				if (this.form2.Unit_Level == '') {
					this.borders = "red 1px solid";
					console.log(this.borders)
				} else {
					this.borders = "#fff 1px solid";
				}
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findPageSuggest", {
				headers: {
					'content-type': 'application/json',
					'jwtAuth': this.$store.getters.token
				},
					params: this.pageInfo
				})
				.then(function(response) {
					_this.Suggest = response.data.list
					_this.pageInfo.total = response.data.total
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				}),
				this.axios.get("http://localhost:8089/threeproject/findalldept",{
					headers: {
						'content-type': 'application/json',
						'jwtAuth': this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.dept = response.data
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


	.is-vertical {}

	.el-container {
		height: 100%;
	}
</style>
