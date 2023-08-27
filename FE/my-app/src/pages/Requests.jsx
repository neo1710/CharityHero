import { useEffect, useState } from "react"
import {shallowEqual, useDispatch, useSelector} from "react-redux"
import { getDonationRequestData } from "../redux/RequestReducer/action"
import SideBar from "../components/Requests/SideBar"
import { Link, useSearchParams } from "react-router-dom"
import SingleRequestCard from "../components/Requests/SingleRequestCard"
import { Box, Button, Flex, Heading, Image, Progress, Text } from "@chakra-ui/react"
import PaginationButtons from "../components/Requests/PaginationButtons"

export default function Requests(){


    const {reqData,totalButtons} = useSelector((store)=>{
        return {
            totalButtons:store.requestReducer.totalButtons,
            reqData:store.requestReducer.requests
        }
    },shallowEqual)

    const [searchParams,setSearchParams]=useSearchParams()
    const dispatch = useDispatch()
    const [page,setPage] = useState(searchParams.get("page")||1)


    const arr = new Array(totalButtons).fill(null)
  
    const handlePageClick = (val)=>{
        setPage(val)
    }
    const paramObj={
        category:searchParams.getAll("category"),
        order:searchParams.get("order"),
        sort:searchParams.get("order") && "goal",
        goal:searchParams.get("goal")||"",
        matched: searchParams.get("matched") && true,
        raised: searchParams.get("raised") && 0,
        search:searchParams.get("search")||"",
        limit:searchParams.get("limit")||5,
         page:searchParams.get("page")||1
       }

    useEffect(()=>{
        window.scrollTo(0, 0);
        dispatch(getDonationRequestData(paramObj))
    },[searchParams])

    useEffect(()=>{
        const manageParams = {}
        manageParams.page = page
        if(paramObj.category){
            manageParams.category = paramObj.category
        }
        if(paramObj.order){
            manageParams.order = paramObj.order
        }
       if(paramObj.goal){
        manageParams.goal = paramObj.goal
       }
       if(paramObj.matched){
       manageParams.matched= paramObj.matched
       }
       if(paramObj.raised===0){
        manageParams.raised = paramObj.raised
       }
       if(paramObj.search){
        manageParams.search = paramObj.search
       }
       if(paramObj.page){
        manageParams.limit = 5
        manageParams.page = page
       }
       setSearchParams(manageParams)
    },[page])


  //loaders, scroll to top

//{title,_id,description,goal,date,userID,category,organizationName,name,image,raised,matched}
    return (
        <Box p={5}  bg={"white"} mt={10} mb={10}>
        <Flex direction={{base:"column",sm:"column",md:"row"}}>
             <SideBar/>
             <Flex direction={"column"}>
             {reqData?.map((ele)=>(
            
                 <Box as={Flex} flexDirection={{base:"column",sm:"column",md:"row"}} padding={10} gap={10} justifyContent={"flex-start"} width={"100%"}>
            <Image borderRadius={10} boxShadow="0px 7px 29px 0px rgba(100, 100, 111, 0.2)" width={"250px"} height={"200px"} src={ele.image}/>
            <Flex direction={"column"} justifyContent={"space-evenly"} alignItems={"flex-start"} textAlign={"left"}>
                <Heading size={"md"} color={"#01a95d"}>{ele.title}</Heading>
                {/* <Text>{ele.description.slice(0,300)}</Text> */}
                <Flex direction={"column"}>
                <Progress value={Math.floor((ele.raised/ele.goal)*100)} size='xs' color='#01a95d' />
                <Text><Box as="span" color={"black"} fontSize={"25px"} fontWeight={"medium"}>₹{ele?.raised} </Box>raised of ₹{ele?.goal} goal</Text>
                {/* <Text color={"black"}>₹{ele.raised} raised of ₹{ele.goal}</Text> */}
                </Flex>
                <Link to={`/requests/${ele._id}`}>  <Button width={"200px"} height={"45px"} color={"black"} fontWeight={"bold"} bg={"#feb72e"} _hover={{ bg: "rgba(250, 193, 77, 0.8)" }}>See more</Button></Link>
            </Flex>
            
            </Box>

          
          ))}
             </Flex>
        </Flex>
        <Flex width={"100%"} margin={"auto"}>
            {/* <Button margin={"auto"} onClick={()=> testingPage>=arr.length && testingPage>=1 ? setTestingPage(testingPage-1):  setTestingPage(testingPage+1)} border={"1px solid #04a95d"} color={"#04a95d"} fontWeight={"bold"}>{testingPage>=arr.length? "Show less":"Show more"}</Button> */}
            <Flex gap={3} margin={"auto"}>
            {arr.map((_,ind)=>(
        <PaginationButtons
        key={ind+1}
        val={ind+1}
        handlePageClick={handlePageClick}
        />
      ))}
            </Flex>
   
        </Flex>
    
        </Box>
    )
}

 
