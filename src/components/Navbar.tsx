
import { Link } from "react-router-dom";
import { NavLinks } from "./navbar/NavLinks";
import { UserMenu } from "./navbar/UserMenu";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 py-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-medical-600">MedSync</span>
        </Link>

        <NavLinks />

        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
