import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiURL = 'http://localhost:3005';

export function getAllTasks(){
    return axios.get(`${apiURL}/tasks`);   
}

export function getTaskById(id){
    return axios.get(`${apiURL}/tasks/${id}`);
}

export async function getTasksByAuthorId(authorID){
    const allTasks = (await getAllTasks()).data;
    
    return allTasks.filter(task => task.authorID === authorID);
}

export function getMyTasks(){
    const loggedUserID = getLoggedUser().id;
    return getTasksByAuthorId(loggedUserID);
}

export function saveTask(taskData){
    const loggedUser = getLoggedUser();

    if (taskData.id){
        return axios.put(`${apiURL}/tasks/${taskData.id}`, taskData);
    }
    taskData.authorID = loggedUser.id;
    taskData.authorName = loggedUser.name;
    taskData.status = "Pending";
    const currentDate = new Date();
    taskData.date = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
   
    return axios.post(`${apiURL}/tasks`, taskData);
}

export function deleteTask(id){
    return axios.delete(`${apiURL}/tasks/${id}`);
}

export async function deleteTasksForAuthor(authorID){
    const tasks = await getTasksByAuthorId(authorID);
    tasks.forEach(task => {
        deleteTask(task.id);
    })
}