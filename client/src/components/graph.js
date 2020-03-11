import React from 'react';
import {LineChart, Line, XAxis, YAxis} from 'recharts';
import "./graph.css";

function CustomizedDot(props){
   return (
      <svg x={0} y={0} width={0} height={0} fill="green" viewBox="0 0 1024 1024" />
    );
}


function Graph(props) {
   return (
      <div id="graphContainer">
         
         <LineChart width={800} height={500} data={props.data}>
            <XAxis  dataKey="num"/>
            <YAxis  />
            <Line type="monotone" dataKey="solvetime" stroke="#8884d8" dot={<CustomizedDot />}/>
         </LineChart>

        </div>
  );
}

export default Graph;
