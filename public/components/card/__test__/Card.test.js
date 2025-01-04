import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../Card";
import { BrowserRouter } from "react-router-dom";
import {CardData} from "../../../__mocks__/CardData";

it("testing card component",()=>{

    const {getByText} = render(
        <BrowserRouter>
            <Card {...CardData.info}/>
        </BrowserRouter>
    )

    expect(getByText(/Chinese Wok/i)).toBeInTheDocument();
})