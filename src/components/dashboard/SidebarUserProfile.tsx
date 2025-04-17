
import React from "react";
import { useAuth } from "@/lib/auth-context";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export const SidebarUserProfile = () => {
  const { logout, user } = useAuth();

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-primary text-primary-foreground">
          <AvatarFallback>
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{user?.username || "Admin"}</p>
          <p className="text-xs text-muted-foreground">{user?.role || "Administrator"}</p>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full justify-start gap-2"
        onClick={() => logout()}
      >
        <LogOut size={18} />
        <span>Đăng xuất</span>
      </Button>
    </div>
  );
};
