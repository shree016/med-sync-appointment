
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const NavLinks = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isDoctorsPage = location.pathname === "/doctors";
  const isDoctor = user?.role === "doctor";

  return (
    <div className="hidden md:flex space-x-6">
      <Link to="/" className="text-gray-600 hover:text-medical-600">
        Home
      </Link>
      {!isDoctorsPage && !isDoctor && (
        <Link to="/doctors" className="text-gray-600 hover:text-medical-600">
          Find Doctors
        </Link>
      )}
      {user && !isDoctor && (
        <Link to="/appointments" className="text-gray-600 hover:text-medical-600">
          My Appointments
        </Link>
      )}
      {user?.role === "doctor" && (
        <Link to="/doctor-dashboard" className="text-gray-600 hover:text-medical-600">
          Dashboard
        </Link>
      )}
      {user?.role === "admin" && (
        <Link to="/admin-dashboard" className="text-gray-600 hover:text-medical-600">
          Admin Dashboard
        </Link>
      )}
    </div>
  );
};
