const fs = require('fs');

const homeContent = fs.readFileSync('src/components/Home.jsx', 'utf8');

function extractArray(name) {
  const regex = new RegExp('const ' + name + ' = cmsConfig\\?\\.[\\w]+\\?\\.items \\|\\| \\s*(\\[[\\s\\S]*?\\];)', 'i');
  const match = homeContent.match(regex);
  return match ? match[1] : null;
}

const faqs = extractArray('homepageFaqs');
const services = extractArray('categorizedServices');
const achievements = extractArray('achievements');
const problems = extractArray('problemsSolved');
const packages = extractArray('packages');

const cmsDataContent = fs.readFileSync('src/data/cmsData.js', 'utf8');
const reviewsMatch = cmsDataContent.match(/const reviewsData = (\[[\s\S]*?\]);/);
const reviews = reviewsMatch ? reviewsMatch[1] : '[]';

let adminState = fs.readFileSync('src/data/adminState.js', 'utf8');

// Using simple replace methods with strings
if (faqs) {
    adminState = adminState.replace(/items: \[\s*\{ id: 'faq-1',[\s\S]*?\]/g, 'items: ' + faqs.slice(0, -1));
}
if (services) {
    adminState = adminState.replace(/services: \{\s*title: 'Our Family Visa & PRO Advisory Services',[\s\S]*?subtext: 'End-to-end management for individual and corporate immigration files.'\s*\}/g, 
    `services: {
    title: 'Our Family Visa & PRO Advisory Services',
    subtext: 'End-to-end management for individual and corporate immigration files.',
    items: ` + services.slice(0, -1).replace(/Users/g, "'Users'").replace(/Calculator/g, "'Calculator'").replace(/Clock/g, "'Clock'").replace(/Crown/g, "'Crown'") + `
  }`);
}
if (packages) {
    adminState = adminState.replace(/packages: \{\s*badgeText: 'SERVICE RETAINER BUNDLES',[\s\S]*?subtext: 'Transparent pricing with no hidden government typing fees.'\s*\}/g,
    `packages: {
    badgeText: 'SERVICE RETAINER BUNDLES',
    title: 'Itemized Processing Packages',
    subtext: 'Transparent pricing with no hidden government typing fees.',
    items: ` + packages.slice(0, -1).replace(/CheckCircle2/g, "'CheckCircle2'").replace(/XCircle/g, "'XCircle'") + `
  }`);
}
if (achievements) {
    adminState = adminState.replace(/achievements: \{\s*title: 'Why Families Choose EmiratesPrime',[\s\S]*?items: \[\]\s*\}/g,
    `achievements: {
    title: 'Why Families Choose EmiratesPrime',
    subtext: 'Recognized by Dubai Economic Department and top Google reviewers.',
    items: ` + achievements.slice(0, -1).replace(/Award/g, "'Award'").replace(/Clock/g, "'Clock'").replace(/ShieldCheck/g, "'ShieldCheck'") + `
  }`);
}
if (problems) {
    adminState = adminState.replace(/problems: \{\s*title: 'Why DIY Family Visa Applications Fail',[\s\S]*?items: \[\]\s*\}/g,
    `problems: {
    title: 'Why DIY Family Visa Applications Fail',
    subtext: 'Save thousands of dirhams by avoiding these common filing mistakes.',
    items: ` + problems.slice(0, -1).replace(/XCircle/g, "'XCircle'").replace(/CheckCircle2/g, "'CheckCircle2'") + `
  }`);
}
if (reviews) {
    adminState = adminState.replace(/reviews: \{\s*badgeText: 'VERIFIED REVIEWS',[\s\S]*?items: \[\s*\{ id: 'rev-1',[\s\S]*?\]\s*\}/g,
    `reviews: {
    badgeText: 'VERIFIED REVIEWS',
    title: 'What Families Say About Our PRO Advisory',
    subtext: 'Over 500+ five-star reviews on Google & Trustpilot.',
    items: ` + reviews + `
  }`);
}

fs.writeFileSync('src/data/adminState.js', adminState);
console.log('adminState.js updated successfully.');
