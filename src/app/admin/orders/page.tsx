"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  Eye,
  Truck,
  XCircle,
  CheckCircle,
  Clock,
  Package,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

// Mock orders data
const orders = [
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    product: "Premium Cotton Tee",
    amount: 1499,
    status: "DELIVERED",
    date: "2 hours ago",
  },
  {
    id: "ORD-002",
    customer: "Priya Patel",
    email: "priya@example.com",
    product: "Classic Denim Jacket",
    amount: 3999,
    status: "SHIPPED",
    date: "5 hours ago",
  },
  {
    id: "ORD-003",
    customer: "Amit Kumar",
    email: "amit@example.com",
    product: "Silk Blend Shirt",
    amount: 2499,
    status: "PROCESSING",
    date: "1 day ago",
  },
  {
    id: "ORD-004",
    customer: "Neha Singh",
    email: "neha@example.com",
    product: "Tailored Chinos",
    amount: 2799,
    status: "PENDING",
    date: "1 day ago",
  },
  {
    id: "ORD-005",
    customer: "Vikram Reddy",
    email: "vikram@example.com",
    product: "Merino Wool Sweater",
    amount: 3499,
    status: "CANCELLED",
    date: "2 days ago",
  },
];

const statusConfig: Record<
  string,
  { icon: typeof Package; className: string }
> = {
  PENDING: {
    icon: Clock,
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  PROCESSING: {
    icon: Package,
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  SHIPPED: {
    icon: Truck,
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  },
  DELIVERED: {
    icon: CheckCircle,
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
  CANCELLED: {
    icon: XCircle,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            {
              label: "Total Orders",
              value: orders.length,
              icon: Package,
              color: "bg-primary/10 text-primary",
            },
            {
              label: "Pending",
              value: orders.filter((o) => o.status === "PENDING").length,
              icon: Clock,
              color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600",
            },
            {
              label: "Shipped",
              value: orders.filter((o) => o.status === "SHIPPED").length,
              icon: Truck,
              color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
            },
            {
              label: "Delivered",
              value: orders.filter((o) => o.status === "DELIVERED").length,
              icon: CheckCircle,
              color: "bg-green-100 dark:bg-green-900/30 text-green-600",
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="SHIPPED">Shipped</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Orders Table */}
      <FadeIn delay={0.3}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                      Product
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                      Date
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredOrders.map((order, index) => {
                      const status = statusConfig[order.status];
                      return (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                        >
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{order.customer}</p>
                              <p className="text-sm text-muted-foreground">
                                {order.email}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            {order.product}
                          </td>
                          <td className="p-4 font-semibold">
                            {formatCurrency(order.amount)}
                          </td>
                          <td className="p-4">
                            <Badge className={status.className}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="p-4 hidden lg:table-cell text-muted-foreground">
                            {order.date}
                          </td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Truck className="mr-2 h-4 w-4" />
                                  Update Status
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredOrders.length} of {orders.length} orders
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-primary-foreground"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
