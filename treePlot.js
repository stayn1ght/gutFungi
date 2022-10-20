// import * as echarts from 'echarts';
// 基于准备好的dom，初始化echarts实例
var dom = document.getElementById('main');
var myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
var app = {};


var option;

myChart.showLoading();

var data = $.ajax({
    // 设置响应头，实现跨域
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    url: './Gut_Fungi.json',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
        return data;
    }
}).responseJSON;



myChart.hideLoading();
myChart.setOption(
    (option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        legend: {
            top: '2%',
            left: '3%',
            orient: 'vertical',
            data: [
                {
                    name: 'data structure',
                    icon: 'rectangle'
                }
            ],
            borderColor: '#c23531'
        },
        series: [
            {
                type: 'tree',
                name: 'data structure',
                data: [data],
                top: '10%',
                left: '20%',
                bottom: '10%',
                right: '20%',
                fontSize: 17,
                symbolSize: 8,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right'
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                inintialTreeDepth: 4,
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    })
);

if (option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);