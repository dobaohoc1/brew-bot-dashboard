
import { useState, useEffect } from "react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Employee } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Form validation schema
const formSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  position: z.string().min(2, { message: "Position is required" }),
  phoneNumber: z.string().min(9, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  startDate: z.string(),
  status: z.enum(["active", "inactive"]),
  avatar: z.string().optional()
});

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: Employee) => void;
}

export const EmployeeForm = ({ employee, onSubmit }: EmployeeFormProps) => {
  const isEditing = !!employee;
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      position: "",
      phoneNumber: "",
      email: "",
      startDate: new Date().toISOString().split('T')[0],
      status: "active",
      avatar: "/placeholder.svg"
    }
  });

  // Update form values when editing an existing employee
  useEffect(() => {
    if (employee) {
      form.reset({
        fullName: employee.fullName,
        position: employee.position,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        startDate: employee.startDate,
        status: employee.status as "active" | "inactive",
        avatar: employee.avatar
      });
    }
  }, [employee, form]);

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      id: employee?.id || "",
      ...values
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={form.watch("avatar") || "/placeholder.svg"} />
            <AvatarFallback>
              {form.watch("fullName")?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{isEditing ? "Edit Profile" : "New Employee"}</h3>
            <p className="text-sm text-muted-foreground">
              {isEditing ? "Update employee information" : "Add employee details"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Barista">Barista</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Cashier">Cashier</SelectItem>
                    <SelectItem value="Server">Server</SelectItem>
                    <SelectItem value="Kitchen Staff">Kitchen Staff</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="0901234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={() => form.reset()}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Employee" : "Add Employee"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
