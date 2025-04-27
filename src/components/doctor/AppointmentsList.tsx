
import { Appointment } from "@/types";
import AppointmentCard from "@/components/AppointmentCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface AppointmentsListProps {
  todayAppointments: Appointment[];
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  filter: string;
  onFilterChange: (value: string) => void;
}

export const AppointmentsList = ({
  todayAppointments,
  upcomingAppointments,
  pastAppointments,
  filter,
  onFilterChange,
}: AppointmentsListProps) => {
  const displayedAppointments = filter === "upcoming" ? 
    [...todayAppointments, ...upcomingAppointments] : 
    pastAppointments;

  return (
    <>
      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList>
          <TabsTrigger 
            value="upcoming" 
            onClick={() => onFilterChange("upcoming")}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger 
            value="past" 
            onClick={() => onFilterChange("past")}
          >
            Past
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {todayAppointments.length > 0 && filter === "upcoming" && (
          <>
            <h2 className="text-lg font-semibold mt-6">Today's Appointments</h2>
            {todayAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </>
        )}

        {upcomingAppointments.length > 0 && filter === "upcoming" && (
          <>
            <h2 className="text-lg font-semibold mt-6">Upcoming Appointments</h2>
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </>
        )}

        {pastAppointments.length > 0 && filter === "past" && (
          <>
            <h2 className="text-lg font-semibold mt-6">Past Appointments</h2>
            {pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </>
        )}

        {displayedAppointments.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium">No appointments</h3>
            <p className="text-gray-500 mt-2">
              {filter === "upcoming"
                ? "You don't have any upcoming appointments"
                : "You don't have any past appointments"}
            </p>
          </div>
        )}
      </div>
    </>
  );
};
