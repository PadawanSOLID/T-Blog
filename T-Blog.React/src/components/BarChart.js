import { useEffect,useRef} from "react";
import * as echarts from 'echarts'
const BarChart = ({title}) => {
    const chartRef=useRef(null)
    useEffect(() => {
        const chartDom = chartRef.current;
        const myChart = echarts.init(chartDom);
        const option = {
            title:{text:title},
            xAxis: {
                type: 'category',
                data: ['Vue', 'Angular', 'React']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [10,40,70],
                type: 'bar'
            }]
        }
        option&&myChart.setOption(option);
    })
   
    return <div><div ref={chartRef} style={{width:'500px',height:'400px'}}></div></div>
}
export default BarChart;
