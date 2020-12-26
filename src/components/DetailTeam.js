import React, { useState } from 'react'
import { Modal, Button, Image } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Input } from 'reactstrap';

import { connect } from 'react-redux'
import { serverUrl } from '../tools/globalVariables'
import { namePilot, fullNamePilot, flagNationality } from '../tools/functions'


function DetailTeam(props) {

  console.log(props.team)
  const team = props.team

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >

      <Modal.Header>
        <h4>#{team.car_id} - {namePilot(team.pilot_1.firstname, team.pilot_1.name)} / {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</h4>
      </Modal.Header>

      <Modal.Body style={{ flexDirection: 'column' }}>
        <div>{team.car.brand} - {team.car.model} - {team.car.year}</div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:15, marginBottom:25}}>
          <Image src={team.car.image} width='90%'/>
        </div>
        <div>{team.car.description}</div>

      </Modal.Body>

      <Modal.Footer >
        <FontAwesomeIcon icon={faHeart} color='none' style={{ fontSize: 23 }} />
        <Button style={{ margin: 10 }} onClick={() => { props.onHide() }} >Retour</Button>
      </Modal.Footer>

    </Modal>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    record: function (user) {
      dispatch({ type: 'record', user })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DetailTeam);
