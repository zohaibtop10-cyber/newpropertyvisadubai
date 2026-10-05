import React from 'react';
import BlockRenderer from './BlockRenderer';
import { getServiceConfig } from '../config/serviceConfig';

/**
 * ServiceTemplate Component (Vite SPA)
 * 
 * Delegates block layout rendering to BlockRenderer based on getServiceConfig.
 */
export default function ServiceTemplate({
  serviceId = 'property-golden-visa',
  onOpenCalculator,
  onNavigate,
  cmsConfig
}) {
  const serviceData = getServiceConfig(serviceId);

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-[#D4AF37]/20 selection:text-[#D4AF37] pb-12">
      <BlockRenderer serviceData={serviceData} />
    </div>
  );
}
