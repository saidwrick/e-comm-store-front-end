import { useEffect, useState } from 'react';
import Item from './Item.js';
import NewItem from './NewItem.js';
import CategoryMod from './CategoryMod.js';
import FilterDropdown from './FilterDropdown.js';
import SortDropdown from './SortDropdown.js';

function Inventory() {

    const [inventory, setInventory] = useState([]);
    const [expandCategory, setExpandCategory] = useState(false);
    const [search, setSearch] = useState("");
    const [expandFilter, setExpandFilter] = useState(false);
    const [catFilter, setCatFilter] = useState(null);
    const [catIdFilter, setCatIdFilter] = useState(null);
    const [expandSort, setExpandSort] = useState(false);
    const [sortName, setSortName] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [offset, setOffset] = useState(null);
    
    function handleFilterClick(e){
        e.stopPropagation();
        // to close filter menu if click outside
        if (!expandFilter){
            function closeFilter (e) {
                e.stopPropagation();
                setExpandFilter(false);
                document.removeEventListener("click", closeFilter);
            }
            document.addEventListener("click", closeFilter);
        }
        setExpandFilter(!expandFilter);
    }

    function categoryChange(id, name){
        setCatIdFilter(id);
        setCatFilter(name);
        setExpandFilter(false);
    }

    function handleSortClick(e){
        e.stopPropagation();
        // to close sort menu if click outside
        if (!expandSort){
            function closeSort (e) {
                e.stopPropagation();
                setExpandSort(false);
                document.removeEventListener("click", closeSort);
            }
            document.addEventListener("click", closeSort);
        }
        setExpandSort(!expandSort);
    }

    function sortChange(type, name){
        setSortName(name);
        setSortType(type);
        setExpandSort(false);
    }

    async function getInventory(){
        console.log(sortType)
        const headers = new Headers();
        headers.append('Content-type', 'application/json');
        if (offset){
            headers.append('offset', offset);
        }
        if (catIdFilter){
            headers.append('category', catIdFilter);
        }
        if (search && search!= ""){
            headers.append('search', search);
        }
        if (sortType){
            headers.append('order', sortType);
        }

        try {
            let res = await fetch("/inventory", {
                method: "GET",
                headers: headers
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setInventory(resJson);
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
        getInventory();

    },[])

    useEffect(() => {
        getInventory();
    },[sortName, catFilter, offset])

    //auto search after delay
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            getInventory();
        }, 300)
    
        return () => clearTimeout(delayDebounceFn)

    }, [search]);

    return (
        <div className="inventory-container">
            <div className="search-bar">
                <div className="search">
                    <input placeholder="Search inventory" value={search} 
                        onChange={e=>setSearch(e.target.value)}>
                    </input>
                </div>
                <button onClick={handleFilterClick}>{catFilter ? catFilter : "Filter"}</button>
                <button onClick={handleSortClick}>{sortName ? sortName : "Sort"}</button>
                {expandFilter ? <FilterDropdown categoryChange={categoryChange}></FilterDropdown> : null}
                {expandSort ? <SortDropdown sortChange={sortChange}></SortDropdown> : null}
            </div>
            <div className="inventory">
                <div className="header">Image</div>
                <div className="header">Name</div>
                <div className="header">Price ($)</div>
                <div className="header">Description</div>
                <div className="header">Qt</div>
                <div className="header cat">Category
                    <button onClick={e=>setExpandCategory(true)}>edit</button>
                </div>
                {expandCategory ? <CategoryMod getInventory={getInventory} setExpandCat={setExpandCategory}></CategoryMod> : null} 
                <div className="header"></div>
                {inventory.map(e => <Item key={e.item_id} item={e} getInventory={getInventory}></Item>)}
            </div>
            <div className="new-item-header">Add New Item</div>
            <NewItem getInventory={getInventory}></NewItem>
        </div>

    );
}

export default Inventory;
