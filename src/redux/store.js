import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
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
    },
    preloadedState: previousState,
});

store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

export default store;