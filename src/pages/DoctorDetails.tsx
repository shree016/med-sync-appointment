
import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useDoctors } from "@/contexts/DoctorContext";
import { DoctorProfileSection } from "@/components/doctor/DoctorProfileSection";
import { AppointmentBookingSection } from "@/components/doctor/AppointmentBookingSection";

const DoctorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { doctors } = useDoctors();
  const [showHomeVisitForm, setShowHomeVisitForm] = useState(false);
  
  const doctor = doctors.find((doc) => doc.id === id);
  
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
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <DoctorProfileSection 
            doctor={doctor} 
            onRequestHomeVisit={() => setShowHomeVisitForm(true)} 
          />
          <AppointmentBookingSection 
            doctor={doctor} 
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
