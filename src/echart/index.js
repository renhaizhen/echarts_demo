
import * as echarts from 'echarts';
import React from 'react';
import { mock } from '../mock_ec';
import { styles } from './style';
var myChart;
class Echarts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            aimSlide:null
        };
      }
    splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumes = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i]);
            volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
        }
    
        return {
            categoryData: categoryData,
            values: values,
            volumes: volumes
        };
    }

    calculateMA(dayCount, data) {
        var result = [];
        for (var i = 0, len = data.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data.values[i - j][1];
            }
            result.push(+(sum / dayCount).toFixed(3));
        }
        return result;
    }


	componentDidMount() {
		 myChart = echarts.init(document.getElementById('mian'));
         if(mock&&mock.length>0){
            console.log(mock.slice(30,50),'...pppp')    
         }
        var data = this.splitData(mock);    
        var upColor = '#00da3c';
        var downColor = '#ec0000';
        var option;
        myChart.setOption(
            option = {
                animation: false,
                legend: {
                    top: 10,
                    left: 'center',
                    data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
                },
                tooltip: {
                    trigger: 'axis',
                    triggerEvent:true,
                    axisPointer: {
                        type: 'cross'
                    },
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    textStyle: {
                        color: '#000'
                    },
                    position: function (pos, params, el, elRect, size) {
                        var obj = {top: 10};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    }
                    // extraCssText: 'width: 170px'
                },
                axisPointer: {
                    link: {xAxisIndex: 'all'},
                    label: {
                        backgroundColor: '#777'
                    }
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: false
                        },
                        brush: {
                            type: ['lineX', 'clear']
                        }
                    }
                },
                brush: {
                    xAxisIndex: 'all',
                    brushLink: 'all',
                    outOfBrush: {
                        colorAlpha: 0.1
                    }
                },
                visualMap: {
                    show: false,
                    seriesIndex: 5,
                    dimension: 2,
                    pieces: [{
                        value: 1,
                        color: downColor
                    }, {
                        value: -1,
                        color: '#000',//upColor
                    }]
                },
                grid: [
                    {
                        left: '10%',
                        right: '8%',
                        height: '50%'
                    },
                    {
                        left: '10%',
                        right: '8%',
                        top: '40.6%',
                        height: '16%'
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: data.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: {onZero: false},
                        splitLine: {show: false},
                        splitNumber: 20,
                        triggerEvent:true,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            z: 100
                        }
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: data.categoryData,
                        triggerEvent:true,
                        scale: true,
                        boundaryGap: false,
                        axisLine: {onZero: false},
                        axisTick: {show: false},
                        splitLine: {show: false},
                        axisLabel: {show: false},
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                    }
                ],
                yAxis: [
                    {
                        scale: true,
                        splitArea: {
                            show: true
                        },
                        interval:500
                    },
                    {
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        axisLabel: {show: false},
                        axisLine: {show: false},
                        axisTick: {show: false},
                        splitLine: {show: false}
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1],
                        start: 98,
                        end: 100
                    },
                    {
                        show: false,//??????????????????
                        xAxisIndex: [0, 1],
                        type: 'slider',
                        top: '85%',
                        start: 98,
                        end: 100
                    }
                ],
                series: [
                    {   
                        name:'customs',
                        type:'custom',
                        zlevel: 3,
                        renderItem:function(params,api){
                            // console.log(params,'params.....')
                            // console.log(api,api.value(0),api.value(1),api.style(),'api.....')
                            var categoryIndex = api.value(0);
                            // ???????????? api.coord(...) ????????????????????????????????????????????????????????????????????????
                            var startPoint = api.coord([api.value(1), categoryIndex]);
                            var endPoint = api.coord([api.value(2), categoryIndex]);
                            // ???????????? api.size(...) ?????? Y ????????????????????? 1 ????????????????????????????????????
                            var height = api.size([0, 1])[1] * 0.6;
                            console.log(api.size([0,1]))
                            const colors = ['#7b9ce1','#dc77dc','#7b9ce1']
                            console.log(api.value(0),startPoint[1] - categoryIndex * 100,'startPoint:',startPoint,'endPoint:',endPoint,'width:',endPoint[0] - startPoint[0],'heigth:',height,'rect')
                            console.log(api.value(0),'x:',params.coordSys.x,'y:',params.coordSys.y,'width:',params.coordSys.width,'height:',params.coordSys.height,'????????????')
                            console.log(api.value(0),'xxx', startPoint[0],'yy',100 + categoryIndex * 100)
                           return {
                               type:'rect',
                               shape: echarts.graphic.clipRectByRect({
                                // ???????????????????????????
                                // x: startPoint[0],
                                // y: 100 + categoryIndex * 100,
                                // width: 100,
                                // height: 50
                                x: startPoint[0],
                                y: startPoint[1] - height / 2,
                                width: endPoint[0] - startPoint[0],
                                height: height * 200
                            }, {
                                // ??????????????????????????????
                                x: params.coordSys.x,
                                y: params.coordSys.y,
                                width: params.coordSys.width,
                                height: params.coordSys.height
                            }),
                            style: {
                                ...api.style(),
                                fontSize: 12,
                                textFill: "#f0f",
                                textStroke: "#5470c6",
                                // marginLeft:100,
                                fill:colors[1],
                                backgroundColor:colors[0]
                            }
                           }
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'inside',
                                formatter:function(a){
                                    console.log(a,'formatter')
                                    return 'test...'
                                }
                            }
                        },
                        encode:{
                            x:[1,2],
                            y:0,
                            tooltip: [0, 1]
                        },
                        data:[
                            [16000, '2016-02-10', '2016-02-18'], // ??????????????? dataItem
                            [14000, '2015-02-10', '2015-02-23'], // ??????????????? dataItem
                            [18000, '2015-04-27', '2015-05-15'], // ??????????????? dataItem
                            [17000, '2016-05-02', '2016-06-10'], // ??????????????? dataItem
                        ]

                    },
                    {
                        name: 'Dow-Jones index',
                        type: 'candlestick',
                        data: data.values,
                        itemStyle: {
                            color:  upColor,
                            color0: downColor,
                            borderColor: null,
                            borderColor0: null
                        },
                        tooltip: {
                            formatter: function (param) {
                                param = param[0];
                                return [
                                    'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
                                    'Open: ' + param.data[0] + '<br/>',
                                    'Close: ' + param.data[1] + '<br/>',
                                    'Lowest: ' + param.data[2] + '<br/>',
                                    'Highest: ' + param.data[3] + '<br/>'
                                ].join('');
                            }
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: this.calculateMA(5, data),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: this.calculateMA(10, data),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: this.calculateMA(20, data),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: this.calculateMA(30, data),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'Volume',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: data.volumes
                    },
                ]

            },true
        )
        myChart.on('click',(params)=> {
            myChart.open = false;
            console.log(params,'??????????????????',params.name);
            this.setState({open:true,aimSlide:params})
            console.log(this)
            // alert(`??????????????????:${params.name}`)
        })
        myChart.getZr().on('click',params=>{
            console.log(params,'getZr??????????????????',params.offsetX,params.offsetY);
            
        })
    
        // myChart.dispatchAction({
        //     type: 'brush',
        //     areas: [
        //         {
        //             brushType: 'lineX',
        //             coordRange: ['2016-03-02', '2016-06-22'],
        //             xAxisIndex: 0
        //         }
        //     ]
        // });

        
	}
    upDateStatu(){
        this.setState({open:false})
        console.log(this.state)
    }
	render() {
        const { open,aimSlide} = this.state;
        const isShow = open
        console.log(open,'........')
        if(!mock||!mock.length) return null
		return (
            <div style={{width:'100%',height:'100%'}}>
				 <div id='mian' style={{width:1000,height:900}}>
                 </div>
                 <div style={ isShow?styles.openBox:styles.closeBox} onClick={this.upDateStatu.bind(this)}>
                     {'??????'}
                     <div style={styles.closeInner}>
                        <div>{aimSlide===null?'':`????????????:${aimSlide.name}`}</div>
                        <div>????????????:100000</div>
                        <div>????????????:50000</div>
                        <div>?????????:65%</div>
                        <div>????????????:53215</div>
                     </div>
                     </div>
            </div>

		)
	}
}


export default Echarts