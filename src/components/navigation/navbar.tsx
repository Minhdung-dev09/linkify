"use client";

import { buttonVariants } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn, NAV_LINKS, DEFAULT_AVATAR_URL } from "@/utils";
import { clearToken, getToken } from "@/lib/auth";
import { apiMe } from "@/lib/api";
import { LucideIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from "../global/max-width-wrapper";
import MobileNavbar from "./mobile-navbar";
import AnimationContainer from "../global/animation-container";
import PricingModal from "../ui/pricing-modal";

const Navbar = () => {

    const [scroll, setScroll] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [pricingModalOpen, setPricingModalOpen] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 8) {
            setScroll(true);
        } else {
            setScroll(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // read token from cookie or localStorage
        const has = () => {
            try {
                const fromLocal = localStorage.getItem("auth_token");
                const fromCookie = document.cookie.includes("token=");
                setHasToken(!!fromLocal || fromCookie);
                // read basic user info if available (optional, non-blocking)
                if (fromLocal) {
                    try {
                        const raw = localStorage.getItem("auth_user");
                        if (raw) {
                            const u = JSON.parse(raw || "{}");
                            setUserName(u?.name || "");
                            setUserEmail(u?.email || "");
                            setAvatarUrl(u?.avatarUrl || "");
                        }
                    } catch {}
                }
            } catch {}
        };
        has();
        const id = setInterval(has, 500);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(id);
        };
    }, []);

    useEffect(() => {
      // Hydrate user info if we have token but missing cached user
      const token = getToken();
      if (!token) return;
      const raw = typeof window !== "undefined" ? localStorage.getItem("auth_user") : null;
      if (raw) return;
      (async () => {
        try {
          const res = await apiMe(token);
          const u = res?.user || {} as any;
          if (typeof window !== "undefined") {
            localStorage.setItem("auth_user", JSON.stringify(u));
          }
          setUserName(u?.name || "");
          setUserEmail(u?.email || "");
          setAvatarUrl(u?.avatarUrl || "");
        } catch {}
      })();
    }, []);

    return (
        <header className={cn(
            "sticky top-0 inset-x-0 h-14 w-full border-b border-transparent z-[99999] select-none",
            scroll && "border-background/80 bg-background/40 backdrop-blur-md"
        )}>
            <AnimationContainer reverse delay={0.1} className="size-full">
                <MaxWidthWrapper className="flex items-center justify-between">
                    <div className="flex items-center space-x-12">
                        <Link href="/#home">
                            <span className="text-lg font-bold font-heading !leading-none">
                                Linkify
                            </span>
                        </Link>

                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList>
                                {NAV_LINKS.map((link) => (
                                    <NavigationMenuItem key={link.title}>
                                        {link.menu ? (
                                            <>
                                                <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className={cn(
                                                        "grid gap-1 p-4 md:w-[400px] lg:w-[500px] rounded-xl",
                                                        link.title === "Features" ? "lg:grid-cols-[.75fr_1fr]" : "lg:grid-cols-2"
                                                    )}>
                                                        {link.title === "Features" && (
                                                            <li className="row-span-4 pr-2 relative rounded-lg overflow-hidden">
                                                                <div className="absolute inset-0 !z-10 h-full w-[calc(100%-10px)] bg-[linear-gradient(to_right,rgb(38,38,38,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(38,38,38,0.5)_1px,transparent_1px)] bg-[size:1rem_1rem]"></div>
                                                                <NavigationMenuLink asChild className="z-20 relative">
                                                                    <Link
                                                                        href="/dashboard/links/create"
                                                                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                                                                    >
                                                                        <h6 className="mb-2 mt-4 text-lg font-medium">
                                                                            Tạo liên kết ngay
                                                                        </h6>
                                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                                            Vào trang tạo link để bắt đầu rút gọn và theo dõi.
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        )}
                                                        {link.menu.map((menuItem) => (
                                                            <ListItem
                                                                key={menuItem.title}
                                                                title={menuItem.title}
                                                                href={menuItem.href}
                                                                icon={menuItem.icon}
                                                            >
                                                                {menuItem.tagline}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </>
                                        ) : (
                                            link.isModal ? (
                                                <button
                                                    onClick={() => setPricingModalOpen(true)}
                                                    className={navigationMenuTriggerStyle()}
                                                >
                                                    {link.title}
                                                </button>
                                            ) : (
                                                <Link href={link.href} legacyBehavior passHref>
                                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                        {link.title}
                                                    </NavigationMenuLink>
                                                </Link>
                                            )
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                    </div>

                    <div className="hidden lg:flex items-center">
                        {hasToken ? (
                            <div className="flex items-center gap-x-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 rounded-full focus:outline-none">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={(avatarUrl || `${DEFAULT_AVATAR_URL}${encodeURIComponent(userName || userEmail || "U")}`)} alt={userName || userEmail || "User"} />
                                                <AvatarFallback>{(userName || userEmail || "U").slice(0,1).toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="min-w-56">
                                        {(userName || userEmail) && (
                                            <div className="px-3 py-2 text-sm">
                                                <p className="font-medium leading-none">{userName || "User"}</p>
                                                {userEmail && <p className="text-muted-foreground text-xs mt-0.5">{userEmail}</p>}
                                            </div>
                                        )}
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => { clearToken(); window.location.href = "/"; }}>
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-4">
                                <Link href="/auth/sign-in" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Sign In
                                </Link>
                                <Link href="/auth/sign-up" className={buttonVariants({ size: "sm", })}>
                                    Get Started
                                    <ZapIcon className="size-3.5 ml-1.5 text-orange-500 fill-orange-500" />
                                </Link>
                            </div>
                        )}
                    </div>

                    <MobileNavbar />

                </MaxWidthWrapper>
            </AnimationContainer>
            
            <PricingModal open={pricingModalOpen} onOpenChange={setPricingModalOpen} />
        </header>
    )
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { title: string; icon: LucideIcon }
>(({ className, title, href, icon: Icon, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    href={href!}
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-100 ease-out hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="flex items-center space-x-2 text-neutral-300">
                        <Icon className="h-4 w-4" />
                        <h6 className="text-sm font-medium !leading-none">
                            {title}
                        </h6>
                    </div>
                    <p title={children! as string} className="line-clamp-1 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default Navbar
