import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Article not found" };
  }
  return {
    title: `${post.title} | Blog`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "SpeechTherapyDirectories.com",
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-3xl">
        <header className="space-y-3 border-b border-slate-200 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Blog
          </p>
          <p className="text-xs text-slate-500">{formatDate(post.date)}</p>
          <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-sm text-slate-600">{post.description}</p>
        </header>

        <div
          className="blog-content pt-8 text-sm leading-relaxed text-slate-700 [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-navy [&_h1]:first:mt-0 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-navy [&_p]:mb-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_strong]:font-semibold [&_a]:text-teal [&_a]:underline [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:border-teal/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_hr]:my-8 [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.9em]"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      <div className="mx-auto mt-12 flex max-w-3xl flex-wrap gap-4 text-sm text-slate-600">
        <Link href="/blog" className="text-teal hover:text-teal-soft">
          ← All articles
        </Link>
        <Link href="/" className="text-teal hover:text-teal-soft">
          Homepage
        </Link>
      </div>
    </main>
  );
}
