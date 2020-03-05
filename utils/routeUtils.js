import express from 'express';
const router = express.Router();
const app = express();

export function Controller(prefix){
    return function (target) {
        if(prefix){
            console.log(prefix);
        }
    }
}

export function Request(url, method){
    return (target, name, descriptor)=>{
        let func = descriptor.value;
        descriptor.value = () => {
            router[method](url, async(ctx, next) => {
                await func(ctx, next)
            })
        }
    };
}