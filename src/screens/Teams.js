import React from 'react';
import {connect} from 'react-redux'

function Teams(props) {
  props.changeScreen('Liste des équipes')
  return (
   <div style={{backgroundColor: "#fd9644", flex:1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <h1>Teams page</h1>
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
)(Teams);
