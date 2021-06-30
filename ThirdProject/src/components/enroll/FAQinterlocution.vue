<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk">
				<b>快速索引：</b>
				<el-select filterable v-model="pageInfo.value" placeholder="请选择">
					<el-option label="问题" value="问题"></el-option>
				</el-select>
				<el-input style="width: 120px;" placeholder="请输入内容" v-model="pageInfo.input" clearable>
				</el-input>
			</div>
			<div>
				<el-button @click="selectFaqFuzzyquery()">查询</el-button>
				<el-button @click="FAQxshi">管理</el-button>
				<el-dialog title="FAQ问答管理" :data="FaqQuestionsDate" v-model="dialogFormVisible">
					<el-form :inline="true" :model="form" class="demo-ruleForm">
						<div style="margin-left: 500px;">
							<el-button type="" @click="dialogFormVisible2 = true">新增</el-button>
							<el-button @click="delFaqQuestions">删除</el-button>
						</div>
						<div>
							<el-form :inline="true" :model="form" class="demo-ruleForm">
								<el-table :data="FaqQuestionsDate" stripe style="width: 100%"
									@selection-change="handleSelectionChange" @filter-change="filterChange">
									<el-table-column type="selection" width="45">
									</el-table-column>
									<el-table-column prop="faqId" label="ID" width="80px">
									</el-table-column>
									<el-table-column prop="problem" label="问题" width="160px">
									</el-table-column>
									<el-table-column prop="answer" label="回答">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="70">
										<template #default="scope">
											<el-button type="text" @click="showEdit(scope.row)">修改</el-button>
										</template>
									</el-table-column>
								</el-table>
							</el-form>
						</div>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="addReturnvisit">保存</el-button>
							<el-button @click="modify = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
				<el-dialog title="新增FAQ信息" v-model="dialogFormVisible2">
					<el-form :model="form">
						<el-form-item label="FAQ问题:" :label-width="formLabelWidth">
							<el-input v-model="form.problem" autocomplete="off"></el-input>
						</el-form-item>

						<el-form-item label="问题答案:" :label-width="formLabelWidth">
							<el-input v-model="form.answer" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="修改人:" :label-width="formLabelWidth">
							<el-input v-model="form.addname" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="addFaqQuestions">新建并保存</el-button>
							<el-button @click="dialogFormVisible2 = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
				<el-dialog title="修改FAQ信息" v-model="dialogFormVisible3">
					<el-form :model="form">
						<el-form-item label="FAQ问题:">
							<el-input v-model="form.problem" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="问题答案:">
							<el-input v-model="form.answer" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="修改人:">
							<el-input v-model="form.updatename" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="updateFaqQuestions">新建并保存</el-button>
							<el-button @click="dialogFormVisible3 = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
		</div>
		<div>
			<el-collapse :data="FaqQuestionsDate" style="" v-for="item in FaqQuestionsDate">
				<!-- <el-checkbox v-model="checked"></el-checkbox> -->
				<el-collapse-item name="1" :title="item.problem">
					<div class="answertext">{{item.answer}}</div>
				</el-collapse-item>
			</el-collapse>
		</div>
		<div>
			<div>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="pageInfo.currentPage" :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize"
					layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import qs from 'qs'
	import {
		defineComponent,
		ref
	} from 'vue'
	export default {
		setup() {
			return {
				input: ref(''),
				textarea: ref('')
			}
		},
		data() {
			return {
				pageInfo: {
					value: "",
					input: "",
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				kssy: [{
					value: '选项1',
					label: '问题'
				}],
				FaqQuestionsDate: [],
				dialogFormVisible3: false,
				dialogFormVisible2: false,
				dialogFormVisible: false,

				formLabelWidth: '100px',
				form: {
					faqId: "",
					problem: "",
					answer: "",
					addname: "",
					clickcount: "",
					updatename: '',
					updatetime: '',
					timeliness: ''
				},
				formLabelWidth: '120px',
				value: '',
				activeName: '1',

				// form: {
				// 	faqwt: ''
				// },
				// formLabelWidth: '120px'
			};
		},

		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findFaqQuestions", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				})
				.then(function(response) {
					_this.FaqQuestionsDate = response.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			this.axios.get("http://localhost:8089/threeproject/findPageFaq", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.FaqQuestionsDate = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})

		},
		methods: {
			handleSelectionChange(val) {
				this.multipleSelection = [];
				this.multipleSelection = val;
				console.log(val + "--------------")
			},
			handleClick(row) {
				console.log(row);
			},
			showEdit(row) {
				this.form.faqId = row.faqId
				this.form.problem = row.problem
				this.form.answer = row.answer
				this.form.updatename = row.updatename
				this.dialogFormVisible3 = true
			},

			//多条件查询
			selectFaqFuzzyquery() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/selectFaqFuzzyquery", {
						params: this.pageInfo,
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token,
						}
					})
					.then(function(response) {
						console.log(response)
						_this.FaqQuestionsDate = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			//新增
			addFaqQuestions() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddFaqQuestions", this.form, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						console.log(response)
						var faq_questions = response.data
						_this.FaqQuestionsDate.push(faq_questions)
						_this.dialogFormVisible2 = false
						for (var key in _this.form) {
							delete _this.form[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			//修改
			updateFaqQuestions() {
				const _this = this
				console.log(this.faqId + "kkk")
				this.axios.put("http://localhost:8089/threeproject/UpFaqQuestions", this.form, {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						_this.axios.get("http://localhost:8089/threeproject/findFaqQuestions", {
								headers: {
									'content-type': 'application/json',
									'jwtAuth': _this.$store.getters.token
								}
							})
							.then(function(response) {
								_this.FaqQuestionsDate = response.data
								console.log(response)
							}).catch(function(error) {
								console.log(error)
							})
						_this.dialogFormVisible3 = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			delFaqQuestions() {
				const _this = this
				_this.multipleSelection.forEach(item => {
					console.log(item)
					console.log(item.faqId + "=======")
					item.deletename = "启用人"
					this.axios.put("http://localhost:8089/threeproject/DelFaq/" + item.faqId, {
							headers: {
								'content-type': 'application/json',
								'jwtAuth': _this.$store.getters.token
							}
						})
						.then(function(response) {
							_this.axios.get("http://localhost:8089/threeproject/findFaqQuestions")
								.then(function(response) {
									_this.FaqQuestionsDate = response.data
									console.log(response)
								}).catch(function(error) {
									console.log(error)
								})
							var Faq = response.data
							console.log("response内容:")
							console.log(response)
						}).catch(function(error) {
							console.log(error)
						})
				})
			},


			FAQxshi() {
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/findFaqQuestions", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						_this.FaqQuestionsDate = response.data
						console.log(response)
					}).catch(function(error) {
						console.log(error)
					})
				_this.dialogFormVisible = true
			},

			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPageFaq", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.FaqQuestionsDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})

			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPageFaq", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.FaqQuestionsDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			}

		}
	}
</script>

<style>
	.mianboby {
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
</style>
