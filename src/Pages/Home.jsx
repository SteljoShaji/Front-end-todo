import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom';
import AddProject from '../Components/AddProject';
import './Home.css'
function Home() {

  
  const [isLoggedIn,setLoggedIn] = useState(false)
  const [username,setUsername] = useState("")
  useEffect(()=>{
    if(localStorage.getItem("existingUser")){
      setUsername(JSON.parse(localStorage.getItem("existingUser")).username)
    }
  },[])
  useEffect(()=>{
    if(localStorage.getItem("existingUser")){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  },[])
  return (
    <>
   
    {
            isLoggedIn?
            <Link to={'/home'}></Link>:
            <Link to={'/login'} ></Link>
          }
        

        
       
        {/*All projects*/}
        <div className='all-projects mt-3  d-flex align-items-center justify-content-center'>
            
            <div style={{width:'75vh'}}className='card shadow  mt-3'> 
            <h1 className='text-center '>Welcome <span className='text-warning'>{username}</span> </h1>
            </div>
        </div>

<div> <button className='btn'>Add Project</button></div>

        

         <ProjectCard/>


    <div>   </div>
          
    </>
  )
}

export default Home
