
import { useState } from "react";
import { 
  Plus, 
  Filter, 
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { SanPham } from "@/lib/types";
import { sanPhamApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch products data
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => sanPhamApi.getAll(),
  });

  // Define columns for the DataTable
  const columns = [
    {
      key: "maSanPham",
      label: "Mã SP",
    },
    {
      key: "tenSanPham",
      label: "Tên sản phẩm",
    },
    {
      key: "loaiSanPham",
      label: "Loại",
    },
    {
      key: "giaBan",
      label: "Giá bán",
    },
    {
      key: "trangThai",
      label: "Trạng thái",
    },
  ];

  // Mock products data for preview (will be replaced by API data in production)
  const mockProducts = [
    {
      maSanPham: "SP001",
      tenSanPham: "Cà phê sữa đá",
      loaiSanPham: "Cà phê",
      giaBan: "29,000 ₫",
      trangThai: "Còn hàng",
    },
    {
      maSanPham: "SP002",
      tenSanPham: "Cà phê đen đá",
      loaiSanPham: "Cà phê",
      giaBan: "25,000 ₫",
      trangThai: "Còn hàng",
    },
    {
      maSanPham: "SP003",
      tenSanPham: "Bạc xỉu",
      loaiSanPham: "Cà phê",
      giaBan: "32,000 ₫",
      trangThai: "Còn hàng",
    },
    {
      maSanPham: "SP004",
      tenSanPham: "Trà đào cam sả",
      loaiSanPham: "Trà",
      giaBan: "35,000 ₫",
      trangThai: "Còn hàng",
    },
    {
      maSanPham: "SP005",
      tenSanPham: "Trà sữa trân châu",
      loaiSanPham: "Trà sữa",
      giaBan: "40,000 ₫",
      trangThai: "Hết hàng",
    },
    {
      maSanPham: "SP006",
      tenSanPham: "Matcha đá xay",
      loaiSanPham: "Đá xay",
      giaBan: "45,000 ₫",
      trangThai: "Còn hàng",
    },
    {
      maSanPham: "SP007",
      tenSanPham: "Sinh tố xoài",
      loaiSanPham: "Sinh tố",
      giaBan: "38,000 ₫",
      trangThai: "Còn hàng",
    },
  ];

  const handleAddProduct = () => {
    // Navigate to add product page or open modal
    console.log("Add product clicked");
  };

  const handleEditProduct = (product: any) => {
    console.log("Edit product:", product);
  };

  const handleDeleteProduct = (product: any) => {
    console.log("Delete product:", product);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold">Danh sách sản phẩm</h1>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="gap-2" onClick={handleAddProduct}>
            <Plus size={16} />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-primary">{mockProducts.length}</div>
            <div className="text-sm text-muted-foreground mt-2">Tổng số sản phẩm</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-green-500">6</div>
            <div className="text-sm text-muted-foreground mt-2">Còn hàng</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-red-500">1</div>
            <div className="text-sm text-muted-foreground mt-2">Hết hàng</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-blue-500">4</div>
            <div className="text-sm text-muted-foreground mt-2">Loại sản phẩm</div>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={mockProducts}
        columns={columns}
        title="Sản phẩm"
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductList;
