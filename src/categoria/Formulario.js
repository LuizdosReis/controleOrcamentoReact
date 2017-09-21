import React, { Component } from 'react';

import InputCustomizado from '.././component/InputCustomizado';
import ButtonCustomizado from '.././component/ButtonCustomizado';
import TratadorErros from '.././tratadorErros';
import CategoriaController from './../controller/CategoriaController';

export default class Formulario extends Component{

    constructor(props){
        super(props);
        this.state = {descricao:''};
        this.enviaForm = this.enviaForm.bind(this);
        this.categoriaController = this.props.controller;
    }

    enviaForm(evento){
        evento.preventDefault();
        this.categoriaController.saveCategoria(this.state.descricao);
        this.setState({descricao:''});
    }


    salvaAlteracao(nomeInput,evento){
        this.setState({[nomeInput]:evento.target.value});

    }

    render(){
        return(
            <div className="content">
                <form className="pure-form pure-form-stacked" onSubmit={this.enviaForm} method="post">
                    <fieldset>
                        <legend>Cadastro</legend>

                        <InputCustomizado id="descricao" type="text" value={this.state.descricao}
                                        onChange={this.salvaAlteracao.bind(this,'descricao')} label="Descrição"/>

                        <ButtonCustomizado label="Salvar"/>
                    </fieldset>
                </form>   
            </div>
        );
    }
}