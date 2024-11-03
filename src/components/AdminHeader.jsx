import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { logout } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../api";

export default function AdminHeader() {
    const {error, loading } = useSelector((state) => state.user);
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${currentUser.access_token}`,
            },
        }
        try {
            const response = instance.delete("/auth/logout", config);
            dispatch(logout());
            navigate("/sign-in");            
        } catch (error) {
            console.log(error);
        }
  };

  return (
    <div className="p-5 bg-primary flex flex-row justify-between">
      <Link to="/">
        <h1 className="text-3xl text-white">Eventistry</h1>
      </Link>
      <div className="flex flex-row justify-around align-middle gap-2 text-white">
        <Link to="/" className="hover:bg-blue-950 p-2">
          Home
        </Link>
        <Link to="/about" className="hover:bg-blue-950 p-2">
          About
        </Link>
      </div>
      <div className="flex flex-row text-white justify-center align-middle">
        <Link to="/sign-up" className="hover:bg-blue-950 p-2">
          Profile
        </Link>
        <div          
          className="hover:bg-blue-950 p-2 cursor-pointer"
          onClick={handleLogout}
        >
          Sign Out
        </div>
      </div>
    </div>
  );
}
