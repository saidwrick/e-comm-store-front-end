import { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function ImageMod(props) {

    const [selectedFile, setSelectedFile] = useState("");
    const [prevImg, setPrevImg] = useState("");

    async function uploadImg(){

        if (selectedFile == ""){
            props.toggleImg();
            return
        }
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        data.append("cloud_name", "dzflnyjtm")

        try {
            let res = await fetch("https://api.cloudinary.com/v1_1/dzflnyjtm/image/upload", {
                method: "POST",
                body: data
            });
            let resJson = await res.json();
            console.log("img uploaded");
            props.setImgUrl(resJson.public_id);
            props.toggleImg();
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

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = null;
    },[])

    if (!props){
        return null;
    }

    return (
        <div className="modal" onMouseDown={props.toggleImg}>
            <div onMouseDown={e=>e.stopPropagation()} className="img-mod">
                <div className="modal-header">
                    <button className="close" onClick={props.toggleImg}><CloseIcon/></button>
                    <h1>Upload Image</h1>
                </div>
                <div className="img-preview">
                    <img src={prevImg ? prevImg : null}></img>
                </div>
                <input id="file" type="file" onChange={handleSelectedFile}></input>
                <div className="buttons">
                    <button onClick={uploadImg}>ok</button>
                    <button onClick={props.toggleImg}>cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ImageMod;
