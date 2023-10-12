import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginReq } from "../redux/AuthReducer/action";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  InputRightElement,
  Spinner,
  Heading,
  Button,
  InputGroup
} from "@chakra-ui/react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  let navigate = useNavigate();
  let location = useLocation();
  console.log("loc", location);
  let check = useSelector((store) => store.authReducer);
  console.log(check);
  let dispatch = useDispatch();
  useEffect(() => {
    if (check.isAuth === true) {
      setTimeout(() => {
        if (location.state) {
          navigate(location.state);
        } else {
          navigate("/");
        }
      }, 2000);
    }
  }, [check]);

  function doit(e) {
    e.preventDefault();
    let data = { email, password: pass };
    dispatch(loginReq(data));
    console.log(data);
    setEmail("");
    setPass("");
  }

  console.log({ email, pass });

  return (
    <>
      {check.isAuth ? (
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="500px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle color={"#02a95c"} mt={4} mb={1} fontSize="lg">
            Login Successful
          </AlertTitle>
          <AlertDescription color={"#02a95c"} maxWidth="sm">
            Thanks for logging in.
          </AlertDescription>
        </Alert>
      ) : (
        <DIV>
          {/* {check.isLoading? <div><Spinner size={'xs'} /></div> :""} */}
          <div>
            <Heading id="head">LOGIN HERE</Heading>
            <br />
            <form>
              <label>Email</label>
              <br />
              <Input
              className="Input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                required
                
              />
              <br />
              <label>Password</label>
              <br />
              
              <div className="pass"><Input
               className="InputP"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
                type={show?"text":"password"}
                required
              
              ></Input>
              <Button variant={"ghost"} className="passB" h='1.75rem' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
              </div>
               
        
      
              <br />
              <button
                type="submit"
                onClick={(e) => {
                  doit(e);
                }}
                className="subB"
              >
                SUBMIT
              </button>
            </form>
            <a>
              If you are not a user{" "}
              <Link to="/signup" className="link">
                register here
              </Link>{" "}
            </a>
          </div>
        </DIV>
      )}
    </>
  );
};

const DIV = styled.div`
  width: 100%;
  display: flex;
  font-family: "Poppins", sans-serif;
  /* height: 500px; */
  padding: 5%;
  background-color: #02a95c;
  /* background-image: url('https://www.gofundme.com/en-gb/c/wp-content/uploads/sites/11/2021/04/hand-wing-people-love-heart-symbol-1361975-pxhere.com_.jpg?w=1024'); */
  div {
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin: auto;
    background-color: white;
    padding: 20px;
    
  }
  label{
    color: #02a95c;
    font-weight: bolder;
  }
  .pass{
    width:60%;
    border: #02a95c 1px solid;
    padding: 0px;
    box-shadow: none;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background: transparent;
  }
  #head {
    color: #02a95c;
  }
  .Input {
    border: #02a95c 1px solid;
    padding: 10px;
    border-radius: 5px;
    width:60%;
  }
  .InputP{
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    width:80%;
  }
  .subB{
    background-color: #02a95c;
    margin-top: 10px;
    color: white;
    padding: 5px;
    border: 1px lightgreen solid;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .subB:hover {
    background-color: lightgray;
    border: 1px solid grey;
  }
  .link {
    color: #02a95c;
  }

  @media (min-width: 10px) and (max-width:500px) {
    #head{
      font-size: large;
    }
  Input {
    border: #02a95c 1px solid;
    border-radius: 5px;
    width:60%;
  }
  div {
    width: 70%;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin: auto;
    background-color: white;
    padding: 20px;
  }
 
  }
  .passB{
    width: 20%;
    padding: 6px;
color: #02a95c;
    margin-bottom: 0px;
  }
`;
