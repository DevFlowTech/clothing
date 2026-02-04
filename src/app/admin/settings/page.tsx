"use client";

import { useState } from "react";
import {
  Store,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Save,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn, ScrollReveal } from "@/components/motion";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "DEVFLOW",
    storeEmail: "hello@devflow.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
    orderNotifications: true,
    stockAlerts: true,
    marketingEmails: false,
    twoFactorAuth: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your store settings</p>
        </div>
        <Button className="gap-2" onClick={handleSave}>
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
      </FadeIn>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Store Settings */}
        <ScrollReveal>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Store className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Store Information</CardTitle>
                  <CardDescription>Basic store details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Store Name
                </label>
                <Input
                  value={settings.storeName}
                  onChange={(e) =>
                    setSettings({ ...settings, storeName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Store Email
                </label>
                <Input
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, storeEmail: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Localization */}
        <ScrollReveal delay={0.1}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Localization</CardTitle>
                  <CardDescription>Currency and timezone</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Currency
                </label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) =>
                    setSettings({ ...settings, currency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="GBP">British Pound (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Timezone
                </label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    setSettings({ ...settings, timezone: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Kolkata">
                      Asia/Kolkata (IST)
                    </SelectItem>
                    <SelectItem value="America/New_York">
                      America/New_York (EST)
                    </SelectItem>
                    <SelectItem value="Europe/London">
                      Europe/London (GMT)
                    </SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Notifications */}
        <ScrollReveal delay={0.2}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Email and alert preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  key: "orderNotifications",
                  label: "Order Notifications",
                  description: "Get notified for new orders",
                },
                {
                  key: "stockAlerts",
                  label: "Stock Alerts",
                  description: "Alert when products are low on stock",
                },
                {
                  key: "marketingEmails",
                  label: "Marketing Emails",
                  description: "Receive promotional updates",
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
                      settings[item.key as keyof typeof settings] as boolean
                    }
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Security */}
        <ScrollReveal delay={0.3}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Security and access settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, twoFactorAuth: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Temporarily disable storefront
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, maintenanceMode: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Payment */}
        <ScrollReveal delay={0.4}>
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment gateways</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold">
                        R
                      </div>
                      <div>
                        <p className="font-medium">Razorpay</p>
                        <p className="text-sm text-muted-foreground">
                          Cards, UPI, Wallets
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Input placeholder="Razorpay Key ID" className="mb-2" />
                  <Input placeholder="Razorpay Key Secret" type="password" />
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-green-600 flex items-center justify-center text-white font-bold">
                        C
                      </div>
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Pay when you receive
                        </p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    No configuration required for COD.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}
