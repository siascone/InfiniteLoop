function UsersIndex ({users}) {
    return (
        <ul>
            {users.map(user => {
                let photo;
                if (user.photoUrl) {
                    photo = <img src={user.photoUrl} style={{ height: '100px', width: '100px' }} />
                }

                return (
                    <li key={user.id}>
                        <h2>{user.username}</h2>
                        {photo}
                    </li>
                )
            })}
        </ul>
    )
}

export default UsersIndex;