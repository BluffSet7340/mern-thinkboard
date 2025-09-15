import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="pr-8 pl-8 navbar bg-primary-100 shadow-lg">
      <div className="flex-1">
        <a className="text-xl text-primary">ThinkBoard</a>
      </div>
      <div>
        <Link to={'/create'} className="btn btn-primary">
            <PlusIcon/>
            <span>New Note</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
