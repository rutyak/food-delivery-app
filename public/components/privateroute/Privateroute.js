import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../public/Firebase";
import { useNavigate } from "react-router-dom";

const Privateroute = ({ children }) => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    return (
      navigate("/",{resplace: true, state: {from: "/cart",message: "Please log in to access cart !!"}})
    );
  } else {
    return children;
  }
};

export default Privateroute;
