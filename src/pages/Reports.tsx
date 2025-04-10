
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker"; // Assuming this exists, if not we'll account for it
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  FileText, 
  Download, 
  BarChart3, 
  PieChart as PieChartIcon,
  TrendingUp,
  Calendar,
  Plus
} from "lucide-react";

// Mock sales data
const mockSalesData = [
  { name: "T1", value: 5200000 },
  { name: "T2", value: 4800000 },
  { name: "T3", value: 6100000 },
  { name: "T4", value: 5700000 },
  { name: "T5", value: 6300000 },
  { name: "T6", value: 5900000 },
  { name: "T7", value: 6500000 },
  { name: "T8", value: 7100000 },
  { name: "T9", value: 6800000 },
  { name: "T10", value: 7300000 },
  { name: "T11", value: 7800000 },
  { name: "T12", value: 8500000 },
];

// Mock product data
const mockProductData = [
  { name: "Espresso", value: 120 },
  { name: "Cappuccino", value: 98 },
  { name: "Latte", value: 86 },
  { name: "Americano", value: 72 },
  { name: "Mocha", value: 60 },
  { name: "Trà sữa", value: 45 },
  { name: "Trà đào", value: 38 },
];

// Mock pie chart data for payment methods
const mockPaymentData = [
  { name: "Tiền mặt", value: 45 },
  { name: "Thẻ", value: 25 },
  { name: "MoMo", value: 20 },
  { name: "Banking", value: 10 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Temporary DatePicker component if it doesn't exist
const DatePickerFallback = ({ label }: { label: string }) => (
  <div className="grid gap-2">
    <label className="text-sm font-medium">{label}</label>
    <Input type="date" className="w-full" />
  </div>
);

// Check if DatePicker component exists and use it, otherwise use fallback
const DatePickerComponent = ({ label }: { label: string }) => {
  // If a DatePicker component exists, we should use it
  // For now, let's use a fallback to ensure the code compiles
  return <DatePickerFallback label={label} />;
};

const Reports = () => {
  const [reportType, setReportType] = useState("sales");
  const [timeRange, setTimeRange] = useState("year");

  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Báo cáo và thống kê</h1>
        <Button className="flex items-center gap-2">
          <Download size={16} />
          <span>Xuất PDF</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh thu năm
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(70800000)}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% so với năm trước
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sản phẩm bán chạy
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Cappuccino</div>
            <p className="text-xs text-muted-foreground">
              98 đơn hàng trong tháng
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Phương thức thanh toán
            </CardTitle>
            <PieChartIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tiền mặt</div>
            <p className="text-xs text-muted-foreground">
              45% khách hàng sử dụng
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc báo cáo</CardTitle>
          <CardDescription>
            Tùy chỉnh thông tin báo cáo theo nhu cầu của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Loại báo cáo</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại báo cáo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Doanh thu</SelectItem>
                  <SelectItem value="products">Sản phẩm</SelectItem>
                  <SelectItem value="customers">Khách hàng</SelectItem>
                  <SelectItem value="payment">Thanh toán</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">Khoảng thời gian</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Hôm nay</SelectItem>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                  <SelectItem value="quarter">Quý này</SelectItem>
                  <SelectItem value="year">Năm nay</SelectItem>
                  <SelectItem value="custom">Tùy chỉnh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DatePickerComponent label="Từ ngày" />
            <DatePickerComponent label="Đến ngày" />
            
            <div className="col-span-full flex justify-end gap-2">
              <Button variant="outline">Đặt lại</Button>
              <Button>Áp dụng</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList>
          <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
          <TabsTrigger value="table">Bảng dữ liệu</TabsTrigger>
          <TabsTrigger value="summary">Tóm tắt</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Biểu đồ doanh thu theo tháng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockSalesData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip formatter={(value: number) => [formatCurrency(value), "Doanh thu"]} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Doanh thu"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top sản phẩm bán chạy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={mockProductData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Số lượng" fill="#a68057" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockPaymentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                      >
                        {mockPaymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bảng dữ liệu doanh thu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left font-medium">Tháng</th>
                      <th className="h-12 px-4 text-left font-medium">Doanh thu</th>
                      <th className="h-12 px-4 text-left font-medium">So với tháng trước</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSalesData.map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4">{item.name}</td>
                        <td className="p-4">{formatCurrency(item.value)}</td>
                        <td className="p-4">
                          {i > 0 ? (
                            <span className={item.value > mockSalesData[i-1].value ? "text-green-600" : "text-red-600"}>
                              {((item.value - mockSalesData[i-1].value) / mockSalesData[i-1].value * 100).toFixed(1)}%
                            </span>
                          ) : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tóm tắt báo cáo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phân tích doanh thu</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tổng doanh thu:</span>
                      <span className="font-medium">{formatCurrency(70800000)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Doanh thu trung bình tháng:</span>
                      <span className="font-medium">{formatCurrency(5900000)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tháng có doanh thu cao nhất:</span>
                      <span className="font-medium">Tháng 12 ({formatCurrency(8500000)})</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tháng có doanh thu thấp nhất:</span>
                      <span className="font-medium">Tháng 2 ({formatCurrency(4800000)})</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tăng trưởng so với năm trước:</span>
                      <span className="font-medium text-green-600">+12.5%</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Phân tích sản phẩm</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Tổng sản phẩm đã bán:</span>
                      <span className="font-medium">519 sản phẩm</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Sản phẩm bán chạy nhất:</span>
                      <span className="font-medium">Espresso (120)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Sản phẩm bán chậm nhất:</span>
                      <span className="font-medium">Trà đào (38)</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Doanh thu cao nhất từ:</span>
                      <span className="font-medium">Cappuccino</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Sản phẩm có lợi nhuận cao nhất:</span>
                      <span className="font-medium">Mocha</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-2">Kết luận và đề xuất</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Doanh thu có xu hướng tăng đều qua các tháng, với đỉnh điểm vào cuối năm (tháng 11, 12). Cần tận dụng cơ hội này bằng các chiến dịch khuyến mãi vào dịp lễ Tết.</p>
                  <p>Sản phẩm Espresso và Cappuccino là những sản phẩm bán chạy nhất, nên tập trung phát triển các biến thể của những sản phẩm này.</p>
                  <p>Phương thức thanh toán tiền mặt vẫn được ưa chuộng nhất (45%), nhưng thanh toán điện tử đang tăng lên. Nên phát triển thêm các ưu đãi cho khách hàng thanh toán qua MoMo và ngân hàng.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Lịch báo cáo</CardTitle>
          <CardDescription>
            Lên lịch cho các báo cáo định kỳ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Báo cáo doanh thu hàng tháng</h4>
                  <p className="text-xs text-muted-foreground">Gửi vào ngày 01 hàng tháng</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Chỉnh sửa</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Báo cáo sản phẩm hàng quý</h4>
                  <p className="text-xs text-muted-foreground">Gửi vào ngày đầu tiên của mỗi quý</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Chỉnh sửa</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Báo cáo khách hàng hàng năm</h4>
                  <p className="text-xs text-muted-foreground">Gửi vào ngày 31 tháng 12 hàng năm</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Chỉnh sửa</Button>
            </div>
            
            <Button className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Thêm lịch báo cáo mới
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
