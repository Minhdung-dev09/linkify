"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// removed Clerk; using backend API
import { Eye, EyeOff, LoaderIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from "sonner";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "@/lib/api";
import { setToken } from "@/lib/auth";

const SignInForm = () => {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: (payload: { email: string; password: string }) => apiLogin(payload),
        onSuccess: (data) => {
            setToken(data.token);
            toast.success("Đăng nhập thành công");
            router.push("/");
        },
        onError: (error: any) => {
            toast.error(error?.message || "Đăng nhập thất bại");
        }
    });

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setIsLoading(false);
            toast.error("Cần nhập email và mật khẩu!");
            return;
        }

        setIsLoading(true);

        try {
            await mutation.mutateAsync({ email, password });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start gap-y-6 py-8 w-full px-0.5">
            <h2 className="text-2xl font-semibold">
                Đăng nhập vào ccmelinktracker
            </h2>

            <form onSubmit={handleSignIn} className="w-full">
                <div className="space-y-2 w-full">
                    <Label htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        disabled={isLoading}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        className="w-full focus-visible:border-foreground"
                    />
                </div>
                <div className="mt-4 space-y-2">
                    <Label htmlFor="password">
                        Mật khẩu
                    </Label>
                    <div className="relative w-full">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu của bạn"
                            className="w-full focus-visible:border-foreground"
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            disabled={isLoading}
                            className="absolute top-1 right-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ?
                                <EyeOff className="w-4 h-4" /> :
                                <Eye className="w-4 h-4" />
                            }
                        </Button>
                    </div>
                </div>
                <div className="mt-4 w-full">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <LoaderIcon className="w-5 h-5 animate-spin" />
                        ) : "Đăng nhập bằng email"}
                    </Button>
                </div>
            </form>
        </div>
    )
};

export default SignInForm
