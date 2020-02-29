const urlUtils = {
    change2Url: str =>(str+'').startsWith('/')?str:`/${str}`,
};
const commonUtils = {
    isEmpty: d=>{
        if(!d) return true;
        if(Array.isArray(d)){
            return !d.length;
        }
        if(typeof d === 'object'){
            return !Object.keys(d).length;
        }
        return false;
    },
    isNotEmpty: d=>!isEmpty(d),
};

export { urlUtils, commonUtils };