import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import Tabela from './Tabela';
import Formulario from './Formulario';
import DespesaController from './../controller/DespesaController';
import CategoriaController from './../controller/CategoriaController';

export default class DespesaBox extends Component{
    constructor(){
        super();
        this.state = {despesas:[],contas:[],categorias:[]};
        this.despesaController = new DespesaController(this.state.despesas);
        this.categoriaController = new CategoriaController(this.state.categorias);
    }

    componentDidMount(){
        this.despesaController.getAll();
        this.categoriaController.getAll();

        PubSub.subscribe('atualiza-lista-categorias', (topico,categoria) => {
            this.setState({'categorias':categoria});
            console.log(this.state.categorias);
        });

        PubSub.subscribe('atualiza-lista-despesas', (topico,despesas) => {
            this.setState({'despesas':despesas});
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
