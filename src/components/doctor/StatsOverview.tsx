
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Appointment } from "@/types";

interface StatsOverviewProps {
  todayAppointments: Appointment[];
  upcomingAppointments: Appointment[];
  totalPatients: number;
  currentDate: string;
}

export const StatsOverview = ({ 
  todayAppointments, 
  upcomingAppointments, 
  totalPatients,
  currentDate 
}: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Today's Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todayAppointments.length}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {currentDate}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Upcoming Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Next 7 days
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Patients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
        </CardContent>
      </Card>
    </div>
  );
};
