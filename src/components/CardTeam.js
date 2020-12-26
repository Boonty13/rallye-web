import React, { useState } from 'react'
import { Card, CardTitle, CardImg, CardImgOverlay, Col } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import DetailTeam from '../components/DetailTeam'


function CardTeam(props) {

  const [modalShow, setModalShow] = useState(false);
  const team = props.infoTeam


  return (

    <Col xs="12" sm="6" md='4' lg='3' >
      <DetailTeam team={team} show={modalShow} onHide={() => setModalShow(false)} />
      <Card style={{ marginBottom: 30 }}>
        <CardImg style={{ opacity: 0.5 }} src={team.car.image} alt="car picture" />
        <CardImgOverlay style={{ color: 'black' }} onClick={() => setModalShow(true)}>
          <CardTitle tag="h2">#{team.car_id}</CardTitle>
          <FontAwesomeIcon icon={faHeart} color='none' style={{ fontSize: 23 }} />
        </CardImgOverlay>
      </Card>
    </Col>
  );
};

export default CardTeam;