import React from 'react';
import { Navbar } from './NavBar.jsx';
import { Process } from    './Box/Process.jsx';



export class Main extends React.Component{
   
   constructor(props){
      super(props);
      this.state ={ nameM: '888',
                     inputs:1,
                     outputs:1};
      this.updateListM = this.updateListM.bind(this);
   }
   
   //Actualizar lista de máquinas
   updateListM(Name, Inputs, Outputs){
      this.setState =({
         nameM:Name,
         inputs:Inputs,
         outputs:Outputs
      });
      
   }

   render(){
       return (<div>
                  <Navbar updateProcess={this.updateListM}/>
                  <Process nameM={this.state.nameM} inputs={this.state.inputs} outputs={this.state.outputs} /> 
              </div>);
   }

}
