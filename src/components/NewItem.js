import { useEffect, useState } from 'react';
import DescriptionMod from './DescriptionMod';
import CategoryDropdown from './CategoryDropdown';
import ImageMod from './ImageMod';
import { ReactComponent as PlusIcon} from '../icons/plus.svg'
import { ReactComponent as RefreshIcon} from '../icons/refresh.svg'
import { ReactComponent as ImgIcon} from '../icons/new-img.svg'

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
    const [expandCategories, setExpandCategories] = useState(false);
    const [enableSave, setEnableSave] = useState(false);
    const [enableRefresh, setEnableRefresh] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [expandError, setExpandError] = useState(false);

    function refreshValues(){
        setName("");
        setPrice("");
        setImgUrl("");
        setDesc("");
        setQuant("");
        setCatId("");
        setCat("");
        setEnableRefresh(false);
    }
    function descChange(text){
        setDesc(text);
    }

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
                setExpandError(false);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                setExpandError(true);
                setErrorMsg(resJson);
            }
        } 
        catch (err) {
            console.log(err);
            setExpandError(true);
            setErrorMsg(err);
        }
    }

    function toggleImg(){
        if (expandImg){
            document.body.style.overflow = null;
        }
        else{
            document.body.style.overflow = "hidden";
        }
        setExpandImg(!expandImg)
    }

    function toggleDesc(){
        if (expandDesc){
            document.body.style.overflow = null;
        }
        else{
            document.body.style.overflow = "hidden";
        }
        setExpandDesc(!expandDesc)
    }

    useEffect(() => {
        if (name != "" & price != "" && imgUrl != "" && desc != "" & quant != "" & catId != "" & cat != ""){
            setEnableSave(true);
        }
        else {
            setEnableSave(false);
        }

        if (name != "" || price != "" || imgUrl != "" || desc != "" || quant != "" || catId != "" || cat != ""){
            setEnableRefresh(true);
        }
    })

    useEffect(() => {
        if (expandError){
            setTimeout(()=>{
                setExpandError(false);
            }, 3000)
        };
    },[expandError])

    return (
        <div className = "new-item">
            <div className="cell">
                    <div className="image" 
                        onClick={toggleImg}>
                        {imgUrl? 
                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_50,w_50/"+imgUrl}></img> : <ImgIcon/>}
                    </div>
                    {expandImg ? <ImageMod toggleImg={toggleImg} setImgUrl={setImgUrl} imgUrl={imgUrl}></ImageMod> : null}
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
                        onClick={toggleDesc}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        placeholder="Description"
                        value={desc}>
                    </input>
                    {hover == "desc" ? <div className="hover">{desc}</div> : null}
                </div>
                {expandDesc ? <DescriptionMod descChange={descChange} toggleDesc={toggleDesc} desc={desc}></DescriptionMod> : null}
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
                    {expandError?
                        <div className="error">{errorMsg}</div>
                    :null}
                    <button className="reset" onClick={refreshValues} disabled={!enableRefresh}><RefreshIcon/></button>
                    <button className="add" onClick={addItem} disabled={!enableSave}><PlusIcon/></button>
                </div>
            </div>
        </div>
    );
}

export default NewItem;
