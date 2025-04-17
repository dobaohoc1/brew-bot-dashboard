
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

export const SidebarNavItem = ({ icon, label, href, active }: NavItemProps) => (
  <Link
    to={href}
    className={`flex items-center gap-3 rounded-md px-3 py-2 transition-all duration-300 ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);
