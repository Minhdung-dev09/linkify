import { Icons, SignUpForm } from "@/components";
import Link from "next/link";

const SignUpPage = () => {
    return (
        <div className="flex flex-col items-start max-w-sm mx-auto h-dvh overflow-hidden pt-4 md:pt-20">
            <div className="flex items-center w-full py-8 border-b border-border/80">
                <Link href="/#home" className="flex items-center gap-x-2">
                    <Icons.logo className="w-6 h-6" />
                    <h1 className="text-lg font-medium">
                        ccme-shortlink
                    </h1>
                </Link>
            </div>

            <SignUpForm />

            <div className="flex flex-col items-start w-full">
                <p className="text-sm text-muted-foreground">
                    Khi đăng ký, bạn đồng ý với{" "}
                    <Link href="/terms" className="text-primary">
                        Điều khoản dịch vụ{" "}
                    </Link>
                    và{" "}
                    <Link href="/privacy" className="text-primary">
                        Chính sách bảo mật
                    </Link>
                </p>
            </div>
            <div className="flex items-start mt-auto border-t border-border/80 py-6 w-full">
                <p className="text-sm text-muted-foreground">
                    Đã có tài khoản?{" "}
                    <Link href="/auth/sign-in" className="text-primary">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </div>
    )
};

export default SignUpPage
