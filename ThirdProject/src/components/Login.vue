<template>
	<section class="VideoBg">
		<video autoplay playsinline loop :muted="muted" ref="video">
			<source src="./mp4/LogonBackground.mp4">
		</video>
		<div class="loginstyle">
			<p>卓越教育平台</p>
			<el-form ref="logfrom" :model="LogFrom">
				<el-form-item>
					<i class="el-icon-user"></i>
					<el-input v-model="LogFrom.username" placeholder="请输入用户名"
						:style="{border:NameBorder,BorderRadius:'4px'}" @blur="VerificationName"></el-input>
				</el-form-item>
				<el-form-item>
					<i class="el-icon-lock"></i>
					<el-input v-model="LogFrom.password" placeholder="请输密码"
						:style="{border:PwdBorder,BorderRadius:'4px'}" @blur="VerificationPwd" type="password">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-col>
						<i class="el-icon-bell"></i>
						<el-input v-model="LogFrom.code" :style="{border:CodeBorder,BorderRadius:'4px'}"
							@blur="VerificationCode" placeholder="请输验证码"></el-input>
						<span class="ValidCode " :style="`width:${width}; height:${height}; display:inline-block;`"
							@click="refreshCode">
							<span v-for="(item, index) in codeList" :key="index"
								:style="getStyle(item)">{{item.code}}</span>
						</span>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="primary">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</section>
</template>


