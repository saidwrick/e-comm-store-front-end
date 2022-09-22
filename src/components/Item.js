import { useEffect, useState } from 'react';
import CategoryDropdown from './CategoryDropdown.js'

function Item(props) {

//item_id | name   | price | photo       | description              | quantity | category_id

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [photo, setPhoto] = useState();
    const [desc, setDesc] = useState();
    const [quant, setQuant] = useState();
    const [catId, setCatId] = useState();
    const [cat, setCat] = useState();
    const [disabled, setDisabled] = useState(true);

    function refreshValues(){
        setName(props.item.name);
        setPrice(props.item.price);
        setPhoto(props.item.photo);
        setDesc(props.item.description);
        setQuant(props.item.quantity);
        setCatId(props.item.category_id);
        setCat(props.item.category);
        setDisabled(true);
    }

    function handleChange(e){
        setDisabled(false);
        const className = e.target.className
        switch (className){
            case "name":
                setName(e.target.value);
                break;
            case "price":
                setPrice(e.target.value);
                break;
            case "photo":
                setPhoto(e.target.value);
                break;
            case "desc":
                setDesc(e.target.value);
                break;
            case "quant":
                setQuant(e.target.value);
                break;
        }
    }

    const [expandCategories, setExpandCategories] = useState(false);

    function handleCategoriesClick(e){
        console.log(expandCategories)
        e.stopPropagation();
        // to close categories menu if click outside
        if (!expandCategories){
            function closeCategories (e) {
                e.stopPropagation();
                setExpandCategories(false);
                document.removeEventListener("click", closeCategories);
            }
            document.addEventListener("click", closeCategories);
        }
        setExpandCategories(!expandCategories);
    }

    function categoryChange(id, name){
        setCatId(id);
        setCat(name);
        setDisabled(false);
    }

    async function updateItem(){
        try {
            console.log(catId)
            let res = await fetch(`/inventory/${props.item.item_id}`, {
                method: "PUT",
                headers: {
                    "type" : "details",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name, 
                    "price": price, 
                    "desc": desc, 
                    "quant": quant, 
                    "cat": catId
                }),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                props.getInventory();
                setDisabled(true);
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

    async function deleteItem(){
        try {
            let res = await fetch(`/inventory/${props.item.item_id}`, {
                method: "DELETE"
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
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

// display full value on hover
    const [hover, setHover] = useState();

    function mouseEnter(e){
        if (e.target.value != ""){
            setHover(e.target.className)
        }
    }

    function mouseLeave(e){
        setHover(null)
    }

    useEffect(() => {
        refreshValues();
    },[])

    if (!props.item){
        return null
    }

    return (
        <>
            <div className="id">{props.item.item_id}</div>
            <div className="cell">
                <input className="name" 
                    type="text"
                    onChange={handleChange}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    value={name || ""}>
                </input>
                {hover == "name" ? <div className="hover">{name}</div> : null}
            </div>
            <div className="cell">
                <input className="price" 
                    type="number" min="0"
                    onChange={handleChange}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    value={price || ""}>
                </input>
                {hover == "price" ? <div className="hover">{price}</div> : null}
            </div>
            <div className="cell">
                <input className="photo" 
                    onChange={handleChange}
                    value={photo || ""}>
                </input>
            </div>
            <div className="cell">
                <input className="desc" 
                    type="text"
                    onChange={handleChange}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    value={desc || ""}>
                </input>
                {hover == "desc" ? <div className="hover">{desc}</div> : null}
            </div>
            <div className="cell">
                <input className="quant" 
                    type="number" min="0"
                    onChange={handleChange}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    value={quant || ""}>
                </input>
                {hover == "quant" ? <div className="hover">{quant}</div> : null}
            </div>
            <div className="cell">    
                <div className="cat"
                    onInput={handleChange}
                    onClick={handleCategoriesClick}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}>
                    {cat}
                </div>
                {expandCategories ? <CategoryDropdown categoryChange={categoryChange}></CategoryDropdown> : null}
                {hover == "cat" ? <div className="hover">{cat}</div> : null}
            </div>
            <div>
                <div className="buttons">
                    <button className="save" disabled={disabled} onClick={updateItem}>save</button>
                    <button className="reset" disabled={disabled} onClick={refreshValues}>reset</button>
                    <button className="del" onClick={deleteItem}>del</button>
                </div>
            </div>
        </>
    );
}

export default Item;
