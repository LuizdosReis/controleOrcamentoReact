import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';

import InputCustomizado from '.././component/InputCustomizado';
import ButtonCustomizado from '.././component/ButtonCustomizado';
import TratadorErros from '.././tratadorErros';


export default class Formulario extends Component{
    
    constructor(){
        super();
        this.state = {descricao:'',data:'',valor:'',contaId:'',categoriaId:'',
                            categorias:[]};
        this.enviaForm = this.enviaForm.bind(this);
        this.salvaCategoria = this.salvaCategoria.bind(this);
    }

    enviaForm(evento){
        evento.preventDefault();
        $.ajax({
            url:"http://localhost:8080/v1/gastos/protected",
            contentType:'application/json',
            dataType:'json',
            type: 'post',
            data: JSON.stringify({descricao:this.state.descricao}),
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJsdWl6LnJlaXMiLCJleHAiOjE1MDU1MjU3Njh9.hu3ri8JSjoS58CFRP6jIMECjs_w7YuD53ewmI8NR3axyVji__pS58iiaCQFMW3rwLctx7M4u6fgKWvdRoqAV7w'
            },
            success:function(gasto){
                PubSub.publish('atualiza-lista-gastos',gasto);
                this.setState({descricao:'',data:'',valor:'',contaId:''});
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

    salvaCategoria(evento){
        evento.preventDefault();

        let categoriaId = this.state.categoriaId;
        let valor = this.state.valor;

        this.setState(prev => {
            let {categorias = []} = prev.categorias;
            let newCategoria = {
                id : categoriaId,
                valor : valor
            }
            categorias.push(newCategoria);
            return {categorias};
        });
    }

    salvaAlteracao(nomeInput,evento){
        this.setState({[nomeInput]:evento.target.value});
    }

    render(){
        return(
            <div className="content">
                <form className="pure-form pure-form-stacked" onSubmit={this.salvaCategoria} method="post">
                    <fieldset>
                        <InputCustomizado id="valor" type="text" value={this.state.valor}
                            onChange={this.salvaAlteracao.bind(this,'valor')} label="Valor"/>

                        <div className="pure-control-group">
                            <label htmlFor="categoria">Categoria</label>
                            <select  name="categoria" onChange={this.salvaAlteracao.bind(this,'categoriaId')}>
                                <option value="">Selecione uma Categoria</option>
                                {
                                    this.props.categorias.map(categoria => 
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.descricao}
                                        </option>
                                    )
                                }

                            </select>

                            <span className="erro">{this.state.msgErro}</span>
                        </div>
                        <ButtonCustomizado label="Adicionar"/>
                    </fieldset>
                </form>

                <ul>
                    {
                        this.state.categorias.map(categoria =>{
                            return(
                                <li>{categoria.descricao} {categoria.valor}</li>
                            )
                        })
                    }        
                </ul>

                <form className="pure-form pure-form-stacked" onSubmit={this.enviaForm} method="post">
                    <fieldset>
                        <legend>Cadastro</legend>

                        <InputCustomizado id="descricao" type="text" value={this.state.descricao}
                            onChange={this.salvaAlteracao.bind(this,'descricao')} label="Descrição"/>

                        <InputCustomizado id="data" type="text" value={this.state.data}
                            onChange={this.salvaAlteracao.bind(this,'data')} label="Data"/>

                        <div className="pure-control-group">
                            <label htmlFor="conta">Conta</label>
                            <select  name="contaId"  onChange={this.salvaAlteracao.bind(this,'contaId')}>
                                <option value="">Selecione uma conta</option>
                                {
                                    this.props.contas.map(
                                        function(conta){
                                            return(
                                            <option key={conta.id} value={conta.id}>{conta.descricao}</option>
                                            ) 
                                        } 
                                        
                                    )
                                }

                            </select>

                            <span className="erro">{this.state.msgErro}</span>
                        </div>
                        <ButtonCustomizado label="Salvar"/>
                    </fieldset>
                </form>   
            </div>
        );
    }



}