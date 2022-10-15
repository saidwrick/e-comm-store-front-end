import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem.js';
import { expandCartTrue, expandCartFalse} from '../redux/expandCartSlice'
import { ReactComponent as CartIcon} from '../icons/bag.svg'
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function Header() {

    const expandCart = useSelector((state) => state.expandCart);
    const cart = useSelector((state) => state.cart);
    const totalCost = useSelector((state) => 
        state.cart.reduce(
            (prev, cur) => prev + (cur.quant * cur.item.price), 0
        )
    );

    const totalItems = useSelector((state) => 
        state.cart.reduce(
            (prev, cur) => prev + parseInt(cur.quant), 0
        )
    );

    const dispatch = useDispatch();

    function openCart(){
        dispatch(expandCartTrue());
    }

    function closeCart(){
        dispatch(expandCartFalse());
    }

    return (
        <div className="header">
            <a href ="/">storeify</a>
            <button onClick={openCart} className="cart-icon">
            <CartIcon/>
                <div className="cart-icon-total">
                    {totalItems < 100 ? totalItems : "99+"}
                </div>
            </button>
            {console.log(cart)}
            {expandCart ? 
                <div className="cart-bg" onClick={closeCart}>
                    <div className="cart-container">
                        <div className="cart" onClick={e=>e.stopPropagation()}>
                            <button className="close" onClick={closeCart}><CloseIcon/></button>
                            <h1>Cart</h1>
                            <div className="total">
                                <h2>Total: ${totalCost.toFixed(2)}</h2>
                                <button className="checkout" onClick={e=>alert("coming soon")}>Checkout</button>
                            </div>
                            {cart.map(e=><CartItem key={e.id} item={e.item} quant={e.quant} id={e.id}></CartItem>)}
                        </div>
                    </div>
                </div>
            : null}
        </div>
    );
}

export default Header;
