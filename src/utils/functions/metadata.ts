import { Metadata } from "next";

export const generateMetadata = ({
    title = `Ccmelinktracker - The Link Management Platform for Businesses`,
    description = `Ccmelinktracker is the link management platform for businesses. It helps you build, brand, and track your links.`,
    image = "/thumbnail.png",
    icons = [
        {
            rel: "apple-touch-icon",
            sizes: "32x32",
            url: "/apple-touch-icon.png"
        },
        {
            rel: "icon",
            sizes: "32x32",
            url: "/favicon-32x32.png"
        },
        {
            rel: "icon",
            sizes: "16x16",
            url: "/favicon-16x16.png"
        },
    ],
    noIndex = false
}: {
    title?: string;
    description?: string;
    image?: string | null;
    icons?: Metadata["icons"];
    noIndex?: boolean;
} = {}): Metadata => ({
    title,
    description,
    icons,
    metadataBase: new URL(
        (process.env.NEXT_PUBLIC_SITE_URL as string) ||
        `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}` ||
        "http://localhost:3000"
    ),
    openGraph: {
        title,
        description,
        ...(image && { images: [{ url: image }] }),
    },
    twitter: {
        title,
        description,
        ...(image && { card: "summary_large_image", images: [image] }),
        creator: "@shreyassihasane",
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
});
