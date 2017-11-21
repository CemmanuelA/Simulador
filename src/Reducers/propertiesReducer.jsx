const propertiesReducer = (state={
      valueIn: "Entrada 0",
      valueOut: "Salida 0 ",
      collection: [],
      indexIn:0,
      indexOut:0
      },action) => {
          
          
        if(action.type === "CHANGE_INPUTS_PROPERTIES"){
            const target = action.event.target;
            const value = target.value;
            const inputName = target.name;
            
            for (let i=0; i < action.limit ; i++) {
                if(inputName ==="valueIn"){
                    if(value ==="Entrada "+i){
                       return Object.assign({},state,{[inputName]:value, indexIn:i}) 
                    }
                }else{
                    if(value ==="Salida "+i){
                       return Object.assign({},state,{[inputName]:value, indexOut:i}) 
                    }
                }
            }
        }
        if(action.type === 'ON_CLICK_LIST_ITEM'){
           return Object.assign({},state,{indexOut:0, indexIn:0,valueIn: "Entrada 0",valueOut: "Salida 0 ",})
        }
        
        return state;
    
};

export default propertiesReducer;