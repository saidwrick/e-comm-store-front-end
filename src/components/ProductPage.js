import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { useParams } from 'react-router-dom'
import { expandCartTrue } from '../redux/expandCartSlice'
import ErrorPage from "./ErrorPage";

function ProductPage() {

    const [item, setItem] = useState(null);
    const {id} = useParams();
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPage, setErrorPage] = useState(false);

    const api = process.env.REACT_APP_API_URL;

    function openErrorPage(msg = ""){
        setErrorMsg(msg);
        setErrorPage(true);
    }

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
            openErrorPage(err);
        }
    }

    useEffect(() => {
        getItem();

    },[])

    if (!item && !errorPage){
        return null;
    }

    if (errorPage) {
        return <ErrorPage err={errorMsg}></ErrorPage>
    }

    return (
        <div className="product-page">
            <div className="product-image">
                <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/"+item.image}></img>

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
