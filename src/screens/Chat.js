import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { serverUrl, redLight, red, redDark, greyBlack, greyDark, greyLight, colorLight } from '../tools/globalVariables'
import { Container, Row, Button, Col, ListGroup, ListGroupItem, Badge, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import socketIOClient from 'socket.io-client';

var socket = socketIOClient(serverUrl)

function Chat(props) {
  props.changeScreen('Messagerie instantanée')

  const [currentMsg, setCurrentMsg] = useState('')
  const [room, setRoom] = useState('Officiel')

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

  const [showOfficial, setShowOfficial] = useState(true)
  const [styleBtnOfficial, setStyleBtnOfficial] = useState(styleActiveBtn)
  const [styleBtnPublic, setStyleBtnPublic] = useState(styleInactiveBtn)


  useEffect(() => {

    // Function to retrieve chat history
    async function getHistoryChat(roomName) {
      const rawAnswer = await fetch(`${serverUrl}/chat/get-chat?room=${roomName}`, {
        method: 'GET',
      });
      let chatInfo = (await rawAnswer.json()).roomInfo;
      props.storeChat(chatInfo.history, chatInfo.roomName)
    }

    // Open socket between front and back
    socket.on('messageFromChannel', (newMsg) => {
      props.storeChat([newMsg.messageInfo], newMsg.room)
      updateHistoryChat(newMsg.room, newMsg.messageInfo)
    })

    // Call functions
    getHistoryChat('Officiel')
    getHistoryChat('Public')
  }, [])

  async function updateHistoryChat(roomName, msg) {
    await fetch(`${serverUrl}/chat/update-chat`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `room=${roomName}&newMsg=${JSON.stringify(msg)}`
    })
  }

  var chatOfficiel = props.chatHistory.map((msg, i) => {
    if (msg.room === 'Officiel') {
      return (
        <ListGroupItem style={{ display: 'flex', alignItems: 'center', backgroundColor: redLight }}>
          <div>{msg.msg.msg}</div>
          <div>{msg.msg.sender} - {msg.msg.status}</div>
        </ListGroupItem>
      )
    }
  })

  var chatRoom = props.chatHistory.map((msg, i) => {
    if (msg.room === "Public") {
      return (
        <ListGroupItem style={{ display: 'flex', alignItems: 'center', backgroundColor: redLight }}>
          <div>{msg.msg.msg}</div>
          <div>{msg.msg.sender} - {msg.msg.status}</div>
        </ListGroupItem>
      )
    }

  })

  var handleChangeRoom = (roomNumber) => {
    setRoom(roomNumber)
    socket.emit('changeRoom', { newRoom: roomNumber.toString() })

  }


  return (
    <Container fluid style={{
      margin: 0,
      paddingLeft: '10%',
      paddingRight: '10%',
      paddingTop: '3%',
      height: '100vh'
    }}>
      <div style={{ marginBottom: '3%', display: 'flex', justifyContent: 'center' }}>

        <Button onClick={() => { setShowOfficial(true); setStyleBtnOfficial(styleActiveBtn); setStyleBtnPublic(styleInactiveBtn) ; handleChangeRoom('Officiel') }} style={styleBtnOfficial} >Officiel</Button>
        <Button onClick={() => { setShowOfficial(false); setStyleBtnOfficial(styleInactiveBtn); setStyleBtnPublic(styleActiveBtn) ; handleChangeRoom('Public') }} style={styleBtnPublic}>Public</Button>

      </div>

<div style={{display:'flex', marginBottom:20}}>
  <Input id='message' placeholder='Mon message' value={currentMsg} type='text' onChange={(e) => { setCurrentMsg(e.target.value) }} />
      <Button onClick={() => { 
        socket.emit('messageToChannel', { msg: currentMsg, sender: props.userInfos.firstName, status: props.userInfos.status }); 
        setCurrentMsg('') 
        }}
        style={{backgroundColor: redDark, color: colorLight, border:'none', marginLeft: 10}}><FontAwesomeIcon icon={faPaperPlane} /></Button>   
</div>
      
      <Row>
        <Col>
          <ListGroup>
            {showOfficial ? chatOfficiel : chatRoom}
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
    },
    storeChat: function (newMsg, roomName) {
      dispatch({ type: 'storeChat', newMsg, roomName })
    }
  }
}


function mapStateToProps(state) {
  return {
    userInfos: state.userInfos,
    chatHistory: state.chatHistory
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
