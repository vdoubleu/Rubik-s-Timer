import React from 'react';
import "./stats.css";

function StatBox(props){
   function displayTimes(lst){
      if(lst == "")
         return "There are currently no recorded times, use the spacebar to start the timer and record your first time.";
      else 
         return lst;
   }


   return(
      <div>
         <p id="timelsttxt"> Times: </p>
         <p id="timelst"> {displayTimes(props.data)} </p>
      
      </div>
   );
}


export default StatBox;
