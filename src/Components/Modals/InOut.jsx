import React from 'react';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock,Col} from 'react-bootstrap';

export var InOut = (props) =>{
  
 
      return(
        
          <FormGroup>
              <ControlLabel>{props.type}</ControlLabel>
              <FormControl componentClass="select" placeholder="agua">
                <option value="agua">Agua</option>
                <option value="gas">Gas</option>
                <option value="electricidad">Electricidad</option>
              </FormControl>
          </FormGroup>
    
        
      );
  
  
}
