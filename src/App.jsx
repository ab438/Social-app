import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Notfound from './Components/Notfound/Notfound';
import Countercontextprovider from './Context/CounterContext';
import UserContprovider from './Context/UserContext';
import Protectedpeoject from './Components/Protectedpeoject/Protectedpeoject';
import PostContextProvider from './Context/PostContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/production';
import PostDetails from './Components/PostDetails/PostDetails';
import { Toaster } from 'react-hot-toast';
const query = new QueryClient()
function App() {
  let x = createBrowserRouter([
    {path : "", element : <Layout/>, children : [
      {index : true, element : <Protectedpeoject><Home/></Protectedpeoject>},
      {path : 'profile', element : <Protectedpeoject><Profile/></Protectedpeoject>},
      {path : 'register', element : <Register/>},
      {path : 'login', element : <Login/>},
      {path : '*', element : <Notfound/>},
      {path : "/postdetails/:id", element : <PostDetails/>}
    ]}
  ])
  return (
    <>
      <UserContprovider>
        <PostContextProvider>
          <Countercontextprovider>
          <QueryClientProvider client={query}>
            <RouterProvider router={x}>
            </RouterProvider>
            <Toaster/>
            <ReactQueryDevtools/>
          </QueryClientProvider>
        </Countercontextprovider>
        </PostContextProvider>
      </UserContprovider>
    </>
  )
}

export default App
