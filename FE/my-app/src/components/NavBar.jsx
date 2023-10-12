import { CloseIcon, HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import {
  Box, IconButton, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton,
  Flex, useDisclosure, useColorModeValue, Stack, Divider, Text

} from '@chakra-ui/react'
import { BiUser } from "react-icons/bi";
import logo from "../Images/logo.jpeg"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/AuthReducer/action';
import { useEffect, useState } from 'react';
import { useDebounce } from './hooks/UseDebounce';
import axios from 'axios';
import { Link as PathLink } from "react-router-dom";
const Links = ['login', 'ForCharity'];

const NavLink = (props) => {
  const { children } = props;


  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.2001', 'gray.700'),
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};
export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  let data = useSelector((store) => store.authReducer);
  let dispatch = useDispatch();
    const debounce = useDebounce()
  const [search, setSearch] = useState("");
    const [datas, setData] = useState([]);
  function out() {
    dispatch(logout())
  }
  useEffect(()=>{
    // fetchData()
  },[search])
    const fetchData = ()=>{
       
        axios.get(`https://ivory-ox-kilt.cyclic.cloud/donation/request?searched=${search}`)
        .then((res)=>{
                // console.log(res)
                  setData(res.data)
               
        }) 
        .catch((err)=>{
             console.log(err)
        })
      
    }
  const handleInputChange = (e) => {
    setSearch(e.target.value)
    if(!e.target.value){
      setData([])
    }
    // Open the menu when the input value is not empty
    ;
    debounce(e,fetchData,500)
    
  };
  const handleInputBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest(".search-result-link")) {
      setData([]);
       
    }
  };
  
  return (
    <>
      <Box bg='white' w="100%" p={2} color='black' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" position="sticky" // Add sticky position
        top={0} // Stick to the top of the viewport
        zIndex={1000} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          <Flex
            alignItems="center"
            justifyContent={{ base: "space-between", md: "center" }} // Center on small screens, space-between on medium screens and larger
            flexDirection={{ base: "column", md: "row" }}
          >
            <Link to="/">
              <Image w={{ base: "15%", md: "17%" }} src={logo} ml={{ md: 10, base: "250px" }} />
            </Link>

            <InputGroup   mt={{ base: 0, md: 1 }} ml={{ base: 7, md: 5 }} mr="auto" display={{ base: "none", md: "flex" }}>
              <InputLeftElement
                variant='outline'
                border="none"
                ml="260px"
                children={
                  <IconButton
                    size='sm'
                    icon={<Search2Icon border="none" />}
                  />
                }
              />
              <Input
                type='text'
                  onChange={(e)=>handleInputChange(e)}
                placeholder='Search for any fundraiser'
                w={{ base: "100px", md: "300px" }}
              />
            </InputGroup>
            {datas?.data?.length > 0 && (
            <Flex
              direction={"column"}
              width={"600px"}
              mr={{base:0, sm:0,md:0,lg:"-250px"}}
              bg={"white"}
              maxHeight={"400px"}
              overflowY={"scroll"}
              pos={"absolute"}
              zIndex={3}
              mt={"480px"}
              borderRadius={"5px"}
              onBlur={handleInputBlur}
            >
              
              {datas?.data?.map((ele, ind) => (
              
                <PathLink    key={ind} to={`/requests/${ele._id}`}   >
                  <Flex
                 
                    width={"100%"}
                    justifyContent={"space-between"}
                    padding={5}
                    alignItems={"center"}
                    color={"black"}
                    height={"100px"}
                  >
                    <Image
                      align={"center"}
                      width={"50px"}
                      height={"50px"}
                      src={ele.image}
                      bg={"#f5f6f6"}
                    />
                   <Box width={"40%"}>
                    <Text align={"left"}>{ele.title}</Text>
                    </Box>
                    
                    <Text><Box as="span" color={"black"} fontSize={"25px"} fontWeight={"medium"}>₹{ele?.raised} </Box>raised of ₹{ele?.goal} goal</Text>
                   
                  </Flex>
                  <Divider width={"90%"} maxH={2} bg={"#7b7e7e"}margin={"auto"}/>
                </PathLink>
              
              ))}
          
            </Flex>
          )}
     
          
            <Box display={{ base: 'none', md: 'flex' }} alignItems="center" mt={{ base: 4, md: 0 }}> {/* Adjusted alignment */}
              <Box
                _hover={{
                  background: "white",
                  color: "#02a95c",
                }}
                style={{ width: "100px" }}
                display={{ md: "flex", sm: "none" }}
              >
                <Link to="/requests">For Charity</Link>
              </Box>
              {data.isAuth ? <Box
                _hover={{
                  background: "white",
                  color: "#02a95c",
                }}
                style={{ width: "140px" }}
              >
                <Link to="/user">Your Requests</Link>
              </Box> : ""}
            </Box>

            <Box _hover={{

              color: "#02a95c",
            }} display={{ base: 'none', md: 'flex' }} alignItems="center" mt={{ base: 4, md: 0 }}> {/* Adjusted alignment */}
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<BiUser />}
                  variant='outline'
                  border="none"
                  m={2}
                />
                {data.isAuth ?
                  <button
                    onClick={() => { out() }}
                    style={{ backgroundColor: "#02a95c", border: "solid 2px #02a95c", borderRadius: "5px", padding: "5px" }}
                  >
                    Logout
                  </button>
                  : <Link to="/login" >
                    <span
                      as={IconButton}
                      aria-label='Options'
                      icon={<BiUser />}
                      variant='outline'
                      border="none"
                      m={2}

                    >
                      Login
                    </span>
                  </Link>}
              </Menu>
            </Box>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} ><Link to={`${link}`}>{link}</Link></NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}