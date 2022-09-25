import { useEffect, useState } from 'react';

function FilterDropdown(props) {
    
    const [categories, setCategories] = useState([])

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

    function handleCatClick(e){
        props.categoryChange(e.target.getAttribute("data-key"), e.target.textContent)
    }

    function handleNoneClick(e){
        props.categoryChange(null, null);
    }

    useEffect(() => {
        getCategories();
    },[])

    if (!props) {
        return null;
    }

    return (
        <div className="filter-dropdown">
            <div className="option" onClick={handleNoneClick}>None</div>
            {categories.map(e => <div className="option" onClick={handleCatClick} key={e.category_id} data-key={e.category_id}>{e.name}</div>)}
        </div>
    );
}

export default FilterDropdown;
