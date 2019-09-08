import {createStore, combineReducers} from 'redux';
import {ColReducer} from './reducers/Col'
const reducers = combineReducers({ Col: ColReducer});
const store = createStore(reducers);

export default store;