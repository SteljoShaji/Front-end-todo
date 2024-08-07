import { BASEURL} from "./baseUrl";
import { commonAPI } from "./commonApi";

//register API
export const registerAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/register`,user,"")
}

//loginAPI
export const loginAPI = async (user)=>{
    return await commonAPI("POST",`${BASEURL}/user/login`,user,"")
}

//addProjectApi
export const addProjectAPI = async (project,header)=>{
    return await commonAPI("POST",`${BASEURL}/projects/add`,project,header)
}

//addTodos api
export const addTodoAPI = async (todo,header)=>{
    return await commonAPI("POST",`${BASEURL}/todos/add`,todo,header)
}

//user/all-todos
export const userTodoAPI = async (header)=>{
    return await commonAPI("GET",`${BASEURL}/user/all-todos`,"",header)
}
//user/all-projects
export const userProjectAPI = async (header)=>{
    return await commonAPI("GET",`${BASEURL}/user/all-projects`,"",header)
}


// updateTodoStatusAPI
export const updateTodoStatusAPI = async (todoId, status, reqHeader) => {
    return await fetch(`${BASEURL}/todo/status/${todoId}`, {
      method: 'PUT',
      headers: reqHeader,
      body: JSON.stringify({ todoStatus: status }),
    }).then(response => response.json());
  };

  
//editTodo
export const editTodoAPI = async (todoId, todo, reqHeader) => {
    return await fetch(`${BASEURL}/todo/edit/${todoId}`, {
      method: 'PUT',
      headers: reqHeader,
      body: JSON.stringify(todo),
    }).then(response => response.json());
  };

  
//deleteTodo
export const deleteTodoAPI = async (todoId, reqHeader) => {
    return await commonAPI("DELETE", `${BASEURL}/todo/remove/${todoId}`, {}, reqHeader);
}

//deleteProject
export const deleteProjectAPI = async (projectId, header) => {
    return await commonAPI("DELETE", `${BASEURL}/project/remove/${projectId}`, {}, header);
};
