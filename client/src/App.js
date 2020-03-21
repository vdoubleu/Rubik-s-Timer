import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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

var userId = "defuser";

function App() {
const [times, setTimes] = useState([]);
const [dispTimes, setDispTimes] = useState("");
const [CBF, setCBF] = useState("");

function sendTime(time){
  var URL = "http://127.0.0.1:5000/sendTime/";
 
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

   $.ajax({
      type: "GET",
      url: URL,
      data: {"id": userId},
      success: function(data){
         
         var res = JSON.parse(JSON.stringify(data))

         var dispOut = "";
         var timeLst = res.regtime;
         
         for(var i = 0; i < timeLst.length; i++)
            dispOut = dispOut + timeLst[i].toString() + " ";
         
         setTimes(res.adjtime);
         setDispTimes(dispOut);
         //getCBF();
   }});
}

function removeLastTime(){
   var URL = "http://127.0.0.1:5000/removeLast/";

   $.ajax({
      type:"POST",
      url: URL,
      data: {"id": userId},
      success: function(data){
         //alert("deleted last");
         getTimes();
      }});
}

function removeAll(){
   var URL = "http://127.0.0.1:5000/removeAll/";

   $.ajax({
      type:"POST",
      url: URL,
      data: {"id": userId},
      success: function(data){
         //alert("deleted all");
         getTimes();
      }});
}

function resetTimes(newTimes){
   var URL = "http://127.0.0.1:5000/resetTimes/";

   $.ajax({
      type:"POST",
      url: URL,
      data: {"id": userId, "newtimes": JSON.stringify(newTimes)},
      success: function(data){
         //alert(data);
      }});
}

function getCBF(){
   var URL = "http://127.0.0.1:5000/getCBF/";

   $.ajax({
      type: "GET",
      url: URL,
      data: {"id": userId},
      success: function(data){
         
         var res = JSON.parse(JSON.stringify(data))
 

         //alert(res.data)
         //setCBF();
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
   if(e.keyCode === 32 && e.target !== document.getElementById("userin") && e.target !== document.getElementById("timeImportArea")){
      e.preventDefault();
      if(!readyTimerOn && timerOn === false){
         readyTimerOn = true;
         document.getElementById("time").style.color = "red";

         setTimeout(function() {
            if(readyTimerOn){
               document.getElementById("time").style.color = "green";
               prepped = true; 
            }
         }, 500);
         getTimes();
      }
   }
}

function userInput(){
    var textBox = document.getElementById("userin");

    userId = textBox.value;
    document.getElementById("curruser").innerHTML = textBox.value;
    textBox.value = "";
    getTimes();
}

function importTime(){
   var textBox = document.getElementById("timeImportArea");
   var importData = textBox.value.split(',').map(Number);
 
   textBox.value = "";
   resetTimes(importData);
   getTimes();
}

document.body.onkeyup = function(e){
   if(e.keyCode === 32){
      if(e.target !== document.getElementById("userin") && e.target !== document.getElementById("timeImportArea")){
         document.getElementById("time").style.color = "white";
         readyTimerOn = false;

         if(timerOn === false && prepped === true){
            timerOn = true;        
            startTimer();
         } else if(timerOn === false && prepped === false){ 
            timerOn = false;
         } else {
            sendTime(document.getElementById("time").innerHTML);
            prepped = false;
            timerOn = false;
            resetTimer();
	      }
         setTimeout(function () {getTimes();}, 50);
      }
   }
   if(e.keyCode === 13 ){
      if(e.target === document.getElementById("userin")){
         userInput();
      } else if (e.target === document.getElementById("timeImportArea")){
         importTime();
      }
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

   <div class="container" className="time-box" id="timer">
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


      <div class="form-group">
         <textarea class="form-control" id="timeImportArea" rows="3" placeholder="Input times here to import them"></textarea>
         <button type="button" class="btn btn-dark" id="actionbtn" onClick={importTime}> import times </button>
      </div>

   </div>  
   
</div>
  );
}

export default App;
