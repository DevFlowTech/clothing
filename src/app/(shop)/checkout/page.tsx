"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  MapPin,
  Package,
  Loader2,
} from "lucide-react";
import { useCartStore } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard Delivery",
    price: 0,
    days: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Delivery",
    price: 200,
    days: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Delivery",
    price: 500,
    days: "Next business day",
  },
];

const PAYMENT_METHODS = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "upi", name: "UPI", icon: Package },
  { id: "cod", name: "Cash on Delivery", icon: MapPin },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [selectedPayment, setSelectedPayment] = useState("card");

  const [cardInfo, setCardInfo] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [orderNotes, setOrderNotes] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingCost =
    SHIPPING_OPTIONS.find((opt) => opt.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shippingCost + tax;

  // Validation functions
  const validateShippingInfo = () => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!shippingInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email))
      newErrors.email = "Invalid email format";
    if (!shippingInfo.phone.trim())
      newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(shippingInfo.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.state.trim()) newErrors.state = "State is required";
    if (!shippingInfo.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(shippingInfo.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    if (selectedPayment === "cod") return true;

    const newErrors: Record<string, string> = {};

    if (!cardInfo.number.trim())
      newErrors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(cardInfo.number.replace(/\s/g, "")))
      newErrors.cardNumber = "Invalid card number";
    if (!cardInfo.name.trim())
      newErrors.cardName = "Cardholder name is required";
    if (!cardInfo.expiry.trim())
      newErrors.cardExpiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiry))
      newErrors.cardExpiry = "Invalid format (MM/YY)";
    if (!cardInfo.cvv.trim()) newErrors.cardCvv = "CVV is required";
    else if (!/^\d{3}$/.test(cardInfo.cvv))
      newErrors.cardCvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateShippingInfo()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) {
      toast.error("Please fill in payment details correctly");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock order creation
      const orderId = `ORD-${Date.now()}`;

      toast.success("Order placed successfully!", {
        description: `Order ID: ${orderId}`,
      });

      clearCart();
      router.push(`/account/orders?success=true&orderId=${orderId}`);
    } catch (error) {
      toast.error("Failed to place order", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center p-8">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to proceed with checkout
            </p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Progress Steps */}
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex justify-between items-center text-sm tracking-widest uppercase border-b border-white/10 pb-4">
            <div
              className={cn(
                "flex items-center gap-2",
                currentStep >= 1 ? "text-white" : "text-white/40",
              )}
            >
              <span className="font-mono">01</span>
              <span className={currentStep === 1 ? "font-bold" : ""}>
                Shipping
              </span>
            </div>
            <div className="h-px w-8 bg-current opacity-20" />
            <div
              className={cn(
                "flex items-center gap-2",
                currentStep >= 2 ? "text-white" : "text-white/40",
              )}
            >
              <span className="font-mono">02</span>
              <span className={currentStep === 2 ? "font-bold" : ""}>
                Payment
              </span>
            </div>
            <div className="h-px w-8 bg-current opacity-20" />
            <div
              className={cn(
                "flex items-center gap-2",
                currentStep >= 3 ? "text-white" : "text-white/40",
              )}
            >
              <span className="font-mono">03</span>
              <span className={currentStep === 3 ? "font-bold" : ""}>
                Review
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 bg-white text-black flex items-center justify-center rounded-none">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-light uppercase tracking-tight text-white">
                        Shipping Details
                      </h2>
                    </div>

                    <div className="space-y-6 pt-2">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="fullName"
                            className="font-bold uppercase text-xs mb-1.5 block"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="fullName"
                            value={shippingInfo.fullName}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                fullName: e.target.value,
                              })
                            }
                            className={cn(
                              "rounded-none border-2 focus-visible:ring-0 transition-all",
                              errors.fullName
                                ? "border-red-500"
                                : "border-black/20 focus-visible:border-black",
                            )}
                          />
                          {errors.fullName && (
                            <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                              {errors.fullName}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="font-bold uppercase text-xs mb-1.5 block"
                          >
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                email: e.target.value,
                              })
                            }
                            className={cn(
                              "rounded-none border-2 focus-visible:ring-0 transition-all",
                              errors.email
                                ? "border-red-500"
                                : "border-black/20 focus-visible:border-black",
                            )}
                          />
                          {errors.email && (
                            <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="phone"
                          className="font-bold uppercase text-xs mb-1.5 block"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="10-digit mobile number"
                          className={cn(
                            "rounded-none border-2 focus-visible:ring-0 transition-all",
                            errors.phone
                              ? "border-red-500"
                              : "border-black/20 focus-visible:border-black",
                          )}
                        />
                        {errors.phone && (
                          <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label
                          htmlFor="address"
                          className="font-bold uppercase text-xs mb-1.5 block"
                        >
                          Address *
                        </Label>
                        <Input
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              address: e.target.value,
                            })
                          }
                          placeholder="House no., Street, Area"
                          className={cn(
                            "rounded-none border-2 focus-visible:ring-0 transition-all",
                            errors.address
                              ? "border-red-500"
                              : "border-black/20 focus-visible:border-black",
                          )}
                        />
                        {errors.address && (
                          <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <Label
                            htmlFor="city"
                            className="font-bold uppercase text-xs mb-1.5 block"
                          >
                            City *
                          </Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                city: e.target.value,
                              })
                            }
                            className={cn(
                              "rounded-none border-2 focus-visible:ring-0 transition-all",
                              errors.city
                                ? "border-red-500"
                                : "border-black/20 focus-visible:border-black",
                            )}
                          />
                          {errors.city && (
                            <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="state"
                            className="font-bold uppercase text-xs mb-1.5 block"
                          >
                            State *
                          </Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                state: e.target.value,
                              })
                            }
                            className={cn(
                              "rounded-none border-2 focus-visible:ring-0 transition-all",
                              errors.state
                                ? "border-red-500"
                                : "border-black/20 focus-visible:border-black",
                            )}
                          />
                          {errors.state && (
                            <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                              {errors.state}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label
                            htmlFor="pincode"
                            className="font-bold uppercase text-xs mb-1.5 block"
                          >
                            Pincode *
                          </Label>
                          <Input
                            id="pincode"
                            value={shippingInfo.pincode}
                            onChange={(e) =>
                              setShippingInfo({
                                ...shippingInfo,
                                pincode: e.target.value,
                              })
                            }
                            placeholder="6 digits"
                            className={cn(
                              "rounded-none border-2 focus-visible:ring-0 transition-all",
                              errors.pincode
                                ? "border-red-500"
                                : "border-black/20 focus-visible:border-black",
                            )}
                          />
                          {errors.pincode && (
                            <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                              {errors.pincode}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="notes"
                          className="font-bold uppercase text-xs mb-1.5 block"
                        >
                          Order Notes (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          placeholder="Special instructions for delivery..."
                          className="resize-none rounded-none border-2 border-black/20 focus-visible:border-black focus-visible:ring-0 transition-all"
                          value={orderNotes}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                          ) => setOrderNotes(e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveAddress"
                          checked={saveAddress}
                          onCheckedChange={(
                            checked: boolean | "indeterminate",
                          ) => setSaveAddress(checked === true)}
                        />
                        <Label
                          htmlFor="saveAddress"
                          className="cursor-pointer font-bold text-sm"
                        >
                          Save this information for next time
                        </Label>
                      </div>

                      <Separator className="my-6" />

                      <div>
                        <Label className="text-base font-black uppercase mb-4 block underline decoration-2 decoration-accent">
                          Shipping Method
                        </Label>
                        <RadioGroup
                          value={selectedShipping}
                          onValueChange={setSelectedShipping}
                        >
                          {SHIPPING_OPTIONS.map((option) => (
                            <div
                              key={option.id}
                              className={`flex items-center space-x-3 border-2 rounded-none p-4 transition-all ${
                                selectedShipping === option.id
                                  ? "border-black bg-muted/20 shadowed-sm"
                                  : "border-muted hover:border-black/50"
                              }`}
                            >
                              <RadioGroupItem
                                value={option.id}
                                id={option.id}
                              />
                              <Label
                                htmlFor={option.id}
                                className="flex-1 cursor-pointer"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="font-medium">{option.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {option.days}
                                    </p>
                                  </div>
                                  <p className="font-semibold">
                                    {option.price === 0
                                      ? "FREE"
                                      : formatCurrency(option.price)}
                                  </p>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 bg-white text-black flex items-center justify-center rounded-none">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-light uppercase tracking-tight text-white">
                        Payment Method
                      </h2>
                    </div>

                    <div className="space-y-4 pt-2">
                      <RadioGroup
                        value={selectedPayment}
                        onValueChange={setSelectedPayment}
                      >
                        {PAYMENT_METHODS.map((method) => (
                          <div
                            key={method.id}
                            className={`flex items-center space-x-3 border-2 rounded-none p-4 transition-all ${
                              selectedPayment === method.id
                                ? "border-black bg-muted/20 shadowed-sm"
                                : "border-muted hover:border-black/50"
                            }`}
                          >
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label
                              htmlFor={method.id}
                              className="flex-1 cursor-pointer flex items-center gap-3"
                            >
                              <method.icon className="h-5 w-5" />
                              <span className="font-medium">{method.name}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {selectedPayment === "card" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4 mt-6"
                        >
                          <div>
                            <Label
                              htmlFor="cardNumber"
                              className="font-bold uppercase text-xs mb-1.5 block"
                            >
                              Card Number *
                            </Label>
                            <Input
                              id="cardNumber"
                              value={cardInfo.number}
                              onChange={(e) =>
                                setCardInfo({
                                  ...cardInfo,
                                  number: e.target.value,
                                })
                              }
                              placeholder="1234 5678 9012 3456"
                              maxLength={16}
                              className={cn(
                                "rounded-none bg-transparent border-t-0 border-x-0 border-b border-white/20 focus-visible:border-white focus-visible:ring-0 px-0 h-11 transition-colors",
                                errors.cardNumber
                                  ? "border-red-500"
                                  : "border-black/20 focus-visible:border-black",
                              )}
                            />
                            {errors.cardNumber && (
                              <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                                {errors.cardNumber}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor="cardName"
                              className="font-bold uppercase text-xs mb-1.5 block"
                            >
                              Cardholder Name *
                            </Label>
                            <Input
                              id="cardName"
                              value={cardInfo.name}
                              onChange={(e) =>
                                setCardInfo({
                                  ...cardInfo,
                                  name: e.target.value,
                                })
                              }
                              placeholder="John Doe"
                              className={cn(
                                "rounded-none bg-transparent border-t-0 border-x-0 border-b border-white/20 focus-visible:border-white focus-visible:ring-0 px-0 h-11 transition-colors",
                                errors.cardName
                                  ? "border-red-500"
                                  : "border-black/20 focus-visible:border-black",
                              )}
                            />
                            {errors.cardName && (
                              <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                                {errors.cardName}
                              </p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label
                                htmlFor="expiry"
                                className="font-bold uppercase text-xs mb-1.5 block"
                              >
                                Expiry Date *
                              </Label>
                              <Input
                                id="expiry"
                                value={cardInfo.expiry}
                                onChange={(e) =>
                                  setCardInfo({
                                    ...cardInfo,
                                    expiry: e.target.value,
                                  })
                                }
                                placeholder="MM/YY"
                                maxLength={5}
                                className={cn(
                                  "rounded-none bg-transparent border-t-0 border-x-0 border-b border-white/20 focus-visible:border-white focus-visible:ring-0 px-0 h-11 transition-colors",
                                  errors.cardExpiry
                                    ? "border-red-500"
                                    : "border-black/20 focus-visible:border-black",
                                )}
                              />
                              {errors.cardExpiry && (
                                <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                                  {errors.cardExpiry}
                                </p>
                              )}
                            </div>
                            <div>
                              <Label
                                htmlFor="cvv"
                                className="font-bold uppercase text-xs mb-1.5 block"
                              >
                                CVV *
                              </Label>
                              <Input
                                id="cvv"
                                type="password"
                                value={cardInfo.cvv}
                                onChange={(e) =>
                                  setCardInfo({
                                    ...cardInfo,
                                    cvv: e.target.value,
                                  })
                                }
                                placeholder="123"
                                maxLength={3}
                                className={cn(
                                  "rounded-none bg-transparent border-t-0 border-x-0 border-b border-white/20 focus-visible:border-white focus-visible:ring-0 px-0 h-11 transition-colors",
                                  errors.cardCvv
                                    ? "border-red-500"
                                    : "border-black/20 focus-visible:border-black",
                                )}
                              />
                              {errors.cardCvv && (
                                <p className="text-xs font-bold text-red-500 mt-1 uppercase">
                                  {errors.cardCvv}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {selectedPayment === "cod" && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                          <p className="text-sm text-blue-900 dark:text-blue-100">
                            Pay with cash when your order is delivered.
                            Additional charges may apply.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="h-12 w-12 bg-white text-black flex items-center justify-center rounded-none">
                        <Check className="h-6 w-6" />
                      </div>
                      <h2 className="text-3xl font-light uppercase tracking-tight text-white">
                        Review Order
                      </h2>
                    </div>

                    <div className="space-y-6 pt-2">
                      {/* Shipping Address */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Shipping Address
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm">
                          <p className="font-medium">{shippingInfo.fullName}</p>
                          <p>{shippingInfo.address}</p>
                          <p>
                            {shippingInfo.city}, {shippingInfo.state} -{" "}
                            {shippingInfo.pincode}
                          </p>
                          <p className="mt-2">
                            <span className="text-muted-foreground">
                              Email:
                            </span>{" "}
                            {shippingInfo.email}
                          </p>
                          <p>
                            <span className="text-muted-foreground">
                              Phone:
                            </span>{" "}
                            {shippingInfo.phone}
                          </p>
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Payment Method
                        </h3>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-sm">
                          <p>
                            {
                              PAYMENT_METHODS.find(
                                (m) => m.id === selectedPayment,
                              )?.name
                            }
                          </p>
                          {selectedPayment === "card" && cardInfo.number && (
                            <p className="text-muted-foreground">
                              **** **** **** {cardInfo.number.slice(-4)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Order Items ({items.length})
                        </h3>
                        <div className="space-y-3">
                          {items.map((item) => (
                            <div
                              key={`${item.productId}-${item.size}-${item.color}`}
                              className="flex gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3"
                            >
                              <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">
                                  {item.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Size: {item.size} • Color: {item.color}
                                </p>
                                <p className="text-sm">Qty: {item.quantity}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  {formatCurrency(item.price * item.quantity)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1 || isProcessing}
                className="hover:bg-transparent hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  size="lg"
                  className="rounded-none font-bold uppercase tracking-wider border border-white hover:bg-white hover:text-black shadow-none transition-all"
                >
                  Next Step
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  size="lg"
                  className="min-w-[200px] rounded-none font-bold uppercase tracking-wider border border-white bg-white text-black hover:bg-white/90 shadow-none transition-all"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Confirm Order
                      <Check className="h-5 w-5 ml-3" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 border border-white/20 p-6 rounded-none space-y-6">
              <h3 className="font-bold uppercase tracking-widest text-lg border-b border-white/10 pb-4">
                Order Summary
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({items.length} items)
                    </span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "FREE"
                        : formatCurrency(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (GST 18%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mt-4">
                  <p className="text-sm text-green-900 dark:text-green-100 font-medium">
                    🎉 You're saving{" "}
                    {formatCurrency(
                      items.reduce(
                        (sum, item) => sum + item.price * 0.1 * item.quantity,
                        0,
                      ),
                    )}{" "}
                    on this order!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
