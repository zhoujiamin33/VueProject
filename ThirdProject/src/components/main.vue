<template>
	<!-- 第一排div -->
	<div style="display: flex; flex-direction: row;">
		<div class="userdiv">
			<i class="icon ivu-icon ivu-icon-md-person-add"></i>
			用户管理
		</div>
		<div class="userdiv">
			<i class="icon ivu-icon ivu-icon-md-person-add"></i>
		</div>
		<div class="userdiv">
			<i class="icon ivu-icon ivu-icon-md-person-add"></i>
		</div>
		<div class="userdiv">
			<i class="icon ivu-icon ivu-icon-md-person-add"></i>
		</div>
	</div>
	<!-- 第二排个人办公div -->
	<div class="userinfo">
		<div class="imgdiv"></div>
		<div class="basicdiv">
			<p>{{this.$store.state.updateUserInfo.username}}</p>
			<p>财务部会计</p>
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
				<h3>规章制度</h3>
			</div>
		</div>
		<!-- 公告 -->
		<div class="noticediv">
			<div>
				<h3>公告</h3>
			</div>
		</div>
		<!-- 意见 -->
		<div class="suggestdiv">
			<div>
				<h3>意见</h3>
			</div>
		</div>
	</div>	
</template>

<script>
</script>

<style>
	.noticediv{
		width:411px;
		/* border: #FFFFFF solid 1px; */
		height:230px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #f5f5f5;
		border: #333333 solid 2px;
	}
	.rulesdiv{
		width:411px;
		/* border: #FFFFFF solid 1px; */
		height:230px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #f5f5f5;
		border: #333333 solid 2px;
	}
	.suggestdiv{
		width:411px;
		/* border: #FFFFFF solid 1px; */
		height:230px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #f5f5f5;
		border: #333333 solid 2px;
	}
	.basicdiv{
		border: #303133 solid 1px;
		width: 100px;
		height:80px;
		padding-top:5px;
		margin-left: 20px;
	}
	.imgdiv{
		border: #303133 solid 1px;
		width: 100px;
		height:90px;
		padding-top: 20px;
		margin-left: 20px;
		border-radius:100%;
	}
	.userinfo{
		width:98%;
		/* border: #FFFFFF solid 1px; */
		height: 200px;
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
		background-color:#f5f5f5;
	}
	.userdiv{
		width:302px; 
		/* border: #FFFFFF solid 1px; */
		height: 120px;
		margin-top: 20px;
		margin-left: 20px;
		background-color: #f5f5f5;
	}
	/* 我的备忘录 */
	.memorandum{
		border: #aaaaff solid 1px ;
		width:40%;
		height: 200px;
		margin-top: -200px;
		margin-left:750px;
	}
</style>
