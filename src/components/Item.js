import { useEffect, useState } from 'react';
import CategoryDropdown from './CategoryDropdown.js';
import DescriptionMod from './DescriptionMod.js';
import ImageMod from './ImageMod.js';

function Item(props) {

//item_id | name   | price | image      | description              | quantity | category_id

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [imgUrl, setImgUrl] = useState();
    const [desc, setDesc] = useState();
    const [quant, setQuant] = useState();
    const [catId, setCatId] = useState();
    const [cat, setCat] = useState();
    const [disabled, setDisabled] = useState(true);
    const [expandDesc, setExpandDesc] = useState(false);
    const [expandImg, setExpandImg] = useState(false);

    function refreshValues(){
        setName(props.item.name);
        setPrice(props.item.price);
        setImgUrl(props.item.image);
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
            case "image":
                setImgUrl(e.target.value);
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

    function descChange(text){
        setDesc(text);
        setDisabled(false);
    }

    function imgUrlChange(img){
        setImgUrl(img);
        setDisabled(false);
    }

    async function updateItem(){
        try {
            let res = await fetch(`/inventory/${props.item.item_id}`, {
                method: "PUT",
                headers: {
                    "type" : "details",
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name, 
                    "price": price, 
                    "image": imgUrl,
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
        if (e.target.value || e.target.innerText){
            setHover(e.target.className)
        }
    }

    function mouseLeave(e){
        setHover(null)
    }

    useEffect(() => {
        refreshValues();
    },[props])

    if (!props.item){
        return null
    }

    return (
        <>
            <div className="cell">
                <div className="image" 
                    onClick={e=>setExpandImg(true)}>
                    {imgUrl? 
                    <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_50,w_50/"+imgUrl}></img> : null}
                </div>
                {expandImg ? <ImageMod setExpandImg={setExpandImg} setImgUrl={imgUrlChange} imgUrl={imgUrl}></ImageMod> : null}
            </div>
            <div className="cell">
                <div className="cell-text">
                    <input className="name" 
                        type="text"
                        onChange={handleChange}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        value={name || ""}>
                    </input>
                    {hover == "name" ? <div className="hover">{name}</div> : null}
                </div>
            </div>
            <div className="cell">
                <div className="cell-text">
                    <input className="price" 
                        type="number" min="0"
                        onChange={handleChange}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        value={price || ""}>
                    </input>
                    {hover == "price" ? <div className="hover">{price}</div> : null}
                </div>
            </div>
            <div className="cell">
                <div className="cell-text">
                    <div className="desc" 
                        onClick={e=>setExpandDesc(true)}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}>
                        {desc}
                    </div>
                    {hover == "desc" ? <div className="hover">{desc}</div> : null}
                </div>
                {expandDesc ? <DescriptionMod descChange={descChange} setExpandDesc={setExpandDesc} desc={desc}></DescriptionMod> : null}
            </div>
            <div className="cell">
                <div className="cell-text">
                    <input className="quant" 
                        type="number" min="0"
                        onChange={handleChange}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        value={quant || ""}>
                    </input>
                    {hover == "quant" ? <div className="hover">{quant}</div> : null}
                </div>
            </div>
            <div className="cell">
                <div className="cell-text">    
                    <div className="cat"
                        onInput={handleChange}
                        onClick={handleCategoriesClick}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}>
                        {cat}
                    </div>
                    {hover == "cat" ? <div className="hover">{cat}</div> : null}
                </div>
                {expandCategories ? <CategoryDropdown categoryChange={categoryChange}></CategoryDropdown> : null}
            </div>
            <div className="cell">
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
