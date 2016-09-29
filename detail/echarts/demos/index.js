{
  // 饼图
  {
    let option = {
      title: {
        text: '某站点用户访问来源',
        bottom: 0,
        left: 'center',
        textStyle: {
          color: '#666'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params, ticket, callback) => {
          // data: params.data 传入的数据值
          return `渠道：${params.data.name} ${params.data.value}次，占 ${params.percent}%`
        }
      },
      legend: {
        show: false
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '70%',// 圆的大小
        data: [
          { value: 335, name: '直接访问' },
          { value: 310, name: '邮件营销' },
          { value: 234, name: '联盟广告' },
          { value: 135, name: '视频广告' },
          { value: 1548, name: '搜索引擎' }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
    let myChart = echarts.init(document.querySelector('.pie'));
    myChart.setOption(option);
  }
  // 柱状图
  {
    let option = {
      title: {
        text: '某站点用户访问来源',
        top: 0,
        left: 0,
        textStyle: {
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params, ticket, callback) => {
          // data: params.data 传入的数据值
          return params.data
        }
      },
      legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
        orient: 'vertical',
        right: 0,
        top: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        // markPoint : {
        //     data : [
        //         {type : 'max', name: '最大值'},
        //         {type : 'min', name: '最小值'}
        //     ]
        // },
        data: [320, 302, 301, 334, 390, 330, 320]
      }, {
        name: '邮件营销',
        type: 'bar',
        stack: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      }, {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      }, {
        name: '视频广告',
        type: 'bar',
        stack: '总量',
        data: [150, 212, 201, 154, 190, 330, 410]
      }, {
        name: '搜索引擎',
        type: 'bar',
        stack: '总量',
        // label: {
        //     normal: {
        //         show: true,
        //         position: 'insideRight'
        //     }
        // },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }]
    };
    let myChart = echarts.init(document.querySelector('.bar'));
    myChart.setOption(option);
  }

}