import { Search2Icon } from '@chakra-ui/icons';
import {
    Box, IconButton, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton,
     Flex, Spacer,
    
} from '@chakra-ui/react'
import {  BiUser } from "react-icons/bi";
import logo from "../Images/logo.jpeg"
import { Link } from "react-router-dom"

export default function NavBar() {
    return (
        <>
            <Box bg='white' w='100%' p={2} color='black' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"    >
                <Flex >
                    <Link to="/">
                        <Box w="25%" style={{ display: "flex", }}>
                            <Image w="35%"
                                src={logo}
                                ml={10} />
                            <span style={{ color: "#02a95c", fontSize: "20px", fontWeight: "bolder", padding: "10px 0px", marginRight: "10px" }}>CharityHero</span>
                        </Box>
                    </Link>


                    <Box>
                        <InputGroup mr={14} >
                            <InputLeftElement
                                variant='outline'
                                border="none"
                                children={<IconButton
                                    size='sm'
                                    icon={<Search2Icon
                                        border="none"
                                    />}
                                />}
                            />
                            <Input type='text' placeholder='Search for any fundraiser'
                            />

                        </InputGroup>

                    </Box>
                    <Spacer />
                    <Box style={{ display: "flex", margin: "10px 5px", }}>
                        <Box _hover={{
                            background: "white",
                            color: "#02a95c",
                        }}>
                            <Link to="/">For Charity</Link>
                        </Box>
                        <span style={{ margin: "0 10px" }}></span>
                        <Box _hover={{
                            background: "white",
                            color: "#02a95c",
                        }}> <Link to="/" >For Individuals</Link></Box>


                    </Box>

                    <Box _hover={{
                        background: "white",
                        color: "#02a95c",
                    }}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<BiUser />}
                                variant='outline'
                                border="none"
                                m={2} />
                            <Link to="/login">
                                <span as={IconButton}
                                    aria-label='Options'
                                    icon={<BiUser />}
                                    variant='outline'
                                    border="none"
                                    m={2} _hover={{
                                        color: "#02a95c",
                                    }}>Login</span>
                            </Link>

                        </Menu>
                    </Box>

                </Flex>
            </Box>
        </>
    )
}