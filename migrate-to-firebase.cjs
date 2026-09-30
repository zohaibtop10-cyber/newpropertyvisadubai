const fs = require('fs');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

// Import cmsData
let fileContent = fs.readFileSync('src/data/cmsData.js', 'utf8');
const cleanContent = fileContent.replace(/export const/g, 'const');
const dataStr = cleanContent + `\n\nmodule.exports = { servicesData, blogPostsData, blogCategories, reviewsData, diyProcessGuides, siteConfig };`;
fs.writeFileSync('temp-data.cjs', dataStr);

const { servicesData, blogPostsData, blogCategories, reviewsData, diyProcessGuides, siteConfig } = require('./temp-data.cjs');

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

async function migrate() {
  try {
    console.log('Uploading CMS Data to Firebase...');
    
    // Convert array to object for Firebase Services
    const servicesObj = {};
    if (servicesData) {
      servicesData.forEach(s => {
        servicesObj[s.id || s.slug] = s;
      });
      await set(ref(db, 'cms/services'), servicesObj);
      console.log('✅ Services uploaded');
    }

    if (blogPostsData) {
      const blogObj = {};
      blogPostsData.forEach(p => {
        blogObj[p.id || p.slug || Math.random().toString()] = p;
      });
      await set(ref(db, 'cms/blogPosts'), blogObj);
      console.log('✅ Blog Posts uploaded');
    }

    if (blogCategories) {
      await set(ref(db, 'cms/blogCategories'), blogCategories);
      console.log('✅ Blog Categories uploaded');
    }

    if (reviewsData) {
      await set(ref(db, 'cms/reviews'), reviewsData);
      console.log('✅ Reviews uploaded');
    }
    
    if (diyProcessGuides) {
      await set(ref(db, 'cms/diyGuides'), diyProcessGuides);
      console.log('✅ DIY Guides uploaded');
    }

    if (siteConfig) {
      await set(ref(db, 'cms/config'), siteConfig);
      console.log('✅ Site Config uploaded');
    }

    console.log('🎉 Full Migration Successful!');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
