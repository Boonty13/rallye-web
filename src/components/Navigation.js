import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function Navigation(props) {

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div >
      <Navbar style={{ backgroundColor: "red" }} color="faded" light>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <NavbarBrand href="/" className="mr-auto">
          {props.screen}
          <FontAwesomeIcon icon={faUser} onClick={()=>{console.log('OK')}}/>
        </NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Accueil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/news">Actualités du rallye</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/program">Programme</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/teams">Liste des équipes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/maplive">Suivi en direct</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ranking">Classement et résultats</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/media">Médias officiels</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/infos">Informations pratiques</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/chat">Messagerie instantanée</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/myaccount">Mon compte</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Se déconnecter</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    screen: state.screenName
  }
}

export default connect(
  mapStateToProps,
  null
)(Navigation);
