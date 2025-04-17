
import React from "react";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  Package, 
  ShoppingCart, 
  Settings, 
  MessageSquare, 
  UserCog,
  BarChart3
} from "lucide-react";
import { SidebarNavItem } from "./SidebarNavItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SidebarContent = () => {
  const location = useLocation();
  
  const navItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      label: "Khách hàng",
      href: "/dashboard/customers",
    },
    {
      icon: <UserCog size={20} />,
      label: "Nhân viên",
      href: "/dashboard/employees",
    },
    {
      icon: <Package size={20} />,
      label: "Sản phẩm",
      href: "/dashboard/products",
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Đơn hàng",
      href: "/dashboard/orders",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Báo cáo",
      href: "/dashboard/reports",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "AI Chatbot",
      href: "/dashboard/chatbot",
    },
    {
      icon: <Settings size={20} />,
      label: "Cài đặt",
      href: "/dashboard/settings",
    },
  ];

  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={location.pathname === item.href}
          />
        ))}
      </nav>
    </ScrollArea>
  );
};
