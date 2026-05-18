import { Component, useRef, onWillStart, onMounted, onPatched } from "@odoo/owl";
import { loadJS } from "@web/core/assets";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        data: Object,
    }

    setup(){
        this.canvasRef = useRef("canvas");
        this.chart = null;

        onWillStart(async() => {
            await loadJS("/web/static/lib/Chart/Chart.js");
        });
        
        onMounted(() => {
            this.renderChart();
        });

        onPatched(() => {
            this.updateChart();
        })

    
    }

    get chartData(){
        return {
            labels: Object.keys(this.props.data),
            values: Object.values(this.props.data),
        }
    }

    renderChart() {
        //const labels = Object.keys(this.props.data);
        //const values = Object.values(this.props.data);
        //console.log("from renderChart", labels, values);
        //解构赋值
        const { labels, values } = this.chartData;
        this.chart = new Chart(this.canvasRef.el, {
            type: "pie",
            data: {
                labels,
                datasets: [
                    {
                        data: values,
                    }
                ]
            }
        })
    }

    updateChart(){
        if(!this.chart) {
            return;
        }

        const { labels, values } = this.chartData;//拿新值
        this.chart.data.labels = labels;//调用chart.js能力，下同
        this.chart.data.datasets[0].data = values;
        this.chart.update();
    }
}