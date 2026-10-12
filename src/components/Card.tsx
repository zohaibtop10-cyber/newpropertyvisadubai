import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'content' | 'stat' | 'testimonial';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'content',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'bg-surface border border-border-hairline rounded-lg p-6 transition-all duration-200 text-text';

  const variantStyles = {
    content: 'hover:border-gold/40',
    stat: 'flex flex-col items-start justify-between bg-surface/80',
    testimonial: 'relative italic border-border-hairline/80 bg-surface',
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
