import { render } from "@testing-library/react";
import Navbar from "../Navbar";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../store";
import { Provider } from "react-redux";
import VariableContext from "../../../../context/VariableContext";

it("testing navbar", () => {
  const contextValue = { user: {cartLen: "testing data"}};

  const { getByText } = render(
      <BrowserRouter>
        <VariableContext.Provider value={contextValue}>
          <Navbar cartLen={3}/>
        </VariableContext.Provider>
      </BrowserRouter>
  );
  expect(getByText(/Home/i)).toBeInTheDocument();
});
