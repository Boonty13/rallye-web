import React from 'react';
import {connect} from 'react-redux'

function Ranking(props) {
  props.changeScreen('Classement et résultats')
  return (
   <div style={{backgroundColor: "#fd9644", flex:1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <h1>classement page</h1>
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
)(Ranking);
