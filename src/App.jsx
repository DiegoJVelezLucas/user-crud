import { useState, useEffect } from "react";
import "./App.css";
import ListUsers from "./components/ListUsers";
import UsersForm from "./components/UsersForm";
import axios from "axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function App() {
  const [userList, setUserList] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const MySwal = withReactContent(Swal)
  //get user  
  const getUsers = () => {
    axios
      .get("https://users-crud.academlo.tech/users/")
      .then((resp) => setUserList(resp.data))
      .catch((error) => console.error(error));
  };
  // get user whit useEffect
  useEffect(() => {
    getUsers();

  },[]);

  //post --> create user

  const addUsernw = async (user) => {
    try {
      const resp = await axios.post("https://users-crud.academlo.tech/users/", user)
      .then(() => {
        getUsers();
        setUserSelected(null);
        MySwal.fire({
          position: 'top-center',
          icon: 'success',
          title: 'Usuario creado con exito',
          showConfirmButton: false,
          timer: 1500
        })
      })
      
    } catch (error) {
      console.error(error);
    }
    
  };

  //Delete user
      const deleteUserId = (idUser) =>{
        MySwal.fire({
          title: 'Estas seguro de eliminar?',
          text: "Esta accion eliminara el registro de usuario",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, deseo eliminarlo'
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .delete(`https://users-crud.academlo.tech/users/${idUser}/`)
            .then(() => getUsers())
            .catch((error) => console.error(error));
            MySwal.fire(
              'Eliminado!',
              'El usuarios registrado fue eliminado',
              'success'
            )
          }
        })
        
      }  

      //selecting an user by identifier
      const selectUserId = (idUser) =>{
        axios
            .get(`https://users-crud.academlo.tech/users/${idUser}/`)
            .then((resp) => setUserSelected(resp.data))
            .catch((error) => console.error(error));
      };
  const editUserId = async userEdit => {
    try {
      const resp = await axios.put(`https://users-crud.academlo.tech/users/${userEdit.id}/`, userEdit)
      getUsers();
      setUserSelected(null)
      MySwal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Usuario Editado con exito',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.error(error);
    }
  }
  //Html --> project view
  return (
    <>
      <div className="general-container">
        <UsersForm
        addUser = {addUsernw}
        userSelected = {userSelected}
        editUser = {editUserId}
        />
        <ListUsers
        userList ={userList}
        deleteUser ={deleteUserId}
        selectUser={selectUserId}
        />
      </div>
    </>
  );
}

export default App;
