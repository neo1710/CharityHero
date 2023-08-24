import { Button } from "@chakra-ui/react";

export default function PaginationButtons({val,handlePageClick}){
    return (
        <Button onClick={()=>{handlePageClick(val)}}>{val}
        </Button>
    )
}