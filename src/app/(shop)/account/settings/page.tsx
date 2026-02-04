"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Palette,
  Save,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FadeIn, ScrollReveal } from "@/components/motion";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true,
    promotions: true,
    newsletter: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <FadeIn>
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/account">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account preferences
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {/* Profile */}
          <ScrollReveal>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Full Name
                    </label>
                    <Input defaultValue={session?.user?.name || ""} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email
                    </label>
                    <Input defaultValue={session?.user?.email || ""} disabled />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone Number
                  </label>
                  <Input placeholder="+91 98765 43210" />
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Notifications */}
          <ScrollReveal delay={0.1}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Choose what updates you receive
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "orders",
                    label: "Order Updates",
                    description: "Get notified about your order status",
                  },
                  {
                    key: "promotions",
                    label: "Promotions",
                    description: "Receive exclusive offers and discounts",
                  },
                  {
                    key: "newsletter",
                    label: "Newsletter",
                    description: "Weekly fashion tips and new arrivals",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-2"
                  >
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <Switch
                      checked={
                        notifications[item.key as keyof typeof notifications]
                      }
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          [item.key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Security */}
          <ScrollReveal delay={0.2}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>Manage your password</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Current Password
                  </label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      New Password
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Confirm Password
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Appearance */}
          <ScrollReveal delay={0.3}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize your experience</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Use the theme toggle in the header to switch between light and
                  dark mode.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end"
          >
            <Button onClick={handleSave} className="gap-2" size="lg">
              {saved ? (
                <>
                  <Check className="h-4 w-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
