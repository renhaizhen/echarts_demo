
import * as echarts from 'echarts';
import React from 'react';

var myChart;
class ES extends React.Component {
    constructor() {
        super();
        this.state = {
            open:false
        };
      }



	componentDidMount() {
		 myChart = echarts.init(document.getElementById('mian'));
         var option;
        myChart.setOption(
            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [150, 230, 224, 218, 135, 147, 260],
                    type: 'line'
                    },
                    {
                        type:'custom',
                        renderItem:function(params,api){
                            // 对于 data 中的每个 dataItem，都会调用这个 renderItem 函数。
            // （但是注意，并不一定是按照 data 的顺序调用）

            // 这里进行一些处理，例如，坐标转换。
            // 这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
            var categoryIndex = api.value(0);
            // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
            var startPoint = api.coord([api.value(1), categoryIndex]);
            var endPoint = api.coord([api.value(2), categoryIndex]);
            // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
            var height = api.size([0, 1])[1] * 0.6;
            console.log(categoryIndex,api.value(1),api.coord([1, 1]),'ca start end')
            // console.log(api.value(0),'startPoint:',startPoint,'endPoint:',endPoint,'width:',endPoint[0] - startPoint[0],'heigth:',height,'rect')
            // console.log(api.value(0),'x:',params.coordSys.x,'y:',params.coordSys.y,'width:',params.coordSys.width,'height:',params.coordSys.height,'坐标系盒')
            // 这里返回为这个 dataItem 构建的图形元素定义。
            return {
                // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                type: 'rect',
                // shape 属性描述了这个矩形的像素位置和大小。
                // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
                // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
                shape: echarts.graphic.clipRectByRect({
                    // 矩形的位置和大小。
                    // x: startPoint[0],
                    // y: startPoint[1] - categoryIndex * 100,
                    // width: 100,
                    // height: height * 10
                    x: startPoint[0],
                    y: startPoint[1] - height / 2,
                    width: endPoint[0] - startPoint[0],
                    height: height
                }, {
                    // 当前坐标系的包围盒。
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                }),
                // 用 api.style(...) 得到默认的样式设置。这个样式设置包含了
                // option 中 itemStyle 的配置和视觉映射得到的颜色。
                style: api.style()
            };
                        },
                        encode:{
                            x:3,
                            y:0
                        },
                        data:[
                            [ 50,'Mon','Tue','Mon'], // 这是第一个 dataItem
                            [ 100,'Tue','Wed','Thu'], // 这是第二个 dataItem
                            [ 200,'Fri','Sun','Sun'], // 这是第三个 dataItem
                        ],
                        label:{
                            normal:{
                                show:true,
                                position:'inside',
                                formatter:function(a){
                                    // console.log(a,'formatter')
                                    return 'test'
                                }
                            }
                        },
                    }
            ]
            },true
        )
            myChart.on('click', function(params) { 
            console.log(params,'点击图表！！',params.name);
            alert(`当前点击的是:${params.name}`)
        })
        myChart.getZr().on('click',params=>{
            console.log(params,'getZr点击图表！！',params.offsetX,params.offsetY);
            
        })
        
	}

	render() {
		return (
            <div>
				 <div id='mian' style={{width:700,height:500,position:'relative'}}></div>
            </div>

		)
	}
}


export default ES