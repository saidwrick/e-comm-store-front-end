import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import Inventory from "./components/Inventory.js"

const RouteSwitch = () => {

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>} />
                    <Route path="/inventory" element={<Inventory/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;