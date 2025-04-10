
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/tables/DataTable";
import { KhachHang } from "@/lib/types";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Users, UserPlus, Phone, MapPin } from "lucide-react";

// Mock customer data
const mockCustomers: KhachHang[] = [
  { maKH: "KH001", tenKH: "Nguyễn Văn A", SDT: "0901234567", diaChiKH: "123 Nguyễn Huệ, Q.1, TPHCM", gioiTinh: "Nam" },
  { maKH: "KH002", tenKH: "Trần Thị B", SDT: "0912345678", diaChiKH: "456 Lê Lợi, Q.1, TPHCM", gioiTinh: "Nữ" },
  { maKH: "KH003", tenKH: "Phạm Văn C", SDT: "0923456789", diaChiKH: "789 Trần Hưng Đạo, Q.5, TPHCM", gioiTinh: "Nam" },
  { maKH: "KH004", tenKH: "Hoàng Thị D", SDT: "0934567890", diaChiKH: "101 Nguyễn Trãi, Q.5, TPHCM", gioiTinh: "Nữ" },
  { maKH: "KH005", tenKH: "Lê Văn E", SDT: "0945678901", diaChiKH: "202 Cách Mạng Tháng 8, Q.3, TPHCM", gioiTinh: "Nam" },
  { maKH: "KH006", tenKH: "Đỗ Thị F", SDT: "0956789012", diaChiKH: "303 Nam Kỳ Khởi Nghĩa, Q.3, TPHCM", gioiTinh: "Nữ" },
  { maKH: "KH007", tenKH: "Ngô Văn G", SDT: "0967890123", diaChiKH: "404 Hai Bà Trưng, Q.1, TPHCM", gioiTinh: "Nam" },
  { maKH: "KH008", tenKH: "Mai Thị H", SDT: "0978901234", diaChiKH: "505 Điện Biên Phủ, Q.Bình Thạnh, TPHCM", gioiTinh: "Nữ" },
];

// Form schema for customer
const customerFormSchema = z.object({
  tenKH: z.string().min(2, { message: "Tên khách hàng phải có ít nhất 2 ký tự" }),
  SDT: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  diaChiKH: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
  gioiTinh: z.string({ required_error: "Vui lòng chọn giới tính" }),
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

const Customers = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState<KhachHang[]>(mockCustomers);
  const [editingCustomer, setEditingCustomer] = useState<KhachHang | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      tenKH: "",
      SDT: "",
      diaChiKH: "",
      gioiTinh: "",
    },
  });

  const columns = [
    { key: "maKH", label: "Mã KH" },
    { key: "tenKH", label: "Tên khách hàng" },
    { key: "SDT", label: "Số điện thoại" },
    { key: "diaChiKH", label: "Địa chỉ" },
    { key: "gioiTinh", label: "Giới tính" },
  ];

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    form.reset({
      tenKH: "",
      SDT: "",
      diaChiKH: "",
      gioiTinh: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditCustomer = (customer: KhachHang) => {
    setEditingCustomer(customer);
    form.reset({
      tenKH: customer.tenKH,
      SDT: customer.SDT,
      diaChiKH: customer.diaChiKH,
      gioiTinh: customer.gioiTinh,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCustomer = (customer: KhachHang) => {
    setCustomers(customers.filter(c => c.maKH !== customer.maKH));
    toast({
      title: "Đã xóa khách hàng",
      description: `Khách hàng ${customer.tenKH} đã được xóa.`,
    });
  };

  const onSubmit = (data: CustomerFormValues) => {
    if (editingCustomer) {
      // Update existing customer
      setCustomers(customers.map(c => 
        c.maKH === editingCustomer.maKH ? { ...c, ...data } : c
      ));
      toast({
        title: "Cập nhật thành công",
        description: `Khách hàng ${data.tenKH} đã được cập nhật.`,
      });
    } else {
      // Create new customer
      const newCustomer: KhachHang = {
        maKH: `KH${String(customers.length + 1).padStart(3, '0')}`,
        ...data,
      };
      setCustomers([...customers, newCustomer]);
      toast({
        title: "Thêm thành công",
        description: `Khách hàng ${data.tenKH} đã được thêm.`,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý khách hàng</h1>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả khách hàng</TabsTrigger>
          <TabsTrigger value="loyal">Khách hàng thân thiết</TabsTrigger>
          <TabsTrigger value="new">Khách hàng mới</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <DataTable
            data={customers}
            columns={columns}
            title="Danh sách khách hàng"
            onAdd={handleAddCustomer}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
        </TabsContent>

        <TabsContent value="loyal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng thân thiết</CardTitle>
              <CardDescription>
                Danh sách khách hàng đã có hơn 10 lần mua hàng.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chức năng đang phát triển.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Khách hàng mới</CardTitle>
              <CardDescription>
                Khách hàng mới trong 30 ngày gần đây.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Chức năng đang phát triển.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? "Cập nhật khách hàng" : "Thêm khách hàng mới"}
            </DialogTitle>
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
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn giới tính" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Khác">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {editingCustomer ? "Cập nhật" : "Thêm mới"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} />
              <span>Phân tích khách hàng</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tổng khách hàng:</span>
                <span className="font-medium">{customers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nam:</span>
                <span className="font-medium">{customers.filter(c => c.gioiTinh === "Nam").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nữ:</span>
                <span className="font-medium">{customers.filter(c => c.gioiTinh === "Nữ").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin size={20} />
              <span>Phân bố địa lý</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quận 1:</span>
                <span className="font-medium">{customers.filter(c => c.diaChiKH.includes("Q.1")).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quận 3:</span>
                <span className="font-medium">{customers.filter(c => c.diaChiKH.includes("Q.3")).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quận 5:</span>
                <span className="font-medium">{customers.filter(c => c.diaChiKH.includes("Q.5")).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Khác:</span>
                <span className="font-medium">
                  {customers.filter(c => !c.diaChiKH.includes("Q.1") && !c.diaChiKH.includes("Q.3") && !c.diaChiKH.includes("Q.5")).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customers;
