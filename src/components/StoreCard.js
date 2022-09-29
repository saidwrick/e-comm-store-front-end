import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { expandCartTrue } from '../redux/expandCartSlice'

function StoreCard(props) {
    const dispatch = useDispatch();

    function addToCart(){
        dispatch(addItem({
            item : props.item
        }));
        dispatch(expandCartTrue());
    }

    if (!props.item) {
        return null;
    }

    return (
        <div className="store-card">
            <a className="img-container" href={`/products/${props.item.item_id}`}>
                <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_500,w_500,q_auto/"+props.item.image}></img>
            </a>
            {props.item.quantity <= 5 ? <div className="limited">* only {props.item.quantity} left in stock</div> : null}
            <a className="name" href={`/products/${props.item.item_id}`}>{props.item.name}</a>
            <a className="price" href={`/products/${props.item.item_id}`}>${props.item.price}</a>
            <button onClick={addToCart}>add to cart</button>
        </div>
    );
}

export default StoreCard;
