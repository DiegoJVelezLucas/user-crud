const ListUsers = ({ userList, deleteUser, selectUser }) => {
  return (
    <div>
    <h1 >Usuarios Registrados </h1>
    <div className="list-style">
      
      {userList?.map((user) => (
        <div className="content-style" key={user.id}>
            <h3>{user.first_name} {user.last_name}</h3>
            <h4>User Email:</h4>
						<p>{user.email}</p>
						<h4>User Birthday: </h4>
            <p>{user.birthday}</p>
						<button onClick={() => selectUser(user.id)}>Edit 📝</button>         
						<button onClick={() => deleteUser(user.id)}>Delete ❌</button>         
          </div>
        ))}
      </div>
        </div>
  );
};

export default ListUsers;
