import React, {useState, useRef} from 'react';
import {connect} from 'react-redux'
import {Alert, Button, Modal} from 'react-bootstrap'


function Chat(props) {
  props.changeScreen('Messagerie instantanée')


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
