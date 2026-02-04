"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Tag,
  Percent,
  Calendar,
  CheckCircle,
  XCircle,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

// Mock coupons data
const coupons = [
  {
    id: "1",
    code: "DEVFLOW10",
    type: "PERCENTAGE",
    value: 10,
    minOrder: 1000,
    usageLimit: 100,
    usedCount: 45,
    status: "ACTIVE",
    expiresAt: "Mar 31, 2024",
  },
  {
    id: "2",
    code: "FLAT500",
    type: "FIXED",
    value: 500,
    minOrder: 2500,
    usageLimit: 50,
    usedCount: 23,
    status: "ACTIVE",
    expiresAt: "Feb 28, 2024",
  },
  {
    id: "3",
    code: "WELCOME20",
    type: "PERCENTAGE",
    value: 20,
    minOrder: 0,
    usageLimit: null,
    usedCount: 156,
    status: "ACTIVE",
    expiresAt: null,
  },
  {
    id: "4",
    code: "SUMMER25",
    type: "PERCENTAGE",
    value: 25,
    minOrder: 3000,
    usageLimit: 200,
    usedCount: 200,
    status: "EXPIRED",
    expiresAt: "Jan 31, 2024",
  },
];

export default function AdminCouponsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "PERCENTAGE",
    value: "",
    minOrder: "",
    usageLimit: "",
    expiresAt: "",
  });

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Coupons</h1>
          <p className="text-muted-foreground">
            Manage discount codes and promotions
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>
                Enter the details for your new discount coupon.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Coupon Code
                </label>
                <Input
                  placeholder="e.g., SUMMER20"
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Type</label>
                  <Select
                    value={newCoupon.type}
                    onValueChange={(value) =>
                      setNewCoupon({ ...newCoupon, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                      <SelectItem value="FIXED">Fixed Amount (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Value {newCoupon.type === "PERCENTAGE" ? "(%)" : "(₹)"}
                  </label>
                  <Input
                    type="number"
                    placeholder={newCoupon.type === "PERCENTAGE" ? "10" : "500"}
                    value={newCoupon.value}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, value: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Min Order (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={newCoupon.minOrder}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, minOrder: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Usage Limit
                  </label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={newCoupon.usageLimit}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, usageLimit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Expiry Date
                </label>
                <Input
                  type="date"
                  value={newCoupon.expiresAt}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, expiresAt: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={0.1}>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              label: "Active Coupons",
              value: coupons.filter((c) => c.status === "ACTIVE").length,
              icon: Tag,
              color: "bg-green-100 dark:bg-green-900/30 text-green-600",
            },
            {
              label: "Total Uses",
              value: coupons.reduce((sum, c) => sum + c.usedCount, 0),
              icon: Percent,
              color: "bg-primary/10 text-primary",
            },
            {
              label: "Expired",
              value: coupons.filter((c) => c.status === "EXPIRED").length,
              icon: Calendar,
              color: "bg-gray-100 dark:bg-gray-900/30 text-gray-600",
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
                placeholder="Search coupons..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Coupons Table */}
      <FadeIn delay={0.3}>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Code
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Discount
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                      Min Order
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                      Usage
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">
                      Expires
                    </th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filteredCoupons.map((coupon, index) => (
                      <motion.tr
                        key={coupon.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <code className="px-2 py-1 bg-muted rounded font-mono text-sm font-bold">
                              {coupon.code}
                            </code>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => copyToClipboard(coupon.code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4 font-semibold">
                          {coupon.type === "PERCENTAGE"
                            ? `${coupon.value}%`
                            : formatCurrency(coupon.value)}
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          {coupon.minOrder > 0
                            ? formatCurrency(coupon.minOrder)
                            : "No minimum"}
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          {coupon.usedCount} / {coupon.usageLimit || "∞"}
                        </td>
                        <td className="p-4">
                          <Badge
                            className={
                              coupon.status === "ACTIVE"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            }
                          >
                            {coupon.status === "ACTIVE" ? (
                              <CheckCircle className="mr-1 h-3 w-3" />
                            ) : (
                              <XCircle className="mr-1 h-3 w-3" />
                            )}
                            {coupon.status}
                          </Badge>
                        </td>
                        <td className="p-4 hidden lg:table-cell text-muted-foreground">
                          {coupon.expiresAt || "Never"}
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
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
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
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
