
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DoctorCard from "@/components/DoctorCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useDoctors } from "@/contexts/DoctorContext";
import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Doctors = () => {
  const { filteredDoctors, filterDoctors, specializations } = useDoctors();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    filterDoctors(
      selectedSpecialization === "all" ? undefined : selectedSpecialization,
      searchTerm,
      minRating
    );
  }, [selectedSpecialization, searchTerm, minRating]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterDoctors(
      selectedSpecialization === "all" ? undefined : selectedSpecialization,
      searchTerm,
      minRating
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("all");
    setMinRating(0);
    filterDoctors();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Find a Doctor</h1>
        <p className="text-gray-600 mb-8">Search for the best healthcare professionals</p>
        
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search and filters for desktop */}
          <div className="hidden lg:block w-64 bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
            <h3 className="font-semibold mb-4 text-lg">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="desktop-specialization" className="mb-2 block">
                  Specialization
                </Label>
                <Select 
                  value={selectedSpecialization} 
                  onValueChange={setSelectedSpecialization}
                >
                  <SelectTrigger id="desktop-specialization">
                    <SelectValue placeholder="All specializations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All specializations</SelectItem>
                    {specializations.map((spec) => (
                      <SelectItem key={spec.id} value={spec.name}>
                        {spec.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="mb-2 block">
                  Minimum Rating: {minRating}
                </Label>
                <Slider
                  value={[minRating]}
                  min={0}
                  max={5}
                  step={0.5}
                  onValueChange={(values) => setMinRating(values[0])}
                  className="py-4"
                />
              </div>
              
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            {/* Mobile Search Bar */}
            <form onSubmit={handleSearch} className="flex mb-4 gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search by doctor name" 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search results
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div>
                        <Label htmlFor="mobile-specialization" className="mb-2 block">
                          Specialization
                        </Label>
                        <Select 
                          value={selectedSpecialization} 
                          onValueChange={setSelectedSpecialization}
                        >
                          <SelectTrigger id="mobile-specialization">
                            <SelectValue placeholder="All specializations" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All specializations</SelectItem>
                            {specializations.map((spec) => (
                              <SelectItem key={spec.id} value={spec.name}>
                                {spec.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">
                          Minimum Rating: {minRating}
                        </Label>
                        <Slider
                          value={[minRating]}
                          min={0}
                          max={5}
                          step={0.5}
                          onValueChange={(values) => setMinRating(values[0])}
                          className="py-4"
                        />
                      </div>
                      
                      <Button 
                        variant="outline" 
                        onClick={clearFilters} 
                        className="w-full"
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <Button type="submit" className="bg-medical-600 hover:bg-medical-700 hidden sm:block">
                Search
              </Button>
            </form>
            
            {/* Results */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {filteredDoctors.length} {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
                </h2>
              </div>
              
              {filteredDoctors.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-medium">No doctors found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters} 
                    className="mt-4"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
