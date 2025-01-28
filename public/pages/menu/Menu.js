import "./Menu.scss";
import Menubody from "./body/Menubody";
import MenuNavbar from "../../components/navbar/menuNavbar/MenuNavbar";
import { useSelector } from "react-redux";

const Menu = () => {

  const cartAll = useSelector((state) => state.cart.cartItems);

  return (
    <div className="menu">
      <MenuNavbar cartLen={cartAll.length} />
      <Menubody />
    </div>
  );
};

export default Menu;
