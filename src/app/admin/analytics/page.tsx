"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn, ScrollReveal } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Mock data
const revenueData = [
  { month: "Jan", revenue: 45000, orders: 120 },
  { month: "Feb", revenue: 52000, orders: 145 },
  { month: "Mar", revenue: 48000, orders: 132 },
  { month: "Apr", revenue: 61000, orders: 178 },
  { month: "May", revenue: 55000, orders: 156 },
  { month: "Jun", revenue: 67000, orders: 198 },
  { month: "Jul", revenue: 72000, orders: 215 },
];

const categoryData = [
  { name: "T-Shirts", value: 35, color: "#8B5CF6" },
  { name: "Shirts", value: 25, color: "#06B6D4" },
  { name: "Pants", value: 20, color: "#10B981" },
  { name: "Jackets", value: 12, color: "#F59E0B" },
  { name: "Other", value: 8, color: "#6B7280" },
];

const topProducts = [
  { name: "Premium Cotton Tee", sales: 156, revenue: 233844 },
  { name: "Classic Denim Jacket", sales: 89, revenue: 355911 },
  { name: "Silk Blend Shirt", sales: 72, revenue: 179928 },
  { name: "Tailored Chinos", sales: 65, revenue: 181935 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your store performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Revenue",
              value: formatCurrency(452000),
              change: "+12.5%",
              positive: true,
              icon: DollarSign,
            },
            {
              label: "Total Orders",
              value: "1,234",
              change: "+8.2%",
              positive: true,
              icon: ShoppingCart,
            },
            {
              label: "New Customers",
              value: "856",
              change: "+15.1%",
              positive: true,
              icon: Users,
            },
            {
              label: "Avg Order Value",
              value: formatCurrency(3664),
              change: "-2.3%",
              positive: false,
              icon: Package,
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        stat.positive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.positive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ScrollReveal>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Overview</CardTitle>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  +18.2%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
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
                          stopColor="hsl(var(--color-primary))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--color-primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--color-border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--color-muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--color-popover))",
                        border: "1px solid hsl(var(--color-border))",
                        borderRadius: "8px",
                        color: "hsl(var(--color-popover-foreground))",
                      }}
                      itemStyle={{ color: "hsl(var(--color-foreground))" }}
                      labelStyle={{ color: "hsl(var(--color-foreground))" }}
                      formatter={(value) =>
                        typeof value === "number"
                          ? [formatCurrency(value), "Revenue"]
                          : ["", ""]
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--color-primary))"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Orders Chart */}
        <ScrollReveal delay={0.1}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Orders by Month</CardTitle>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  +12.8%
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--color-border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--color-muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--color-muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--color-popover))",
                        border: "1px solid hsl(var(--color-border))",
                        borderRadius: "8px",
                        color: "hsl(var(--color-popover-foreground))",
                      }}
                      itemStyle={{ color: "hsl(var(--color-foreground))" }}
                      labelStyle={{ color: "hsl(var(--color-foreground))" }}
                    />
                    <Bar
                      dataKey="orders"
                      fill="hsl(var(--color-primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <ScrollReveal delay={0.2}>
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--color-popover))",
                        border: "1px solid hsl(var(--color-border))",
                        borderRadius: "8px",
                        color: "hsl(var(--color-popover-foreground))",
                      }}
                      itemStyle={{ color: "hsl(var(--color-foreground))" }}
                      labelStyle={{ color: "hsl(var(--color-foreground))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Top Products */}
        <ScrollReveal delay={0.3}>
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-3 border-2 border-border bg-card hover:translate-x-1 hover:-translate-y-1 transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sales} sales
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {formatCurrency(product.revenue)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
