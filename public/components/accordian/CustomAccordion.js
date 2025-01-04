import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import MenuCard from "../../pages/menu/menu-card/MenuCard";

const CustomAccordion = ({title, itemCards}) => {

  return (
    <Accordion allowMultiple>
      <AccordionItem borderTopWidth="0px">
        <h2>
          <AccordionButton _expanded={{ bg: 'gray.200', color: 'black' }}  borderBottomWidth="0px" bg="gray.100" marginBottom="3px">
            <Box as="span" flex="1" textAlign="left">
              {title} ({itemCards.length})
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          {itemCards?.length > 0 &&
            itemCards?.map((card) => {
              return <MenuCard key={card?.card?.info?.id} {...card?.card?.info} />;
            })
          }
        </AccordionPanel>
      </AccordionItem> 
    </Accordion>
  );
};

export default CustomAccordion;
