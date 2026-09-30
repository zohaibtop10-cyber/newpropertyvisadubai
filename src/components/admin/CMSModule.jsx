import React from 'react';
import HomepageEditor from './HomepageEditor';
import SectionReorderManager from './SectionReorderManager';
import ServicePageEditor from './ServicePageEditor';
import InnerPagesEditor from './InnerPagesEditor';
import TestimonialsManager from './TestimonialsManager';
import BlogModule from './BlogModule';
import GlobalSettings from './GlobalSettings';
import ButtonManager from './ButtonManager';
import AboutPageEditor from './AboutPageEditor';
import TopbarEditor from './TopbarEditor';
import TopBarTickerEditor from './TopBarTickerEditor';
import UniversalFormBuilder from './UniversalFormBuilder';

export default function CMSModule({ activeModule, cmsConfig, setCmsConfig }) {
  switch (activeModule) {
    case 'pagesEditor': return <UniversalFormBuilder collectionPath="cmsConfig" data={cmsConfig} onSave={setCmsConfig} />;
    case 'reorder': return <SectionReorderManager cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'services': return <ServicePageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'pages': return <InnerPagesEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'testimonials': return <TestimonialsManager cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'blog': return <BlogModule cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'settings': return <GlobalSettings cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'buttons': return <ButtonManager cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'aboutPage': return <AboutPageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'topbar': return <TopBarTickerEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    
    // Additional Homepage Editor Sub-Sections routed from the sidebar
    case 'achievements': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="achievements" />;
    case 'problems': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="problems" />;
    case 'whyus': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="whyUs" />;
    case 'process': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="process" />;
    case 'faqs': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="faqs" />;
    case 'cta': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="cta" />;
    
    case 'homepage':
    case 'cms':
    default:
      return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="hero" />;
  }
}
