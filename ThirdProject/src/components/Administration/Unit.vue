<template>
	<el-container :style="{height:height}">
		<!-- <el-header>Header</el-header> -->
		<el-container>
			<el-main style="padding: 0px;">
				<el-container style="border: #409EFF 1px solid;">
					<el-header>
						<span style="font-size: 14px;">快速检索</span>
						<el-select style="margin-left: 10px;" v-model="AnnSelect" placeholder="请输选择内容">
							<el-option label="1" value="1"></el-option>
						</el-select>
						<el-input style="width: 200px;margin-left: 10px;" v-model="AnnSearch" placeholder="请输入内容"></el-input>
						<el-button icon="el-icon-search" style="border: #FFF solid 1px;"></el-button>
					</el-header>
					<el-main>
						
						<div class="edit">
							<el-button @click="dialogFormVisible = true">新增</el-button>
							<el-dialog title="新增"  v-model="dialogFormVisible" :close-on-click-modal="false">
								<!-- :inline="true" -->
								<el-form :model="form2" class="" :rules="forRules" ref="form2">
									<el-form-item prop="Unit_Name">
										<el-input style="width: 90%;" v-model="form2.Unit_Name" autocomplete="off" placeholder="单位名称"></el-input>
									</el-form-item>
									<el-form-item prop="Unit_Level">
										<el-select v-model="form2.UnitType_Id" placeholder="单位类型" filterable allow-create default-first-option>
											<el-option label="" value=""></el-option>
											<el-option label="食品" value="食品"></el-option>
											<el-option label="医疗" value="医疗"></el-option>
										</el-select>&nbsp;
										<el-input v-model="form2.Unit_Level" placeholder="单位级别" @blur="dwjb" :style="{border:borders}"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.Unit_Phone" placeholder="单位电话"></el-input>&nbsp;
										<el-input v-model="form2.Director" placeholder="负责人"></el-input>
									</el-form-item>
									<el-form-item prop="Unit_Address">
										<el-input style="width: 90%;" v-model="form2.Unit_Address" placeholder="单位地址"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.MailCode" placeholder="邮政编码"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.Profile" type="textarea" rows="12" placeholder="简介"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.Remarks" type="textarea" rows="12" placeholder="备注"></el-input>
									</el-form-item>
								</el-form>
								<template #footer>
									<span class="dialog-footer">
										<el-button @click="">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
									</span>
								</template>
							</el-dialog>
							<el-button @click="cutoff">删除</el-button>
						</div>
						<el-table ref="multipleTable" :data="Unit" height="500" tooltip-effect="dark" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="单位名称" width="220">
								<template #default="scope"><a href="#" @click="showEdit1(scope.row)">{{ scope.row.Unit_Name }}</a></template>
							</el-table-column>
							<el-table-column prop="Unit_Phone" label="单位电话" width="230">
							</el-table-column>
							<el-table-column prop="Email" label="电子邮箱" width="210" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="Unit_Address" label="单位地址" width="360" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="Profile" label="简介" width="260" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<el-dialog title="修改"  v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="form2" class="" :rules="forRules" ref="form2">
								<el-form-item prop="Unit_Name">
									<el-input style="width: 90%;" v-model="form2.Unit_Name" autocomplete="off" placeholder="单位名称"></el-input>
								</el-form-item>
								<el-form-item prop="Unit_Level">
									<el-select v-model="form2.UnitType_Id" placeholder="单位类型" filterable allow-create default-first-option>
										<el-option label="" value=""></el-option>
										<el-option label="食品" value="食品"></el-option>
										<el-option label="医疗" value="医疗"></el-option>
									</el-select>&nbsp;
									<el-input v-model="form2.Unit_Level" placeholder="单位级别" @blur="dwjb" :style="{border:borders}"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.Unit_Phone" placeholder="单位电话"></el-input>&nbsp;
									<el-input v-model="form2.Director" placeholder="负责人"></el-input>
								</el-form-item>
								<el-form-item prop="Unit_Address">
									<el-input style="width: 90%;" v-model="form2.Unit_Address" placeholder="单位地址"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.MailCode" placeholder="邮政编码"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.Profile" type="textarea" rows="12" placeholder="简介"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.Remarks" type="textarea" rows="12" placeholder="备注"></el-input>
								</el-form-item>
							</el-form>
							<template #footer>
								<span class="dialog-footer">
									<el-button @click="">取 消</el-button>
									<el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
								</span>
							</template>
						</el-dialog>
					</el-main>
				</el-container>
			</el-main>
		</el-container>
	</el-container>
	<!-- </div> -->
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
				height: document.documentElement.clientHeight,
				width: document.documentElement.clientWidth,
				auto: '200px',
				AnnSearch: '',
				AnnSelect: '',
				Unit: [{
					Unit_Id: '1',
					Unit_Name: '光辉集团',
					UnitType_Id: '食品',
					Unit_Level: '1',
					Director: '晴雯',
					Unit_Address: '广东',
					MailCode: '10086',
					Unit_Phone: '13323124562',
					Email: '123@.com',
					Profile: '简介1',
					Remarks: '备注1'

				}],

				multipleSelection: [],

				//分页初始定位页数
				currentPage4: 1,
				//隐藏新增页面
				dialogFormVisible: false,
				dialogFormVisible2: false,
				form2: {
					Unit_Id: '',
					Unit_Name: '',
					UnitType_Id: '',
					Unit_Level: '',
					Director: '',
					Unit_Address: '',
					MailCode: '',
					Unit_Phone: '',
					Email: '',
					Profile: '',
					Remarks: ''
				},
				//新增验证
				forRules: {
					Unit_Address: [{
						required: true,
						message: '',
						tigger: ['blur', 'change']
					}],
					Unit_Name: [{
						required: true,
						message: '',
						tigger: 'blur'
					}],
				},
				borders:'#fff 1px solid'
			};
		},
		methods: {
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
// 			<!-- Unit_Id: '1',
// 			Unit_Name: '光辉集团',
// 			UnitType_Id: '食品',
// 			Unit_Level: '1',
// 			Director: '晴雯',
// 			Unit_Address: '广东',
// 			MailCode: '10086',
// 			Unit_Phone:'13323124562',
// 			Email:'123@.com',
// 			Profile:'简介1',
// 			Remarks:'备注1' -->
			showEdit1(row) {
				console.log(row)
				this.form2.Unit_Id = row.Unit_Id
				this.form2.Unit_Name = row.Unit_Name
				this.form2.UnitType_Id = row.UnitType_Id
				this.form2.Unit_Level = row.Unit_Level
				this.form2.Director = row.Director
				this.form2.Unit_Address = row.Unit_Address
				this.form2.Unit_Phone = row.Unit_Phone
				this.form2.Email = row.Email
				this.form2.Profile = row.Profile
				this.form2.Remarks = row.Remarks
				this.dialogFormVisible2 = true
			},
			cutoff() {
				if (this.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					console.log("选中了！")
				}
			},
			dwjb(){
				if(this.form2.Unit_Level==''){
					this.borders="red 1px solid";
					console.log(this.borders)
				}else{
					this.borders="#fff 1px solid";
				}
			}
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

	.el-main {
		color: #333;

	}

	.is-vertical {}

	.el-container {
		height: 100%;
	}
</style>
