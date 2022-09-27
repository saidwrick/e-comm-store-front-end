import { useEffect, useState } from 'react';

function StoreCard(props) {

    if (!props.item) {
        return null;
    }

    return (
        <div className="store-card">
            <div className="img-container">
                <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_500,w_500/"+props.item.image}></img>
            </div>
            {props.item.quantity <= 5 ? <div className="limited">* only {props.item.quantity} left in stock</div> : null}
            <div className="name">{props.item.name}</div>
            <div className="price">${props.item.price}</div>
            <button>add to cart</button>
        </div>
    );
}

export default StoreCard;
