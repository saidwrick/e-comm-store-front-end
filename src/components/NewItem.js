import { useEffect, useState } from 'react';
import DescriptionMod from './DescriptionMod';
import CategoryDropdown from './CategoryDropdown';

function NewItem(props) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [photo, setPhoto] = useState("");
    const [desc, setDesc] = useState("");
    const [quant, setQuant] = useState("");
    const [catId, setCatId] = useState("");
    const [cat, setCat] = useState("");
    const [hover, setHover] = useState(null);
    const [expandDesc, setExpandDesc] = useState(false);

    function refreshValues(){
        setName("");
        setPrice("");
        setPhoto("");
        setDesc("");
        setQuant("");
        setCatId(1);
        setCat("");
    }
    function descChange(text){
        setDesc(text);
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
    }

    function mouseEnter(e){
        if (e.target.value || e.target.innerText){
            setHover(e.target.className)
        }
    }

    function mouseLeave(e){
        setHover(null)
    }

    async function addItem(){
        try {
            let res = await fetch("/inventory", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "name" : name,
                    "price" : price, 
                    "photo" : photo, 
                    "desc" : desc, 
                    "quant" : quant, 
                    "catId" : catId
                })
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                refreshValues();
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

    return (
        <div className = "new-item">
            <div className="id"></div>
            <div className="cell">
                <input className="name" 
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    placeholder="Name"
                    value={name || ""}>
                </input>
                {hover == "name" ? <div className="hover">{name}</div> : null}
            </div>
            <div className="cell">
                <input className="price" 
                    type="number" min="0"
                    onChange={(e)=>setPrice(e.target.value)}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    placeholder="Price"
                    value={price || ""}>
                </input>
                {hover == "price" ? <div className="hover">{price}</div> : null}
            </div>
            <div className="cell">
                <input className="photo" 
                    onChange={(e)=>setPhoto(e.target.value)}
                    placeholder="Photo"
                    value={photo || ""}>
                </input>
            </div>
            <div className="cell">
                <input className="desc" 
                    onClick={e=>setExpandDesc(true)}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    placeholder="Description"
                    value={desc}>
                    
                </input>
                {hover == "desc" ? <div className="hover">{desc}</div> : null}
                {expandDesc ? <DescriptionMod descChange={descChange} expandDesc={setExpandDesc} desc={desc}></DescriptionMod> : null}
            </div>
            <div className="cell">
                <input className="quant" 
                    type="number" min="0"
                    onChange={(e)=>setQuant(e.target.value)}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    placeholder="Qt"
                    value={quant || ""}>
                </input>
                {hover == "quant" ? <div className="hover">{quant}</div> : null}
            </div>
            <div className="cell">    
                <input className="cat"
                    onClick={handleCategoriesClick}
                    onMouseEnter={mouseEnter}
                    onMouseLeave={mouseLeave}
                    placeholder="Category"
                    value={cat}>
                </input>
                {expandCategories ? <CategoryDropdown categoryChange={categoryChange}></CategoryDropdown> : null}
                {hover == "cat" ? <div className="hover">{cat}</div> : null}
            </div>
            <div>
                <div className="buttons">
                    <button onClick={addItem}>Add</button>
                    <button onClick={refreshValues}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default NewItem;
