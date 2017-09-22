import PubSub from 'pubsub-js';

export default class DespesaController{
    
    constructor(despesas){
        this.despesas = despesas;
    }

    getAll(){
        const requestInfo = {
            method:'GET',
            headers: new Headers({
                'Content-type':'application/json',
                'Authorization': localStorage.getItem('Authorization')
            })
        }

        fetch("http://localhost:8080/v1/despesas/protected",requestInfo)
        .then(response =>  {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Não foi possivel carregar as categorias');
            }
        })
        .then(retorno =>{
            this.despesas = retorno.content;
            PubSub.publish('atualiza-lista-despesas',retorno.content);
        })
        .catch(error => {
            console.log(error);
        })    
    }

    save(despesa){
        const requestInfo = {
            method:'POST',
            body: JSON.stringify({despesa}),
            headers: new Headers({
                'Content-type':'application/json',
                'Authorization': localStorage.getItem('Authorization')
            })
        }

       fetch("http://localhost:8080/v1/despesas/protected",requestInfo)
        .then(response =>  {
            if(response.ok){
                return response.json();
            }else{
                throw new Error('Não foi possivel carregar as categorias');
            }
        })
        .then(retorno =>{
            this.despesas.push(retorno);
            PubSub.publish('atualiza-lista-despesas',this.despesas);
        })
        .catch(error => {
            console.log(error);
        })    
    }



}