import React from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';

function Graph(props) {
  return (
      <div class="container" className="data-box">
         
         <LineChart width={400} height={200} data={props.data}>
            <CartesianGrid />
            <XAxis  dataKey="num"/>
            <YAxis  />
            <Line type="monotone" dataKey="solvetime" stroke="#8884d8" />
         </LineChart>

         <p> times: </p>
         <p id="timelst"> __ </p>
      </div>
  );
}

export default Graph;
