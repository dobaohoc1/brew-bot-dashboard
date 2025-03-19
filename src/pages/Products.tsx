
import { useState, useEffect } from "react";
import { DataTable } from "@/components/tables/DataTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useForm, Controller } from "react-hook-form";
import { Loader2 } from "lucide-react";

// Mocked products data
const mockProducts = [
  { id: "1", name: "Espresso", category: "Hot Drinks", price: "2.50", stock: "100" },
  { id: "2", name: "Cappuccino", category: "Hot Drinks", price: "3.50", stock: "85" },
  { id: "3", name: "Latte", category: "Hot Drinks", price: "3.75", stock: "92" },
  { id: "4", name: "Americano", category: "Hot Drinks", price: "3.00", stock: "110" },
  { id: "5", name: "Mocha", category: "Hot Drinks", price: "4.00", stock: "75" },
  { id: "6", name: "Iced Coffee", category: "Cold Drinks", price: "3.25", stock: "68" },
  { id: "7", name: "Iced Latte", category: "Cold Drinks", price: "4.00", stock: "72" },
  { id: "8", name: "Frappuccino", category: "Cold Drinks", price: "4.50", stock: "60" },
  { id: "9", name: "Cold Brew", category: "Cold Drinks", price: "3.75", stock: "55" },
  { id: "10", name: "Croissant", category: "Pastries", price: "2.50", stock: "40" },
  { id: "11", name: "Chocolate Muffin", category: "Pastries", price: "2.75", stock: "35" },
  { id: "12", name: "Cookies", category: "Pastries", price: "1.50", stock: "60" },
];

const columns = [
  { key: "name", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price ($)" },
  { key: "stock", label: "In Stock" },
];

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  stock: string;
}

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<typeof mockProducts[0] | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();

  useEffect(() => {
    if (editingProduct) {
      reset({
        name: editingProduct.name,
        category: editingProduct.category,
        price: editingProduct.price,
        stock: editingProduct.stock,
      });
    } else {
      reset({
        name: "",
        category: "",
        price: "",
        stock: "",
      });
    }
  }, [editingProduct, reset]);

  const onSubmit = (data: ProductFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingProduct) {
        // Update existing product
        setProducts(
          products.map((product) =>
            product.id === editingProduct.id
              ? { ...product, ...data }
              : product
          )
        );
        toast({
          title: "Product updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        // Add new product
        const newProduct = {
          id: (products.length + 1).toString(),
          ...data,
        };
        setProducts([...products, newProduct]);
        toast({
          title: "Product added",
          description: `${data.name} has been added successfully.`,
        });
      }
      
      setIsLoading(false);
      setDialogOpen(false);
      setEditingProduct(null);
    }, 800);
  };

  const handleDelete = (product: typeof mockProducts[0]) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
      toast({
        title: "Product deleted",
        description: `${product.name} has been deleted successfully.`,
        variant: "destructive",
      });
    }
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product: typeof mockProducts[0]) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products Management</h1>
      <p className="text-muted-foreground">
        Manage your coffee shop products, prices, and inventory levels.
      </p>

      <DataTable
        data={products}
        columns={columns}
        title="Products List"
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update the product details below."
                : "Fill in the details to add a new product."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Product name is required" }}
                  render={({ field }) => (
                    <Input id="name" {...field} />
                  )}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot Drinks">Hot Drinks</SelectItem>
                        <SelectItem value="Cold Drinks">Cold Drinks</SelectItem>
                        <SelectItem value="Pastries">Pastries</SelectItem>
                        <SelectItem value="Snacks">Snacks</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Controller
                    name="price"
                    control={control}
                    rules={{ 
                      required: "Price is required",
                      pattern: { 
                        value: /^\d+(\.\d{1,2})?$/, 
                        message: "Enter a valid price" 
                      } 
                    }}
                    render={({ field }) => (
                      <Input id="price" {...field} />
                    )}
                  />
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Controller
                    name="stock"
                    control={control}
                    rules={{ 
                      required: "Stock is required",
                      pattern: { 
                        value: /^\d+$/, 
                        message: "Enter a valid stock number" 
                      } 
                    }}
                    render={({ field }) => (
                      <Input id="stock" {...field} />
                    )}
                  />
                  {errors.stock && (
                    <p className="text-sm text-destructive">{errors.stock.message}</p>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
