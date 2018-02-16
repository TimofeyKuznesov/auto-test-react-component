
/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/


import _ from "lodash";

function recurse(_keys: string[],variant,ret,_tmp) {
    let keys=_.cloneDeep(_keys);
    // let tmp = _tmp ? _.cloneDeep(_tmp):{};
    let tmp = _tmp ? JSON.parse(JSON.stringify(_tmp)):{};
    let key=keys.shift();
    if(variant && Array.isArray(variant[key]))
        variant[key].forEach(val=>{
            tmp[key]=val;
            if(keys.length>0)
            {
                recurse(keys,variant,ret,tmp);
            }
            else{
                ret.push(_.cloneDeep(tmp));
            }
        });
}


export default class tools {


    static cortege(variant:{}){
        let ret=[];
        let keys=Object.keys(variant);
        recurse(keys,variant,ret);
        return ret;
    }
    static invariant(propTypesFunc: Function): mixed[]{
        let ret=[];
        if(propTypesFunc && propTypesFunc.params)
            ret=ret.concat(propTypesFunc.params);
        return ret;
    }
}