
import { createContext, useContext, useState, ReactNode } from "react";
import { Doctor, Specialization } from "../types";
import { mockDoctors, specializations } from "../data/mockData";

interface DoctorContextType {
  doctors: Doctor[];
  filteredDoctors: Doctor[];
  selectedDoctor: Doctor | null;
  specializations: Specialization[];
  setSelectedDoctor: (doctor: Doctor | null) => void;
  filterDoctors: (
    specialization?: string,
    name?: string,
    minRating?: number
  ) => void;
  isLoading: boolean;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const DoctorProvider = ({ children }: { children: ReactNode }) => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filterDoctors = (
    specialization?: string,
    name?: string,
    minRating?: number
  ) => {
    setIsLoading(true);

    let filtered = [...doctors];

    if (specialization && specialization !== "all") {
      filtered = filtered.filter((doctor) => doctor.specialization === specialization);
    }

    if (name) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (minRating) {
      filtered = filtered.filter((doctor) => doctor.rating >= minRating);
    }

    setFilteredDoctors(filtered);
    setIsLoading(false);
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        filteredDoctors,
        selectedDoctor,
        specializations,
        setSelectedDoctor,
        filterDoctors,
        isLoading,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctors = () => {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error("useDoctors must be used within a DoctorProvider");
  }
  return context;
};
