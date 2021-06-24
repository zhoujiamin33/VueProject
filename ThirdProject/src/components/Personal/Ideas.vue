<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="收到的意见" name="first">
				<div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -826px;">检索条件：</b>
						<el-select v-model="value" placeholder="请选择" size="mini" style="width: 370px;" clearable>
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div>
						<el-table :data="tableData" stripe border style="width: 100%;margin-top: 8px;">
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="ideasTitle" label="意见标题" width="415">
								<template #default="scope">
									<a href="#" @click="showEdit(scope.row)">{{scope.row.ideasTitle}}</a>
								</template>
							</el-table-column>
							<el-table-column prop="suggest.suggestName" label="意见箱">
							</el-table-column>
							<el-table-column prop="emp.empName" label="发表人">
							</el-table-column>
							<el-table-column prop="timeofpublication" label="发表时间">
							</el-table-column>
							<el-table-column prop="reply" label="回复人">
							</el-table-column>
							<el-table-column prop="revoverytime" label="回复时间">
							</el-table-column>
						</el-table>
					</div>


					<el-dialog title="编辑" width="47%" v-model="huifu">
						<template #footer>
							<span class="dialog-footer">
								<el-button style="margin-left: -100px;" type="primary" @click="updateIdeas">保 存</el-button>
								<el-button @click="xskd1=false">关 闭</el-button>
							</span>
						</template>
						<el-form :model="form" label-width="80px" size="mini">
							<el-form-item label="意见标题 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.ideasTitle" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="发表人 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.empName" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="发表时间 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.timeofpublication" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="内容 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.ideasName" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="回复内容 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.revoveryname" clearable></el-input>
							</el-form-item>
						</el-form>
					</el-dialog>


					<div>
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.currentPage"
						 :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
						</el-pagination>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="发出的意见" name="second">
				<div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -826px;" >检索条件：</b>
						<el-select v-model="value1" placeholder="请选择" size="mini" style="width: 370px;" @change="chaxunxianshi()" clearable="">
							<el-option label="全部" value="全部"></el-option>
							<el-option label="待回复的意见" value="待回复的意见"></el-option>
							<el-option label="已回复的意见" value="已回复的意见"></el-option>
						</el-select>
					</div>
					<div>
						<el-button type="primary" @click="dialogFormVisible=true" icon="el-icon-circle-plus" size="mini" style="margin-top: 8px;margin-left: -1192px;">新增</el-button>

						<el-dialog title="新增" v-model="dialogFormVisible">
							<el-form :model="form">
								<div style="margin-top: -30px;margin-left: -532px;">
									<el-button size="mini" icon="el-icon-s-order" type="primary" @click="addIdeas">保 存</el-button>
									<el-button size="mini" icon="el-icon-error" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
								</div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -196px;">选择意见箱：</b>
									<el-select v-model="form.suggestId" placeholder="请选择" size="mini" style="width: 320px;margin-top: 12px;">
										<el-option v-for="item in suggestdata" :key="item.suggestId" :label="item.suggestName" :value="item.suggestId"></el-option>
									</el-select>
									<el-checkbox v-model="checked" style="margin-left: 3px;">匿名发表此意见</el-checkbox>
								<div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 33px;">意见标题：</b>
									<el-input placeholder="请输入内容" v-model="form.ideasTitle" size="mini" style="width: 660px;margin-top: 8px;">
									</el-input>
								</div>
								<div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 33px;">意见内容：</b>
									<el-input type="textarea" :rows="2" v-model="form.ideasName" size="mini" style="width: 660px;margin-top: 8px;">
									</el-input>
								</div>
							</el-form>
						</el-dialog>

						<el-table :data="tableData1" stripe border style="width: 100%;margin-top: 8px;">
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="ideasTitle" label="意见标题" width="415">
								<template #default="scope">
									<a href="#" @click="showChakan(scope.row)">{{scope.row.ideasTitle}}</a>
								</template>
							</el-table-column>
							<el-table-column prop="suggest.suggestName" label="意见箱">
							</el-table-column>
							<el-table-column prop="emp.empName" label="管理人">
							</el-table-column>
							<el-table-column prop="state" label="状态">
								<template #default="scope">
									<p v-if="scope.row.state==0">待回复</p>
									<p v-if="scope.row.state==1">已回复</p>
								</template>
							</el-table-column>
							<el-table-column prop="emp.empName" label="发表人">
							</el-table-column>
							<el-table-column prop="timeofpublication" label="发表时间">
							</el-table-column>
							<el-table-column prop="reply" label="回复人">
							</el-table-column>
							<el-table-column prop="revoverytime" label="回复时间">
							</el-table-column>
						</el-table>
					</div>

					<el-dialog title="编辑" width="47%" v-model="chakan">
						<template #footer>
							<span class="dialog-footer">
								<el-button style="margin-left: -100px;" type="primary" @click="updateIdeas">删 除</el-button>
								<el-button @click="chakan=false">关 闭</el-button>
							</span>
						</template>
						<el-form :model="form" label-width="80px" size="mini">
							<el-form-item label="意见标题 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.ideasTitle" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="发表人 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.empName" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="发表时间 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.timeofpublication" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="内容 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.ideasName" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="回复内容 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.revoveryname" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="回复人 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.reply" disabled clearable></el-input>
							</el-form-item>
							<el-form-item label="回复时间 :">
								<el-input style="width: 193px;margin-left: -442px;" v-model="form.revoverytime" disabled clearable></el-input>
							</el-form-item>
						</el-form>
					</el-dialog>

					<div>
						<el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="pageInfo.currentPage"
						 :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
						</el-pagination>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	import qs from "qs";
	export default {
		name: "Ideas",
		data() {
			return {
				suggestdata:[],
				chakan: false,
				huifu: false,
				pageInfo: {
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				activeName: 'first',
				options: [{
					value: '选项1',
					label: '待回复的意见'
				}, {
					value: '选项2',
					label: '已回复的意见'
				}],

				tableData: [],
				
				//发出的意见的查询显示
				value1: "",
				
				
				tableData1: [],

				dialogFormVisible: false,
				form: {
					ideasId: "",
					suggestId:"",
					suggestName:"",
					empName: "",
					ideasTitle: "",
					ideasName: "",
					state: "",
					reply: "",
					revoverytime: "",
					revoveryname: ""
				},

				checked: false,

				input: ref(''),
				input1: ref(''),
			}
		},
		methods: {
			showEdit(row) {
				this.form.ideasId = row.ideasId
				this.form.ideasTitle = row.ideasTitle
				this.form.empName = row.emp.empName
				this.form.timeofpublication = row.timeofpublication
				this.form.ideasName = row.ideasName
				this.form.reply = row.reply
				this.form.revoveryname = row.revoveryname
				this.huifu = true
			},
			showChakan(row) {
				this.form.ideasId = row.ideasId
				this.form.ideasTitle = row.ideasTitle
				this.form.empName = row.emp.empName
				this.form.timeofpublication = row.timeofpublication
				this.form.ideasName = row.ideasName
				this.form.revoveryname = row.revoveryname
				this.form.reply = row.reply
				this.form.revoverytime = row.revoverytime
				this.chakan = true
			},
			//修改
			updateIdeas() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/updateIdeas", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/IdeasfindPagesd", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.axios.get("http://localhost:8089/threeproject/IdeasfindPagefc", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData1 = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						var ideas = response.data
						var row = _this.tableData.filter(i => i.ideasId == ideas.ideasId)[0]
						row.reply = ideas.reply
						row.revoveryname = ideas.revoveryname
						_this.huifu = false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			
			//增加
			addIdeas() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/addIdeas", this.form)
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/IdeasfindPagefc", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData1 = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.axios.get("http://localhost:8089/threeproject/IdeasfindPagesd", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.tableData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible=false
						_this.form={}
					}).catch(function(error) {
						console.log(error)
					})
			},
			
			chaxunxianshi(){
				
			},
			
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/IdeasfindPagesd", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/IdeasfindPagesd", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},

			handleCurrentChange1(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/IdeasfindPagefc", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData1 = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange1(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/IdeasfindPagefc", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.tableData1 = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/IdeasfindPagesd", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.tableData = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})

			this.axios.get("http://localhost:8089/threeproject/IdeasfindPagefc", {
					params: this.pageInfo
				})
				.then(function(response) {
					_this.tableData1 = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
				
			this.axios.get("http://localhost:8089/threeproject/selectSuggest")
					.then(function(response) {
						console.log(response)
						_this.suggestdata = response.data
					}).catch(function(error) {
						console.log(error)
					})
		},
	}
</script>

<style>
</style>
