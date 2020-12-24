import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'reactstrap';

import {connect} from 'react-redux'


// const serverUrl = 'https://serene-coast-48705.herokuapp.com'
const serverUrl = 'http://192.168.1.86:3000'

function SignInUp(props) {


  const [emailSignIn, setEmailSignIn] = useState(null);
  const [passwordSignIn, setPasswordSignIn] = useState(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [visible, setVisible] = useState(false);
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

      // props.navigation.navigate('Home');
    } else {
      setErrors(answer.error);
      // toggleOverlay();
    }
  }

  /////////////// SIGN IN //////////////////////
  async function processSignIn() {

    const dataUser = {
      email:emailSignIn,
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
      // storeData(answer.data.token, answer.data.status);
      // props.navigation.navigate('Home');
    } else {
      setErrors(answer.error);
      // toggleOverlay();

    }
  }

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >

      <Modal.Footer style={{ flexDirection: 'column', textAlign: 'center' }}>
        <h4>Se connecter</h4>

        <Input id='email' placeholder='Email' type='text' onChange={(e)=>{setEmailSignIn(e.target.value)}} />
        <Input id='password' placeholder='Mot de passe' type='password' onChange={(e)=>{setPasswordSignIn(e.target.value)}} />
        <Button style={{ margin: 10 }} onClick={()=>{processSignIn() ; props.onHide()}} type="submit" >Valider</Button>
      </Modal.Footer>

      <Modal.Footer style={{ flexDirection: 'column' }}>
        <h4>S'inscrire</h4>

        <div>
          <h6>Pourquoi s'inscrire ?</h6>
          <p style={{ marginBottom: 15 }}>
            Vous pourrez ainsi débloquer des fonctionnalités en ajoutant des pilotes à vos favoris. Ainsi, vous pourrez les suivre en direct pendant le rallye !
          </p>
        </div>

        <Input id='firstName' placeholder='Prénom' type='text' onChange={(e)=>{setFirstName(e.target.value)}} />
        <Input id='lastName' placeholder='Nom' type='text' onChange={(e)=>{setLastName(e.target.value)}} />
        <Input id='email' placeholder='Email' type='text' onChange={(e)=>{setEmail(e.target.value)}} />
        <Input id='password' placeholder='Mot de passe' type='password' onChange={(e)=>{setPassword(e.target.value)}} />
        <Button style={{ margin: 10 }} onClick={()=>{processSignUp() ; props.onHide()}} type='submit'>Valider</Button>
      </Modal.Footer>

    </Modal>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    record: function(user) { 
      dispatch( {type: 'record', user }) 
    }
  }
}

export default connect(
    null, 
    mapDispatchToProps
)(SignInUp);
