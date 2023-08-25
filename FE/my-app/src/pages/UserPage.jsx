import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, Progress, Select, Stack, Text, useEditableState } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

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
              //  dispatch({type:LOGOUT})
                alert("Your session has expired. Please log in again.");
            }
            console.log(error)
        })
    }
    const getReq = ()=>{
        axios.get(`https://ivory-ox-kilt.cyclic.cloud/donation`,{headers:{
            Authorization: `Bearer ${JSON.parse(localStorage.get("token"))}`
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

    return (
        <Box>
            <Heading>Username</Heading>
            <Heading>Total Requests: {data.length}</Heading>
            <Heading>Active Requests: {data.filter((ele)=>ele.matched===true).length}</Heading>
            <Heading>Organization name</Heading>
        <Flex direction={{base:"column", sm:"column",md:"row"}}>
            <Flex direction={"column"}>
                {/* update */}
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"} mt={10}>
          <Heading fontSize={"2xl"} color={"#01D5A2"}>UPDATE REQUEST</Heading>
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
          <Button onClick={()=>{handleUpdateRequest(formData._id,{...formData,goal:Number(formData.goal),raised:Number(formData.raised)})}}>Update Request</Button>
        </Stack>
      </Flex>
{/* create */}
<Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"} mt={10}>
          <Heading fontSize={"2xl"} color={"#01D5A2"}>CREATE A REQUEST</Heading>
          <FormControl id="title">
           
            <Input type="text" value={addFormData.title} onChange={(e)=>{setAddFormData({...addFormData,title:e.target.value})}}/>
     <FormLabel>Title</FormLabel>
          </FormControl>
          <FormControl id="description">
          <Input type="text" value={addFormData.description} onChange={(e)=>{setAddFormData({...addFormData,description:e.target.value})}}/>
          <FormLabel>Description</FormLabel>
          </FormControl>
          <FormControl id="goal">
          <Input type="number" value={addFormData.goal} onChange={(e)=>{setAddFormData({...formData,goal:e.target.value})}}/>
          <FormLabel>Target Amount</FormLabel>
          </FormControl>
          <FormControl id="category">
      <FormLabel>Category</FormLabel>
      <Select value={addFormData.category} onChange={(e)=>{setAddFormData({...formData,category:e.target.value})}}>
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
          <Input type="text" value={addFormData.image} onChange={(e)=>{addFormData({...formData,image:e.target.value})}}/>
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
          <Button onClick={()=>{handleAddRequest({...addFormData,goal:Number(addFormData.goal),raised:0,date:new Date().toLocaleString().split(",").map((ele)=>ele.trim())[0],matched:false})}}>Create Request</Button>
        </Stack>
      </Flex>
            </Flex>
            <Flex direction={"column"}>
                {/* map through requests array */}
                {data.map((ele)=>(
                                  <Box as={Flex} padding={10} gap={10} justifyContent={"flex-start"} width={"70%"}>
                                  <Image width={"250px"} height={"200px"} src={ele.image}/>
                                  <Flex direction={"column"} justifyContent={"space-evenly"} alignItems={"flex-start"} textAlign={"left"}>
                                      <Heading>{ele.title}</Heading>
                                      <Flex direction={"column"}>
                                      <Progress value={Math.floor((ele.raised/ele.goal)*100)} size='xs' color='#01a95d' />
                                      <Text>₹{ele.raised} raised of ₹{ele.goal}</Text>
                                      </Flex>
                                      <Button onClick={()=>handleEditClick(ele)}>Edit Request</Button>
                                      <Button onClick={()=>handleDeleteRequest(ele._id)}>Delete Request</Button>
                                  </Flex>
                                  
                                  </Box>
                ))}
            </Flex>
            
        </Flex>
        </Box>
    )
}