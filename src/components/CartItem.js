import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, changeQuant} from '../redux/cartSlice';
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function CartItem(props) {

    const dispatch = useDispatch();

    function removeFromCart(){
        dispatch(removeItem({
            id : props.id
        }));
    }

    function updateQuant(e){
        if (e.target.value.length <= 5){
            dispatch(changeQuant({
                id: props.id,
                quant: e.target.value
            }))
        }
    }

    function preventInput(e){
        if (e.keyCode > 31 && (e.keyCode < 48 || e.keyCode > 57)){
            e.preventDefault();
        }
    }

    if (!props){
        return null;
    }
    
    return (
        <div className="cart-item">
            <a className="cart-image " href={`/products/${props.item.item_id}`}>
                <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_150,w_150/"+props.item.image}></img>
            </a>
            <div className="cart-desc">
                <a className="name" href={`/products/${props.item.item_id}`}>{props.item.name}</a>
                <a className="price" href={`/products/${props.item.item_id}`}>${props.item.price}</a>
                <div className="quant">Qty: 
                    <input min="0" onKeyDown={preventInput} maxLength={5} value={props.quant} onChange={updateQuant}></input>
                </div>
            </div>
            <button className="delete" onClick={removeFromCart}><CloseIcon/></button>
        </div>  
    );
}

export default CartItem;
