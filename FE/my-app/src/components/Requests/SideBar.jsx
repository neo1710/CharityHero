import { Flex, Input, InputGroup, InputRightElement, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useSearchParams} from "react-router-dom"
import {Search2Icon} from "@chakra-ui/icons"

export default function SideBar(){
    const [searchParams,setSearchParams]=useSearchParams()
    const [goal,setGoal]=useState(searchParams.get("goal")||0)
    const [category,setCategory]=useState(searchParams.getAll("category")||[])
    const [funded,setFunded] = useState(searchParams.get("matched")||false)
    const [zeroDonations, setZeroDonations] = useState(searchParams.get("raised")||false)
    const [searchInp,setSearchInp] = useState(searchParams.get("search")||"")
    const limit=searchParams.get("limit")||5
    const page=searchParams.get("page")||1
    
    const [order,setOrder]=useState(searchParams.get("order")||"")



    const handleChange=(e)=>{
        let value;
        let name;
       
             value=e.target.value
             name = e.target.name
        
        
        
        if(name==="category"){
        let category2=[...category]

        if(category2.includes(value)){
            let categoryAfterChange=category.filter((ele)=>{
                return ele!==value
            })
            setCategory(categoryAfterChange)
        }else{
            category2.push(value)
            setCategory(category2)
        }
    }else if(name==="order"){
        setOrder(value)
    }else if(name ==="goal"){
        setGoal(+value)
    }else if(name === "matched"){
        setFunded(!funded)
    }else if(name ==="zero"){
        setZeroDonations(!zeroDonations)
    }else if(name === "search"){
        setSearchInp(value)
    }
    }

    useEffect(()=>{
        const paramObj={limit,page}
      paramObj.category=category

      if(order){
            paramObj.sort="goal"
            paramObj.order=order
        }
    if(goal!==0){
        paramObj.goal = goal
    }
    if(funded===true){
            paramObj.matched = funded
    }
    if(zeroDonations){
        paramObj.raised = true
    }
    if(searchInp){
        paramObj.search = searchInp
    }
        setSearchParams(paramObj)

    },[category,order,goal,zeroDonations,funded,searchInp,page,limit])

    
   // console.log("order:",order, "gender:", gender,"category:" ,category, "color:",color)
    return (
        <Flex color={"black"} gap={7} direction={"column"} alignItems={"flex-start"} width={{base:"100%",sm:"90%",md:"30%"}} borderRadius={10}>
        <Flex color={"black"} boxShadow={{base:"none",sm:"none",md:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}} gap={7} direction={"column"} alignItems={{base:"flex-start",sm:"flex-start",md:"flex-start"}} padding={{base:0,sm:0,md:5}} width={"100%"} borderRadius={10} justifyContent={"center"}>
            <Flex direction={"column"} width={"90%"} gap={3}>
            <Flex width={"90%"} justifyContent={"space-between"} alignItems={"center"}>
            <h3>Search According to Title</h3>
     
            </Flex>
            <div>
                <InputGroup>
                <InputRightElement><Search2Icon/></InputRightElement>
                <Input border={"1px solid black"} type="text" placeholder="type something..." value={searchInp} name="search" onChange={handleChange}/>
                </InputGroup>
            </div>
            </Flex>

        <Flex direction={"column"} width={"90%"}>
        <Flex width={"90%"} justifyContent={"space-between"} alignItems={"center"}>
            <h3>AMOUNT NEEDED</h3>
            </Flex>
            <Stack direction={"column"} onChange={handleChange}>
                <Flex gap={2}>
                <input type="radio" value={0} name="goal" checked={goal===0}/>
               <label>Show All</label>
                </Flex>
              <Flex gap={2}>
              <input type="radio" value={1} name="goal" checked={goal===1}/>
            <label> 50 and under</label>
              </Flex>
              <Flex gap={2}>
              <input type="radio" value={2} name="goal" checked={goal===2}/>
            <label>  100 and under</label>
              </Flex>
              <Flex gap={2}>
              <input type="radio" value={3} name="goal" checked={goal===3}/>
            <label>  250 and under</label>
              </Flex>
              <Flex gap={2}>
              <input type="radio" value={4} name="goal" checked={goal===4}/>
            <label>  500 and under</label>
              </Flex>
              <Flex gap={2}>
              <input type="radio" value={5} name="goal" checked={goal===5}/>
            <label>  1000 and under</label>
              </Flex>
              <Flex gap={2}>
              <input type="radio" value={6} name="goal" checked={goal===6}/>
            <label> Over 1000</label>
              </Flex>
           </Stack>
      
        </Flex>
   
            <Flex width={"90%"} justifyContent={"space-between"} alignItems={"center"}>
            <h3>TOPIC</h3>
            </Flex>
            <Stack>
            <Flex gap={2}>
            <input type="checkbox" value={"mental health"} name="category" onChange={handleChange} checked={category.includes("mental health")}/>
            <label>Mental Health</label>
            </Flex>
            <Flex gap={2}>
            <input type="checkbox" value={"wildlife"} name="category" onChange={handleChange} checked={category.includes("wildlife")}/>
            <label>WildLife</label>
            </Flex>
            <Flex gap={2}>
                <input type="checkbox" value={"rescuing animals"} name="category" onChange={handleChange}checked={category.includes("rescuing animals")}/>
                <label>Rescuing animals</label>
            </Flex>
            <Flex gap={2}>
                <input type="checkbox" value={"disabilities"} name="category" onChange={handleChange} checked={category.includes("disabilities")}/>
                <label>Disabilities</label>
            </Flex>
            <Flex gap={2}>
                <input type="checkbox" value={"education"} name="category" onChange={handleChange} checked={category.includes("education")}/>
                <label>Education</label>
            </Flex>
            <Flex gap={2}>
                <input type="checkbox" value={"ukraine"} name="category" onChange={handleChange} checked={category.includes("ukraine")}/>
                <label>Ukraine</label>
            </Flex>
            </Stack>

            <h3>Sort By Goal Amount</h3>
            <Stack onChange={handleChange} direction={"column"}>
                <Flex gap={2}>
            <input type="radio" value={"asc"} name="order" checked={order==="asc"}/>
            <label>Ascending</label>
            </Flex>
            <Flex gap={2}>
            <input type="radio" value={"desc"} name="order" checked={order==="desc"}/>
            <label>Descending</label>
            </Flex>
            </Stack>
            <Stack>
                <Flex gap={2}>
                <input type="checkbox" name="matched" checked={funded} onChange={handleChange}/>
            <label>Fully Funded</label>
                </Flex>
        <Flex gap={2}>
        <input type="checkbox" name="zero" checked={zeroDonations} onChange={handleChange}/>
            <label>Requests with 0 donations</label>
        </Flex>
           
            </Stack>
        </Flex>
        </Flex>
    )
}