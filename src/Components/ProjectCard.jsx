import React, { useContext, useEffect, useState } from "react";
import { addTodoAPI,addProjectAPI, userTodoAPI ,userProjectAPI} from "../services/allApis";
import { CiSquarePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import { MdDelete } from "react-icons/md";
import { addTodoResponseContext } from "../Context/ContextShare";
import Edit from "./Edit";



function ProjectCard() {
  const {addTodoResponse,setAddTodoResponse} = useContext(addTodoResponseContext)
  const [todos, setTodos] = useState([]);
  const [token,setToken] = useState("")
  const [todoDetails, setTodoDetails] = useState({
    description: "",
    todoStatus: false,
    createdDate: "", 
    userId: "",
  });
  const [projects, setProjects] = useState([]);
  

  const getUserProjects = async () => {
    const reqHeader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    try {
      const result = await userProjectAPI(reqHeader);
      if (result.status === 200) {
        setProjects(result.data);
      } else {
        alert(result.response.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (token) {
      getUserProjects();
    }
  }, [token,addTodoResponse]); // This useEffect will run only when 'token' changes

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserTodos(storedToken);
    }
  }, []);

  const getUserTodos = async (token) => {
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await userTodoAPI(reqHeader);
      if (result.status === 200) {
        setTodos(result.data);
      } else {
        alert.error(`Failed to fetch todos: ${result.response.data}`);
      }
    } catch (error) {
      alert.error(`Error fetching todos: ${error.message}`);
    }
  };



    useEffect(() => {
      if (localStorage.getItem("existingUser")&&sessionStorage.getItem("token")) {
        setTodoDetails({...todoDetails,userId: JSON.parse(localStorage.getItem("existingUser"))._id, })
        setToken(sessionStorage.getItem("token"))
      }
    }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const { description, createdDate } = todoDetails;

    // Validate required fields
    if (!description || !createdDate) {
      alert("Please provide a description and created date for the todo.");
      return;
    }

    try {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}`
      };
      const result = await addTodoAPI(todoDetails, reqHeader);
      console.log(result);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
      {projects?.length>0?projects?.map(projects=>(
 

        <div className="p-4 bg-card rounded shadow-sm w-75 border align-items-center justify-content-center mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{projects.projectname}</h2>
              <p>{projects.createdDate}</p>
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add Task"
                className="form-control border border-border p-1 rounded"
                value={todoDetails.description}
                onChange={(e) =>
                  setTodoDetails({ ...todoDetails, description: e.target.value })
                }
              />
              <input
                type="date"
                className="form-control border border-border p-1 rounded"
                value={todoDetails.createdDate}
                onChange={(e) =>
                  setTodoDetails({ ...todoDetails, createdDate: e.target.value })
                }
              />
              <button
                style={{ width: "fit-content", height: "fit-content" }}
                className="bg-secondary text-white flex items-center gap-1 px-3 py-1 rounded"
                onClick={handleSave}
              >
                <CiSquarePlus className="font-medium text-xl" /> New
              </button>
              <button className="border px-3 py-1 font-bold border-dashed border-border rounded">
                Edit
              </button>
              <button className="border px-3 py-1 rounded text-white font-bold bg-red-600 hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        
           <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
           {todos?.length>0?todos?.map(todo=>(
           <div className="bg-white border rounded-lg p-3">
             <div className="flex flex-col justify-between">
               <div className="flex justify-between items-center">
                 <h3 className=" text-lg font-semibold m-0">
                   {todo.description}
                 </h3>
               </div>
               <p className="text-sm text-muted-foreground">
                 {todo.createdDate}
               </p>
             </div>
             <div className="flex justify-between">
               <div className="flex">
                 <input
                   type="checkbox"
                   id="choose-me"
                   className="peer hidden"
                   checked={todoDetails.todoStatus}
                   onChange={(e) =>
                     setTodoDetails({
                       ...todoDetails,
                       todoStatus: e.target.checked,
                     })
                   }
                 />
                 <label
                   htmlFor="choose-me"
                   className={`select-none cursor-pointer rounded-full py-1 px-4  font-semibold transition-colors duration-200 ease-in-out ${
                     todoDetails.todoStatus
                       ? "bg-green-500 text-white"
                       : "text-gray-700 bg-gray-300"
                   }`}
                 >
                   {todoDetails.todoStatus ? "Completed" : "Uncompleted"}
                 </label>
               </div>
               <div className="flex">
                 <button label="Edit">
                   <Edit displayData={todo}/>
                   <MdDelete className="text-xl"/>
                 </button>
               </div>
             </div>
           </div>
       )):
       <h1>No Tasks</h1>}
         </div>
       
        </div>




        )):<h1>No Projects</h1>}
      </div>
    </>
  );
}

export default ProjectCard;




