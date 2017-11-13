
const showReducer= (state = {
        showMachine: false,
        showProcess: false,
        showWater:false,
        showGas:false,
        showElectricity:false,
        showProperties: null
        
        }, action) => {
    
    switch (action.type) {
        
        case 'SHOW_MACHINE': {
           
           return {showMachine: action.show};
           
            
        }
        case 'SHOW_OTHER_PROCESS':{
            return {showProcess: action.show};
        }
        case 'SHOW_PROPERTIES':{
            
            return{ showProperties: action.id};
            
        }
            
         case 'SHOW_WATER':{
            
            return{ showWater: action.show};
             
         }
            
        case 'SHOW_GAS':{
            
            return{ showGas: action.show};
            
        }
            
        case 'SHOW_ELECTRICITY':{
            
            return{ showElectricity: action.show};
            
        }
            
            
            
        default: return state;
     }
     
    
    
    
    
}

export default showReducer;
