"use client";

import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function BillingCancelPageInner() {
  const params = useSearchParams();
  const router = useRouter();

  const error = params.get("error");
  const plan = params.get("plan");
  const method = params.get("method");

  const getErrorMessage = () => {
    switch (error) {
      case "payment_failed":
        return "Thanh toán thất bại. Vui lòng thử lại.";
      case "server_error":
        return "Có lỗi xảy ra từ phía server. Vui lòng liên hệ hỗ trợ.";
      case "cancelled":
        return "Bạn đã hủy thanh toán.";
      default:
        return "Thanh toán không thành công. Vui lòng thử lại.";
    }
  };

  return (
    <MaxWidthWrapper className="mb-24">
      <AnimationContainer delay={0.05}>
        <div className="py-10 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl md:text-3xl font-semibold font-heading text-center !leading-tight">
              Thanh toán không thành công
            </h1>
            <p className="text-muted-foreground text-center mt-2">
              {getErrorMessage()}
            </p>
          </div>

          <Card className="border-border rounded-xl">
            <CardHeader>
              <CardTitle>Thông tin giao dịch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Gói:</span>
                  <p className="font-medium">{plan?.toUpperCase() || "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Phương thức:</span>
                  <p className="font-medium">{method === "vnpay" ? "VNPay" : method === "stripe" ? "Stripe" : "N/A"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Trạng thái:</span>
                  <p className="font-medium text-red-500">Thất bại</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Thời gian:</span>
                  <p className="font-medium">{new Date().toLocaleString('vi-VN')}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Bạn có thể:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Thử lại thanh toán với phương thức khác</li>
                  <li>• Kiểm tra thông tin thẻ/ tài khoản</li>
                  <li>• Liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn</li>
                  <li>• Sử dụng gói miễn phí trong khi chờ đợi</li>
                </ul>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button 
                  onClick={() => router.push(`/dashboard/billing?plan=${plan || ""}&method=${method || ""}`)} 
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Thử lại
                </Button>
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Về Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}

export default function BillingCancelPage() {
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
      <BillingCancelPageInner />
    </Suspense>
  );
}

