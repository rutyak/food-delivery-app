import React, { useEffect, useState, useContext, useRef } from "react";
import Card from "../../../components/card/Card";
import Carousel from "../../../components/carousel/Carousel";
import Shimmer from "../../../components/shimmer-effect/Shimmer";
import Search from "../../../components/search-input/Search";
import { Heading, Box, useToast } from "@chakra-ui/react";
import "./Body.scss";
import Filter from "../../../components/filtermodal/FIlter";
import { debounce } from "lodash";
import VariableContext from "../../../../context/VariableContext";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../public/Firebase";

const Base_url = process.env.REACT_APP_RESTAURANTS_API_URL;

const Body = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredCard, setFilteredCard] = useState([]);
  const [allCard, setAllCard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { location } = useContext(VariableContext);
  const eventRef = useRef(null);
  const toast = useToast();
  const loc = useLocation();
  const [user] = useAuthState(auth);

  const isToastActive = useRef(false);

  if (!user && loc.state?.message && !isToastActive.current) {
    isToastActive.current = true;

    toast({
      title: "Please login to access the cart!!",
      status: "error",
      duration: 3000,
      isClosable: true,
      onCloseComplete: () => {
        isToastActive.current = false;
      },
    });
  }

  useEffect(() => {
    getData();
  }, [location]);

  const handleInfiniteScroll = async () => {
    const scrollPosition =
      document.documentElement.scrollTop + window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollPosition + 1 >= scrollHeight) {
      removeEventListener("scroll", eventRef.current);
      return;
    }

    if (scrollPosition + 300 >= scrollHeight) {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${Base_url}?lat=${location.lat}&lng=${location.long}`
        );

        console.log(res);
        const data = await res.json();

        const newCards =
          data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants;

        setAllCard((prevCard) => [...(prevCard || []), ...(newCards || [])]);
        setFilteredCard((prevCard) => [
          ...(prevCard || []),
          ...(newCards || []),
        ]);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  eventRef.current = debounce(handleInfiniteScroll, 100);

  useEffect(() => {
    addEventListener("scroll", eventRef.current);

    return () => removeEventListener("scroll", eventRef.current);
  }, []);

  async function getData() {
    try {
      const res = await fetch(
        `${Base_url}?lat=${location.lat}&lng=${location.long}`
      );
      const data = await res.json();

      setData(data?.data);

      const restaurants =
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      setAllCard(restaurants);
      setFilteredCard(restaurants);

      console.log("fetched restaurants::", restaurants);
    } catch (error) {
      console.error(error);
    }
  }

  return allCard?.length === 0 ? (
    <Shimmer />
  ) : (
    <Box className="home-page">
      <Search
        setFilteredCard={setFilteredCard}
        setSearch={setSearch}
        search={search}
        allCard={allCard}
      />
      {window.innerWidth > 885 &&
      data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info?.length >
        0 ? (
        <Carousel
          suggestions={
            data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info
          }
          title={data?.cards[0]?.card?.card.header?.title}
        />
      ) : (
        " "
      )}
      {window.innerWidth > 885 &&
      data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        ?.length > 0 ? (
        <Carousel
          suggestions={
            data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          }
          title={data?.cards[1]?.card?.card.header?.title}
        />
      ) : (
        " "
      )}
      <Box mt="1rem" className="grid-card-heading">
        <Heading as="h2" fontSize="24px" mb="1rem">
          {data?.cards[2]?.card?.card?.title}
        </Heading>
        <Filter
          setFilteredCard={setFilteredCard}
          filteredCard={filteredCard}
          allCard={allCard}
        />
        <Box className="restaurant-grid-card">
          {filteredCard?.length > 0 &&
            filteredCard?.map((data, index) => {
              const uniqueKey = data?.info?.id || `fallback-${index}`;
              return (
                <>
                  <Card key={uniqueKey} {...data?.info} grid="grid" />
                </>
              );
            })}
          {isLoading && <Shimmer newLoad="newLoad" />}
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
