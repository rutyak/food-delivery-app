import Header from "../Header";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../../../store";
import { render, screen } from "@testing-library/react";
import VariableContext from "../../../../../context/VariableContext";
import Navbar from "../../../../components/navbar/Navbar";
import { BrowserRouter } from "react-router-dom";

describe("Header Component", () => {
  const contextValue = { user: { cartLen: 3 } };
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <VariableContext.Provider value={contextValue}>
            <Header />
            <Navbar cartLen={3} />
          </VariableContext.Provider>
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/Food Bazaar/i)).toBeInTheDocument();
  });
});
