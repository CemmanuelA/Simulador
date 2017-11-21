import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, Form, FormGroup, Button, Row, Col } from 'react-bootstrap'
import { Line }  from 'react-chartjs-2'
import { connect } from 'react-redux';

class Chart extends React.Component{
    
    constructor(props){
        super(props);
        this.state={data:[],
                    dpsData:[],
                    show:[],
                    id:[]
        };
        this.getData = this.getData.bind(this);
    }
    
          
    componentWillMount(){
            this.getData();
            this.chartRef=[];
    }
    componentWillUpdate(){
        //El siguiente codigo arregla el problema de auto-scroll
        var node = ReactDOM.findDOMNode(this);
         this.scrollHeight = node.scrollHeight;
         this.scrollTop = node.scrollTop;
    }
    componentWillReceiveProps(nextProps){
       const { v, Connectors,newSimulation} = nextProps;
        const vals1 = [];
        const vals2 = []
       if(v != 0 && v != 15 && this.props.v != nextProps.v){
         const data = this.state.data;
           for(let i = 0; i < Connectors.length; i++){
               
               for(let j = 0; j < Connectors[i].outConnectors.length; j++){
                    vals1.push(Connectors[i].outConnectors[j].param1[v])
                    vals2.push(Connectors[i].outConnectors[j].param2[v])
                }
                   
               
            }
            
           for(let i = 0; i < data.length; i++){
               const size = data[i].datasets[0].data.length;
               if(size > 15){
                 data[i].datasets[0].data.shift()
                 data[i].datasets[1].data.shift()
                 data[i].labels.shift()  
               }
               data[i].labels.push((v+1).toString())
               data[i].datasets[0].data.push(vals1[i]);
               data[i].datasets[1].data.push(vals2[i]);
            }
            this.setState({data:data});
        }
        if(newSimulation){
          const data = this.state.data;
           for(let i = 0; i < data.length; i++){
               data[i].labels = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'];
               data[i].datasets[0].data = [];
               data[i].datasets[1].data = [];
            }
            this.setState({data:data});
        }
           
       }
       shouldComponentUpdate(nextProps){
            if(nextProps.v == this.props.v){
                return false
            }
            return true;
        }
        componentDidUpdate(){
            //El siguiente codigo arregla el problema de auto-scroll
            var node = ReactDOM.findDOMNode(this);
            node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
        }
       /* for(let i = 0; i < this.state.dpsData; i++ ){
            
        }
        function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}*/
        	/*if (dps.length > dataLength) {
		dps.shift();
	
    }*/

    getData(){
       const {Connectors,idFinalMachines} = this.props;
       let id =[];
       let show = [];
       let dataSets = [];
       let dpsData = [];
       let data = [];
       let nChart = 0;
       for (let i = 0; i < Connectors.length; i++) {
            for(let j = 0; j < Connectors[i].outConnectors.length; j++){
                    id.push(Connectors[i].outConnectors[j].id);
                    if(idFinalMachines.indexOf(Connectors[i].id) != -1){
                        show.push(Connectors[i].outConnectors[j].id);        
                    }
                    nChart = nChart + 1
                    const dps1 = Connectors[i].outConnectors[j].param1 ;
                    const dps2 = Connectors[i].outConnectors[j].param2;
                    dpsData.push({dps1,dps2});
                    /*Connectors[i].outConnectors[j].param1
                    [100,50,120,40,80,70] [50,120,70,80,90,150]*/

                    const param1 = {
                                        label:'param1',
                                        data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        borderColor:'rgb(79, 108, 155'
                                    }
                    const param2 = {
                                        label:'param2',
                                        data:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                                        borderColor:'rgb(82, 206, 159)'
                                    }

                    dataSets.push({param1,param2});
            }
            
	    }
	    /*console.log(dataSets,'todo bien')
	    console.log(idFinalMachines)
	    console.log(id)
	    console.log(show)
	    debugger*/
        
        for(let i = 0; i < dataSets.length; i++){
             const title = id[i]; 
             const dataSet = [dataSets[i].param1,dataSets[i].param2];
             data.push({labels:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'], 
                 type: "line",
                 axisY: {includeZero: false}, 
                 datasets:dataSet});
        }
    this.setState({
                    data:data,
                    dpsData:dpsData,
                    nChart:nChart,
                    show:show,
                    id:id
    });
}
    render(){
        const {Connectors, list, stopSimulation} = this.props;
        return(<div className='chartZone'>
        
                         <div className='chartOptions'>
                             <Row className="btnStop">
                                 <Col sm={5} md={5} lg={5} smOffset={1} mdOffset={1} lgOffset={1}>
                                     <Button bsStyle="danger" onClick={() => stopSimulation(false)}>Detener simulación</Button>
                                 </Col>
                                 
                                 <Col sm={5} md={5} lg={5}  >
                                    <Button bsStyle="primary" onClick={() => stopSimulation(true)}>Seguir simulación</Button>
                                 </Col>
                             </Row>
                             
                        </div>
                    
                        <div className='charts'>
                                <div>
                                    {list(this.state.data).map((i)=>{
                                       return <Line key={i} ref={(chart)=>this.chartRef[0]=chart}data={this.state.data[i]} height={40} width={80} 
                                                        options={{animation: false,title:{display:true,text:this.state.id[i],fontSize:20}}} redraw/>
                                       /*for(let j = 0; j < Connectors.length; j++){
                                           for(let k = 0; k < Connectors[j].outConnectors.length; k++){
                                               if(this.state.show.indexOf(Connectors[j].outConnectors[k].id) != -1){
                                                   return <Line key={i} data={this.state.data[i]} height={30} width={80} 
                                                        options={{}}/>
                                               }
                                           }
                                       }*/
                                       
                                           
                                        })}
                                </div>
                        </div>
              </div>);
    }
};

/*<Form className='chartFormCheckBox'>
              
                                <FormGroup className='chartGroupCheckBox'>
                                    {list(Connectors).map((i) => (<Checkbox key={i} >{Connectors[i].id}</Checkbox>))}
                                </FormGroup>

                             </Form>*/
const findIndexArray = (id,array) =>{
    let index = -1;
    for (let i = 0; i < array.length; i++){
        if(id == array[i].id){
            index = i;
            return index;
        }
    }
    
    return index;
};

const mapStateToProps = (state) =>{
  return{
        Connectors: state.connector.Connectors,
        newSimulation: state.connector.newSimulation
        
  };
};
export default connect(mapStateToProps)(Chart);