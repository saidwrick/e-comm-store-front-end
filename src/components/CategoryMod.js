import { useEffect, useState } from 'react';
import CategoryModItem from './CategoryModItem.js';
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function CategoryMod(props) {
    
    const [categories, setCategories] = useState([])
    const [addCat, setAddCat] = useState("");
    const [expandError, setExpandError] =useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const api = process.env.REACT_APP_API_URL
    
    async function getCategories(){
        try {
            let res = await fetch(api + "/categories", {
                method: "GET",
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setCategories(resJson);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    function handleAddCatClick(e){
        e.stopPropagation();
    }

    async function handleAddCatSubmit(e){
        setExpandError(false);
        if (e.key === "Enter"){
            try {
                let res = await fetch(api + "/categories", {
                    method: "POST",
                    headers:{
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        "name": addCat
                    })
                });
                
                let resJson = await res.json();
                
                if (res.status === 200) {
                    console.log("success");
                    console.log(resJson);
                    getCategories();
                    setAddCat("");
                    props.getInventory();
                } 
                else {
                    console.log(res.status);
                    console.log(resJson);
                    handleError(resJson)
                }
            } 
            catch (err) {
                console.log(err);
                handleError(err)
            }
        }
    }

    function handleError (message) {
        setExpandError(true);
        setErrorMsg(message);
    }

    useEffect(() => {
        getCategories();
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = null;
    },[])

    if (!props) {
        return null;
    }

    return (
        <div className="modal" onClick={props.categoryToggle}>
            <div className="cat-mod" onClick={e=>e.stopPropagation()}>
                <div className="modal-header">
                    <button className="close" onClick={props.categoryToggle}><CloseIcon/></button>
                    <h1>Edit Categories</h1>
                </div>
                {expandError ?
                    <div className="error">{errorMsg}</div>
                :null}
                {categories.map(e => 
                    <CategoryModItem 
                        key={e.category_id} 
                        item={e} 
                        getCategories={getCategories} 
                        getInventory={props.getInventory}
                        handleError={handleError}>
                    </CategoryModItem>)}
                <input className="new" type="text" minLength="3" 
                    placeholder={"-add new category-"} 
                    onClick={handleAddCatClick}
                    onChange={(e)=> setAddCat(e.target.value)}
                    onKeyDown={handleAddCatSubmit}
                    value={addCat}>
                </input>
            </div>
        </div>
    );
}

export default CategoryMod;
