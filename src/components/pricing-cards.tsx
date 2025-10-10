"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, PLANS } from "@/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { getToken } from "@/lib/auth";
import { useMemo } from 'react';

const SmartPricingCta = ({ planName, defaultHref, btnClass, children }: { planName: string; defaultHref: string; btnClass: string; children: React.ReactNode }) => {
    const isLoggedIn = typeof window !== 'undefined' && !!getToken();
    const href = useMemo(() => {
        if (isLoggedIn) {
            const plan = encodeURIComponent(planName.toLowerCase());
            return `/dashboard/billing?plan=${plan}`;
        }
        return defaultHref;
    }, [isLoggedIn, planName, defaultHref]);

    return (
        <Link href={href} style={{ width: "100%" }} className={btnClass}>
            {children}
        </Link>
    );
};

const PricingCards = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto">
            {PLANS.map((plan, index) => (
                <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card className={cn(
                        "flex flex-col w-full border-border rounded-xl h-full",
                        plan.name.includes("Pro") && "border-2 border-purple-500"
                    )}>
                        <CardHeader className={cn(
                            "border-b border-border",
                            plan.name.includes("Pro") ? "bg-purple-500/[0.07]" : "bg-foreground/[0.03]"
                        )}>
                            <CardTitle className={cn(plan.name === "Free" && "text-muted-foreground", "text-lg font-medium")}>
                                {plan.name}
                            </CardTitle>
                            <CardDescription>
                                {plan.info}
                            </CardDescription>
                            <h5 className="text-3xl font-semibold flex items-end">
                                {plan.price.monthly === 0 ? "Miễn phí" : `${plan.price.monthly.toLocaleString('vi-VN')}đ`}
                                <div className="text-base text-muted-foreground font-normal">
                                    {plan.name === "Free" ? "" : plan.name.includes("Tháng") ? "/tháng" : "/năm"}
                                </div>
                                {plan.name.includes("Năm") && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
                                        className="px-2 py-0.5 ml-2 rounded-md bg-purple-500 text-foreground text-sm font-medium"
                                    >
                                        -38%
                                    </motion.span>
                                )}
                            </h5>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4 flex-grow">
                            {plan.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-2">
                                    <CheckCircleIcon className="text-purple-500 w-4 h-4" />
                                    <TooltipProvider>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger asChild>
                                                <p className={cn(feature.tooltip && "border-b !border-dashed border-border cursor-pointer")}>
                                                    {feature.text}
                                                </p>
                                            </TooltipTrigger>
                                            {feature.tooltip && (
                                                <TooltipContent>
                                                    <p>{feature.tooltip}</p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="w-full mt-auto">
                            <SmartPricingCta 
                                planName={plan.name === "Free" ? "Free" : "Pro"} 
                                defaultHref={plan.btn.href} 
                                btnClass={buttonVariants({ 
                                    className: plan.name.includes("Pro") && "bg-purple-500 hover:bg-purple-500/80 text-white" 
                                })}
                            >
                                {plan.btn.text}
                            </SmartPricingCta>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
};

export default PricingCards