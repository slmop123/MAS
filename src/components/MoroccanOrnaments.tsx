import React from 'react';

export const MoroccanStarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <polygon
      points="32,6 39.2,26.8 61,26.8 43.4,39.6 50.1,60.4 32,47.6 13.9,60.4 20.6,39.6 3,26.8 24.8,26.8"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinejoin="miter"
    />
  </svg>
);

export const ZelligeDivider: React.FC<{ variant?: 'light' | 'dark' }> = ({ variant = 'light' }) => {
  const strokeColor = variant === 'dark' ? '#D4AF37' : '#8B1522';
  const secondaryColor = variant === 'dark' ? '#34D399' : '#0E5A3E';

  return (
    <div className="flex items-center justify-center gap-4 my-8 w-full max-w-2xl mx-auto px-4" aria-hidden="true">
      <div
        className={`h-px flex-1 ${
          variant === 'dark'
            ? 'bg-gradient-to-l from-[#D4AF37]/60 to-transparent'
            : 'bg-gradient-to-l from-[#C9A227]/60 to-transparent'
        }`}
      />
      <svg width="72" height="28" viewBox="0 0 72 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="36,2 44,14 36,26 28,14" stroke={strokeColor} strokeWidth="1.3" fill="none" />
        <polygon points="36,6 41,14 36,22 31,14" stroke={secondaryColor} strokeWidth="1" fill="none" />
        <polygon points="16,8 22,14 16,20 10,14" stroke={strokeColor} strokeWidth="1" fill="none" />
        <polygon points="56,8 62,14 56,20 50,14" stroke={strokeColor} strokeWidth="1" fill="none" />
        <circle cx="36" cy="14" r="2" fill="#C9A227" />
      </svg>
      <div
        className={`h-px flex-1 ${
          variant === 'dark'
            ? 'bg-gradient-to-r from-[#D4AF37]/60 to-transparent'
            : 'bg-gradient-to-r from-[#C9A227]/60 to-transparent'
        }`}
      />
    </div>
  );
};

export const AndalusianArchSilhouette: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 1200 180"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M0 0 H1200 V160 C1140 160 1120 110 1060 110 C1000 110 980 150 920 150 C860 150 840 90 770 90 C700 90 680 35 600 35 C520 35 500 90 430 90 C360 90 340 150 280 150 C220 150 200 110 140 110 C80 110 60 160 0 160 Z"
      stroke="rgba(212, 175, 55, 0.35)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M0 0 H1200 V142 C1145 142 1125 96 1060 96 C995 96 975 134 920 134 C865 134 845 78 770 78 C695 78 675 20 600 20 C525 20 505 78 430 78 C355 78 335 134 280 134 C225 134 205 96 140 96 C75 96 55 142 0 142 Z"
      stroke="rgba(212, 175, 55, 0.16)"
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

export const RoyalSealEmblem: React.FC<{ className?: string }> = ({ className = 'w-20 h-20' }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="60" cy="60" r="54" stroke="#8B1522" strokeWidth="2.2" strokeDasharray="4 2" />
    <circle cx="60" cy="60" r="46" stroke="#8B1522" strokeWidth="1.2" />
    <circle cx="60" cy="60" r="38" fill="#8B1522" fillOpacity="0.08" stroke="#0E5A3E" strokeWidth="1" />
    <polygon
      points="60,26 67.5,48.5 91,48.5 72,62.3 79.2,84.8 60,71 40.8,84.8 48,62.3 29,48.5 52.5,48.5"
      stroke="#0E5A3E"
      strokeWidth="2.4"
      fill="rgba(14, 90, 62, 0.1)"
    />
    <circle cx="60" cy="60" r="5" fill="#8B1522" />
  </svg>
);
