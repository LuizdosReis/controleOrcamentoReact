import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/pure-min.css';
import './css/side-menu.css';
import registerServiceWorker from './registerServiceWorker';
import decode from 'jwt-decode';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
  } from 'react-router-dom';

import CategoriaBox from './categoria/CategoriaBox';
import DespesaBox from './despesa/DespesaBox';
import Login from './login/Login';
import Logout from './login/Logout';
import App from './App';

const checkAuth = () => {
    const token = localStorage.getItem('Authorization');
    if(!token){ return false; } 
    
    try{

        const {exp} = decode(token);
        if(exp < new Date().getTime() / 1000){
            return false;
        }
        
    }catch(e){
        return false;
    }

    return true;

}

const AuthRoute = ({ component: Component, ...rest }) => (
    
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{ 
            pathname: '/Login',
            state: { from: props.location }
        }}/>
        
      )
    )}/>
)

ReactDOM.render((
    <Router>
        <div>

            <nav id="menu">
                <div className="pure-menu">
                    <ul className="pure-menu-list">
                        <li className="pure-menu-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="pure-menu-item">
                            <Link to="/Despesas" className="pure-menu-link">Despesas</Link>
                        </li>
                        <li className="pure-menu-item">
                            <Link to="/Categorias" className="pure-menu-link">Categorias</Link>
                        </li>
                        <li className="pure-menu-item">
                            <Link to="/logout">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Route exact path="/" component={App}/>
            <AuthRoute path="/categorias" component={CategoriaBox}/>
            <AuthRoute path="/despesas" component={DespesaBox}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={Logout}/>
        </div>
    </Router>
    ),document.getElementById('root')
);
registerServiceWorker();
