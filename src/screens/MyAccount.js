import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Button, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import { serverUrl, genericAvatarUrl, redLight, redDark, colorLight } from '../tools/globalVariables'
import { Redirect } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'


function MyAccount(props) {
  props.changeScreen('Mon compte')

  let avatar = props.avatar
  if (avatar === '') {
    avatar = genericAvatarUrl
  }

  // Secure myAccount screen if user is not logged in
  if (props.userInfos.email == null) {
    return <Redirect to='/' />
  }

  return (
    <Container fluid style={{
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100%'
    }}>

      <Row>
        <Col>
          <Card style={{ borderColor: redLight }}>
            <CardBody>
              <CardTitle tag="h5">Mes informations personnelles</CardTitle>
            </CardBody>
            <CardBody>
              <div style={{ display: 'flex' }}>
                <div style={{ width: '30%', marginRight: '5%' }}>
                  <img width='100%' src={avatar} alt="My avatar" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: "65%" }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faPenSquare} style={{ color: redDark, marginRight: 5 }} />
                    <CardText>Prénom: {props.userInfos.firstName}</CardText>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faPenSquare} style={{ color: redDark, marginRight: 5 }} />
                    <CardText>Nom: {props.userInfos.lastName}</CardText>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <FontAwesomeIcon icon={faPenSquare} style={{ color: redDark, marginRight: 5 }} />
                    <CardText>Nationalité: {props.userInfos.nationality}</CardText>
                  </div>

                  <CardText>Email: {props.userInfos.email}</CardText>
                  <Button style={{ backgroundColor: redDark, color: colorLight, border: 'none', width: '80%' }}>Modifier mot de passe</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function (screen) {
      dispatch({ type: 'changeScreen', screen })
    }
  }
}

function mapStateToProps(state) {
  return {
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAccount);
