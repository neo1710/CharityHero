import axios from "axios"
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
        const updatedRequest = updatedRequests.find((ele) => ele._id === payload.id);

        // Send a patch request with the updated request to the server endpoint
        axios.patch(`https://ivory-ox-kilt.cyclic.cloud/donation/edit/${payload.id}`, updatedRequest)
             .then(response => {
                 console.log('PATCH request successful', response.data);
                 // You can perform additional actions if needed
             })
             .catch(error => {
                 console.error('PATCH request error', error);
                 // Handle the error if the PATCH request fails
             });
    
        return { ...state, requests: updatedRequests };
        }
        
        default: return state
    }
}