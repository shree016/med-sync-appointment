
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay } from "date-fns";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useDoctors } from "@/contexts/DoctorContext";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments } from "@/contexts/AppointmentContext";

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors } = useDoctors();
  const { user } = useAuth();
  const { bookAppointment } = useAppointments();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const doctor = doctors.find((doc) => doc.id === id);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  if (!doctor) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">Doctor not found</h1>
        </div>
      </div>
    );
  }
  
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
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Doctor Info */}
          <div className="md:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Avatar className="w-24 h-24">
                  {doctor.avatar ? (
                    <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  ) : (
                    <AvatarFallback>
                      {doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{doctor.name}</h1>
                  <p className="text-gray-600">{doctor.specialization}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(doctor.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {doctor.rating} ({doctor.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Experience:</span> {doctor.experience} years
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Consultation Fee:</span> ${doctor.consultationFee}
                    </p>
                    <div className="text-sm">
                      <span className="font-medium">Qualifications:</span>{" "}
                      {doctor.qualifications.join(", ")}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700">{doctor.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Appointment Booking */}
          <div className="md:w-1/3">
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
                      // Only enable dates that match the doctor's availability days
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
