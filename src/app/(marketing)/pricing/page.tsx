import { AnimationContainer, MaxWidthWrapper, PricingCards } from "@/components";
export const metadata = {
    title: "Bảng giá | ccmelinktracker",
    description: "Bảng giá đơn giản và minh bạch cho ccmelinktracker. Chọn gói phù hợp với bạn.",
};
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MagicBadge from "@/components/ui/magic-badge";
import { FAQ } from "@/utils/constants/faq";

const PricingPage = () => {
    return (
        <MaxWidthWrapper className="mb-40">
            <AnimationContainer delay={0.1}>
                <div className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto">
                    <MagicBadge title="Bảng giá" />
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                        Bảng giá CcmeLinkTracker
                    </h1>
                </div>
            </AnimationContainer>

            <AnimationContainer delay={0.2}>
                <PricingCards />
            </AnimationContainer>

            <AnimationContainer delay={0.3}>
                <div className="mt-20 w-full">
                    <div className="flex flex-col items-center justify-center w-full pt-12">
                        <h2 className="mt-6 text-2xl font-semibold text-center lg:text-3xl xl:text-4xl">
                            Câu hỏi thường gặp
                        </h2>
                        <p className="max-w-lg mt-6 text-center text-neutral-500">
                            Đây là một số câu hỏi phổ biến nhất mà chúng tôi nhận được. Nếu bạn có câu hỏi không được trả lời ở đây, hãy liên hệ với chúng tôi.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto w-full mt-20">
                        <Accordion type="single" collapsible>
                            {FAQ.map((faq) => (
                                <AccordionItem key={faq.id} value={faq.id}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </AnimationContainer>

        </MaxWidthWrapper>
    )
};

export default PricingPage
