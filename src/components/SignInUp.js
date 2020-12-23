import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'reactstrap';

function SignInUp(props) {

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >

      <Modal.Footer style={{ flexDirection: 'column', textAlign: 'center' }}>
        <h4>Se connecter</h4>

        <Input id='email' placeholder='Email' type='text' />
        <Input id='password' placeholder='Mot de passe' type='password' />
        <Button style={{ margin: 10 }} onClick={props.onHide} type='submit'>Valider</Button>
      </Modal.Footer>

      <Modal.Footer style={{ flexDirection: 'column' }}>
        <h4>S'inscrire</h4>

        <div>
          <h6>Pourquoi s'inscrire ?</h6>
          <p style={{ marginBottom: 15 }}>
            Vous pourrez ainsi débloquer des fonctionnalités en ajoutant des pilotes à vos favoris. Ainsi, vous pourrez les suivre en direct pendant le rallye !
          </p>
        </div>

        <Input id='firstName' placeholder='Prénom' type='text' />
        <Input id='lastName' placeholder='Nom' type='text' />
        <Input id='email' placeholder='Email' type='text' />
        <Input id='password' placeholder='Mot de passe' type='password' />
        <Button style={{ margin: 10 }} onClick={props.onHide} type='submit'>Valider</Button>
      </Modal.Footer>

    </Modal>
  );
}

export default SignInUp

