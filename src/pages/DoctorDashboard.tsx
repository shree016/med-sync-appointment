
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AppointmentCard from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

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

  const displayedAppointments = filter === "upcoming" ? 
    [...todayAppointments, ...upcomingAppointments] : 
    pastAppointments;

  // Format current date for display
  const format = (date: Date, formatStr: string) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Doctor Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Welcome back, Dr. {user.name.split(' ')[1]}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {format(currentDate, "yyyy-MM-dd")}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Next 7 days
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(doctorAppointments.map(a => a.patientId)).size}
              </div>
            </CardContent>
          </Card>
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
          {todayAppointments.length > 0 && filter === "upcoming" && (
            <>
              <h2 className="text-lg font-semibold mt-6">Today's Appointments</h2>
              {todayAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </>
          )}

          {upcomingAppointments.length > 0 && filter === "upcoming" && (
            <>
              <h2 className="text-lg font-semibold mt-6">Upcoming Appointments</h2>
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </>
          )}

          {pastAppointments.length > 0 && filter === "past" && (
            <>
              <h2 className="text-lg font-semibold mt-6">Past Appointments</h2>
              {pastAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </>
          )}

          {displayedAppointments.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium">No appointments</h3>
              <p className="text-gray-500 mt-2">
                {filter === "upcoming"
                  ? "You don't have any upcoming appointments"
                  : "You don't have any past appointments"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
