import React from 'react';
import { VisaPageTemplate } from '../features/services/VisaPageTemplate';

export interface PropertyVisaProps {
  onNavigate?: (route: string) => void;
}

export const PropertyVisa: React.FC<PropertyVisaProps> = ({ onNavigate }) => {
  return (
    <VisaPageTemplate
      routeId="property"
      pageId="property-visa"
      onNavigate={onNavigate}
    />
  );
};

export default PropertyVisa;
