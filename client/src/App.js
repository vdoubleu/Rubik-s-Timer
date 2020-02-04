import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import $ from "jquery";

var timerOn = false;
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var running = 0;

var readyTimerOn = false;
var prepped = false;


var userId = "defuser";

function App() {

function sendTime(time){
  var URL = "http://127.0.0.1:5000/sendTime/";
  var out;
 
  $.ajax({
      type: "POST",
      url: URL,
      data: {"id": userId, "time": time},
      success: function(data){
         alert(JSON.stringify(data));
         
         //return out;
      }});

}

function getTimes(){
   var URL = "http://127.0.0.1:5000/getTime/";
   var out;


   $.ajax({
      type: "GET",
      url: URL,
      data: {"id": userId},
      success: function(data){
         alert(JSON.stringify(data));
         //return out;
      }});

}

function startTimer(){
  if(!running){
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1); 
    running = 1;
  }
}

function resetTimer(){
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
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
   if(e.keyCode === 32){
      if(!readyTimerOn && timerOn === false){
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
   if(e.keyCode === 32){
      document.getElementById("time").style.color = "white";
      readyTimerOn = false;

	   if(timerOn === false && prepped === true){
         timerOn = true;        
		   startTimer();
	   } else {
         sendTime(document.getElementById("time").innerHTML);
         prepped = false;
         timerOn = false;
		   resetTimer();
	   }
   }

   if(e.keyCode === 13){
      var textBox = document.getElementById("userin");

      userId = textBox.value;
      document.getElementById("curruser").innerHTML = textBox.value;
      textBox.value = "";
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

   <div>
      <input type="text" id="userin"></input>
      <p> currently using id: </p> <p id="curruser"> defuser </p>

      <button onClick={getTimes}> get times </button>

   </div>  
	   
     
     </Container>
  );
}

export default App;
