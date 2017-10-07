
const showReducer= (state = {
        showMachine: false,
        showProcess: false,
        showProperties: false
        }, action) => {
    
    switch (action.type) {
        case 'SHOW_MACHINE': {
           
           return {showMachine: action.show};
           
            
        }
        case 'SHOW_OTHER_PROCESS':{
            return {showProcess: action.show}
        }
        default: return state;
     }
    
    
    
    
}
export default showReducer;
