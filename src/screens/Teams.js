import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Button } from 'reactstrap'

import CardTeam from '../components/CardTeam'
import { serverUrl, red, redDark, greyDark, greyLight } from '../tools/globalVariables'

function Teams(props) {

  props.changeScreen('Liste des équipes')

  // Style for buttons
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

  const [allTeams, setAllTeams] = useState([])
  const [teamToDisplay, setTeamToDisplay] = useState([])
  const [styleBtnAll, setStyleBtnAll] = useState(styleActiveBtn)
  const [styleBtnReg, setStyleBtnReg] = useState(styleInactiveBtn)
  const [styleBtnComp, setStyleBtnComp] = useState(styleInactiveBtn)

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

    setStyleBtnAll(styleActiveBtn);
    setStyleBtnComp(styleInactiveBtn)
    setStyleBtnReg(styleInactiveBtn)
  }

  const filterRegularity = () => {
    const filteredTeams = allTeams.filter(team => categoryRegularity.includes(team.category));
    setTeamToDisplay(filteredTeams);

    setStyleBtnAll(styleInactiveBtn);
    setStyleBtnComp(styleInactiveBtn)
    setStyleBtnReg(styleActiveBtn)
  }

  const filterCompetition = () => {
    const filteredTeams = allTeams.filter(team => !categoryRegularity.includes(team.category));
    setTeamToDisplay(filteredTeams);

    setStyleBtnAll(styleInactiveBtn);
    setStyleBtnComp(styleActiveBtn)
    setStyleBtnReg(styleInactiveBtn)
  }


  // Show filtered teams
  const teams = teamToDisplay.map((team, i) => {
    return <CardTeam key={team._id} infoTeam={team} ></CardTeam>
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

        <Button onClick={() => noFilter()} style={styleBtnAll}>Tous</Button>
        <Button onClick={() => filterRegularity()} style={styleBtnReg} >Régularité</Button>
        <Button onClick={() => filterCompetition()} style={styleBtnComp}>Compétition</Button>

      </div>

      <Row>
        {teams}
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

function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teams);
