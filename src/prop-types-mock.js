/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/
// eslint-disable-next-line no-unused-vars
import React from "react";
import config from "./config";
import tools from "./tools";

var _PropsType = require("prop-types/prop-types");
var PropsType=Object.assign({},_PropsType);

PropsType.string=_PropsType.string;
PropsType.string.isRequired.params=config.defaultCortage.string;
PropsType.string.params=PropsType.string.isRequired.params.concat([undefined]);

PropsType.number=_PropsType.number;
PropsType.number.isRequired.params=config.defaultCortage.number;
PropsType.number.params=PropsType.number.isRequired.params.concat([undefined]);

PropsType.bool=_PropsType.bool;
PropsType.bool.isRequired.params=config.defaultCortage.bool;
PropsType.bool.params=PropsType.bool.isRequired.params.concat([undefined]);

PropsType.func=_PropsType.func;
PropsType.func.isRequired.params=config.defaultCortage.func;
PropsType.func.params=PropsType.func.isRequired.params.concat([undefined]);

PropsType.array=_PropsType.array;
PropsType.array.isRequired.params=config.defaultCortage.array;
PropsType.array.params=PropsType.array.isRequired.params.concat([undefined]);

PropsType.object=_PropsType.object;
PropsType.object.isRequired.params=config.defaultCortage.object;
PropsType.object.params=PropsType.object.isRequired.params.concat([undefined]);

PropsType.element=_PropsType.element;
PropsType.element.isRequired.params=config.defaultCortage.element;
PropsType.element.params=PropsType.element.isRequired.params.concat([undefined]);


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


PropsType.shape=function shape(obj) {
    let params={};
    
    Object.keys(obj).forEach(key=>{
        params[key]=obj[key].params;
    });
    let ret = _PropsType.shape(obj);
    let variants=config.shapeSimple ? tools.cortegeSimple(params) : tools.cortege(params);
    ret.params=variants.concat([undefined]);
    ret.isRequired.params=params;
    return ret;
};


module.exports = PropsType;