"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  Package,
  Heart,
  MapPin,
  LogOut,
  Settings,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FadeIn,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

const menuItems = [
  { icon: Package, label: "My Orders", href: "/account/orders", count: 3 },
  { icon: Heart, label: "Wishlist", href: "/wishlist", count: 5 },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: Settings, label: "Settings", href: "/account/settings" },
];

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "Feb 1, 2024",
    status: "DELIVERED",
    total: 4999,
    items: 2,
  },
  {
    id: "ORD-2024-002",
    date: "Jan 28, 2024",
    status: "SHIPPED",
    total: 2499,
    items: 1,
  },
  {
    id: "ORD-2024-003",
    date: "Jan 20, 2024",
    status: "PROCESSING",
    total: 7499,
    items: 3,
  },
];

const statusColors: Record<string, string> = {
  PENDING: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
  PROCESSING: "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
  SHIPPED: "text-purple-600 bg-purple-100 dark:bg-purple-900/30",
  DELIVERED: "text-green-600 bg-green-100 dark:bg-green-900/30",
};

export default function AccountPage() {
  const { data: session } = useSession();
  const user = session?.user;

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FadeIn>
              <Card className="sticky top-28">
                <CardContent className="p-6">
                  {/* Profile */}
                  <div className="text-center mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="inline-block"
                    >
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={user?.image || undefined} />
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                          {getInitials(user?.name)}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <h2 className="font-semibold text-lg">
                      {user?.name || "User"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    {user?.role === "ADMIN" && (
                      <Link href="/admin" className="w-full block mt-4">
                        <Button
                          variant="outline"
                          className="w-full gap-2 border-amber-500/50 text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-950/30"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Menu */}
                  <nav className="space-y-1">
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.count && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {item.count}
                              </span>
                            )}
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Logout */}
                  <div className="mt-6 pt-6 border-t">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome */}
            <ScrollReveal>
              <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold mb-1">
                        Welcome back, {user?.name?.split(" ")[0] || "there"}!
                      </h1>
                      <p className="opacity-90">
                        Manage your orders, wishlist, and account settings
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        repeatDelay: 3,
                      }}
                    >
                      <ShoppingBag className="h-12 w-12 opacity-50" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Stats */}
            <StaggerContainer className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Package, label: "Total Orders", value: "12" },
                { icon: Heart, label: "Wishlist Items", value: "5" },
                { icon: CheckCircle, label: "Delivered", value: "10" },
              ].map((stat) => (
                <StaggerItem key={stat.label}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <stat.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Recent Orders */}
            <ScrollReveal delay={0.2}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/account/orders">View All</Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order, index) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/20 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-muted">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {order.date} • {order.items} items
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatCurrency(order.total)}
                          </p>
                          <span
                            className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                              statusColors[order.status]
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
