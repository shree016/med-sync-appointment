
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import { DoctorProvider } from "@/contexts/DoctorContext";

const Layout = () => {
  return (
    <AuthProvider>
      <DoctorProvider>
        <AppointmentProvider>
          <Outlet />
        </AppointmentProvider>
      </DoctorProvider>
    </AuthProvider>
  );
};

export default Layout;
