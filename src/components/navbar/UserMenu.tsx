
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const UserMenu = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button className="bg-medical-600 hover:bg-medical-700" asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/appointments">
            <Calendar className="h-5 w-5 text-gray-600" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-gray-600" />
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative rounded-full">
            <Avatar>
              {user.avatar ? (
                <AvatarImage src={user.avatar} alt={user.name} />
              ) : (
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">Profile</Link>
          </DropdownMenuItem>
          {user.role === "patient" && (
            <DropdownMenuItem asChild>
              <Link to="/appointments" className="cursor-pointer">My Appointments</Link>
            </DropdownMenuItem>
          )}
          {user.role === "doctor" && (
            <DropdownMenuItem asChild>
              <Link to="/doctor-dashboard" className="cursor-pointer">Dashboard</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={logout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
