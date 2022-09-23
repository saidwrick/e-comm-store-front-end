import { useEffect, useState } from 'react';

function CategoryModItem(props) {
    
    const [name, setName] = useState("");
    const [saveEnabled, setSaveEnabled] = useState(false);

    function handleInput (e){
        setName(e.target.value);
        setSaveEnabled(true);
    }

    async function handleSave(e){
        try {
            let res = await fetch(`/categories/${props.item.category_id}`, {
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
                //navigate 404
            }
        } 
        catch (err) {
            console.log(err);
            // navigate("/404", { state: {err: err}});
        }
    }

    async function handleDel(e){
        try {
            let res = await fetch(`/categories/${props.item.category_id}`, {
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
                //navigate 404
            }
        } 
        catch (err) {
            console.log(err);
            // navigate("/404", { state: {err: err}});
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
            <button onClick={handleSave} disabled={!saveEnabled}>save</button>
            <button onClick={handleDel}>del</button>
        </div>
    );
}

export default CategoryModItem;
