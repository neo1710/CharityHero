import { Box, Button, Divider, Flex, Heading, Icon, Image, Progress, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {FaAlignCenter, FaCircle} from "react-icons/fa"
import {PiHandHeartBold} from "react-icons/pi"
import {AiOutlineUser,AiOutlineStar,AiOutlineTag} from "react-icons/ai"
import moment from 'moment';


export default function SingleRequestCard(){
    const {id} = useParams()
    const [data,setData] = useState({})
    const [read,setRead] = useState(false)
    const [historyData,setHistoryData] = useState([])
    const [messageArray,setMessageArray]= useState([])
    const {reqData} = useSelector((store)=>{
        return {
            reqData:store.requestReducer.requests
        }
    },shallowEqual)

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[])
      
    useEffect(()=>{

        if(reqData.length === 0){
            axios.get("https://ivory-ox-kilt.cyclic.cloud/donation/request").then((res)=>{
               // console.log(res)
                res.data?.data?.forEach((ele)=>{
                    if(ele._id===id){
                        console.log(ele,"single req")
                        setData(ele)
                        getDonationHistory(ele._id)
                    }
                })
            })
        }else {
            reqData.forEach((ele)=>{
                if(ele._id===id){
                    console.log(ele,"single req")
                    setData(ele)
                    getDonationHistory(ele._id)
                }
            })
        }
    },[id,reqData])

    const getDonationHistory=(reqID)=>{
        axios.get(`https://ivory-ox-kilt.cyclic.cloud/history/get/${reqID}`).then((res)=>{
            console.log(res,"history")
            getTimePassed(res.data)
            setHistoryData(res.data)
            const filterForMessages= getMessageArray(res.data)
            setMessageArray(filterForMessages)

        }).catch((error)=>{
            console.log(error)
        })
    }
    const getTimePassedForReq = (ReqObj) => {
        const currentTime = moment(); // Current time
    
        const createdAt = moment(`${ReqObj.date} ${"0:00:00"}`, 'M/D/YYYY H:mm:ss');
        const duration = moment.duration(currentTime.diff(createdAt));
    
        let timePassed = '';
        if (duration.asMonths() >= 1) {
            timePassed = `${Math.floor(duration.asMonths())} months ago`;
        } else if (duration.asDays() >= 1) {
            timePassed = `${Math.floor(duration.asDays())} days ago`;
        } else if (duration.asHours() >= 1) {
            timePassed = `${Math.floor(duration.asHours())} hours ago`;
        } else {
            timePassed = `${Math.floor(duration.asMinutes())} minutes ago`;
        }
    
        return timePassed;
    };
    
    
    const  getTimePassed = (arr) => {
        const currentTime = moment(); // Current time
    
        arr.forEach(item => {
            const createdAt = moment(`${item.date} ${item.time}`, 'D/M/YYYY h:mm:ss a');
            const duration = moment.duration(currentTime.diff(createdAt));
    
            let timePassed = '';
            if (duration.asMonths() >= 1) {
                timePassed = `${Math.floor(duration.asMonths())} months ago`;
            } else if (duration.asDays() >= 1) {
                timePassed = `${Math.floor(duration.asDays())} days ago`;
            } else if (duration.asHours() >= 1) {
                timePassed = `${Math.floor(duration.asHours())} hours ago`;
            } else {
                timePassed = `${Math.floor(duration.asMinutes())} minutes ago`;
            }
    
            // Add the timePassed property to the object
            item.timePassed = timePassed;
        });
    };
    
    

const getMessageArray=(historyArr)=>{

    const msgArray =historyArr.filter((ele)=>{
        return ele.message!==undefined && ele.message.length>0
    })
    return msgArray
}
//link to checkout on donate
//oncheckedout ---> add to raised in product store, update matched if true as well ---> do a donation request success action type with newly updated array--> also do a patch request at the same time with the updated data (including id and payload)
//how will you get id in checkout? 
// can do it in redux with a checkout key?
// or send id as params 


  

    return (

        <Box textAlign={"left"} padding={{base:5,sm:10,md:40}} bg={"white"} color={"black"}>
            <Heading>{data?.title}</Heading>

        <Flex mt={10} gap={10} direction={{base:"column",sm:"column",md:"column",lg:"row"}}>

            <Flex direction={"column"}   gap={10} >
                <Image width={"500px"} src={data?.image} borderRadius={10} boxShadow="0px 7px 29px 0px rgba(100, 100, 111, 0.2)"/>
                <Flex>
                <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        color={'black'}
        rounded={'full'}
        bg={'#f1f2f1'}
        mb={1}>
            <Icon width={"50px"} height={"30px"} as={AiOutlineUser} color={"black"}/>
        
      </Flex>
      <Text color={"black"}>{data?.name} is organizing this fundraiser on behalf of {data?.organizationName}</Text>
                </Flex>
                <Flex direction={"column"} justifyContent={"space-between"}>

                <Divider bg={"#b6b5b5"}></Divider>
                <Flex alignItems={{base:"center",sm:"center",md:"center"}} direction={{
                                    base:"row",
                                    sm:"row",
                                    md:"row",
                                }}>
                                {/* <Flex alignItems={"center"}> */}
                                <Text color={"black"}> Created {getTimePassedForReq(data)}</Text>
                                {/* <Box display="inline-block" verticalAlign="middle"> */}
                                <Icon as={FaCircle} color={"black"} boxSize={1.5} verticalAlign="middle" ml={2} mr={2}></Icon>
                                {/* </Box> */}
                                <Icon as = {AiOutlineTag} boxSize={5} color={"black"} verticalAlign="middle" ml={2}mr={2}></Icon>
                                <Text color={"black"} as={"u"}>{data?.category}</Text>
                                {/* </Flex> */}
                               
                                </Flex>
                <Divider bg={"#b6b5b5"}></Divider>
                </Flex>

                {read? <Text color={"black"}>{data?.description}</Text>:
                <>
                <Text>{data?.description?.slice(0,700)}...</Text>
                <Button onClick={()=>setRead(true)} width={"100px"} border={"1px solid #b5b6b6"}  color={"black"} fontWeight={"bold"}>Read more</Button>
                </>
                }
                
                <Flex justifyContent={"space-between"} gap={10} direction={{base:"row",sm:"row",md:"row"}}>
                    <Button width={"50%"} height={"50px"} color={"black"} fontWeight={"bold"} bg={"#feb72e"} _hover={{ bg: "rgba(250, 193, 77, 0.8)" }}><Link to={`/donate/${data?._id}`}>Donate</Link></Button>
                    <Button width={"50%"} _hover={{ bg: "rgba(250, 193, 77, 0.3)" }} height={"50px"} color={"black"} fontWeight={"bold"} border={ "1.5px solid #feb72e"}>Share</Button>
                </Flex>
                <Divider bg={"#b6b5b5"}></Divider>
                <Flex direction={"column"} gap={10}>
                <Heading>Organizer</Heading>
            <Stack direction={{base:"column",sm:"row",md:"row"}} textAlign={"left"} gap={1}>
<Flex p={2}>
                <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        color={'black'}
        rounded={'full'}
        bg={'#f1f2f1'}
        mb={1}
        >
            <Icon width={"50px"} height={"30px"} as={AiOutlineUser} color={"black"}/>
        
      </Flex>
      </Flex>   
      <Flex direction={"column"}>
      <Text mb={-5} fontWeight={"bold"} color={"black"}>{data?.name}</Text>
      <Text mb={-5} color={'black'}>Organizer</Text>
      <Text color={'black'}>India</Text>
   
      <Button mt={2} border={"1px solid #b5b6b6"}  color={"black"} fontWeight={"bold"} >Contact</Button>
      </Flex>
    
    </Stack>
            </Flex> 
                <Divider bg={"#b6b5b5"}></Divider>
                <Flex direction={"column"}>
                    {/* map through history array and create new array with messages */}
                    <Heading>Words of Support {`(${historyData.length})`}</Heading>
                    <Text color={"black"}>Please donate to share words of support.</Text>
                    {/* map through new array here */}
                    {messageArray.map((ele)=>(
                      <Flex gap={3} color={"black"}>
                      <Flex
              w={10}
              h={10}
              align={'center'}
              justify={'center'}
              color={'black'}
              rounded={'full'}
              bg={'#f1f2f1'}
              mb={1}>
                  <Icon width={"50px"} height={"30px"} as={PiHandHeartBold} color={"black"} margin={"auto"}/>
              
            </Flex>
                                  
                                  <Flex direction={"column"} textAlign={"left"} flexWrap={"wrap"} color={"black"}>
                                      <Text color={"black"}>{ele.donor}</Text>
                                      <Flex alignItems={{sm:"center",md:"center"}} direction={{
                                          base:"column",
                                          sm:"row",
                                          md:"row",
                                      }} mt={-5}>
                                      {/* <Flex alignItems={"center"}> */}
                                      <Text color={"black"} fontWeight={"bold"}>₹{ele.amount}</Text>
                                      {/* <Box display="inline-block" verticalAlign="middle"> */}
                                      <Icon as={FaCircle} color={"#b2b9c0"} boxSize={1.5} verticalAlign="middle" ml={2} mr={2}></Icon>
                                      {/* </Box> */}
                                      <Text color={"black"}>{ele.timePassed}</Text>
                                      {/* </Flex> */}
                                     
                                      </Flex>
                                      <Text mt={-3} color={"black"}>{ele.message}</Text>
                                  </Flex>
                                  </Flex>
                    ))}
                   
                </Flex>
           
         </Flex> 
   
           
           
                     <Flex direction={"column"}>
                        <Flex direction={"column"} padding={{base:0,sm:10,md:10}} borderRadius={10} boxShadow={{base:"none",sm:"none",md:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                        <Text><Box as="span" color={"black"} fontSize={"25px"} fontWeight={"medium"}>₹{data?.raised} </Box>raised of ₹{data?.goal} goal</Text>
            <Progress value={Math.floor((data?.raised/data?.goal)*100)} size='xs'/>

                <Text>{historyData.length} donations</Text>
                <Flex direction={{base:"row",sm:"row",md:"column"}} gap={3} p={{base:0,sm:3,md:3}}>
                <Button width={{base:"50%",sm:"250px",md:"250px"}} _hover={{
    bg: "linear-gradient(0deg, #f8d46d 0%, #f4bd52 100%)"}} bg={"linear-gradient(180deg, #f8d46d 0%, #f4bd52 100%)"}>Share</Button>
               <Link to={`/donate/${data?._id}`}> <Button width={{base:"50%",sm:"250px",md:"250px"}} _hover={{
    bg: "linear-gradient(0deg, #fdb833 0%, #f99b32 100%)"}} bg={"linear-gradient(180deg, #fdb833 0%, #f99b32 100%)"}>Donate Now</Button></Link>
                </Flex>
                
                {historyData.map((ele)=>( 
                <Flex gap={3} color={"black"}>
                <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        color={'black'}
        rounded={'full'}
        bg={'#f1f2f1'}
        mb={1}>
            <Icon width={"50px"} height={"30px"} as={PiHandHeartBold} color={"black"} margin={"auto"}/>
        
      </Flex>
                            
                            <Flex direction={"column"} textAlign={"left"} flexWrap={"wrap"} color={"black"}>
                                <Text color={"black"}>{ele.donor}</Text>
                                <Flex alignItems={{sm:"center",md:"center"}} direction={{
                                    base:"column",
                                    sm:"row",
                                    md:"row",
                                }} mt={-5}>
                                {/* <Flex alignItems={"center"}> */}
                                <Text color={"black"} fontWeight={"bold"}>₹{ele.amount}</Text>
                                {/* <Box display="inline-block" verticalAlign="middle"> */}
                                <Icon as={FaCircle} color={"#b2b9c0"} boxSize={1.5} verticalAlign="middle" ml={2} mr={2}></Icon>
                                {/* </Box> */}
                                <Text color={"black"}>{ele.timePassed}</Text>
                                {/* </Flex> */}
                               
                                </Flex>
                            </Flex>
                            </Flex>
                ))}
               
                            <Flex mt={2} width={"100%"} justifyContent={"space-between"}>
                                <Button border={"1px solid #04a95d"} color={"#04a95d"} fontWeight={"bold"}>See All</Button>
                                <Button leftIcon={<AiOutlineStar size={"30px"}/>} border={"1px solid #b5b6b6"} color={"black"}>See top</Button>
                            </Flex>
                        </Flex>
           
            </Flex>

             
       
            </Flex>

        </Box>
      
        
    )
}

