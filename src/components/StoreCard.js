import { useEffect, useState } from 'react';

function StoreCard(props) {

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
            <button>add to cart</button>
        </div>
    );
}

export default StoreCard;
