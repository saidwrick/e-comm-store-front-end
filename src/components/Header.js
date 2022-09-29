import { useEffect, useState } from 'react';

function Header() {

    const [expandCart, setExpandCart] = useState(false);

    return (
        <div className="header">
            <a href="/">storeify</a>
            <button onClick={e=>setExpandCart(!expandCart)}>cart</button>
            {expandCart ? 
                <div className="cart-container" onClick={e=>setExpandCart(false)}>
                    <div className="cart" onClick={e=>e.stopPropagation()}>
                        <h1>Cart</h1>
                    </div>
                </div>
            : null}
        </div>
    );
}

export default Header;
