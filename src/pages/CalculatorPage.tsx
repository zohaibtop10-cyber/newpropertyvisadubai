import React from 'react';
import { Nav } from '../components/Nav';
import { Calculator } from '../features/calculator/Calculator';
import { Footer } from '../components/Footer';

export interface CalculatorPageProps {
  onNavigate?: (route: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-200 font-sans">
      <Nav onNavigate={onNavigate} activeRoute="/calculator" />
      <main className="pt-28 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <Calculator />
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default CalculatorPage;
