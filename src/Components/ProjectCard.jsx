import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { addTodoAPI } from '../services/allApis';
import { CiSquarePlus } from "react-icons/ci";

function ProjectCard() {
  const [todoDetails,setTodoDetails] = useState({
    todoId:"",description:"",todoStatus:false,createdDate:"",userId:""
  })
  useEffect(()=>{
    if(localStorage.getItem("existingUser")){
      setTodoDetails({...todoDetails,userId:JSON.parse(localStorage.getItem("existingUser"))._id})
    }
  },[])
  console.log(todoDetails);

  const handleSave = async (e)=>{
    e.preventDefault()
    const { todoId,description,todoStatus,createdDate,userId} = todoDetails
    const reqHeader ={
      'Content-Type': 'application/json',
    }
    const result = await addTodoAPI(todoDetails,reqHeader)
    console.log(result);
    }
  return (
    <>
     <div className="p-4 bg-card rounded-lg w-75 border shadow-md align-items-center justify-content-center mx-auto mb-5 mt-3" style={{}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>

        <h2 className="h4 font-semibold">Projects</h2>
        <p >Created: 2022-01-15 10:30 AM</p>
        </div>
        <div className='d-flex'>
            <input type="text" placeholder="Add Task" className="form-control "  
          value={todoDetails.description} onChange={e=>setTodoDetails({...todoDetails,description:e.target.value})}  
          />
          <button style={{width:"fit-content", height:"fit-content"}} className="bg-secondary d-flex align-items-center gap-1 px-3 py-1 text-secondary-foreground rounded  "
          onClick={handleSave}><CiSquarePlus/> New</button>
        </div>
     
      </div>
    
      <div className="bg-white rounded-lg shadow p-2 mb-2">
        <div className="d-flex justify-between items-center">
          <div>
            <h3 className="font-medium">API Integration</h3>
            <p className="text-sm text-muted-foreground">Created: 2022-01-15 10:30 AM</p>
          </div>
          <div className="flex space-x-2">
            <button className="text-primary-foreground hover:text-primary" undefinedlabel="Edit">
              <img src="https://openui.fly.dev/openui/24x24.svg?text=✏️" alt="Edit" />
            </button>
            <button className="text-destructive-foreground hover:text-destructive" undefinedlabel="Delete">
              <img src="https://openui.fly.dev/openui/24x24.svg?text=❌" alt="Delete" />
            </button>
          </div>
        </div>
        <Form.Check
         reverse
         label="Completed"
        name="group1"
        checked={todoDetails.todoStatus} 
        onChange={e => setTodoDetails({...todoDetails, todoStatus: e.target.checked})} />
      </div>
      <div className=" bg-white rounded-lg shadow p-2 mb-3">
        <div className="d-flex justify-between items-center">
          <div>
            <h3 className="font-medium">New Benefits Plan</h3>

            <p className="text-sm text-muted-foreground">Created: 2022-01-16 2:45 PM</p>
          </div>
          <div className="justify-content-around x-2">
            <button className="text-primary-foreground hover:text-primary" undefinedlabel="Edit">
              <img src="https://openui.fly.dev/openui/24x24.svg?text=✏️" alt="Edit" />
            </button>
            <button className="text-destructive-foreground hover:text-destructive" undefinedlabel="Delete">
              <img src="https://openui.fly.dev/openui/24x24.svg?text=❌" alt="Delete" />
            </button>
          </div>
        </div>
        <Form.Check
            reverse
            label="Completed"
            name="group1"
            
          />
        
      </div>
      <div className="flex justify-content-between align-items-center">
        <button className="border border-dashed border-border rounded">Edit</button>
        <button className="border rounded ">Delete</button>
      </div>
    </div>
    </>
  )
}

export default ProjectCard