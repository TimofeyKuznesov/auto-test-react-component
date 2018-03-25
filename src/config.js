/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/
import fs from "fs";
import path from "path";
import requireUncached from "require-uncached";
// eslint-disable-next-line no-unused-vars
import React from "react";

const filename = path.join("", ".auto-test-react.js");

let config={
    defaultCortage:{
        string: ["","string"],
        number: [-10,0,10],
        bool: [false,true],
        func: [()=>{}],
        array: [[]],
        object: [{}],
        element: [<div/>]
    },
    shapeSimple: false
};

if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
    let confFile=requireUncached(path.resolve(filename));
    config=Object.assign({},config,confFile);
}

export default config;