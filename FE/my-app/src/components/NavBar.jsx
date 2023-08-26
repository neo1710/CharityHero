import { CloseIcon, HamburgerIcon, Search2Icon } from '@chakra-ui/icons';
import {
    Box, IconButton, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton,
     Flex, useDisclosure, useColorModeValue,Stack
    
} from '@chakra-ui/react'
import {  BiUser } from "react-icons/bi";
import logo from "../Images/logo.jpeg"
import { Link } from "react-router-dom"

const Links = ['login', 'ForCharity', 'ForIndivuals'];

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
    return (
        <>
              <Box bg='white' w="100%" p={2} color='black' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"  position="sticky" // Add sticky position
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
                    <Image w={{ base: "15%", md: "17%" }}src={logo} ml={{md:10,base:"250px"}} />
                </Link>

                <InputGroup mt={{ base: 0, md: 1 }} ml={{ base: 7, md: 5 }} mr="auto" display={{base:"none",md:"flex"}}>
                    <InputLeftElement
                        variant='outline'
                        border="none"
                        children={
                            <IconButton
                                size='sm'
                                icon={<Search2Icon border="none" />}
                            />
                        }
                    />
                    <Input
                        type='text'
                        placeholder='Search for any fundraiser'
                        w={{ base: "100px", md: "300px" }}
                    />
                </InputGroup>

                <Box  display={{ base: 'none', md: 'flex' }} alignItems="center" mt={{ base: 4, md: 0 }}> {/* Adjusted alignment */}
                    <Box
                        _hover={{
                            background: "white",
                            color: "#02a95c",
                        }}
                        style={{ width: "100px" }}
                        display={{md:"flex",sm:"none"}}
                    >
                        <Link to="/">For Charity</Link>
                    </Box>
                    <Box
                        _hover={{
                            background: "white",
                            color: "#02a95c",
                        }}
                        style={{  width: "140px" }}
                    >
                        <Link to="/">For Individuals</Link>
                    </Box>
                </Box>

                <Box display={{ base: 'none', md: 'flex' }} alignItems="center" mt={{ base: 4, md: 0 }}> {/* Adjusted alignment */}
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<BiUser />}
                            variant='outline'
                            border="none"
                            m={2}
                        />
                        <Link to="/login">
                            <span
                                as={IconButton}
                                aria-label='Options'
                                icon={<BiUser />}
                                variant='outline'
                                border="none"
                                m={2}
                                _hover={{
                                    color: "#02a95c",
                                }}
                            >
                                Login
                            </span>
                        </Link>
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