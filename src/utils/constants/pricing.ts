// export const PLANS = [
//     {
//         name: "Free",
//         info: "For most individuals",
//         price: {
//             monthly: 0,
//             yearly: 0,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 100 tags", limit: "100 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "1K clicks/month" },
//             { text: "Community support", tooltip: "Get answers your questions on discord" },
//             { text: "AI powered suggestions", tooltip: "Get up to 100 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Start for free",
//             href: "/auth/sign-up?plan=free",
//             variant: "default",
//         }
//     },
//     {
//         name: "Pro",
//         info: "For small businesses",
//         price: {
//             monthly: 9,
//             yearly: 90,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 500 tags", limit: "500 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "20K clicks/month" },
//             { text: "Export click data", tooltip: "Upto 1K links" },
//             { text: "Priority support", tooltip: "Get 24/7 chat support" },
//             { text: "AI powered suggestions", tooltip: "Get up to 500 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Get started",
//             href: "/auth/sign-up?plan=pro",
//             variant: "purple",
//         }
//     },
//     {
//         name: "Business",
//         info: "For large organizations",
//         price: {
//             monthly: 49,
//             yearly: 490,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Unlimited tags" },
//             { text: "Customizable branded links"},
//             { text: "Track clicks", tooltip: "Unlimited clicks" },
//             { text: "Export click data", tooltip: "Unlimited clicks" },
//             { text: "Dedicated manager", tooltip: "Get priority support from our team" },
//             { text: "AI powered suggestions", tooltip: "Get unlimited AI powered suggestions" },
//         ],
//         btn: {
//             text: "Contact team",
//             href: "/auth/sign-up?plan=business",
//             variant: "default",
//         }
//     }
// ];

// export const PRICING_FEATURES = [
//     {
//         text: "Shorten links",
//         tooltip: "Create shortened links",
//     },
//     {
//         text: "Track clicks",
//         tooltip: "Track clicks on your links",
//     },
//     {
//         text: "See top countries",
//         tooltip: "See top countries where your links are clicked",
//     },
//     {
//         text: "Upto 10 tags",
//         tooltip: "Add upto 10 tags to your links",
//     },
//     {
//         text: "Community support",
//         tooltip: "Community support is available for free users",
//     },
//     {
//         text: "Priority support",
//         tooltip: "Get priority support from our team",
//     },
//     {
//         text: "AI powered suggestions",
//         tooltip: "Get AI powered suggestions for your links",
//     },
// ];

// export const WORKSPACE_LIMIT = 2;
export const PLANS = [
    {
        name: "Free",
        info: "Dành cho cá nhân bắt đầu",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "Rút gọn liên kết" },
            { text: "Tối đa 20 link", limit: "20 link" },
            { text: "Tạo 3 landing page", tooltip: "Sử dụng builder drag & drop" },
            { text: "Theo dõi lượt click cơ bản", tooltip: "500 lượt click/tháng" },
            { text: "Mã QR cơ bản" },
            { text: "Hỗ trợ cộng đồng", tooltip: "Thông qua Discord/Forum" },
            { text: "Gợi ý AI cơ bản", tooltip: "50 gợi ý AI/tháng" },
        ],
        btn: {
            text: "Bắt đầu miễn phí",
            href: "/auth/sign-up?plan=free",
            variant: "default",
        }
    },
    {
        name: "Pro (Tháng)",
        info: "Dành cho cá nhân chuyên nghiệp",
        price: {
            monthly: 199000,
            yearly: 199000,
        },
        features: [
            { text: "Rút gọn liên kết không giới hạn" },
            { text: "Tối đa 100 link", limit: "100 link" },
            { text: "Tạo 10 landing page", tooltip: "Với tất cả elements và templates" },
            { text: "Phân tích nâng cao", tooltip: "10K lượt click/tháng + biểu đồ chi tiết" },
            { text: "Bảo vệ bằng mật khẩu" },
            { text: "Mã QR tùy chỉnh" },
            { text: "Xuất báo cáo có watermark", tooltip: "PDF, CSV, Excel" },
            { text: "Gợi ý AI nâng cao", tooltip: "500 gợi ý AI/tháng" },
        ],
        btn: {
            text: "Bắt đầu",
            href: "/auth/sign-up?plan=pro-monthly",
            variant: "purple",
        }
    },
    {
        name: "Pro (Năm)",
        info: "Dành cho cá nhân chuyên nghiệp",
        price: {
            monthly: 1490000,
            yearly: 1490000,
        },
        features: [
            { text: "Rút gọn liên kết không giới hạn" },
            { text: "Tối đa 1000 link", limit: "1000 link" },
            { text: "Tạo 50 landing page", tooltip: "Với tất cả elements và templates" },
            { text: "Phân tích nâng cao", tooltip: "100K lượt click/tháng + biểu đồ chi tiết" },
            { text: "Bảo vệ bằng mật khẩu" },
            { text: "Mã QR tùy chỉnh" },
            { text: "Xuất báo cáo không có watermark", tooltip: "PDF, CSV, Excel" },
            { text: "Gợi ý AI nâng cao", tooltip: "500 gợi ý AI/tháng" },
        ],
        btn: {
            text: "Bắt đầu",
            href: "/auth/sign-up?plan=pro-yearly",
            variant: "purple",
        }
    }
];

export const PRICING_FEATURES = [
    {
        text: "Shorten links",
        tooltip: "Create shortened links",
    },
    {
        text: "Track clicks",
        tooltip: "Track clicks on your links",
    },
    {
        text: "See top countries",
        tooltip: "See top countries where your links are clicked",
    },
    {
        text: "Upto 10 tags",
        tooltip: "Add upto 10 tags to your links",
    },
    {
        text: "Community support",
        tooltip: "Community support is available for free users",
    },
    {
        text: "Priority support",
        tooltip: "Get priority support from our team",
    },
    {
        text: "AI powered suggestions",
        tooltip: "Get AI powered suggestions for your links",
    },
];

export const WORKSPACE_LIMIT = 2;