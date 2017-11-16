import React from 'react';
import ReactDOM from 'react-dom';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import { DragDropContext, DropTarget} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Row, Col } from 'react-bootstrap';
import { Parser } from 'expr-eval';

import  { ItemTypes }       from '../../ItemTypes.jsx';
import  DragItemZone        from './DragItemZone.jsx';
import  DragItemWater       from './DragItemWater.jsx';
import  DragItemGas         from './DragItemGas.jsx';
import  DragItemElectricity from './DragItemElectricity.jsx';
import  ContainerProcess    from  '../Containers/ContainerProcess.jsx';
import  ContainerMachine    from '../Containers/Modals/ContainerMachine.jsx';
import  OtherProcess        from './Modals/OtherProcess.jsx';
import  Water               from './Modals/Water.jsx';
import  Gas                 from './Modals/Gas.jsx';
import Electricity          from './Modals/Electricity.jsx';
import Chart                from './Chart.jsx';







class Main extends React.Component{
    
    
        constructor(props){
            super(props);
            this.state={dragMachineRefsIn:[],
                        dragWaterRefsIn:[],
                        dragGasRefsIn:[],
                        dragElectricityRefsIn:[],
                        dragMachineRefsOut:[],
                        dragWaterRefsOut:[],
                        dragGasRefsOut:[],
                        dragElectricityRefsOut:[],
                        idEndMachines:[],
                        simulate:false
                        
            }
            this.handleRefs = this.handleRefs.bind(this);
        }
 
    handleRefs(valsIn,valsOut,source){
        if(source === 'machine'){
            this.setState({dragMachineRefsIn:valsIn,
                           dragMachineRefsOut:valsOut});
        }else{
            if(source === 'water'){
                this.setState({dragWaterRefsIn:valsIn,
                               dragWaterRefsOut:valsOut});
            }else{ 
                if(source === 'gas'){
                    this.setState({dragGasRefsIn:valsIn,
                                   dragGasRefsOut:valsOut});
                }else{
                    if(source === 'electricity'){
                        this.setState({dragElectricityRefsIn:valsIn,
                                       dragElectricityRefsOut:valsOut});
                    }
                }
            }
        }
    }

