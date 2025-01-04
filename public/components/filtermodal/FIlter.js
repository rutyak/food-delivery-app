import { Button, Box } from "@chakra-ui/react";
import "./Filter.scss";
import { useState } from "react";

const Filter = ({ setFilteredCard, filteredCard, allCard }) => {

  console.log("filteredCard :", filteredCard);
  
  const [togglebtn, setToggleBtn] = useState({
    all: false,
    pureVeg: false,
    ratings: false,
    fast: false,
    lessThan200: false,
  });

  const handleFilter = (type) => {
    setToggleBtn({
      all: false,
      pureVeg: false,
      ratings: false,
      fast: false,
      lessThan200: false,
      [type]: !togglebtn[type],
    });

    let newFilteredCard = [];
    switch (type) {
      case "all":
        newFilteredCard = allCard;
        break;
      case "pureVeg":
        newFilteredCard = filteredCard.filter(
          (card) => card?.info?.veg === true
        );
        break;
      case "ratings":
        newFilteredCard = filteredCard.filter(
          (card) => card?.info?.avgRating > 4
        );
        break;
      case "fast":
        newFilteredCard = filteredCard.filter((card) => {
          if (card?.info?.sla?.slaString === "15-20 mins") {
            return card;
          }
        });
        break;
      case "lessThan200":
        newFilteredCard = filteredCard.filter(
          (card) =>
            card?.info?.costForTwo === "₹300 for two" ||
            card?.info?.costForTwo === "₹250 for two" ||
            card?.info?.costForTwo === "₹350 for two"
        );
        break;
    }
    setFilteredCard(newFilteredCard);
    console.log("filtered cards::", filteredCard);
  };

  return (
    <>
      <Box className="restaurant-grid-filter">
        <Box display="flex" gap="10px">
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleFilter("all")}
            bgColor={togglebtn.all ? "black" : "white"}
          >
            All
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleFilter("pureVeg")}
            bgColor={togglebtn.pureVeg ? "black" : "white"}
          >
            Pure Veg
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleFilter("ratings")}
            bgColor={togglebtn.ratings ? "black" : "white"}
          >
            Ratings 4.0+
          </Button>
        </Box>
        <Box display="flex" gap="10px">
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleFilter("fast")}
            bgColor={togglebtn.fast ? "black" : "white"}
          >
            Fast Delivery
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => handleFilter("lessThan200")}
            bgColor={togglebtn.lessThan200 ? "black" : "white"}
          >
            Less than Rs.200
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Filter;
