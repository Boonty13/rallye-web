import React, { useState, useEffect } from 'react'
import { Modal, Button, Image } from 'react-bootstrap'

import { redDark, colorLight } from '../tools/globalVariables'


function DetailNews(props) {

  const news = props.news

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered >

      <Modal.Header style={{backgroundColor: redDark}}>
        <h4 style={{color: colorLight}}>{news.title}</h4>
      </Modal.Header>

      <Modal.Body style={{ flexDirection: 'column' }}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop:15, marginBottom:25}}>
          <Image src={news.image} width='90%'/>
        </div>
        <div>{news.description}</div>
      </Modal.Body>

      <Modal.Footer >
        <Button style={{ margin: 10, backgroundColor: redDark, color: colorLight, borderColor:redDark}} onClick={() => { props.onHide() }} >Retour</Button>
      </Modal.Footer>

    </Modal>
  );
}

export default DetailNews