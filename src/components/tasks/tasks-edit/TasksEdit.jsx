import React, { useState, useEffect } from 'react';
import { saveTask, getTaskById } from '../../../core/api/tasks.api';
import { Redirect } from 'react-router-dom';
import "./TasksEdit.css"

export function TasksEdit(props){
    
    const[currentTask,setCurrentTask] = useState({title:'',content:'',difficulty:'',authorID:'',authorName:'',date:''});
    const[shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if(props.computedMatch.params.id){
            getTaskById(props.computedMatch.params.id).then((result) => {
                setCurrentTask(result.data);
            });
        }
    },[props.computedMatch.params.id])

    const onInputChange = (event) => {
        event.persist();
        setCurrentTask((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onTaskSave = (event) => {
        event.preventDefault();
        saveTask(currentTask).then(() => {
            setShouldRedirect(true);
        })
        .catch((err) => console.error(err));
    }

    return(
        <>
        {shouldRedirect && <Redirect to="/tasks" />}
        <div className="task-edit-wrapper">
            <form className= "task-form-wrapper" onSubmit={onTaskSave}>
                <div className="form-group">
                    <label labelfor="title">Title: </label>
                    <input className="form-control" type="text" id="title" name="title" onChange={onInputChange} value={currentTask.title} />
                </div>
                <div className="form-group">
                    <label labelfor="content">Content: </label>
                    <textarea className="form-control" id="content" name="content" onChange={onInputChange} value={currentTask.content} />
                </div>
                <div className="form-group">
                    <label labelfor="difficulty">Difficulty: </label>
                    <input className="form-control" type="number" min="1" max="10" id="difficulty" name="difficulty" onChange={onInputChange} value={currentTask.difficulty} />
                </div>
                {currentTask.id && <div className="form-group">
                    <label labelfor="status">Status:</label>                   
                    <select className="form-control" id="status" name="status" onChange={onInputChange} value={currentTask.status}>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>}
                <button className="btn btn-primary">Save task</button>
            </form>
        </div>
        </>
    )
}