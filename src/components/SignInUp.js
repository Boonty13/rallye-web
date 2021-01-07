import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, Button } from 'reactstrap'
import { Modal } from 'react-bootstrap'

import { colorLight, serverUrl, redDark } from '../tools/globalVariables'

function SignInUp(props) {

  const [emailSignIn, setEmailSignIn] = useState('');
  const [passwordSignIn, setPasswordSignIn] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorsSignIn, setErrorsSignIn] = useState([]);
  const [errorsSignUp, setErrorsSignUp] = useState([]);


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
      props.log()
      props.onHide()

      // reset states
      setErrorsSignUp([])
      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')

    } else {
      setErrorsSignUp(answer.error.map((err) => (
        <p>{err}</p>
      )))
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
      props.log()
      props.onHide()

      // reset states
      setErrorsSignIn([])
      setEmailSignIn('')
      setPasswordSignIn('')

    } else {
      setErrorsSignIn(answer.error.map((err) => (
        <p>{err}</p>
      )))
    }
  }

  return (
    <Modal show={props.show} onHide={() => { props.onHide(); setErrorsSignIn([]) ; setErrorsSignUp([]) }} size="lg" centered >

      <Modal.Footer style={{ flexDirection: 'column', textAlign: 'center' }}>
        <h4>Se connecter</h4>

        <Input id='email' placeholder='Email' type='text' onChange={(e) => { setEmailSignIn(e.target.value) }} />
        <Input id='password' placeholder='Mot de passe' type='password' onChange={(e) => { setPasswordSignIn(e.target.value) }} />
        <Button style={{ margin: 10, backgroundColor: redDark, color: colorLight, border: 'none' }} onClick={() => { processSignIn() }} type="submit" >Valider</Button>
        {errorsSignIn}
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
        <Button style={{ margin: 10, backgroundColor: redDark, color: colorLight, border: 'none' }} onClick={() => { processSignUp() }} type='submit'>Valider</Button>
        {errorsSignUp}
      </Modal.Footer>

    </Modal>
  );
}

// Redux functions
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
