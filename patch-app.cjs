const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add Import
if (!appContent.includes('UniversalFormBuilder')) {
  appContent = appContent.replace(
    "import CMSModule from './components/admin/CMSModule';",
    "import CMSModule from './components/admin/CMSModule';\nimport UniversalFormBuilder from './components/admin/UniversalFormBuilder';\nimport { getDatabase, ref, onValue } from 'firebase/database';"
  );
}

// 2. Add State and Effect for fetching Firebase homePageData
if (!appContent.includes('const [homePageData')) {
  const stateInsert = `
  const [homePageData, setHomePageData] = useState(null);

  useEffect(() => {
    try {
      const db = getDatabase();
      const docRef = ref(db, 'pages/home');
      onValue(docRef, (snapshot) => {
        if (snapshot.exists()) {
          setHomePageData(snapshot.val());
        } else {
          // Default schema if not exists
          setHomePageData({
            hero: {
              badgeText: "15,000+ Visas Processed",
              title: "Stress-Free UAE Family Visas",
              subtitle: "Bring your loved ones to the UAE with our end-to-end Family Visa services.",
              primaryButtonText: "Start Free Assessment",
              secondaryButtonText: "Calculate Fees"
            }
          });
        }
      });
    } catch (e) {
      console.error("Firebase fetch error", e);
    }
  }, []);
`;
  appContent = appContent.replace(
    "const [cmsConfig, setCmsConfig] = useState(() => {",
    stateInsert + "\n  const [cmsConfig, setCmsConfig] = useState(() => {"
  );
}

// 3. Add UniversalFormBuilder inside AdminLayout switch
if (!appContent.includes('adminModule === \'pagesEditor\'')) {
  const switchInsert = `
                {adminModule === 'pagesEditor' ? (
                  <UniversalFormBuilder collectionPath="pages/home" data={homePageData} />
                ) : (
                  <CMSModule
`;
  appContent = appContent.replace(
    "<CMSModule",
    switchInsert
  );
  
  // Close the ternary
  appContent = appContent.replace(
    "onUpdateConfig={setCmsConfig}\n                  />",
    "onUpdateConfig={setCmsConfig}\n                  />\n                )}"
  );
}

// 4. Pass homePageData to Home
appContent = appContent.replace(
  "<Home\n              onNavigate={handleNavigate}",
  "<Home\n              homePageData={homePageData}\n              onNavigate={handleNavigate}"
);

fs.writeFileSync('src/App.jsx', appContent);
console.log('App.jsx patched successfully!');
