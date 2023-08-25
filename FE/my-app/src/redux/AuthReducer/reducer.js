
const initialSate={
    token:"",
    isAuth:false,
    isLOading:false,
    isError:false
}

export const reducer = (state=initialSate,{type,payload})=>{
    switch(type){
        case 'LOGIN_SUCCESSS':{
            return {
                ...state,
                isAuth:true,
                token:payload,
                isLoading:false
            }
        }
        case 'LOGIN_FAILED':{
            return {
                ...state,
                isError:true,
                isLoading:false
            }
        }
            case 'LOGIN_REQUEST':{
                return {
                    ...state,
                    isLoading:true
                }
            }

        default: return state
    }
}