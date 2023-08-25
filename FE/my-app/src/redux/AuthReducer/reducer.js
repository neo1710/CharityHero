
const initialSate={
    token:"",
    isAuth:false,
    isLOading:false,
    userId:"",
    username:"",
    orgName:"",
    isError:false
}

export const reducer = (state=initialSate,{type,payload})=>{
    switch(type){
        case 'LOGIN_SUCCESS':{
            return {
                ...state,
                isAuth:true,
                token:payload.token,
                userId:payload.id,
                username:payload.name,
                orgName:payload.organizationName,
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