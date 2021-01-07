import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Input, Container, Row, Button, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'

import ModalModifyAccount from '../components/ModalModifyAccount'
import { serverUrl, genericAvatarUrl, redLight, redDark, colorLight } from '../tools/globalVariables'


function MyAccount(props) {

  props.changeScreen('Mon compte')

  const [avatar, setAvatar] = useState(props.userInfos.avatar === null || props.userInfos.avatar === '' || props.userInfos.avatar === undefined ? genericAvatarUrl : props.userInfos.avatar)
  const [firstName, setFirstName] = useState(props.userInfos.firstName)
  const [lastName, setLastName] = useState(props.userInfos.lastName)
  const [nationality, setNationality] = useState(props.userInfos.nationality)
  const [password, setPassword] = useState('')
  const [modalPassShow, setModalPassShow] = useState(false);
  const [modalInfosShow, setModalInfosShow] = useState(false);

  // Secure myAccount screen if user is not logged in
  if (props.userInfos.email == null) {
    return <Redirect to='/' />
  }

  const handleChangePassword = async () => {
    // Modify password in BDD
    await fetch(`${serverUrl}/user/update-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.userInfos.token}&newValue=${password}`
    })

    setPassword('')
  }

  const handleSaveNewProfile = async () => {
    // Create object for updating BDD
    const updateFields = {
      userFirstName: firstName,
      userLastName: lastName,
      userNationality: nationality,
      userEmail: props.userInfos.email,
      userAvatar: avatar
    }

    // Create object for reducer
    const newProfile = {
      firstname: firstName,
      lastname: lastName,
      nationality: nationality,
      email: props.userInfos.email,
      avatar: avatar,
      token: props.userInfos.token,
      status: props.userInfos.status
    }

    props.recordUser(newProfile);

    const strUpdateFields = JSON.stringify(updateFields)

    // Modify user in BDD
    await fetch(`${serverUrl}/user/update-user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${props.userInfos.token}&newValue=${strUpdateFields}`
    })
  }

  // Generate both modals
  const modalPassContent = (
    <Input id='password' placeholder='Nouveau mot de passe' type='password' onChange={(e) => { setPassword(e.target.value) }} />
  )

  const modalInfosContent = (
    <div>
      <p>Prénom : <Input id='firstName' value={firstName} placeholder='Prénom' type='text' onChange={(e) => { setFirstName(e.target.value) }} /></p>
      <p>Nom : <Input id='lastName' value={lastName} placeholder='Nom' type='text' onChange={(e) => { setLastName(e.target.value) }} /></p>
      <p>Code nationalité : <Input id='nationality' value={nationality} placeholder='Code nationalité' type='text' onChange={(e) => { setNationality(e.target.value) }} /></p>
    </div>
  )

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

          <ModalModifyAccount show={modalPassShow} onHide={() => setModalPassShow(false)} content={modalPassContent} click={() => handleChangePassword()} />
          <ModalModifyAccount show={modalInfosShow} onHide={() => setModalInfosShow(false)} content={modalInfosContent} click={() => handleSaveNewProfile()} />

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
                    <FontAwesomeIcon icon={faPenSquare} onClick={() => setModalInfosShow(true)} style={{ color: redDark, marginRight: 5 }} />
                    <CardText>Prénom: {firstName}</CardText>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FontAwesomeIcon icon={faPenSquare} onClick={() => setModalInfosShow(true)} style={{ color: redDark, marginRight: 5 }} />
                    <CardText>Nom: {lastName}</CardText>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <FontAwesomeIcon icon={faPenSquare} onClick={() => setModalInfosShow(true)} style={{ color: redDark, marginRight: 5 }} />
                    <CardText>Nationalité: {nationality}</CardText>
                  </div>

                  <CardText>Email: {props.userInfos.email}</CardText>
                  <Button onClick={() => setModalPassShow(true)} style={{ backgroundColor: redDark, color: colorLight, border: 'none', width: '80%' }}>Modifier mot de passe</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  );
}

// Redux functions
function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function (screen) {
      dispatch({ type: 'changeScreen', screen })
    },
    recordUser: function (user) {
      dispatch({ type: 'record', user: user })
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
