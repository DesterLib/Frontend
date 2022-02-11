import React from 'react';
import { useLocation } from 'react-router-dom';
import NavUI from './NavUI';
import "./style.css";

const Navbar = ({type}) => {

  return (
    <NavUI
        accounts={[]}
        categories={[]}
        type={type}
    />
  );
};

export default Navbar;