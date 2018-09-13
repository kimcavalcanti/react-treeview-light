import React from 'react';
import { render } from "react-dom";
import { TreeView } from "./lib";

const mock = {
    id: 0,
    value: 'Parent',
    childNodes: [{
        id: 1,
        value: 'A'
    },
    {
        value: 'B',
        id: 2,
        childNodes: [{
            id: 3,
            value: 'Ba'
        },
        {
            id: 4,
            value: 'Bb'
        }]
    }]
}

const App = () => (
  <div style={{ width: 640, margin: "15px auto" }}>
    <h1>Hello React</h1>
    <TreeView data={mock}/>
  </div>
);

render(<App />, document.getElementById("root"));
