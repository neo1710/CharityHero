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
        limit:searchParams.get("limit")||10,
        page:searchParams.get("page")||1
       }

    useEffect(()=>{
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

  //categories, search not working
  //loaders, scroll to top

//{title,_id,description,goal,date,userID,category,organizationName,name,image,raised,matched}
    return (
        <Box>
        <Flex direction={"row"}>
             <SideBar/>
             <Flex direction={"column"}>
             {reqData?.map((ele)=>(
                <Link to={`/requests/${ele._id}`}>
                 <Box as={Flex} padding={10} gap={10} justifyContent={"flex-start"} width={"70%"}>
            <Image width={"250px"} height={"200px"} src={ele.image}/>
            <Flex direction={"column"} justifyContent={"space-evenly"} alignItems={"flex-start"} textAlign={"left"}>
                <Heading>{ele.title}</Heading>
                {/* <Text>{ele.description.slice(0,300)}</Text> */}
                <Flex direction={"column"}>
                <Progress value={Math.floor((ele.raised/ele.goal)*100)} size='xs' color='#01a95d' />
                <Text>₹{ele.raised} raised of ₹{ele.goal}</Text>
                </Flex>
                <Button><Link to={`requests/${ele._id}`}>Donate Now</Link></Button>
            </Flex>
            
            </Box>
                </Link>
          
          ))}
             </Flex>
        </Flex>
        {arr.map((_,ind)=>(
        <PaginationButtons
        key={ind+1}
        val={ind+1}
        handlePageClick={handlePageClick}
        />
      ))}
        </Box>
    )
}

 
