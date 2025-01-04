import { image_url } from "../../../Config/Config";
import { Image, Flex, Box, Text, Heading, Button } from "@chakra-ui/react";
import rupee from "../../assets/rupee.png";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { removeCart } from "../../slice/cartSlice";
import "./CartItem.scss"

const CartItem = ({ item }) => {

  const dispatch = useDispatch();


  const handlerRemoveCart = () =>{
    dispatch(removeCart(item.id));
  }

    return (
      <Flex
        align="center"
        justify="space-between"
        p={4}
        borderWidth={1}
        borderRadius="md"
        mb={2}
        bg="white"
        boxShadow="sm"
        className="cart-item"
      >
        <Image
          src={`${image_url}/${item.imageId}`}
          alt={item.name}
          boxSize="100px"
          objectFit="cover"
          borderRadius="md"
        />
        <Box flex="1" ml={4} className="cart-item-name">
          <Heading as="h3" size="md" color="#0b0a20e0">
            {item.name}
          </Heading>
          <Text mt={2} display="flex" alignItems="center" gap="3px"><Image src={rupee} alt="rupee" boxSize={3}/>{item.price? item.price/100 : item.defaultPrice/100}</Text>
        </Box>
        <Box w="100px" color="orange">
          <Text>Quantity: {item.quantity}</Text>
        </Box>
        <Button colorScheme="teal" variant="ghost" onClick={handlerRemoveCart}>
           <DeleteIcon boxShadow={14}/>
        </Button>
      </Flex>
    );
  };

export default CartItem;