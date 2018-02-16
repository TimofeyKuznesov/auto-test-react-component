
/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
*/
// import React from "react";
import PropTypes from "prop-types";
import React from "react";
import {shallow, mount} from "enzyme";

// setup file Working with React 16
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AutoTestTools from "../src/index";
import JsxComponent from "./JsxComponent";
let autoTestTools = new AutoTestTools();

configure({ adapter: new Adapter() });

jest.mock("prop-types",()=>{
    return require("../src/prop-types-mock");
});

// 'dirname/**/*.js'


describe("TEST",()=>{
    let files=autoTestTools.findComponents("__test__/**/*.jsx");
    describe("AutoTestComponent", () => {
        console.log( files );
        files.forEach(file=>{
            let JsxComponent=require(file).default;
            let props=autoTestTools.buildTestPropsCortege(JsxComponent);
            // if(process.env.NODE_ENV !== "production")
            // // eslint-disable-next-line no-console
            //     console.log(props);
            describe(`test render ${file}`,()=>{
                // if(JsxComponent.propTypes)
                {
                    props.forEach(prop=>{
                        if(process.env.NODE_ENV !== "production")
                        // eslint-disable-next-line no-console
                            console.log(it);
                        it(`render ${JSON.stringify(prop)}`,()=>{
                            if(process.env.NODE_ENV !== "production")
                                console.log(prop);
                            let wrapper = mount(<JsxComponent {...prop} />);
                            expect(wrapper.props()).toEqual(prop);
                        });
                    });
                }
            });
        });
    });

});

