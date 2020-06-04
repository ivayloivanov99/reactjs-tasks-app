import React from 'react';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

export function TaskCard({ task, onDeleteClick }){
    
    const loggedUser = getLoggedUser();
    const taskStyle = {
        maxWidth: "18rem"
    };

    
    return(
        <div className={task.difficulty < 5 ? "card text-white bg-success border-dark m-2 mb-5 p-0"
        : (task.difficulty < 7 ? "card text-dark bg-warning border-dark m-2 mb-5 p-0" 
        : "card text-white bg-danger border-dark m-2 mb-5 p-0")} style={taskStyle}>

            <div className="card-header border-light"> {task.title}</div>
                <div className="card-body">
                    <div className="card-text ">{task.content}.</div>               
            </div>
            <div className="card-footer bg-transparent border-light">
            <div className="card-text">Difficulty: {task.difficulty}</div>    
            </div>
            <div className="card-footer bg-transparent border-light">   
                <div className="status">Status: {task.status}</div>
            </div>
            <div className="card-footer bg-transparent border-light">   
                <div className="author-name">Author: {task.authorName}</div>
                <div className="date">Date: {task.date}</div>
            </div>
            <div className="card-footer bg-transparent border-light">   
            { (loggedUser.isAdmin || (loggedUser.id === task.authorID)) && 
                <Link className="btn-sm btn-primary ml-2 border border-dark text-decoration-none" to={`tasks/edit/${task.id}`}>Edit</Link>}
            { (loggedUser.isAdmin || (loggedUser.id === task.authorID)) && 
                <div className="delete-button btn-sm btn-danger d-inline m-2 border border-dark"
                 onClick={() => onDeleteClick(task.id)}>Delete</div>}
            </div>
        </div>
    )
}