import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardImg, CardImgOverlay, Col } from 'reactstrap'

import DetailNews from '../components/DetailNews'
import { colorDark } from '../tools/globalVariables'

function CardNews(props) {

  const [modalShow, setModalShow] = useState(false)
  const news = props.infoNews;

  // Return responsive card news
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

// Redux functions
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
