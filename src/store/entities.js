import {combineReducers} from "redux";
import shopReducer from './shop';
// import userReducer from "./user";
// import dataReducer from "./data";

export default combineReducers({
    shop: shopReducer,
    // user:userReducer,
    // data:dataReducer,
})