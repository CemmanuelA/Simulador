import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class Chart extends React.Component{
    
    constructor(props){
        super(props);
        this.state={ctx:null};
    }
    
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.ctx != this.state.ctx || nextProps.simulate != this.props.simulate){
            return true
        }
        return false;
        
    }
    componentDidMount(){
       
           //let ctx = ReactDOM.findDOMNode(this.myChart1).getContext('2d');
           let ctx = document.getElementById('myChart1');
           console.log(ctx)
            new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',
        
            // The data for our dataset
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },
        
            // Configuration options go here
            options: {}
        });
       
    }
    render(){
        return(<div className='chartZone'>
                  <div className='chart'>
                        <canvas ref={(ref) => this.myChart1 = ref} id = 'myChart1' width="400" height="400"></canvas>
                  </div>
                  <div className='chartCheckBox'></div>
                    
              </div>);
    }
};

export default Chart;