<script>
	const modules =
		import.meta.glob('../components/**/*.vue');
	import {
		ElMessage
	} from 'element-plus'
	// import {rout} from '../router/index.js';
	export default {
		props: {
			muted: {
				type: Boolean,
				default: true
			},
			width: {
				type: String,
				default: '100px'
			},
			height: {
				type: String,
				default: '40px'
			},
			length: {
				type: Number,
				default: 4
			}
		},
		data() {
			return {
				videoRatio: null,
				codeList: [],
				LogFrom: {
					username: 'admin',
					password: '123456',
					code: ''
				},
				NameBorder: "transparent solid 1px",
				PwdBorder: "transparent solid 1px",
				CodeBorder: "transparent solid 1px"
			}
		},

		mounted() {
			this.setContainerHeight()
			this.createdCode()
			if (this.videoCanPlay()) {
				this.$refs.video.oncanplay = () => {
					if (!this.$refs.video) return

					this.videoRatio = this.$refs.video.videoWidth / this.$refs.video.videoHeight
					this.setVideoSize()
					this.$refs.video.style.visibility = 'visible'
				}
			}

			window.addEventListener('resize', this.resize)
		},

		beforeUnmount() {
			window.removeEventListener('resize', this.resize)
		},

		methods: {
			refreshCode() {
				this.createdCode()
			},
			createdCode() {
				let len = this.length,
					codeList = [],
					chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789',
					charsLen = chars.length
				// 生成
				for (let i = 0; i < len; i++) {
					let rgb = [Math.round(Math.random() * 220), Math.round(Math.random() * 240), Math.round(Math.random() *
						200)]
					codeList.push({
						code: chars.charAt(Math.floor(Math.random() * charsLen)),
						color: `rgb(${rgb})`,
						fontSize: `1${[Math.floor(Math.random() * 10)]}px`,
						padding: `${[Math.floor(Math.random() * 10)]}px`,
						transform: `rotate(${Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)}deg)`
					})
				}
				// 指向
				this.codeList = codeList
				// 将当前数据派发出去
				this.$emit('update:value', codeList.map(item => item.code).join(''))
			},
			getStyle(data) {
				return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
			},
			resize() {
				this.setContainerHeight()

				if (this.videoCanPlay()) {
					this.setVideoSize()
				}
			},

			videoCanPlay() {
				return !!this.$refs.video.canPlayType
			},

			setContainerHeight() {
				this.$el.style.height = `${window.innerHeight}px`
			},

			setVideoSize() {
				var width, height, containerRatio = this.$el.offsetWidth / this.$el.offsetHeight

				if (containerRatio > this.videoRatio) {
					width = this.$el.offsetWidth
				} else {
					height = this.$el.offsetHeight
				}

				this.$refs.video.style.width = width ? `${width}px` : 'auto'
				this.$refs.video.style.height = height ? `${height}px` : 'auto'
			},
			VerificationName() {
				if (this.LogFrom.username.length == 0) {
					this.NameBorder = "red solid 1px"
				} else {
					this.NameBorder = "transparent solid 1px"
				}
			},
			VerificationPwd() {
				if (this.LogFrom.password.length == 0) {
					this.PwdBorder = "red solid 1px"
				} else {
					this.PwdBorder = "transparent solid 1px"
				}
			},
			VerificationCode() {
				if (this.LogFrom.code.length == 0) {
					this.CodeBorder = "red solid 1px"
				} else {
					this.CodeBorder = "transparent solid 1px"
				}
			},
			primary() {
				const _this = this;
				 console.log(this.codeList[0].code + this.codeList[1].code + this.codeList[2].code + this.codeList[3].code)
				console.log(this.LogFrom.code)
				if (this.LogFrom.username.length != 0) {
					if (this.LogFrom.password.length != 0) {
						// if (this.LogFrom.code == (this.codeList[0].code + this.codeList[1].code + this.codeList[2].code +
						//  this.codeList[3].code)) {
						this.axios.post("http://localhost:8089/threeproject/login", this.LogFrom)
							.then(function(res) {
								console.log(res)
								_this.$store.commit("updateUserInfo", res.data.data)
								// sessionStorage.setItem("menulist",res.data.data.menus)
								for (var i = 0; i < _this.$store.state.updateUserInfo.menus.length; i++) {
									let chm =_this.$store.state.updateUserInfo.menus[i].asideChildren
										for (var k = 0; k < chm.length; k++) {
											if (chm[k].url != null)  {
												let cpath = '../components/' + chm[k].componentPath
												const rouc = {
													path: chm[k].url,
													name: chm[k].componentName,
													component: modules[`${cpath}`]
												}
												_this.$router.addRoute("HomeView", rouc)
											}
									}
								}
								
								_this.$router.push('subjectView')
							}).catch(function(err) {
								console.log(err)
							})
							
						// } else {
						// 	this.$alert('<strong>验证码错误！</strong>', '提示', {

						// 		dangerouslyUseHTMLString: true,
						// 	});
						// }
					} else {
						this.$alert('<strong>密码不能为空！</strong>', '提示', {
							dangerouslyUseHTMLString: true,
						});
					}
				} else {
					this.$alert('<strong>用户名不能为空！</strong>', '提示', {
						dangerouslyUseHTMLString: true,
					});
				}
			}
		}
	}
</script>


<style>
	html,
	body,
	#app {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.ValidCode {
		background: #B3C0D1;
	}

	.VideoBg {
		position: relative;
		background-size: cover;
		background-position: center;
		overflow: hidden;
	}

	.VideoBg video {
		position: absolute;
		top: 50%;
		left: 50%;
		visibility: hidden;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	.VideoBg__content {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.loginstyle {
		width: 400px;
		background: rgba(255, 255, 255, 0.3);
		border: #FFFFFF 1px solid;
		text-align: center;
		border-radius: 10px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.loginstyle p {
		font-size: 20px;
		margin-top: 12px;
		padding-bottom: 12px;
		color: #FFFFFF;
		border-bottom: #FFFFFF 1px solid;
	}

	.el-form .el-form-item .el-input {
		width: 300px;
	}

	.el-form .el-form-item .el-col .el-input {
		width: 150px;
	}

	.el-col {
		margin-left: 40px;
	}

	.el-form .el-form-item i {
		font-size: 20px;
		color: #DFE4ED;
		margin-right: 2px;
	}
</style>
