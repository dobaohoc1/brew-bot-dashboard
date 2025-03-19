
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ChevronLeft, ChevronRight, Plus, Trash, Edit } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  title: string;
  onAdd?: () => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export function DataTable<T>({
  data,
  columns,
  title,
  onAdd,
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search term
  const filteredData = data.filter((item) => {
    return Object.values(item as object).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Paginate data
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/70" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full md:w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {onAdd && (
            <Button
              size="sm"
              className="h-9 gap-1"
              onClick={onAdd}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add New</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key}>{column.label}</TableHead>
                ))}
                {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="transition-colors hover:bg-muted/50"
                  >
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.key}`}>
                        {(row as any)[column.key]}
                      </TableCell>
                    ))}
                    {(onEdit || onDelete) && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => onEdit(row)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => onDelete(row)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-1 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
