import React, { useContext } from 'react';
import './Navbar.scss';
import Login from '../../pages/authentication/Login';
import { Link } from "react-router-dom";
import VariableContext from '../../../context/VariableContext';
import Drawer from "../drawer/Drawer";

const Navbar = ({cartLen}) => {

  const { user } = useContext(VariableContext);

  return (
        <ul className='navbar'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About us</Link></li>
            <li><Link to='/help'>Help</Link></li>
            <li><Link to='/cart'>Cart{" "}({cartLen})</Link></li>
            { user? <Drawer/> : <li><Login /></li>}
        </ul>
  )
}

export default Navbar