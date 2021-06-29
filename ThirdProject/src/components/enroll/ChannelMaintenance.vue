<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk" style="margin-bottom: 20px;">

				<b>快速索引：</b>
				<el-select v-model="value" filterable placeholder="请选择">
					<el-option v-for="item in kssy" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input style="width: 120px;" placeholder="请输入内容" v-model="input" clearable>
				</el-input>
			</div>

			<div style="">
				<el-button>查询</el-button>
				<el-button @click="dialogFormVisible = true">新增</el-button>
				<el-dialog title="新增生源信息" v-model="dialogFormVisible">
					<el-form :model="form">
						<el-form-item prop="theoryCenterId" :required="true" label="生源渠道:"
							:label-width="formLabelWidth">
							<el-input v-model="form.sourceName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="添加人名称:" :label-width="formLabelWidth">
							<el-input v-model="form.addname" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="addSource()">新建并保存</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
				<el-dialog title="修改渠道信息" v-model="dialogFormVisible2">
					<el-form :model="form">
						<el-form-item label="id" :label-width="formLabelWidth">
							<el-input v-model="form.sourceId" autocomplete="off" disabled></el-input>
						</el-form-item>
						<el-form-item label="渠道名称" :label-width="formLabelWidth">
							<el-input v-model="form.sourceName" autocomplete="off"></el-input>
						</el-form-item>
						<el-form-item label="修改人名称" :label-width="formLabelWidth">
							<el-input v-model="form.addname" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button @click="dialogFormVisible2 = false">取 消</el-button>
							<el-button type="primary" @click="updateSource()">确 定</el-button>
						</span>
					</template>
				</el-dialog>
			</div>
		</div>
		<div>
			<el-table :data="SourceDate" border>
				<el-table-column fixed prop="sourceId" label="" width="120px">
				</el-table-column>
				<el-table-column prop="sourceName" label="生源渠道" width="">
				</el-table-column>
				<el-table-column prop="yysy" label="已有生源(人)" width="230px">
				</el-table-column>
				<el-table-column prop="qzsy" label="潜在生源(人)" width="230px">
				</el-table-column>
				<el-table-column label="操作" width="120">
					<template #default="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" @click="showEdit(scope.row)" size="small">编辑</el-button>
						<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>

					</template>
				</el-table-column>

			</el-table>
		</div>
		<div>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[2,3,6,10]" :page-size="pageInfo.pagesize"
				layout="total,sizes,prev,pager,next,jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import qs from "qs"
	import {
		defineComponent,
		ref
	} from 'vue'
	export default {
		methods: {
			handleClick(row) {
				console.log(row);
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
					label: '生源渠道'
				}],
				value: '',
				SourceDate: [],
				dialogFormVisible2: false,
				dialogFormVisible: false,
				form: {
					sourceId: "",
					sourceName: "",
					addname: "",
					consultcontent: "",

				},
				// formLabelWidth: '120px'
			}
		},
		methods: {
			handleClick(row) {
				console.log(row);
			},
			addSource() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/AddSource", this.form, {headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						console.log(response)
						var source = response.data
						_this.SourceDate.push(source)
						_this.dialogFormVisible = false
						for (var key in _this.form) {
							delete _this.form[key];
							console.log("111")
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
			updateSource() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/UpSource", this.form, {headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
						}
					})
					.then(function(response) {
						var source = response.data
						console.log("source:%o", source)
						console.log("--------111111")
						var row = _this.SourceDate.filter(d => d.sourceId == source.sourceId)[0]
						console.log("----22")
						row.sourceName = source.sourceName
						console.log("-----------3")
						row.addname = source.addname
						_this.dialogFormVisible2 = false
					}).catch(function(error) {
						console.log(error)
					})
			},
			showEdit(row) {
				this.form.sourceId = row.sourceId
				this.form.sourceName = row.sourceName
				this.form.addname = row.addname
				this.dialogFormVisible2 = true
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo)
				this.axios.get("http://localhost:8089/threeproject/findPageSource", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SourceDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8089/threeproject/findPageSource", {
						headers: {
							'content-type': 'application/json',
							'jwtAuth': _this.$store.getters.token
						},
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.SourceDate = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		setup() {
			return {
				input: ref('')
			}
		},
		created() {
			const _this = this
			// this.axios.get("http://localhost:8089/threeproject/findSource")
			// 	.then(function(response) {
			// 		_this.SourceDate = response.data
			// 		console.log(response)
			// 	}).catch(function(error) {
			// 		console.log(error)
			// 	})
			this.axios.get("http://localhost:8089/threeproject/findPageSource", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					},
					params: this.pageInfo
				})
				.then(function(response) {
					console.log(response)
					_this.SourceDate = response.data.list
					_this.pageInfo.total = response.data.total
				}).catch(function(error) {
					console.log(error)
				})
		}
	}
</script>

<style>
	.mianboby {
		display: flex;
		justify-content: space-between;
		align-content: center
	}
</style>
© 2021 GitHub, Inc.
