import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
const BashURL = "https://ivory-ox-kilt.cyclic.cloud/donation";
const DonationDetails = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [allUser,setAllUser]=useState([]);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BashURL}`)
      .then((res) => {
        console.log("res-->",res);
        setUserData(res.data);
      })
      .catch((err) => console.log("error", err));
  }, []);

  const handleNextPage = () => {
    if (amount > 0) {
      navigate("/checkout");
    } else {
      alert("Please enter vailid amount");
    }
  };

  return (
    <DIV>
      <div className="container">
        <div className="image-div">
          <div className="image-box">
            <img src={userData.image} alt="photo" />
          </div>
          <div className="for-help">
            <h6 style={{ marginBotton: "-5px" }}>
              {" "}
              You're supporting{" "}
              <span className="span-1">{userData.title}</span>
            </h6>
            <p>
              Your donation will benifit{" "}
              <span className="span-2">{userData.name}</span>
            </p>
          </div>
        </div>
        <div className="donation-money">
          <FormControl isRequired>
            <FormLabel>Enter your amount</FormLabel>
            <Input
              placeholder="000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="Number"
              isRequired
            />
          </FormControl>
        </div>
        <div className="donation-message">
          <FormControl>
            <FormLabel>Write Your message (optional)</FormLabel>
            <Textarea
              placeholder="Write Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>
        </div>

        <div className="donation-button">
          <FormControl>
            {/* <FormLabel>Enter card number</FormLabel> */}
            <Button onClick={handleNextPage} className="procced-btn">
              PROCEED FOR DONATE
            </Button>
          </FormControl>
        </div>
      </div>
    </DIV>
  );
};

export default DonationDetails;

const DIV = styled.div`
  border: 0px solid red;
  margin: 40px 0px;
  .container {
    width: 50%;
    border: 0px solid blue;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 20px;
    margin: auto;
  }
  .image-div {
    display: flex;
    /* justify-content:space-between; */
    gap: 20px;
    align-items: center;
  }
  .image-box {
    width: 20%;
    border: 0px solid green;
    border-radius:50%;
  }
  .image-box >img{
    width: 100%;
  
  }
  .for-help {
    border-bottom: 2px solid gray;
  }
  .span-2 {
    font-size: 16px;
    font-weight: 500;
  }
  .span-1 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: -10px;
  }
  .procced-btn {
    width: 100%;
    background-color: green;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  .donation-button {
  }
  .donation-message,
  .donation-money,
  .donation-button {
    width: 50%;
    margin: 50px 10px;
    border: 0px solid blue;
  }
  @media all and (min-width: 300px) and (max-width: 550px) {
    .container {
      width: 100%;
      border: 2px solid blue;
    }
    .donation-message,
    .donation-money,
    .donation-button {
      width: 90%;
    }
  }
`;
