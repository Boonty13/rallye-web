import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Image } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { greyBlack, serverUrl, colorLight, redDark, red } from '../tools/globalVariables'
import { namePilot, fullNamePilot, flagNationality } from '../tools/functions'


function DetailTeam(props) {

  // Style for heart picto
  const styleFavHeart = {
    color: red,
    fontSize: 23
  }

  const styleDefHeart = {
    color: greyBlack,
    fontSize: 23
  }
  const [styleHeart, setStyleHeart] = useState(styleDefHeart)
  const team = props.team

  useEffect(() => {

    // Color in red the picto of favorite teams
    const inFavorites = props.userFavorites.filter(fav => fav._id === team._id);
    if (inFavorites.length > 0) {
      setStyleHeart(styleFavHeart)
    } else {
      setStyleHeart(styleDefHeart)
    }
  }, [props.userFavorites])


  const handleFavorite = async (numTeam, bib) => {
    const filteredFav = props.userFavorites.filter(fav => fav._id === numTeam);

    // Add or Remove this team from my favorites
    if (filteredFav.length < 1) {
      props.addFavoriteTeam({
        _id: numTeam,
        car_id: bib
      })
      setStyleHeart(styleFavHeart)

      // Add new favorite in BDD
      await fetch(`${serverUrl}/user/add-favorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.userInfos.token}&newValue=${numTeam}`
      })

    } else {
      props.removeFavoriteTeam(numTeam)
      setStyleHeart(styleDefHeart)

      // Remove favorite in BDD
      await fetch(`${serverUrl}/user/remove-favorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `token=${props.userInfos.token}&valueToRemove=${numTeam}`
      })
    }
  }

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >

      <Modal.Header style={{ backgroundColor: redDark, color: colorLight }}>
        <h4><b>#{team.car_id}</b> - {namePilot(team.pilot_1.firstname, team.pilot_1.name)} / {namePilot(team.pilot_2.firstname, team.pilot_2.name)}</h4>
      </Modal.Header>

      <Modal.Body style={{ flexDirection: 'column' }}>
        <div>{team.car.brand} - {team.car.model}<i> - {team.car.year}</i></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 15, marginBottom: 25 }}>
          <Image src={team.car.image} width='90%' />
        </div>
        <div style={{ marginBottom: 15 }}>{team.car.description}</div>
        <div>Pilote 1: <Image src={flagNationality(team.pilot_1.nationality)} width='20px' /> {fullNamePilot(team.pilot_1.firstname, team.pilot_1.name)}</div>
        <div>Pilote 2: <Image src={flagNationality(team.pilot_1.nationality)} width='20px' /> {fullNamePilot(team.pilot_2.firstname, team.pilot_2.name)}</div>
      </Modal.Body>

      <Modal.Footer >
        {props.userInfos.token != null ?
          <FontAwesomeIcon icon={faHeart} style={styleHeart} onClick={() => { handleFavorite(team._id, team.car_id) }} />
          : ''}
        <Button style={{ margin: 10, backgroundColor: redDark, color: colorLight, borderColor: redDark }} onClick={() => { props.onHide() }} >Retour</Button>
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
    addFavoriteTeam: function (numTeam) {
      dispatch({ type: 'addFavoriteTeam', numTeam })
    },
    removeFavoriteTeam: function (numTeam) {
      dispatch({
        type: 'removeFavoriteTeam',
        numTeam
      })
    }
  }
}

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailTeam);
