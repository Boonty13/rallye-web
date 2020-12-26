import React, { useEffect, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import SignInUp from '../components/SignInUp'
import { Button } from 'react-bootstrap'
import { redDark, redLight, colorDark, colorLight, greyBlack, greyDark, greyLight } from '../tools/globalVariables'


function Navigation(props) {

  const [collapsed, setCollapsed] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(()=>{
    console.log('LOG : ', logged)
    if (props.userInfos.length > 0 ){
      setLogged(true)
    }
  }, [logged])

  const toggleLogged = ()=> setLogged(!logged)

  const toggleNavbar = () => setCollapsed(!collapsed)

  console.log('USER CONNECTED : ', props.userInfos)

  return (
    <div >

      {/* MODAL CALL */}
      <SignInUp show={modalShow} onHide={() => setModalShow(false)} log={toggleLogged} />

      {/* NAVIGATION */}
      <Navbar style={{ backgroundColor: redDark, justifyContent: 'left' }} dark>
        <NavbarToggler onClick={toggleNavbar} className="mr-3" />
        <NavbarBrand style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
          {props.screen}

          {logged ?
            <Button onClick={() => {props.reset() ; setLogged(!logged)}}><FontAwesomeIcon icon={faUser} /> Se déconnecter</Button>
            : <Button onClick={() => { setModalShow(true) }}><FontAwesomeIcon icon={faUser} /> Se connecter / S'inscrire</Button>
          }
        </NavbarBrand>
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/" onClick={toggleNavbar}>Accueil</Link>
            </NavItem>
            <NavItem>
              <Link to="/news" onClick={toggleNavbar}>Actualités du rallye</Link>
            </NavItem>
            <NavItem>
              <Link to="/program" onClick={toggleNavbar}>Programme</Link>
            </NavItem>
            <NavItem>
              <Link to="/teams" onClick={toggleNavbar}>Liste des équipes</Link>
            </NavItem>
            <NavItem>
              <Link to="/maplive" onClick={toggleNavbar}>Suivi en direct</Link>
            </NavItem>
            <NavItem>
              <Link to="/ranking" onClick={toggleNavbar}>Classement et résultats</Link>
            </NavItem>
            <NavItem>
              <Link to="/media" onClick={toggleNavbar}>Médias officiels</Link>
            </NavItem>
            <NavItem>
              <Link to="/infos" onClick={toggleNavbar}>Informations pratiques</Link>
            </NavItem>
            <NavItem>
              <Link to="/chat" onClick={toggleNavbar}>Messagerie instantanée</Link>
            </NavItem>
            <NavItem>
              <Link to="/myaccount" onClick={toggleNavbar}>Mon compte</Link>
            </NavItem>
            <NavItem>
              <Link to="/" onClick={toggleNavbar}>Se déconnecter</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    reset: function () {
      dispatch({
        type: 'reset'
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    screen: state.screenName,
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