       render(){
             const {handleSelected,connectDropTarget,isOver,dragItem,lines,dragItemWater,dragItemGas,
                    dragItemElectricity,update,collection,Connectors,updateParamsConnectors} = this.props;
        console.log(dragItemWater,'water')
        console.log(dragItemGas,'gas')
        console.log(dragItemElectricity,'electricity')
              return (<div id="mainContainer">
                  
                             <ContainerMachine/>
                             <OtherProcess/>
                             <Water/>
                             <Gas/>
                             <Electricity />
                             <div className='mainContrainerUp'>
                                 <Row>
                                    <Col sm={12} md={12} lg={12}>
                                     
                                             <Nav id="nav" bsStyle="tabs" 
                                             onSelect={(SelectedKey)=>handleSelected(SelectedKey,lines,Connectors,
                                                                      collection,updateParamsConnectors,dragItem,dragItemElectricity,
                                                                      dragItemWater,dragItemGas,Parser)}>
                                                 <NavDropdown  className="tab" eventKey={1} title="Proyecto" id="navDropdown">
                                                            
                                                    <MenuItem  eventKey={1.1} >Nuevo</MenuItem>
                                                    <MenuItem  eventKey={1.2} >Abrir</MenuItem>
                                                    <MenuItem  eventKey={1.3} >Guardar</MenuItem>
                                                 </NavDropdown>
                                                 <NavItem eventKey={2}><Glyphicon glyph="print"/> Agregar máquina </NavItem>
                                                 <NavItem eventKey={3}><Glyphicon glyph="plus-sign"/> Agregar proceso</NavItem>
                                                 <NavItem eventKey={4}><Glyphicon glyph="tint"/>Sumador de agua </NavItem>
                                                 <NavItem eventKey={5}><Glyphicon glyph="fire"/> Sumador de gas </NavItem>
                                                 <NavItem eventKey={6}><Glyphicon glyph="flash"/> Sumador de electricidad </NavItem>
                                                 <NavItem eventKey={7}onClick={()=>(this.setState({simulate:true}))}><Glyphicon glyph="play"/> Simular </NavItem>
                                            </Nav>
                                  
                                    </Col>
                                </Row>
                             </div>
                            <div className='mainContainerDown'>
                                 <ContainerProcess />
                                 {this.state.simulate ?  <Chart /> : null}
                                
                                 
                                {connectDropTarget(
                                            <div className="dropZone" >
                                                {list(dragItem).map( i =>{
                                    
                                                    return <DragItemZone dragItem={dragItem} key={i} index={i} top={dragItem[i].top} 
                                                                          left={dragItem[i].left} handleRefs={this.handleRefs} update={update}/>})}
                                                {list(dragItemWater).map( i =>(
                                    
                                                    <DragItemWater dragItemWater={dragItemWater} key={i} index={i} top={dragItemWater[i].top} 
                                                                   left={dragItemWater[i].left} handleRefs={this.handleRefs}/>))}
                                                                  
                                                {list(dragItemGas).map( i =>(
                                    
                                                    <DragItemGas dragItemGas={dragItemGas}  key={i} index={i} top={dragItemGas[i].top} 
                                                                  left={dragItemGas[i].left} handleRefs={this.handleRefs}/>))}
                                               
                                                {list(dragItemElectricity).map( i =>(
                                                    <DragItemElectricity dragItemElectricity={dragItemElectricity} key={i} index={i} 
                                                                         top={dragItemElectricity[i].top} left={dragItemElectricity[i].left}
                                                                         handleRefs={this.handleRefs}/>))}
                                                                  
                                            <svg height="100%" width="100%">
                                                {list(lines).map(i =>(
                                                    <line key={i} x1={lines[i].x0} y1={lines[i].y0} 
                                                              x2={lines[i].x1} y2={lines[i].y1} 
                                                              style={{stroke:"rgb(255,0,0)",strokeWidth:"2"}} />
                                                                ))}
                                            </svg>
                                            </div>
                                       
                                )}
                            </div>
                        
                 
                   
                 </div>);
                 
           
           
       }

}


/*-------------------------------------------------------------------------------------------------------------------*/
const list = (array) =>{
    let List = [];
    if(array.length > 0){
  
    for (let i = 0 ; i < array.length ; i++){
        
        List[i] = i;
    }
    return List;
    
    }
    
    return List;
   
};


