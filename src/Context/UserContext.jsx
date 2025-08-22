import { createContext, useState } from "react";

export let User = createContext()

export default function UserContprovider(props){
    const [userlogin, setuserlogin] = useState(localStorage.getItem("userToken"))
    return <User.Provider value={{userlogin, setuserlogin}}>
        {props.children}
    </User.Provider>
}