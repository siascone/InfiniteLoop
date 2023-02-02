import { useState } from "react";
import { csrfFetch } from '../../store/csrf'

function Form ({userId}) {
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0]
        setPhotoFile(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result)
        }
        else setPhotoUrl(null)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // TODO
        const formData = new FormData();
        if (photoFile) {
            formData.append('user[photo]', photoFile)
        }

        const res = await csrfFetch(`/api/users/${userId}`, {
            method: 'PATCH',
            body: formData
        });

        if (res.ok) {
            const user = await res.json();
            setPhotoFile(null)
        }

    }

    let preview = null;

    if (photoUrl) preview = <img src={photoUrl} style={{height: '100px', width: '100px'}}/>

    return (
        <form onSubmit={handleSubmit}>
            <br/>
            <h3>Image Preview</h3>
            {preview}
            <input type="file" onChange={handleFile}/>
            <br/>
            <button >Upload User Photo</button>
        </form>
    )
}

export default Form;