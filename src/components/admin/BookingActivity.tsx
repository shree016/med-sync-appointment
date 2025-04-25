
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const mockActivity = [
  {
    id: "1",
    patientName: "John Doe",
    doctorName: "Dr. Sarah Smith",
    date: new Date(),
    status: "scheduled",
    type: "New Booking",
  },
  {
    id: "2",
    patientName: "Alice Johnson",
    doctorName: "Dr. Michael Brown",
    date: new Date(),
    status: "cancelled",
    type: "Cancellation",
  },
  {
    id: "3",
    patientName: "Robert Wilson",
    doctorName: "Dr. Emily Davis",
    date: new Date(),
    status: "completed",
    type: "Completed",
  },
];

export const BookingActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Booking Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  {activity.patientName}
                </TableCell>
                <TableCell>{activity.doctorName}</TableCell>
                <TableCell>
                  {format(activity.date, "MMM dd, yyyy HH:mm")}
                </TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      activity.status === "scheduled"
                        ? "default"
                        : activity.status === "cancelled"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
