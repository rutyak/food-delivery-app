import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import Card from "../card/Card";
import "./Carousel.scss";

const Carousel = ({ suggestions, title }) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const amount = 900;
      scrollRef.current.scrollBy({
        left: direction === "left" ? amount : -amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="carousel-container">
      <Box className="carousel-heading">
        <Heading as="h2" fontSize="24px">
          {title}
        </Heading>
        <Box display="flex" gap="34px" zIndex="10 !important">
          <Button
            onClick={() => handleScroll("right")}
            borderRadius="20px"
            data-testid="right-btn"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={() => handleScroll("left")}
            borderRadius="20px"
            data-testid="left-btn"
          >
            <ChevronRightIcon />
          </Button>
        </Box>
      </Box>
      <Box className="carousel-card" ref={scrollRef} data-testid="carousel">
        {suggestions?.map((data) => {
          return (
            <>
              <Card {...data?.info} {...data} key={data?.info?.id} />
            </>
          );
        })}
      </Box>
    </div>
  );
};

export default Carousel;
