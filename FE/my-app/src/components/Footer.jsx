
import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
  useColorModeValue,
  Image,
} from '@chakra-ui/react'

 import logo from "../Images/logo.jpeg"
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { BiMailSend } from 'react-icons/bi'



const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box style={{display:"flex",width:"100px"}} >
             
               <Image src={logo} />
              
             
             
            </Box>
           
            <Stack direction={'row'} spacing={6}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'YouTube'} href={'#'}>
                <FaYoutube />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>
            <div  style={{display:"flex",width:"200px",justifyContent:"space-between"}}>
          <div >
            <img src="https://www.licious.in/image/rebranding/png/app-store-homepage.png" alt="Appstore" />
          </div>
          <div>
            <img src="https://www.licious.in/image/rebranding/png/playstore-homepage.png" alt="" />
          </div>
          </div>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Fundraiser for</ListHeader>
            <Box as="a" href={'#'}>
              Medical
            </Box>
            <Box as="a" href={'#'}>
             Emergency
            </Box>
            <Box as="a" href={'#'}>
              Memorail
            </Box>
            <Box as="a" href={'#'}>
              Education
            </Box>
            <Box as="a" href={'#'}>
              NonProfit
            </Box>
            <Box as="a" href={'#'}>
              Support COVID-19
            </Box>
            <Box as="a" href={'#'}>
              fundrasisers
            </Box>
            <Box as="a" href={'#'}>
              Crisis Relief
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Learn more</ListHeader>
            <Box as="a" href={'#'}>
              How CharityHero
            </Box>
            <Box as="a" href={'#'}>
             Works
            </Box>
            <Box as="a" href={'#'}>
              Why CharityHero
            </Box>
            <Box as="a" href={'#'}>
              Common questions
            </Box>
            <Box as="a" href={'#'}>
              Success stories
            </Box>
            <Box as="a" href={'#'}>
              Supported countries
            </Box>
            <Box as="a" href={'#'}>
              Charity fundrasing
            </Box>
            <Box as="a" href={'#'}>
             Pricing
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Resources</ListHeader>
            <Box as="a" href={'#'}>
              Help center
            </Box>
            <Box as="a" href={'#'}>
             Blog
            </Box>
            <Box as="a" href={'#'}>
            CharityHero
            </Box>
            <Box as="a" href={'#'}>
              Press center
            </Box>
            <Box as="a" href={'#'}>
              Careers
            </Box>
            <Box as="a" href={'#'}>
              Support COVID-19
            </Box>
            <Box as="a" href={'#'}>
              About
            </Box>
            <Box as="a" href={'#'}>
             More Resources
            </Box>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={'row'}>
              <Input
                placeholder={'Your email address'}
                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                border={0}
                _focus={{
                  bg: 'whiteAlpha.300',
                }}
              />
              <IconButton
                bg={useColorModeValue('green.400', 'green.800')}
                color={useColorModeValue('white', 'gray.800')}
                _hover={{
                  bg: 'green.600',
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}