import React, { useState, useEffect } from 'react'
import { Card, CardTitle, CardImg, CardImgOverlay, Col } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons'

import DetailNews from '../components/DetailNews'
import { colorDark, greyBlack, redLight, serverUrl } from '../tools/globalVariables'
import { connect } from 'react-redux'


function CardNews(props) {

  const [modalShow, setModalShow] = useState(false)
  const news = props.infoNews;

  return (

    <Col xs="12" sm="6" md='4' lg='3' >
      <DetailNews news={news} show={modalShow} onHide={() => setModalShow(false)} />
      <Card style={{ marginBottom: 30 }}>
        <CardImg style={{ opacity: 0.5 }} src={news.image} alt="car picture" />
        <CardImgOverlay style={{ color: colorDark }} onClick={() => setModalShow(true)} >
          <CardTitle tag="h6">{news.title}</CardTitle>
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
)(CardNews);
