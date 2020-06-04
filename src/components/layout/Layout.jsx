import React from 'react';
import { Main } from './main/Main';
import { Header } from './header/Header';


class Layout extends React.Component{
    
    render(){
        return(
            <div className="layout">
                <Header></Header>
                <Main></Main>
            </div>
        );
    }
}

export default Layout;