import {useEffect, useState} from "react";

function Navbar() {

    return (
        <div className="nav-bar">
            Manage products in the inventory and view live updates in the store!
            <a href="/">Storefront </a>
            <a href="/inventory">Manage Inventory</a>
        </div>
    );
}

export default Navbar;
