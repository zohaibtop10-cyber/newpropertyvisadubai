'use client';
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

export default function GoogleReviewCard({ name, time, tag, review, link, index = 0 }) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) setHasScrolled(true);
  }, [isInView]);

  return (
    <motion.a 
      ref={ref}
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="block bg-surface border border-border-hairline rounded-[10px] p-6 hover:shadow-glow-gold hover:border-gold/30 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-medium text-text group-hover:text-gold transition-colors">{name}</div>
          <div className="text-xs text-text-muted mt-1">{time}</div>
        </div>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map((i) => (
            <motion.svg 
              key={i} 
              initial={{ opacity: 0, scale: 0 }}
              animate={hasScrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: (index * 0.1) + (i * 0.08) + 0.3, type: "spring" }}
              className="w-4 h-4 text-gold fill-current drop-shadow-sm" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </motion.svg>
          ))}
        </div>
      </div>
      <div className="text-xs font-medium text-gold mb-3">{tag}</div>
      <p className="text-sm text-text leading-relaxed">"{review}"</p>
      <div className="mt-4 pt-3 border-t border-border-hairline text-xs text-text-muted font-medium flex items-center justify-between">
        <span>Unedited Google Review</span>
        <span className="text-gold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">View original &rarr;</span>
      </div>
    </motion.a>
  );
}
