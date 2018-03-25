Automatic creation of a cortege of props, based on propTypes, for the tested component

# Documentation

## Module "auto-test-react-component/dist/prop-types-mock" mock module for "prop-types"


| mocked function | variants values |
|:-----------|:------------|
| PropsType.string |                             ["","string",undefined]|
| PropsType.string.isRequired |                  ["","string"]| 
| PropsType.number |                             [-10,0,10,undefined]| 
| PropsType.number.isRequired |                  [-10,0,10]| 
| PropsType.bool|                               [false,true,undefined]| 
| PropsType.bool.isRequired|                    [false,true]| 
| PropsType.func|                               [()=>{},undefined]| 
| PropsType.func.isRequired|                    [()=>{}]| 
| PropsType.array|                              [[],undefined]| 
| PropsType.array.isRequired|                   [[]]| 
| PropsType.object|                             [{},undefined]| 
| PropsType.object.isRequired|                  [{}]| 
| PropsType.oneOf([values])|                    [values,undefined]
| PropsType.oneOf([values]).isRequired|         [values]
| PropsType.oneOfType([propTypes])|             [map to all variants value for all propTypes and undefined]
| PropsType.oneOfType([propTypes]).isRequired|  [map to all variants value for all propTypes]
| PropsType.shape([propTypes])|             [map to all variants value for all propTypes properties and undefined]
| PropsType.shape([propTypes]).isRequired|  [map to all variants value for all propTypes properties]
| PropsType.arrayOf(type)|                      [[type],undefined]
| PropsType.arrayOf(type).isRequired|           [[type]]
| PropsType.element(type)|                      [[\<div/>],undefined]
| PropsType.element(type).isRequired|           [[\<div/>],]

## module "auto-test-react-component"

- buildTestPropsCortege(JsxComponent): build all variants cortage props from React Component
- buildTestSimplePropsCortege(JsxComponent): build short variants cortage props from React Component
- findComponents(path): find components // Example: findComponents("__test__/**/*.jsx");

## config file .auto-test-react.js for rewrite options

```javascript
config={
    defaultCortage:{
        string: ["","string"],
        number: [-10,0,10],
        bool: [false,true],
        func: [()=>{}],
        array: [[]],
        object: [{}],
        element: [<div/>]
    },
    shapeSimple: false // enable build cortege for shape in simpe mode
};
````

# Example


## Use "auto-test-react-component/dist/prop-types-mock" for mock "prop-types"

```javascript
jest.mock("prop-types",()=>{
  return require("auto-test-react-component/dist/prop-types-mock");
});
```

## build cortage props from React Component
```javascript
import AutoTestTools from "auto-test-react-component";
let autoTestTools = new AutoTestTools();

jest.mock("prop-types",()=>{
  return require("auto-test-react-component/dist/prop-types-mock");
});

let props=autoTestTools.buildTestPropsCortege(JsxComponent);
```

## test render component
```javascript
import {shallow, mount} from "enzyme";
import AutoTestTools from "auto-test-react-component";
let autoTestTools = new AutoTestTools();

props.forEach(prop=>{
            describe(`props: ${JSON.stringify(prop)}`,()=>{
            it(`render ${JSON.stringify(prop)}`,()=>{
              let wrapper = shallow(<JsxComponent {...prop} />);
            });
          });
```

## find and test render components

```javascript
import AutoTestTools from "auto-test-react-component";
let autoTestTools = new AutoTestTools();

jest.mock("prop-types",()=>{
  return require("auto-test-react-component/dist/prop-types-mock");
});
let files=autoTestTools.findComponents("__test__/**/*.jsx");
    describe("AutoTestComponent", () => {
        files.forEach(file=>{
            let JsxComponent=require(file).default;
            let props=autoTestTools.buildTestPropsCortege(JsxComponent);
            describe(`test render ${file}`,()=>{
                {
                    props.forEach(prop=>{
                        it(`render ${JSON.stringify(prop)}`,()=>{
                            let wrapper = shallow(<JsxComponent {...prop} />);
                        });
                    });
                }
            });
        });
    });
```