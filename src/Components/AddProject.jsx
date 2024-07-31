/*{
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../services/allApis';


function AddProject() {
    const [projectDetails,setProjectDetails] = useState({
        projectId:"",projectname:"", task:"",taskstatus:"",userId:""
    })
    const handleSave = async (e)=>{
        e.preventDefault()
        const {projectId,projectname,task,taskstatus,userId} = projectDetails
        if(!projectId || !projectname || !task || !taskstatus || !userId){
            toast.info("Please fill the form completely!!")
        }else{
            const reqBody = new FormData()
            reqBody.append("projectId",projectId)
            reqBody.append("projectname",projectname)
            reqBody.append("task",task)
            reqBody.append("taskstatus",taskstatus)
            reqBody.append("userId",userId)
            /*const reqHeader = {
                "Content-Type":"multipart/form-data"
            }
                const result = await addProjectAPI(reqBody/*,reqHeader)
            
                if(result.status === 200){
                  toast.success(`project '${result.data.projectname}' added succefully..`)
                  setProjectDetails({
                    projectId:"",projectname:"", task:"",taskstatus:"",userId:""
                  })
                  handleClose()
            }else{
              toast.warning(result.response.data)
              console.log(result);
            }
        }
      }
        useEffect(()=>{
            if(localStorage.getItem("existingUser")){
              setProjectDetails({...projectDetails,userId:JSON.parse(localStorage.getItem("existingUser"))._id})
            }
          },[])
          console.log(projectDetails);
    
          const handleClose = () =>{
            setProjectDetails({
                projectname:"", task:"",taskstatus:"",userId:""
            })
          }
         
      return (
    <>
            
        
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
          <Modal.Dialog>
          <div className="bg-background p-6 rounded-lg shadow-md text-center">
                      <h1 className="text-primary font-bold text-2xl mb-4">Project Name</h1>
                      <div className="mb-4">
                      <span>
                          <input type='text' placeholder="ProjectId" className='border border-border p-2 rounded s'
                          value={projectDetails.projectId} onChange={e=>setProjectDetails({...projectDetails,projectId:e.target.value})}/>
                          <input type="text" placeholder="Project Name" className="border border-border p-2 rounded w-full" 
                          value={projectDetails.projectname} onChange={e=>setProjectDetails({...projectDetails,projectname:e.target.value})}/>
                      </span>
                        
                        <br/>
                        <span className="text-muted-foreground block mt-1">
                          Project Created: 
                          <time datetime="2023-10-01T10:00:00">October 1, 2023, 10:00 AM</time>
                        </span>
                      </div>
                      <div className="mb-4">
                        <input type="text" placeholder="Task Description" className="border border-border p-2 rounded w-full" 
                        value={projectDetails.task} onChange={e=>setProjectDetails({...projectDetails,task:e.target.value})}
                        />
                        <button className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 p-2 rounded">Add Task</button>
                      </div>
                      <div className="task-list">
                        <div className="bg-muted p-2 rounded mb-2 flex justify-content-between items-center">
    
                        <input type="checkbox" id="task1" className="form-checkbox h-5 w-5 text-primary border border-border rounded mr-2 me-2"
                        value={projectDetails.taskstatus} onChange={e=>setProjectDetails({...projectDetails,taskstatus:e.target.value})}
                        />
                          <span>I will wake up at 8 in the morning</span>
                          <button className="bg-danger text-destructive-foreground hover:bg-destructive/80 ml-2 p-1 rounded me-2">Delete</button>
                            <button className=" me-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 ml-2 p-1 rounded">Edit</button>
                            
                          <div>
                            <span className="text-muted-foreground text-sm">
                              Created: <time datetime="2023-10-01T10:05:00">October 1, 2023, 10:05 AM</time>
                            </span>
                            
                          </div>
                        </div>
                        
                      
                       
                      </div>
                      <button className="bg-danger text-destructive-foreground hover:bg-destructive/80 mt-4 p-2 rounded">Delete Project</button>
                      <button onClick={handleSave} className="me-2 bg-primary text-primary-foreground hover:bg-primary/80 mt-4 p-2 rounded">Add Project</button>    
                      <button onClick={handleClose} className="me-2 bg-success text-accent-foreground hover:bg-accent/80 mt-4 p-2 rounded">Clear</button>            </div>
            
          </Modal.Dialog>
          <ToastContainer position='top-right'autoClose={2000} theme='colored'/>
        </div>
           
           
         
          
          
                    
    </>
                
            )
        }
                
                
            
    
    export default AddProject} */