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

    findComponents(path){
        return glob(path,{sync:true, absolute: true});
    }
}