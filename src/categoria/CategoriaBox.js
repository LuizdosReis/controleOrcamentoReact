import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import Formulario from './Formulario';
import Tabela from './Tabela';

export default class CategoriaBox extends Component{
    
    constructor(){
        super();
        this.state = {lista:[],mensagem:''};
    }
    
    componentDidMount(){
        const requestInfo = {
            method:'GET',
            headers: new Headers({
                'Content-type':'application/json',
                'Authorization': localStorage.getItem('Authorization')
            })
        }

        fetch("http://localhost:8080/v1/categorias/protected",requestInfo)
        .then(response =>  {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Não foi possivel carregar as categorias');
            }
        })
        .then(retorno =>{
            this.setState({lista:retorno.content});
        })
        .catch(error => {
            console.log(error);
        })
    
        PubSub.subscribe('atualiza-lista-categoria', (topico,despesa) => {
            this.state.lista.push(despesa);
            this.setState({lista:this.state.lista});
        });
    }

    render(){
        return(
            <div>
                <h1>Categoria</h1>
                <p>{this.state.mensagem}</p>
                <Formulario></Formulario>
                <Tabela lista={this.state.lista}></Tabela>
            </div>
        );
    }
} 