import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Card, CardImg, Button, Col } from 'reactstrap'
import ReactPlayer from 'react-player'

import { dataPhotos, dataVideos, red, redDark, greyLight, greyDark } from '../tools/globalVariables'

function Media(props) {

  props.changeScreen('Médias officiels')

  // Styles for buttons
  const styleActiveBtn = {
    width: 120,
    backgroundColor: red,
    borderColor: redDark
  }

  const styleInactiveBtn = {
    width: 120,
    backgroundColor: greyLight,
    borderColor: greyDark
  }

  const [showPhotos, setShowphotos] = useState(true)
  const [styleBtnPhotos, setStyleBtnPhotos] = useState(styleActiveBtn)
  const [styleBtnVideos, setStyleBtnVideos] = useState(styleInactiveBtn)

  // Generate medias with responsive values
  let allPhotos = dataPhotos.map((photo, i) => {
    return (
      <Col xs="12" sm="6" md='4' lg='3' >
        <Card style={{ marginBottom: 20 }}>
          <CardImg top width="100%" src={photo} alt="photo" />
        </Card>
      </Col>
    )
  })

  let allVideos = dataVideos.map((video, i) => {
    return (
      <Col style={{ display: 'flex', justifyContent: 'center' }}>
        <ReactPlayer url={video} controls style={{ marginBottom: 30 }} />
      </Col>
    )
  })

  return (
    <Container fluid style={{
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100vh'
    }}>

      <div style={{ marginBottom: '3%', display: 'flex', justifyContent: 'center' }}>

        <Button onClick={() => { setShowphotos(true); setStyleBtnPhotos(styleActiveBtn); setStyleBtnVideos(styleInactiveBtn) }} style={styleBtnPhotos} >Photos</Button>
        <Button onClick={() => { setShowphotos(false); setStyleBtnPhotos(styleInactiveBtn); setStyleBtnVideos(styleActiveBtn) }} style={styleBtnVideos}>Vidéos</Button>

      </div>

      <Row>
        {showPhotos ? allPhotos : allVideos}
      </Row>

    </Container>
  );
}

// Redux functions
function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function (screen) {
      dispatch({ type: 'changeScreen', screen })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Media);
