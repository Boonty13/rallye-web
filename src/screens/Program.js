import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { Accordion, Card } from 'react-bootstrap'

import DetailProgram from '../components/DetailProgram'
import { colorLight, redDark, serverUrl, redLight } from '../tools/globalVariables'

function Program(props) {

  props.changeScreen('Programme')

  const [program, setProgram] = useState([])
  const dates = ['14/12/2020', '15/12/2020', '16/12/2020', '17/12/2020', '18/12/2020']  // Forced dates for our MVP. To change if the development continues.

  useEffect(() => {
    async function getProgram() {
      const rawAnswer = await fetch(`${serverUrl}/program/get-program`, {
        method: 'GET',
      });
      let program = await rawAnswer.json();
      setProgram(program.program);
    }
    getProgram()
  }, []);

  let fullProgram = dates.map((day, i) => {
    return (
      <Card style={{ borderLeft: 'none', borderRight: 'none', borderTopColor: redLight }}>

        <Accordion.Toggle as={Card.Header} eventKey={i + 1} style={{ backgroundColor: redDark, color: colorLight }}>
          {day}
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={i + 1}>
          <DetailProgram day={day} program={program} />
        </Accordion.Collapse>

      </Card>
    )
  })

  return (
    <Container fluid style={{
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100%'
    }}>

      <Row>
        <Col>
          <Accordion >
            {fullProgram}
          </Accordion>
        </Col>
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
)(Program);
