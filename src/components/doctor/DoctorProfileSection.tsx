
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Doctor } from "@/types";

interface DoctorProfileSectionProps {
  doctor: Doctor;
  onRequestHomeVisit: () => void;
}

export function DoctorProfileSection({ doctor, onRequestHomeVisit }: DoctorProfileSectionProps) {
  return (
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
        
        {doctor.providesHomeVisit && (
          <div className="mt-4 p-4 bg-medical-50 rounded-lg">
            <h3 className="text-lg font-semibold text-medical-700">
              Home Visits Available
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              This doctor provides home visit consultations.
              {doctor.travelFee && (
                <span className="ml-2">
                  Travel fee: ${doctor.travelFee}
                </span>
              )}
            </p>
            <Button
              onClick={onRequestHomeVisit}
              className="mt-3 bg-medical-600 hover:bg-medical-700"
            >
              Request Home Visit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
