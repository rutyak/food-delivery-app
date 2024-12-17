import { Box, Text, Heading, Image, Button } from "@chakra-ui/react";
import "./MenuCard.scss";
import starIcon from "../../../assets/star-icon.png";
import rupee from "../../../assets/rupee.png";
import { useDispatch } from "react-redux";
import { addCart } from "../../../slice/cartSlice";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";

const MenuCard = ({
  id,
  name,
  description,
  ratings,
  isBestseller,
  price,
  defaultPrice,
  imageId,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded]  = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (id) => {
    const itemDetails = {
      id,
      name,
      ratings,
      price,
      defaultPrice,
      imageId,
      quantity,
    };
    !isAdded && dispatch(addCart(itemDetails));
    setIsAdded(true);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <Box className="item-card" p={4} overflow="hidden" height="224px">
        <Box className="card-text" mb={4} w="72%">
          <Box mb={2}>
            <Text fontSize="md" fontWeight="bold" color="#DD6B20">
              {isBestseller ? "Bestseller" : ""}
            </Text>
          </Box>
          <Box mb={2} className="item-title">
            <Heading as="h3" size="md">
              {name}
            </Heading>
            <Heading as="h3" size="md" className="item-card-price">
              <img src={rupee} alt="rupee" w="10px" />
              <Text>
                {defaultPrice
                  ? Math.floor(defaultPrice / 100)
                  : Math.floor(price / 100)}
              </Text>
            </Heading>
          </Box>
          <Box className="item-rating" mb={2} w="63px">
            {Object.keys(ratings?.aggregatedRating).length !== 0 ? (
              <>
                <img src={starIcon} alt="rating" />
                <Text fontSize="sm">
                  {ratings?.aggregatedRating?.rating} (
                  {ratings?.aggregatedRating?.ratingCountV2})
                </Text>
              </>
            ) : (
              " "
            )}
          </Box>
          <Box
            className="cuisine-menu-card"
            mb={4}
            fontSize="14px"
            color="gray"
          >
            <Text>{description}</Text>
          </Box>
        </Box>
        <Box
          className="item-img-btn"
        >
          {imageId ? (
            <>
              <Box
                mr={4}
                className="menu-items-for-mobile"
              >
                <Image
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                  alt="img-card-menu"
                  boxSize="100px"
                  objectFit="cover"
                />
              </Box>
              <Box
                className="add-btn"
                
              >
                <AddIcon
                  borderRadius="3px"
                  bg="#319795"
                  boxSize={5}
                  color="white"
                  p="2px"
                  onClick={handleIncrease}
                />
                <Button colorScheme="teal" onClick={()=>handleAddToCart(id)}>
                  ADD (<Text>{quantity}</Text>)
                </Button>
                <MinusIcon
                  borderRadius="3px"
                  bg="#319795"
                  boxSize={5}
                  color="white"
                  p="2px"
                  onClick={handleDecrease}
                />
              </Box>
            </>
          ) : (
            <Box className="add-btn-without-img">
              <AddIcon
                borderRadius="3px"
                bg="#319795"
                boxSize={5}
                color="white"
                p="2px"
                onClick={handleIncrease}
              />
              <Button colorScheme="teal" onClick={handleAddToCart}>
                ADD (<Text>{quantity}</Text>)
              </Button>
              <MinusIcon
                borderRadius="3px"
                bg="#319795"
                boxSize={5}
                color="white"
                p="2px"
                onClick={handleDecrease}
              />
            </Box>
          )}
        </Box>
      </Box>
      <hr></hr>
    </>
  );
};

export default MenuCard;
