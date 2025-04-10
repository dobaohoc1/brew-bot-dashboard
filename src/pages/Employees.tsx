
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Filter } from "lucide-react";
import { EmployeeList } from "@/components/employees/EmployeeList";
import { EmployeeForm } from "@/components/employees/EmployeeForm";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Employee } from "@/lib/types";

// Mock data for employees
const mockEmployees: Employee[] = [
  {
    id: "1",
    fullName: "Nguyen Van A",
    position: "Barista",
    phoneNumber: "0901234567",
    email: "nguyenvana@example.com",
    startDate: "2023-01-15",
    status: "active",
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    fullName: "Tran Thi B",
    position: "Manager",
    phoneNumber: "0907654321",
    email: "tranthib@example.com",
    startDate: "2022-05-10",
    status: "active",
    avatar: "/placeholder.svg"
  },
  {
    id: "3",
    fullName: "Le Van C",
    position: "Cashier",
    phoneNumber: "0909876543",
    email: "levanc@example.com",
    startDate: "2023-03-20",
    status: "inactive",
    avatar: "/placeholder.svg"
  },
  {
    id: "4",
    fullName: "Pham Thi D",
    position: "Barista",
    phoneNumber: "0908765432",
    email: "phamthid@example.com",
    startDate: "2023-02-01",
    status: "active",
    avatar: "/placeholder.svg"
  },
  {
    id: "5",
    fullName: "Hoang Van E",
    position: "Server",
    phoneNumber: "0901122334",
    email: "hoangvane@example.com",
    startDate: "2022-11-05",
    status: "active",
    avatar: "/placeholder.svg"
  }
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, id: String(Date.now()) }]);
    setIsAddDialogOpen(false);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEmployees(employees.map(e => e.id === employee.id ? employee : e));
    setIsEditDialogOpen(false);
    setCurrentEmployee(null);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const openEditDialog = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-coffee-800">Employee Management</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <UserPlus size={18} />
          <span>Add Employee</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Staff Directory</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[250px]"
              />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <EmployeeList 
            employees={filteredEmployees} 
            onEdit={openEditDialog}
            onDelete={handleDeleteEmployee}
          />
        </CardContent>
      </Card>

      {/* Add Employee Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
            <DialogDescription>
              Complete the form below to add a new employee to the system.
            </DialogDescription>
          </DialogHeader>
          <EmployeeForm onSubmit={handleAddEmployee} />
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogDescription>
              Update employee information in the form below.
            </DialogDescription>
          </DialogHeader>
          {currentEmployee && (
            <EmployeeForm 
              employee={currentEmployee} 
              onSubmit={handleEditEmployee} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Employees;
