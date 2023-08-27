import { Button } from "@chakra-ui/react";

export default function PaginationButtons({val,handlePageClick}){
    return (
        <Button border={"1px solid #04a95d"} color={"#04a95d"} fontWeight={"bold"} onClick={()=>{handlePageClick(val)}}>{val}
        </Button>
    )
}