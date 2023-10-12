
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Progress, Select, Stack, Text, useEditableState } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"

const initState ={
    title:"",
    description:"",
    goal: 0,
    date: "",
    userID: "",
    name:"",
    organizationName: "",
    category: "",
    image:"",
    raised: "",
    matched: "",
    _id:""
}

const createState={
    title:"",
    description:"",
    goal: 0,
   // date: "",
   // userID: "",
   // name:"",
   // organizationName: "",
    category: "",
    image:""
  //  _id:""
}
//raised and match will not be editable
//handle numbers in create and patch requests


export default function UserPage(){
    const [formData,setFormData]= useState(initState)
    const [addFormData,setAddFormData] = useState(createState)

    const {username,orgName} = useSelector((store)=>{
        return {
            username: store.authReducer.username,
            orgName:store.authReducer.orgName
        }
    },shallowEqual)
   
    const [data,setData] = useState([])
    const dispatch = useDispatch()

    useEffect(()=>{
        getReq()
    },[])

    const handleEditClick = (payload)=>{
       
        setFormData(payload)
    }

    const getRefreshToken = (func,payload = null,id = null)=>{

        axios.get("https://ivory-ox-kilt.cyclic.cloud/regentoken",{
            headers:{
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("rtoken"))}`
            }
        }).then((res)=>{
            console.log(res)
            localStorage.setItem("token",JSON.stringify(res.data.regeneratedtoken))
            if(!id && !payload){
                func()
            }else if(id && payload){
                func(id,payload)
            }else if(id){
                func(id)
            }else if(payload){
                func(payload)
            }
        }).catch((error)=>{
            if(error.response?.data?.error==="token expired"){
            //    dispatch({type:LOGOUT})
                alert("Your session has expired. Please log in again.");
            }
            console.log(error)
        })
    }
    const getReq = ()=>{
        axios.get(`https://ivory-ox-kilt.cyclic.cloud/donation`,{headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
        }}).then((res)=>{
            console.log(res)
            setData(res.data)
        }).catch((error)=>{
            if(error.response.data.msg === 'token expired'){
                getRefreshToken()
            }
            console.log(error)
        })
    }

 const handleAddRequest=(payload)=>{
      console.log(payload)
        axios.post("https://ivory-ox-kilt.cyclic.cloud/donation/create",payload,{
            headers:{
                Authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        }).then((res)=>{
            console.log(res)
            //send added todo back in res and push it inside data
            const dataAfterAdding = [...data]
            dataAfterAdding.push(res.data)
            setData(dataAfterAdding)
        }).catch((error)=>{
            if(error.response.data.msg === 'token expired'){
                getRefreshToken(handleAddRequest,payload)
            }
            console.log(error)
        })
    }

    const handleUpdateRequest=(id,payload)=>{
        axios.patch(`https://ivory-ox-kilt.cyclic.cloud/donation/edit/${id}`,payload,{
            headers:{
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                "Content-Type":"application/json"
            }
        }).then((res)=>{
            console.log(res)
            let requestsAfterUpdating = data.map((ele)=> ele._id=== id? {...ele,...payload}:ele)
            setData(requestsAfterUpdating)
        }).catch((error)=>{
            console.log(error)
            if(error.response.data.error==="token expired"){
               getRefreshToken(handleUpdateRequest,payload,id)
            }
        })
    }

    const handleDeleteRequest = (id)=>{
        axios.delete(`https://ivory-ox-kilt.cyclic.cloud/donation/delete/${id}`,{
            headers:{
                "Authorization":`Bearer ${JSON.parse(localStorage.getItem("token"))}`
            }   
        }).then((res)=>{
           let requestsAfterDelete= data.filter((ele)=>ele._id!==id)
           setData(requestsAfterDelete)
        }).catch((error)=>{
            console.log(error)
            if(error.response.data.error==="token expired"){
                getRefreshToken(handleDeleteRequest,null,id)
            }
        })
    }
    
      console.log(addFormData)
//--> logout action
//--> check if the crud operations are actually working
//--> need username, org name in response after login
//--> req.body.name instead of req.body.user in auth middleware because the schema has name instead of user key
//--> change date type to string in history schema

    return (
        <Box p={10}>
            <Flex direction={{base:"column",sm:"column",md:"row"}} gap={{base:0,sm:0,md:10}}>
            <Heading size={"md"}>{username||"username"}</Heading>
            <Heading size={"md"}>Total Requests: {data.length}</Heading>
            <Heading size={"md"}>Active Requests: {data?.filter((ele)=>ele.matched===true).length}</Heading>
            <Heading size={"md"}>{ orgName|| "Organization name"}</Heading>
            </Flex>
        <Flex direction={{base:"column", sm:"column",md:"row"}} gap={10}>
            <Flex direction={"column"} width={{base:"100%",sm:"90%",md:"40%"}}>
                {/* update */}
      {/* <Flex  p={8} flex={1} align={"center"} justify={"center"}> */}
     <Flex padding={{base:0,sm:10,md:10}} borderRadius={10} boxShadow={{base:"none",sm:"none",md:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}} mt={10}>
        <Stack spacing={4} w={"full"}>
          <Heading fontSize={"2xl"} color={"#01a95d"}>UPDATE REQUEST</Heading>
          <FormControl id="title">
           
            <Input type="text" value={formData.title} onChange={(e)=>{setFormData({...formData,title:e.target.value})}}/>
     <FormLabel>Title</FormLabel>
          </FormControl>
          <FormControl id="description">
          <Input type="text" value={formData.description} onChange={(e)=>{setFormData({...formData,description:e.target.value})}}/>
          <FormLabel>Description</FormLabel>
          </FormControl>
          <FormControl id="goal">
          <Input type="number" value={formData.goal} onChange={(e)=>{setFormData({...formData,goal:e.target.value})}}/>
          <FormLabel>Target Amount</FormLabel>
          </FormControl>
          <FormControl id="category">
      <FormLabel>Category</FormLabel>
      <Select value={formData.category} onChange={(e)=>{setFormData({...formData,category:e.target.value})}}>
        <option value="">Select a Category</option>
        <option value="education">Education</option>
        <option value="disabilities">Disabilities</option>
        <option value="mental health">Mental Health</option>
        <option value="rescuing animals">Rescuing Animals</option>
        <option value="wildlife">Wildlife</option>
        <option value="ukraine">Ukraine</option>
      </Select>
    </FormControl>
    <FormControl id="image">
          <Input type="text" value={formData.image} onChange={(e)=>{setFormData({...formData,image:e.target.value})}}/>
          <FormLabel>Image</FormLabel>
          </FormControl>
          <FormControl id="raised" isDisabled={true}>
          <Input type="number" value={formData.raised} />
          <FormLabel>Raised</FormLabel>
          </FormControl>
          <FormControl id="matched" isDisabled={true}>
          <Input type="text" value={formData.matched ? "Yes":"Not Yet"} />
          <FormLabel>Fully Funded</FormLabel>
          </FormControl>
          <Button margin={"auto"} width={{base:"50%",sm:"250px",md:"250px"}} _hover={{
    bg: "linear-gradient(0deg, #f8d46d 0%, #f4bd52 100%)"}} bg={"linear-gradient(180deg, #f8d46d 0%, #f4bd52 100%)"} onClick={()=>{handleUpdateRequest(formData._id,{...formData,goal:Number(formData.goal),raised:Number(formData.raised)})}}>Update Request</Button>
        </Stack>
        </Flex>
      {/* </Flex> */}
{/* create */}
<Flex padding={{base:0,sm:10,md:10}} borderRadius={10} boxShadow={{base:"none",sm:"none",md:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}} mt={10}>
        <Stack spacing={4} w={"full"}>
          <Heading fontSize={"2xl"} color={"#01a95d"}>CREATE A REQUEST</Heading>
          <FormControl id="title">
           
            <Input type="text" value={addFormData.title} onChange={(e)=>{setAddFormData({...addFormData,title:e.target.value})}}/>
     <FormLabel>Title</FormLabel>
          </FormControl>
          <FormControl id="description">
          <Input type="text" value={addFormData.description} onChange={(e)=>{setAddFormData({...addFormData,description:e.target.value})}}/>
          <FormLabel>Description</FormLabel>
          </FormControl>
          <FormControl id="goal">
          <Input type="number" value={addFormData.goal} onChange={(e)=>{setAddFormData({...addFormData,goal:e.target.value})}}/>
          <FormLabel>Target Amount</FormLabel>
          </FormControl>
          <FormControl id="category">
      <FormLabel>Category</FormLabel>
      <Select value={addFormData.category} onChange={(e)=>{setAddFormData({...addFormData,category:e.target.value})}}>
        <option value="">Select a Category</option>
        <option value="education">Education</option>
        <option value="disabilities">Disabilities</option>
        <option value="mental health">Mental Health</option>
        <option value="rescuing animals">Rescuing Animals</option>
        <option value="wildlife">Wildlife</option>
        <option value="ukraine">Ukraine</option>
      </Select>
    </FormControl>
    <FormControl id="image">
          <Input type="text" value={addFormData.image} onChange={(e)=>{setAddFormData({...addFormData,image:e.target.value})}}/>
          <FormLabel>Image</FormLabel>
          </FormControl>
          <FormControl id="raised" isDisabled={true}>
          <Input type="number" value={0} />
          <FormLabel>Raised</FormLabel>
          </FormControl>
          <FormControl id="matched" isDisabled={true}>
          <Input type="text" value={"Not Yet"} />
          <FormLabel>Fully Funded</FormLabel>
          </FormControl>
          <Button margin={"auto"} width={{base:"50%",sm:"250px",md:"250px"}} _hover={{
    bg: "linear-gradient(0deg, #fdb833 0%, #f99b32 100%)"}} bg={"linear-gradient(180deg, #fdb833 0%, #f99b32 100%)"} onClick={()=>{handleAddRequest({...addFormData,goal:Number(addFormData.goal),raised:0,date:new Date().toLocaleString().split(",").map((ele)=>ele.trim())[0],matched:false})}}>Create Request</Button>
        </Stack>
      </Flex>
            </Flex>
            <Flex direction={"column"}>
                {/* map through requests array */}
                {data?.map((ele)=>(
                                  <Box as={Flex} padding={10} gap={10} direction={{ base:"column",sm:"column",md:"row"}} justifyContent={"flex-start"} width={"100%"}>
                                  <Image borderRadius={10} boxShadow="0px 7px 29px 0px rgba(100, 100, 111, 0.2)" width={"250px"} height={"200px"} src={ele.image}/>
                                  <Flex direction={"column"} justifyContent={"space-evenly"} alignItems={"flex-start"} textAlign={"left"}>
                                      <Heading color={"#01a95d"} size={"md"}>{ele.title}</Heading>
                                      <Flex direction={"column"} mt={1}>
                                      <Progress value={Math.floor((ele.raised/ele.goal)*100)} size='xs' color='#01a95d' />
                                      <Text><Box as="span" color={"black"} fontSize={"25px"} fontWeight={"medium"}> ₹{ele.raised}</Box> raised of ₹{ele.goal}</Text>
                                      </Flex>
                                      <Flex direction={"column"} gap={2}>
                                      <Button border={"1px solid #04a95d"} color={"#04a95d"} fontWeight={"bold"} background={"transparent"} onClick={()=>handleEditClick(ele)}>Edit Request</Button>
                                      <Button onClick={()=>handleDeleteRequest(ele._id)}  border={"1px solid #b5b6b6"} background={"transparent"} color={"black"}>Delete Request</Button>
                                      </Flex>
                                  </Flex>
                                  
                                  </Box>
                ))}
            </Flex>
            
        </Flex>
        </Box>
    )
}