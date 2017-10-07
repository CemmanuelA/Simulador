
const initialState = {
    name:'',
    inputs: 1,
    outputs: 1,
    inSelected:["agua"],
    outSelected:["agua"],
    collection: [],
    index: [],
    machineId:1
};





const machineReducer= (state = initialState, action) => {
    
    if (action.type === 'CREATE_MACHINE') {
        action.event.preventDefault();
        
        
        console.log(state);
        state={
           state: [initialState],
           
            collection: [
              ...state.collection,
              {
                  name: state.name,
                  inputs: state.inputs,
                  outputs: state.outputs,
                  inSelected: state.inSelected,
                  outSelected: state.outSelected,
              }
            ],
            index: [
                ...state.index,
                state.machineId
            ],
            machineId:state.machineId+1
        };
        console.log(state);
        console.log(state.collection);
        console.log(state.index);
        console.log(state.machineId);
        debugger
        return state
       
    }
    
    if (action.type === "CHANGE_MACHINE") {
       
            action.event.preventDefault();
            const target = action.event.target;
            const inputName = target.name;
            const key = action.key;

            if(inputName === "inSelected"){
                
                 const value = target.value.toLowerCase();
                 const array = state.inSelected.slice();
                 array[key] = value;
                 return Object.assign({},state,{[inputName]:array});
                
            }else if(inputName === "outSelected"){
                
                 const value = target.value.toLowerCase();
                 const array = state.outSelected.slice();
                 array[key] = value;
                 return Object.assign({},state,{outSelected:array});
                 
            }else{
                
                  const value = target.value;
                  return Object.assign({},state,{[inputName]:value});
            }
       
        
     
     
    
    }
   
    return state;
    
};
export default machineReducer;