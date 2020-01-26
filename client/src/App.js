import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';

var fs = require("fs");


var timerOn = false;
var currTime;
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = 0;
var running = 0;

var readyTimerOn = false;
var prepped = false;


function App() {

function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1); 
    paused = 0;
    running = 1;
  }
}

function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = 0;
  running = 0;
}

function getShowTime(){
  updatedTime = new Date().getTime();
  if (savedTime){
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference =  updatedTime - startTime;
  }

  var afterDec = difference%1000;
  if (afterDec < 10) afterDec *= 10;
  if (afterDec < 100) afterDec *= 10;

  var beforeDec = Math.floor(difference/1000);

  document.getElementById('time').innerHTML = beforeDec + "." + afterDec;
}

document.body.onkeypress = function(e){
   if(e.keyCode == 32){
      if(!readyTimerOn && timerOn == false){
         readyTimerOn = true;
         document.getElementById("time").style.color = "red";

         setTimeout(function() {
            if(readyTimerOn){
               document.getElementById("time").style.color = "green";
               prepped = true; 
            }
         }, 500);
      }
   }
}

document.body.onkeyup = function(e){
   if(e.keyCode == 32){
      document.getElementById("time").style.color = "white";
      readyTimerOn = false;

	   if(timerOn == false && prepped == true){
         timerOn = true;        
		   startTimer();
	   } else {
         prepped = false;
         timerOn = false;
		   resetTimer();
	   }
   }
}

  return (
	<Container id = "super-container">
    <div className="App">
      <header className="App-header">
         My Personal Cube Timer       
       </header>
    </div>

    <div className="time-box">
	<p id="time">0:000</p>
	</div>
	</Container>
  );
}

export default App;
