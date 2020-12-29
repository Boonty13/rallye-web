import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux'
import { Container, Row, Button, Col, Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap'
import {Image} from 'react-bootstrap'
import {serverUrl, red, redDark, redLight} from '../tools/globalVariables'
import {schedule} from '../tools/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'


function Welcome(props) {
  props.changeScreen('Accueil')

  const [program, setProgram] = useState([]);
  const [welcome, setWelcome] = useState('Bonjour');

  useEffect(() => {
    // const connection = async () => {
      //// Getting data in local storage if existing ////
      // const answer = await getData();

      //// Record user connected on the reduce store /////
    //   props.recordUser(answer.user);
    //   const favorite = answer.user.favorite.map(fav => {
    //     const returnOb = {};
    //     returnOb._id = fav._id;
    //     returnOb.car_id = fav.car_id;
    //     return returnOb;
    //   })
    //   props.retrieveFavoriteTeam(favorite);
    // }

    //// Retrieve program info from DB ////
    async function getProgram() {
      const rawAnswer = await fetch(`${serverUrl}/program/get-program`, {
        method: 'GET',
      });
      let program = await rawAnswer.json();
      console.log('PROGRAM : ', program)
      setProgram([program.program[0], program.program[1], program.program[2]]);
    }

    // connection();
    getProgram();
    if (props.userInfos.firstName !== null && props.userInfos.firstName !== "" && props.userInfos.firstName !== undefined) {
      setWelcome("Bonjour " + props.userInfos.firstName);
    }
  }, [props.userInfos])

  let programGrid = program.map((planning, i) => (
    <ListGroupItem className="justify-content-between" style={{ display: 'flex', alignItems: 'center', backgroundColor:redLight}}>
      <div >{schedule(planning.date)}</div>

      <div style={{ width: '75%' }}>
        {planning.event.map((task) => (
          <p key={task} style={{ marginBottom: 5 }}>- {task}</p>
        ))}
      </div>
    </ListGroupItem>
  ))

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
        {welcome}
        <Card style={{ marginBottom: 20 }}>
          <CardImg top width="100%" src='https://res.cloudinary.com/dibl3ihpy/image/upload/v1608240003/home_oiaf9t.jpg' alt="photo" />
        </Card>
        {/* <Image style={{ height: 150 }} source={{ uri: 'https://res.cloudinary.com/dibl3ihpy/image/upload/v1608240003/home_oiaf9t.jpg' }} /> */}
        <div style={{ marginLeft: 10 }}>
          ETAPE 4 : VENDREDI 18 DEC.
          <p><FontAwesomeIcon icon={faFlag} style={{ marginRight: 5 }} /> VERS-PONT-DU-GARD</p>
          <p><FontAwesomeIcon icon={faFlagCheckered} style={{ marginRight: 5 }} />CIRCUIT PAUL RICARD</p>
          <p style={{ marginTop: 10 }}>Avant dernière étape du rallye qui partira de Vers-Pont-du-Gard et se terminera au circuit Paul Ricard. Un parcours de plus de 350 km !</p>
        </div>
 
        </Col>
        </Row>
        </Container>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function(screen) { 
      dispatch( {type: 'changeScreen', screen }) 
    },
    recordUser: function (user) {
      dispatch({ type: 'record', user })
    },
    resetUser: function () {
      dispatch({ type: 'reset' })
    },
    retrieveFavoriteTeam: function (listFavorites) {
      dispatch({ type: 'retrieveFavoriteTeam', listFavorites })
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
)(Welcome);
