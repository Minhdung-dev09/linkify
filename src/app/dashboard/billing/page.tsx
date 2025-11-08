"use client";

import { MaxWidthWrapper, AnimationContainer } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getToken } from "@/lib/auth";
import { PLANS } from "@/utils";
import { apiGetPlans, apiGetSubscription, apiCreatePayment } from "@/lib/api";

const PAYMENT_METHODS = [
  { key: "stripe", label: "Thẻ ngân hàng (Stripe)" },
  { key: "vnpay", label: "VNPay" },
] as const;

type PaymentMethod = typeof PAYMENT_METHODS[number]["key"];

function BillingPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string>("pro-monthly");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [method, setMethod] = useState<PaymentMethod>("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace(`/auth/sign-in?redirect=${encodeURIComponent("/dashboard/billing")}`);
      return;
    }

    // Load plans and subscription data
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load plans
        const plansResponse = await apiGetPlans();
        setPlans(plansResponse.plans);
        
        // Load user subscription
        const subscriptionResponse = await apiGetSubscription(token);
        setSubscription(subscriptionResponse.subscription);
        
        // Set current plan from URL params or user's current plan
        const planParam = params.get("plan");
        if (planParam) {
          setSelectedPlan(planParam);
        } else if (subscriptionResponse.subscription?.plan) {
          setSelectedPlan(subscriptionResponse.subscription.plan);
        }
        
        const cycle = (params.get("cycle") || "monthly") as any;
        setBillingCycle(cycle === "yearly" ? "yearly" : "monthly");
        
      } catch (error) {
        console.error("Error loading billing data:", error);
        toast.error("Không thể tải dữ liệu thanh toán");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router, params]);

  const currentPrice = useMemo(() => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return 0;
    return billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  }, [selectedPlan, billingCycle, plans]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const token = getToken();
      if (!token) {
        toast.error("Vui lòng đăng nhập lại");
        router.push("/auth/sign-in");
        return;
      }

      // Create payment with backend API
      const paymentResponse = await apiCreatePayment(token, {
        plan: selectedPlan,
        paymentMethod: method,
        billingCycle: billingCycle
      });

      if (paymentResponse.success) {
        if (method === "vnpay" && paymentResponse.paymentUrl) {
          // Redirect to VNPay
          window.location.href = paymentResponse.paymentUrl;
        } else if (method === "stripe" && paymentResponse.sessionData?.clientSecret) {
          // For Stripe, redirect to processing page with client secret
          const redirect = `/dashboard/billing/processing?plan=${encodeURIComponent(selectedPlan)}&cycle=${billingCycle}&method=${method}&clientSecret=${paymentResponse.sessionData.clientSecret}&paymentId=${paymentResponse.paymentId}`;
          router.push(redirect);
        } else {
          toast.error("Không thể tạo phiên thanh toán");
        }
      } else {
        toast.error("Tạo thanh toán thất bại");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Có lỗi xảy ra khi thanh toán");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <MaxWidthWrapper className="mb-24">
        <div className="py-10 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Đang tải dữ liệu...</p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="mb-24">
      <AnimationContainer delay={0.05}>
        <div className="py-10 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-semibold font-heading text-center !leading-tight">Thanh toán</h1>
          <p className="text-muted-foreground text-center mt-3">Chọn gói và phương thức thanh toán</p>
          
          {subscription && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h3 className="font-medium">Gói hiện tại: {subscription.plan}</h3>
              <p className="text-sm text-muted-foreground">
                Trạng thái: {subscription.status} • 
                {subscription.endDate && ` Hết hạn: ${new Date(subscription.endDate).toLocaleDateString('vi-VN')}`}
              </p>
            </div>
          )}

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
                      {plans.map((pl) => (
                        <div key={pl.id} className="flex items-center justify-between p-3 border rounded-lg mb-3">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem id={`plan-${pl.id}`} value={pl.id} />
                            <Label htmlFor={`plan-${pl.id}`} className="cursor-pointer">
                              <div className="font-medium">{pl.name}</div>
                              <div className="text-sm text-muted-foreground">{pl.description}</div>
                            </Label>
                          </div>
                          <div className="text-right font-semibold">{pl.price.monthly.toLocaleString('vi-VN')} VND/tháng</div>
                        </div>
                      ))}
                    </RadioGroup>
                  </TabsContent>
                  <TabsContent value="yearly">
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="mt-4">
                      {plans.map((pl) => (
                        <div key={pl.id} className="flex items-center justify-between p-3 border rounded-lg mb-3">
                          <div className="flex items-center gap-3">
                            <RadioGroupItem id={`plan-y-${pl.id}`} value={pl.id} />
                            <Label htmlFor={`plan-y-${pl.id}`} className="cursor-pointer">
                              <div className="font-medium">{pl.name}</div>
                              <div className="text-sm text-muted-foreground">{pl.description}</div>
                            </Label>
                          </div>
                          <div className="text-right font-semibold">{pl.price.yearly.toLocaleString('vi-VN')} VND/năm</div>
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
                    <span className="font-semibold">{currentPrice.toLocaleString('vi-VN')} VND</span>
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


