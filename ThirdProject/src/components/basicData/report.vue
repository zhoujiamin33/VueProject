
<template>
	<div class="map" style="display: flex; justify-content: space-between;">
		<div ref="chart" style="width: 600px; height: 400px;"></div>
		<div ref="chart1" style="width: 600px; height: 400px;"></div>
	</div>

</template>
<script>
	import * as echarts from 'echarts';
	export default {
		name:"report",
		data(){
			return{
				ConsultationmodeData:[],
				totals:[],
				Consultationmods:[]
			}
		},
		methods: {
			initChart(container, option) {
				const myChart = echarts.init(container);
				myChart.setOption(option);
			},
			myEcharts(){
				
				let option = {
					title: {
						text: '学员咨询方式统计'
					},
					tooltip: {},
					xAxis: {
						data: [this.Consultationmods[0],this.Consultationmods[1],this.Consultationmods[1],]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [this.totals[0], this.totals[1], this.totals[2]]
					}]
				}
				this.initChart(this.$refs.chart, option)
				// for (var i = 0; i < this.Consultationmode.length; i++) {
        
				// _this.option.xAxis.data.push(newOut)
				// }
				let option1 = {
					tooltip: {},
					xAxis: {
						type: 'category',
						data: []
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [this.totals[0], this.totals[1], this.totals[2]],
						type: 'line'
					}]
				}
				
				this.initChart(this.$refs.chart1, option1)
			},
			sum(){
				const _this = this
				this.axios.get("http://localhost:8089/threeproject/ConsultationmodeStatistics",{headers: {
					'content-type': 'application/json',
					'jwtAuth': _this.$store.getters.token
					}
				})
					.then(function(response) {
						_this.ConsultationmodeData=response.data.data;
						console.log(response+"==================")
						console.log(response.data.data)
						console.log(_this.ConsultationmodeData);
						_this.ConsultationmodeData.forEach((item)=>{
							_this.totals.push(item.total)
							_this.Consultationmods.push(item.Consultationmode)
						})
						console.log(_this.totals)
						console.log(_this.Consultationmods)
						_this.myEcharts()
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		mounted() {
			this.sum()
		},
		created() {
					
		}

	};
</script>


<!-- <template>
  <ve-histogram :data="chartData" :title="chartTitle" :settings="chartSettings" :extend="extend"></ve-histogram>
</template>
<script>
const axios = require("axios");
import "echarts/lib/component/title";

export default {
  data () {
    this.chartSettings = {
      yAxisType: ['KMB'],
      yAxisName: ['销量/万'],
    },
      this.extend = {
        barWidth: 25,//设置宽度为15px
        // x轴的文字倾斜
        'xAxis.0.axisLabel.rotate': 45,
        'xAxis.0.axisLabel.fontSize': 20,//x轴文本字体大小
        'xAxis.0.axisLabel.fontWeight': 'bold',//x轴文本字体粗细
        series: {
          label: { show: true, position: "top" },
          color: function (value) { return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6); }
        }
      },
      this.chartTitle = {
        // 文字啥的，用\n可以换行
        text: '2019各大手机品牌销量',
        x: '25px',
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
        }
      }
    return {
      chartData: {
        columns: ['name', 'num'],
        rows: []
      }
    }
  },
  created: function () {
    var app = this;
    console.log("init");
    this.init()
  },
  methods: {
    init: function () {
      var app = this;
      axios
        .get("http://localhost:8888/phone")
        .then(function (response) {
          app.chartData.rows = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  }
}

</script> -->
<style>

</style>
