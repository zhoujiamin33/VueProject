<template>
	<el-button style="margin-bottom: 30px;" @click="updateDept">保存</el-button>
	<el-form ref="form" :model="form" label-width="90px" style="display: contents;">
		<el-form-item label="企业编码:" >
			<el-input v-model="form.enterpriseId" disabled></el-input>
		</el-form-item>
		<el-form-item label="企业品牌:" required>
			<el-input v-model="form.enclosureBrand"></el-input>
		</el-form-item>
		<el-form-item label="企业全称:" required>
			<el-input v-model="form.enterpriseName"></el-input>
		</el-form-item>
		<el-form-item label="企业简称:" required>
			<el-input v-model="form.enterpriseShortname"></el-input>
		</el-form-item>
		<el-form-item label="英文名称:">
			<el-input v-model="form.enterpriseEnglishname"></el-input>
		</el-form-item>
		<el-form-item label="企业类型:">
			<el-input v-model="form.companytype"></el-input>
		</el-form-item>
		<el-form-item label="所属行业:">
			<el-input v-model="form.industry"></el-input>
		</el-form-item>
		<el-form-item label="公司地址:">
			<el-input v-model="form.companyaddress"></el-input>
		</el-form-item>
		<el-form-item label="邮政编码:">
			<el-input v-model="form.postalcode"></el-input>
		</el-form-item>
		<el-form-item label="公司电话:">
			<el-input v-model="form.companyphone"></el-input>
		</el-form-item>
		<el-form-item label="传真号码:">
			<el-input v-model="form.faxphone"></el-input>
		</el-form-item>
		<el-form-item label="公司网站:">
			<el-input v-model="form.comanyweb"></el-input>
		</el-form-item>
		<el-form-item label="电子邮件:">
			<el-input v-model="form.eMail"></el-input>
		</el-form-item>
		<el-form-item label="法人代表:">
			<el-input v-model="form.representative"></el-input>
		</el-form-item>
		<!-- <el-form-item label="注册时间:">
			<el-date-picker type="date" placeholder="选择日期" v-model="form.registertime" style="width: 100%;"></el-date-picker>
		</el-form-item> -->
		<el-form-item label="注册资金:">
			<el-input v-model="form.registermoney"></el-input>
		</el-form-item>
		<el-form-item label="员工人数:">
			<el-input v-model="form.empnumber"></el-input>
		</el-form-item>
		<el-form-item label="开户银行:">
			<el-input v-model="form.depositBank"></el-input>
		</el-form-item>
		<el-form-item label="银行账号:">
			<el-input v-model="form.bankNumber"></el-input>
		</el-form-item>
		<el-form-item label="企业简介:">
			<el-input v-model="form.enterpriseBrief"></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					enterpriseId: '',
					enclosureBrand: '',
					enterpriseName: '',
					enterpriseShortname: '',
					enterpriseEnglishname: '',
					companytype: '',
					industry: '',
					companyaddress: '',
					postalcode: '',
					companyphone: '',
					faxphone: '',
					comanyweb: '',
					eMail: '',
					representative: '',
					// registertime:'',
					registermoney: '',
					empnumber: '',
					depositBank: '',
					bankNumber: '',
					enterpriseBrief: ''
				}
			}
		},
		methods: {
			// onSubmit() {
			// 	console.log('submit!');
			// },
			updateDept() {
				const _this = this
				this.axios.put("http://localhost:8089/threeproject/enterprise", this.form,
				{
				headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
				}
				})
					.then(function(response) {
						_this.$notify({
						        title: '成功',
						        message: '修改一条成功',
						        type: 'success'
						      });
						console.log(response)
						_this.showenterprise()
					
					}).catch(function(error) {
						console.log(error)
					})
			},
			showenterprise(){
				const _this = this;
							console.log(_this.$store.getters.token)
				this.axios.get("http://localhost:8089/threeproject/findenterprise", {
					headers: {
						'content-type': 'application/json',
						'jwtAuth': _this.$store.getters.token
					}
				}).then(function(response) {
					_this.form = response.data.data
					console.log(response)
				}).catch(function(error) {
					console.log(error)
				})
			}
		},
		created() {
		
			console.log("----------------------------------")
			this.showenterprise()
						
				
		}
	}
</script>

<style>

</style>
