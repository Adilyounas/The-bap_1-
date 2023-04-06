import { updateUser } from "../../Redux/Actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import "./updateUser.css";
import { toast } from "react-hot-toast";
import { null_Error } from "../../Redux/Reducers/UserReducer";

const UpdateMe = () => {
  const dispatch = useDispatch()
  const { loading, Authenticated, error,user } = useSelector(
    (state) => state.userSlice
  );
  
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const updateUserSubmitHandler = (e) => {
    const formData = new FormData()
    formData.set("name",name )
    formData.set("email",email )
    formData.set("avatar",avatar )
    dispatch(updateUser(formData))

  };

  const onChangeDataHandler = (e) => {

  
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      
    }
    
  };


  useEffect(()=>{
    if (error) {
      toast.error(error,{duration:5000});
      return ()=>{
        dispatch(null_Error())
      }
    }
    if (Authenticated) {
      setname(user.name)
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }
  },[error,dispatch,Authenticated,user.avatar.url,user.name,user.email])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="updateUser_container">
          <div className="form_Box">
            <form className="form" onSubmit={updateUserSubmitHandler}>
              <input type="name" value={name}  onChange={(e) => setname(e.target.value)} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <div>
                <Avatar src={avatarPreview} />
                <input accept="image/*"  type="file" onChange={onChangeDataHandler} />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateMe;
