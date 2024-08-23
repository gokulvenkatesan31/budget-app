import { useState,useEffect } from "react";

export default function useLocalStorage(key,defaultValue){
    const [value,setValue] = useState(()=>{
        const value = JSON.parse(localStorage.getItem(key));
        if(value!=null) return value;

        if(typeof defaultValue === "function"){
            return defaultValue();
        }else{
            return defaultValue;
        }
    }) 
    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value));
    },[key,value])

    return [value,setValue];
}