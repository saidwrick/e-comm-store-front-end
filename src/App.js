import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './redux/todoSlice';
import Inventory from './components/Inventory.js';
import Store from './components/Store.js';

function App() {

    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const onSubmit = (e) => {
        e.preventDefault();
        if (value) {
            dispatch(addTodo({
                title: value,
            }));
        }
    }

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
            <Store></Store>
        </div>
    );
}

export default App;
