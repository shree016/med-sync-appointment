
import { User } from "@/types";

interface WelcomeSectionProps {
  doctorName: string;
}

export const WelcomeSection = ({ doctorName }: WelcomeSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-medical-100 to-teal-100 rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-2/3 mb-6 md:mb-0">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Dr. {doctorName}</h1>
          <p className="text-gray-700 text-lg">
            Manage your appointments and provide the best care for your patients.
          </p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Doctor with patient" 
          className="w-full md:w-1/4 rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};
