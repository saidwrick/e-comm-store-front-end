import { useEffect, useState } from 'react';

function DescriptionMod(props) {

    const [text, setText] = useState("");

    function handleSubmit(){
        props.descChange(text)
        props.setExpandDesc(false)
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
        <div className="modal" onClick={e=>props.setExpandDesc(false)}>
            <div onClick={e=>e.stopPropagation()} className="desc-mod">
                <h1>Edit Description</h1>
                <textarea  onChange={e=>setText(e.target.value)} value={text}></textarea>
                <div className="buttons">
                    <button onClick={handleSubmit}>ok</button>
                    <button onClick={e=>props.setExpandDesc(false)}>cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DescriptionMod;
