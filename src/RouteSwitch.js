import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import Inventory from "./components/Inventory.js";
import Navbar from "./components/Navbar.js";

const RouteSwitch = () => {

    // in order to preserve usability for Inventory page in mobile sizes
    useEffect(()=>{
        if(window.location.pathname==='/inventory'){
            document.documentElement.style.minWidth="800px";
        }
        else{
            document.documentElement.style.minWidth= null;
        }
    });

    return (
       
        <BrowserRouter>
            <Navbar></Navbar>
                <Routes>
                    <Route path="/*" element={<App/>} />
                    <Route path="/inventory" element={<Inventory/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;