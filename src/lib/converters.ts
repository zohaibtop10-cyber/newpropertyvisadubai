import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
} from 'firebase/firestore';

// 1. Service Interface & Converter
export interface ServiceDoc {
  id?: string;
  title: string;
  slug: string;
  category: 'property' | 'golden' | 'family' | 'pro' | 'other';
  shortDescription: string;
  startingFee: number;
  governmentFee: number;
  serviceFee: number;
  timelineDays: number;
  thresholdAmount?: number;
  requirements: string[];
  requiredDocs: string[];
  status: 'active' | 'draft';
  createdAt?: any;
  updatedAt?: any;
}

export const serviceConverter: FirestoreDataConverter<ServiceDoc> = {
  toFirestore(service: ServiceDoc): DocumentData {
    return { ...service };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): ServiceDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      title: data.title || '',
      slug: data.slug || '',
      category: data.category || 'other',
      shortDescription: data.shortDescription || '',
      startingFee: data.startingFee || 0,
      governmentFee: data.governmentFee || 0,
      serviceFee: data.serviceFee || 0,
      timelineDays: data.timelineDays || 7,
      thresholdAmount: data.thresholdAmount,
      requirements: data.requirements || [],
      requiredDocs: data.requiredDocs || [],
      status: data.status || 'active',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  },
};

// 2. PageDoc Interface & Converter
export interface PageDoc {
  id?: string;
  slug: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  sections?: Record<string, any>;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt?: any;
}

export const pageConverter: FirestoreDataConverter<PageDoc> = {
  toFirestore(page: PageDoc): DocumentData {
    return { ...page };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): PageDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      slug: data.slug || '',
      title: data.title || '',
      heroHeadline: data.heroHeadline || '',
      heroSubheadline: data.heroSubheadline || '',
      sections: data.sections || {},
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      updatedAt: data.updatedAt,
    };
  },
};

// 3. BlogPost Interface & Converter
export interface BlogPostDoc {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTimeMinutes: number;
  publishDate: string;
  status: 'published' | 'draft';
  coverImageUrl?: string;
  createdAt?: any;
}

export const blogPostConverter: FirestoreDataConverter<BlogPostDoc> = {
  toFirestore(post: BlogPostDoc): DocumentData {
    return { ...post };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): BlogPostDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      slug: data.slug || '',
      title: data.title || '',
      excerpt: data.excerpt || '',
      content: data.content || '',
      category: data.category || 'General',
      author: data.author || 'Advisory Team',
      readTimeMinutes: data.readTimeMinutes || 5,
      publishDate: data.publishDate || new Date().toISOString().split('T')[0],
      status: data.status || 'published',
      coverImageUrl: data.coverImageUrl,
      createdAt: data.createdAt,
    };
  },
};

// 4. FAQ Interface & Converter
export interface FAQDoc {
  id?: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  routeSpecific?: string[];
}

export const faqConverter: FirestoreDataConverter<FAQDoc> = {
  toFirestore(faq: FAQDoc): DocumentData {
    return { ...faq };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): FAQDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      question: data.question || '',
      answer: data.answer || '',
      category: data.category || 'General',
      order: data.order || 0,
      routeSpecific: data.routeSpecific || [],
    };
  },
};

// 5. Testimonial Interface & Converter
export interface TestimonialDoc {
  id?: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  photoUrl?: string;
  quote: string;
  relativeTime: string;
  serviceTag: string;
  googleReviewUrl?: string;
  rating: number;
}

export const testimonialConverter: FirestoreDataConverter<TestimonialDoc> = {
  toFirestore(t: TestimonialDoc): DocumentData {
    return { ...t };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): TestimonialDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      clientName: data.clientName || '',
      clientRole: data.clientRole || '',
      companyName: data.companyName || '',
      photoUrl: data.photoUrl,
      quote: data.quote || '',
      relativeTime: data.relativeTime || 'Recently',
      serviceTag: data.serviceTag || 'Golden Visa',
      googleReviewUrl: data.googleReviewUrl,
      rating: data.rating || 5,
    };
  },
};

