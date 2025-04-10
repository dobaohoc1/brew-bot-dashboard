
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
import { HoaDon } from "@/lib/types";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Clock, CheckCircle, AlertCircle, Truck } from "lucide-react";

// Mock orders data
interface Order extends HoaDon {
  maHoaDon: string;
  khachHang: string;
  ngayDat: string;
  tongTien: number;
  trangThai: "pending" | "processing" | "completed" | "cancelled";
  thanhToan: "cash" | "card" | "momo" | "banking";
  sanPham: string[];
}

const mockOrders: Order[] = [
  { 
    maHoaDon: "HD001", 
    khachHang: "Nguyễn Văn A", 
    ngayDat: "2023-04-05", 
    tongTien: 150000, 
    trangThai: "completed", 
    thanhToan: "cash",
    sanPham: ["Cà phê sữa", "Bánh mì"]
  },
  { 
    maHoaDon: "HD002", 
    khachHang: "Trần Thị B", 
    ngayDat: "2023-04-06", 
    tongTien: 85000, 
    trangThai: "processing", 
    thanhToan: "momo",
    sanPham: ["Cappuccino", "Tiramisu"]
  },
  { 
    maHoaDon: "HD003", 
    khachHang: "Phạm Văn C", 
    ngayDat: "2023-04-06", 
    tongTien: 210000, 
    trangThai: "pending", 
    thanhToan: "card",
    sanPham: ["Latte", "Espresso", "Bánh flan"]
  },
  { 
    maHoaDon: "HD004", 
    khachHang: "Hoàng Thị D", 
    ngayDat: "2023-04-07", 
    tongTien: 65000, 
    trangThai: "cancelled", 
    thanhToan: "cash",
    sanPham: ["Trà sữa"]
  },
  { 
    maHoaDon: "HD005", 
    khachHang: "Lê Văn E", 
    ngayDat: "2023-04-07", 
    tongTien: 175000, 
    trangThai: "completed", 
    thanhToan: "banking",
    sanPham: ["Americano", "Sandwich", "Nước cam"]
  },
  { 
    maHoaDon: "HD006", 
    khachHang: "Đỗ Thị F", 
    ngayDat: "2023-04-08", 
    tongTien: 95000, 
    trangThai: "processing", 
    thanhToan: "card",
    sanPham: ["Mocha", "Cookies"]
  },
  { 
    maHoaDon: "HD007", 
    khachHang: "Ngô Văn G", 
    ngayDat: "2023-04-08", 
    tongTien: 120000, 
    trangThai: "completed", 
    thanhToan: "momo",
    sanPham: ["Trà đào", "Bánh Croissant"]
  },
  { 
    maHoaDon: "HD008", 
    khachHang: "Mai Thị H", 
    ngayDat: "2023-04-09", 
    tongTien: 145000, 
    trangThai: "pending", 
    thanhToan: "banking",
    sanPham: ["Cappuccino", "Bánh brownie"]
  },
];

