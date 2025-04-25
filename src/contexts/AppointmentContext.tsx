
import { createContext, useContext, useState, ReactNode } from "react";
import { Appointment, Doctor } from "../types";
import { mockAppointments, mockDoctors } from "../data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

interface AppointmentContextType {
  appointments: Appointment[];
  doctorAppointments: Appointment[];
  patientAppointments: Appointment[];
  bookAppointment: (
    doctorId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => void;
  cancelAppointment: (appointmentId: string) => void;
  isLoading: boolean;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Filter appointments for current user
  const doctorAppointments = appointments.filter(
    (appointment) => user?.id === appointment.doctorId
  );
  
  const patientAppointments = appointments.filter(
    (appointment) => user?.id === appointment.patientId
  );

  const bookAppointment = (
    doctorId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to book an appointment",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Find the doctor
    const doctor = mockDoctors.find((d) => d.id === doctorId);
    if (!doctor) {
      toast({
        title: "Error",
        description: "Doctor not found",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Create a new appointment
    const newAppointment: Appointment = {
      id: `a${Date.now()}`,
      doctorId,
      patientId: user.id,
      doctorName: doctor.name,
      patientName: user.name,
      date,
      startTime,
      endTime,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    };

    // Update appointments state
    setAppointments([...appointments, newAppointment]);

    // Update the doctor's availability
    // In a real implementation, this would be an API call

    toast({
      title: "Appointment booked",
      description: `Your appointment with ${doctor.name} on ${date} at ${startTime} has been scheduled`,
    });

    setIsLoading(false);
  };

  const cancelAppointment = (appointmentId: string) => {
    setIsLoading(true);

    // Find the appointment
    const appointmentIndex = appointments.findIndex((a) => a.id === appointmentId);
    
    if (appointmentIndex === -1) {
      toast({
        title: "Error",
        description: "Appointment not found",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Update the appointment status
    const updatedAppointments = [...appointments];
    updatedAppointments[appointmentIndex] = {
      ...updatedAppointments[appointmentIndex],
      status: "cancelled",
    };

    setAppointments(updatedAppointments);

    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled",
    });

    setIsLoading(false);
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        doctorAppointments,
        patientAppointments,
        bookAppointment,
        cancelAppointment,
        isLoading,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
};
