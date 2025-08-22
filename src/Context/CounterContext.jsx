import { createContext, useState } from "react";

export let Counter = createContext()

 export default function Countercontextprovider(props){
    const [coun , setcount] = useState(0)
    function change(){
        setcount(Math.random())
    }
    return( <Counter.Provider value={{coun, change}}>
        {props.children}
    </Counter.Provider>
    );
}
