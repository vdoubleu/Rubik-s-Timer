import React, {useState} from 'react';
import "./stats.css";

function StatBox(props){

   return(
      <div>
         <p id="timelsttxt"> times: </p>
         <p id="timelst"> {props.data} </p>
      
      </div>
   );
}


export default StatBox;