const OrderStatusBadge = ({ status }: { status: Order["trangThai"] }) => {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Chờ xử lý</Badge>;
    case "processing":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Đang xử lý</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Hoàn thành</Badge>;
    case "cancelled":
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Đã hủy</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const PaymentMethodBadge = ({ method }: { method: Order["thanhToan"] }) => {
  switch (method) {
    case "cash":
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Tiền mặt</Badge>;
    case "card":
      return <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Thẻ</Badge>;
    case "momo":
      return <Badge variant="outline" className="bg-pink-100 text-pink-800 hover:bg-pink-100">MoMo</Badge>;
    case "banking":
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Banking</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const OrderDetailDialog = ({ order, open, onOpenChange }: { order: Order | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
  if (!order) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order.maHoaDon}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trạng thái:</span>
            <OrderStatusBadge status={order.trangThai} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Khách hàng:</span>
            <span className="font-medium">{order.khachHang}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Ngày đặt:</span>
            <span className="font-medium">{order.ngayDat}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Phương thức thanh toán:</span>
            <PaymentMethodBadge method={order.thanhToan} />
          </div>
          
          <div className="border-t pt-4 mt-2">
            <h4 className="font-medium mb-2">Sản phẩm:</h4>
            <ul className="space-y-2">
              {order.sanPham.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="border-t pt-4 mt-2 flex items-center justify-between">
            <span className="font-bold">Tổng tiền:</span>
            <span className="font-bold text-lg">{order.tongTien.toLocaleString('vi-VN')} đ</span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Đóng</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Orders = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const columns = [
    { key: "maHoaDon", label: "Mã HĐ" },
    { key: "khachHang", label: "Khách hàng" },
    { key: "ngayDat", label: "Ngày đặt" },
    { 
      key: "tongTien", 
      label: "Tổng tiền",
      // Format currency for display
      format: (value: number) => `${value.toLocaleString('vi-VN')} đ`
    },
    { 
      key: "trangThai", 
      label: "Trạng thái",
      // Custom render for status
      render: (value: Order["trangThai"]) => <OrderStatusBadge status={value} />
    },
    {
      key: "thanhToan",
      label: "Thanh toán",
      // Custom render for payment method
      render: (value: Order["thanhToan"]) => <PaymentMethodBadge method={value} />
    }
  ];

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleUpdateStatus = (order: Order, newStatus: Order["trangThai"]) => {
    setOrders(
      orders.map(o => 
        o.maHoaDon === order.maHoaDon 
          ? { ...o, trangThai: newStatus } 
          : o
      )
    );
    
    toast({
      title: "Cập nhật trạng thái",
      description: `Đơn hàng #${order.maHoaDon} đã được cập nhật sang trạng thái mới.`,
    });
  };

  const getPendingCount = () => orders.filter(o => o.trangThai === "pending").length;
  const getProcessingCount = () => orders.filter(o => o.trangThai === "processing").length;
  const getCompletedCount = () => orders.filter(o => o.trangThai === "completed").length;
  const getCancelledCount = () => orders.filter(o => o.trangThai === "cancelled").length;

  const getTotalRevenue = () => 
    orders
      .filter(o => o.trangThai === "completed")
      .reduce((sum, order) => sum + order.tongTien, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chờ xử lý
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getPendingCount()}</div>
            <p className="text-xs text-muted-foreground">
              Đơn hàng đang chờ xử lý
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Đang xử lý
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getProcessingCount()}</div>
            <p className="text-xs text-muted-foreground">
              Đơn hàng đang được xử lý
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Hoàn thành
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getCompletedCount()}</div>
            <p className="text-xs text-muted-foreground">
              Đơn hàng đã hoàn thành
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu
            </CardTitle>
            <span className="text-primary text-xs font-medium">Hôm nay</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalRevenue().toLocaleString('vi-VN')} đ</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 10) + 5}% so với hôm qua
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Tất cả đơn hàng</TabsTrigger>
          <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
          <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DataTable
            data={orders}
            columns={columns}
            title="Danh sách đơn hàng"
            onEdit={handleViewOrder}
          />
        </TabsContent>

        <TabsContent value="pending">
          <DataTable
            data={orders.filter(o => o.trangThai === "pending")}
            columns={columns}
            title="Đơn hàng chờ xử lý"
            onEdit={handleViewOrder}
          />
        </TabsContent>

        <TabsContent value="processing">
          <DataTable
            data={orders.filter(o => o.trangThai === "processing")}
            columns={columns}
            title="Đơn hàng đang xử lý"
            onEdit={handleViewOrder}
          />
        </TabsContent>

        <TabsContent value="completed">
          <DataTable
            data={orders.filter(o => o.trangThai === "completed")}
            columns={columns}
            title="Đơn hàng hoàn thành"
            onEdit={handleViewOrder}
          />
        </TabsContent>

        <TabsContent value="cancelled">
          <DataTable
            data={orders.filter(o => o.trangThai === "cancelled")}
            columns={columns}
            title="Đơn hàng đã hủy"
            onEdit={handleViewOrder}
          />
        </TabsContent>
      </Tabs>

      <OrderDetailDialog 
        order={selectedOrder}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
      />
    </div>
  );
};

export default Orders;
