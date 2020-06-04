import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';

const cardStyle = {
    width: "18rem",
};


export function UserCard({ user, onDelete }){
    const loggedUser = getLoggedUser();
 
    return(
        <div className="card m-2 mb-5 p-0 border-primary rounded" style={cardStyle}>
            <img src={user.picture} alt={user.name}/>
            <div className="card-body">
                <h5 className="card-title "><Link to={`/users/${user.id}`}>{user.name}</Link></h5>
            </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Age: {user.age}</li>
                    <li className="list-group-item">Email: {user.email}</li>
                </ul>
            <div className="card-body">
              { loggedUser.isAdmin && <Link className="edit-button d-flex justify-content-center 
              text-decoration-none btn-sm btn-primary m-2 border border-dark" 
              to={`/users/edit/${user.id}`}>Edit</Link> }
              { (loggedUser.isAdmin && loggedUser.id !== user.id) && <div className="delete-button btn-sm btn-danger m-2 border border-dark"
               onClick={() => onDelete(user.id)}>Delete</div> }
            </div>
        </div>
    );
}