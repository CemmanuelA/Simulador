import { createStore, combineReducers, applyMiddleware } from 'redux';
import showReducer from './Reducers/showReducer.jsx';
import machineReducer from './Reducers/machineReducer.jsx';
import propertiesReducer from './Reducers/propertiesReducer.jsx';

const reducers = combineReducers({
    show: showReducer,
    machine: machineReducer,
    properties: propertiesReducer
});

/*const thunk = store => next => action =>{
    typeof action === 'function' ? action
    (store.dispatch) : next (action);
};*/

export default createStore(reducers);