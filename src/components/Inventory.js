import { useEffect, useState } from 'react';
import Item from './Item.js';
import NewItem from './NewItem.js';
import CategoryMod from './CategoryMod.js';
import FilterDropdown from './FilterDropdown.js';
import SortDropdown from './SortDropdown.js';
import { ReactComponent as SearchIcon} from '../icons/search.svg'
import { ReactComponent as FilterIcon} from '../icons/filter.svg'
import { ReactComponent as SortIcon} from '../icons/sort.svg'
import { ReactComponent as EditIcon} from '../icons/edit.svg'

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
    const [offset, setOffset] = useState(0);
    const [invCount, setInvCount] = useState(0);
    
    function handleFilterClick(e){
        e.stopPropagation();
        // to close filter menu if click outside
        if (!expandFilter){
            setExpandSort(false);
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
            setExpandFilter(false);
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

        let params = []
        if (offset){
            params.push("offset=" + offset);
        }
        if (catIdFilter){
            params.push("category=" + catIdFilter);
        }
        if (search && search!= ""){
            params.push("search=" + search);
        }
        if (sortType){
            params.push("order=" + sortType);
        }

        let joinedParams = params.join("&");

        try {
            let res = await fetch("/inventory?" + joinedParams, {
                method: "GET",
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setInventory(resJson.inventory);
                setInvCount(resJson.count);
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

    function nextPage(){
        if (invCount > offset+10){
            setOffset(offset+10);
        }
    }

    function prevPage(){
        if (offset-10 >= 0){
            setOffset(offset-10)
        }
        else if (offset > 0){
            setOffset(0);
        }
    }

    function categoryToggle(){
        if (expandCategory){
            document.body.style.overflow = null;
        }
        else{
            document.body.style.overflow = "hidden";
        }
        setExpandCategory(!expandCategory)
    }

    useEffect(() => {
        getInventory();

    },[])

    // if changing category/ sort need to reset offset to 0 otherwise get inventory
    useEffect(() => {
        if (offset != 0){
            setOffset(0);
        }
        else {
            getInventory();
        }
    },[sortName, catFilter])

    useEffect(() => {
        getInventory();
    },[offset])

    //auto search after delay
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (offset != 0){
                setOffset(0);
            }
            else {
                getInventory();
            }
        }, 300)
    
        return () => clearTimeout(delayDebounceFn)

    }, [search]);

    return (
        <div className="inventory-container">
            <h1> Inventory</h1>
            <div className="search-bar">
                <div className="search">
                    <SearchIcon className="search-icon"/>
                    <input placeholder="Search inventory" value={search} 
                        onChange={e=>setSearch(e.target.value)}>
                    </input>
                </div>
                
                <button onClick={handleFilterClick}>
                        <FilterIcon className="filter-icon"/>
                        <div className="search-bar-button-text">
                            {catFilter ? catFilter : "Filter"}
                        </div>
                </button>
                <button onClick={handleSortClick}>
                    <SortIcon className="sort-icon"/>
                    <div className="search-bar-button-text">
                        {sortName ? sortName : "Sort"}
                    </div>
                </button>
                {expandFilter ? <FilterDropdown categoryChange={categoryChange}></FilterDropdown> : null}
                {expandSort ? <SortDropdown sortChange={sortChange}></SortDropdown> : null}
            </div>
            <div className="inventory">
                <div className="inv-header">Image</div>
                <div className="inv-header">Name</div>
                <div className="inv-header">Price ($)</div>
                <div className="inv-header">Description</div>
                <div className="inv-header">Qt</div>
                <div className="inv-header">
                    <div className="cat">
                        Category
                        <button onClick={categoryToggle} className="category-edit"><EditIcon/></button>
                    </div>
                </div>
                {expandCategory ? <CategoryMod getInventory={getInventory} categoryToggle={categoryToggle}></CategoryMod> : null} 
                <div className="header"></div>
                {inventory.map(e => <Item key={e.item_id} item={e} getInventory={getInventory}></Item>)}
            </div>
            {inventory.length > 0 ? 
                <div className="page-buttons">
                    <button onClick={prevPage} disabled={offset==0}>{'<'}</button>
                    <button onClick={nextPage} disabled={invCount <= offset+10}>{'>'}</button>
                </div>
                : null}
            {inventory.length == 0 ? <div className="no-items">No Items</div> : null}
            <div className="new-item-header">Add New Item</div>
            <NewItem getInventory={getInventory}></NewItem>
        </div>
    );
}

export default Inventory;
