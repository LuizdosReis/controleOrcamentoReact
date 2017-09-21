import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component{

    componentWillMount(){
        localStorage.removeItem('Authorization');
        <Redirect to={"/"}/>
    }

    render(){
        return null;
    }
}