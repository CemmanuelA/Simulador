
const initialState = {
    name:'',
    inputs: 1,
    outputs: 1,
    inSelected:["agua"],
    outSelected:["agua"],
    collection: [],
    dragItem: [],
    process:'P1',
    index:0,
    update:false,
    rangeF:{
        min:100,
        max:500
    },
    rangeT:{
        min:50,
        max:150
    },
    rangeA:{
        min:100,
        max:400
    },
    rangeV:{
        min:100,
        max:300
    }
};


var idToUpdate;

const machineReducer= (state = initialState, action) => {
    
   
   
    let target = null;
    let inputName = null;
    let key = null;
    let value = null;
    let array = null;
    let array2 = null;
    let id = null;
    let machine = null;
    let inp = null;
    let out = null;
    let inSelect = null;
    let outSelect = null;
    let x = null;
    let y = null;
    let sw = null;
    let index = null;
    const valParams = [];
    const expresions = [];
    switch (action.type) {
       
        case 'CREATE_MACHINE':
                    
                   action.event.preventDefault();
                   if(state.update == true){
                       array = state.collection.slice();
                       array2 = state.dragItem.slice();
                       id = array[idToUpdate].machineId;
                       array[idToUpdate].name = state.name;
                       array[idToUpdate].inputs = state.inputs;
                       array[idToUpdate].outputs = state.outputs;
                       array[idToUpdate].inSelected = state.inSelected;
                       array[idToUpdate].outSelected = state.outSelected;
  
                        for(let i = 0 ; i < array2.length ; i++){
                                
                                if(array2[i].machineId === id){
                                        array2[i].name = state.name;
                                        array2[i].inSelected = state.inSelected;
                                        array2[i].outSelected = state.outSelected;
                                }
                        }
                                 

                            
                       return Object.assign({},state,{
                                
                                collection:array,
                                dragItem:array2,
                                name:'',
                                inputs: 1,
                                outputs: 1,
                                inSelected:["agua"],
                                outSelected:["agua"],
                                update:false
                       });
                       
                   }else{
                       
                       
                       for (let i = 0; i < state.inputs ; i++) {
                                
                              const flow = [];
                              const temperature = [];
                              const volts = [];
                              const amperage = [];
                              if(state.inSelected[i] === "agua"){
                                  for(let j = 0; j < 100 ; j++) {
                                        
                                    flow.push(Math.round(Math.random() * (state.rangeF.max - state.rangeF.min) + state.rangeF.min));
                                    temperature.push(Math.round(Math.random() * (state.rangeT.max - state.rangeT.min) + state.rangeT.min));
                              
                                    }
                               valParams.push({flow,temperature}); 
                              }else{
                                  if(state.inSelected[i] === "gas"){
                                      
                                      for(let j = 0; j < 100 ; j++) {
                                        
                                        flow.push(Math.round(Math.random() * (state.rangeF.max - state.rangeF.min) + state.rangeF.min));
                                        temperature.push(Math.round(Math.random() * (state.rangeT.max - state.rangeT.min) + state.rangeT.min));
                              
                                    }
                                    valParams.push({flow,temperature}); 
                                      
                                  }else{
                                      if(state.inSelected[i] === "electricidad"){
                                          
                                          for(let j = 0; j < 100 ; j++) {
                                        
                                            amperage.push(Math.round(Math.random() * (state.rangeA.max - state.rangeA.min) + state.rangeA.min));
                                            volts.push(Math.round(Math.random() * (state.rangeV.max - state.rangeV.min) + state.rangeV.min));
                              
                                            }
                                          valParams.push({amperage,volts});     
                                      }
                                  }
                              } 
                           
                       }
                       
                       for (let i =0;i < state.outputs; i++) {
                           expresions.push('');
                       }
                       
                       
                       id = state.process + '-' + state.index.toString();
                            return {
                                    collection: [
                                      ...state.collection,
                                      {
                                          machineId: id,
                                          name: state.name,
                                          inputs: state.inputs,
                                          outputs: state.outputs,
                                          inSelected: state.inSelected,
                                          outSelected: state.outSelected,
                                          valParams: valParams,
                                          expresions: expresions
                                          
                                      }
                                    ],
                                    name:'',
                                    inputs: 1,
                                    outputs: 1,
                                    inSelected:["agua"],
                                    outSelected:["agua"],
                                    process:'P1',
                                    index:state.index + 1,
                                    dragItem: [ ...state.dragItem ],
                                    update:false,
                                    rangeF:{
                                        min:100,
                                        max:500
                                    },
                                    rangeT:{
                                        min:50,
                                        max:150
                                    },
                                    rangeA:{
                                        min:100,
                                        max:400
                                    },
                                    rangeV:{
                                        min:100,
                                        max:300
                                    }
                            
                        };
                       
                   }
                   
                
           
        case 'CHANGE_MACHINE':
        
                    action.event.preventDefault();
                    target = action.event.target;
                    inputName = target.name;
                    key = action.key;
        
                    if(inputName === "inSelected"){
                        
                         value = target.value.toLowerCase();
                        array = state.inSelected.slice();
                         array[key] = value;
                         return Object.assign({},state,{[inputName]:array});
                        
                    }else if(inputName === "outSelected"){
                        
                         value = target.value.toLowerCase();
                         array = state.outSelected.slice();
                         array[key] = value;
                         return Object.assign({},state,{[inputName]:array});
                         
                    }else{
                        
                          value = target.value;
                          
                          if(inputName === 'inputs' || inputName ==='outputs'){
                              if(value < 1){
                                  value = 1;
                                  
                              }
                          }
                          
                          if(inputName === 'inputs'){
                              array = initialState.inSelected.slice();
                              
                              for(let i = 1 ; i < value; i++){
                                  
                                  array.push("agua");
                            
                               }
                               return Object.assign({},state,{[inputName]:value,inSelected:array});
                               
                          } else if(inputName ==='outputs'){
                              
                              array = initialState.outSelected.slice();
                              
                              for(let i = 1 ; i < value; i++){
                                  
                                  array.push("agua");
                            
                               }
                              return Object.assign({},state,{[inputName]:value,outSelected:array});
                          }
                          
                          return Object.assign({},state,{[inputName]:value});
                    }
        case 'DELETE_MACHINE':
            
                     id = action.id;
                     array = state.collection.slice();
                     array2 = state.dragItem.slice();
                     sw = 0;
                    while(sw == 0){
                         for(let i = 0 ; i < array2.length ; i++){
                             if(array2[i].machineId === array[id].machineId){
                                 array2.splice(i,1);
                                  break;
                             }
                            if(i == array2.length-1){
                                sw = 1;
                            }
                        }
                         if(array2.length == 0){
                                sw = 1;
                            }
                    };
                    array.splice(id,1);
                     return Object.assign({},state,{collection:array, dragItem:array2});
                     
        case 'UPDATE_MACHINE':
                     id = action.id;
                     idToUpdate = id;
                     machine = state.collection[id].name;
                     inp = state.collection[id].inputs;
                     out = state.collection[id].outputs;
                     inSelect = state.collection[id].inSelected;
                     outSelect = state.collection[id].outSelected;

                     return Object.assign({},state,{
                         name:machine,
                         inputs:inp,
                         outputs:out,
                         inSelected:inSelect,
                         outSelected:outSelect,
                         update:true
                     });
        
        case 'CREATE_DRAG_ITEM':
                    id = action.id;
                    x = action.left;
                    y = action.top;
                    let idDragM = 'dragM'+state.dragItem.length;
                    return Object.assign({},state,{
                        dragItem:[
                                ...state.dragItem,
                                {
                                    id: idDragM,
                                    machineId: state.collection[id].machineId,
                                    name: state.collection[id].name,
                                    inSelected: state.collection[id].inSelected,
                                    outSelected: state.collection[id].outSelected,
                                    left: x,
                                    top: y
                                }
                            ]
                    });
                    
        case 'UPDATE_POSITION':
                        
                     index = action.index;
                     x = action.left;
                     y = action.top;
                     array = state.dragItem.slice();
                     array[index].left = x;
                     array[index].top = y;
                     return Object.assign({},state,{dragItem:array});
        
                    
        case 'CHANGE_EXPRESSION':
            target = action.e.target;
            value = target.value;
            array = state.collection.slice();
            array[action.indexM].expresions[action.indexO] = value;
            return Object.assign({},state,{collection:array});
                    
        default:
            return state;
    }
    
   
    
};
export default machineReducer;