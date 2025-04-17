
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, BarChart3, Users, ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Landing = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-coffee-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 md:pt-24 pb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-coffee-800">
              Quản lý hiệu quả <br />
              <span className="text-coffee-600">cửa hàng cà phê</span> của bạn
            </h1>
            <p className="text-lg md:text-xl text-coffee-700 max-w-2xl">
              Hệ thống quản lý toàn diện giúp bạn theo dõi doanh số, quản lý đơn hàng,
              và tối ưu hóa hoạt động kinh doanh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-coffee-600 hover:bg-coffee-700 text-white"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Link to="/dashboard">
                  Bắt đầu ngay 
                  <ArrowRight className={`ml-2 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Đăng nhập</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -z-10 bg-coffee-200 w-72 h-72 rounded-full blur-3xl opacity-30 -top-10 -right-10"></div>
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-coffee-200">
              <img
                src="/placeholder.svg"
                alt="Dashboard Preview"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-4 rounded-lg shadow-lg backdrop-blur-sm">
                  <p className="text-coffee-800 font-medium">Xem tổng quan doanh số của bạn qua thời gian thực</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-coffee-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-800 mb-4">Tính năng nổi bật</h2>
            <p className="text-coffee-600 max-w-2xl mx-auto">
              Hệ thống đa năng giúp bạn quản lý mọi khía cạnh của cửa hàng cà phê
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<BarChart3 className="h-10 w-10 text-coffee-600" />}
              title="Phân tích báo cáo"
              description="Trực quan hóa dữ liệu kinh doanh và theo dõi xu hướng doanh số"
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-coffee-600" />}
              title="Quản lý nhân viên"
              description="Lên lịch, phân công và theo dõi hiệu suất của nhân viên"
            />
            <FeatureCard 
              icon={<ShoppingCart className="h-10 w-10 text-coffee-600" />}
              title="Quản lý đơn hàng"
              description="Theo dõi đơn hàng và quản lý kho hàng một cách hiệu quả"
            />
            <FeatureCard 
              icon={<Coffee className="h-10 w-10 text-coffee-600" />}
              title="Quản lý sản phẩm"
              description="Dễ dàng cập nhật menu và quản lý giá cả sản phẩm"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-coffee-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-coffee-800 mb-4">
              Sẵn sàng nâng cao hiệu quả kinh doanh?
            </h2>
            <p className="text-coffee-600 mb-8">
              Bắt đầu sử dụng hệ thống ngay hôm nay và trải nghiệm sự khác biệt
            </p>
            <Button asChild size="lg" className="bg-coffee-600 hover:bg-coffee-700 text-white">
              <Link to="/dashboard">
                Vào trang quản lý 
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-coffee-800 text-coffee-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Coffee className="h-6 w-6 mr-2" />
              <span className="text-xl font-bold">Brew Bot</span>
            </div>
            <div className="text-sm text-coffee-300">
              © {new Date().getFullYear()} Brew Bot Dashboard. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 border-coffee-200 bg-white">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-coffee-800 mb-2">{title}</h3>
        <p className="text-coffee-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Landing;
