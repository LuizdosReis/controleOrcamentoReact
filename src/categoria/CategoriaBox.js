import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import Formulario from './Formulario';
import Tabela from './Tabela';
import CategoriaController from './../controller/CategoriaController';

export default class CategoriaBox extends Component{
    
    constructor(){
        super();
        this.state = {lista:[],mensagem:''};
        this.categoriaController = new CategoriaController(this.state.lista);
    }
    
    componentDidMount(){

        this.categoriaController.getAll();

        PubSub.subscribe('atualiza-lista-categorias', (topico,categoria) => {
            this.setState({lista:categoria});
        });
    }

    render(){
        return(
            <div>
                <h1>Categoria</h1>
                <p>{this.state.mensagem}</p>
                <Formulario controller={this.categoriaController}></Formulario>
                <Tabela lista={this.state.lista}></Tabela>
            </div>
        );
    }
} 