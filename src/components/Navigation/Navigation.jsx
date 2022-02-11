import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Navbar } from 'react-bootstrap';
import "./style.css"

const Navigation = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const itemType = location.pathname.split("/")[1];
  const itemId = location.pathname.split("/")[2];
  const season = location.pathname.split("/")[3];

  return (
    <Navbar className="mobile-navigation mobile-display">
        <Container className="navigation-back">
            {season === undefined && <Link to="/"><Button><i className="bi bi-arrow-left-short"></i></Button></Link>}
            {season && <Link to={"/" + itemType + "/" + itemId}><Button><i className="bi bi-arrow-left-short"></i></Button></Link>}
        </Container>
    </Navbar>
  );
};

export default Navigation;

// {season && <Button onClick={() => navigate(-1)}><i className="bi bi-arrow-left-short"></i></Button>}