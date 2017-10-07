import React from 'react';
import { Col, PanelGroup, Panel } from 'react-bootstrap';

export const Process = (props) => {

        return(
            <Col md={2} lg={2} className="container">
            
             <PanelGroup>
                <Panel collapsible header="Máquinas" eventKey="1">Panel 1 content</Panel>
                <Panel collapsible header="Otros procesos" eventKey="2">Panel 2 content</Panel>
                <Panel collapsible header="Propiedades" eventKey="3">Panel 3 content</Panel>
            </PanelGroup>
           
                
            </Col>);
}
