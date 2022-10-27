import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import Inventory from "./components/Inventory.js";
import Navbar from "./components/Navbar.js";

const RouteSwitch = () => {

    // loading screen only if server hasn't been used for 14 mins
    const [loading, setLoading] = useState(
        Date.now() - localStorage.lastLog >= 840000 || !localStorage.lastLog ? true : false
    );

    const api = process.env.REACT_APP_API_URL

    // to wake up api on initial load (free service goes to sleep after inactivity)
    async function queryApi() {
        try {
            let res = await fetch(api + "/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: "a",
                        password: "a"
                    }
                ),
            });
            setLoading(false);
        }
        catch {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading){
            queryApi();
        }
        localStorage.lastLog = Date.now();
    },[]);

    if (loading){
        return (
            <div className="loading">
                <img src={require("./icons/loader.gif")}></img>
                <h2>server is waking up, initial load may take a minute...</h2>
            </div>
        )
    }

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