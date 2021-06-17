<template>
		<div style="width:100%;height:200px;border: #2C3E50 solid 1px;">
			<p style="display: flex;justify-content: start;margin-left:20px">排课:</p>
			<div>
				<el-select v-model="form.classes" filterable placeholder="请选择排课班级" style="margin-right:950px" @change="selectClassesdetails(form.classes)">
				    <el-option  v-for="classes in classesdata" :label="classes.classesName" :value="classes.classesId"></el-option>
				</el-select>
				
				<el-select v-model="form.period" filterable placeholder="请选择时段" style="margin-right:950px">
				    <el-option  v-for="item in Trainingperiods" :label="item.period" :value="item.periodId"></el-option>
				</el-select>
			</div>
		</div>
</template>

<script>
	export default  {
		name:"ClassScheduling",
		data(){
			return{
				form:{
					class:"",
					value:[],
					classes:""
				},
				//所有课段
				Trainingperiods:[],
				classesdata:[],
				DetailCourse:[]
			}
		},
		methods:{
			//根据班级id查询班级详细课程进度
			selectClassesdetails(){
				const _this=this
				this.axios.get("http://localhost:8089/threeproject/selectDetailCourse")
				.then(function(response){
					console.log(response)
					_this.DetailCourse=response.data
				}).catch(function(error){
					console.log(error)
				})
			}
		},
		created(){
			//查询所有课段
			const _this=this
			this.axios.get("http://localhost:8089/threeproject/findTrainingperiods")
			.then(function(response){
				_this.Trainingperiods=response.data
			}).catch(function(error){
				console.log(error)
			}),
			//查询所有已开班的班级
			this.axios.get("http://localhost:8089/threeproject/selectOpen")
			.then(function(response){
				_this.classesdata=response.data
			}).catch(function(error){
				console.log(error)
			})
		}
	}
</script>

<style>
	
</style>
