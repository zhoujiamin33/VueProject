<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk" >
				<b>快速索引：</b>
				<el-select v-model="value" filterable placeholder="问题">
					<el-option v-for="item in kssy" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input style="width: 120px;" placeholder="请输入内容" v-model="input" clearable>
				</el-input>

			</div>
			<div>
				<el-button>查询</el-button>
				<el-button type="" @click="dialogFormVisible = true">新增</el-button>
				<el-dialog title="新增FAQ信息" v-model="dialogFormVisible">
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

						<el-form-item label="点击次数:" :label-width="formLabelWidth">
							<el-input v-model="form.clickcount" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="addFaqQuestions">新建并保存</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>

				<el-popconfirm title="这是一段内容确定删除吗？">
					<template #reference>
						<el-button style="margin-left: 10px;">删除</el-button>
					</template>
				</el-popconfirm>

			</div>
		</div>
		<div>
			<el-collapse :data="FaqQuestionsDate" 
				style="" v-for="item in FaqQuestionsDate">
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
					currentPage: 1, //标识当前页码
					pagesize: 2, //每页多少条数据
					total: 0
				},
				kssy: [{
					value: '选项1',
					label: '问题'
				}],
				FaqQuestionsDate: [],
				dialogFormVisible2: false,
				dialogFormVisible: false,
				formLabelWidth: '100px',
				form: {
					faqId: "",
					problem: "",
					answer: "",
					addname: "",
					clickcount: ""
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
			// this.axios.get("http://localhost:8089/threeproject/findFaqQuestions")
			// 	.then(function(response) {
			// 		_this.FaqQuestionsDate = response.data
			// 		console.log(response)
			// 	}).catch(function(error) {
			// 		console.log(error)
			// 	})
			this.axios.get("http://localhost:8089/threeproject/findPageFaq", {
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
			
			handleClick(row) {
				console.log(row);
			},
			addFaqQuestions() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/FaqQuestions", this.form)
					.then(function(response) {
						console.log(response)
						var faq_questions = response.data
						_this.FaqQuestionsDate.push(faq_questions)
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPageFaq", {
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
/* 	.mianboby {
		display: flex;
		justify-content: space-between;
	}

	.answertext {
		text-align: left;
	} */
</style>
