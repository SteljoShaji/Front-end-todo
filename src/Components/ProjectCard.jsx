import React, { useContext, useEffect, useState } from "react";
import { addTodoAPI, addProjectAPI, userTodoAPI, userProjectAPI, deleteTodoAPI, deleteProjectAPI ,updateTodoStatusAPI} from "../services/allApis";
import { CiSquarePlus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { addTodoResponseContext, editTodoResponseContext } from "../Context/ContextShare";
import Edit from "./Edit";

function ProjectCard() {
  const { editTodoResponse, setEditTodoResponse } = useContext(editTodoResponseContext);
  const { addTodoResponse, setAddTodoResponse } = useContext(addTodoResponseContext);
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState("");
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
  }, [token, addTodoResponse, editTodoResponse]);

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
        Authorization: `Bearer ${token}`,
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
    if (localStorage.getItem("existingUser") && sessionStorage.getItem("token")) {
      setTodoDetails({ ...todoDetails, userId: JSON.parse(localStorage.getItem("existingUser"))._id });
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const { description, createdDate } = todoDetails;

    if (!description || !createdDate) {
      alert("Please provide a description and created date for the todo.");
      return;
    }

    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await addTodoAPI(todoDetails, reqHeader);
      console.log(result);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await deleteTodoAPI(id, reqHeader);
      if (result.status === 200) {
        getUserTodos(token);
      } else {
        alert(`Failed to delete todo: ${result.response.data}`);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert(`Error deleting todo: ${error.message}`);
    }
  };

  const handleDeleteProject = async (e, id) => {
    e.preventDefault();
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await deleteProjectAPI(id, reqHeader);
      if (result.status === 200) {
        getUserProjects();
      } else {
        alert(`Failed to delete project: ${result.response.data}`);
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(`Error deleting project: ${error.message}`);
    }
  };

  const handleTodoStatusChange = async (todoId, status) => {
    setTodos(todos.map(todo => todo._id === todoId ? { ...todo, todoStatus: status } : todo));
    try {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      await updateTodoStatusAPI(todoId, status, reqHeader);
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };
  

  
  return (
    <>
      <div className="flex flex-col gap-3">
        {projects?.length > 0 ? (
          projects?.map((project) => (
            <div key={project._id} className="p-4 bg-card rounded shadow-sm w-75 border align-items-center justify-content-center mx-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{project.projectname}</h2>
                  <p>{project.createdDate}</p>
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
                  <button onClick={(e) => handleDeleteProject(e, project._id)} className="border px-3 py-1 rounded text-white font-bold bg-red-600 hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
                {todos?.length > 0 ? todos?.map(todo => (
                  <div key={todo._id} className="bg-white border rounded-lg p-3">
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
                          id={`choose-me-${todo._id}`}
                          className="peer hidden"
                          checked={todo.todoStatus}
                          onChange={(e) =>
                            handleTodoStatusChange(todo._id, e.target.checked)
                          }
                        />
                        <label
                          htmlFor={`choose-me-${todo._id}`}
                          className={`select-none cursor-pointer rounded-full py-1 px-4  font-semibold transition-colors duration-200 ease-in-out ${todo.todoStatus ? "bg-green-500 text-white" : "text-gray-700 bg-gray-300"
                            }`}
                        >
                          {todo.todoStatus ? "Completed" : "Uncompleted"}
                        </label>
                      </div>
                      <div className="flex">
                        <button label="Edit">
                          <Edit displayData={todo} />
                          <MdDelete onClick={(e) => handleDelete(e, todo._id)} className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : <h1>No Tasks</h1>}
              </div>
            </div>
          ))
        ) : (
          <h1>No Projects</h1>
        )}
      </div>
    </>
  );
}

export default ProjectCard;


