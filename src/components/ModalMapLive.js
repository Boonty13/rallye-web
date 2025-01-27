import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { redDark } from '../tools/globalVariables'

function ModalMapLive(props) {

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >
      <p style={{ padding: 30 }}><FontAwesomeIcon icon={faExclamationTriangle} color={redDark} /> {props.text}</p>
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
)(ModalMapLive);
