import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  SiteSettingsDoc,
  siteSettingsConverter,
  CalculatorRuleDoc,
  calculatorRuleConverter,
  ServiceDoc,
  serviceConverter,
  TestimonialDoc,
  testimonialConverter,
  FAQDoc,
  faqConverter,
  BlogPostDoc,
  blogPostConverter,
} from '../lib/converters';
import { seedData } from '../../scripts/seed';

// Default Fallbacks for initial state while Firestore loads
const defaultSiteSettings: SiteSettingsDoc = {
  companyName: 'UAE Residency Consultancy',
  licenseNumber: 'DET-100234',
  issuingAuthority: 'Dubai Economy and Tourism (DET)',
  address: 'Business Bay, Downtown Dubai, United Arab Emirates',
  phone: '+971 4 000 0000',
  whatsapp: '971501234567',
  email: 'advisory@clientdomain.ae',
  officeHours: 'Mon-Fri 9:00 AM - 6:00 PM GST',
  authorityLogos: ['DLD', 'ICP', 'GDRFA', 'DET'],
  stats: {
    visasProcessed: 15000,
    avgDays: 7,
    complianceRate: 100,
  },
};

// 1. Hook for Site Settings
export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsDoc>(defaultSiteSettings);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Bypass fetch to show seed data immediately
    setLoading(false);
  }, []);

  return { settings, loading };
}

// 2. Hook for Calculator Rules
export function useCalculatorRules() {
  const [rules, setRules] = useState<CalculatorRuleDoc[]>(seedData.calculatorRules as any);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { rules, loading };
}

// 3. Hook for Services Grid
export function useServices() {
  const [services, setServices] = useState<ServiceDoc[]>(seedData.services as any);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { services, loading };
}

// 4. Hook for Testimonials
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialDoc[]>(seedData.testimonials as any);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { testimonials, loading };
}

// 5. Hook for FAQs
export function useFaqs() {
  const [faqs, setFaqs] = useState<FAQDoc[]>(seedData.faqs as any);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { faqs, loading };
}

// 6. Hook for Blog Preview
export function useBlogPosts(limitCount = 3) {
  const [posts, setPosts] = useState<BlogPostDoc[]>([]); // Seed data doesn't have blog posts yet
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, [limitCount]);

  return { posts, loading };
}

// 7. Hook for Single Service
export function useService(pageId: string) {
  const [service, setService] = useState<ServiceDoc | null>(
    (seedData.services as any).find((s: ServiceDoc) => s.slug === pageId || s.id === pageId) || null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Bypass fetch to show seed data immediately
    setLoading(false);
  }, [pageId]);

  return { service, loading };
}

