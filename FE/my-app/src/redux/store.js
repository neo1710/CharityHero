import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {reducer as authReducer} from "./AuthReducer/reducer"
import {reducer as requestReducer} from "./RequestReducer/reducer"
import thunk from "redux-thunk"
const rootReducer= combineReducers({authReducer,requestReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))