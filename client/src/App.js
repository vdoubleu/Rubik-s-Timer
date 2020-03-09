import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import $ from "jquery";
import Graph from "./components/graph";
import StatBox from "./components/stats";

var timerOn = false;
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var running = 0;

var readyTimerOn = false;
var prepped = false;

//var times = [{"num":0, "solvetime":12}, {"num":1, "solvetime": 11}, {"num":2, "solvetime":10}];

var userId = "defuser";

function App() {
const [times, setTimes] = useState([]);
const [dispTimes, setDispTimes] = useState("");

function sendTime(time){
  var URL = "http://127.0.0.1:5000/sendTime/";
  var out;
 
  $.ajax({
      type: "POST",
      url: URL,
      data: {"id": userId, "time": time},
      success: function(data){
         //alert(JSON.stringify(data));
      }});

}

function getTimes(){
   var URL = "http://127.0.0.1:5000/getTime/";
   var out;

   var foo = $.ajax({
      type: "GET",
      url: URL,
      data: {"id": userId},
      success: function(data){
         
         var res = JSON.parse(JSON.stringify(data))

         var dispOut = "";
         var timeLst = res.regtime;
         
         for(var i = 0; i < timeLst.length; i++)
            dispOut = dispOut + timeLst[i].toString() + " ";
         
         setTimes(res.adjtime)
         setDispTimes(dispOut);
   }});
}

function removeLastTime(){
   var URL = "http://127.0.0.1:5000/removeLast/";
   var out;

   $.ajax({
      type:"POST",
      url: URL,
      data: {"id": userId},
      success: function(data){
         //alert("deleted last");
         //return out;
         getTimes();
      }});
}

function removeAll(){
   var URL = "http://127.0.0.1:5000/removeAll/";
   var out;

   $.ajax({
      type:"POST",
      url: URL,
      data: {"id": userId},
      success: function(data){
         //alert("deleted all");
         //return out;
         getTimes();
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
  if (afterDec < 10) 
      afterDec *= 10;

  if (afterDec < 100) 
      afterDec *= 10;

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

function userInput(){
    var textBox = document.getElementById("userin");

    userId = textBox.value;
    document.getElementById("curruser").innerHTML = textBox.value;
    textBox.value = "";

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

        getTimes();
	   }
   }

   if(e.keyCode === 13){
      userInput();
   }
}

window.onload = function(){
   getTimes();
}

  return (
<div class="container-fluid" id="super-container">
   <div className="App">
      <header className="App-header">
         My Personal Cube Timer       
      </header>
   </div>

   <div class="container" className="time-box">
	      <p id="time">0:000</p>
   </div>

   <div class="container" className="time-box">
      <div class="input-group mb-3">
         <input type="text" class="form-control" placeholder="Input Username" aria-describedby="basic-addon2" id="userin"/>
         <div class="input-group-btn">
            <button class="btn btn-dark" id="userinbtn" type="button" onClick={userInput}>select</button>
         </div>
      </div>
      <p id="buttontxt"> currently using id: </p> <p id="curruser"> defuser </p>
      
      <div class="container" className="bottom-box">
         <div class="row">
            <button type="button" class="btn btn-dark" onClick={getTimes} id="actionbtn"> get times </button>
            <button type="button" class="btn btn-dark" onClick={removeLastTime} id="actionbtn"> delete last </button>
            <button type="button" class="btn btn-dark" onClick={removeAll} id="actionbtn"> delete all </button>
         </div>
      </div>

     <Graph data={times}/>

     <StatBox data={dispTimes}/>
   </div>  
   
</div>
  );
}

export default App;
