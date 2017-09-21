import PubSub from 'pubsub-js';

export default class TratadorErros{

    publicaErros(erros){
        PubSub.publish("erro-validacao",erros);
    }

}