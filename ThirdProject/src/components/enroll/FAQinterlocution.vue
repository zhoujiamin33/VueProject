<template>
	<div>
		<div class="mianboby">
			<div class="mianwbk" style="margin-left: 200px;">
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
						<el-form-item prop="theoryCenterId" :required="true" label="FAQ问题:"
							:label-width="formLabelWidth">
							<el-input v-model="form.faqwt" autocomplete="off"></el-input>
						</el-form-item>
						<el-input
						  type="textarea"
						  :rows="2"
						  placeholder="请输入内容"
						  v-model="textarea">
						</el-input>
					</el-form>
					<template #footer>
						<span class="dialog-footer">
							<el-button type="primary" @click="dialogFormVisible = false">新建并保存</el-button>
							<el-button @click="dialogFormVisible = false">取 消</el-button>
						</span>
					</template>
				</el-dialog>
			
				<el-popconfirm
				  title="这是一段内容确定删除吗？"
				>
				<template #reference>
				  <el-button style="margin-left: 10px;">删除</el-button>
				  </template>
				</el-popconfirm>
				
			</div>
		</div>
		<div>
	
			<el-collapse v-model="activeNames" @change="handleChange" style="margin-left: 200px;">
			  <el-collapse-item title="一致性 Consistency" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			  <el-collapse-item title="反馈 Feedback" name="2">
			    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
			    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
			  </el-collapse-item>
			  <el-collapse-item title="效率 Efficiency" name="3">
			    <div>简化流程：设计简洁直观的操作流程；</div>
			    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
			    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
			  </el-collapse-item>
			  <el-collapse-item title="可控 Controllability" name="4">
			    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
			    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
			  </el-collapse-item>
			</el-collapse>
		</div>

	</div>
</template>

<script>

	import { defineComponent, ref } from 'vue'
	export default {
		setup() {
			return {
				input: ref(''),
				 textarea: ref('')
			}
		},
		data() {
			return {
				kssy: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],	
				value: '',
				activeNames: ['1'],
				 dialogFormVisible: false,
				 form: {
				           faqwt: ''
				         },
				         formLabelWidth: '120px'
			};
		},
		methods: {
			handleChange(val) {
				console.log(val);
			}
		}
	}
</script>

<style>
	.mianboby {
		display: flex;
		justify-content: space-between;

	}
</style>
