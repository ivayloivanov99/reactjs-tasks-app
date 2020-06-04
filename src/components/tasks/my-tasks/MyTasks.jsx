import React, { useState, useEffect } from 'react';
import { TaskCard } from '../task-card/TaskCard';
import { getMyTasks, deleteTask } from '../../../core/api/tasks.api';

export function MyTasks(){

    const [userTasks, setUserTasks] = useState([]);

    useEffect(() => {
        getMyTasks().then((tasks) => {
            setUserTasks(tasks);
        })
    }, []);

    const onDelete = (id) => {
        deleteTask(id).then(() => {
            setUserTasks((prevState) => {
                return prevState.filter(task => task.id !== id);
            })
        })
    };

    return(
        <div className="my-tasks-wrapper d-flex flex-wrap justify-content-center">
            { userTasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={onDelete}/>) }
        </div>
    );
}
