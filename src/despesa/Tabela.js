import React, { Component } from 'react';

export default class Tabela extends Component{

    render(){
        return(
            <div className="content">
                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.lista.map(function(despesa){
                                return(
                                    <tr key={despesa.id}>
                                        <td>{despesa.descricao}</td>
                                        <td>{despesa.data}</td>
                                        <td>{despesa.valor}</td>
                                        <td>
                                            {
                                                despesa.gastosCategorizados.map(function(gastoCategorizado){
                                                    return(
                                                        <table key={gastoCategorizado.id}>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        {gastoCategorizado.categoria.descricao}
                                                                    </td>
                                                                    <td>
                                                                        {gastoCategorizado.valor}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    );
                                                })
                                            }
                                        </td>               
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