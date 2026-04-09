import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import insights from "@/data/insights.json";
import config from "@/data/site.config.json";
import { blogContent } from "@/data/blog-content";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = insights.find(p => p.slug === slug);
  const content = post ? (blogContent[post.slug] ?? []) : [];

  if (!post) {
    return (
      <MainLayout>
        <PageMeta
          title="Article Not Found | Techtronix Solutions"
          description="The article you are looking for could not be found."
          canonical={`/blog/${slug}`}
        />
        <section className="py-40 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for could not be found.</p>
          <Button asChild>
            <Link to="/"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Home</Link>
          </Button>
        </section>
      </MainLayout>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt,
    "url": post.canonicalUrl,
    "author": {
      "@type": "Organization",
      "name": post.author.name,
      "url": post.author.url,
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${config.baseUrl}/#organization`,
      "name": config.brand,
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonicalUrl,
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".blog-headline", ".blog-excerpt"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",    "item": `${config.baseUrl}/`             },
      { "@type": "ListItem", "position": 2, "name": "Insights", "item": `${config.baseUrl}/`            },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": post.canonicalUrl               },
    ],
  };

  const relatedPosts = insights.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <MainLayout>
      <PageMeta
        title={`${post.title} | ${config.brand}`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        keywords={`${post.tag}, managed IT services India, IT infrastructure, Techtronix Solutions`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="blob blob-xl absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-[95px] animate-float dark:bg-primary/5" />
        </div>
        <div className="container mx-auto px-4 max-w-3xl relative">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-secondary">
                <Tag className="h-3 w-3" />
                {post.tag}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {post.readMinutes} min read
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>

            <h1 className="blog-headline text-3xl md:text-5xl font-display font-bold text-foreground leading-tight mb-6">
              {post.title}
            </h1>
            <p className="blog-excerpt text-lg text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Article Body ──────────────────────────────── */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card card-elevated p-8 md:p-12"
          >
            <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
              {content.length > 0 ? (
                content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <>
                  <p>
                    This article is being prepared by the Techtronix Solutions team. Full content will be published shortly.
                  </p>
                  <p>
                    In the meantime, explore our services or contact our team for expert guidance on {post.tag.toLowerCase()} solutions tailored to your business requirements.
                  </p>
                </>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Published by</p>
                <p className="font-semibold text-foreground text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                  {post.updatedAt !== post.publishedAt && ` · Updated ${new Date(post.updatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
                </p>
              </div>
              <Button asChild className="sm:ml-auto rounded-xl gradient-peach border-0 text-secondary-foreground font-semibold hover:opacity-90">
                <Link to="/contact">Get Expert Advice <ArrowRight className="h-3.5 w-3.5 ml-1.5" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Related Articles ──────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-muted/25 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-xl font-display font-bold text-foreground mb-8">Related Insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedPosts.map(related => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group rounded-2xl border border-border bg-card card-elevated p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/6 transition-all duration-300"
                >
                  <span className="text-xs font-semibold text-primary mb-2 block">{related.tag}</span>
                  <h3 className="font-display font-semibold text-foreground text-sm leading-snug group-hover:text-primary transition-colors mb-2">
                    {related.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{related.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-semibold mt-4">
                    Read article <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default BlogPost;
