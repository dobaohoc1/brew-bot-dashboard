
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  variant?: "default" | "subtle";
}

export const SidebarNavItem = ({
  icon,
  label,
  href,
  active = false,
  variant = "default",
}: SidebarNavItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        variant === "default" 
          ? "hover:bg-accent hover:text-accent-foreground" 
          : "hover:bg-accent/50 hover:text-accent-foreground",
        active && variant === "default" 
          ? "bg-accent text-accent-foreground" 
          : active && variant === "subtle"
          ? "bg-accent/50 text-accent-foreground"
          : "text-muted-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};
