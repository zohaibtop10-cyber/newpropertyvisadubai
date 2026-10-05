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
import TopBarTickerEditor from './TopBarTickerEditor';
import UniversalFormBuilder from './UniversalFormBuilder';
import BlockPageBuilder from './BlockPageBuilder';
import FooterEditor from './FooterEditor';
import DashboardModule from './DashboardModule';
import HeroHeadingsEditor from './HeroHeadingsEditor';
import TariffModule from './TariffModule';
import MegaMenuEditor from './MegaMenuEditor';
import CalculatorEditor from './CalculatorEditor';
import LocationsEditor from './LocationsEditor';

export default function CMSModule({ activeModule, cmsConfig, setCmsConfig, tariffs, setTariffs, onNavigateModule }) {
  switch (activeModule) {
    // Dashboard / Overview
    case 'homepage':
    case 'dashboard':
      return <DashboardModule onNavigateModule={onNavigateModule} />;

    // Builders & Headings
    case 'blockBuilder': return <BlockPageBuilder slug="home" />;
    case 'pagesEditor': return <HeroHeadingsEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'schema': return <UniversalFormBuilder collectionPath="cmsConfig" data={cmsConfig} onSave={setCmsConfig} />;

    // Page editors
    case 'reorder': return <SectionReorderManager cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'services': return <ServicePageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'pages': return <InnerPagesEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'testimonials': return <TestimonialsManager cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'blog': return <BlogModule cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'settings': return <GlobalSettings cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'buttons': return <ButtonManager cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'aboutPage': return <AboutPageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'topbar': return <TopBarTickerEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'footer': return <FooterEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'megaMenu': return <MegaMenuEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'calculator': return <CalculatorEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} tariffs={tariffs} setTariffs={setTariffs} />;
    case 'locations': return <LocationsEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;
    case 'tariffs':
    case 'pricing':
      return <TariffModule tariffs={tariffs} setTariffs={setTariffs} cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} />;

    // Homepage section sub-editors (routed from sidebar)
    case 'achievements': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="achievements" />;
    case 'problems': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="problems" />;
    case 'whyus': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="whyUs" />;
    case 'process': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="process" />;
    case 'faqs': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="faqs" />;
    case 'cta': return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="cta" />;

    // Fallback: full homepage editor starting at hero
    case 'heroEditor':
    case 'cms':
    default:
      return <HomepageEditor cmsConfig={cmsConfig} setCmsConfig={setCmsConfig} initialSection="hero" />;
  }
}
