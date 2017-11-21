
const initialState = {
    name:'Máquina 0',
    inputs: 1,
    outputs: 1,
    inSelected:["agua"],
    outSelected:["agua"],
    collection: [],
    dragItem: [],
    process:'P1',
    index:0,
    indexD:0,
    update:false,
    disable:false
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
                                name:'Máquina' + (state.index + 1) ,
                                inputs: 1,
                                outputs: 1,
                                inSelected:["agua"],
                                outSelected:["agua"],
                                update:false,
                                disable:false
                       });
                       
                   }else{
                              
                       for (let i =0;i < state.outputs; i++) {
                           if(state.outSelected[i] === "agua"){
                               const param1 = 'FA0';
                               const param2 = 'TA0';
                               expresions.push({param1,param2});
                           }else{
                                if(state.outSelected[i] === "gas"){
                                   const param1 = 'FG0';
                                   const param2 = 'AG0';
                                   expresions.push({param1,param2});
                                }else{
                                    if(state.outSelected[i] === "electricidad"){
                                       const param1 = 'A0';
                                       const param2 = 'V0';
                                       expresions.push({param1,param2});
                                    }
                                }
                               
                           }
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
                                          expresions: expresions
                                          
                                      }
                                    ],
                                    name:'Máquina '+ (state.index + 1),
                                    inputs: 1,
                                    outputs: 1,
                                    inSelected:["agua"],
                                    outSelected:["agua"],
                                    process:'P1',
                                    index:state.index + 1,
                                    indexD:state.indexD,
                                    dragItem: [ ...state.dragItem ],
                                    update:false,
                                    disable:false
                            
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
                          }else{
                              if(inputName == ''){
                                  return Object.assign({},state,{disable:true});
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
            
                     index = action.index;
                     array = state.collection.slice();
                     array2 = state.dragItem.slice();
                     sw = 0;
                    while(sw == 0){
                         for(let i = 0 ; i < array2.length ; i++){
                             if(array2[i].machineId === array[index].machineId){
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
        case 'DELETE_DRAG_MACHINE':
            
                     index = action.index;
                     array = state.dragItem.slice();
                     array.splice(index,1);
                     return Object.assign({},state,{dragItem:array});
                     
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
                    let idDragM = 'dragM'+state.indexD;
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
                            ],
                        indexD: state.indexD + 1 
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
            inputName = target.name;
            array = state.collection.slice();
            if(inputName === 'param1'){
                array[action.indexM].expresions[action.indexO].param1 = value;
            }else{
                array[action.indexM].expresions[action.indexO].param2 = value;
            }
            return Object.assign({},state,{collection:array});
        
                    
        default:
            return state;
    }
    
   
    
};
export default machineReducer;