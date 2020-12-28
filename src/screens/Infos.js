import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Accordion, Card } from 'react-bootstrap'
import { Container, Row, Button, Col, ListGroup, ListGroupItem, Badge, Collapse } from 'reactstrap'
import { serverUrl, red, redLight, redDark, greyLight, greyDark, greyBlack, colorLight, colorDark } from '../tools/globalVariables'

function Infos(props) {
  props.changeScreen('Informations pratiques')

  const [dataArray, setDataArray] = useState([]);
  const [hotel, setHotel] = useState()
  const [catering, setCatering] = useState()
  const [shuttle, setShuttle] = useState()

  useEffect(() => {
    const getData = async () => {

      //// Getting data of accomodation and catering ////
      const rawAnswer = await fetch(`${serverUrl}/user/get-info/mock?token=${props.userInfos.token}`, {
        method: 'GET'
      })
      const answer = await rawAnswer.json();

      //// Format all content field of accordion menu ////
      setHotel(
        <Card style={{ borderLeft: 'none', borderRight: 'none', borderTopColor: redLight }}>
          <Accordion.Toggle as={Card.Header} eventKey='0' style={{ backgroundColor: redDark, color: colorLight }}>
            Hôtel du soir
        </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body style={{backgroundColor:redLight}}>
              <div>{answer.accomodation[0].name}</div>
              <div>{answer.accomodation[0].adress}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )

      setCatering(
        <Card style={{ borderLeft: 'none', borderRight: 'none', borderTopColor: redLight }}>
          <Accordion.Toggle as={Card.Header} eventKey='1' style={{ backgroundColor: redDark, color: colorLight }}>
            Restauration
        </Accordion.Toggle>
          <Accordion.Collapse eventKey='1'>
            <Card.Body style={{backgroundColor:redLight}}>
              <div>{answer.catering[0].adress}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )

      setShuttle(
        <Card style={{ borderLeft: 'none', borderRight: 'none', borderTopColor: redLight }}>
          <Accordion.Toggle as={Card.Header} eventKey='2' style={{ backgroundColor: redDark, color: colorLight }}>
            Infos navettes
        </Accordion.Toggle>
          <Accordion.Collapse eventKey='2'>
            <Card.Body style={{backgroundColor:redLight}}>
              <p>Les navettes que nous vous proposons vous déposent à vos hôtels et aux Parcs Fermés. Les horaires affichés sont à titre indicatif. Les rotations des navettes sont prévues toutes les 30 minutes jusqu'à 9h.</p>
              <p>Point de RDV: {answer.accomodation[0].shuttle_point}</p>
              <div>Horaires: {answer.accomodation[0].shuttle_hours.map(shuttle => { return <div key={shuttle}>{shuttle}</div> })}</div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )
    }
    getData()
  }, [])

  return (
    <Container fluid style={{
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100%'
    }}>

      <p>{props.userInfos.firstName}, </p>
      <p>Vous trouverez ici, toutes les informations utiles pour votre hébergement, les points de restauration ainsi que les horaires des navettes allant du Parc Fermé à votre hôtel. </p>
      <p>Si vous utilisez nos services de bagageries, n'oubliez pas de récupérer vos bagages avant de prendre la navette qui vous déposera à votre hôtel. </p>


      <Row>
        <Col>
          <Accordion >
            {hotel}
            {catering}
            {shuttle}
          </Accordion>
        </Col>
      </Row>

    </Container>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function (screen) {
      dispatch({ type: 'changeScreen', screen })
    }
  }
}

function mapStateToProps(state) {
  return {
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Infos);