// 6. TeamMember Interface & Converter
export interface TeamMemberDoc {
  id?: string;
  name: string;
  title: string;
  specialization: string;
  photoUrl?: string;
  order: number;
}

export const teamMemberConverter: FirestoreDataConverter<TeamMemberDoc> = {
  toFirestore(team: TeamMemberDoc): DocumentData {
    return { ...team };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): TeamMemberDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name || '',
      title: data.title || '',
      specialization: data.specialization || '',
      photoUrl: data.photoUrl,
      order: data.order || 0,
    };
  },
};

// 7. LineItem for Calculator
export interface LineItem {
  label: string;
  amount: number;
}

// CalculatorRule Interface & Converter
export interface CalculatorRuleDoc {
  id?: string;
  routeName: string;
  routeId: 'property' | 'company' | 'salaried' | 'deposit' | 'family';
  thresholdAmount: number;
  governmentFees: LineItem[];
  serviceFees: LineItem[];
  familyMemberFeePerDependent: number;
  timelineDays: number;
}

export const calculatorRuleConverter: FirestoreDataConverter<CalculatorRuleDoc> = {
  toFirestore(rule: CalculatorRuleDoc): DocumentData {
    return { ...rule };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): CalculatorRuleDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      routeName: data.routeName || '',
      routeId: data.routeId || 'property',
      thresholdAmount: data.thresholdAmount || 0,
      governmentFees: data.governmentFees || [],
      serviceFees: data.serviceFees || [],
      familyMemberFeePerDependent: data.familyMemberFeePerDependent || 0,
      timelineDays: data.timelineDays || 7,
    };
  },
};

// 8. Lead Interface & Converter
export interface LeadDoc {
  id?: string;
  name: string;
  email: string;
  phone: string;
  serviceInterest: string;
  route?: string;
  calculatorSnapshot?: {
    inputs: Record<string, any>;
    governmentFees: LineItem[];
    serviceFees: LineItem[];
    totalAmount: number;
  };
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
  notes?: string[];
  createdAt?: any;
}

export const leadConverter: FirestoreDataConverter<LeadDoc> = {
  toFirestore(lead: LeadDoc): DocumentData {
    return { ...lead };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): LeadDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      serviceInterest: data.serviceInterest || '',
      route: data.route,
      calculatorSnapshot: data.calculatorSnapshot,
      status: data.status || 'New',
      notes: data.notes || [],
      createdAt: data.createdAt,
    };
  },
};

// 9. SiteSettings Interface & Converter
export interface SiteSettingsDoc {
  id?: string;
  companyName: string;
  licenseNumber: string;
  issuingAuthority: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  officeHours: string;
  authorityLogos: string[];
  stats: {
    visasProcessed: number;
    avgDays: number;
    complianceRate: number;
  };
}

export const siteSettingsConverter: FirestoreDataConverter<SiteSettingsDoc> = {
  toFirestore(settings: SiteSettingsDoc): DocumentData {
    return { ...settings };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): SiteSettingsDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      companyName: data.companyName || 'UAE Consultancy',
      licenseNumber: data.licenseNumber || 'DET-000000',
      issuingAuthority: data.issuingAuthority || 'DET Dubai',
      address: data.address || 'Business Bay, Dubai, UAE',
      phone: data.phone || '+971 4 000 0000',
      whatsapp: data.whatsapp || '971500000000',
      email: data.email || 'advisory@clientdomain.ae',
      officeHours: data.officeHours || 'Mon-Fri 9:00 AM - 6:00 PM GST',
      authorityLogos: data.authorityLogos || [],
      stats: data.stats || {
        visasProcessed: 15000,
        avgDays: 7,
        complianceRate: 100,
      },
    };
  },
};

// 10. UserProfile Interface & Converter
export interface UserProfileDoc {
  id?: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor' | 'sales';
  createdAt?: any;
}

export const userProfileConverter: FirestoreDataConverter<UserProfileDoc> = {
  toFirestore(user: UserProfileDoc): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): UserProfileDoc {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      email: data.email || '',
      displayName: data.displayName || '',
      role: data.role || 'sales',
      createdAt: data.createdAt,
    };
  },
};
