import React from 'react';
import { VisaPageTemplate } from '../features/services/VisaPageTemplate';

export interface GoldenVisaProps {
  onNavigate?: (route: string) => void;
}

export const GoldenVisa: React.FC<GoldenVisaProps> = ({ onNavigate }) => {
  return (
    <VisaPageTemplate
      routeId="golden"
      pageId="golden-visa"
      onNavigate={onNavigate}
    />
  );
};

export default GoldenVisa;
