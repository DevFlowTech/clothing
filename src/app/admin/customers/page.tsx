"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MoreHorizontal,
  Eye,
  Mail,
  Ban,
  Users,
  UserPlus,
  UserCheck,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FadeIn } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

// Mock customers data
const customers = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    avatar: null,
    orders: 12,
    spent: 45999,
    status: "ACTIVE",
    joinedDate: "Jan 2024",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    avatar: null,
    orders: 8,
    spent: 32499,
    status: "ACTIVE",
    joinedDate: "Dec 2023",
  },
  {
    id: "3",
    name: "Amit Kumar",
    email: "amit@example.com",
    avatar: null,
    orders: 5,
    spent: 18999,
    status: "ACTIVE",
    joinedDate: "Feb 2024",
  },
  {
    id: "4",
    name: "Neha Singh",
    email: "neha@example.com",
    avatar: null,
    orders: 15,
    spent: 67500,
    status: "VIP",
    joinedDate: "Oct 2023",
  },
  {
    id: "5",
    name: "Vikram Reddy",
    email: "vikram@example.com",
    avatar: null,
    orders: 2,
    spent: 5999,
    status: "INACTIVE",
    joinedDate: "Jan 2024",
  },
];

const statusColors: Record<string, string> = {
  ACTIVE:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  VIP: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  INACTIVE: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer base</p>
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
              label: "Total Customers",
              value: customers.length,
              icon: Users,
              color: "bg-primary/10 text-primary",
            },
            {
              label: "Active",
              value: customers.filter((c) => c.status === "ACTIVE").length,
              icon: UserCheck,
              color: "bg-green-100 dark:bg-green-900/30 text-green-600",
            },
            {
              label: "VIP",
              value: customers.filter((c) => c.status === "VIP").length,
              icon: UserPlus,
              color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
            },
            {
              label: "Total Revenue",
              value: formatCurrency(
                customers.reduce((sum, c) => sum + c.spent, 0),
              ),
              icon: ShoppingBag,
              color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
              isText: true,
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

      {/* Search */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Customers Table */}
      <FadeIn delay={0.3}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Customer
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                      Orders
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Total Spent
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                      Joined
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredCustomers.map((customer, index) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={customer.avatar || undefined} />
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {getInitials(customer.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {customer.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          {customer.orders}
                        </td>
                        <td className="p-4 font-semibold">
                          {formatCurrency(customer.spent)}
                        </td>
                        <td className="p-4">
                          <Badge className={statusColors[customer.status]}>
                            {customer.status}
                          </Badge>
                        </td>
                        <td className="p-4 hidden lg:table-cell text-muted-foreground">
                          {customer.joinedDate}
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
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Ban className="mr-2 h-4 w-4" />
                                Block User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {filteredCustomers.length} of {customers.length}{" "}
                customers
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
