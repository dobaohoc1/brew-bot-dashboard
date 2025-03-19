
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Coffee, Users, ShoppingBag, DollarSign } from "lucide-react";

const mockSalesData = [
  { name: "Mon", value: 43 },
  { name: "Tue", value: 58 },
  { name: "Wed", value: 65 },
  { name: "Thu", value: 74 },
  { name: "Fri", value: 87 },
  { name: "Sat", value: 98 },
  { name: "Sun", value: 76 },
];

const mockProductData = [
  { name: "Espresso", value: 120 },
  { name: "Cappuccino", value: 98 },
  { name: "Latte", value: 86 },
  { name: "Americano", value: 72 },
  { name: "Mocha", value: 60 },
];

const StatCard = ({ title, value, icon, trend, className }: { title: string; value: string; icon: React.ReactNode; trend?: string; className?: string }) => (
  <Card className={`overflow-hidden ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <p className="text-xs text-muted-foreground mt-1">
          {trend}
        </p>
      )}
    </CardContent>
  </Card>
);

const Dashboard = () => {
  // Simulate loading dashboard data
  useEffect(() => {
    // This would be a real API call in a production app
    const loadDashboardData = async () => {
      // await dashboardApi.getData();
    };
    
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-coffee-800">Welcome to Coffee Shop Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Sales" 
          value="$12,456" 
          icon={<DollarSign className="h-4 w-4" />} 
          trend="+12.3% from last month"
          className="animate-slideInFromLeft"
          />
        <StatCard 
          title="Customers" 
          value="1,234" 
          icon={<Users className="h-4 w-4" />} 
          trend="+5.3% new customers"
          className="animate-slideInFromLeft"
          style={{animationDelay: "0.1s"}}
          />
        <StatCard 
          title="Products" 
          value="25" 
          icon={<Coffee className="h-4 w-4" />} 
          trend="3 new this month"
          className="animate-slideInFromLeft"
          style={{animationDelay: "0.2s"}}
          />
        <StatCard 
          title="Orders" 
          value="846" 
          icon={<ShoppingBag className="h-4 w-4" />} 
          trend="+18.2% from last week"
          className="animate-slideInFromLeft"
          style={{animationDelay: "0.3s"}}
          />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="animate-slideInFromBottom" style={{animationDelay: "0.4s"}}>
          <CardHeader>
            <CardTitle>Weekly Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#a68057" strokeWidth={2} dot={{ stroke: '#a68057', strokeWidth: 2, r: 4 }} activeDot={{ stroke: '#a68057', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slideInFromBottom" style={{animationDelay: "0.5s"}}>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockProductData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#a68057" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 animate-slideInFromBottom" style={{animationDelay: "0.6s"}}>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2,, 3, 4].map((_, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-md">
                  <div>
                    <div className="font-medium">Order #{Math.floor(Math.random() * 10000)}</div>
                    <div className="text-sm text-muted-foreground">Customer: John Doe</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${Math.floor(Math.random() * 100)}.00</div>
                    <div className="text-sm text-muted-foreground">Today, {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-slideInFromBottom" style={{animationDelay: "0.7s"}}>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Coffee Beans", "Milk", "Sugar", "Cups", "Lids"].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    index % 3 === 0 ? "bg-red-100 text-red-700" : 
                    index % 3 === 1 ? "bg-yellow-100 text-yellow-700" : 
                    "bg-green-100 text-green-700"
                  }`}>
                    {index % 3 === 0 ? "Low" : index % 3 === 1 ? "Medium" : "Good"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
