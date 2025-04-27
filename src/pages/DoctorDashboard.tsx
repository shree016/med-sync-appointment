
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import { WelcomeSection } from "@/components/doctor/WelcomeSection";
import { StatsOverview } from "@/components/doctor/StatsOverview";
import { AppointmentsList } from "@/components/doctor/AppointmentsList";

const DoctorDashboard = () => {
  const { doctorAppointments } = useAppointments();
  const { user } = useAuth();
  const [filter, setFilter] = useState("upcoming");

  if (!user || user.role !== "doctor") {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in as a doctor to access this page
          </p>
          <Button asChild className="bg-medical-600 hover:bg-medical-700">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const format = (date: Date, formatStr: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();
  
  const todayAppointments = doctorAppointments.filter(
    (appointment) => 
      appointment.date === format(currentDate, "yyyy-MM-dd") && 
      appointment.status === "scheduled"
  );
  
  const upcomingAppointments = doctorAppointments.filter(
    (appointment) => 
      new Date(`${appointment.date}T${appointment.startTime}`) > currentDate && 
      appointment.status === "scheduled" &&
      appointment.date !== format(currentDate, "yyyy-MM-dd")
  );
  
  const pastAppointments = doctorAppointments.filter(
    (appointment) => 
      new Date(`${appointment.date}T${appointment.startTime}`) < currentDate ||
      appointment.status === "completed" ||
      appointment.status === "cancelled"
  );

  const totalPatients = new Set(doctorAppointments.map(a => a.patientId)).size;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <WelcomeSection doctorName={user.name.split(' ')[1]} />
        
        <StatsOverview
          todayAppointments={todayAppointments}
          upcomingAppointments={upcomingAppointments}
          totalPatients={totalPatients}
          currentDate={format(currentDate, "yyyy-MM-dd")}
        />

        <AppointmentsList
          todayAppointments={todayAppointments}
          upcomingAppointments={upcomingAppointments}
          pastAppointments={pastAppointments}
          filter={filter}
          onFilterChange={setFilter}
        />
      </div>
    </div>
  );
};

export default DoctorDashboard;

