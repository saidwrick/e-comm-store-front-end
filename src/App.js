import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './redux/todoSlice';
import Item from './components/Item.js'
import NewItem from './components/NewItem.js'

function App() {

    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const [inventory, setInventory] = useState([]);

    async function getInventory(){
        try {
            let res = await fetch("/inventory", {
                method: "GET",
                headers: {
                    "type" : "general"
                },
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

    const onSubmit = (e) => {
        e.preventDefault();
        if (value) {
            dispatch(addTodo({
                title: value,
            }));
        }
    }

    useEffect(() => {
        getInventory();

    },[])

    return (
        <div className="App">
            <div>
                {JSON.stringify(todos)}
            </div>

            <form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
                <label className='sr-only'>Name</label>
                <input
                    type='text'
                    className='form-control mb-2 mr-sm-2'
                    placeholder='Add todo...'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}>
                        
                </input>

                <button type='submit' className='btn btn-primary mb-2'>
                    Submit
                </button>
		    </form>
            <div className = "inventory">
                <div className="header">ID</div>
                <div className="header">Name</div>
                <div className="header">Price ($)</div>
                <div className="header">Photo</div>
                <div className="header">Description</div>
                <div className="header">Qt</div>
                <div className="header">Category</div> 
                <div className="header"></div>
                {inventory.map(e => <Item key={e.item_id} item={e} getInventory={getInventory}></Item>)}
            </div>
            <NewItem getInventory={getInventory}></NewItem>
        </div>
    );
}

export default App;
