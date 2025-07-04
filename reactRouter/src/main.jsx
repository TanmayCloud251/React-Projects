import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router"
import Layout from './Layout'
import About from './components/About/About'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import User from './components/User/User'
import Github, {githubInfoLoader} from './components/Github/Github'

// c

const router = createBrowserRouter(
  createRoutesFromElements(
    < Route path="/" element={ <Layout /> }>
      <Route path="" element= {<Home/>}></Route>
      <Route path="contact" element= {<Contact/>}></Route>
      <Route path="about" element= {<About/>}></Route>
      <Route path="user/:userid" element= {<User/>}></Route>
      <Route 
      loader= {githubInfoLoader} 
      path="github" element= {<Github/>}></Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
