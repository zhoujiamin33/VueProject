<template>
	<div>
		<el-tabs v-model="activeName">
			<el-tab-pane label="收件箱" name="first">
				<div>
					<div style="width: 1300px;">
						<b class="b" style="font-size: 13px;font-weight: 100;">所属部门：</b>
						<el-select v-model="value" placeholder="请选择" size="mini">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 60px;">阅读状态：</b>
						<el-select v-model="value1" placeholder="请选择" size="mini">
							<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 60px;">快速检索：</b>
						<el-select v-model="value2" placeholder="请选择" size="mini">
							<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input1" size="mini" style="width: 340px;margin-left: 10px;">
						</el-input>
					</div>
					<div>
						<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 10px;margin-bottom: 10px;margin-right:1300px;">删除</el-button>
						<el-table :data="tableData" stripe border style="width: 100%">
							<el-table-column type="selection" width="50" align="center">
							</el-table-column>
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="zt" label="状态" width="180">
							</el-table-column>
							<el-table-column prop="title" label="标题" width="540">
							</el-table-column>
							<el-table-column prop="qbsjr" label="全部收件人">
							</el-table-column>
							<el-table-column prop="jb" label="级别">
							</el-table-column>
							<el-table-column prop="fj" label="附件">
							</el-table-column>
							<el-table-column prop="fsr" label="发送人">
							</el-table-column>
							<el-table-column prop="date" label="日期">
							</el-table-column>
						</el-table>
					</div>

					<!-- 分页 -->
					<div>

					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="发件箱" name="second">
				<div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;position: absolute;top: 10px;left: 60px;">级别：</b>
						<el-select v-model="value3" placeholder="请选择" size="mini" style="width: 300px;position: absolute;top: 6px;left: 100px;">
							<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b class="b" style="font-size: 13px;font-weight: 100;position: absolute;top: 10px;left: 440px;">快速检索：</b>
						<el-select v-model="value4" placeholder="请选择" size="mini" style="width: 300px;position: absolute;top: 6px;left: 500px;">
							<el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input2" size="mini" style="width: 300px;position: absolute;top: 6px;left: 815px;">
						</el-input>
						<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 40px;margin-bottom: 10px;margin-left:-1200px;">删除</el-button>
					</div>
					<div>
						
						<el-table :data="tableData1" stripe border style="width: 100%">
							<el-table-column type="selection" width="50" align="center">
							</el-table-column>
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="title" label="标题" width="540">
							</el-table-column>
							<el-table-column prop="jsr" label="接收人" width="180">
							</el-table-column>
							<el-table-column prop="jb" label="级别">
							</el-table-column>
							<el-table-column prop="fj" label="附件">
							</el-table-column>
							<el-table-column prop="date" label="日期">
							</el-table-column>
							<el-table-column prop="ms" label="密送">
							</el-table-column>
						</el-table>
					</div>
					<div>

					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="废件箱" name="third">
				<div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -700px;">来源：</b>
						<el-select v-model="value5" placeholder="请选择" size="mini" style="width: 360px;">
							<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>

					<div>
						<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 10px;margin-bottom: 10px;margin-left: -1070px;">彻底删除</el-button>
						<el-button type="primary" icon="el-icon-document-checked" size="mini" style="margin-top: 10px;margin-bottom: 10px;margin-left: 18px;">还原</el-button>
						<el-empty :image-size="200" description="暂无数据"></el-empty>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="草稿箱" name="fourth">
				<div>
					<div>
						<b style="font-size: 13px;font-weight: 100;position: absolute;top: 10px;left: 60px;">级别：</b>
						<el-select v-model="value6" placeholder="请选择" size="mini" style="width: 300px;position: absolute;top: 6px;left: 100px;">
							<el-option v-for="item in options6" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<b class="b" style="font-size: 13px;font-weight: 100;position: absolute;top: 10px;left: 440px;">快速检索：</b>
						<el-select v-model="value7" placeholder="请选择" size="mini" style="width: 300px;position: absolute;top: 6px;left: 500px;">
							<el-option v-for="item in options7" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-input placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input3" size="mini" style="width: 300px;position: absolute;top: 6px;left: 815px;">
						</el-input>
						<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 40px;margin-bottom: 10px;margin-left:-1200px;">删除</el-button>
					</div>

					<div>
						
						<el-table :data="tableData3" stripe border style="width: 100%">
							<el-table-column type="selection" width="50" align="center">
							</el-table-column>
							<el-table-column type="index" width="50" align="center">
							</el-table-column>
							<el-table-column prop="title" label="标题" width="540">
							</el-table-column>
							<el-table-column prop="jsr" label="接收人" width="180">
							</el-table-column>
							<el-table-column prop="jb" label="级别">
							</el-table-column>
							<el-table-column prop="fj" label="附件">
							</el-table-column>
							<el-table-column prop="date" label="日期">
							</el-table-column>
							<el-table-column prop="ms" label="密送">
							</el-table-column>
						</el-table>
					</div>
				</div>
			</el-tab-pane>
			<el-tab-pane label="撰写新邮件" name="fifth">
				<div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 20px;">标题：</b>
						<el-input placeholder="请输入内容" v-model="input3" style="width: 1180px;" size="mini">
							<template #append>
								<el-select v-model="select" placeholder="请选择" style="width: 120px;" size="mini">
									<el-option label="内部邮件" value="1"></el-option>
									<el-option label="外部邮件" value="2"></el-option>
								</el-select>
							</template>
						</el-input>
					</div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: 8px;">收件人：</b>
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="textarea" style="width: 1180px;margin-top: 8px;">
						</el-input>
					</div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -694px;">级别：</b>
						<el-select v-model="value8" placeholder="请选择" size="mini" style="width: 200px;margin-top: 8px;">
							<el-option v-for="item in options8" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-checkbox v-model="checked1" style="margin-left: 3px;">密送邮件</el-checkbox>
						<el-checkbox v-model="checked2">站内消息提醒收件人</el-checkbox>
					</div>
					<!-- <div class="publish_container">
					      <qulEditor></qulEditor>
					</div> -->
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -7px;">相关附件：</b>
						<el-select v-model="select" placeholder="请选择" style="width: 1024px;margin-top: 8px;" size="mini">
						</el-select>
						<el-button type="primary" icon="el-icon-download" size="mini" style="margin-top: 10px;margin-left: 3px;">下载</el-button>
						<el-button type="primary" icon="el-icon-remove-outline" size="mini" style="margin-top: 10px;margin-left: 3px;">删除</el-button>
					</div>
					<div>
						<b class="b" style="font-size: 13px;font-weight: 100;margin-left: -7px;">选择附件：</b>
						<el-input placeholder="请选择要上传的附件" v-model="input4" style="width: 1024px;margin-top: 8px;" size="mini">
						</el-input>
						<el-button type="primary" size="mini" style="margin-top: 10px;margin-left: 3px;">浏览.....</el-button>
						<el-button type="primary" icon="el-icon-upload2" size="mini" style="margin-top: 10px;margin-left: 3px;">上传</el-button>
					</div>
					<div style="margin-left: 116px;">
						<el-button type="primary" icon="el-icon-position" size="mini" style="margin-top: 10px;margin-left: -1036px;">确定发送</el-button>
						<el-button type="primary" icon="el-icon-s-order" size="mini" style="margin-top: 10px;margin-left: 3px;">保存草稿</el-button>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	// import qulEditor from "./quEditor.vue"
	import {
		defineComponent,
		ref
	} from 'vue'

	export default {
		 name: "Mail",
		   // components: { qulEditor },//富文本编辑器组件
		data() {
			return {
				// text: "",
				activeName: 'first',
				options: [{
					value: '选项1',
					label: '集团总部'
				}, {
					value: '选项2',
					label: '财务中心'
				}, {
					value: '选项3',
					label: '人事中心'
				}],
				value: '',

				options1: [{
					value: '选项1',
					label: '全部邮件'
				}, {
					value: '选项2',
					label: '未读邮件'
				}, {
					value: '选项3',
					label: '已读邮件'
				}],
				value1: '',

				options2: [{
					value: '选项1',
					label: '标题'
				}, {
					value: '选项2',
					label: '发送人'
				}],
				value2: '',
				input1: ref(''),
				tableData: [{
					zt: '',
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					qbsjr: 'www',
					jb: '普通',
					fj: '',
					fsr: 'k',
					date: '2021-05-20'
				}, {
					zt: '',
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					qbsjr: 'www',
					jb: '普通',
					fj: '',
					fsr: 'k',
					date: '2021-05-20'
				}, {
					zt: '',
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					qbsjr: 'www',
					jb: '普通',
					fj: '',
					fsr: 'k',
					date: '2021-05-20'
				}, {
					zt: '',
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					qbsjr: 'www',
					jb: '普通',
					fj: '',
					fsr: 'k',
					date: '2021-05-20'
				}],

				options3: [{
					value: '选项1',
					label: '全部邮件'
				}, {
					value: '选项2',
					label: '重要邮件'
				}, {
					value: '选项3',
					label: '普通邮件'
				}],
				value3: '',

				options4: [{
					value: '选项1',
					label: '标题'
				}, {
					value: '选项2',
					label: '接收人'
				}],
				value4: '',
				input2: ref(''),

				tableData1: [{
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}, {
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}, {
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}, {
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}, {
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}, {
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}, {
					title: '你平时挺活泼开朗的啊，为什么你的眼神总是死气沉沉',
					jsr: 'k',
					jb: '普通',
					fj: '',
					date: '2021-05-20',
					ms: '否'
				}],

				options5: [{
					value: '选项1',
					label: '来自收件箱'
				}, {
					value: '选项2',
					label: '来自发件箱'
				}],
				value5: '',

				tableData2: [{
					title: '',
					qbsjr: '',
					jb: '',
					fj: '',
					fsr: '',
					date: '',
					ms: ''
				}],

				options6: [{
					value: '选项1',
					label: '全部邮件'
				}, {
					value: '选项2',
					label: '重要邮件'
				}, {
					value: '选项3',
					label: '普通邮件'
				}],
				value6: '',

				options7: [{
					value: '选项1',
					label: '标题'
				}, {
					value: '选项2',
					label: '接收人'
				}],
				value7: '',
				input3: ref(''),

				tableData3: [{
					title: '顶',
					jsr: '顶顶',
					jb: '顶顶顶',
					fj: '顶顶顶顶',
					date: '顶顶顶顶顶',
					ms: '顶顶顶顶顶顶'
				}, {
					title: '顶',
					jsr: '顶顶',
					jb: '顶顶顶',
					fj: '顶顶顶顶',
					date: '顶顶顶顶顶',
					ms: '顶顶顶顶顶顶'
				}, {
					title: '顶',
					jsr: '顶顶',
					jb: '顶顶顶',
					fj: '顶顶顶顶',
					date: '顶顶顶顶顶',
					ms: '顶顶顶顶顶顶'
				}, {
					title: '顶',
					jsr: '顶顶',
					jb: '顶顶顶',
					fj: '顶顶顶顶',
					date: '顶顶顶顶顶',
					ms: '顶顶顶顶顶顶'
				}, {
					title: '顶',
					jsr: '顶顶',
					jb: '顶顶顶',
					fj: '顶顶顶顶',
					date: '顶顶顶顶顶',
					ms: '顶顶顶顶顶顶'
				}],

				input4: ref(''),
				select: ref(''),
				textarea: ref(''),
				
				options8: [{
					value: '选项1',
					label: '重要'
				}, {
					value: '选项2',
					label: '普通'
				}],
				value8: '',
				
				checked1: false,
				checked2: false,
				
				input4: ref(''),
			};
		},
	};
</script>

<style>
</style>
