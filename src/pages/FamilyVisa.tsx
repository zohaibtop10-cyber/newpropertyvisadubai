import React from 'react';
import { VisaPageTemplate } from '../features/services/VisaPageTemplate';

export interface FamilyVisaProps {
  onNavigate?: (route: string) => void;
}

export const FamilyVisa: React.FC<FamilyVisaProps> = ({ onNavigate }) => {
  return (
    <VisaPageTemplate
      routeId="family"
      pageId="family-visa"
      onNavigate={onNavigate}
    />
  );
};

export default FamilyVisa;
