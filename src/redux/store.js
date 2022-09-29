import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import todoReducer from './todoSlice';
import expandCartReducer from './expandCartSlice'
import { throttle } from 'lodash'

function loadState(){
    try{
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err){
        return undefined;
    }
}

function saveState(state){
    try{
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    }
    catch (err) {

    }
}

const previousState = loadState()

const store = configureStore({
    reducer: {
        todos: todoReducer,
        cart: cartReducer,
        expandCart: expandCartReducer,
    },
    preloadedState: previousState,
});

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;