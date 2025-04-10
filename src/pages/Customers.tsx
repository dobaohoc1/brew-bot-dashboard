import { useState, useEffect } from "react";
import { DataTable } from "@/components/tables/DataTable";
import { KhachHang } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

// Mock data for customers
const mockCustomers: KhachHang[] = [
  {
    maKH: "KH001",
    tenKH: "Nguyễn Văn A",
    SDT: "0901234567",
    diaChiKH: "123 Đường ABC, Quận 1, TP.HCM",
    gioiTinh: "Nam",
  },
  {
    maKH: "KH002",
    tenKH: "Trần Thị B",
    SDT: "0908765432",
    diaChiKH: "456 Đường XYZ, Quận 3, TP.HCM",
    gioiTinh: "Nữ",
  },
  {
    maKH: "KH003",
    tenKH: "Lê Văn C",
    SDT: "0933444555",
    diaChiKH: "789 Đường UVW, Quận 5, TP.HCM",
    gioiTinh: "Nam",
  },
];

const customerSchema = z.object({
  tenKH: z.string().min(2, {
    message: "Tên khách hàng phải có ít nhất 2 ký tự.",
  }),
  SDT: z.string().regex(new RegExp("^0[0-9]{9}$"), {
    message: "Số điện thoại không hợp lệ.",
  }),
  diaChiKH: z.string().min(5, {
    message: "Địa chỉ phải có ít nhất 5 ký tự.",
  }),
  gioiTinh: z.enum(["Nam", "Nữ"], {
    required_error: "Vui lòng chọn giới tính.",
  }),
});

const Customers = () => {
  const [customers, setCustomers] = useState<KhachHang[]>(mockCustomers);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<KhachHang | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      tenKH: "",
      SDT: "",
      diaChiKH: "",
      gioiTinh: "Nam",
    },
  });

  useEffect(() => {
    if (selectedCustomer) {
      form.reset(selectedCustomer);
      setIsEditMode(true);
    } else {
      form.reset({
        tenKH: "",
        SDT: "",
        diaChiKH: "",
        gioiTinh: "Nam",
      });
      setIsEditMode(false);
    }
  }, [selectedCustomer, form]);

  const columns = [
    { key: "maKH", label: "Mã KH" },
    { key: "tenKH", label: "Tên KH" },
    { key: "SDT", label: "SĐT" },
    { key: "diaChiKH", label: "Địa chỉ" },
    { key: "gioiTinh", label: "Giới tính" },
  ];

  const generateId = () => {
    return "KH" + Math.random().toString(36).substring(2, 9).toUpperCase();
  };

  const onSubmit = (values: z.infer<typeof customerSchema>) => {
    if (isEditMode && selectedCustomer) {
      // Update existing customer
      setCustomers(
        customers.map((customer) =>
          customer.maKH === selectedCustomer.maKH
            ? { ...customer, ...values }
            : customer
        )
      );
      toast({
        title: "Cập nhật thành công.",
        description: "Thông tin khách hàng đã được cập nhật.",
      });
    } else {
      // Create new customer
      const newCustomer: KhachHang = {
        maKH: generateId(), // or however IDs are generated
        tenKH: values.tenKH || "", // Ensure required fields have default values
        SDT: values.SDT || "",
        diaChiKH: values.diaChiKH || "",
        gioiTinh: values.gioiTinh || "Nam", // Default value if not provided
      };
      setCustomers([...customers, newCustomer]);
      toast({
        title: "Thêm mới thành công.",
        description: "Khách hàng mới đã được thêm vào danh sách.",
      });
    }
    setOpen(false);
    setSelectedCustomer(null);
  };

  const handleEdit = (customer: KhachHang) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleDelete = (customer: KhachHang) => {
    setCustomers(customers.filter((c) => c.maKH !== customer.maKH));
    toast({
      title: "Xóa thành công.",
      description: "Khách hàng đã được xóa khỏi danh sách.",
    });
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={customers}
        title="Danh sách khách hàng"
        onAdd={() => {
          setSelectedCustomer(null);
          setOpen(true);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
            </DialogTitle>
            <DialogDescription>
              Điền đầy đủ thông tin vào form bên dưới.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="tenKH"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khách hàng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khách hàng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="SDT"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diaChiKH"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gioiTinh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">
                  {isEditMode ? "Cập nhật" : "Thêm mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
