import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser, getLoggedUser } from './../../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';

    

export function UsersList() {

    const currentUser = getLoggedUser();
    const [users, setUsers] = useState([]);

    const onUserDelete = (id) => {
        deleteUser(id).then(() => {
            setUsers((prevState) => {
                return prevState.filter(u => u.id !== id);
            })
        })
        .catch((err) => console.error(err));
    }

    useEffect(() => {
        getAllUsers().then((allUsers) => {
            console.log(allUsers);
            setUsers(allUsers.data.filter(u => u.id !== currentUser.id));
        });
    }, [currentUser.id]);


return (
    <div className="users-list d-flex flex-wrap justify-content-center">
        {users.map((user) => <UserCard user={user} key={user.id} onDelete={onUserDelete} />)}
    </div>
    );
}