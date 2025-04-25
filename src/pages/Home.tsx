
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useDoctors } from "@/contexts/DoctorContext";
import { Search, Calendar, UserCheck, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import DoctorCard from "@/components/DoctorCard";

const Home = () => {
  const { user } = useAuth();
  const { filteredDoctors } = useDoctors();
  const featuredDoctors = filteredDoctors.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-medical-100 to-teal-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Your Health, Our Priority
              </h1>
              <p className="text-xl mt-4 text-gray-700 max-w-lg">
                Book appointments with top doctors, manage your medical schedule,
                and take control of your healthcare journey.
              </p>
              <div className="mt-8 space-x-4">
                <Button asChild className="bg-medical-600 hover:bg-medical-700 text-white px-8 py-6">
                  <Link to="/doctors">Find a Doctor</Link>
                </Button>
                {!user && (
                  <Button variant="outline" asChild className="border-medical-600 text-medical-600 hover:bg-medical-50 px-8 py-6">
                    <Link to="/register">Sign Up</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Doctor with patient" 
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 mt-2">Simple steps to book your appointment</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-medical-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Find a Doctor</h3>
              <p className="text-gray-600 text-sm">Browse through our network of trusted healthcare professionals.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-medical-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <UserCheck className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Check Availability</h3>
              <p className="text-gray-600 text-sm">View available time slots that work with your schedule.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-medical-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Book Appointment</h3>
              <p className="text-gray-600 text-sm">Quickly reserve your appointment with a few clicks.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="bg-medical-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-medical-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Get Care</h3>
              <p className="text-gray-600 text-sm">Receive high-quality healthcare from experienced professionals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Doctors</h2>
              <p className="text-gray-600 mt-1">Meet our top healthcare specialists</p>
            </div>
            <Button asChild variant="outline" className="border-medical-600 text-medical-600 hover:bg-medical-50">
              <Link to="/doctors">View All Doctors</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MedSync</h3>
              <p className="text-gray-300">
                Making healthcare accessible and convenient for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/doctors" className="text-gray-300 hover:text-white">Find Doctors</Link></li>
                <li><Link to="/appointments" className="text-gray-300 hover:text-white">Appointments</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-300">
                123 Healthcare Blvd<br />
                Medical City, MC 12345<br />
                contact@medsync.com<br />
                (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} MedSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
