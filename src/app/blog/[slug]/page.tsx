// [slug]/page.tsx (Server Component – no "use client")
import { getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the client component so that interactivity works.
const BlogLayout = dynamic(() => import("@/components/BlogLayout.client"), {
    ssr: false,
});

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata | undefined> {
    let post = await getPost(params.slug);
    if (!post) return;

    const { title, publishedAt, summary, image } = post.metadata;
    const ogImage = image
        ? `${DATA.url}${image}`
        : `${DATA.url}/og?title=${title}`;

    return {
        title,
        description: summary,
        openGraph: {
            title,
            description: summary,
            type: "article",
            publishedTime: publishedAt,
            url: `${DATA.url}/blog/${post.slug}`,
            images: [{ url: ogImage }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: summary,
            images: [ogImage],
        },
    };
}

export default async function Blog({ params }: { params: { slug: string } }) {
    let post = await getPost(params.slug);
    if (!post) {
        notFound();
    }

    return (
        <BlogLayout>
            <section id="blog">
                <script
                    type="application/ld+json"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            headline: post.metadata.title,
                            datePublished: post.metadata.publishedAt,
                            dateModified: post.metadata.publishedAt,
                            description: post.metadata.summary,
                            image: post.metadata.image
                                ? `${DATA.url}${post.metadata.image}`
                                : `${DATA.url}/og?title=${post.metadata.title}`,
                            url: `${DATA.url}/blog/${post.slug}`,
                            author: {
                                "@type": "Person",
                                name: DATA.name,
                            },
                        }),
                    }}
                />
                <h1
                    id="blog-title"
                    className="title font-medium text-2xl tracking-tighter max-w-[650px]"
                >
                    {post.metadata.title}
                </h1>
                <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatDate(post.metadata.publishedAt)}
                    </p>
                </div>
                <article
                    className="prose dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: post.source }}
                ></article>
            </section>
        </BlogLayout>
    );
}
