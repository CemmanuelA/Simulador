import React from 'react';
import ReactDOM from 'react-dom';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
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
import Help                 from './Modals/Help.jsx';
import Chart                from './Chart.jsx';






var interval;
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
                    idFinalMachines:[],
                    simulate:false,
                    simulation:true,
                    newSimulation:false
                    
        };
        this.handleRefs = this.handleRefs.bind(this);
        this.getFinalMachines = this.getFinalMachines.bind(this);
        this.stopSimulation = this.stopSimulation.bind(this);
        this.handleSimulated = this.handleSimulated.bind(this);
        this.calculateVals = this.calculateVals.bind(this);
        this.evaluateOutputs = this.evaluateOutputs.bind(this);
        this.assingValuesToNext = this.assingValuesToNext.bind(this);
        this.findIndexArray = this.findIndexArray.bind(this);
        this.findIndexMachine = this.findIndexMachine.bind(this);
        this.addInputs = this.addInputs.bind(this);
        this.simplifyMyExpression = this.simplifyMyExpression.bind(this);
        this.unconnectedInputs = this.unconnectedInputs.bind(this);
        this.paramsDependOnMachinesVals = this.paramsDependOnMachinesVals.bind(this);
        this.paramsDependOnRandomVals = this.paramsDependOnRandomVals.bind(this);
    }
    
 
    handleRefs(valsIn,valsOut,index,source){
        if(source === 'machine'){
            const refIn = this.state.dragMachineRefsIn;
            const refOut = this.state.dragMachineRefsOut;
            refIn[index] = valsIn;
            refOut[index] = valsOut;
            this.setState({dragMachineRefsIn:refIn,
                           dragMachineRefsOut:refOut});
        }else{
            if(source === 'water'){
                const refIn = this.state.dragWaterRefsIn;
                const refOut = this.state.dragWaterRefsOut;
                refIn[index] = valsIn;
                refOut[index] = valsOut;
                this.setState({dragWaterRefsIn:refIn,
                               dragWaterRefsOut:refOut});
            }else{ 
                    
                if(source === 'gas'){
                    const refIn = this.state.dragGasRefsIn;
                    const refOut = this.state.dragGasRefsOut;
                    refIn[index] = valsIn;
                    refOut[index] = valsOut;
                    this.setState({dragGasRefsIn:refIn,
                                   dragGasRefsOut:refOut});
                }else{
                    if(source === 'electricity'){
                        const refIn = this.state.dragElectricityRefsIn;
                        const refOut = this.state.dragElectricityRefsOut;
                        refIn[index] = valsIn;
                        refOut[index] = valsOut;
                        this.setState({dragElectricityRefsIn:refIn,
                                       dragElectricityRefsOut:refOut});
                    }
                }
            }
        }
    }
    
    getFinalMachines(machines){
        
        this.setState({idFinalMachines:machines,
                       simulate:true});
    }
    stopSimulation(boolean){
        const {lines,dragItem,updateIndexValue} =  this.props
        
         if(!boolean){
              clearInterval(interval);
           }else{
            var  v  = this.props.v;
            const idMachines = this.unconnectedInputs(lines,dragItem);
            interval = setInterval(()=>{
               console.log(v)
                this.calculateVals(idMachines,v);
                updateIndexValue(v);
                v = v + 1;
           },1000);
               
           }
    }
