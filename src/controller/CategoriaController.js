import PubSub from 'pubsub-js';

export default class CategoriaController{
    
    constructor(categorias){
        console.log(categorias);
        this.categorias = categorias;
    }
    
    getCategorias(){
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
            this.categorias = retorno.content;
            PubSub.publish('atualiza-lista-categoria',retorno.content);
        })
        .catch(error => {
            console.log(error);
        })    
    }

    saveCategoria(descricao){
        const requestInfo = {
            method:'POST',
            body: JSON.stringify({'descricao':descricao}),
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
            this.categorias.push(retorno);
            PubSub.publish('atualiza-lista-categoria',this.categorias);
        })
        .catch(error => {
            console.log(error);
        })    
    }
}