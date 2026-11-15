import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ActiveView = 'anthem' | 'sawt-al-hassan' | 'memory-document';

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView, anchorId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (view: ActiveView, anchorId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(view, anchorId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5EFE2]/95 backdrop-blur-md border-b border-[#C9A227]/35">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('anthem')}
          className="font-display text-2xl font-bold tracking-tight text-[#8B1522] hover:text-[#6E101B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A227]"
        >
          ذاكرة الاستقلال
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#3B2E28]" aria-label="التنقل الرئيسي">
          <button
            type="button"
            onClick={() => handleLinkClick('anthem', 'anthem-stage')}
            className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A227] ${
              activeView === 'anthem'
                ? 'text-[#8B1522] after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#C9A227]'
                : 'hover:text-[#8B1522]'
            }`}
          >
            النشيد الوطني
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('anthem', 'royal-gallery')}
            className="relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-[#8B1522] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A227]"
          >
            المعرض الملكي
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('sawt-al-hassan')}
            className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A227] ${
              activeView === 'sawt-al-hassan'
                ? 'text-[#0E5A3E] after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#0E5A3E]'
                : 'hover:text-[#0E5A3E]'
            }`}
          >
            يا بلادي عيشي
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('memory-document')}
            className={`relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A227] ${
              activeView === 'memory-document'
                ? 'text-[#8B1522] after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#C9A227]'
                : 'hover:text-[#8B1522]'
            }`}
          >
            ذاكرة الاستقلال
          </button>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick('memory-document')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-[#FAF7F0] bg-[#8B1522] hover:bg-[#6E101B] border border-[#C9A227]/50 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A227]"
          >
            تعريف الاستقلال
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#3B2E28] hover:bg-[#EFE8D8] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#C9A227]/30 bg-[#F5EFE2] px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleLinkClick('anthem', 'anthem-stage')}
            className="w-full text-right px-3 py-2.5 text-sm font-semibold text-[#1C1613] hover:bg-[#EFE8D8] rounded-md block cursor-pointer"
          >
            النشيد الوطني
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('anthem', 'royal-gallery')}
            className="w-full text-right px-3 py-2.5 text-sm font-semibold text-[#1C1613] hover:bg-[#EFE8D8] rounded-md block cursor-pointer"
          >
            المعرض الملكي
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('sawt-al-hassan')}
            className="w-full text-right px-3 py-2.5 text-sm font-semibold text-[#0E5A3E] hover:bg-[#EFE8D8] rounded-md block cursor-pointer"
          >
            يا بلادي عيشي
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('memory-document')}
            className="w-full text-right px-3 py-2.5 text-sm font-semibold text-[#1C1613] hover:bg-[#EFE8D8] rounded-md block cursor-pointer"
          >
            ذاكرة الاستقلال
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick('memory-document')}
            className="w-full text-center px-4 py-2.5 text-sm font-bold text-[#FAF7F0] bg-[#8B1522] rounded-md block cursor-pointer"
          >
            تعريف الاستقلال
          </button>
        </div>
      )}
    </header>
  );
};
