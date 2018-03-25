
/**
* @author Timofey Kuznetsov <t.a.kuznetsov@gmail.com>
* @flow
*/


import _ from "lodash";

function recursive(_keys: string[],variant?:{[key: string]: mixed[]},ret,_tmp) {
    let keys: string[]=_.cloneDeep(_keys);
    // let tmp = _tmp ? _.cloneDeep(_tmp):{};
    let tmp = _tmp ? _.cloneDeep(_tmp) : {};
    let key: string=keys.shift();
    if(variant && Array.isArray(variant[key])){
        variant[key].forEach(val=>{
            tmp[key]=val;
            if(keys.length>0)
            {
                recursive(keys,variant,ret,tmp);
            }
            else{
                ret.push(_.cloneDeep(tmp));
            }
        });
        if(variant[key].length==0)
        {
            if(keys.length>0)
                recursive(keys,variant,ret,tmp);
            else
                ret.push(_.cloneDeep(tmp));
        }
    }
}


export default class tools {


    static cortege(variant:{}){
        let ret=[];
        let keys=Object.keys(variant);
        recursive(keys,variant,ret);
        return ret;
    }

    static cortegeSimple(variant:{}){
        let max: number=0;
        let ret=[];
        Object.keys(variant).forEach(key=>{
            max=variant[key].length>max ? variant[key].length : max;
        });
        for (let i = 0; i < max; i++) {
            let tmp: {[key: string]: mixed}={};
            Object.keys(variant).forEach(key=>{
                let list=variant[key];
                tmp[key]=list.length>i ?  list[i] : list[list.length-1];
            });
            ret.push(tmp);
        }
        return ret;
    }
    static invariant(propTypesFunc: {params?: mixed[]}): mixed[]{
        let ret=[];
        if(propTypesFunc && propTypesFunc.params)
            ret=ret.concat(propTypesFunc.params);
        return ret;
    }
}