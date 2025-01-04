import React, { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import { useState } from "react";
import "./Header.scss";
import { Heading, Image, Box, Text } from "@chakra-ui/react";
import foodIcon from "../../../assets/restaurant.png";
import { useSelector } from "react-redux";

const Header = () => {
  const [cartLen, setCartLen] = useState();

  const cartAll = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    setCartLen(cartAll.length);
  }, [cartLen]);

  return (
    <div className="header">
      <Box className="header-slogan">
        <Image src={foodIcon} alt="foodIcon" w="29px" />
        <Text color="#ffebcd">Good food, Good Monents</Text>
      </Box>
      <div className="title">
        <Heading as="h2" size="2xl" noOfLines={1}>
          Food Bazaar
        </Heading>
      </div>
      <Navbar cartLen={cartLen}/>
    </div>
  );
};

export default Header;
