
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Edit, 
  Trash2, 
  MoreVertical, 
  EyeIcon,
  UserPlus
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@/lib/types";

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export const EmployeeList = ({ employees, onEdit, onDelete }: EmployeeListProps) => {
  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge variant="default" className="bg-green-500">Active</Badge>;
    } else {
      return <Badge variant="outline" className="bg-gray-200 text-gray-700">Inactive</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <UserPlus size={40} className="mb-2 opacity-20" />
                  <p>No employees found</p>
                  <p className="text-sm">Add a new employee to get started</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar} alt={employee.fullName} />
                      <AvatarFallback>{employee.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{employee.fullName}</p>
                      <p className="text-xs text-muted-foreground">{employee.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>
                  <div>
                    <p>{employee.phoneNumber}</p>
                    <p className="text-xs text-muted-foreground">{employee.email}</p>
                  </div>
                </TableCell>
                <TableCell>{new Date(employee.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(employee.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(employee)}>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(employee.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <EyeIcon className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
