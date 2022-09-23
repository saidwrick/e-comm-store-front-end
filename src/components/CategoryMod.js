import { useEffect, useState } from 'react';
import CategoryModItem from './CategoryModItem.js';

function CategoryMod(props) {
    
    const [categories, setCategories] = useState([])
    const [addCat, setAddCat] = useState("");

    async function getCategories(){
        try {
            let res = await fetch("/categories", {
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
                //navigate 404
            }
        } 
        catch (err) {
            console.log(err);
            // navigate("/404", { state: {err: err}});
        }
    }

    function handleAddCatClick(e){
        e.stopPropagation();
    }

    async function handleAddCatSubmit(e){
        if (e.key === "Enter"){
            try {
                let res = await fetch("/categories", {
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
                    //navigate 404
                }
            } 
            catch (err) {
                console.log(err);
                // navigate("/404", { state: {err: err}});
            }
        }
    }

    useEffect(() => {
        getCategories();
    },[])

    if (!props) {
        return null;
    }

    return (
        <div className="module" onClick={e=>props.expandCat(false)}>
            <div className="cat-mod" onClick={e=>e.stopPropagation()}>
                <h1>Edit Categories</h1>
                {categories.map(e => <CategoryModItem key={e.category_id} item={e} getCategories={getCategories} getInventory={props.getInventory}></CategoryModItem>)}
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