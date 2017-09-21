import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import Tabela from './Tabela';
import Formulario from './Formulario';

export default class DespesaBox extends Component{
    constructor(){
        super();
        this.state = {despesas:[],contas:[],categorias:[]};
    }

    componentDidMount(){
        const requestInfo = {
            method:'GET',
            headers: new Headers({
                'Content-type':'application/json',
                'Authorization': localStorage.getItem('Authorization')
            })
        }

        fetch("http://localhost:8080/v1/gastos/protected",requestInfo)
        .then(response =>  {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Não foi possivel carregar os gastos');
            }
        })
        .then(retorno =>{
            this.setState({despesas:retorno.content});
        })
        .catch(error => {
            console.log(error);
        })

        fetch("http://localhost:8080/v1/contas/protected",requestInfo)
        .then(response =>  {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Não foi possivel carregar as contas');
            }
        })
        .then(retorno =>{
            this.setState({contas:retorno});
        })
        .catch(error => {
            console.log(error);
        })

        fetch("http://localhost:8080/v1/categorias/protected",requestInfo)
        .then(response =>  {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Não foi possivel carregas as categorias');
            }
        })
        .then(retorno =>{
            this.setState({categorias:retorno.content});
        })
        .catch(error => {
            console.log(error);
        })
        
        PubSub.subscribe('atualiza-lista-despesas', (topico,despesa) => {
            this.state.despesas.push(despesa);
            this.setState({despesas:this.state.lista});
        });
    }

    render(){
        return(
            <div>
                <h1>Despesas</h1>
                <Formulario contas={this.state.contas} categorias={this.state.categorias}></Formulario>
                <Tabela lista={this.state.despesas}></Tabela>
            </div>
        );
    }


}
