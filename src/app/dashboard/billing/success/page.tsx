"use client";

import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function BillingSuccessPageInner() {
  const params = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const paymentId = params.get("paymentId");
  const plan = params.get("plan");
  const method = params.get("method");

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <MaxWidthWrapper className="mb-24">
        <div className="py-10 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Đang xác nhận thanh toán...</p>
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="mb-24">
      <AnimationContainer delay={0.05}>
        <div className="py-10 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-semibold font-heading text-center !leading-tight">
              Thanh toán thành công!
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              Cảm ơn bạn đã nâng cấp gói {plan?.toUpperCase()}
            </p>
          </div>

          <Card className="border-border rounded-xl">
            <CardHeader>
              <CardTitle>Chi tiết giao dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Gói:</span>
                  <p className="font-medium">{plan?.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phương thức:</span>
                  <p className="font-medium">{method === "vnpay" ? "VNPay" : "Stripe"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mã giao dịch:</span>
                  <p className="font-medium font-mono text-xs">{paymentId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Thời gian:</span>
                  <p className="font-medium">{new Date().toLocaleString('vi-VN')}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Những gì bạn nhận được:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Truy cập đầy đủ tính năng của gói {plan}</li>
                  <li>• Hỗ trợ ưu tiên</li>
                  <li>• Báo cáo chi tiết</li>
                  <li>• Không giới hạn link và landing page</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button onClick={() => router.push("/dashboard")} className="flex-1">
                  Về Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard/billing")}>
                  Quản lý gói
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}

export default function BillingSuccessPage() {
  return (
    <Suspense fallback={
      <MaxWidthWrapper className="mb-24">
        <div className="py-10 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Đang tải...</p>
          </div>
        </div>
      </MaxWidthWrapper>
    }>
      <BillingSuccessPageInner />
    </Suspense>
  );
}

