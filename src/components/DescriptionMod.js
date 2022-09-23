import { useEffect, useState } from 'react';

function DescriptionMod(props) {

    const [text, setText] = useState("");

    function handleSubmit(){
        props.descChange(text)
        props.expandDesc(false)
    }
    
    useEffect(() => {
        if (props.desc){
            setText(props.desc)
        }
    },[props])

    if (!props){
        return null;
    }

    return (
        <div className="module" onClick={e=>props.expandDesc(false)}>
            <div onClick={e=>e.stopPropagation()} className="desc-mod">
                <h1>Edit Description</h1>
                <textarea  onChange={e=>setText(e.target.value)} value={text}></textarea>
                <div className="buttons">
                    <button onClick={handleSubmit}>ok</button>
                    <button onClick={e=>props.expandDesc(false)}>cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DescriptionMod;
