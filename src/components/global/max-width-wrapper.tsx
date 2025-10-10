import { cn } from "@/utils";
import React from 'react';

interface Props {
    className?: string;
    children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: Props) => {
    return (
        <section className={cn(
            "h-full w-full px-4 md:px-6 lg:px-8",
            className,
        )}>
            {children}
        </section>
    )
};

export default MaxWidthWrapper