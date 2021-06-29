<template>
	<div>
		<div>
			<b style="font-size: 13px;font-weight: 100;margin-left: -8220px;">快速检索：</b>
			<el-select v-model="value" placeholder="请选择" size="mini" style="width: 85px;margin-left: 3px;">
			<b style="font-size: 13px;font-weight: 100;margin-left: -1020px;">快速检索：</b>
			<el-select v-model="value" size="mini" style="width: 85px;margin-left: 3px;">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-select v-model="value1" size="mini" style="width: 85px;margin-left: 4px;">
				<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-button type="info" plain size="mini" style="color: #000000;margin-left: 5px;">查询</el-button>
		</div>
		<div>
			<!-- <el-calendar>
				<template #dateCell="{data}">
					<p @click="xinzeng=true" :class="data.isSelected ? 'is-selected' : ''">
						{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
					</p>
				</template>
			</el-calendar> -->
			
			
			<div>
			    <el-calendar id="calendar" v-model="value">
			      <template
			        slot="dateCell"
			        slot-scope="{date, data}"
			      >
			        <div>
			          <div class="data.isSelected ? 'is-selected' : ''" @click="handleAddClick(data.day)">{{ data.day.split('-').slice(2).join('-') }}</div>
			          <div v-for="item in Calendar">
			            <div v-if="(item.EventTime.slice(0,4)).indexOf(data.day.slice(0,4))!=-1">
			              <div v-if="(item.EventTime.split('-').slice(1)[0]).indexOf(data.day.split('-').slice(1)[0])!=-1">
			                <div v-if="(item.EventTime.split('-').slice(2).join('-').slice(0,2)).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
			                  <!-- <el-tooltip class="item" effect="dark" :content="item.EventTitle" placement="right"> -->
			                  <div class="fc-day-grid-event">
			                    <div v-if="(item.EventType==='1')" id="fc-eventone" @click="handleEventClick(item.id)">{{ item.EventTitle }}</div>
			                    <div v-if="(item.EventType==='2')" id="fc-eventtwo" @click="handleEventClick(item.id)">{{ item.EventTitle }}</div>
			                  </div>
			                  <!-- </el-tooltip> -->
			                </div>
			                <div v-else />
			              </div>
			              <div v-else />
			            </div>
			            <div v-else />
			          </div>
			        </div>
			      </template>
			    </el-calendar>
			 
			    <el-dialog :title="optTitle" :visible.sync="dialogFormVisible">
			      
			        <el-button v-if="form.id" type="warning" style="float: left;" @click="delEvent">删 除</el-button>
			        <el-button style="float: rihgt;" @click="dialogFormVisible = false">取 消</el-button>
			        <el-button type="primary" @click="saveEvent">确 定</el-button>
			      </el-form>
			    </el-dialog>
			 
			  </div>
			
			
			
			<el-dialog title="新建内容" v-model="xinzeng">
				<el-form :model="form">
					<div style="margin-top: -30px;margin-left: -422px;">
						<el-button type="primary" size="mini" icon="el-icon-document-checked" @click="addMemorandum">保存并新建</el-button>
						<el-button type="primary" size="mini" icon="el-icon-s-fold" @click="xinzeng = false">返回</el-button>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">主题：</b>
						<el-input v-model="form.memorandumTitle" size="mini" style="width: 660px;margin-top: 8px;">
						</el-input>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">类型：</b>
						<el-select v-model="form.memorandumType" placeholder="请选择" size="mini" style="width: 660px;margin-top: 8px;">
							<el-option label="任务" value="任务"></el-option>
							<el-option label="约会" value="约会"></el-option>
							<el-option label="来访" value="来访"></el-option>
							<el-option label="会议" value="会议"></el-option>
							<el-option label="电话" value="电话"></el-option>
							<el-option label="假期" value="假期"></el-option>
							<el-option label="外出" value="外出"></el-option>
							<el-option label="走访" value="走访"></el-option>
							<el-option label="出差" value="出差"></el-option>
						</el-select>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -10px;">开始时间：</b>
						<el-date-picker v-model="form.starttime" type="datetime" size="mini" style="width: 300px;margin-top: 8px;">
						</el-date-picker>

						<b style="font-size: 13px;font-weight: 100;margin-left: 2px;">结束时间：</b>
						<el-date-picker v-model="form.endtime" size="mini" type="datetime" style="width: 290px;">
						</el-date-picker>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: 20px;">内容：</b>
						<el-input type="textarea" size="mini" :rows="2" v-model="form.memorandumName" style="width: 660px;margin-top: 12px;">
						</el-input>
					</div>
					<!-- 					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -6px;">预约人员：</b>
						<el-input type="textarea" size="mini" :rows="2" placeholder="请输入内容" v-model="textarea" style="width: 660px;margin-top: 12px;">
						</el-input>
					</div> -->
					<!-- <div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -498px;">提醒方式：</b>
						<el-checkbox v-model="checked" style="margin-left: 3px;margin-top: 12px;">站内消息通知预约人员</el-checkbox>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -136px;">重复周期：</b>
						<el-checkbox v-model="checked1" style="margin-left: 3px;margin-top: 12px;">间隔时间</el-checkbox>
						<el-select v-model="value5" disabled size="mini" style="margin-left: 3px;">
							<el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
						<b style="font-size: 13px;font-weight: 100;margin-left: 6px;">终止日期：</b>
						<el-date-picker disabled size="mini" v-model="value6" type="date" placeholder="选择日期" style="width: 180px;margin-top: 12px;">
						</el-date-picker>
					</div>
					<div>
						<b style="font-size: 13px;font-weight: 100;margin-left: -236px;">是否提醒：</b>
						<el-checkbox v-model="checked2" style="margin-left: 3px;margin-top: 12px;">提醒天数</el-checkbox>
						<el-input-number disabled v-model="num" controls-position="right" @change="handleChange" :min="0" size="mini"
						 style="margin-left: -27px;width: 193px;"></el-input-number>
						<b style="font-size: 13px;font-weight: 100;margin-left: 6px;">事件性质：</b>
						<el-checkbox v-model="checked3" style="margin-left: 3px;margin-top: 12px;">私人事情</el-checkbox>
					</div> -->
				</el-form>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref
	} from 'vue'
	export default {
		name: "Memorandum",
		components: {
		 
		  },
		data() {
			return {
				Calendar: [],
				      form: {
				        id: null,
				        EventTitle: null,
				        EventTime: null,
				      },
				      calendarEvents: [],
				      dialogFormVisible: false,
				      optTitle: '添加事件',
				      loading: false,
				      value: new Date()
				      }
				//valueDate: new Date(),
			// 	shortcuts: [{
			// 		text: '今天',
			// 		value: new Date(),
			// 	}, {
			// 		text: '昨天',
			// 		value: (() => {
			// 			const date = new Date();
			// 			date.setTime(date.getTime() - 3600 * 1000 * 24);
			// 			return date
			// 		})(),
			// 	}, {
			// 		text: '一周前',
			// 		value: (() => {
			// 			const date = new Date();
			// 			date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
			// 			return date
			// 		})(),
			// 	}],
			// 	tableData:[],
				
			// 	num: 0,
			// 	options: [{
			// 		value: '选项1',
			// 		label: '2021'
			// 	}, {
			// 		value: '选项2',
			// 		label: '2022'
			// 	}, {
			// 		value: '选项3',
			// 		label: '2023'
			// 	}, {
			// 		value: '选项4',
			// 		label: '2024'
			// 	}, {
			// 		value: '选项5',
			// 		label: '2025'
			// 	}, {
			// 		value: '选项6',
			// 		label: '2026'
			// 	}, {
			// 		value: '选项7',
			// 		label: '2027'
			// 	}],
			// 	value: '',

			// 	options1: [{
			// 		value: '选项1',
			// 		label: '01月'
			// 	}, {
			// 		value: '选项2',
			// 		label: '02月'
			// 	}, {
			// 		value: '选项3',
			// 		label: '03月'
			// 	}, {
			// 		value: '选项4',
			// 		label: '04月'
			// 	}, {
			// 		value: '选项5',
			// 		label: '05月'
			// 	}, {
			// 		value: '选项6',
			// 		label: '06月'
			// 	}, {
			// 		value: '选项7',
			// 		label: '07月'
			// 	}, {
			// 		value: '选项8',
			// 		label: '08月'
			// 	}, {
			// 		value: '选项9',
			// 		label: '09月'
			// 	}, {
			// 		value: '选项10',
			// 		label: '10月'
			// 	}, {
			// 		value: '选项11',
			// 		label: '11月'
			// 	}, {
			// 		value: '选项12',
			// 		label: '12月'
			// 	}],
			// 	value1: '',

			// 	xinzeng: false,
			// 	form: {
			// 		memorandumId: "",
			// 		memorandumTitle: "",
			// 		memorandumName: "",
			// 		memorandumType: "",
			// 		starttime: "",
			// 		endtime: ""
			// 	},

				
			// 	value2: '',

			// 	value3: '',
			// 	value4: '',
			// 	value7: '',
			// 	value8: '',

			// 	textarea: ref(''),
			// 	input: ref(''),
			// 	textarea1: ref(''),


			// 	options5: [{
			// 		value: '选项1',
			// 		label: '每日'
			// 	}, {
			// 		value: '选项2',
			// 		label: '每周'
			// 	}, {
			// 		value: '选项3',
			// 		label: '每月'
			// 	}, {
			// 		value: '选项4',
			// 		label: '每年'
			// 	}, {
			// 		value: '选项5',
			// 		label: '隔周'
			// 	}, {
			// 		value: '选项6',
			// 		label: '隔月'
			// 	}],
			// 	value5: '',

			// 	value6: '',

			// 	checked: false,
			// 	checked1: false,
			// 	checked2: false,
			// 	checked3: false,
			// }
		},
		
		methods: {
			mounted() {
			    this.loading = true;
			   const params = {
			               //查询条件
			            };
			    GetCalendar(params).then(result => {//GetCalendar(params)后台返回的数据
			      this.Calendar = result.Calendar;
			    });
			    },
			    methods: {
			    ToDate(tim) {//时间处理
			      const d = new Date(tim)
			      d.setHours(0, 0, 0, 0);
			      return tim = d.setHours(0, 0, 0, 0)
			    },
			     load() {
			        //刷新数据的方法，重新查询一遍数据也可
			     },
			      // 新增
			    handleAddClick(date) {
			        this.dialogFormVisible = true
			        this.optTitle = '新增事件';
			        this.form.id = '';
			        //加入需要在弹窗新增的
			 
			    },
			    handleEventClick(info) {
			        this.dialogFormVisible = true;
			        this.optTitle = '修改事件';
			        const params = {
			          id: info
			            };
			        GetCalendar(params)
			            .then(result => { 
			        this.form = {
			        id: result.Calendar[0].id,
			      //加上相应的弹窗值，
			        };
			     });
			    },
			    // 保存事件
			    saveEvent() {
			      const _form = this.form;
			      SaveCalendar(_form).then(result => {
			                if (result.status.result === true) {
			                    if (this.form.id === undefined || this.form.id === '') { // 新增
			                        this.$message({
			                            message: '新增成功！',
			                            type: 'success'
			                        });
			                    } else {//修改
			                        this.$message({
			                            message: '修改成功！',
			                            type: 'success'
			                        });
			                    }
			                    this.dialogFormVisible = false;
			                    this.load()
			                } else {
			                    this.$message({
			                        message: result.message + '失败',
			                        type: 'error'
			                    });
			            }
			        });
			    },
			    // 删除事件
			    delEvent() {
			      const _form = this.form;
			      SaveCalendar(_form).then(result => { //SaveCalendar(_form)后台存数据
			        if (result.status.result === true) {
			           this.load()
			          this.dialogFormVisible = false;
			                    this.$message({
			                        message: '删除成功！',
			                        type: 'success'
			                        });
			 
			                    // location.reload()
			                } else {
			                    this.$message({
			                        message: result.message + '删除失败',
			                        type: 'error'
			                    });
			                }
			            });
			        }
			  },
			
			
			
			
			
			//提醒天数
			handleChange(value) {
				console.log(value);
			},
			
			//增加
			addMemorandum() {
				const _this = this
				this.axios.post("http://localhost:8089/threeproject/addMemorandum", this.form)
					.then(function(response) {
						_this.tableData = response.data.list
						_this.xinzeng=false
						for (var key in _this.form) {
							delete _this.form[key]
						}
					}).catch(function(error) {
						console.log(error)
					})
			},
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8089/threeproject/findMemorandum",this.form)
			.then(function(response){
				console.log(response)
				_this.tableData=response.data.list
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>
	.is-selected {
		color: #1989FA;
	}
</style>
