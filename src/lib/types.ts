export interface NguoiDung {
  maKhachHang: string;
  tenKhachHang: string;
  soDienThoai: string;
  matKhau: string;
  email: string;
}

export interface PhanQuyen {
  maQuyen: string;
  tenQuyen: string;
}

export interface NhanVien {
  maNhanVien: string;
  tenNhanVien: string;
  ngaySinh: string;
}

export interface ThanhToan {
  maThanhToan: string;
  tenPhuongThucThanhToan: string;
}

export interface KhachHang {
  maKH: string;
  tenKH: string;
  SDT: string;
  diaChiKH: string;
  gioiTinh: string;
}

export interface LoaiSanPham {
  maLoai: string;
  tenLoai: string;
}

export interface SanPham {
  maSanPham: string;
  tenSanPham: string;
  loaiSanPham?: string;
  giaBan?: string;
  trangThai?: string;
  moTa?: string;
  hinhAnh?: string;
}

export interface PhieuKhuyenMai {
  maPhieuKhuyenMai: string;
  tenPhieuKhuyenMai: string;
}

export interface KhaCungCap {
  maKhaCungCap: string;
  tenNhaCungCap: string;
}

export interface PhanVu {
  maPhanVu: string;
}

export interface ThucUong {
  maThucUong: string;
}

export interface Quantity {
  maQuanLy: string;
}

export interface HoaDon {
  maHoaDon: string;
}

export interface Employee {
  id: string;
  fullName: string;
  position: string;
  phoneNumber: string;
  email: string;
  startDate: string;
  status: string;
  avatar?: string;
}
