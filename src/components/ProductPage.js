import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

function ProductPage() {

    const [item, setItem] = useState(null);
    const {id} = useParams();

    async function getItem(){
        try {
            let res = await fetch(`/inventory/${id}`, {
                method: "GET"
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setItem(resJson[0]);
            } 

            else {
                console.log(res.status);
                console.log(resJson);
                //navigate 404
            }
        } 
        catch (err) {
            console.log(err);
            // navigate("/404", { state: {err: err}});
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
                <button>Add to Cart</button>
                <div className="desc">{item.description}</div>
            </div>
        </div>
    );
}

export default ProductPage;
