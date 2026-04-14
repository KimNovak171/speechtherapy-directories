import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Speech Therapy Resources",
  description:
    "Articles on speech therapy, language development, and finding care — from SpeechTherapyDirectories.com.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Speech Therapy Resources",
    url: "/blog",
    siteName: "SpeechTherapyDirectories.com",
    type: "website",
  },
};

function formatDate(isoDate: string) {
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          Blog
        </p>
        <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
          Speech therapy resources
        </h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Practical guides on speech and language topics, therapy options, and
          how to choose support for yourself or your family.
        </p>
      </header>

      <ul className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <article className="space-y-2">
              <p className="text-xs text-slate-500">{formatDate(post.date)}</p>
              <h2 className="text-lg font-semibold text-navy">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-teal-soft transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="max-w-3xl text-sm text-slate-600">
                {post.description}
              </p>
              <p className="pt-1">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-medium text-teal hover:text-teal-soft"
                >
                  Read article →
                </Link>
              </p>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-sm text-slate-600">
        <Link href="/" className="text-teal hover:text-teal-soft">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
