import { Helmet } from "react-helmet-async";
import config from "@/data/site.config.json";

interface PageMetaProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string;
}

const BASE_URL   = config.baseUrl;
const DEFAULT_OG = config.defaultOgImage;
const BRAND      = config.brand;
const TWITTER    = config.twitter;

const PageMeta = ({ title, description, canonical, ogImage = DEFAULT_OG, keywords }: PageMetaProps) => {
  const fullTitle    = title.includes("Techtronix") ? title : `${title} | ${BRAND}`;
  const fullCanonical = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description"  content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical"     href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url"         content={fullCanonical} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:type"        content="website" />
      <meta property="og:site_name"   content={BRAND} />
      <meta property="og:locale"      content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
};

export default PageMeta;
