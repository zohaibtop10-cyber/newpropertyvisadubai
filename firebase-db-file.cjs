const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const fs = require('fs');

// We will read adminState.js and cmsData.js, extract the objects, and upload them to Firebase.
let adminContent = fs.readFileSync('src/data/adminState.js', 'utf8');
let cmsContent = fs.readFileSync('src/data/cmsData.js', 'utf8');

// Quick and dirty way to parse: turn them into CJS modules
const cleanAdmin = adminContent.replace(/export const/g, 'const').replace(/import[\s\S]*?['"][^'"]+['"];?/g, '');
const cleanCms = cmsContent.replace(/export const/g, 'const');

fs.writeFileSync('temp-admin.cjs', cleanAdmin + '\nmodule.exports = { INITIAL_STAFF_USERS, INITIAL_TELEMETRY, INITIAL_DOSSIERS, INITIAL_TARIFFS, INITIAL_CMS_CONFIG, INITIAL_AUDIT_LOGS };');
fs.writeFileSync('temp-cms.cjs', cleanCms + '\nmodule.exports = { servicesData, reviewsData, blogPostsData, blogCategories, siteConfig, diyProcessGuides };');

const adminData = require('./temp-admin.cjs');
const cmsData = require('./temp-cms.cjs');

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

async function seedDatabase() {
  try {
    console.log('Seeding Database...');
    await set(ref(db, 'cmsConfig'), adminData.INITIAL_CMS_CONFIG);
    await set(ref(db, 'staffUsers'), adminData.INITIAL_STAFF_USERS);
    await set(ref(db, 'telemetry'), adminData.INITIAL_TELEMETRY);
    await set(ref(db, 'dossiers'), adminData.INITIAL_DOSSIERS);
    await set(ref(db, 'tariffs'), adminData.INITIAL_TARIFFS);
    await set(ref(db, 'auditLogs'), adminData.INITIAL_AUDIT_LOGS);
    
    await set(ref(db, 'pages/home'), {
      hero: {
        badgeText: "15,000+ Visas Processed",
        title: "Stress-Free UAE Family Visas",
        subtitle: "Bring your loved ones to the UAE with our end-to-end Family Visa services.",
        primaryButtonText: "Start Free Assessment",
        secondaryButtonText: "Calculate Fees"
      }
    });

    if (cmsData.servicesData) {
      const servicesObj = {};
      cmsData.servicesData.forEach(s => {
        servicesObj[s.id || s.slug] = s;
      });
      await set(ref(db, 'services'), servicesObj);
    }

    if (cmsData.blogPostsData) {
      const blogObj = {};
      cmsData.blogPostsData.forEach(p => {
        blogObj[p.id || p.slug] = p;
      });
      await set(ref(db, 'blogPosts'), blogObj);
    }
    
    console.log('🎉 Full Firebase DB Seed Successful!');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seedDatabase();
