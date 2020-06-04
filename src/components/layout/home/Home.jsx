import React from 'react';
import { getLoggedUser } from '../../../core/api/users.api';
import './Home.css';


export function Home(){
    
    const currentUser = getLoggedUser();

    return(
       <div className="home-text">
          <div className="welcome-text font-weight-bold font-italic">
                <h1>Welcome {currentUser.name}</h1>
                <p>to my react project!</p>
         </div>
       </div> 
    );
}