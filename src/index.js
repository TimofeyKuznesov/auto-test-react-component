/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/

import * as React from "react";


import glob from "glob";

import tools from "./tools";

export {PropTypesMock} from "./prop-types-mock";

export default class AutoTestTools {
    buildTestPropsCortege(JsxComponent: React.ComponentType): Array<*>{
        let ret=[];
        // if(!PropTypes.__isMocked)
        //     if(process.env.NODE_ENV !== "production")
        //     // eslint-disable-next-line no-console
        //         console.warn("prop-types need mock");
        if(JsxComponent && JsxComponent.propTypes)
        {
            
            let propTypes= JsxComponent.propTypes;
            let variants: {[key: string]: Array<mixed>} ={};
            Object.keys(propTypes).forEach((key)=>{
                variants[key]=tools.invariant(propTypes[key],key);    
            });
            ret=ret.concat(tools.cortege(variants));    
        }
        if(ret.length==0)
            ret.push({});
        return ret;
    }

    buildTestSimplePropsCortege(JsxComponent: React.ComponentType): Array<*>{
        let ret=[];

        if(JsxComponent && JsxComponent.propTypes)
        {
            
            let propTypes= JsxComponent.propTypes;
            let variants: {[key: string]: Array<mixed>} ={};
            let max=0;
            Object.keys(propTypes).forEach((key)=>{
                variants[key]=tools.invariant(propTypes[key],key);
                if(max<variants[key].length)  
                    max=variants[key].length;
            });
            for (let i = 0; i < max; i++) {
                let tmp: {[key: string]: Array<mixed>}={};
                Object.keys(variants).forEach(key=>{
                    let list=variants[key];
                    tmp[key]=list.length>i ?  list[i] : list[list.length-1];
                });
                ret.push(tmp);
            }
        }
        if(ret.length==0)
            ret.push({});
        return ret;
    }

    findComponents(path){
        return glob(path,{sync:true, absolute: true});
    }
}