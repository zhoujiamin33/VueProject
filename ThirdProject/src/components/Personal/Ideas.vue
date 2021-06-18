<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="收到的意见" name="first">
				<div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -886px;">检索条件：</b>
						<el-select v-model="value" placeholder="请选择" size="mini" style="width: 370px;">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div>
						<el-table :data="tableData" stripe border style="width: 100%;margin-top: 8px;">
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="yjbt" label="意见标题" width="415">
							</el-table-column>
							<el-table-column prop="yjx" label="意见箱">
							</el-table-column>
							<el-table-column prop="fbr" label="发表人">
							</el-table-column>
							<el-table-column prop="time" label="发表时间">
							</el-table-column>
							<el-table-column prop="hfr" label="回复人">
							</el-table-column>
							<el-table-column prop="hftime" label="回复时间">
							</el-table-column>
						</el-table>
					</div>

					<!-- 分页 -->
					<div>

					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="发出的意见" name="second">
				<div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -886px;">检索条件：</b>
						<el-select v-model="value1" placeholder="请选择" size="mini" style="width: 370px;">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
					<div>
						<el-button type="primary" @click="dialogFormVisible=true" icon="el-icon-circle-plus" size="mini" style="margin-top: 8px;margin-left: -1252px;">新增</el-button>

						<el-dialog title="新增" v-model="dialogFormVisible">
							<el-form :model="form">
								<div style="margin-top: -30px;margin-left: -532px;">
									<el-button size="mini" icon="el-icon-s-order" type="primary">保 存</el-button>
									<el-button size="mini" icon="el-icon-error" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
								</div>
								<div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -196px;">选择意见箱：</b>
									<el-select v-model="value2" placeholder="请选择" size="mini" style="width: 320px;margin-top: 12px;">
										<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
									<el-checkbox v-model="checked" style="margin-left: 3px;">匿名发表此意见</el-checkbox>
								</div>
								<div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 33px;">意见标题：</b>
									<el-input placeholder="请输入内容" v-model="input" size="mini" style="width: 660px;margin-top: 8px;">
									</el-input>
								</div>
								<div>
									<!-- 富文本编辑器 -->
								</div>
								<div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 33px;">相关附件：</b>
									<el-select v-model="select" placeholder="请选择" style="width: 507px;margin-top: 8px;" size="mini">
									</el-select>
									<el-button type="primary" icon="el-icon-download" size="mini" style="margin-top: 10px;margin-left: 3px;">下载</el-button>
									<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 10px;margin-left: 3px;">删除</el-button>
								</div>
								<div>
									<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 33px;">选择附件：</b>
									<el-input placeholder="请选择要上传的附件" v-model="input1" style="width: 507px;margin-top: 8px;" size="mini">
									</el-input>
									<el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 3px;">浏览.....</el-button>
									<el-button type="primary" icon="el-icon-upload2" size="mini" style="margin-top: 10px;margin-left: 3px;">上传</el-button>
								</div>
							</el-form>
						</el-dialog>

						<el-table :data="tableData1" stripe border style="width: 100%;margin-top: 8px;">
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="yjbt" label="意见标题" width="415">
							</el-table-column>
							<el-table-column prop="yjx" label="意见箱">
							</el-table-column>
							<el-table-column prop="glr" label="管理人">
							</el-table-column>
							<el-table-column prop="zt" label="状态">
							</el-table-column>
							<el-table-column prop="fbr" label="发表人">
							</el-table-column>
							<el-table-column prop="time" label="发表时间">
							</el-table-column>
							<el-table-column prop="hfr" label="回复人">
							</el-table-column>
							<el-table-column prop="hftime" label="回复时间">
							</el-table-column>
						</el-table>
					</div>

					<!-- 分页 -->
					<div>

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

	export default {
		name: "Ideas",
		data() {
			return {
				// text: "",
				activeName: 'first',
				options: [{
					value: '选项1',
					label: '待回复的意见'
				}, {
					value: '选项2',
					label: '已回复的意见'
				}],
				value: '',

				tableData: [],

				options1: [{
					value: '选项1',
					label: '全部'
				}, {
					value: '选项2',
					label: '待回复的意见'
				}, {
					value: '选项3',
					label: '已回复的意见'
				}],
				value1: '',

				tableData1: [],

				dialogFormVisible: false,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				
				checked: false,
				
				input: ref(''),
				input1: ref(''),
			}
		},
	}
</script>

<style>
</style>
