
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock } from "lucide-react";
import { Appointment } from "@/types";
import { format, parseISO } from "date-fns";
import { useAppointments } from "@/contexts/AppointmentContext";
import { useAuth } from "@/contexts/AuthContext";
import { mockDoctors, mockPatients } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const { cancelAppointment } = useAppointments();
  const { user } = useAuth();
  
  const isDoctor = user?.role === "doctor";
  const isUpcoming = new Date(`${appointment.date}T${appointment.startTime}`) > new Date();
  
  // Get the avatar based on user role
  const avatarPerson = isDoctor 
    ? mockPatients.find(p => p.id === appointment.patientId)
    : mockDoctors.find(d => d.id === appointment.doctorId);
  
  const avatarUrl = avatarPerson?.avatar;
  const avatarName = isDoctor ? appointment.patientName : appointment.doctorName;

  // Format date
  const displayDate = appointment.date.split('-').join('/');
  
  // Status colors
  const statusColors = {
    scheduled: "bg-medical-100 text-medical-800 border-medical-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
    "no-show": "bg-orange-100 text-orange-800 border-orange-200"
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={avatarName} />
            ) : (
              <AvatarFallback>
                {avatarName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-base">
                  {isDoctor ? appointment.patientName : appointment.doctorName}
                </h3>
                {!isDoctor && (
                  <p className="text-sm text-muted-foreground">
                    {mockDoctors.find(d => d.id === appointment.doctorId)?.specialization}
                  </p>
                )}
              </div>
              <Badge className={statusColors[appointment.status] || ""}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{displayDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="mr-2 h-4 w-4" />
                <span>{appointment.startTime} - {appointment.endTime}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {appointment.status === "scheduled" && isUpcoming && (
        <CardFooter className="bg-gray-50 p-4 flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => cancelAppointment(appointment.id)}
            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
          >
            Cancel Appointment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentCard;
