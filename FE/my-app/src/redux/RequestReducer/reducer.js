import { DONATED, DONATION_REQUEST, DONATION_REQUEST_FAILURE, DONATION_REQUEST_SUCCESS } from "../actionTypes"
const initState={
    isLoading:false,
    isError:false,
    requests:[],
    totalButtons:0
}

export const reducer = (state=initState,{type,payload})=>{
    switch(type){
        case DONATION_REQUEST:{
            return {...state,isLoading:true,isError:false}
        }
        case DONATION_REQUEST_FAILURE:{
            return {...state,isLoading:false,isError:true}
        }
        case DONATION_REQUEST_SUCCESS:{
            return {...state,isLoading:false,requests:payload[0],totalButtons:Math.ceil(+payload[1]/5)}
        }

        case DONATED:{
            const updatedRequests = state.requests.map((ele) =>
            ele._id === payload.id
                ? {
                      ...ele,
                      raised: ele.raised + payload.amount,
                      matched: ele.raised + payload.amount >= ele.goal ? true : ele.matched
                  }
                : ele
        );

        // Send a patch request with the updated ele to the server endpoint here
        // You'll need to use a library like Axios or fetch to perform the HTTP request

        return { ...state, requests: updatedRequests };
        }
        
        default: return state
    }
}