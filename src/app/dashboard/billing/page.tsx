"use client";

import { MaxWidthWrapper, AnimationContainer } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getToken } from "@/lib/auth";
import { PLANS } from "@/utils";

const PAYMENT_METHODS = [
  { key: "card", label: "Thẻ ngân hàng" },
  { key: "paypal", label: "PayPal" },
  { key: "vnpay", label: "VNPay" },
] as const;

type PaymentMethod = typeof PAYMENT_METHODS[number]["key"];

function BillingPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace(`/auth/sign-in?redirect=${encodeURIComponent("/dashboard/billing")}`);
    }
  }, [router]);

  useEffect(() => {
    const p = (params.get("plan") || localStorage.getItem("preferred_plan") || "Pro").toString();
    const safe = PLANS.find(pl => pl.name.toLowerCase() === p.toLowerCase());
    setSelectedPlan(safe?.name || "Pro");
    const cycle = (params.get("cycle") || "monthly") as any;
    setBillingCycle(cycle === "yearly" ? "yearly" : "monthly");
  }, [params]);

  const currentPrice = useMemo(() => {
    const plan = PLANS.find(p => p.name === selectedPlan);
    if (!plan) return 0;
    return billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  }, [selectedPlan, billingCycle]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Giả lập tạo phiên thanh toán: tạm thời điều hướng theo method
      // TODO: khi có BE, gọi API tạo checkout session và redirect URL
      const plan = selectedPlan.toLowerCase();
      const cycle = billingCycle;
      const redirect = `/dashboard/billing/processing?plan=${encodeURIComponent(plan)}&cycle=${cycle}&method=${method}`;
      router.push(redirect);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MaxWidthWrapper className="mb-24">
      <AnimationContainer delay={0.05}>
        <div className="py-10 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-semibold font-heading text-center !leading-tight">Thanh toán</h1>
          <p className="text-muted-foreground text-center mt-3">Chọn gói và phương thức thanh toán</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <Card className="border-border rounded-xl">
              <CardHeader>
                <CardTitle>Chọn gói</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={billingCycle} onValueChange={(v) => setBillingCycle(v as any)} className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="monthly">Theo tháng</TabsTrigger>
                    <TabsTrigger value="yearly">Theo năm</TabsTrigger>
                  </TabsList>
                  <TabsContent value="monthly">
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="mt-4">
                      {PLANS.map((pl) => (
                        <div key={pl.name} className="flex items-center justify-between p-3 border rounded-lg mb-3">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem id={`plan-${pl.name}`} value={pl.name} />
                            <Label htmlFor={`plan-${pl.name}`} className="cursor-pointer">
                              <div className="font-medium">{pl.name}</div>
                              <div className="text-sm text-muted-foreground">{pl.info}</div>
                            </Label>
                          </div>
                          <div className="text-right font-semibold">${pl.price.monthly}/mo</div>
                        </div>
                      ))}
                    </RadioGroup>
                  </TabsContent>
                  <TabsContent value="yearly">
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="mt-4">
                      {PLANS.map((pl) => (
                        <div key={pl.name} className="flex items-center justify-between p-3 border rounded-lg mb-3">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem id={`plan-y-${pl.name}`} value={pl.name} />
                            <Label htmlFor={`plan-y-${pl.name}`} className="cursor-pointer">
                              <div className="font-medium">{pl.name}</div>
                              <div className="text-sm text-muted-foreground">{pl.info}</div>
                            </Label>
                          </div>
                          <div className="text-right font-semibold">${pl.price.yearly}/yr</div>
                        </div>
                      ))}
                    </RadioGroup>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="border-border rounded-xl">
              <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={method} onValueChange={(v) => setMethod(v as PaymentMethod)}>
                  {PAYMENT_METHODS.map(m => (
                    <div key={m.key} className="flex items-center gap-3 p-3 border rounded-lg mb-3">
                      <RadioGroupItem id={`method-${m.key}`} value={m.key} />
                      <Label htmlFor={`method-${m.key}`} className="cursor-pointer">{m.label}</Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-6 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Tổng thanh toán</span>
                    <span className="font-semibold">${currentPrice}</span>
                  </div>
                </div>

                <Button disabled={isProcessing} onClick={handleCheckout} className="w-full mt-6">
                  {isProcessing ? "Đang xử lý..." : "Thanh toán"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={null}>
      <BillingPageInner />
    </Suspense>
  );
}


