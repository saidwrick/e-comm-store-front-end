import { useEffect, useState } from 'react';
import { ReactComponent as DeleteIcon} from '../icons/delete.svg'
import { ReactComponent as CheckIcon} from '../icons/check.svg'

function CategoryModItem(props) {
    
    const [name, setName] = useState("");
    const [saveEnabled, setSaveEnabled] = useState(false);

    const api = process.env.REACT_APP_API_URL

    function handleInput (e){
        setName(e.target.value);
        setSaveEnabled(true);
    }

    async function handleSave(e){
        try {
            let res = await fetch(api + `/categories/${props.item.category_id}`, {
                method: "PUT",
                headers:{
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name
                })
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                props.getInventory();
                props.getCategories();
                setSaveEnabled(false);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                props.handleError(resJson)
            }
        } 
        catch (err) {
            console.log(err);
            props.handleError(err)
        }
    }

    async function handleDel(e){
        try {
            let res = await fetch(api + `/categories/${props.item.category_id}`, {
                method: "DELETE",
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                props.getCategories();
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                props.handleError(resJson)
            }
        } 
        catch (err) {
            console.log(err);
            props.handleError(err)
        }
    }

    useEffect(() => {
        setName(props.item.name)
    },[])

    if (!props) {
        return null;
    }

    return (
        <div className="cat-item">
            <input value={name} onChange={handleInput}></input>
            <button onClick={handleSave} className="save" disabled={!saveEnabled}><CheckIcon/></button>
            <button onClick={handleDel} className="del"><DeleteIcon/></button>
        </div>
    );
}

export default CategoryModItem;
