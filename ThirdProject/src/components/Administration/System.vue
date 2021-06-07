<template>
	<el-container :style="{height:height}">
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
							<el-dialog title="新增" v-model="dialogFormVisible" :close-on-click-modal="false">
								<!-- :inline="true" -->
								<el-form :model="form2" :rules="forRules" ref="form2">
									<el-form-item prop="System_Id">
										<el-select v-model="form2.System_Id" placeholder="分类">
											<el-option label="" value=""></el-option>
											<el-option label="员工守则" value="员工守则"></el-option>
											<el-option label="国家政策" value="国家政策"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item class="qwe" prop="System_Theme">
										<el-input style="width: 100%;" v-model="form2.System_Theme" autocomplete="off" placeholder="主题"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.Dept_Id" placeholder="发文单位"></el-input>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form2.System_Content" type="textarea" rows="15"></el-input>
									</el-form-item>
									<el-form-item>
										<textarea v-model="form2.user" style="width: 600px;vertical-align: middle;" placeholder="允许查看用户"></textarea>
										<i class="el-icon-search" style="cursor: pointer;background: #409EFF;margin-right: 10px;"></i>
										<span style="cursor: pointer; ">全部用户</span>
									</el-form-item>
									<el-form-item style="">
										<el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove"
										 :file-list="fileList" :auto-upload="false">
											<!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
											<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
										</el-upload>
										<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
									</el-form-item>
								</el-form>
								<template #footer>
									<span class="dialog-footer">
										<el-button @click="">取 消</el-button>
										<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
								<template #default="scope"><a href="#" @click="showEdit1(scope.row)">{{ scope.row.System_Theme }}</a></template>
							</el-table-column>
							<el-table-column prop="Dept_Id" label="发文单位" width="150">
							</el-table-column>
							<el-table-column prop="user" label="允许查看用户" width="100" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="Dept_Id" label="类型" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="System_State" label="状态" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="AddTime" label="创造时间" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="form2" :rules="forRules" ref="form2">
								<el-form-item prop="SystemType_Id">
									<el-select v-model="form2.SystemType_Id" placeholder="分类">
										<el-option label="" value=""></el-option>
										<el-option label="员工守则" value="员工守则"></el-option>
										<el-option label="国家政策" value="国家政策"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item class="qwe" prop="System_Theme">
									<el-input style="width: 100%;" v-model="form2.System_Theme" autocomplete="off" placeholder="主题"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.Dept_Id" placeholder="发文单位"></el-input>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form2.System_Content" type="textarea" rows="15"></el-input>
								</el-form-item>
								<el-form-item>
									<textarea v-model="form2.user" style="width: 600px;vertical-align: middle;" placeholder="允许查看用户"></textarea>
									<i class="el-icon-search" style="cursor: pointer;background: #409EFF;margin-right: 10px;"></i>
									<span style="cursor: pointer; ">全部用户</span>
								</el-form-item>
								<el-form-item style="">
									<el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove"
									 :file-list="fileList" :auto-upload="false">
										<!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
										<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
									</el-upload>
									<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
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
				System: [{
					System_Id: '1',
					SystemType_Id: '国家政策',
					System_Theme: '关于加班问题',
					Dept_Id: '行政部',
					System_Content: '内容区域',
					System_State: '录入',
					AddTime: '2021-05-20',
					user: ['全部用户']
				}],

				multipleSelection: [],

				//分页初始定位页数
				currentPage4: 1,
				//隐藏新增页面
				dialogFormVisible: false,
				dialogFormVisible2: false,
				form2: {
					System_Id: '',
					SystemType_Id: '',
					System_Theme: '',
					Dept_Id: '',
					System_Content: "",
					System_State: '',
					AddTime: '',
					user: []
				},
				//新增验证
				forRules: {
					SystemType_Id: [{
						required: true,
						message: '不能为空',
						tigger: ['blur', 'change']
					}],
					System_Theme: [{
						required: true,
						message: '不能为空',
						tigger: 'blur'
					}],
				},
				//文件上传
				fileList: []

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
			//文件上传
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			showEdit1(row) {
				console.log(row)
				this.form2.SystemType_Id = row.SystemType_Id
				this.form2.System_Theme = row.System_Theme
				this.form2.Dept_Id = row.Dept_Id
				this.form2.System_Content = row.System_Content
				this.form2.System_State = row.System_State
				this.form2.AddTime = row.AddTime
				this.form2.user = row.user
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
			cutoff() {
				if (this.multipleSelection.length == 0) {
					this.$alert('<strong>请至选中一个！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				} else {
					console.log("选中了！")
				}
			}
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
