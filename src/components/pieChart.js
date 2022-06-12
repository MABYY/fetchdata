import React, { Component } from "react";
import Chart from "react-apexcharts";
import '../App.css'


class PieChart extends Component {
    
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
            labels: props.labels
        },
        series:props.series 
      }
    }
  
    render() {
  
      return (
        <div className="donut">
          <Chart options={this.state.options} 
                series={this.state.series} 
                type="donut"
                 width="700" />
        </div>
      );
    }
  }
  
  export default PieChart;

  //https://apexcharts.com/docs/options/labels/

  // In Axis Charts (line / column), labels can be set instead 
  // of setting xaxis categories option.

// colors: https://mdbootstrap.com/docs/standard/content-styles/colors/