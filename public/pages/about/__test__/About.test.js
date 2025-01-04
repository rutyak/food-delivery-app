import { render } from  "@testing-library/react";
import "@testing-library/jest-dom";
import { ChakraProvider } from "@chakra-ui/react";
import About from "../About";

it("testing help component",()=>{

    const {getByText} = render(
        <ChakraProvider>
             <About/>
        </ChakraProvider>
   );

    expect(getByText(/About foodBazaar/i)).toBeInTheDocument()
})