/*-------------------------------------------------------------------------------------------------------------------*/
function collect (connect,monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}
/*-------------------------------------------------------------------------------------------------------------------*/
const boxTarget = {
	drop(props, monitor, component) {
	 	    const item = monitor.getItem();
    		if(item.source === 'list'){
    		    const delta1 = monitor.getDifferenceFromInitialOffset()
    		    const delta = monitor.getInitialSourceClientOffset();
    		    const left = Math.round(delta1.x);
    		    const top = Math.round(delta1.y);
    		    console.log("LIST")
    		    console.log(left)
    		    console.log(top)
    		    props.createDragItem(item,left,top);
    		}else{
        	        if(item.source === 'machineZone'){
        	            	const delta = monitor.getDifferenceFromInitialOffset();
                    		const left = Math.round(props.dragItem[item.index].left + delta.x);
                    		const top = Math.round(props.dragItem[item.index].top + delta.y);
                    		props.updateMachinePosition(left,top,item);
                    		let indexC;
                    		let id = props.dragItem[item.index].id
                    	    for (let i = 0; i< props.Connectors.length; i++) {
                                    if(props.Connectors[i].id === props.dragItem[item.index].id){
                                        indexC = i;
                                       break;
                                    }
                            }
                            console.log(props.updateConnectorPosition)
                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                    	           
                                    const topChild = ReactDOM.findDOMNode(component.state.dragMachineRefsIn[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragMachineRefsIn[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                    		    });
                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragMachineRefsOut[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragMachineRefsOut[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                    		    });
        	            props.updateLinePosition(id,indexC);
        	        }else{
        	            if(item.source === 'waterZone'){
        	                
        	                const delta = monitor.getDifferenceFromInitialOffset();
                    		const left = Math.round(props.dragItemWater[item.index].left + delta.x);
                    		const top = Math.round(props.dragItemWater[item.index].top + delta.y);
                    	    props.updateAdderPosition(left,top,item,'water');
                    	    let indexC;
                    	    let id = props.dragItemWater[item.index].id
                    	    for (let i = 0; i< props.Connectors.length; i++) {
                                    if(props.Connectors[i].id === props.dragItemWater[item.index].id){
                                        indexC = i;
                                       break;
                                    }
                            }
                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragWaterRefsIn[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragWaterRefsIn[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                    		    });
                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                    const topChild = ReactDOM.findDOMNode(component.state.dragWaterRefsOut[i]).offsetTop;
                                    const leftChild = ReactDOM.findDOMNode(component.state.dragWaterRefsOut[i]).offsetLeft;
                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                    		    });
                    	    props.updateLinePosition(id,indexC);
        	            }else{
            	                if(item.source === 'gasZone'){
            	                
                	                const delta = monitor.getDifferenceFromInitialOffset();
                            		const left = Math.round(props.dragItemGas[item.index].left + delta.x);
                            		const top = Math.round(props.dragItemGas[item.index].top + delta.y);
                            	    props.updateAdderPosition(left,top,item,'gas');
                            	    let indexC;
                            	    let id = props.dragItemGas[item.index].id;
                            	    for (let i = 0; i< props.Connectors.length; i++) {
                                            if(props.Connectors[i].id === props.dragItemGas[item.index].id){
                                                indexC = i;
                                               break;
                                            }
                                    }
                            	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                                            const topChild = ReactDOM.findDOMNode(component.state.dragGasRefsIn[i]).offsetTop;
                                            const leftChild = ReactDOM.findDOMNode(component.state.dragGasRefsIn[i]).offsetLeft;
                            		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                            		    });
                            	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                            const topChild = ReactDOM.findDOMNode(component.state.dragGasRefsOut[i]).offsetTop;
                                            const leftChild = ReactDOM.findDOMNode(component.state.dragGasRefsOut[i]).offsetLeft;
                            		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                            		    });
                            	    props.updateLinePosition(id,indexC);
            	                }else{
                	                    if(item.source === 'electricityZone'){
                    	                
                        	                const delta = monitor.getDifferenceFromInitialOffset();
                                    		const left = Math.round(props.dragItemElectricity[item.index].left + delta.x);
                                    		const top = Math.round(props.dragItemElectricity[item.index].top + delta.y);
                                    	    props.updateAdderPosition(left,top,item,'electricity');
                                    	    let indexC;
                                    	    let id = props.dragItemElectricity[item.index].id;
                                    	    for (let i = 0; i< props.Connectors.length; i++) {
                                                    if(props.Connectors[i].id === props.dragItemElectricity[item.index].id){
                                                        indexC = i;
                                                       break;
                                                    }
                                            }
                                    	    list(props.Connectors[indexC].inConnectors).map((i) =>{
                                                    const topChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsIn[i]).offsetTop;
                                                    const leftChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsIn[i]).offsetLeft;
                                    		        props.updateConnectorPosition(id,i,'input',top+topChild,left+leftChild);
                                    		    });
                                    	    list(props.Connectors[item.index].outConnectors).map((i) =>{
                                                    const topChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsOut[i]).offsetTop;
                                                    const leftChild = ReactDOM.findDOMNode(component.state.dragElectricityRefsOut[i]).offsetLeft;
                                    		        props.updateConnectorPosition(id,i,'output',top+topChild,left+leftChild);    
                                    		    });
                                    		props.updateLinePosition(id,indexC);
                    	                }
        	                    }
        	            }
        	        }
        	    
       
    		}
	    
	}
};