/*----------------------------------------------------------------------------------------------------------------------------------*/
    handleSimulated(){
       const {lines,dragItem,updateIndexValue} = this.props;
          const idMachines = this.unconnectedInputs(lines,dragItem);
            var v = 0;
            /*for(let i = 0 ; i < 15; i++){
                this.calculateVals(idMachines,v)
                v = v + 1;
            }*/
          interval = setInterval(()=>{
                this.calculateVals(idMachines,v);
                updateIndexValue(v);
                v = v + 1;
           },1000);
                  
    }
       render(){
             const {handleSelected,connectDropTarget,isOver,dragItem,lines,dragItemWater,dragItemGas,
                    dragItemElectricity,update,deleteLine,newSimulation,v,process,collection} = this.props;
              return (<div id="mainContainer">
                  
                             <ContainerMachine/>
                             <OtherProcess/>
                             <Water/>
                             <Gas/>
                             <Electricity />
                             <Help />
                             <div className='mainContrainerUp'>
                                 <Row>
                                    <Col sm={12} md={12} lg={12}>
                                     
                                             <Nav id="nav" bsStyle="tabs" 
                                             onSelect={(SelectedKey)=>handleSelected(SelectedKey,process,collection)}>
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
                                                 <NavItem eventKey={7} onClick={()=>{/*newSimulation()*/;this.handleSimulated()}}><Glyphicon glyph="play"/> Simular </NavItem>
                                                 <NavItem eventKey={8} onClick={()=>{}}><Glyphicon glyph="play"/> Ayuda </NavItem>
                                            </Nav>
                                  
                                    </Col>
                                </Row>
                             </div>
                            <div className='mainContainerDown'>
                                 <ContainerProcess />
                                 {this.state.simulate ?  
                                 <Chart idFinalMachines={this.state.idFinalMachines} v={v} list={list}
                                 stopSimulation={this.stopSimulation}/>  
                                 : 
                                 null}
                                
                                 
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
                                                    <line onClick={()=>deleteLine(i)} key={i} x1={lines[i].x0} y1={lines[i].y0} 
                                                              x2={lines[i].x1} y2={lines[i].y1} 
                                                              style={{stroke:"rgb(255,0,0)",strokeWidth:"4",cursor:'pointer'}} />
                                                                ))}
                                            </svg>
                                            </div>
                                       
                                )}
                            </div>
                        
                 
                   
                 </div>);
                 
           
           
       }
       
