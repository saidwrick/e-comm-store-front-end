import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon} from '../icons/close.svg'

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
                <div className="modal-header">
                    <h1>Edit Description</h1>
                    <button className="close" onClick={e=>props.setExpandDesc(false)}><CloseIcon/></button>
                </div>
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
