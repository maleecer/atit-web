"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Article } from "@/lib/supabase-articles"
import { SITE_URL } from "@/lib/seo-config"
import { marked } from "marked"

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
})

interface ArticleClientProps {
  article: Article
}

function formatContent(content: string): string {
  try {
    const html = marked.parse(content);
    if (typeof html === "string") {
      return html;
    }
    return content;
  } catch (e) {
    console.error("Failed to parse article content as markdown:", e)
    return content
  }
}

export function ArticleClient({ article }: ArticleClientProps) {
  const shareToLinkedIn = () => {
    const url = `${SITE_URL}/articles/${article.slug}`
    const title = article.title || ""
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      "_blank"
    )
  }

  const shareToTwitter = () => {
    const url = `${SITE_URL}/articles/${article.slug}`
    const title = article.title || ""
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    )
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${SITE_URL}/articles/${article.slug}`)
  }

  const heroImage = article.images?.find((img) => img.position === "hero")
  const inlineImages = article.images?.filter((img) => img.position !== "hero") || []

  return (
    <article className="pt-24 pb-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to Articles
          </Link>

          {heroImage && (
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <img
                src={heroImage.url}
                alt={heroImage.caption || article.title}
                className="w-full h-full object-cover"
              />
              {heroImage.caption && (
                <p className="absolute bottom-4 left-4 right-4 text-sm text-white/80 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg">
                  {heroImage.caption}
                </p>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(article.tags) && article.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/articles?tag=${encodeURIComponent(tag.name)}`}
                className="px-3 py-1 text-sm bg-foreground/10 text-foreground/70 rounded-full hover:bg-foreground/20 transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{article.title}</h1>

          <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>

          <div className="flex items-center justify-between py-4 border-y border-border mb-8">
            <div className="flex items-center gap-3">
              {article.author?.avatar_url ? (
                <img
                  src={article.author.avatar_url}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground/60">
                    {article.author?.name?.charAt(0) || "?"}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">{article.author?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(article.published_at || article.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              {article.read_time_minutes} min read
            </div>
          </div>

          <div
            className="markdown-content max-w-none"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />

          {inlineImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {inlineImages.map((img, idx) => (
                <div key={idx} className="relative rounded-xl overflow-hidden">
                  <img src={img.url} alt={img.caption || ""} className="w-full h-auto" />
                  {img.caption && (
                    <p className="text-sm text-muted-foreground mt-2 text-center">{img.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {article.author && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 p-6 bg-card border border-border rounded-xl"
            >
              <div className="flex items-start gap-4">
                {article.author.avatar_url ? (
                  <img
                    src={article.author.avatar_url}
                    alt={article.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-foreground/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-foreground/60">
                      {article.author.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <h3 className="text-lg font-semibold text-foreground">{article.author.name}</h3>
                  {article.author.bio && (
                    <p className="text-sm text-muted-foreground mt-2">{article.author.bio}</p>
                  )}
                  <div className="flex gap-3 mt-4">
                    {article.author.linkedin_url && (
                      <a
                        href={article.author.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#0077b5]/10 text-[#0077b5] rounded-lg hover:bg-[#0077b5]/20 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {article.author.github_url && (
                      <a
                        href={article.author.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-4 py-6 border-t border-border"
          >
            <span className="text-sm text-muted-foreground">Share:</span>
            <button
              onClick={shareToLinkedIn}
              className="flex items-center gap-2 px-4 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#0077b5]/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
            <button
              onClick={shareToTwitter}
              className="flex items-center gap-2 px-4 py-2 bg-[#1da1f2] text-white rounded-lg hover:bg-[#1da1f2]/90 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </button>
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 bg-foreground/10 text-foreground rounded-lg hover:bg-foreground/20 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              Copy
            </button>
          </motion.div>
        </motion.div>
      </div>
    </article>
  )
}
