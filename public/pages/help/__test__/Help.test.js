import { render } from  "@testing-library/react";
import "@testing-library/jest-dom";
import Help from "../Help";
import { ChakraProvider } from "@chakra-ui/react";

it("testing help component",()=>{

    const {getByText} = render(
        <ChakraProvider>
             <Help/>
        </ChakraProvider>
   );

    expect(getByText(/Frequently Asked Questions/i)).toBeInTheDocument()
})