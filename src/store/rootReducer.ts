import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import categoryReducer from "./category.slice";
import carReducer from "./car.slice";


const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	car: carReducer,
});

export default rootReducer;
