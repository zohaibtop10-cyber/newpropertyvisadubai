import React from 'react';

export interface TimelineStepProps {
  stepNumber: number;
  title: string;
  description: string;
  isLast?: boolean;
  className?: string;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  stepNumber,
  title,
  description,
  isLast = false,
  className = '',
}) => {
  return (
    <div className={`relative flex flex-col lg:flex-1 ${className}`}>
      {/* Step header with badge & connecting line */}
      <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gold text-gold font-bold text-sm bg-surface shrink-0 z-10">
          {stepNumber < 10 ? `0${stepNumber}` : stepNumber}
        </div>
        {!isLast && (
          <div className="hidden lg:block absolute top-5 left-10 w-[calc(100%-2.5rem)] h-[1px] bg-border-hairline z-0" />
        )}
        <h4 className="text-lg font-semibold text-text">{title}</h4>
      </div>

      {/* Description */}
      <div className="pl-14 lg:pl-0 lg:mt-2 text-sm text-text-muted leading-relaxed">
        {description}
      </div>

      {/* Vertical line connector for mobile/tablet */}
      {!isLast && (
        <div className="lg:hidden absolute top-10 left-5 w-[1px] h-[calc(100%-2.5rem)] bg-border-hairline -translate-x-1/2 my-1" />
      )}
    </div>
  );
};

export default TimelineStep;
