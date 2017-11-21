const initialState = {
    Connectors:[],
    inConnectors:[],
    outConnectors:[],
    lines:[],
    label:1,
    v:0,
    newSimulation:false
    
};

const connectorsReducer = (state = initialState,action) =>{
    
    
      let id = null;
      let array = null;
      let array2 = null;
      let indexIn = null;
      let idOut = null;
      let indexC = null;
      let indexO = null;
      let x0 = null;
      let x1 = null;
      let y0 = null;
      let y1 = null;
      let idIn = null;
      let source = null;
      let index = null;
      let idSourceIn = null;
      let idSourceOut = null;
      let param1 = null;
      let param2 = null;
      let canCreateLine = null;
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
                                              param1:[],
                                              param2:[]
                                              
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
                                                  param1:[],
                                                  param2:[],
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
                    array2 = state.lines.slice();
                    x0 = action.x0;
                    x1 = action.x1;
                    y0 = action.y0;
                    y1 = action.y1;
                    canCreateLine = true;
                    for (let i = 0; i< array.length; i++) {
                        if(array[i].id === idSourceIn){
                            indexC = i;
                            break;
                        }
                    }
                    for (let i = 0; i< array2.length; i++) {
                        if(array2[i].idOut === idOut){
                            canCreateLine = false;;
                            break;
                        }
                    }
                    idIn = array[indexC].inConnectors[indexIn].id;
                    if(array[indexC].inConnectors[indexIn].canDrop == true && canCreateLine && idSourceIn != idSourceOut){
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
                                  
                            for (let j = 0; j < array2[indexC].inConnectors.length; j++) {
                                       
                                    if(array2[indexC].inConnectors[j].id === array[i].idIn){
                                           
                                           array[i].x1 = array2[indexC].inConnectors[j].left + 3 ;
                                           array[i].y1 = array2[indexC].inConnectors[j].top + 3;
                                           break;
                                     }
                            }
                        }else{
                                if(array[i].idSourceOut === id ){
                                    for (let j = 0; j < array2[indexC].outConnectors.length; j++) {
                                           
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
                 
        case 'DELETE_CONNECTOR':
               id = action.id;
               array2 = action.idToDelete.slice();
               array = state.Connectors.slice();
               source = action.source;
               if(action.source === 'zone'){
                   for (let i = 0; i < array.length; i++) {
                       if(array[i].id === id){
                           array.splice(i,1);
                           break;
                       }
                    }
                    return Object.assign({},state,{Connectors:array});
               }else{
                   if(action.source === 'list'){
                         let sw = 0;
                         while(sw == 0){
                             for(let i = 0 ; i < array.length ; i++){
                                if(array2.indexOf(array[i].id) != -1){
                                     array.splice(i,1);
                                      break;
                                 }
                                if(i == array.length-1){
                                    sw = 1;
                                 }
                             }
                                if(array.length == 0){
                                    sw = 1;
                                }
                         };
                         return Object.assign({},state,{Connectors:array});
                   }
               }
        case 'DELETE_LINE':
            const idToDelete = action.idToDelete.slice();
            id = action.id;
            array = state.lines.slice();
            array2 = state.Connectors.slice();
            source = action.source
            index = [];
            idIn = [];
            if(source === 'zone'){
                
                  for (let i = 0; i < array.length; i++) {
                   if(array[i].idSourceIn === id ){
                       index.push(i);
                       idIn.push(array[i].idIn)
                       
                   }else{
                       if(array[i].idSourceOut === id){
                           index.push(i)
                           idIn.push(array[i].idIn)
                       }
                   }
                }
             
            }else{
                if(source ==='list'){
                    
                       for (let i = 0; i < array.length; i++) {
                       if(idToDelete.indexOf(array[i].idSourceIn) != 1 ){
                           index.push(i);
                           idIn.push(array[i].idIn)
                           
                       }else{
                           if(idToDelete.indexOf(array[i].idSourceOut) != 1 ){
                               index.push(i)
                               idIn.push(array[i].idIn)
                           }
                       }
                    }
                    
                }else{
                    if(source === 'line'){
                        idIn.push(array[id].idIn)
                        index.push(id)
                    }
                }
            }
             for (let i = index.length -1; i >= 0; i--){
                        array.splice(index[i],1);
                     
              }
             for(let i = 0; i < array2.length; i++){
                 
                for(let j = 0; j < array2[i].inConnectors.length ; j++){
                   let d = idIn.indexOf(array2[i].inConnectors[j].id);

                   if( d !=  -1){
                       
                        array2[i].inConnectors[j].canDrop = true;
                    }
                 
                } 
             }
             return Object.assign({},state,{lines:array,Connectors:array2});
        case 'UPDATE_PARAMS_CONNECTORS':
               indexC = action.indexC;
               index =  action.index;
               param1 = action.param1;
               param2 = action.param2;
               source = action.source;
               array =  state.Connectors.slice();
               if(source === 'output'){
                   array[indexC].outConnectors[index].param1.push({x:state.label,y:param1});
                   array[indexC].outConnectors[index].param2.push({x:state.label,y:param2});

                   return Object.assign({},state,{Connectors:array});
               }else{
                   array[indexC].inConnectors[index].param1.push({x:state.label,y:param1});
                   array[indexC].inConnectors[index].param2.push({x:state.label,y:param2});
                   return Object.assign({},state,{Connectors:array});
               }
        case 'UPDATE_LABEL':
            return Object.assign({},state,{label:state.label+1})
            
        case 'UPDATE_INDEX_VALUE':
            return Object.assign({},state,{v:action.v})
            
        case 'NEW_SIMULATION':
            array = state.Connectors.slice();
            for(let i = 0; i < array.length; i++){
                for(let j = 0; j < array[i].outConnectors.length; j++){
                    array[i].outConnectors[j].param1 = []
                    array[i].outConnectors[j].param2 = []
                }
                for(let j = 0; j < array[i].inConnectors.length; j++){
                    array[i].inConnectors[j].param1 = []
                    array[i].inConnectors[j].param2 = []
                }
            }
            return Object.assign({},state,{Connectors:array,v:0,label:1,newSimulation:true})
        case 'CHANGE_VALUE_SIMULATION':
             return Object.assign({},state,{newSimulation:false})
          
          default: return state
    }
      


};


export default connectorsReducer;