/*-------------------------------------------------------------------------------------------------------------------*/
const unconnectedInputs = (lines,dragItem) =>{
    const idMachines = [];
    
    for (let i = 0; i < dragItem.length; i++) {
        let sw = 0;
        for (let j = 0; j <lines.length; j++) {
                if(lines[j].idSourceIn === dragItem[i].id){
                    sw = 1;
                    
                }
         }
         if(sw === 0){
                 //máquinas las cuales sus entradas no estan conectadas
                 idMachines.push(dragItem[i].id);
         }
    }
    return idMachines;
    
};

/*-----------------------------------------------------------------------------------------------------------------------------------------*/
const calculateVals = (lines,Connectors,collection,dragItem,idMachines,dragItemWater,dragItemElectricity,dragItemGas,updateParamsConnectors,Parser) =>{
    
    let parser = new Parser();
    //const completed = idMachines;
    let next = [];
    //le asignaremos el valor a las expresiones de todas las máquinas las cuales ninguna de sus entradas esta conectada.
    for (let i = 0; i < dragItem.length; i++) {
        
        //Buscamos si en dragItem[i] se encuentra en idMachine
        if(idMachines.indexOf(dragItem[i].id) != -1){
            //obtenemos el indice de la maquina en collection
            let machIndex = findIndexMachine(dragItem[i].machineId,collection);
            //obtenemos el indice del connector con respecto al id del dragItem
            let indexC = findIndexArray(dragItem[i].id,Connectors);    
            
            next = evaluateOutputs(collection,Connectors,lines,dragItem,next,machIndex,indexC,0,updateParamsConnectors,parser,'dependOnDefaultInputs');
        }
    }
    
    while(next.length > 0){
        let tempNext1 = [];
        let tempNext2 = [];
        let tempNext3 = [];
        let tempNext4 = [];
        
        for(let i = 0; i < next.length; i++){
            let index;
            console.log(findIndexArray(next[i],dragItem) != -1)
            if(findIndexArray(next[i],dragItem) != -1){
                    index = findIndexArray(next[i],dragItem);
                    //obtenemos el indice de la maquina en collection
                    let machIndex = findIndexMachine(dragItem[index].machineId,collection);
                    //obtenemos el indice del connector con respecto al id del dragItem
                    let indexC = findIndexArray(dragItem[index].id,Connectors);

                    tempNext1 = evaluateOutputs(collection,Connectors,lines,dragItem,tempNext1,machIndex,
                                               indexC,index,updateParamsConnectors,parser,'dependOnDragItem');

            }else{
                console.log(findIndexArray(next[i],dragItemWater) != -1)
                if(findIndexArray(next[i],dragItemWater) != -1){
                    index = findIndexArray(next[i],dragItemWater);
                    let indexC = findIndexArray(dragItemWater[index].id,Connectors);
                    tempNext2 = addInputs(Connectors,lines,indexC,tempNext2,updateParamsConnectors);
                    console.log(tempNext2,'DragItem')
            
                }else{
                    console.log(findIndexArray(next[i],dragItemGas) != -1)
                    if(findIndexArray(next[i],dragItemGas) != -1){
                        index = findIndexArray(next[i],dragItemGas);
                        let indexC = findIndexArray(dragItemGas[index].id,Connectors);
                        tempNext3 = addInputs(Connectors,lines,indexC,tempNext3,updateParamsConnectors);
                        console.log(tempNext3,'DragItem')
                    }else{
                        console.log(findIndexArray(next[i],dragItemElectricity) != -1)
                        if(findIndexArray(next[i],dragItemElectricity) != -1){
                            index = findIndexArray(next[i],dragItemElectricity);
                            let indexC = findIndexArray(dragItemElectricity[index].id,Connectors);
                            tempNext4 = addInputs(Connectors,lines,indexC,tempNext4,updateParamsConnectors);
                            console.log(tempNext4,'DragItem')
                        }
                    }
                }        
            }
        }
        next = [];
        next = next.concat(tempNext1,tempNext2,tempNext3,tempNext4);
        console.log(next,'fuera')
        debugger
    
    }
    
    console.log('TERMINO');
    
    
    
};
/*------------------------------------------------------------------------------------------------*/
const evaluateOutputs = (collection,Connectors,lines,dragItem,next,machIndex,indexC,dragIndex,updateParamsConnectors,parser,depend) =>{
    
    //a cada salida le vamos a evaluar su la expresion
     for(let k = 0; k < collection[machIndex].outSelected.length; k++){
               
        let   expr1 = parser.parse(collection[machIndex].expresions[k].param1);
        let   expr2 = parser.parse(collection[machIndex].expresions[k].param2);
        const varsExpr1 = expr1.variables();
        const varsExpr2 = expr2.variables();
        let id = Connectors[indexC].outConnectors[k].id;
   
          //vamos aplicar todos los valores de cada una de las entradas que corresponden 
          //a las variables de las expresiones de la salida
        for(let v = 0; v < 100; v++){
            const exprs = simplifyMyExpression(expr1,expr2,collection,dragItem,Connectors,machIndex,dragIndex,indexC,varsExpr1,varsExpr2,v,depend);
            const tempExpr1 = exprs[0];
            const tempExpr2 = exprs[1];
            //actualizamos los valores de los parametros v en la salida k del conector con el indice indexC
            updateParamsConnectors(indexC,k,tempExpr1.evaluate(),tempExpr2.evaluate(),'output');
            next = assingValuesToNext(id,lines,Connectors,tempExpr1.evaluate(),tempExpr2.evaluate(),updateParamsConnectors,next);
        }
    }
    return next;
}
/*------------------------------------------------------------------------------------------------*/
const addInputs = (Connectors,lines,indexC,next,updateParamsConnectors) =>{
        
        for(let j = 0; j < 100; j++){
            let param1 = 0;
            let param2 = 0;
            for(let i = 0; i < Connectors[indexC].inConnectors.length; i++){
                
                
                    param1 = param1 + Connectors[indexC].inConnectors[i].param1[j];
                    param2 = param2 + Connectors[indexC].inConnectors[i].param2[j];
      
            }
            updateParamsConnectors(indexC,0,param1,param2,'output');
            next = assingValuesToNext(Connectors[indexC].outConnectors[0].id,lines,Connectors,param1,param2,updateParamsConnectors,next);
        }
       
        //Buscamos el que le sigue al sumador
      return next;
};
/*------------------------------------------------------------------------------------------------*/
const simplifyMyExpression = (expr1,expr2,collection,dragItem,Connectors,machIndex,dragIndex,indexC,varsExpr1,varsExpr2,v,depend) =>{
    let exprs;
    for(let p = 0; p < collection[machIndex].inSelected.length; p++){
        if(depend === 'dependOnDefaultInputs'){

            exprs = paramsDependOnTheInitialVals(collection,machIndex,expr1,expr2,varsExpr1,varsExpr2,p,v);
        }else{
            if(depend === 'dependOnDragItem'){
                exprs =  paramsDependOnMachinesVals(dragItem,Connectors,dragIndex,indexC,expr1,expr2,varsExpr1,varsExpr2,p,v);
            }
        }
        
                                 
    }
        
        return exprs;
}
/*-------------------------------------------------------------------------------------------------------------------*/
const paramsDependOnTheInitialVals = (collection,machIndex,expr1,expr2,varsExpr1,varsExpr2,p,v) =>{
      const exprs = [];
     //Si la entrada es tipo agua va mirar si las expresiones tiene la variable FA o TA para remplazarla por su valor.
      if(collection[machIndex].inSelected[p] === 'agua'){
           const Var1 = 'FA' + p;
           const Var2 = 'TA' + p;
           //si la variable FA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
           //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var1) != -1 ){
              const val = collection[machIndex].valParams[p].flow[v];
              expr1 = expr1.simplify({ [Var1]: val })
          }
          //si la variable TA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var2) != -1 ){
              const val = collection[machIndex].valParams[p].temperature[v];
              expr1 = expr1.simplify({ [Var2]: val })
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var1) != -1 ){
              const val = collection[machIndex].valParams[p].flow[v];
              expr2 = expr2.simplify({ [Var1]: val })
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var2) != -1 ){
              const val = collection[machIndex].valParams[p].temperature[v];
              expr2 = expr2.simplify({ [Var2]: val })
          }
      }else{
               //Si la entrada es tipo gas va mirar si las expresiones tiene la variable FG o TG para remplazarla por su valor.
               if(collection[machIndex].inSelected[p] === 'gas'){
                   const Var1 = 'FG' + p;
                   const Var2 = 'TG' + p;
                   if(varsExpr1.indexOf(Var1) != -1 ){
                      const val = collection[machIndex].valParams[p].flow[v];
                      expr1 = expr1.simplify({ [Var1]: val })
                   }
                   if(varsExpr1.indexOf(Var2) != -1 ){
                      const val = collection[machIndex].valParams[p].temperature[v];
                      expr1 = expr1.simplify({ [Var2]: val })
                   }
                   if(varsExpr2.indexOf(Var1) != -1 ){
                      const val = collection[machIndex].valParams[p].flow[v];
                      expr2 = expr2.simplify({ [Var1]: val })
                    }
                  if(varsExpr2.indexOf(Var2) != -1 ){
                      const val = collection[machIndex].valParams[p].temperature[v];
                      expr2 = expr2.simplify({ [Var2]: val })
                   }
                }else{
                        //Si la entrada es tipo electricidad va mirar si las expresiones tiene la variable V o A para remplazarla por su valor.
                        if(collection[machIndex].inSelected[p] === 'electricidad'){
                               const Var1 = 'A' + p;
                               const Var2 = 'V' + p;
                               if(varsExpr1.indexOf(Var1) != -1 ){
                                  const val = collection[machIndex].valParams[p].amperage[v];
                                  expr1 = expr1.simplify({ [Var1]: val })
                               }
                               if(varsExpr1.indexOf(Var2) != -1 ){
                                  const val = collection[machIndex].valParams[p].volts[v];
                                  expr1 = expr1.simplify({ [Var2]: val })
                               }
                                if(varsExpr2.indexOf(Var1) != -1 ){
                                  const val = collection[machIndex].valParams[p].amperage[v];
                                  expr2 = expr2.simplify({ [Var1]: val })
                                }
                                if(varsExpr2.indexOf(Var2) != -1 ){
                                  const val = collection[machIndex].valParams[p].volts[v];
                                  expr2 = expr2.simplify({ [Var2]: val })
                                }
                        }else{
                            //TIENE QUE PASAR ALGO SI NO ENCUENTRA NINGUNA VARIABLE
                        }
                    }
           }
        exprs.push(expr1);
        exprs.push(expr2);
        return exprs;
};

