
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Doctor } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/contexts/AppointmentContext";
import { HomeVisitRequest } from "@/components/HomeVisitRequest";

interface AppointmentBookingSectionProps {
  doctor: Doctor;
}

export function AppointmentBookingSection({ doctor }: AppointmentBookingSectionProps) {
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showHomeVisitForm, setShowHomeVisitForm] = useState(false);
  
  const dayName = selectedDate
    ? format(selectedDate, "EEEE").toLowerCase()
    : "";
  
  const availableDay = doctor.availability.find((day) => day.day === dayName);
  const availableSlots = availableDay?.slots || [];

  const handleBookAppointment = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to book an appointment",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Selection required",
        description: "Please select a date and time slot",
        variant: "destructive",
      });
      return;
    }
    
    const selectedSlot = availableSlots.find(
      (slot) => `${slot.startTime}-${slot.endTime}` === selectedTimeSlot
    );
    
    if (!selectedSlot) {
      toast({
        title: "Invalid selection",
        description: "The selected time slot is not available",
        variant: "destructive",
      });
      return;
    }
    
    bookAppointment(
      doctor.id,
      format(selectedDate, "yyyy-MM-dd"),
      selectedSlot.startTime,
      selectedSlot.endTime
    );
    
    navigate("/appointments");
  };

  return (
    <div className="md:w-1/3">
      {showHomeVisitForm ? (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Request Home Visit</h3>
            <HomeVisitRequest
              doctorId={doctor.id}
              doctorName={doctor.name}
              onRequestSubmit={() => setShowHomeVisitForm(false)}
            />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Book an Appointment</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Select Date</h4>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const dateDay = format(date, "EEEE").toLowerCase();
                  return (
                    date < new Date() ||
                    !doctor.availability.some((day) => day.day === dateDay)
                  );
                }}
                className="p-0 pointer-events-auto"
              />
            </div>
            
            {selectedDate && availableDay && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Available Time Slots</h4>
                <div className="appointment-grid">
                  {availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`time-slot ${
                        slot.isBooked
                          ? "booked"
                          : "available"
                      } ${
                        selectedTimeSlot === `${slot.startTime}-${slot.endTime}`
                          ? "bg-medical-200 border-medical-600"
                          : ""
                      }`}
                      onClick={() => {
                        if (!slot.isBooked) {
                          setSelectedTimeSlot(`${slot.startTime}-${slot.endTime}`);
                        }
                      }}
                    >
                      {slot.startTime}
                    </div>
                  ))}
                </div>
                
                {availableSlots.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No available slots for this day
                  </p>
                )}
              </div>
            )}
            
            {!availableDay && selectedDate && (
              <p className="text-gray-500 text-center py-4">
                No availability on {format(selectedDate, "EEEE")}
              </p>
            )}
            
            <Button
              className="w-full bg-medical-600 hover:bg-medical-700"
              disabled={!selectedTimeSlot}
              onClick={handleBookAppointment}
            >
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
