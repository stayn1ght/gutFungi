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
/* 读取本地数据
使用jQuery获取本地文件出现跨域问题，对浏览器进行设置 属性 - 目标 - 添加 --allow-file-access-from-files
这项设置可能带来安全性问题 */

/* var data = $.ajax({
    url: './Gut_Fungi.json',
    type: 'get',
    dataType: 'json',
    async: false,
    success: function (data) {
        return data;
    }
}).responseJSON;
 */

var data = fetch('https://github.com/stayn1ght/gutFungi/blob/main/Gut_Fungi.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
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
                fontSize: 15,
                symbolSize: 7,
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
                inintialTreeDepth: 3,
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