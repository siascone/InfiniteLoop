import { useState } from "react";

function Form ({setNewUserPhoto}) {
    const [username, setUsername] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleInput = e => {
        setUsername(e.currentTarget.value)
    }

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0]
        setPhotoFile(file);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        // TODO
        const formData = new FormData();
        formData.append('username', username)
        if (photoFile) {
            formData.append('photo', photoFile)
        }

        const res = await fetch('/api/users', {
            method: 'PATCH',
            body: formData
        });

        if (res.ok) {
            const user = await res.json();
            setUsername('')
            setPhotoFile(null)
            setNewUserPhoto(user)
        }

    }

    return (
        <form>
            <label>New Username
                <input 
                    type="text" 
                    value={username}
                    onChange={handleInput}
                    required
                />
            </label>
            <br/>
            <input type="file" onChange={handleFile}/>
            <br/>
            <button >Update User Details</button>
        </form>
    )
}

export default Form;