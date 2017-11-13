const initialState={
    inAdderWater: 1,
    outAdderWater: 1,
    inAdderGas: 1,
    outAdderGas: 1,
    inAdderElectricity: 1,
    outAdderElectricity: 1,
    dragItemWater:[],
    dragItemGas:[],
    dragItemElectricity:[],
    waterIndex:0,
    gasIndex:0,
    electricityIndex:0
    
    
};

const adderReducer = (state=initialState,action) =>{
    let target = null;
    let inputName = null;
    let value = null;
    let index = null;
    let array = null;
    let x = null;
    let y = null;
    let source= null;
  switch (action.type) {
    
      case 'CHANGE_ADDER':
            action.event.preventDefault();
            target = action.event.target;
            inputName = target.name;
            value = target.value;
            if((inputName === 'inAdderWater' && value < 1) || (inputName === 'outAdderWater' && value < 1) ||
                (inputName === 'inAdderGas' && value < 1) || (inputName === 'outAdderGas' && value < 1) ||
                 (inputName === 'inAdderElectricity' && value < 1) || (inputName === 'outAdderElectricity' && value < 1)){
                value = 1;
            }
            
            return Object.assign({},state,{[inputName]:value});

     case 'CREATE_ADDER_WATER':
         
            action.event.preventDefault();
            return Object.assign({},state,{
                    dragItemWater:[     ...state.dragItemWater,
                                        {
                                            id:'dragW'+ state.waterIndex ,
                                            name:'A' + state.waterIndex ,
                                            inputs: state.inAdderWater,
                                            outputs: state.outAdderWater,
                                            left:10,
                                            top:10
                                        }
                                        
                                    ],
                    inAdderWater:1,
                    outAdderWater:1,
                    waterIndex:state.waterIndex + 1
                    
            });
            
    case 'CREATE_ADDER_GAS':
         
            action.event.preventDefault();
            return Object.assign({},state,{
                    dragItemGas:[     ...state.dragItemGas,
                                        {
                                            id:'dragG'+ state.gasIndex ,
                                            name:'G' + state.gasIndex ,
                                            inputs: state.inAdderGas,
                                            outputs: state.outAdderGas,
                                            left:10,
                                            top:10
                                        }
                                        
                                    ],
                    inAdderGas:1,
                    outAdderGas:1,
                    gasIndex:state.gasIndex + 1
                    
            });
            
    case 'CREATE_ADDER_ELECTRICITY':
         
            action.event.preventDefault();
            return Object.assign({},state,{
                    dragItemElectricity:[     ...state.dragItemElectricity,
                                        {
                                            id:'dragE'+ state.electricityIndex ,
                                            name:'E' + state.electricityIndex ,
                                            inputs: state.inAdderElectricity,
                                            outputs: state.outAdderElectricity,
                                            left:10,
                                            top:10
                                        }
                                        
                                    ],
                    inAdderElectricity:1,
                    outAdderElectricity:1,
                    electricityIndex:state.electricityIndex + 1
                    
            });
    case 'UPDATE_ADDER_POSITION':
                        
                     index = action.index;
                     source = action.source;
                     x = action.left;
                     y = action.top;
                     
                     if(source === 'water'){
                         array = state.dragItemWater.slice();
                         array[index].left = x;
                         array[index].top = y;
                         return Object.assign({},state,{dragItemWater:array});
                     }else{
                         
                             if(source === 'gas'){
                                 array = state.dragItemGas.slice();
                                 array[index].left = x;
                                 array[index].top = y;
                                 return Object.assign({},state,{dragItemGas:array});
                             }else{
                                    if(source === 'electricity'){
                                         array = state.dragItemElectricity.slice();
                                         array[index].left = x;
                                         array[index].top = y;
                                         return Object.assign({},state,{dragItemElectricity:array});
                                     }
                             }
                     }
                     
            
      
      default:
          return state;
  }  
    
} ;

export default adderReducer;