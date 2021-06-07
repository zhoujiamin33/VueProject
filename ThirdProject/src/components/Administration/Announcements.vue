<template>
	<!-- <div class="common-layout"> -->
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
								<el-form :model="form1" :rules="forRules" ref="form1">
									<el-form-item prop="classification">
										<el-select v-model="form1.classification" placeholder="公告分类">
											<el-option label="" value=""></el-option>
											<el-option label="活动安排" value="活动安排"></el-option>
											<el-option label="值班公告" value="值班公告"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item class="qwe" prop="theme">
										<el-input style="width: 100%;" v-model="form1.theme" autocomplete="off" placeholder="公告主题"></el-input>
									</el-form-item>
									<el-form-item>
										<el-date-picker v-model="form1.startdate" type="date" placeholder="开始日期" :disabled-date="disabledDate"
										 :shortcuts="shortcuts">
										</el-date-picker>
										--
										<el-date-picker v-model="form1.endtime" type="date" placeholder="结束日期" :disabled-date="disabledDate"
										 :shortcuts="shortcuts">
										</el-date-picker>
									</el-form-item>
									<el-form-item>
										<el-input v-model="form1.content" type="textarea" rows="15"></el-input>
									</el-form-item>
									<el-form-item>
										<textarea v-model="form1.user" style="width: 600px;vertical-align: middle;" placeholder="允许查看用户"></textarea>
										<i class="el-icon-search" style="cursor: pointer;background: #409EFF;margin-right: 10px;"></i>
										<span style="cursor: pointer; ">全部用户</span>
									</el-form-item>
									<el-form-item style="">
										<el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview"
										 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
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
						<el-table ref="multipleTable" :data="tableData" height="500" tooltip-effect="dark" @selection-change="handleSelectionChange">
							<el-table-column type="selection" width="55">
							</el-table-column>
							<el-table-column label="公告主题" width="180">
								<template #default="scope"><a href="#"  @click="showEdit1(scope.row)">{{ scope.row.theme }}</a></template>
							</el-table-column>
							<el-table-column prop="user" label="允许查看用户" width="120">
							</el-table-column>
							<el-table-column prop="type" label="类型" width="100" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="startdate" label="开始时间" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="endtime" label="结束时间" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="state" label="状态" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="enteredby" label="录入人" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="inputtime" label="录入时间" show-overflow-tooltip>
							</el-table-column>
						</el-table>
						<el-dialog title="修改" v-model="dialogFormVisible2" :close-on-click-modal="false">
							<!-- :inline="true" -->
							<el-form :model="form1" :rules="forRules" ref="form1">
								<el-form-item prop="classification">
									<el-select v-model="form1.classification" placeholder="公告分类">
										<el-option label="" value=""></el-option>
										<el-option label="活动安排" value="活动安排"></el-option>
										<el-option label="值班公告" value="值班公告"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item class="qwe" prop="theme">
									<el-input style="width: 100%;" v-model="form1.theme" autocomplete="off" placeholder="公告主题"></el-input>
								</el-form-item>
								<el-form-item>
									<el-date-picker v-model="form1.startdate" type="date" placeholder="开始日期" :disabled-date="disabledDate"
									 :shortcuts="shortcuts">
									</el-date-picker>
									--
									<el-date-picker v-model="form1.endtime" type="date" placeholder="结束日期" :disabled-date="disabledDate"
									 :shortcuts="shortcuts">
									</el-date-picker>
								</el-form-item>
								<el-form-item>
									<el-input v-model="form1.content" type="textarea" rows="15"></el-input>
								</el-form-item>
								<el-form-item>
									<textarea v-model="form1.user" style="width: 600px;vertical-align: middle;" placeholder="允许查看用户"></textarea>
									<i class="el-icon-search" style="cursor: pointer;background: #409EFF;margin-right: 10px;"></i>
									<span style="cursor: pointer; ">全部用户</span>
								</el-form-item>
								<el-form-item style="">
									<el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview"
									 :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
										<!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
										<div slot="tip"  class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
				tableData: [{
					classification:'活动安排',
					theme: '关于国庆放假',
					user: ['全部用户'],
					type: '企业',
					startdate: '2021-05-09',
					endtime: '2021-05-15',
					content:"内容区域",
					state: '录入',
					enteredby: '洛奇',
					inputtime: '2021-05-20',
					upload:'C:\Users\Lenovo\Pictures\Camera Roll\timgK5CBNB9V.jpg',
				}],
				multipleSelection: [],
				
				//分页初始定位页数
				currentPage4: 1,
				//隐藏新增页面
				dialogFormVisible: false,
				dialogFormVisible2:false,
				form1: {
					classification: '',
					theme: '',
					startdate: '',
					endtime: '',
					content: '',
					user: [],
					file:''
				},
				//新增验证
				forRules: {
					classification: [{required: true,message: '不能为空',tigger: ['blur', 'change']}],
					theme: [{required: true,message: '不能为空',tigger: 'blur'}],
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
				}],
				//文件上传
				 fileList:[]

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
			showEdit1(row){
				console.log(row)
				this.form1.classification=row.classification
				this.form1.theme=row.theme
				this.form1.user=row.user
				this.form1.startdate=row.startdate
				this.form1.endtime=row.endtime
				this.form1.content=row.content
				this.form1.file=row.upload
				this.dialogFormVisible2=true
			},
			release(){
				if(this.multipleSelection.length==0){
						this.$alert('<strong>请至选中一个！</strong>', '提示', {					  
						dangerouslyUseHTMLString: true,
					}); 
				}else{
					console.log("选中了！")
				}
			},
			suspend(){
				if(this.multipleSelection.length==0){
						this.$alert('<strong>请至选中一个！</strong>', '提示', {					  
						dangerouslyUseHTMLString: true,
					}); 
				}else{
					console.log("选中了！")
				}
			},
			cutoff(){
								if(this.multipleSelection.length==0){
						this.$alert('<strong>请至选中一个！</strong>', '提示', {					  
						dangerouslyUseHTMLString: true,
					}); 
				}else{
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

	.is-vertical {}

	.el-container {
		height: 100%;
	}
</style>
