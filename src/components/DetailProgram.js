import React from 'react';
import { Container, Row, Button, Col, ListGroup, ListGroupItem, Badge, Collapse } from 'reactstrap'

import { schedule } from '../tools/functions'
import {redLight} from '../tools/globalVariables'

function DetailProgram(props) {

  let programOfDay = props.program.filter((plan) => (
    (new Date(plan.date).getDate() + '/' + (new Date(plan.date).getMonth() + 1) + '/' + new Date(plan.date).getFullYear()) === props.day)
  )

  ///// Building event card /////
  let programGrid = programOfDay.map((planning) => (
    <ListGroupItem className="justify-content-between" style={{ display: 'flex', alignItems: 'center', backgroundColor:redLight}}>
      <div >{schedule(planning.date)}</div>

      <div style={{ width: '75%' }}>
        {planning.event.map((task) => (
          <p key={task} style={{ marginBottom: 5 }}>- {task}</p>
        ))}
      </div>
    </ListGroupItem>
  ))

  return (
    <ListGroup>
      {programGrid}
    </ListGroup>

  );
}

export default DetailProgram;