export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'UAE Residency & Golden Visa Consultancy',
    image: 'https://propertyvisadubai.ae/og-image.jpg',
    '@id': 'https://propertyvisadubai.ae',
    url: 'https://propertyvisadubai.ae',
    telephone: '+97140000000',
    priceRange: 'AED 4200 - AED 11233',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Business Bay, Downtown Dubai',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '00000',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.1857,
      longitude: 55.2678,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://facebook.com',
      'https://instagram.com',
      'https://linkedin.com',
    ],
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faqs || []).map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}
