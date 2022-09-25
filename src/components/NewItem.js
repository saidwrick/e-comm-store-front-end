import { useEffect, useState } from 'react';
import DescriptionMod from './DescriptionMod';
import CategoryDropdown from './CategoryDropdown';
import ImageMod from './ImageMod';

function NewItem(props) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [quant, setQuant] = useState("");
    const [catId, setCatId] = useState("");
    const [cat, setCat] = useState("");
    const [hover, setHover] = useState(null);
    const [expandDesc, setExpandDesc] = useState(false);
    const [expandImg, setExpandImg] = useState(false);

    function refreshValues(){
        setName("");
        setPrice("");
        setImgUrl("");
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
                    "imgUrl" : imgUrl, 
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
                setEnableSave(false);
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

    const [enableSave, setEnableSave] = useState(false);

    useEffect(() => {
        if (name != "" & price != "" && imgUrl != "" && desc != "" & quant != "" & catId != "" & cat != ""){
            setEnableSave(true);
        }
        else {
            setEnableSave(false);
        }
    })

    return (
        <div className = "new-item">
            <div className="cell">
                    <div className="image" 
                        onClick={e=>setExpandImg(true)}>
                        {imgUrl? 
                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_50,w_50/"+imgUrl}></img> : "upload icon"}
                    </div>
                    {expandImg ? <ImageMod setExpandImg={setExpandImg} setImgUrl={setImgUrl} imgUrl={imgUrl}></ImageMod> : null}
            </div>
            <div className="cell">
                <div className="cell-text">
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
            </div>
            <div className="cell">
                <div className="cell-text">
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
            </div>
            <div className="cell">
                <div className="cell-text">
                    <input className="desc" 
                        onClick={e=>setExpandDesc(true)}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        placeholder="Description"
                        value={desc}>
                    </input>
                    {hover == "desc" ? <div className="hover">{desc}</div> : null}
                </div>
                {expandDesc ? <DescriptionMod descChange={descChange} setExpandDesc={setExpandDesc} desc={desc}></DescriptionMod> : null}
            </div>
            <div className="cell">
                <div className="cell-text">
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
            </div>
            <div className="cell">    
                <div className="cell-text">
                    <input className="cat"
                        onClick={handleCategoriesClick}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        placeholder="Category"
                        value={cat}>
                    </input>
                    {hover == "cat" ? <div className="hover">{cat}</div> : null}
                </div>
                {expandCategories ? <CategoryDropdown categoryChange={categoryChange}></CategoryDropdown> : null}
            </div>
            <div className="cell">
                <div className="buttons">
                    <button onClick={addItem} disabled={!enableSave}>Add</button>
                    <button onClick={refreshValues}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default NewItem;
