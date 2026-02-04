"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ArrowLeft,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, ScrollReveal } from "@/components/motion";
import { formatCurrency } from "@/lib/utils";

const orders = [
  {
    id: "ORD-2024-001",
    date: "February 1, 2024",
    status: "DELIVERED",
    total: 4999,
    items: [
      {
        name: "Premium Cotton Tee",
        quantity: 1,
        price: 1499,
        size: "M",
        color: "Black",
      },
      {
        name: "Classic Denim Jacket",
        quantity: 1,
        price: 3500,
        size: "L",
        color: "Blue",
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "January 28, 2024",
    status: "SHIPPED",
    total: 2499,
    items: [
      {
        name: "Silk Blend Shirt",
        quantity: 1,
        price: 2499,
        size: "M",
        color: "White",
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "January 20, 2024",
    status: "PROCESSING",
    total: 7499,
    items: [
      {
        name: "Tailored Chinos",
        quantity: 2,
        price: 2799,
        size: "32",
        color: "Khaki",
      },
      {
        name: "Merino Wool Sweater",
        quantity: 1,
        price: 1901,
        size: "L",
        color: "Grey",
      },
    ],
  },
  {
    id: "ORD-2024-004",
    date: "January 15, 2024",
    status: "CANCELLED",
    total: 1499,
    items: [
      {
        name: "Basic Polo",
        quantity: 1,
        price: 1499,
        size: "S",
        color: "Navy",
      },
    ],
  },
];

const statusConfig: Record<
  string,
  { icon: typeof Package; className: string; label: string }
> = {
  PENDING: {
    icon: Clock,
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    label: "Pending",
  },
  PROCESSING: {
    icon: Package,
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    label: "Processing",
  },
  SHIPPED: {
    icon: Truck,
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    label: "Shipped",
  },
  DELIVERED: {
    icon: CheckCircle,
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    label: "Delivered",
  },
  CANCELLED: {
    icon: XCircle,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    label: "Cancelled",
  },
};

export default function OrdersPage() {
  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-muted-foreground">
                {orders.length} orders placed
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {orders.map((order, index) => {
            const status = statusConfig[order.status];
            const StatusIcon = status.icon;

            return (
              <ScrollReveal key={order.id} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-muted/30 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-background">
                          <StatusIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {order.id}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <Badge className={status.className}>{status.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex justify-between items-center py-2 border-b last:border-0"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} • Color: {item.color} • Qty:{" "}
                              {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(item.price)}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Order Total
                        </span>
                        <p className="text-xl font-bold">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
