import { AnimationContainer, MaxWidthWrapper, PricingCards } from "@/components";
import { BentoCard, BentoGrid, CARDS } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import MagicCard from "@/components/ui/magic-card";
import { COMPANIES, PROCESS } from "@/utils";
import { REVIEWS } from "@/utils/constants/misc";
import { cookies } from "next/headers";
import { ArrowRightIcon, CreditCardIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
    const token = cookies().get("token")?.value;

    return (
        <div className="overflow-x-hidden scrollbar-hide size-full">
            {/* Hero Section */}
            <MaxWidthWrapper>
                <div className="flex flex-col items-center justify-center w-full text-center bg-gradient-to-t from-background">
                    <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">
                        <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
                            <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/20"></span>
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1">
                                🚀 Marketing Automation Platform
                                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </span>
                        </button>
                        <h1 className="text-foreground text-center py-6 text-3xl font-medium tracking-normal text-balance sm:text-6xl md:text-7xl lg:text-8xl !leading-[1.15] w-full font-heading">
                            Quản lý liên kết & tạo landing page<br />
                            <span className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text inline-block">
                                Hàng đầu Việt Nam
                            </span>
                        </h1>
                        <p className="mb-12 text-lg tracking-tight text-muted-foreground md:text-xl text-balance">
                            Tối ưu hóa chiến lược marketing với công cụ rút gọn link thông minh và landing page builder drag & drop.
                            <br className="hidden md:block" />
                            <span className="hidden md:block">Phân tích dữ liệu chi tiết, tăng tỷ lệ chuyển đổi và ROI cho doanh nghiệp.</span>
                        </p>
                        <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
                            <Button asChild>
                                <Link href={token ? "/dashboard" : "/auth/sign-in"} className="flex items-center">
                                    Bắt đầu miễn phí
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </AnimationContainer>

                </div>
            </MaxWidthWrapper >

            {/* Dashboard Banner - Full Width */}
            <div className="w-full">
                <AnimationContainer delay={0.2} className="relative pt-20 pb-20 md:py-32 px-4 md:px-6 lg:px-8 bg-transparent w-full">
                    <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
                    <div className="w-full rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                        <BorderBeam
                            size={250}
                            duration={12}
                            delay={9}
                        />
                        <Image
                            src="/assets/dashboard-dark.svg"
                            alt="Dashboard"
                            width={1920}
                            height={1080}
                            quality={100}
                            className="w-full h-auto rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
                        />
                        <div className="absolute -bottom-4 inset-x-0 w-full h-1/2 bg-gradient-to-t from-background z-40"></div>
                        <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
                    </div>
                </AnimationContainer>
            </div>

            {/* Companies Section */}
            <MaxWidthWrapper>
                <AnimationContainer delay={0.4}>
                    <div className="py-14">
                        <div className="mx-auto px-4 md:px-8">
                            <h2 className="text-center text-sm font-medium font-heading text-neutral-400 uppercase">
                                Được tin dùng bởi các thương hiệu hàng đầu
                            </h2>
                            <div className="mt-8">
                                <ul className="flex flex-wrap items-center gap-x-6 gap-y-6 md:gap-x-16 justify-center">
                                    {COMPANIES.map((company) => (
                                        <li key={company.name}>
                                            <Image
                                                src={company.logo}
                                                alt={company.name}
                                                width={80}
                                                height={80}
                                                quality={100}
                                                className="w-28 h-auto"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>

            {/* Features Section */}
            <MaxWidthWrapper className="pt-10">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col w-full items-center lg:items-center justify-center py-8">
                        <MagicBadge title="Tính năng" />
                        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Quản lý liên kết như một chuyên gia
                        </h2>
                        <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                            ccmelinktracker là công cụ quản lý liên kết mạnh mẽ giúp bạn rút gọn, theo dõi và tổ chức tất cả liên kết ở một nơi.
                        </p>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2}>
                    <BentoGrid className="py-8">
                        {CARDS.map((feature, idx) => (
                            <BentoCard key={idx} {...feature} />
                        ))}
                    </BentoGrid>
                </AnimationContainer>
            </MaxWidthWrapper>

            {/* Process Section */}
            <MaxWidthWrapper className="py-10">
                <AnimationContainer delay={0.1}>
                    <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
                        <MagicBadge title="Quy trình" />
                        <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                            Quản lý liên kết hiệu quả trong 3 bước
                        </h2>
                        <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                            Thực hiện các bước đơn giản để tối ưu, tổ chức và chia sẻ liên kết dễ dàng.
                        </p>
                    </div>
                </AnimationContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full py-8 gap-4 md:gap-8">
                    {PROCESS.map((process, id) => (
                        <AnimationContainer delay={0.2 * id} key={id}>
                            <MagicCard className="group md:py-8">
                                <div className="flex flex-col items-start justify-center w-full">
                                    <process.icon strokeWidth={1.5} className="w-10 h-10 text-foreground" />
                                    <div className="flex flex-col relative items-start">
                                        <span className="absolute -top-6 right-0 border-2 border-border text-foreground font-medium text-2xl rounded-full w-12 h-12 flex items-center justify-center pt-0.5">
                                            {id + 1}
                                        </span>
                                        <h3 className="text-base mt-6 font-medium text-foreground">
                                            {process.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {process.description}
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        </AnimationContainer>
                    ))}
                </div>
            </MaxWidthWrapper>

            {/* Pricing Section - temporarily hidden */}
            {false && (
              <MaxWidthWrapper className="py-10">
                  <AnimationContainer delay={0.1}>
                      <div className="flex flex-col items-center lg:items-center justify-center w-full py-8 max-w-xl mx-auto">
                          <MagicBadge title="Simple Pricing" />
                          <h2 className="text-center lg:text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                              Choose a plan that works for you
                          </h2>
                          <p className="mt-4 text-center lg:text-center text-lg text-muted-foreground max-w-lg">
                              Get started with ccmelinktracker today and enjoy more features with our pro plans.
                          </p>
                      </div>
                  </AnimationContainer>
                  <AnimationContainer delay={0.2}>
                      <PricingCards />
                  </AnimationContainer>
                  <AnimationContainer delay={0.3}>
                      <div className="flex flex-wrap items-start md:items-center justify-center lg:justify-evenly gap-6 mt-12 max-w-5xl mx-auto w-full">
                          <div className="flex items-center gap-2">
                              <CreditCardIcon className="w-5 h-5 text-foreground" />
                              <span className="text-muted-foreground">
                                  No credit card required
                              </span>
                          </div>
                      </div>
                  </AnimationContainer>
              </MaxWidthWrapper>
            )}

            {/* Reviews Section - Conveyor Belt */}
            <div className="w-full py-20 overflow-hidden">
                <MaxWidthWrapper>
                    <AnimationContainer delay={0.1}>
                        <div className="flex flex-col items-center justify-center w-full py-8 max-w-xl mx-auto">
                            <MagicBadge title="Khách hàng của chúng tôi" />
                            <h2 className="text-center text-3xl md:text-5xl !leading-[1.1] font-medium font-heading text-foreground mt-6">
                                Người dùng nói gì về chúng tôi
                            </h2>
                            <p className="mt-4 text-center text-lg text-muted-foreground max-w-lg">
                                Cảm nhận thực tế từ người dùng về ccmelinktracker.
                            </p>
                        </div>
                    </AnimationContainer>
                </MaxWidthWrapper>
                
                {/* First Conveyor Belt - Left to Right */}
                <div className="relative w-full">
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
                    
                    {/* Moving reviews */}
                    <div className="flex animate-scroll gap-6 py-8">
                        {/* First set of reviews */}
                        {REVIEWS.map((review, index) => (
                            <div key={`first-${index}`} className="flex-shrink-0 w-80">
                                <MagicCard className="h-full">
                                    <Card className="flex flex-col w-full border-none h-full">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="text-lg font-medium text-muted-foreground">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4 flex-grow">
                                            <p className="text-muted-foreground">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="w-full space-x-1 mt-auto">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                            </div>
                        ))}
                        
                        {/* Duplicate set for seamless loop */}
                        {REVIEWS.map((review, index) => (
                            <div key={`second-${index}`} className="flex-shrink-0 w-80">
                                <MagicCard className="h-full">
                                    <Card className="flex flex-col w-full border-none h-full">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="text-lg font-medium text-muted-foreground">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4 flex-grow">
                                            <p className="text-muted-foreground">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="w-full space-x-1 mt-auto">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Second Conveyor Belt - Right to Left */}
                <div className="relative w-full mt-8">
                    {/* Gradient overlays */}
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
                    
                    {/* Moving reviews - reverse direction */}
                    <div className="flex animate-scroll-reverse gap-6 py-8">
                        {/* First set of reviews */}
                        {REVIEWS.map((review, index) => (
                            <div key={`reverse-first-${index}`} className="flex-shrink-0 w-80">
                                <MagicCard className="h-full">
                                    <Card className="flex flex-col w-full border-none h-full">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="text-lg font-medium text-muted-foreground">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4 flex-grow">
                                            <p className="text-muted-foreground">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="w-full space-x-1 mt-auto">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                            </div>
                        ))}
                        
                        {/* Duplicate set for seamless loop */}
                        {REVIEWS.map((review, index) => (
                            <div key={`reverse-second-${index}`} className="flex-shrink-0 w-80">
                                <MagicCard className="h-full">
                                    <Card className="flex flex-col w-full border-none h-full">
                                        <CardHeader className="space-y-0">
                                            <CardTitle className="text-lg font-medium text-muted-foreground">
                                                {review.name}
                                            </CardTitle>
                                            <CardDescription>
                                                {review.username}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4 pb-4 flex-grow">
                                            <p className="text-muted-foreground">
                                                {review.review}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="w-full space-x-1 mt-auto">
                                            {Array.from({ length: review.rating }, (_, i) => (
                                                <StarIcon key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                            ))}
                                        </CardFooter>
                                    </Card>
                                </MagicCard>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <MaxWidthWrapper className="mt-20 max-w-[100vw] overflow-x-hidden scrollbar-hide">
                <AnimationContainer delay={0.1}>
                    <LampContainer>
                        <div className="flex flex-col items-center justify-center relative w-full text-center">
                            <h2 className="bg-gradient-to-b from-neutral-200 to-neutral-400 py-4 bg-clip-text text-center text-4xl md:text-7xl !leading-[1.15] font-medium font-heading tracking-tight text-transparent mt-8">
                                Bước vào tương lai của quản lý liên kết
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                                Trải nghiệm giải pháp hiện đại giúp bạn xử lý liên kết hiệu quả hơn. Nâng tầm hiện diện trực tuyến với nền tảng thế hệ mới.
                            </p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href="/dashboard">
                                    Bắt đầu miễn phí
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </LampContainer>
                </AnimationContainer>
            </MaxWidthWrapper>

        </div>
    )
};

export default HomePage
