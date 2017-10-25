const propertiesReducer = (state={
      valueIn: "Entrada 0",
      valueOut: "Salida 0 ",
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
                        console.log(i);
                        debugger;
                       return Object.assign({},state,{[inputName]:value, indexIn:i}) 
                    }
                }else{
                    if(value ==="Salida "+i){
                       return Object.assign({},state,{[inputName]:value, indexOut:i}) 
                    }
                }
            }
                
            
                
        
        }
        
        return state;
    
};

export default propertiesReducer;