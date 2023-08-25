import { Box, Button, Divider, Flex, Heading, Icon, Image, Progress, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {FaCircle} from "react-icons/fa"
import {PiHandHeartBold} from "react-icons/pi"
import {AiOutlineUser} from "react-icons/ai"
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
        axios.get(`https://ivory-ox-kilt.cyclic.cloud/history/get/${reqID}`,{donationRequestID:reqID}).then((res)=>{
            //console.log(res,"history")
            getTimePassed(res.data)
            setHistoryData(res.data)
            const filterForMessages= getMessageArray(res.data)
            setMessageArray(filterForMessages)

        }).catch((error)=>{
            console.log(error)
        })
    }
const getTimePassed=(arr)=>{
    const currentTime = moment(); // Current time

arr.forEach(history => {
    const createdAt = moment(`${history.date} ${history.time}`, 'YYYY-MM-DD HH:mm');
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

    // Add the timePassed property to the history object
    history.timePassed = timePassed;
});

}

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
        <Box textAlign={"left"} padding={"20"}>
            <Heading>{data?.title}</Heading>

        <Flex mt={10} gap={10} direction={{base:"column",sm:"column",md:"row",lg:"row"}}>

            <Flex direction={"column"}  gap={10}>
                <Image width={"500px"} src={data?.image}/>
                <Divider></Divider>
                <Text>{data?.name} is organizing this fundraiser on behalf of {data?.organizationName}</Text>
                <Divider></Divider>
                {read? <Text>{data?.description}</Text>:
                <>
                <Text>{data?.description?.slice(0,700)}...</Text>
                <Button onClick={()=>setRead(true)} width={"100px"}>Read more</Button>
                </>
                }
                
                <Flex>
                    <Button><Link to={"/donate/:id"}>Donate</Link></Button>
                    <Button>Share</Button>
                </Flex>
                <Divider></Divider>
                <Flex direction={"column"}>
                <Heading>Organizer</Heading>
            <Stack direction={{base:"column",sm:"row",md:"row"}} textAlign={"left"} gap={10}>
            <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        color={'black'}
        rounded={'full'}
        bg={'gray'}
        mb={1}>
            <Icon width={"50px"} height={"30px"} as={AiOutlineUser} color={"black"}/>
        
      </Flex>
      <Box>
      <Text fontWeight={600}>{data?.name}</Text>
      <Text color={'gray.600'}>Organizer</Text>
      <Text color={'gray.600'}>India</Text>
      <Button mt={3}>Contact</Button>
      </Box>
    
    </Stack>
            </Flex> 
                <Divider></Divider>
                <Flex direction={"column"}>
                    {/* map through history array and create new array with messages */}
                    <Heading>Words of Support {`(${historyData.length})`}</Heading>
                    <Text>Please donate to share words of support.</Text>
                    {/* map through new array here */}
                    <Flex gap={5}>
                    <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        color={'black'}
        rounded={'full'}
        bg={'gray'}
        mb={1}>
            <Icon width={"50px"} height={"30px"} as={PiHandHeartBold} color={"black"}/>
        
      </Flex>
                            
                            <Flex direction={"column"} textAlign={"left"} flexWrap={"wrap"}>
                                <Text>Name</Text>
                                <Flex color={"#b2b9c0"} direction={{
                                    base:"column",
                                    sm:"column",
                                    md:"row"
                                }}>
                                
                                <Text>Amount</Text>
                                <Box display="inline-block" verticalAlign="middle">
                                <Icon as={FaCircle} color={"#b2b9c0"} boxSize={1.5} verticalAlign="middle" ml={2} mr={2}></Icon>
                                </Box>
                                <Text>Time passed</Text>
                                </Flex>
                                <Text>Words of encouragement</Text>
                            </Flex>
                            </Flex>
                </Flex>
            </Flex> 
            <Flex direction={"column"}>
            <Progress value={Math.floor((data?.raised/data?.goal)*100)} size='xs' color='#01a95d' />
                <Text>₹{data?.raised} raised of ₹{data?.goal}</Text>
                <Text>{historyData.length} donations</Text>
                <Button>Share</Button>
                <Button><Link to={"/donate/:id"}>Donate Now</Link></Button>
                {/* map through historydata */}
                <Flex gap={5}>
                <Flex
        w={10}
        h={10}
        align={'center'}
        justify={'center'}
        color={'black'}
        rounded={'full'}
        bg={'gray'}
        mb={1}>
            <Icon width={"50px"} height={"30px"} as={PiHandHeartBold} color={"black"} margin={"auto"}/>
        
      </Flex>
                            
                            <Flex direction={"column"} textAlign={"left"} flexWrap={"wrap"}>
                                <Text>Name</Text>
                                <Flex color={"#b2b9c0"} direction={{
                                    base:"column",
                                    sm:"column",
                                    md:"row"
                                }}>
                                
                                <Text>Amount</Text>
                                <Box display="inline-block" verticalAlign="middle">
                                <Icon as={FaCircle} color={"#b2b9c0"} boxSize={1.5} verticalAlign="middle" ml={2} mr={2}></Icon>
                                </Box>
                                <Text>Time passed</Text>
                                </Flex>
                            </Flex>
                            </Flex>
                            <Flex>
                                <Button>See All</Button>
                                <Button>See top donations</Button>
                            </Flex>
            </Flex>
            </Flex>

        </Box>
    )
}

