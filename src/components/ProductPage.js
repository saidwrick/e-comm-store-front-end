import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";
import { addItem } from '../redux/cartSlice';
import { useParams } from 'react-router-dom'
import { expandCartTrue } from '../redux/expandCartSlice'


function ProductPage() {

    const [item, setItem] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();

    const api = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    function addToCart(){
        dispatch(addItem({
            item : item
        }));
        dispatch(expandCartTrue());
    }

    async function getItem(){
        try {
            let res = await fetch(api + `/inventory/${id}`, {
                method: "GET"
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setItem(resJson[0]);
            } 

            else if (res.status === 404){
                throw "404 Page not found"
            }
            else {
                console.log(res.status);
                console.log(resJson);
                throw "Internal server error"
            }
        } 
        catch (err) {
            console.log(err);
            navigate("/404", { state: {err: err}});
        }
    }

    useEffect(() => {
        getItem();

    },[])

    if (!item){
        return null;
    }

    return (
        <div className="product-page">
            <div className="product-image">
                <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_600,w_600/"+item.image}></img>

            </div>
            <div className="product-info">
                <div className="name">{item.name}</div>
                <div className="category">{item.category}</div>
                <div className="price">{`$` + item.price}</div>
                <button onClick={addToCart}>Add to Cart</button>
                <div className="desc">{item.description}</div>
            </div>
        </div>
    );
}

export default ProductPage;
