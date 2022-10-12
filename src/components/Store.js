import { useEffect, useState, useRef } from 'react';
import StoreCard from './StoreCard.js';
import SortDropdown from './SortDropdown.js';
import { ReactComponent as SearchIcon} from '../icons/search.svg'
import { ReactComponent as SortIcon} from '../icons/sort.svg'

function Store(props) {
    
    const [inventory, setInventory] = useState([]);
    const [invCount, setInvCount] = useState(null);
    const [expandCart, setExpandCart] = useState(false);
    const [search, setSearch] = useState("");
    const [catFilter, setCatFilter] = useState(null);
    const [catIdFilter, setCatIdFilter] = useState(null);
    const [expandSort, setExpandSort] = useState(false);
    const [sortName, setSortName] = useState(null);
    const [sortType, setSortType] = useState(null);
    const [offset, setOffset] = useState(0);
    const [categories, setCategories] = useState();

    async function getInventory(){
        let params = []
        if (offset != 0){
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
                setInvCount(resJson.count);
                if (offset != 0){
                    let inv = [...inventory];
                    setInventory(inv.concat(resJson.inventory));
                }
                else {
                    setInventory(resJson.inventory);
                }
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

    function changeCategory(e){
        setCatIdFilter(e.target.getAttribute("data-key"));
        setCatFilter(e.target.textContent);
    }

    function resetCategory(e){
        setCatIdFilter(null);
        setCatFilter(null);
    }

    // auto load more products
    const productsEndRef = useRef();

    function handleScroll () {
        if (productsEndRef.current){
            if (productsEndRef.current.offsetTop + productsEndRef.current.offsetHeight < window.scrollY + window.innerHeight) {
                addMoreProducts();
            }
        }
    }

    function addMoreProducts (){
        if (invCount >= offset + 10){
            setOffset(offset + 10);
        }
    }

    function handleSortClick(e){
        e.stopPropagation();
        // to close sort menu if click outside
        if (!expandSort){
            setExpandSort(false);
            function closeSort (e) {
                e.stopPropagation();
                setExpandSort(false);
                document.removeEventListener("click", closeSort);
            }
            document.addEventListener("click", closeSort);
        }
        setExpandSort(!expandSort);
    }

    function sortChange (type, name){
        setSortType(type);
        setSortName(name);
        setExpandSort(false);
    }

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    });

    useEffect(() => {
        getInventory();
        getCategories();
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

    if (!props) {
        return null;
    }

    return (
        <div className="store">
            <div className="left-menu">
                <div className="current-page">
                    {catFilter ? catFilter + ` (${invCount})` : `All Products (${invCount})`}
                </div>
                <div className="store-categories">
                    <div className="store-category" onClick={resetCategory}>All Products</div>
                    {categories ? 
                        categories.map(e=><div className="store-category" 
                        key={e.category_id} 
                        data-key={e.category_id}
                        onClick={changeCategory}>{e.name}</div>)
                    : null}
                </div>

            </div>
            <div className="main">
                <div className="products-wrapper">
                    <div className="search-bar">    
                        <div className="search">
                            <SearchIcon/>
                            <input placeholder="Search inventory" value={search} 
                                onChange={e=>setSearch(e.target.value)}>
                            </input>
                        </div>
                        <div className="sort">
                            <button onClick={handleSortClick}>
                                <SortIcon/>
                                <div className="button-text">
                                    {sortName ? `${sortName}` : "Sort By "}
                                </div>
                            </button>
                            {expandSort ? <SortDropdown sortChange={sortChange}></SortDropdown> : null}
                        </div>
                    </div>
                    <div className="products" ref={productsEndRef}>
                        {inventory.length > 0 ?
                            inventory.map(e=> <StoreCard key={e.item_id} item={e}></StoreCard>)
                        : <div className="no-items">No Items Available</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Store;
