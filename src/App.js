import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route} from "react-router-dom";
import { addTodo } from './redux/todoSlice';
import Store from './components/Store.js';
import Header from './components/Header.js';
import ProductPage from './components/ProductPage.js';
import ErrorPage from './components/ErrorPage.js'

function App() {

    return (
        <div className="App">
            <Header></Header>
            <Routes>
                <Route path="/" element={<Store/>} />
                <Route path="products/:id" element={<ProductPage/>} />
                <Route path="*" element={<ErrorPage err="404 Page not found"/>}/>
                <Route path="/404" element = {<ErrorPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
