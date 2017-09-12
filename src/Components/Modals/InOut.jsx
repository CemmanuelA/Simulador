import React from 'react';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock,Col} from 'react-bootstrap';

export var InOut = (props) =>{
  return(

      <Col>
        <ControlLabel>{this.props.type}</ControlLabel>
          <FormControl ComponentClass="select" placeholder="agua">
            <option value="agua">Agua</option>
            <option value="gas">Gas</option>
            <option value="electricidad">Electricidad</option>
          </FormControl>
      </Col>

  );
}
