import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import CardTeam from '../components/CardTeam'
import { Container, Row, Button } from 'reactstrap';

import { serverUrl } from '../tools/globalVariables'

function Teams(props) {
  props.changeScreen('Liste des équipes')

  const [allTeams, setAllTeams] = useState([])
  const [teamToDisplay, setTeamToDisplay] = useState([])
  const [displayButton, setDisplayButton] = useState('Tous')
  const [colorBtnAll, setColorBtnAll] = useState('red')
  const [colorBtnReg, setColorBtnReg] = useState('gray')
  const [colorBtnComp, setColorBtnComp] = useState('gray')

  useEffect(() => {
    async function getTeams() {
      const rawAnswer = await fetch(`${serverUrl}/teams/get-teams`, {
        method: 'GET',
      });
      let allTeamsInfos = await rawAnswer.json();
      setAllTeams(allTeamsInfos.teams);
      setTeamToDisplay(allTeamsInfos.teams);
    }
    getTeams()
  }, []);

  const categoryRegularity = ['Basse', 'Intermédiaire', 'Haute'];

  //// Function for filterirng team with category ////
  const noFilter = () => {
    const filteredTeams = allTeams;
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Tous');

    setColorBtnAll('red');
    setColorBtnComp('gray')
    setColorBtnReg('gray')
  }

  const filterRegularity = () => {
    console.log(allTeams)
    const filteredTeams = allTeams.filter(team => categoryRegularity.includes(team.category));
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Reg');

    setColorBtnAll('gray');
    setColorBtnComp('gray')
    setColorBtnReg('red')
  }

  const filterCompetition = () => {
    const filteredTeams = allTeams.filter(team => !categoryRegularity.includes(team.category));
    setTeamToDisplay(filteredTeams);
    setDisplayButton('Comp');

    setColorBtnAll('gray');
    setColorBtnComp('red')
    setColorBtnReg('gray')
  }


  // Show filtered teams
  const teams = teamToDisplay.map((team, i) => {
    return <CardTeam key={team._id} infoTeam={team} ></CardTeam>
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
      <div style={{ marginBottom: '3%', justifyContent: 'center' }}>

        <Button onClick={() => noFilter()} style={{ backgroundColor: colorBtnAll }}>Tous</Button>
        <Button onClick={() => filterRegularity()} style={{ backgroundColor: colorBtnReg }}>Régularité</Button>
        <Button onClick={() => filterCompetition()} style={{ backgroundColor: colorBtnComp }}>Compétition</Button>

      </div>
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
