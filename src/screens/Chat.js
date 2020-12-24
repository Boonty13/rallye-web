import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {serverUrl} from '../tools/globalVariables'

function Chat(props) {
  props.changeScreen('Messagerie instantanée')

  useEffect(()=>{

        // Function to retrieve chat history
        async function getHistoryChat(roomName) {
          const rawAnswer = await fetch(`${serverUrl}/chat/get-chat?room=${roomName}`, {
              method: 'GET',
          });
          let chatInfo = (await rawAnswer.json());
          console.log('CHAT : ', chatInfo)
      }
      getHistoryChat('Officiel')
  }, [])


  return (
   <div style={{backgroundColor: "#fd9644", flex:1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <h1>Chat page</h1>
   </div>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    changeScreen: function(screen) { 
      dispatch( {type: 'changeScreen', screen }) 
    }
  }
}

export default connect(
    null, 
    mapDispatchToProps
)(Chat);
