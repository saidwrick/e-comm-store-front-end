import { useEffect, useState } from 'react';

function SortDropdown(props) {
    
    const [sorts, setSorts] = useState([            
        ["Price - Low to High", "priceAsc"], 
        ["Price - High to Low", "priceDesc"],
        ["Name", "alphaAsc"],
        ["Newest First", "dateDesc"],
        ["Oldest First", "dateAsc"]
    ])

    function handleSortClick(e){
        props.sortChange(e.target.getAttribute("data-type"), e.target.textContent)
    }

    function handleNoneClick(e){
        props.sortChange(null, null);
    }

    if (!props) {
        return null;
    }

    return (
        <div className="sort-dropdown">
            <div className="option" onClick={handleNoneClick}>None</div>
            {sorts.map((e, i) => <div className="option" onClick={handleSortClick} key={i} data-type={e[1]}>{e[0]}</div>)}
        </div>
    );
}

export default SortDropdown;
