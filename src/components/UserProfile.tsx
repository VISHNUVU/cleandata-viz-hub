
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  name?: string;
  role?: string;
  avatarUrl?: string;
  className?: string;
  showLogout?: boolean;
}

export default function UserProfile({
  name = "Alex Morgan",
  role = "Data Analyst",
  avatarUrl = "https://avatar.iran.liara.run/public",
  className = "",
  showLogout = true
}: UserProfileProps) {
  const navigate = useNavigate();
  
  const handleProfileClick = () => {
    navigate("/settings");
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <Avatar className="h-10 w-10 cursor-pointer" onClick={handleProfileClick}>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <p className="text-sm font-medium cursor-pointer hover:text-primary transition-colors" onClick={handleProfileClick}>{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
      {showLogout && (
        <>
          <Separator orientation="vertical" className="mx-3 h-8" />
          <Button variant="ghost" size="icon" aria-label="Logout">
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
