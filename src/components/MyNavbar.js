import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import store from '../Store';

class MyNavbar extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="MyNavbar">
<Navbar>
    <Link to="/"> <Navbar.Brand className="text-white">Quiz App</Navbar.Brand></Link>
    <Nav className="mr-auto">

    </Nav>
    <Nav> 
      <Nav.Link href="/scoreboard" className="text-white">Scoreboard</Nav.Link>
      <Nav.Link href="/add" className="text-white">{store.getState().logged ? ("Add Questions") : ("")}</Nav.Link>
      <Nav.Link href="/login" className="text-white">{store.getState().logged ? (<img className="navbarprofilepic" src={store.getState().profilepic} alt={store.getState().username} />) : ("Login")}</Nav.Link>
    </Nav>
  </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
