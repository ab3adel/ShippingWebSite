import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import addressReducer from './addressReducer'
const reducers = combineReducers({
    profile: profileReducer,
    address:addressReducer
})
export default reducers