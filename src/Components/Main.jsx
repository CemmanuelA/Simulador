import React from 'react';
import { Navbar } from './NavBar.jsx';
import { Box } from    './Boxes/Box.jsx';


export class Main extends React.Component{

   render(){
       return (<div>
                  <Navbar />
                  <Box />
              </div>);
   }

}
