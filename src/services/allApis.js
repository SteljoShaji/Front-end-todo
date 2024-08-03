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