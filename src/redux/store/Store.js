import { createStore } from 'redux';
import { loginReducer } from '../reducer/Reducer';



const store = createStore(loginReducer);
store.subscribe(()=>console.log("store",store.getState()))


export default store