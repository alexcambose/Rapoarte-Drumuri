import { EventEmitter } from "events";
import dispatcher from '../dispatcher';
class UserStore extends EventEmitter{
    constructor(){
        super();
        this.user = { };
    }
    set(data){
        this.user = data;
        this.emit('change');
    }
    get(){return this.user}
    handleActions(action){
        switch (action.type) {
            case 'USER_SET': {

                this.set(action.payload);
            }
        }
    }
}
const userStore = new UserStore();
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;