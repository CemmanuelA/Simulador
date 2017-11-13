const initialState = {
    Connectors:[],
    inConnectors:[],
    outConnectors:[],
    lines:[],
    
};

const connectorsReducer = (state = initialState,action) =>{
    
    
      let id = null;
      let array = null;
      let array2 = null;
      let indexIn = null;
      let idOut = null;
      let indexC = null;
      let x0 = null;
      let x1 = null;
      let y0 = null;
      let y1 = null;
      let idIn = null;
      let source = null;
      let index = null;
      let idSourceIn = null;
      let idSourceOut = null;
      switch (action.type) {
          
          case 'CREATE_CONNECTOR':
               source = action.source;
               id = action.id;
               index = action.index;
                    if(source === 'input'){
                        
                        id = id + '-In' + index.toString();
                        for(let i = 0; i < state.inConnectors.length; i++ ){
                                
                            if(state.inConnectors[i].id == id){
                                       return state;
                            } 
            
                        }
                        return Object.assign({},state,{
                            inConnectors:[...state.inConnectors,
                                          {
                                              id:id,
                                              canDrop:true,
                                              top:0,
                                              left:0,
                                              val:0
                                          }
                                         
                            
                                            ]
                            
                        });
                    }else{
                           if(source === 'output'){
                                id = id + '-Out' + index.toString();
                            for(let i = 0; i < state.outConnectors.length; i++ ){
                                    
                                 if(state.outConnectors[i].id == id){
                                           return state;
                                 } 
            
                            }
                            
                            return Object.assign({},state,{
                                outConnectors:[...state.outConnectors,
                                              {
                                                  id:id,
                                                  top:0,
                                                  left:0,
                                                  val:0,
                                              }
                                
                                                ]
                                
                            });
                           }
            
                        }
        
        case 'CREATE_COLLECTION':
                    array = state.inConnectors.slice();
                    array2 = state.outConnectors.slice();
                    id = action.id;
                    for(let i = 0; i < state.Connectors.length; i++ ){
                            
                            if(state.Connectors[i].id == id){
                                       return state;
                            } 
            
                    }
                    return Object.assign({},state,{
                            Connectors:[...state.Connectors,
                                          {
                                             id:id,
                                             inConnectors:array,
                                             outConnectors:array2,
                                             
                                          }
                            
                                        ],
                                        
                           inConnectors:[],
                           outConnectors:[]
                        
                        
                    })
                    
        case 'CREATE_LINE':
            
                    indexIn = action.indexIn;
                    idOut = action.idOut;
                    idSourceIn = action.idSourceIn;
                    idSourceOut = action.idSourceOut;
                    array = state.Connectors.slice();
                    x0 = action.x0;
                    x1 = action.x1;
                    y0 = action.y0;
                    y1 = action.y1;
                    for (let i = 0; i< array.length; i++) {
                        if(array[i].id === idSourceIn){
                            indexC = i;
                            break;
                        }
                    }
                    idIn = array[indexC].inConnectors[indexIn].id;
                    if(array[indexC].inConnectors[indexIn].canDrop == true){
                        array[indexC].inConnectors[indexIn].canDrop = false;
                        
                        return Object.assign({},state,{
                                    
                                    lines:[
                                            ...state.lines,
                                            {
                                                idSourceIn:idSourceIn,
                                                idSourceOut:idSourceOut,
                                                idIn: idIn,
                                                idOut: idOut,
                                                x0: x0,
                                                y0: y0,
                                                x1: x1,
                                                y1: y1       
                                                
                                            }
                                            
                                          ],
                                    Connectors: array,
                                    inConnectors:[],
                                    outConnectors:[]
                                    
                                    
                                });
                        
                        
                    }
                    return state;
        
        case 'UPDATE_CONNECTOR_POSITION':
            
                source = action.source;
                index = action.index;
                id = action.id;
                array = state.Connectors.slice();
                let top = action.top;
                let left = action.left;
                    if(source === 'input'){
                        
                        for (let i = 0; i < array.length;i++) {
                                
                                if(array[i].id === id ){
                                    array[i].inConnectors[index].top = top;
                                    array[i].inConnectors[index].left = left;
                                    return Object.assign({},state,{Connectors:array});
                                }
                            
                        }
                            
                    }else{
                        for (let i = 0; i < array.length;i++) {
                                
                                if(array[i].id === id ){
                                    array[i].outConnectors[index].top = top;
                                    array[i].outConnectors[index].left = left;
                                    return Object.assign({},state,{Connectors:array});
                                }
                            
                        }
                        
                    }
                    
        case 'UPDATE_LINE_POSITION':
            
                id = action.id;
                indexC = action.indexC;
                array = state.lines.slice();
                array2 = state.Connectors.slice();
                 for (let i = 0; i < array.length;i++) {
                                
                        if(array[i].idSourceIn === id ){
                                  
                            for (let j = 0; j < array2.length; j++) {
                                       
                                    if(array2[indexC].inConnectors[j].id === array[i].idIn){
                                           
                                           array[i].x1 = array2[indexC].inConnectors[j].left + 3 ;
                                           array[i].y1 = array2[indexC].inConnectors[j].top + 3;
                                           break;
                                     }
                            }
                        }else{
                                if(array[i].idSourceOut === id ){
                                    for (let j = 0; j < array2.length; j++) {
                                           
                                            if(array2[indexC].outConnectors[j].id === array[i].idOut){
                                            
                                               array[i].x0 = array2[indexC].outConnectors[j].left + 3;
                                               array[i].y0 = array2[indexC].outConnectors[j].top + 3;
                                               break;
                                            }
                                    }
                            
                                }
                            
                        }
                 }
                 
                 return Object.assign({},state,{lines:array});
          
          default: return state
      }


};


export default connectorsReducer;