/*-------------------------------------------------------------------------------------------------------------------*/
unconnectedInputs(lines,dragItem){
    const idMachines = [];
    
    for (let i = 0; i < dragItem.length; i++) {
        let sw = 0;
        for (let j = 0; j < lines.length; j++) {
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
calculateVals(idMachines,v){
    const {lines,Connectors,collection,updateParamsConnectors,dragItem,dragItemElectricity,dragItemWater,dragItemGas,
           updateLabel} = this.props
    let parser = new Parser();
    const completed = [];
    let next = [];
    //le asignaremos el valor a las expresiones de todas las máquinas las cuales ninguna de sus entradas esta conectada.
    for (let i = 0; i < dragItem.length; i++) {
        
        //Buscamos si en dragItem[i] se encuentra en idMachine
        if(idMachines.indexOf(dragItem[i].id) != -1){
            //obtenemos el indice de la maquina en collection
            let machIndex = this.findIndexMachine(dragItem[i].machineId,collection);
            //obtenemos el indice del connector con respecto al id del dragItem
            let indexC = this.findIndexArray(dragItem[i].id,Connectors);    
            next = this.evaluateOutputs(collection,Connectors,lines,dragItem,next,machIndex,indexC,0,updateParamsConnectors,parser,v,'dependOnRandomInputs');
        }
   
        
    }

    while(next.length > 0){
        let tempNext1 = [];
        let tempNext2 = [];
        let tempNext3 = [];
        let tempNext4 = [];
        
        for(let i = 0; i < next.length; i++){
            let index;
            if(this.findIndexArray(next[i],dragItem) != -1){
                
                    index = this.findIndexArray(next[i],dragItem);
                    //obtenemos el indice de la maquina en collection
                    let machIndex = this.findIndexMachine(dragItem[index].machineId,collection);
                    //obtenemos el indice del connector con respecto al id del dragItem
                    let indexC = this.findIndexArray(dragItem[index].id,Connectors);

                    tempNext1 = this.evaluateOutputs(collection,Connectors,lines,dragItem,tempNext1,machIndex,
                                               indexC,index,updateParamsConnectors,parser,v,'dependOnDragItem');
                    if (tempNext1.length == 0){
                         completed.push(dragItem[index].id);
                    }

            }else{
                
                if(this.findIndexArray(next[i],dragItemWater) != -1){
                    index = this.findIndexArray(next[i],dragItemWater);
                    let indexC = this.findIndexArray(dragItemWater[index].id,Connectors);
                    tempNext2 = this.addInputs(Connectors,lines,indexC,tempNext2,updateParamsConnectors,v);
            
                }else{
                    console.log(this.findIndexArray(next[i],dragItemGas) != -1)
                    if(this.findIndexArray(next[i],dragItemGas) != -1){
                        index = this.findIndexArray(next[i],dragItemGas);
                        let indexC = this.findIndexArray(dragItemGas[index].id,Connectors);
                        tempNext3 = this.addInputs(Connectors,lines,indexC,tempNext3,updateParamsConnectors,v);
                    }else{
                        if(this.findIndexArray(next[i],dragItemElectricity) != -1){
                            index = this.findIndexArray(next[i],dragItemElectricity);
                            let indexC = this.findIndexArray(dragItemElectricity[index].id,Connectors);
                            tempNext4 = this.addInputs(Connectors,lines,indexC,tempNext4,updateParamsConnectors,v);
                        }
                    }
                }        
            }
        }
        next = [];
        next = next.concat(tempNext1,tempNext2,tempNext3,tempNext4);
    
    }
    updateLabel();
    if(v == 0){
         this.getFinalMachines(completed);
    }
    
};
/*------------------------------------------------------------------------------------------------*/
evaluateOutputs(collection,Connectors,lines,dragItem,next,machIndex,indexC,dragIndex,updateParamsConnectors,parser,v,depend){
    
    //a cada salida le vamos a evaluar su la expresion
     for(let k = 0; k < collection[machIndex].outSelected.length; k++){
               
        let   expr1 = parser.parse(collection[machIndex].expresions[k].param1);
        let   expr2 = parser.parse(collection[machIndex].expresions[k].param2);
        const varsExpr1 = expr1.variables();
        const varsExpr2 = expr2.variables();
        let id = Connectors[indexC].outConnectors[k].id;
   
        //simplificamos la expresion
        const exprs = this.simplifyMyExpression(expr1,expr2,collection,dragItem,Connectors,machIndex,dragIndex,indexC,varsExpr1,varsExpr2,v,depend);
        const tempExpr1 = exprs[0];
        const tempExpr2 = exprs[1];
        
        console.log(tempExpr1.evaluate(),tempExpr2.evaluate(),'vals output')
        updateParamsConnectors(indexC,k,tempExpr1.evaluate(),tempExpr2.evaluate(),'output');
        next = this.assingValuesToNext(id,lines,Connectors,tempExpr1.evaluate(),tempExpr2.evaluate(),updateParamsConnectors,next);
        
    }
    return next;
}
/*------------------------------------------------------------------------------------------------*/
addInputs(Connectors,lines,indexC,next,updateParamsConnectors,v){
        
        let param1 = 0;
        let param2 = 0;
        for(let i = 0; i < Connectors[indexC].inConnectors.length; i++){
            
            
                param1 = param1 + Connectors[indexC].inConnectors[i].param1[v].y;
                param2 = param2 + Connectors[indexC].inConnectors[i].param2[v].y;
  
        }
        updateParamsConnectors(indexC,0,param1,param2,'output');
        next = this.assingValuesToNext(Connectors[indexC].outConnectors[0].id,lines,Connectors,param1,param2,updateParamsConnectors,next);
       
        //Buscamos el que le sigue al sumador
      return next;
};
/*------------------------------------------------------------------------------------------------*/
simplifyMyExpression(expr1,expr2,collection,dragItem,Connectors,machIndex,dragIndex,indexC,varsExpr1,varsExpr2,v,depend){
    let exprs = [];
    exprs[0] = expr1;
    exprs[1] = expr2;
    for(let p = 0; p < collection[machIndex].inSelected.length; p++){
        if(depend === 'dependOnRandomInputs'){

            exprs = this.paramsDependOnRandomVals(collection,machIndex,exprs[0],exprs[1],varsExpr1,varsExpr2,p);
            console.log(exprs[0].variables(),exprs[1].variables())
        }else{
            if(depend === 'dependOnDragItem'){
                exprs =  this.paramsDependOnMachinesVals(dragItem,Connectors,dragIndex,indexC,expr1,expr2,varsExpr1,varsExpr2,p,v);
            }
        }
        
                                 
    }
        
        return exprs;
}
/*-------------------------------------------------------------------------------------------------------------------*/
paramsDependOnRandomVals(collection,machIndex,expr1,expr2,varsExpr1,varsExpr2,p){
      const exprs = [];
     //Si la entrada es tipo agua va mirar si las expresiones tiene la variable FA o TA para remplazarla por su valor.
     console.log(collection[machIndex].inSelected[p],'tipo')
     console.log(expr1.variables(),expr2.variables())
      if(collection[machIndex].inSelected[p] === 'agua'){
           const Var1 = 'FA' + p;
           const Var2 = 'TA' + p;
           //si la variable FA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
           //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var1) != -1 ){
              const val = Math.floor((Math.random() * 150) + 50);
              expr1 = expr1.simplify({ [Var1]: val })
          }
          //si la variable TA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var2) != -1 ){
              const val = Math.floor((Math.random() * 120) + 90);
              expr1 = expr1.simplify({ [Var2]: val })
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var1) != -1 ){
              const val = Math.floor((Math.random() * 150) + 50);
              expr2 = expr2.simplify({ [Var1]: val })
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var2) != -1 ){
              const val = Math.floor((Math.random() * 120) + 90);
              expr2 = expr2.simplify({ [Var2]: val })
          }
      }else{
               //Si la entrada es tipo gas va mirar si las expresiones tiene la variable FG o TG para remplazarla por su valor.
               if(collection[machIndex].inSelected[p] === 'gas'){
                   const Var1 = 'FG' + p;
                   const Var2 = 'TG' + p;
                   if(varsExpr1.indexOf(Var1) != -1 ){
                      const val = Math.floor((Math.random() * 150) + 50);
                      expr1 = expr1.simplify({ [Var1]: val })
                   }
                   if(varsExpr1.indexOf(Var2) != -1 ){
                      const val = Math.floor((Math.random() * 120) + 90);
                      expr1 = expr1.simplify({ [Var2]: val })
                   }
                   if(varsExpr2.indexOf(Var1) != -1 ){
                      const val = Math.floor((Math.random() * 150) + 50);
                      expr2 = expr2.simplify({ [Var1]: val })
                    }
                  if(varsExpr2.indexOf(Var2) != -1 ){
                      const val = Math.floor((Math.random() * 120) + 90);
                      expr2 = expr2.simplify({ [Var2]: val })
                   }
                }else{
                        //Si la entrada es tipo electricidad va mirar si las expresiones tiene la variable V o A para remplazarla por su valor.
                        if(collection[machIndex].inSelected[p] === 'electricidad'){
                               const Var1 = 'A' + p;
                               const Var2 = 'V' + p;
                               if(varsExpr1.indexOf(Var1) != -1 ){
                                  const val = Math.floor((Math.random() * 60) + 20);
                                  expr1 = expr1.simplify({ [Var1]: val })
                               }
                               if(varsExpr1.indexOf(Var2) != -1 ){
                                  const val = Math.floor((Math.random() * 220) + 200);
                                  expr1 = expr1.simplify({ [Var2]: val })
                               }
                                if(varsExpr2.indexOf(Var1) != -1 ){
                                  const val = Math.floor((Math.random() * 60) + 20);
                                  expr2 = expr2.simplify({ [Var1]: val })
                                }
                                if(varsExpr2.indexOf(Var2) != -1 ){
                                  const val = Math.floor((Math.random() * 220) + 200);
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

paramsDependOnMachinesVals(dragItem,Connectors,dragIndex,indexC,expr1,expr2,varsExpr1,varsExpr2,p,v){
    
     const exprs = [];
     //Si la entrada es tipo agua va mirar si las expresiones tiene la variable FA o TA para remplazarla por su valor.
      if(dragItem[dragIndex].inSelected[p] === 'agua'){
           const Var1 = 'FA' + p;
           const Var2 = 'TA' + p;
           //si la variable FA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
           //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var1) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param1[v].y;
              expr1 = expr1.simplify({ [Var1]: val });
          }
          //si la variable TA + p(numero de la entrada) esta en la expr1, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr1.indexOf(Var2) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param2[v].y;
              expr1 = expr1.simplify({ [Var2]: val });
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var1) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param1[v].y;
              expr2 = expr2.simplify({ [Var1]: val });
          }
          //si la variable FA + p(numero de la entrada) esta en la expr2, coge el valor v del array de flujo 
          //de esa entrada y lo remplaza
          if(varsExpr2.indexOf(Var2) != -1 ){
              const val = Connectors[indexC].inConnectors[p].param2[v].y;
              expr2 = expr2.simplify({ [Var2]: val });
          }
      }else{
               //Si la entrada es tipo gas va mirar si las expresiones tiene la variable FG o TG para remplazarla por su valor.
               if(dragItem[dragIndex].inSelected[p] === 'gas'){
                   const Var1 = 'FG' + p;
                   const Var2 = 'TG' + p;
                   if(varsExpr1.indexOf(Var1) != -1 ){
                      const val = Connectors[indexC].inConnectors[p].param1[v].y;
                      expr1 = expr1.simplify({ [Var1]: val })
                   }
                   if(varsExpr1.indexOf(Var2) != -1 ){
                       const val = Connectors[indexC].inConnectors[p].param2[v].y;
                      expr1 = expr1.simplify({ [Var2]: val })
                   }
                   if(varsExpr2.indexOf(Var1) != -1 ){
                       const val = Connectors[indexC].inConnectors[p].param1[v].y;
                      expr2 = expr2.simplify({ [Var1]: val })
                    }
                  if(varsExpr2.indexOf(Var2) != -1 ){
                       const val = Connectors[indexC].inConnectors[p].param2[v].y;
                      expr2 = expr2.simplify({ [Var2]: val })
                   }
                }else{
                        //Si la entrada es tipo electricidad va mirar si las expresiones tiene la variable V o A para remplazarla por su valor.
                        if(dragItem[dragIndex].inSelected[p] === 'electricidad'){
                               const Var1 = 'A' + p;
                               const Var2 = 'V' + p;
                               if(varsExpr1.indexOf(Var1) != -1 ){
                                   const val = Connectors[indexC].inConnectors[p].param1[v].y;
                                  expr1 = expr1.simplify({ [Var1]: val })
                               }
                               if(varsExpr1.indexOf(Var2) != -1 ){
                                   const val = Connectors[indexC].inConnectors[p].param2[v].y;
                                  expr1 = expr1.simplify({ [Var2]: val })
                               }
                                if(varsExpr2.indexOf(Var1) != -1 ){
                                   const val = Connectors[indexC].inConnectors[p].param1[v].y;
                                  expr2 = expr2.simplify({ [Var1]: val })
                                }
                                if(varsExpr2.indexOf(Var2) != -1 ){
                                  const val = Connectors[indexC].inConnectors[p].param2[v].y;
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
findIndexArray(id,array){
    var indexC = -1;
    for (let i = 0; i < array.length; i++){
        if(id === array[i].id){
            indexC = i;
            return indexC;
        }
    }
    
    return indexC;
};

findIndexMachine(id,array){
    var indexC = -1;
    for (let i = 0; i < array.length; i++){
        if(id === array[i].machineId){
            indexC = i;
            return indexC;
        }
    }
    return indexC;
};

/*-------------------------------------------------------------------------------------------------------------------*/
assingValuesToNext(id,lines,Connectors,param1,param2,updateParamsConnectors,next){
    //le asignamos los valores de param1 y param2 a la entrada conectada al id de salida
    let indexC;
    let sw = 0;
        for (let i = 0; i < lines.length; i++){
            //encontramos el id en lines que sea igual al id de salida que ya tenemos
                if(id === lines[i].idOut){

                   indexC = this.findIndexArray(lines[i].idSourceIn,Connectors);
                   //Guardarmos los id de las máquinas a las que les hallamos los valores de entrada
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

export default Main;






