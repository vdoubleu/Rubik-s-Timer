import React, {useState} from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import "./graph.css";

function Graph(props) {
   return (
      <div id="graphContainer">
         
         <LineChart width={800} height={500} data={props.data}>
            <XAxis  dataKey="num"/>
            <YAxis  />
            <Line type="monotone" dataKey="solvetime" stroke="#8884d8" />
         </LineChart>

        </div>
  );
}

export default Graph;
