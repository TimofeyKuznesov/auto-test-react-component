/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/

import * as React from "react";
import PropTypes from "prop-types";
import {shallow, mount} from "enzyme";

// setup file Working with React 16
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

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
        if(JsxComponent.propTypes)
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
    //     describe("AutoTestComponent", () => {
    //         glob( path, ( err, files ) => {
    //             console.log( files );
    //             files.forEach(file=>{
    //                 let JsxComponent=require("../"+file).default;
    //                 let props=this.buildTestPropsCortege(JsxComponent);
    //                 // if(process.env.NODE_ENV !== "production")
    //                 // // eslint-disable-next-line no-console
    //                 //     console.log(props);
    //                 describe(`test render ${file}`,()=>{
    //                 // if(JsxComponent.propTypes)
    //                     {
    //                         props.forEach(prop=>{
    //                             if(process.env.NODE_ENV !== "production")
    //                             // eslint-disable-next-line no-console
    //                                 console.log(it);
    //                             it(`render ${JSON.stringify(prop)}`,()=>{
    //                                 if(process.env.NODE_ENV !== "production")
    //                                     console.log(prop);
    //                                 let wrapper = mount(<JsxComponent {...prop} />);
    //                                 expect(wrapper.props()).toEqual(prop);
    //                             });
    //                         });
    //                     }
    //                 });
    //             });
    //         });
    //     });
    // }
}