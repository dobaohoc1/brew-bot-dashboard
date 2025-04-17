
import { Link, useNavigate } from "react-router-dom";
import { 
  Package, 
  Search,
  Bell,
  User
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b">
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-8"
          />
        </div>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Sản phẩm</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/dashboard/products"
                      >
                        <Package className="h-6 w-6 text-primary mb-2" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Danh sách sản phẩm
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Xem tất cả sản phẩm trong hệ thống
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/products/new"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Thêm sản phẩm mới</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Tạo sản phẩm mới trong hệ thống
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/products/categories"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Danh mục</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Quản lý danh mục sản phẩm
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/dashboard/profile")}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
