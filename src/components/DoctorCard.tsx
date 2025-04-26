
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Doctor } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    navigate(`/doctors/${doctor.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            {doctor.avatar ? (
              <AvatarImage
                src={doctor.avatar}
                alt={doctor.name}
              />
            ) : (
              <AvatarFallback>
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg">{doctor.name}</h3>
            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm">
                {doctor.rating} ({doctor.reviewCount} reviews)
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {doctor.experience} years experience
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">{doctor.bio}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="text-sm">
            <span className="font-semibold text-medical-700">
              ${doctor.consultationFee}
            </span>{" "}
            per visit
          </div>
          <Button 
            onClick={handleBookAppointment}
            className="bg-medical-600 hover:bg-medical-700"
          >
            Book Appointment
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;
