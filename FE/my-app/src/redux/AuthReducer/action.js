import axios from 'axios';


export const loginReq=(data)=>(dispatch)=>{
dispatch({type:"LOGIN_REQUEST"});
axios.post(`https://ivory-ox-kilt.cyclic.cloud/user/login`,data).then((res)=>{
 console.log(res);   
dispatch({type:"LOGIN_SUCCESS",payload:res.data});
localStorage.setItem("token",JSON.stringify(res.data.token));
localStorage.setItem("rtoken",JSON.stringify(res.data.rtoken));
}).catch((err)=>{
dispatch({type:'LOGIN_FAILED'});
console.log(err);
})
}

export const logout=()=>(dispatch)=>{
    dispatch({type:"LOGIN_REQUEST"});
   let token= localStorage.getItem('token');
axios.get(`https://ivory-ox-kilt.cyclic.cloud/user/logout`,{
    headers:{Authorization:`Bearer ${token}`}
}).then((res)=>{
 console.log(res);   
dispatch({type:"LOGOUT_SUCCESS"});
}).catch((err)=>{
dispatch({type:'LOGIN_FAILED'});
console.log(err);
})
}