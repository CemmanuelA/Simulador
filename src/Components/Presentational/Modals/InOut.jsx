import React from 'react';
import {Button ,Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock,Col} from 'react-bootstrap';

export var InOut = ({type, value, handleInputChange,index, name}) =>{
  
 
      return(
        
          <FormGroup>
              <ControlLabel>{type}</ControlLabel>
              <FormControl componentClass="select" value={value} name={name} onChange={(event) => handleInputChange(event,index)} >
                <option value="agua">Agua</option>
                <option value="gas">Gas</option>
                <option value="electricidad">Electricidad</option>
              </FormControl>
          </FormGroup>
    
        
      );
  
  
}
