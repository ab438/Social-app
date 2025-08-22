import axios from "axios";
import { createContext } from "react";

export let Postcontext = createContext()

export default function PostContextProvider(props){

    // function callpost(){
    // return axios.get("https://linked-posts.routemisr.com/posts?limit=50",{
    //         headers : {
    //             token : localStorage.getItem("userToken")
    //         }
    //     })
    //     .then((res) => {
    //         return res.data.posts
    //     })
    //     .catch((err) => {
    //         return err
    //     })
    // }
    return <Postcontext.Provider value={{}}>
        {props.children}
    </Postcontext.Provider>
}
