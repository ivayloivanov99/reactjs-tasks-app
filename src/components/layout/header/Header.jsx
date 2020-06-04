import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout, getLoggedUser } from '../../../core/api/users.api';

export function Header(){
    
  const [isLoggedOut, setLogoutFlag] = useState(false);
  const loggedUser = getLoggedUser();

  const pictureStyle = {
    width: "3%",
  };

  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);

  }

  return(
    <>
    { isLoggedOut && <Redirect to="/login" /> }
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <a className="navbar-brand" href="/">Tasks</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
      <Link to="/users" className="nav-link">Users</Link>
      </li>
      <li className="nav-item">
      {loggedUser && loggedUser.isAdmin && <Link to="/users/create" className="nav-link">Create user</Link>}
      </li>
      <li className="nav-item">
      <Link to="/tasks" className="nav-link">All Tasks</Link>
      </li>
      <li className="nav-item">
      <Link to="/tasks/my-tasks" className="nav-link">My Tasks</Link>
      </li>
      <li className="nav-item">
      <Link to="/tasks/create" className="nav-link">New Task</Link>
      </li>
    </ul>
    {loggedUser && <img src={loggedUser.picture} className="rounded-circle border border-light" alt="" style={pictureStyle}/>}
    {loggedUser && <Link className="logged-user m-1 text-decoration-none text-light" to={`/users/${loggedUser.id}`}>{loggedUser.name}</Link>}
    <button className="btn btn-danger my-2 my-sm-0 ml-1" type="submit" onClick={ onLogout }>Logout</button>
  </div>
</nav>
</>
    );
}
