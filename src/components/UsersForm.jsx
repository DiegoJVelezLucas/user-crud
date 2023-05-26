import { useForm } from "react-hook-form";
import { useEffect } from "react";


const UsersForm = ({addUser, userSelected, editUser}) => {
    const {register, handleSubmit, reset} = useForm();
    

    const emptyUser = {
      email : "",
      password: "",
      first_name: "",
      last_name: "",
      birthday: "" 
    };
    useEffect(() =>{
        if (userSelected) {
            reset(userSelected)
        } else {
           reset(emptyUser) 
        }
    }, [userSelected])

    const submit = (dataUser) =>{
        
        if (userSelected) {
            //edit user existing
            editUser(dataUser);
        } else {
            //create new user
            addUser(dataUser);
            reset(emptyUser);
        }
    }
    //Html --> Form view
    return (
        <form onSubmit={handleSubmit(submit)}>
            <h1>{userSelected ? "Edit": "Create"} User</h1>
            <div className="input-style">          
            <div >
                <label htmlFor="first_name"> First Name: </label>
                <input type="text" id="first_name" {...register("first_name")} />
            </div>
            <div >
                <label htmlFor="last_name"> Last Name: </label>
                <input type="text" id="last_name" {...register("last_name")} />
            </div>
            <div >
                <label htmlFor="birthday"> Date of Birth: </label>
                <input type="date" name= "date of birth" id="birthday"  {...register("birthday")} />
            </div>
            <div >
                <label htmlFor="email"> Email: </label>
                <input type="email" id="email" {...register("email")} />
            </div>
            <div >
                <label htmlFor="password"> Password: </label>
                <input type="password" id="password" {...register("password")} />
            </div>
            <button type="submit"> {userSelected ? "Edit" : "Create"} User 👤</button>
            </div>
        </form>
    );
};

export default UsersForm;