import React, { useState, useEffect } from 'react'
import { Card, CardTitle, CardImg, CardImgOverlay, Col } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'

import DetailTeam from '../components/DetailTeam'
import { colorDark, greyBlack, redLight, serverUrl, red } from '../tools/globalVariables'
import { connect } from 'react-redux'


function CardTeam(props) {

  const styleFavHeart = {
    color: red,
    fontSize: 23
  }

  const styleDefHeart = {
    color: greyBlack,
    fontSize: 23
  }

  const styleZoom = {
    color: greyBlack,
    fontSize: 23,
    marginTop: 10
  }

  const [modalShow, setModalShow] = useState(false)
  const [styleHeart, setStyleHeart] = useState(styleDefHeart)
  const team = props.infoTeam;


  useEffect(() => {
    const inFavorites = props.userFavorites.filter(fav => fav._id === team._id);
    if (inFavorites.length > 0) {
      setStyleHeart(styleFavHeart)
      // setInFav(true)
    } else {
      setStyleHeart(styleDefHeart)
      // setInFav(false)
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

    <Col xs="12" sm="6" md='4' lg='3' >
      <DetailTeam team={team} show={modalShow} onHide={() => setModalShow(false)} />
      <Card style={{ marginBottom: 30 }}>
        <CardImg style={{ opacity: 0.5 }} src={team.car.image} alt="car picture" />
        <CardImgOverlay style={{ color: colorDark }}>
          <CardTitle tag="h2">#{team.car_id}</CardTitle>
          <div style={{display:'flex', flexDirection:'column'}}>
            <FontAwesomeIcon icon={faHeart} style={styleHeart} onClick={() => { handleFavorite(team._id, team.car_id) }} />
            <FontAwesomeIcon icon={faSearch} style={styleZoom} onClick={() => setModalShow(true)} />
          </div>
        </CardImgOverlay>
      </Card>
    </Col>
  );
};

function mapDispatchToProps(dispatch) {
  return {
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
)(CardTeam);
