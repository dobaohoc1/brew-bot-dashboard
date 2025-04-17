
import React from "react";
import { Link } from "react-router-dom";
import { Coffee, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarContent } from "./SidebarContent";
import { SidebarUserProfile } from "./SidebarUserProfile";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isMobile: boolean;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }: SidebarProps) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${isMobile ? "lg:relative" : "relative"}`}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-xl font-semibold text-primary"
        >
          <Coffee size={28} />
          <span>Coffee Manager</span>
        </Link>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        )}
      </div>

      <Separator />

      {/* Navigation */}
      <SidebarContent />

      <Separator />

      {/* User Profile & Logout */}
      <SidebarUserProfile />
    </aside>
  );
};
