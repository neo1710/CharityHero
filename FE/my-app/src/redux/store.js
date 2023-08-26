import {applyMiddleware, combineReducers, legacy_createStore} from "redux"
import {reducer as authReducer} from "./AuthReducer/reducer"
import {donateHistoryReducer, reducer as requestReducer} from "./RequestReducer/reducer"
import thunk from "redux-thunk"
const rootReducer= combineReducers({authReducer,requestReducer,donateHistoryReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))