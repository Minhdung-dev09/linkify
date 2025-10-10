"use client";

import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useMemo } from "react";

function BillingProcessingPageInner() {
  const params = useSearchParams();
  const router = useRouter();

  const plan = (params.get("plan") || "pro").toString();
  const cycle = (params.get("cycle") || "monthly").toString();
  const method = (params.get("method") || "card").toString();

  const title = useMemo(() => {
    if (method === "paypal") return "Thanh toán qua PayPal";
    if (method === "vnpay") return "Thanh toán qua VNPay";
    return "Thanh toán bằng thẻ";
  }, [method]);

  return (
    <MaxWidthWrapper className="mb-24">
      <AnimationContainer delay={0.05}>
        <div className="py-10 max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold font-heading text-center !leading-tight">{title}</h1>
          <p className="text-muted-foreground text-center mt-2">Gói: {plan.toUpperCase()} • Chu kỳ: {cycle}</p>

          <Card className="mt-8 border-border rounded-xl">
            <CardHeader>
              <CardTitle>Hướng dẫn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {method === "card" && (
                <div className="text-sm text-muted-foreground">
                  Nhập thông tin thẻ tại cửa sổ thanh toán (sẽ tích hợp khi có backend). Tạm thời đây là trang mô phỏng luồng thanh toán.
                </div>
              )}
              {method === "paypal" && (
                <div className="text-sm text-muted-foreground">
                  Bạn sẽ được chuyển tới PayPal để hoàn tất giao dịch khi backend sẵn sàng.
                </div>
              )}
              {method === "vnpay" && (
                <div className="text-sm text-muted-foreground">
                  Bạn sẽ được chuyển tới cổng VNPay khi backend sẵn sàng.
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <Button onClick={() => router.push(`/dashboard`)}>Về dashboard</Button>
                <Button variant="outline" onClick={() => router.push(`/dashboard/billing?plan=${plan}&cycle=${cycle}`)}>Chọn lại phương thức</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}

export default function BillingProcessingPage() {
  return (
    <Suspense fallback={null}>
      <BillingProcessingPageInner />
    </Suspense>
  );
}


