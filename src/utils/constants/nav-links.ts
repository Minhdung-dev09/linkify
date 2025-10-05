import { HelpCircleIcon, LineChartIcon, Link2Icon, LockIcon, NewspaperIcon, QrCodeIcon, Palette, Layout } from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Tính năng",
        href: "/features",
        menu: [
            {
                title: "Rút gọn liên kết",
                tagline: "Rút gọn link và theo dõi hiệu quả.",
                href: "/dashboard/links/create",
                icon: Link2Icon,
            },
            {
                title: "Bảo vệ bằng mật khẩu",
                tagline: "Bảo vệ liên kết bằng mật khẩu.",
                href: "/dashboard/links/create",
                icon: LockIcon,
            },
            {
                title: "Phân tích nâng cao",
                tagline: "Hiểu rõ ai đang bấm vào liên kết.",
                href: "/dashboard/links/create",
                icon: LineChartIcon,
            },
            {
                title: "Mã QR tuỳ chỉnh",
                tagline: "Dùng QR để tiếp cận người dùng.",
                href: "/dashboard/links/create",
                icon: QrCodeIcon,
            },
        ],
    },
    {
        title: "Builder",
        href: "/builder",
        icon: Palette,
        tagline: "Tạo landing page chuyên nghiệp với drag & drop",
    },
    {
        title: "Bảng giá",
        href: "/pricing",
        isModal: true, // Flag để trigger modal thay vì navigate
    },
    // {
    //     title: "Thư ngỏ",
    //     href: "/#investor",
    //     openInvestorModal: true,
    // },
];
