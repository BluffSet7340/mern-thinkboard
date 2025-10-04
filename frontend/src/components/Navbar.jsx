import { PlusIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const API_URL = "http://localhost:5001/api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const {logout} = useAuthStore()

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="pr-8 pl-8 navbar bg-primary-100 shadow-lg">
      <div className="flex-1">
        <a className="text-xl text-primary">ThinkBoard</a>
      </div>
      <div className="gap-5">
        <Link to={"/create"} className="btn btn-primary">
          <PlusIcon />
          <span>New Note</span>
        </Link>
        <button onClick={handleLogout} className="btn btn-outline btn-error">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
