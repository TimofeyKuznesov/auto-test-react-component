/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/
// eslint-disable-next-line no-unused-vars
import React from "react";
var _PropsType = require("prop-types/prop-types");
var PropsType=Object.assign({},_PropsType);
PropsType.string=_PropsType.string;
PropsType.string.params=["","string",undefined];
PropsType.string.isRequired=_PropsType.string.isRequired;
PropsType.string.isRequired.params=["","string"];
PropsType.number=_PropsType.number;
PropsType.number.params=[-10,0,10,undefined];
PropsType.number.isRequired.params=[-10,0,10];
PropsType.bool=_PropsType.bool;
PropsType.bool.params=[false,true,undefined];
PropsType.bool.isRequired.params=[false,true];
PropsType.func=_PropsType.func;
PropsType.func.params=[()=>{},undefined];
PropsType.func.isRequired.params=[()=>{}];
PropsType.array=_PropsType.array;
PropsType.array.params=[[],undefined];
PropsType.array.isRequired.params=[[]];
PropsType.object=_PropsType.object;
PropsType.object.params=[{},undefined];
PropsType.object.isRequired.params=[{}];

PropsType.oneOf=function oneOf(params) {
    let ret = _PropsType.oneOf(params);
    ret.params=params.concat([undefined]);
    ret.isRequired.params=params;
    return ret;
};

PropsType.oneOfType=function oneOfType(_params) {
    let params=[];
    _params.forEach(element => {
        if(element.params)
            params=params.concat(element.params);
    });
    let ret = _PropsType.oneOfType(_params);
    ret.params=params;
    ret.isRequired.params=params;
    return ret;
};


PropsType.arrayOf=function arrayOf(_params) {
    let params=[];
    if(_params.params)
        _params.params.forEach(element => {
            params.push([element]);
        });
    let ret = _PropsType.arrayOf(_params);
    ret.params=params.concat([undefined]);
    ret.isRequired.params=params;
    return ret;
};

PropsType.element=_PropsType.element;
PropsType.element.isRequired.params=[<div/>];
PropsType.element.params=PropsType.element.isRequired.params.concat([undefined]);

module.exports = PropsType;