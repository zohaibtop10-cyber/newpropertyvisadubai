import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  type?: string;
  structuredData?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'UAE Residency & Golden Visa Consultancy | Licensed Advisory',
  description = 'Licensed UAE business consultancy specialising in 10-year Golden Visas, property residency visas (AED 750K–2M+), family sponsorship, and DLD approvals with itemized fee transparency.',
  canonicalUrl = 'https://propertyvisadubai.ae',
  ogImage = 'https://propertyvisadubai.ae/og-image.jpg',
  type = 'website',
  structuredData,
}) => {
  const fullTitle = title.includes('UAE') ? title : `${title} | UAE Residency Consultancy`;

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="UAE Residency Consultancy" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
