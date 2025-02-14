import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
    name: "Keshav Kumar",
    initials: "DV",
    url: "https://dillion.io",
    location: "San Francisco, CA",
    locationLink: "https://www.google.com/maps/place/sanfrancisco",
    description:
        "Student. I love building things and helping people. Very active on Instagram.",
    summary:
        "Currently pursuing Bachelors of Technology in Electronics and communication engineering at IIT (ISM) Dhanbad  ",
    avatarUrl: "/me.png",
    skills: [
        "React",
        "Next.js",
        "Typescript",
        "Node.js",
        "Python",
        "Go",
        "Postgres",
        "Docker",
        "Kubernetes",
        "C++",
    ],
    navbar: [
        { href: "/", icon: HomeIcon, label: "Home" },
        { href: "/blog", icon: NotebookIcon, label: "Blog" },
    ],
    contact: {
        email: "hello@example.com",
        tel: "+123456789",
        social: {
            GitHub: {
                name: "GitHub",
                url: "",
                icon: Icons.github,

                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "",
                icon: Icons.linkedin,

                navbar: true,
            },
            X: {
                name: "X",
                url: "",
                icon: Icons.x,

                navbar: true,
            },
            Youtube: {
                name: "Youtube",
                url: "",
                icon: Icons.youtube,
                navbar: true,
            },
            email: {
                name: "Send Email",
                url: "#",
                icon: Icons.email,

                navbar: false,
            },
        },
    },

    work: [
        {
            company: "XYZ",
            badges: [],
            href: "https://xyz.com",
            location: "Remote",
            title: "Software Engineer",
            logoUrl: "/shopify.svg",
            start: "January 2021",
            end: "April 2021",
            description: "Implemented ",
        },
    ],
    education: [
        {
            school: "IIT (ISM) Dhanbad",
            href: "https://www.iitism.ac.in",
            degree: "Bachelor's Degree of Electronics and Communication Engineering (ECE)",
            logoUrl: "/ISM_logo.png",
            start: "2022",
            end: "2026",
        },
    ],
    projects: [
        {
            title: "Chat Collect",
            href: "https://chatcollect.com",
            dates: "Jan 2024 - Feb 2024",
            active: true,
            description:
                "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Stripe",
                "Shadcn UI",
                "Magic UI",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://chatcollect.com",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "",
            video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
        },
        {
            title: "Magic UI",
            href: "https://magicui.design",
            dates: "June 2023 - Present",
            active: true,
            description:
                "Designed, developed and sold animated UI components for developers.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Stripe",
                "Shadcn UI",
                "Magic UI",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://magicui.design",
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: "Source",
                    href: "https://github.com/magicuidesign/magicui",
                    icon: <Icons.github className="size-3" />,
                },
            ],
            image: "",
            video: "https://cdn.magicui.design/bento-grid.mp4",
        },
        {
            title: "llm.report",
            href: "https://llm.report",
            dates: "April 2023 - September 2023",
            active: true,
            description:
                "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Shadcn UI",
                "Magic UI",
                "Stripe",
                "Cloudflare Workers",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://llm.report",
                    icon: <Icons.globe className="size-3" />,
                },
                {
                    type: "Source",
                    href: "https://github.com/dillionverma/llm.report",
                    icon: <Icons.github className="size-3" />,
                },
            ],
            image: "",
            video: "https://cdn.llm.report/openai-demo.mp4",
        },
        {
            title: "Automatic Chat",
            href: "https://automatic.chat",
            dates: "April 2023 - March 2024",
            active: true,
            description:
                "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Shadcn UI",
                "Magic UI",
                "Stripe",
                "Cloudflare Workers",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://automatic.chat",
                    icon: <Icons.globe className="size-3" />,
                },
            ],
            image: "",
            video: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
        },
    ],
    hackathons: [
        {
            title: "HackDavis",
            dates: "January 20th - 21st, 2018",
            location: "Davis, California",
            description:
                "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
            image: "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
            win: "Best Data Hack",
            mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
            links: [
                {
                    title: "Devpost",
                    icon: <Icons.globe className="h-4 w-4" />,
                    href: "https://devpost.com/software/my6footprint",
                },
                {
                    title: "ML",
                    icon: <Icons.github className="h-4 w-4" />,
                    href: "https://github.com/Wallet6/my6footprint-machine-learning",
                },
                {
                    title: "iOS",
                    icon: <Icons.github className="h-4 w-4" />,
                    href: "https://github.com/Wallet6/CarbonWallet",
                },
                {
                    title: "Server",
                    icon: <Icons.github className="h-4 w-4" />,
                    href: "https://github.com/Wallet6/wallet6-server",
                },
            ],
        },
    ],
} as const;
