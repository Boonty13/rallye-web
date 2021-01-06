import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'
import { Modal } from 'react-bootstrap'

import { colorLight, redDark } from '../tools/globalVariables'

function ModalModifyAccount(props) {

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >
      <p style={{ padding: 30 }}>{props.content}</p>
      <Button onClick={()=>{props.click() ; props.onHide()}} style={{backgroundColor:redDark, color:colorLight}}>Valider la modification</Button>
    </Modal>
  )
}

// Redux functions
function mapStateToProps(state) {
  return {
    userFavorites: state.userFavorites,
    userInfos: state.userInfos
  }
}

export default connect(
  mapStateToProps,
  null
)(ModalModifyAccount);
