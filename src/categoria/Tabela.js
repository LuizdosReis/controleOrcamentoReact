import React, { Component } from 'react';

export default class Tabela extends Component{

    render(){
        return(
            <div className="content">
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.lista.map(function(categoria){
                                return (
                                    <tr key={categoria.id}>
                                        <td>{categoria.descricao}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

