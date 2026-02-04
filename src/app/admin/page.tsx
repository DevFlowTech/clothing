"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

// Mock data
const stats = [
  {
    title: "Total Revenue",
    value: "₹4,52,000",
    change: "+12.5%",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingBag,
  },
  {
    title: "Total Customers",
    value: "856",
    change: "+5.1%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Products",
    value: "124",
    change: "-2.3%",
    trend: "down" as const,
    icon: Package,
  },
];

const revenueData = [
  { name: "Jan", revenue: 35000 },
  { name: "Feb", revenue: 42000 },
  { name: "Mar", revenue: 38000 },
  { name: "Apr", revenue: 55000 },
  { name: "May", revenue: 48000 },
  { name: "Jun", revenue: 62000 },
  { name: "Jul", revenue: 71000 },
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Rahul Sharma",
    product: "Premium Cotton Tee",
    amount: 1499,
    status: "DELIVERED",
    date: "2 hours ago",
  },
  {
    id: "ORD-002",
    customer: "Priya Patel",
    product: "Classic Denim Jacket",
    amount: 3999,
    status: "SHIPPED",
    date: "5 hours ago",
  },
  {
    id: "ORD-003",
    customer: "Amit Kumar",
    product: "Silk Blend Shirt",
    amount: 2499,
    status: "PROCESSING",
    date: "1 day ago",
  },
  {
    id: "ORD-004",
    customer: "Sneha Reddy",
    product: "Tailored Chinos",
    amount: 2799,
    status: "PENDING",
    date: "1 day ago",
  },
];

const topProducts = [
  { name: "Premium Cotton Tee", sales: 156, revenue: 233844 },
  { name: "Classic Denim Jacket", sales: 89, revenue: 355911 },
  { name: "Silk Blend Shirt", sales: 72, revenue: 179928 },
  { name: "Merino Wool Sweater", sales: 65, revenue: 227435 },
];

const statusColors: Record<string, string> = {
  PENDING:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  CONFIRMED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  PROCESSING:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  SHIPPED:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  DELIVERED:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.title}>
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.trend === "up"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary" />
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Revenue Overview</CardTitle>
              <Button variant="outline" size="sm">
                This Month
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="currentColor"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="currentColor"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                      strokeOpacity={0.2}
                    />
                    <XAxis
                      dataKey="name"
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                      tickFormatter={(value) => `₹${value / 1000}K`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                      formatter={(value) =>
                        typeof value === "number"
                          ? [formatCurrency(value), "Revenue"]
                          : ["", ""]
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="currentColor"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Top Products */}
        <FadeIn delay={0.3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/products">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      #{index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.sales} sales
                      </p>
                    </div>
                    <span className="font-semibold text-sm">
                      {formatCurrency(product.revenue)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Recent Orders */}
      <FadeIn delay={0.4}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders" className="gap-2">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                      Product
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right p-3 text-sm font-medium text-muted-foreground hidden md:table-cell">
                      Date
                    </th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="p-3">
                        <span className="font-mono text-sm">{order.id}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-medium">{order.customer}</span>
                      </td>
                      <td className="p-3 hidden sm:table-cell">
                        <span className="text-sm text-muted-foreground truncate max-w-[150px] block">
                          {order.product}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold">
                          {formatCurrency(order.amount)}
                        </span>
                      </td>
                      <td className="p-3">
                        <Badge className={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-right hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {order.date}
                        </span>
                      </td>
                      <td className="p-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
