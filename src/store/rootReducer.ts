import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import categoryReducer from "./category.slice";


const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
});

export default rootReducer;