const paramsDependOnMachinesVals = (dragItem,Connectors,dragIndex,indexC,expr1,expr2,varsExpr1,varsExpr2,p,v) =>{
    
     const exprs = [];
     //Si la entrada es tipo agua va mirar si las expresiones tiene la variable FA o TA para remplazarla por su valor.
      if(dragItem[dragIndex].inSelected[p] === 'agua'){
           const Var1 = 'FA' + p;
           const Var2 = 'TA' + p;
           //si la variable FA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
           //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var1) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param1[v];
              expr1 = expr1.simplify({ [Var1]: val })
          }
          //si la variable TA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var2) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param2[v];
              expr1 = expr1.simplify({ [Var2]: val })
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var1) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param1[v];
              expr2 = expr2.simplify({ [Var1]: val })
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var2) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param2[v];
              expr2 = expr2.simplify({ [Var2]: val })
          }
      }else{
               //Si la entrada es tipo gas va mirar si las expresiones tiene la variable FG o TG para remplazarla por su valor.
               if(dragItem[dragIndex].inSelected[p] === 'gas'){
                   const Var1 = 'FG' + p;
                   const Var2 = 'TG' + p;
                   if(varsExpr1.indexOf(Var1) != -1 ){
                      const val = Connectors[indexC].inConnectors[p].param1[v];
                      expr1 = expr1.simplify({ [Var1]: val })
                   }
                   if(varsExpr1.indexOf(Var2) != -1 ){
                       const val = Connectors[indexC].inConnectors[p].param2[v];
                      expr1 = expr1.simplify({ [Var2]: val })
                   }
                   if(varsExpr2.indexOf(Var1) != -1 ){
                       const val = Connectors[indexC].inConnectors[p].param1[v];
                      expr2 = expr2.simplify({ [Var1]: val })
                    }
                  if(varsExpr2.indexOf(Var2) != -1 ){
                       const val = Connectors[indexC].inConnectors[p].param2[v];
                      expr2 = expr2.simplify({ [Var2]: val })
                   }
                }else{
                        //Si la entrada es tipo electricidad va mirar si las expresiones tiene la variable V o A para remplazarla por su valor.
                        if(dragItem[dragIndex].inSelected[p] === 'electricidad'){
                               const Var1 = 'A' + p;
                               const Var2 = 'V' + p;
                               if(varsExpr1.indexOf(Var1) != -1 ){
                                   const val = Connectors[indexC].inConnectors[p].param1[v];;
                                  expr1 = expr1.simplify({ [Var1]: val })
                               }
                               if(varsExpr1.indexOf(Var2) != -1 ){
                                   const val = Connectors[indexC].inConnectors[p].param2[v];
                                  expr1 = expr1.simplify({ [Var2]: val })
                               }
                                if(varsExpr2.indexOf(Var1) != -1 ){
                                   const val = Connectors[indexC].inConnectors[p].param1[v];
                                  expr2 = expr2.simplify({ [Var1]: val })
                                }
                                if(varsExpr2.indexOf(Var2) != -1 ){
                                  const val = Connectors[indexC].inConnectors[p].param2[v];
                                  expr2 = expr2.simplify({ [Var2]: val })
                                }
                        }else{
                            //TIENE QUE PASAR ALGO SI NO ENCUENTRA NINGUNA VARIABLE
                        }
                    }
           }
        exprs.push(expr1);
        exprs.push(expr2);
        return exprs;
    
}
/*-------------------------------------------------------------------------------------------------------------------*/
const findIndexArray = (id,array) =>{
    let indexC = -1;
    for (let i = 0; i < array.length; i++){
        if(id === array[i].id){
            indexC = i;
            return indexC;
        }
    }
    
    return indexC;
};

