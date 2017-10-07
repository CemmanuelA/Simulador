import { createStore, combineReducers } from 'redux';
import showReducer from './Reducers/showReducer.jsx';
import machineReducer from './Reducers/machineReducer.jsx';

const reducers = combineReducers({
    show: showReducer,
    machine: machineReducer
});

export default createStore(reducers);