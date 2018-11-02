import React, { Component } from 'react';

//import dependencies
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import store from '../store';

class MyNavbar extends Component {
  
  render() {
    return (
      <div className="MyNavbar">
<Navbar>
    <Link to="/"> <Navbar.Brand className="text-white">Quiz App</Navbar.Brand></Link>
    <Nav className="mr-auto">

    </Nav>
    <Nav> 
      <Nav.Link href="/scoreboard" className="text-white">Scoreboard</Nav.Link>
      <Nav.Link href="/add" className="text-white">{store.getState().login.state ? ("Add Questions") : ("")}</Nav.Link>
      <Nav.Link href="/login" className="text-white">{store.getState().login.state ? (<img className="navbarprofilepic" src={store.getState().login.picture} alt={store.getState().login.username} />) : ("Login")}</Nav.Link>
    </Nav>
  </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
