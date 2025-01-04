import {
  Select,
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  Accordion,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import MenuCard from "../menu-card/MenuCard";
import "./MenuOptions.scss";
import CustomAccordion from "../../../components/accordian/CustomAccordion";

const MenuOptions = ({ options }) => {
  return (
    <>
      {!options?.carousel && (
        <Accordion allowMultiple bg="white" className="acco-items">
          <AccordionItem borderTopWidth="0px">
            <h2>
              <AccordionButton
                _expanded={{ bg: "tomato", color: "white" }}
                borderRadius="10px"
              >
                <Box as="span" flex="1" textAlign="left">
                  {options.title} ({options?.itemCards?.length})
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              {options?.itemCards?.length > 0 &&
                options?.itemCards?.map((card, index) => {
                  return (
                    <MenuCard
                      key={`${card?.card?.info?.id || "menu-card"}-${index}`}
                      {...card?.card?.info}
                    />
                  );
                })}
              {options?.categories?.length > 0 &&
                options?.categories?.map((cat, index) => {
                  return (
                    <CustomAccordion
                      key={`${cat?.id || "custom-accordion"}-${index}`}
                      {...cat}
                    />
                  );
                })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};

export default MenuOptions;
