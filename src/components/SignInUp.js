import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

import { Input, Button } from 'reactstrap';

import { connect } from 'react-redux'
import { colorLight, serverUrl, redDark } from '../tools/globalVariables'
import { storeData } from '../tools/functions'

function SignInUp(props) {


  const [emailSignIn, setEmailSignIn] = useState(null);
  const [passwordSignIn, setPasswordSignIn] = useState(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [errors, setErrors] = useState([]);


  /////////////// SIGN UP //////////////////////
  async function processSignUp() {

    const dataUser = {
      name: lastName,
      firstname: firstName,
      email: email,
      password: password
    }

    ///// Sending request to server //////
    const rawAnswer = await fetch(serverUrl + '/user/sign-up', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    });
    const answer = await rawAnswer.json();

    ///// Recording in reduce store and local if answer is ok //////
    if (answer.recorded === true) {
      props.record(answer.data);
      // storeData(answer.data.token, answer.data.status);
    } else {
      setErrors(answer.error);
    }
  }

  /////////////// SIGN IN //////////////////////
  async function processSignIn() {

    const dataUser = {
      email: emailSignIn,
      password: passwordSignIn
    }

    ///// Sending request to server //////
    const rawAnswer = await fetch(serverUrl + '/user/sign-in', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    });

    const answer = await rawAnswer.json();

    ///// Recording in reduce store and local storage if answer is ok //////
    if (answer.result === true) {

      props.record(answer.data);
      const favorite = answer.data.favorites.map(fav => {
        const returnOb = {};
        returnOb._id = fav._id;
        returnOb.car_id = fav.car_id;
        return returnOb;
      })
      props.retrieveFavoriteTeam(favorite);
      // props.log()
      // storeData(answer.data.token, answer.data.status);

    } else {
      setErrors(answer.error);
    }
  }

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >

      <Modal.Footer style={{ flexDirection: 'column', textAlign: 'center' }}>
        <h4>Se connecter</h4>

        <Input id='email' placeholder='Email' type='text' onChange={(e) => { setEmailSignIn(e.target.value) }} />
        <Input id='password' placeholder='Mot de passe' type='password' onChange={(e) => { setPasswordSignIn(e.target.value) }} />
        <Button style={{ margin: 10, backgroundColor: redDark, color: colorLight, border: 'none' }} onClick={() => { processSignIn(); props.onHide() }} type="submit" >Valider</Button>
      </Modal.Footer>

      <Modal.Footer style={{ flexDirection: 'column' }}>
        <h4>S'inscrire</h4>

        <div>
          <h6>Pourquoi s'inscrire ?</h6>
          <p style={{ marginBottom: 15 }}>
            Vous pourrez ainsi débloquer des fonctionnalités en ajoutant des pilotes à vos favoris. Ainsi, vous pourrez les suivre en direct pendant le rallye !
          </p>
        </div>

        <Input id='firstName' placeholder='Prénom' type='text' onChange={(e) => { setFirstName(e.target.value) }} />
        <Input id='lastName' placeholder='Nom' type='text' onChange={(e) => { setLastName(e.target.value) }} />
        <Input id='email' placeholder='Email' type='text' onChange={(e) => { setEmail(e.target.value) }} />
        <Input id='password' placeholder='Mot de passe' type='password' onChange={(e) => { setPassword(e.target.value) }} />
        <Button style={{ margin: 10, backgroundColor: redDark, color: colorLight, border: 'none' }} onClick={() => { processSignUp(); props.onHide() }} type='submit'>Valider</Button>
      </Modal.Footer>

    </Modal>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    record: function (user) {
      dispatch({ type: 'record', user })
    },
    retrieveFavoriteTeam: function (listFavorites) {
      dispatch({ type: 'retrieveFavoriteTeam', listFavorites })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInUp);
