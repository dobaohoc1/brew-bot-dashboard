
import { useState, useEffect, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Coffee,
  Home,
  Users,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active }: NavItemProps) => (
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

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "Customers",
      href: "/dashboard/customers",
    },
    {
      icon: <Package size={20} />,
      label: "Products",
      href: "/dashboard/products",
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Orders",
      href: "/dashboard/orders",
    },
    {
      icon: <FileText size={20} />,
      label: "Reports",
      href: "/dashboard/reports",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "AI Chatbot",
      href: "/dashboard/chatbot",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "lg:relative" : "relative"}`}
      >
        <div className="flex h-full flex-col">
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
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={location.pathname === item.href}
                />
              ))}
            </nav>
          </ScrollArea>

          <Separator />

          {/* User Profile & Logout */}
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
              <span>Log Out</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-muted/20">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
          )}

          <div className="flex items-center ml-auto gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User size={20} />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="animate-fadeIn container py-6">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
