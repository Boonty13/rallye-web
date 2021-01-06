import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import SignInUp from '../components/SignInUp'
import { redDark, redLight, colorLight } from '../tools/globalVariables'


function Navigation(props) {

  const [collapsed, setCollapsed] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (props.userInfos.length > 0) {
      setLogged(true)
    }
  }, [logged])

  // Show first name if user connected
  const toggleLogged = () => setLogged(!logged)

  // Show all menu if not collapsed
  const toggleNavbar = () => setCollapsed(!collapsed)

  return (
    <div >

      {/* MODAL CALL */}
      <SignInUp show={modalShow} onHide={() => setModalShow(false)} log={toggleLogged} />

      {/* NAVIGATION */}
      <Navbar style={{ backgroundColor: redDark, justifyContent: 'left' }} dark>
        <NavbarToggler onClick={toggleNavbar} className="mr-3" />

        <NavbarBrand style={{ display: 'flex', width: '80%', justifyContent: 'space-between' }}>
          {props.screen}
          <div style={{ color: redLight }}>{logged ? props.userInfos.firstName : ''}</div>
          {logged ?
            <Button style={{ backgroundColor: redLight, color: redDark, border: 'none' }} onClick={() => { props.reset(); setLogged(!logged) }}><FontAwesomeIcon icon={faUser} /> Se déconnecter</Button>
            : <Button style={{ backgroundColor: redLight, color: redDark, border: 'none' }} onClick={() => { setModalShow(true) }}><FontAwesomeIcon icon={faUser} /> Se connecter / S'inscrire</Button>
          }
        </NavbarBrand>

        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/" onClick={toggleNavbar} style={{ color: colorLight }} >Actualités du rallye</Link>
            </NavItem>
            <NavItem>
              <Link to="/program" onClick={toggleNavbar} style={{ color: colorLight }} >Programme</Link>
            </NavItem>
            <NavItem>
              <Link to="/teams" onClick={toggleNavbar} style={{ color: colorLight }} >Liste des équipes</Link>
            </NavItem>
            <NavItem>
              <Link to="/maplive" onClick={toggleNavbar} style={{ color: colorLight }} >Suivi en direct</Link>
            </NavItem>
            <NavItem>
              <Link to="/ranking" onClick={toggleNavbar} style={{ color: colorLight }} >Classement et résultats</Link>
            </NavItem>
            <NavItem>
              <Link to="/media" onClick={toggleNavbar} style={{ color: colorLight }} >Médias officiels</Link>
            </NavItem>

            {/* PILOTS AND ADMINS ONLY */}
            {['pilot', 'admin'].includes(props.userInfos.status) ?
              <span><NavItem>
                <Link to="/infos" onClick={toggleNavbar} style={{ color: colorLight }} >Informations pratiques</Link>
              </NavItem>
                <NavItem>
                  <Link to="/chat" onClick={toggleNavbar} style={{ color: colorLight }} >Messagerie instantanée</Link>
                </NavItem>
                <NavItem>
                  <Link to="/myaccount" onClick={toggleNavbar} style={{ color: colorLight }} >Mon compte</Link>
                </NavItem></span>
              : ''}

          </Nav>
        </Collapse>

      </Navbar>

    </div>
  );
}

// Redux functions
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
