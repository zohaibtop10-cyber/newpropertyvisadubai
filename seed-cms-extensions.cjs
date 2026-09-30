const { initializeApp } = require('firebase/app');
const { getDatabase, ref, update } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyAP-oCkkrZSvrrkeK9z8nlTkiyqIXYENZ4",
  authDomain: "propertyvisadubai-web.firebaseapp.com",
  projectId: "propertyvisadubai-web",
  storageBucket: "propertyvisadubai-web.firebasestorage.app",
  messagingSenderId: "959687147450",
  appId: "1:959687147450:web:e59845719d500fa4f6e783",
  databaseURL: "https://propertyvisadubai-web-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function seedCmsExtensions() {
  try {
    console.log('Seeding new CMS sections into cmsConfig...');
    
    // Seed aboutPage config
    const aboutPage = {
      hero: {
        badge: "Official DET-Licensed Provider",
        title: "About 800 DOCS — Your Trusted UAE Consultancy",
        subtitle: "800 DOCS is a UAE-based consultancy providing comprehensive solutions for individuals, families, investors, entrepreneurs, and businesses."
      },
      welcome: {
        badge: "Welcome to 800 DOCS UAE",
        title: "A Strong Future Starts with a Strong Foundation",
        p1: "As your trusted UAE consultancy partner, 800 DOCS helps individuals, families, investors, entrepreneurs, and businesses turn their goals into reality.",
        p2: "From UAE residency and Golden Visas to business setup, property and professional services, we simplify complex processes.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
        ceo: {
          title: "Founder & CEO, 800 DOCS",
          name: "Executive Director",
          quote: "I built 800 DOCS with one purpose — to create a link between ambition and opportunity."
        }
      },
      license: {
        badge: "DET Verified Authority",
        title: "Officially Licensed for Government Applications",
        description: "We are a registered Dubai consultancy, authorised to support and process your government applications.",
        daysImpact: "2500+",
        card: {
          authority: "Government of Dubai – Economy & Tourism (DET)",
          licenseNo: "800-DOCS-LLC",
          businessName: "800 DOCS Management Consultancy LLC",
          registrationDate: "10/04/2015",
          legalType: "LLC",
          activities: "Management Consultancies | Documents Clearing Services | Project Development Consultant"
        }
      },
      strength: {
        badge: "Active",
        title: "Our Strength in Numbers",
        subtitle: "Trusted UAE Consultants with 10+ Years of Experience",
        stats: [
          { value: "10+", label: "Years in Market" },
          { value: "4.9", label: "Google Rating" },
          { value: "25+", label: "Team Members" },
          { value: "15,000+", label: "Clients Assisted" }
        ]
      },
      visionMission: {
        badge: "Our Vision & Mission",
        title: "Your Goals Matter to Us",
        description: "At 800 DOCS, understanding your goals comes first.",
        tabs: [
          { id: "promise", label: "Our Promise", content: "To make every process simple, transparent, and stress-free." },
          { id: "mission", label: "Our Mission", content: "To empower entrepreneurs, investors, professionals, and families." },
          { id: "vision", label: "Our Vision", content: "To be a trusted link between people and opportunities in the UAE." }
        ]
      },
      pillars: {
        badge: "Why 800 DOCS?",
        title: "What Makes Us Different",
        items: [
          { icon: "Shield", title: "Trust", desc: "We stand by you from your first enquiry to successful completion." },
          { icon: "CheckCircle2", title: "Reliability", desc: "Clear communication and commitments you can depend on." },
          { icon: "Diamond", title: "Transparency", desc: "Straightforward guidance and clear costs." },
          { icon: "Users", title: "Client Experience", desc: "Personalised support designed to simplify every process." },
          { icon: "Award", title: "Service Excellence", desc: "Professional service focused on quality." }
        ]
      },
      reviews: {
        badge: "Client Success Stories",
        title: "Real Clients, Real Results",
        items: [
          { name: "M J", text: "Very professional and effective. Golden Visa done perfectly." },
          { name: "Tausif Ahmad", text: "Excellent service with prompt response." },
          { name: "ZeeShan Butt", text: "Very Honest and helpful team." },
          { name: "Muhammad", text: "800 DOCS deserved 100/100. VIP treatment." }
        ]
      },
      businessSetup: {
        title: "Start Your Dubai Business with Confidence",
        description: "End-to-end business setup support tailored to your goals."
      },
      referral: {
        title: "Grow Together with Our B2B Referral Program",
        description: "Partner with 800 DOCS through our structured referral program.",
        buttonText: "Become a Referral Partner"
      }
    };

    // Seed locationsPage config
    const locationsPage = {
      headline: "Customer Happiness & Medical Screening Hubs",
      subtext: "Locate approved GDRFA, ICP, and Health Authority centres across Dubai, Abu Dhabi, and Sharjah.",
      cta: {
        title: "Don't Want to Queue at Government Centres?",
        description: "Our licensed PROs greet you at the entrance, bypass standard lines, and guide your family.",
        buttonText: "Book VIP Escort Package"
      }
    };

    // Seed property page
    const propertyPage = {
      headline: "Comprehensive Property Investor Services",
      subtext: "End-to-end management for property investors. From DLD registration to Golden Visa processing."
    };

    await update(ref(db, 'cmsConfig'), {
      aboutPage,
      locationsPage,
      'pages/property': propertyPage
    });

    console.log('🎉 CMS Extensions seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seedCmsExtensions();
