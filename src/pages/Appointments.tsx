
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

const Appointments = () => {
  const { patientAppointments } = useAppointments();
  const { user } = useAuth();
  const [filter, setFilter] = useState("upcoming");

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">
            Please login to view your appointments
          </p>
          <Button asChild className="bg-medical-600 hover:bg-medical-700">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentDate = new Date();
  
  const upcomingAppointments = patientAppointments.filter(
    (appointment) => 
      new Date(`${appointment.date}T${appointment.startTime}`) > currentDate && 
      appointment.status === "scheduled"
  );
  
  const pastAppointments = patientAppointments.filter(
    (appointment) => 
      new Date(`${appointment.date}T${appointment.startTime}`) < currentDate || 
      appointment.status === "completed" ||
      appointment.status === "cancelled"
  );
  
  const displayedAppointments = filter === "upcoming" ? upcomingAppointments : pastAppointments;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">My Appointments</h1>
            <p className="text-gray-600">Manage your scheduled appointments</p>
          </div>
          <Button asChild className="bg-medical-600 hover:bg-medical-700">
            <Link to="/doctors">
              <Calendar className="mr-2 h-4 w-4" /> Book New Appointment
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="mb-6">
          <TabsList>
            <TabsTrigger 
              value="upcoming" 
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger 
              value="past" 
              onClick={() => setFilter("past")}
            >
              Past
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {displayedAppointments.length > 0 ? (
            displayedAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium">No appointments</h3>
              <p className="text-gray-500 mt-2">
                {filter === "upcoming"
                  ? "You don't have any upcoming appointments"
                  : "You don't have any past appointments"}
              </p>
              {filter === "upcoming" && (
                <Button asChild className="mt-4 bg-medical-600 hover:bg-medical-700">
                  <Link to="/doctors">Book an Appointment</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
