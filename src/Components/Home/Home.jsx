import { Postcontext } from './../../Context/PostContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Comment from './../Comment/Comment';
import { Link } from 'react-router-dom';
import Createcommentmodal from '../Createcommentmodal/Createcommentmodal';
import Createpost from '../Createpost/Createpost';
export default function Home() {
  function getposts(){
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers : {
        token : localStorage.getItem("userToken")
      }
    })
  }
  let {data, isLoading, isError, error} = useQuery({
    queryKey : ["getpost"],
    queryFn : getposts
  })
  // let {callpost} = useContext(Postcontext)
  // const [userpost, setuserpost] = useState([])
  // async function  getposts() {
  //    let res = await callpost([])
  //    console.log(res);
  //    if(res.length){
  //     setuserpost(res)
  //    }
  // }
  // useEffect(() => {
  //   getposts()
  // }, [])
  if(isError){
    return <h3>{error.message}</h3>
  }
  if(isLoading){
    return <span className="loader"></span>
  }
  return (
    <>
    <Createpost/>
    {data?.data?.posts.map((post) => (
    
      <div key={post.id} className="w-full my-8 md:w-[80%] lg:w-[60%] rounded-md bg-slate-100 mx-auto">
        <Link to={`/postdetails/${post.id}`}>
        <div className="flex gap-4 items-center">
          <img src={post.user.photo} className="size-[40px]"/>
          <p>{post.user.name}</p>
        </div>
      
      {post.body && <h2 className="mb-4 my-4">{post.body}</h2>}
      {post.image && <img src={post.image} className="w-full rounded-md" alt={post.body}/>}
      <Comment comment = {post.comments[0]}/>
      </Link>
      <Createcommentmodal postid={post.id}/>
    </div> 

    ))}
    </>
  )
}
