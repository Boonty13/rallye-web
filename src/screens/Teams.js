import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CardTeam from '../components/CardTeam'
import { Container, Card, CardTitle, CardText, CardImg, CardImgOverlay, CardFooter, Col, Row } from 'reactstrap';

import { serverUrl } from '../tools/globalVariables'

function Teams(props) {
  props.changeScreen('Liste des équipes')

  const [allTeams, setAllTeams] = useState([])

  useEffect(() => {
    async function getTeams() {
      const rawAnswer = await fetch(`${serverUrl}/teams/get-teams`, {
        method: 'GET',
      });
      let allTeamsInfos = await rawAnswer.json();
      console.log(allTeamsInfos)
      setAllTeams(allTeamsInfos.teams);
      // setTeamToDisplay(allTeamsInfos.teams);
    }
    getTeams()
  }, []);

  const teams = allTeams.map((team, i) => {
    return <CardTeam key={team._id} infoTeam={allTeams[i]} ></CardTeam>
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
      <Row>
        {teams}
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
)(Teams);
