import React from 'react'
import { Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { redDark } from '../tools/globalVariables'

function ModalMapLive(props) {

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >
      <p style={{ padding: 30 }}><FontAwesomeIcon icon={faExclamationTriangle} color={redDark} /> {props.text}</p>
    </Modal>
  )
}

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
