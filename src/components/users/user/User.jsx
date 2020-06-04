import React, { Component } from 'react';
import { getUserById } from '../../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';


export class User extends Component {

    constructor(props){
        super(props);

        this.state= {
            user: {}
        };
    }

    componentDidMount() {
        
        getUserById(this.props.computedMatch.params.id).then((response) => {
            this.setState({
               user: response.data
            });
       });
    }

    render(){
        return (
            <div className="single-user d-flex justify-content-center mt-5">
                <UserCard user={this.state.user}/>
            </div>
        );
    }
}
