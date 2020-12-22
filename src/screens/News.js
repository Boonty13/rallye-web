import React from 'react';
import {connect} from 'react-redux'

function News(props) {
  props.changeScreen('Actualités du rallye')
  return (
   <div style={{backgroundColor: "#fd9644", flex:1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
       <h1>news page</h1>
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
)(News);
