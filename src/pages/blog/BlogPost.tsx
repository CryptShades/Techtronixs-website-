import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageMeta from "@/components/PageMeta";
import insightsData from "@/data/insights.json";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = insightsData.find(p => p.slug === slug);

  if (!post) return <Navigate to="/" replace />;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Techtronix Solutions",
      "url": "https://techtronixsolutions.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Techtronix Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://techtronixsolutions.com/logo.png",
        "width": 280,
        "height": 60,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://techtronixsolutions.com/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://techtronixsolutions.com/" },
      { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://techtronixsolutions.com/insights" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://techtronixsolutions.com/blog/${post.slug}` },
    ],
  };

  return (
    <MainLayout>
      <PageMeta
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage="https://techtronixsolutions.com/og-insights.png"
        keywords={`${post.tag}, IT insights India, Techtronix Solutions blog`}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className="relative py-28 md:py-36">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">

            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* Category badge */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-lg mb-6 ${post.color}`}
            >
              {post.tag}
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-4xl md:text-5xl font-display font-bold tracking-tight text-foreground mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/60"
            >
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.read}
              </div>
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                Techtronix Solutions
              </div>
            </motion.div>

            {/* Content stub */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="prose prose-neutral dark:prose-invert max-w-none"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
                <p className="text-sm font-medium text-foreground mb-2">Full article coming soon</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Our team is finalising this article. Subscribe for updates or contact us to discuss this topic with an expert.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Talk to an expert
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default BlogPost;
