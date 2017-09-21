import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';


import InputCustomizado from '.././component/InputCustomizado';
import ButtonCustomizado from '.././component/ButtonCustomizado';
import TratadorErros from '.././tratadorErros';

export default class Formulario extends Component{

    constructor(){
        super();
        this.state = {descricao:''};
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(evento){
        evento.preventDefault();
        $.ajax({
            url:"http://localhost:8080/v1/categorias/protected",
            contentType:'application/json',
            dataType:'json',
            type: 'post',
            data: JSON.stringify({descricao:this.state.descricao}),
            headers: {
                'Authorization': ' Basic ' + btoa('luiz.reis:123')
            },
            success:function(categoria){
                PubSub.publish('atualiza-lista-categoria',categoria);
                this.setState({descricao:''});
            }.bind(this),
            error: function(resposta){
                if(resposta.status === 400){
                   new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function(){
                PubSub.publish("limpa-erros",{});
            }
        });
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