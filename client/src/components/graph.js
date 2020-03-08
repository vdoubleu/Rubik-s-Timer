import React, {useState} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';


var times = [{"num":0, "solvetime":7}, {"num":1, "solvetime": 11}, {"num":2, "solvetime":10}, {"num": 3, "solvetime": 9}];

function Graph(props) {
   return (
      <div class="container" className="data-box">
         
         <LineChart width={400} height={200} data={props.data}>
            <CartesianGrid />
            <XAxis  dataKey="num"/>
            <YAxis  />
            <Line type="monotone" dataKey="solvetime" stroke="#8884d8" />
         </LineChart>

        </div>
  );
}

export default Graph;
