import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import Inventory from "./components/Inventory.js";
import Navbar from "./components/Navbar.js";

const RouteSwitch = () => {

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