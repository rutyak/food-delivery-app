import { render } from "@testing-library/react";
import Footer from "../Footer";
import "@testing-library/jest-dom";

it("testing footer",()=>{

    const {getByText} = render(
        <Footer/>
    )

    expect(getByText(/Email: foodbazaar.official@gmail.com/i)).toBeInTheDocument();
})