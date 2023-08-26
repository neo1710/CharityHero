import axios from "axios"
import { DONATION_REQUEST, DONATION_REQUEST_FAILURE, DONATION_REQUEST_SUCCESS,DONATED } from "../actionTypes"

export const getDonationRequestData=(payload)=> async (dispatch)=>{
    const queryObj={}
    //array of categories

    // if(payload.category.length>0){
    //     queryObj.category=payload.category
    // }
    if(payload.order){
        queryObj.order=payload.order
        queryObj.sort = payload.sort
    }
    if(payload.goal){
        queryObj.goal=payload.goal
    }
    if(payload.matched){
        queryObj.matched = payload.matched
    }
    if(payload.raised===0){
        queryObj.raised = payload.raised
    }
    if(payload.search){
        queryObj.searched = payload.search
    }
    if(payload.page){
        queryObj.page = payload.page
        queryObj.limit = 5
    }
    console.log(queryObj)
    dispatch({type:DONATION_REQUEST})
    try {
        await axios.get(`https://ivory-ox-kilt.cyclic.cloud/donation/request${payload.category.length>0?`?category=${JSON.stringify(payload.category)}`:""}`,{params:{
            ...queryObj
        }}).then((res)=>{
            console.log(res)
            dispatch({type:DONATION_REQUEST_SUCCESS,payload:[res.data.data,res.data.totalCount]})
        }) 
    } catch (error) {
        console.log(error)
        dispatch({type:DONATION_REQUEST_FAILURE})
        throw error
    }
}


// All Data ofter Checkout 

export const PostDonationData=payload=> dispatch=>{
  axios.post("https://ivory-ox-kilt.cyclic.cloud/history/create",payload).then(res=>{
    console.log(res);
    dispatch({type:DONATED,payload:{amaunt:res.data.amount,id:res.data._id}})
 }).catch(err=>{
    console.log("error")
 })
}

