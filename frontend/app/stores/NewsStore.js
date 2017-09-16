import { EventEmitter } from "events";
import dispatcher from '../dispatcher';
class NewsStore extends EventEmitter{
    constructor(){
        super();
        this.news = [];
    }
    set(data){
        this.news = data;
        console.log('updated')
        this.emit('change');
    }
    get(){return this.news}
    handleActions(action){
        switch (action.type) {
            case 'NEWS_SET': {
                this.set(action.payload);
                break;
            }
            case 'NEWS_FETCHING': {
                this.emit('fetching');
            }
        }
    }
}
const newsStore = new NewsStore();
dispatcher.register(newsStore.handleActions.bind(newsStore));

export default newsStore;