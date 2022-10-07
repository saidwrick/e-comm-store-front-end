import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function ImageMod(props) {

    const [selectedFile, setSelectedFile] = useState("");
    const [prevImg, setPrevImg] = useState("");

    function handleSubmit(){
    }

    async function uploadImg(){
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "qnxs59uo");
        data.append("cloud_name", "dzflnyjtm")

        try {
            let res = await fetch("https://api.cloudinary.com/v1_1/dzflnyjtm/image/upload", {
                method: "POST",
                body: data
            });
            let resJson = await res.json();
            console.log("img uploaded");
            props.setImgUrl(resJson.public_id);
            props.setExpandImg(false);
        }
        catch (err){
            console.log(err);
        }
    }

    function handleSelectedFile(e){
        setSelectedFile(e.target.files[0]);
        setPrevImg(URL.createObjectURL(e.target.files[0]));
    }
    
    useEffect(() => {
        if (props.imgUrl && props.imgUrl!=""){
            setPrevImg("https://res.cloudinary.com/dzflnyjtm/image/upload/w_300,q_auto/"+props.imgUrl)
        }
    },[props])

    if (!props){
        return null;
    }

    return (
        <div className="modal" onClick={e=>props.setExpandImg(false)}>
            <div onClick={e=>e.stopPropagation()} className="img-mod">
                <div className="modal-header">
                <h1>Upload Image</h1>
                    <button className="close" onClick={e=>props.setExpandImg(false)}><CloseIcon/></button>
                </div>
                <div className="img-preview">
                    <img src={prevImg ? prevImg : null}></img>
                </div>
                <input id="file" type="file" onChange={handleSelectedFile}></input>
                <div className="buttons">
                    <button onClick={uploadImg}>ok</button>
                    <button onClick={e=>props.setExpandImg(false)}>cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ImageMod;
