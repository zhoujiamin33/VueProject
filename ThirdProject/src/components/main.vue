<template>
	<!-- 第一排div -->
	<div style="display: flex; flex-direction: row;">
		<div class="userdiv">
			<span>总用户</span>
			<h1 style="font-size:30px;color:#169f1d">99</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032229.png" style="width:302px;height:120px" alt="" /> -->
		</div>
		<div class="userdiv">
			<span>优秀率</span>
			<h1 style="font-size:30px;color:#169f1d">99%</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032223.png" style="width:302px;height:120px" alt=""/> -->
		</div>
		<div class="userdiv">
			<span>学员人数</span>
			<h1 style="font-size:30px;color:#169f1d">1026</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032223.png" style="width:302px;height:120px" alt=""/> -->
		</div>
		<div class="userdiv">
			<span>咨询数</span>
			<h1 style="font-size:30px;color:#169f1d">1024</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032223.png" style="width:302px;height:120px" alt=""/> -->
		</div>
		<div class="userdiv">
			<span>回访次数</span>
			<h1 style="font-size:30px;color:#169f1d">999</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032229.png" style="width:302px;height:120px" alt="" /> -->
		</div>
		<div class="userdiv">
			<span>FAQ问答</span>
			<h1 style="font-size:30px;color:#169f1d">90</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032223.png" style="width:302px;height:120px" alt=""/> -->
		</div>
		<div class="userdiv">
			<span>报班率</span>
			<h1 style="font-size:30px;color:#169f1d">99%</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032223.png" style="width:302px;height:120px" alt=""/> -->
		</div>
		<div class="userdiv">
			<span>平均收入</span>
			<h1 style="font-size:30px;color:#169f1d">10240</h1>
			<!-- <img src="file:///D:/git/github/VueProject/ThirdProject/public/20210701032223.png" style="width:302px;height:120px" alt=""/> -->
		</div>
	</div>
	<!-- 第二排个人办公div -->
	<div class="userinfo">
		<div class="imgdiv">
			<!-- <imgdiv -->
			<el-avatar style="margin-top: 10px;margin-left:10px;" src="../public/avatar.jpeg"></el-avatar>
		</div>
		<div class="basicdiv">
			<p>欢迎您</p>
			<p>{{this.$store.state.updateUserInfo.username}}</p>
			
			<!-- <p>财务部会计</p> -->
		</div>
		<div class="shoushou">
			<h1 style="margin-left:-85px">Hi 愉快的一天又开始了 开启一天的工作吧...</h1>
			<hr/>
			<h1 style="margin-left:-385px">待办事项</h1>
			<span style="margin-left:-385px">1.巡班</span><p></p>
			<span style="margin-left:-352px">2.每日交接</span>
		</div>
		<div class="memorandum">
			<h1>备忘录</h1>
		</div>
	</div>
	<!-- 第三排：规章制度、公告、意见 -->
	<div style="display: flex; flex-direction: row;">
		<!-- 规章制度-->
		<div class="rulesdiv">
			<div>
				<div style="text-align: left;">
					<el-table ref="multipleTable" :data="System" height="230" tooltip-effect="dark">
						<el-table-column label="规章制度" width="410">
							<template #default="scope"><a href="#" @click="showEdit1(scope.row)">{{ scope.row.systemTheme }}</a></template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
		<el-dialog title="规章制度详细" v-model="dialogFormVisible2" :close-on-click-modal="false">
			<!-- :inline="true" -->
			<el-form :model="form2" :rules="forRules" ref="form2">
				<el-form-item prop="systemtypeId">
					规章类型：
					<el-input style="width: 100%;" v-model="form2.systemtype.systemtypeName" disabled></el-input>
				</el-form-item>
				<el-form-item prop="systemTheme">
					规章主题：
					<el-input style="width: 100%;" v-model="form2.systemTheme" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item>
					规章内容：
					<el-input v-model="form2.systemContent" type="textarea" rows="10" disabled></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 公告 -->
		<div class="noticediv">
			<div>
				<el-table ref="multipleTable" :data="tableData" height="230" tooltip-effect="dark">
					<el-table-column label="公告通知" width="410">
						<template #default="scope"><a href="#" @click="showEdit2(scope.row)">{{ scope.row.announcementTheme }}</a></template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-dialog title="公告详情" v-model="dialogFormVisible3" :close-on-click-modal="false">
			<!-- :inline="true" -->
			<el-form :model="form1" :rules="forRules2" ref="form1">
				<el-form-item prop="announcementtypeId">
					公告类型
					<el-input v-model="form1.AnnType" style="width: 100%;" disabled></el-input>
				</el-form-item>
				<el-form-item  prop="announcementTheme">
					公告主题
					<el-input style="width: 100%;" v-model="form1.announcementTheme" autocomplete="off" disabled></el-input>
				</el-form-item>
				<el-form-item>
					结束开始时间
					<div>
						<el-input v-model="form1.startTime" disabled></el-input>
						--
						<el-input v-model="form1.endTime" disabled></el-input>
					</div>
				</el-form-item>
				<el-form-item>
					公告内容
					<el-input v-model="form1.announcementContent" type="textarea" rows="15" disabled></el-input>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 意见 -->
		<div class="suggestdiv">
			<div>
				<h3>意见</h3>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'main',
		data() {
			return {
				// userImg: require('../public/20210701032229.png'),
				dialogFormVisible2: false,
				dialogFormVisible3: false,
				System: [],
				tableData: [],
				AnnType:[],
				form2: {
					systemId: '',
					systemtypeId: '',
					systemTheme: '',
					deptId: '',
					systemContent: "",
					systemState: '',
					addname: '',
					addtime: '',
					publishname: '',
					publishtime: '',
					suspendname: '',
					suspendtime: '',
					updatename: '',
					updatetime: '',
					deletename: '',
					deletetime: '',
					timeliness: '',
					systemtype: [],
					emps: [],
					names: ''
				},
				form1: {
					announcementId: '',
					announcementtypeId: '',
					startTime: '',
					endTime: '',
					announcementTheme: '',
					announcementContent: '',
					announcementState: '',
					addname: '',
					addtime: '',
					publishname: '',
					publishtime: '',
					suspendname: '',
					suspendtime: '',
					updatename: '',
					updatetime: '',
					deletename: '',
					deletetime: '',
					AnnType:''
				},
			}
		},
		methods: {
			showEdit1(row) {
				console.log(row)
				this.form2 = {}
				this.form2.systemId = row.systemId
				this.form2.systemTheme = row.systemTheme
				this.form2.deptId = row.deptId
				this.form2.systemContent = row.systemContent
				this.form2.systemtypeId = row.systemtypeId
				this.form2.names = row.names
				this.form2.systemtype = row.systemtype
				this.form2.emps = row.emps
				this.dialogFormVisible2 = true
			},
			showEdit2(row) {
				console.log(row)
				this.form1.announcementId = row.announcementId
				this.form1.announcementtypeId = row.announcementtypeId
				this.form1.announcementTheme = row.announcementTheme
				this.form1.startTime = row.startTime
				this.form1.endTime = row.endTime
				this.form1.announcementContent = row.announcementContent
				this.form1.updatename = this.$store.state.updateUserInfo.username
				this.AnnType.forEach(item=>{
					if(item.announcementtypeId===this.form1.announcementtypeId){
						this.form1.AnnType=item.announcementtypeName
				 	}
				})
				this.dialogFormVisible3 = true
			},
		},
		created() {
			const _this = this
			var id = this.$store.state.updateUserInfo.id
			this.axios.get("http://localhost:8089/threeproject/findIdSystem?id=" + id, {
				headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
				}
			})
			.then(function(response) {
				_this.System = response.data
				console.log(response)
			}).catch(function(error) {
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/findIdAnn?id=" + id, {
				headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
				}
			})
			.then(function(response) {
				_this.tableData = response.data
				console.log(response)
			}).catch(function(error) {
				console.log(error)
			}),
			this.axios.get("http://localhost:8089/threeproject/findAnnType",{
				headers: {
					'content-type': 'application/json',
					'jwtAuth': this.$store.getters.token
				}
			}).then(function(response) {
				_this.AnnType = response.data
				console.log(response)
			}).catch(function(error) {
				console.log(error)
			})
		}
	}
