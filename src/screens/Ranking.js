import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Button, Col, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { Image } from 'react-bootstrap'

import { serverUrl, redDark, redLight, greyBlack, greyDark, greyLight, colorLight, colorDark } from '../tools/globalVariables'
import { fullNamePilot, namePilot, flagNationality } from '../tools/functions'
function Ranking(props) {
  props.changeScreen('Classement et résultats')

  const styleActiveBtn = {
    width: 120,
    backgroundColor: redLight,
    borderColor: redDark
  }

  const styleInactiveBtn = {
    width: 120,
    backgroundColor: greyLight,
    borderColor: greyDark
  }

  const [teamToDisplay, setTeamToDisplay] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [styleBtnReg, setStyleBtnReg] = useState(styleActiveBtn)
  const [styleBtnComp, setStyleBtnComp] = useState(styleInactiveBtn)

  const categoryRegularity = ['Basse', 'Intermédiaire', 'Haute'];

  useEffect(() => {
    async function getResults() {
      const rawAnswer = await fetch(`${serverUrl}/results/results`, {
        method: 'GET',
      });
      let answer = await rawAnswer.json();
      setAllResults(answer.results);

      //// Setting displayed result on regularity ////
      let filteredTeams = answer.results.filter(team => categoryRegularity.includes(team.team_id.category));
      setTeamToDisplay(filteredTeams);
    }
    getResults()
  }, []);

  //// Functions for filtering results with category ////
  let filterRegularity = () => {
    const filteredTeams = allResults.filter(team => categoryRegularity.includes(team.team_id.category));
    setTeamToDisplay(filteredTeams);

    setStyleBtnComp(styleInactiveBtn)
    setStyleBtnReg(styleActiveBtn)
  }

  let filterCompetition = () => {
    const filteredTeams = allResults.filter(team => !categoryRegularity.includes(team.team_id.category));
    setTeamToDisplay(filteredTeams);

    setStyleBtnComp(styleActiveBtn)
    setStyleBtnReg(styleInactiveBtn)
  }


  //// Building card result ////
  let teamRankingBig = teamToDisplay.map((team, i) => {
    return (
      <Col md='12' className="d-none d-md-block" >
        <ListGroupItem style={{ display: 'flex', alignItems: 'center' }}>

          {team.position === 1 ?
            <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: 'gold' }}>{team.position}</Badge>
            : team.position === 2 ?
              <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: 'silver' }}>{team.position}</Badge>
              : team.position === 3 ?
                <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: '#BA660D' }}>{team.position}</Badge>
                : <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: redDark }}>{team.position}</Badge>}


          <div style={{ width: '10%' }}>#{team.team_id.car_id}</div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
            <div><Image src={flagNationality(team.team_id.pilot_1.nationality)} width='20px' /> {fullNamePilot(team.team_id.pilot_1.firstname, team.team_id.pilot_1.name)}</div>
            <div><Image src={flagNationality(team.team_id.pilot_1.nationality)} width='20px' /> {fullNamePilot(team.team_id.pilot_2.firstname, team.team_id.pilot_2.name)}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
            <div>{team.time}</div>
            {team.diff !== '' ? <div><small style={{ color: greyLight }}>+{team.diff}</small></div> : <div></div>}
          </div>
        </ListGroupItem>
      </Col>
    )
  })

  let teamRankingSmall = teamToDisplay.map((team, i) => {
    return (
      <Col xs='12' className="d-block d-md-none" >
        <ListGroupItem style={{ display: 'flex', alignItems: 'center' }}>

        {team.position === 1 ?
            <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: 'gold' }}>{team.position}</Badge>
            : team.position === 2 ?
              <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: 'silver' }}>{team.position}</Badge>
              : team.position === 3 ?
                <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: '#BA660D' }}>{team.position}</Badge>
                : <Badge style={{ marginRight: '3%', width: '7%', backgroundColor: redDark }}>{team.position}</Badge>}

          <div style={{ marginRight: '3%', width: '10%' }}>#{team.team_id.car_id}</div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '57%' }}>
            <div><Image src={flagNationality(team.team_id.pilot_1.nationality)} width='20px' /> {namePilot(team.team_id.pilot_1.firstname, team.team_id.pilot_1.name)}</div>
            <div><Image src={flagNationality(team.team_id.pilot_1.nationality)} width='20px' /> {namePilot(team.team_id.pilot_2.firstname, team.team_id.pilot_2.name)}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '20%' }}>
            <div>{team.time}</div>
            {team.diff !== '' ? <div><small style={{ color: greyLight }}>+{team.diff}</small></div> : <div></div>}
          </div>
        </ListGroupItem>
      </Col>
    )
  })

  return (

    <Container fluid style={{
      backgroundColor: "#fd9644",
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100vh'
    }}>
      <div style={{ marginBottom: '3%', display: 'flex', justifyContent: 'center' }}>

        <Button onClick={() => filterRegularity()} style={styleBtnReg} >Régularité</Button>
        <Button onClick={() => filterCompetition()} style={styleBtnComp}>Compétition</Button>

      </div>
      <Row>
        <Col>
          {/* <DetailTeam team={team} show={modalShow} onHide={() => setModalShow(false)} /> */}
          <ListGroup>
            {teamRankingBig}
            {teamRankingSmall}
          </ListGroup>
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

export default connect(
  null,
  mapDispatchToProps
)(Ranking);
