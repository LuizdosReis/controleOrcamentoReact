import React, { Component } from 'react';
import ButtonCustomizado from '.././component/ButtonCustomizado';
import {Redirect} from 'react-router-dom';

export default class Login extends Component{

    constructor(props){
        super(props)
        this.state = {mensagem:'',redirectToReferrer: false}
    }


    enviaForm(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body: JSON.stringify({
                'username':this.username.value,
                'password':this.password.value
            }),
            headers: new Headers({
                'Content-type':'application/json'
            })
        }

        fetch('http://localhost:8080/login',requestInfo)
            .then(response =>{
                if(response.ok){
                    return response.text();
                }else{
                    throw new Error('não foi possível fazer o login');
                }
            })
            .then(token =>{
                localStorage.setItem('Authorization',token);
                this.setState({ redirectToReferrer: true });
            })
            .catch(error =>{
                this.setState({mensagem:'Não foi possivel fazer o login'})
            })
    }

    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        
        if (redirectToReferrer) {
          return (
            <Redirect to={from}/>
          )
        }

        return(
            <div className="content">
                <form className="pure-form-stacked" onSubmit={this.enviaForm.bind(this)}>
                    <fieldset>
                        <legend>Login</legend>
                        <span>{this.state.mensagem}</span>
                        <input  ref={(input) => { this.username = input; }} type="text" placeholder="Usuário"/>
                        <input  ref={(input) => {this.password = input; }} type="password" placeholder="Senha"/>
        
                        <ButtonCustomizado label="Login"/>
                    </fieldset>
                </form>
            </div>
        );
    }
}