</script>

<style>
	.noticediv {
		width: 411px;
		/* border: #FFFFFF solid 1px; */
		height: 230px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #f5f5f5;
		border: #333333 solid 2px;
	}

	.rulesdiv {
		width: 411px;
		/* border: #FFFFFF solid 1px; */
		height: 230px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #f5f5f5;
		border: #333333 solid 2px;
	}

	.suggestdiv {
		width: 411px;
		/* border: #FFFFFF solid 1px; */
		height: 230px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #ffffff;
		border: #333333 solid 2px;
	}

	.basicdiv {
		/* border: #303133 solid 1px; */
		width: 100px;
		height: 80px;
		padding-top: 5px;
		margin-left: 20px;
	}

	.imgdiv {
		/* border: #303133 solid 1px; */
		width: 100px;
		height: 90px;
		padding-top: 20px;
		margin-left: 20px;
		border-radius: 100%;
	}

	.userinfo {
		width: 98%;
		/* border: #FFFFFF solid 1px; */
		height: 200px;
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
		background-color: #f8f8f8;
	}

	.userdiv {
		width: 150px;
		/* border: #000000 solid 2px; */
		height: 90px;
		/* line-height:30px; */
		margin-top: 20px;
		margin-left: 20px;
		background-color:#f8f8f8;
	}
	.shoushou{
		/* border: #aaaaff solid 1px; */
		width: 40%;
		height: 200px;
		margin-top: -200px;
		margin-left:200px;
	}
	/* 我的备忘录 */
	.memorandum {
		border: #aaaaff solid 1px;
		width: 40%;
		height: 200px;
		margin-top: -215px;
		margin-left: 750px;
	}
</style>