const findIndexMachine = (id,array) =>{
    let indexC = -1;
    for (let i = 0; i < array.length; i++){
        if(id === array[i].machineId){
            indexC = i;
            return indexC;
        }
    }
    return indexC;
};

/*-------------------------------------------------------------------------------------------------------------------*/
const assingValuesToNext = (id,lines,Connectors,param1,param2,updateParamsConnectors,next) =>{
    //le asignamos los valores de param1 y param2 a la entrada conectada al id de salida
    let indexC;
    let sw = 0;
        for (let i = 0; i < lines.length; i++){
            //encontramos el id en lines que sea igual al id de salida que ya tenemos
                if(id === lines[i].idOut){

                   indexC = findIndexArray(lines[i].idSourceIn,Connectors);
                   //Guardarmos los id de las máquinas a las que les hayamos los valores de entrada
                   if(next.indexOf(lines[i].idSourceIn) == -1){
                       next.push(lines[i].idSourceIn);
                   }
                   //ahora con  el index en Connectors del id de la máquina de entrada procedemos a hallar el index 
                   //del conector de entrada para asignarle el valor
                   for(let j = 0; j < Connectors[indexC].inConnectors.length; j++){
                       if(Connectors[indexC].inConnectors[j].id == lines[i].idIn){
                           
                           updateParamsConnectors(indexC,j,param1,param2,'input')
                           sw = 1;
                           break;
                       }
                   }
                }
            
                if(sw == 1 ){
                   break;
                }
       }
    return next;
        
};
/*-------------------------------------------------------------------------------------------------------------------*/
const mapStateToProps = state => {
    return{
       
       dragItem: state.machine.dragItem,
       collection: state.machine.collection,
       update: state.machine.update,
       dragItemWater: state.adder.dragItemWater,
       dragItemGas: state.adder.dragItemGas,
       dragItemElectricity: state.adder.dragItemElectricity,
       lines: state.connector.lines,
       Connectors: state.connector.Connectors
    };
    
};
/*-------------------------------------------------------------------------------------------------------------------*/
const mapDispatchToProps = dispatch => {
    return{
        handleSelected(SelectedKey,lines,Connectors,collection,updateParamsConnectors,dragItem,
                      dragItemElectricity,dragItemGas,dragItemWater,Parser){
             switch (SelectedKey) {
                 case 2:
                     dispatch({type:"SHOW_MACHINE",show:true});
                     break;
                case 3: 
                    dispatch({type:"SHOW_OTHER_PROCESS",show:true});
                    break;
                case 4: 
                    dispatch({type:"SHOW_WATER",show:true});
                    break;
                case 5: 
                    dispatch({type:"SHOW_GAS",show:true});
                    break;
                 case 6: 
                    dispatch({type:"SHOW_ELECTRICITY",show:true});
                    break;
                case 7: 
                    const idMachines = unconnectedInputs(lines,dragItem);
                   /* calculateVals(lines,Connectors,collection,dragItem,idMachines,dragItemWater,
                                 dragItemElectricity,dragItemGas,updateParamsConnectors,Parser);*/
                    
                    break;
                 
                 default:
                     // code
             }
            },
        updateMachinePosition(left,top,item){
            dispatch({type:"UPDATE_POSITION",left:left,top:top,index:item.index});
        },
        updateAdderPosition(left,top,item,source){
            dispatch({type:"UPDATE_ADDER_POSITION",left:left,top:top,index:item.index,source:source});
        },
        createDragItem(item,left,top){
            dispatch({type:"CREATE_DRAG_ITEM",id:item.index,left:left,top:top});
        },
        updateConnectorPosition(id,index,source,top,left){
            dispatch({type:'UPDATE_CONNECTOR_POSITION',
                            id:id,
                            index:index,
                            source:source,
                            top:top,
                            left:left
            });
        },
        updateLinePosition(id,indexC){
            dispatch({type:'UPDATE_LINE_POSITION',id:id,indexC:indexC});
        },
        updateParamsConnectors(indexC,index,param1,param2,source){
            dispatch({type:'UPDATE_PARAMS_CONNECTORS',indexC:indexC,index:index,param1:param1,param2:param2,source:source});
        }
        
    };
    
};



export default flow(DropTarget([ItemTypes.MACHINE,ItemTypes.ADDER_WATER,ItemTypes.ADDER_GAS,ItemTypes.ADDER_ELECTRICITY],
                    boxTarget,collect),connect(mapStateToProps,mapDispatchToProps,null,{ withRef: true }),DragDropContext(HTML5Backend))(Main);