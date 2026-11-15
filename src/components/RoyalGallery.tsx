import React, { useState } from 'react';
import { X, Crown } from 'lucide-react';
import { ROYAL_FIGURES, RoyalFigure } from '../data/moroccanHeritage';
import { ZelligeDivider } from './MoroccanOrnaments';
import royalFourMonarchsImg from '../assets/images/royal_four_monarchs.png';

// Ordered right-to-left to match the 4 figures in the unified photograph
const ORDERED_ROYAL_IDS = ['mohammed-v', 'hassan-ii', 'mohammed-vi', 'moulay-hassan'];

export const RoyalGallery: React.FC = () => {
  const [selectedFigure, setSelectedFigure] = useState<RoyalFigure | null>(null);
  const [unifiedImgFailed, setUnifiedImgFailed] = useState(false);

  const orderedFigures = ORDERED_ROYAL_IDS
    .map((id) => ROYAL_FIGURES.find((f) => f.id === id))
    .filter((f): f is RoyalFigure => Boolean(f));

  return (
    <section id="royal-gallery" className="py-16 sm:py-24 bg-zellige-subtle border-b border-[#C9A227]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0E5A3E] mb-3">
            <span>العرش العلوي المجيد</span>
            <span aria-hidden="true">·</span>
            <span>ذاكرة السيادة والاستمرارية</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#1C1613] mb-4 [text-wrap:balance]">
            المعرض الملكي للأسرة العلوية الشريفة
          </h2>
          <p className="text-sm sm:text-base text-[#52453E] leading-relaxed">
            لوحة تاريخية جامعة في إطار ذهبي أندلسي تضم أربعة أجيال من العرش العلوي المجيد، تجسد استمرارية السيادة الوطنية وتلاحم العرش والشعب.
          </p>
          <ZelligeDivider variant="light" />
        </div>

        {/* Unified Four Monarchs Royal Frame */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#D4AF37]/35 via-[#EFE6D2] to-[#C9A227]/30 border-2 border-[#B88D1E]/75 shadow-xl">
            <div className="relative rounded-xl overflow-hidden border border-[#8B1522]/30 bg-[#EFE6D3]">
              {!unifiedImgFailed ? (
                <img
                  src={royalFourMonarchsImg}
                  alt="صورة تاريخية جامعة للمغفور له الملك محمد الخامس والمغفور له الملك الحسن الثاني وجلالة الملك محمد السادس وصاحب السمو الملكي ولي العهد الأمير مولاي الحسن"
                  referrerPolicy="no-referrer"
                  onError={() => setUnifiedImgFailed(true)}
                  className="w-full h-auto max-h-[540px] object-cover object-center block"
                />
              ) : (
                <div className="py-24 px-6 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#EFE6D3] to-[#E4D7BE] text-[#8B1522]">
                  <Crown className="w-12 h-12 text-[#B88D1E] mb-3" />
                  <p className="font-display text-2xl font-bold">
                    لوحة ملوك الدولة العلوية الشريفة
                  </p>
                  <p className="text-sm text-[#4A3E37] mt-1">
                    الملك محمد الخامس · الملك الحسن الثاني · الملك محمد السادس · الأمير مولاي الحسن
                  </p>
                </div>
              )}

              {/* Subtle Royal Gold Caption Strip */}
              <div className="px-4 sm:px-6 py-3.5 bg-[#FAF3E6]/95 border-t border-[#C9A227]/40 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-[#3B2E28]">
                <span className="font-display font-bold text-[#8B1522]">
                  أربعة أجيال على العرش العلوي — رمز السيادة والوحدة الوطنية
                </span>
                <span className="text-xs text-[#0E5A3E] font-semibold">
                  من اليمين إلى اليسار: محمد الخامس · الحسن الثاني · محمد السادس · مولاي الحسن
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Royal Biographies Aligned Under the Unified Photo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orderedFigures.map((figure) => (
            <article
              key={figure.id}
              className="flex flex-col justify-between p-6 bg-[#FAF3E6] border border-[#C9A227]/45 rounded-xl shadow-sm hover:shadow-md hover:border-[#8B1522]/45 transition-all duration-200"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#0E5A3E] font-semibold mb-2">
                  <span>{figure.era}</span>
                  <span aria-hidden="true">·</span>
                  <span>{figure.honorific}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#1C1613] leading-snug mb-1">
                  {figure.name}
                </h3>
                <p className="text-xs font-semibold text-[#8B1522] mb-3">
                  {figure.reignOrTitle}
                </p>
                <p className="text-sm text-[#4A3E37] leading-relaxed">
                  {figure.shortBio}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFigure(figure)}
                className="mt-5 self-start text-xs font-bold text-[#8B1522] hover:text-[#0E5A3E] border-b border-[#8B1522]/40 hover:border-[#0E5A3E] pb-0.5 transition-colors cursor-pointer"
              >
                قراءة النبذة الكاملة ←
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Museum Inspection Modal */}
      {selectedFigure && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1613]/65 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="royal-modal-title"
          onClick={() => setSelectedFigure(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#FAF3E6] border-2 border-[#C9A227]/70 rounded-xl shadow-2xl p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedFigure(null)}
              aria-label="إغلاق النافذة"
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#EAE0CA] text-[#1C1613] hover:bg-[#8B1522] hover:text-[#FAF7F0] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 text-xs text-[#0E5A3E] font-semibold">
              <span>{selectedFigure.era}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedFigure.honorific}</span>
            </div>

            <div>
              <h3 id="royal-modal-title" className="font-display text-3xl font-bold text-[#1C1613]">
                {selectedFigure.name}
              </h3>
              <p className="text-sm font-semibold text-[#8B1522] mt-1">
                {selectedFigure.reignOrTitle}
              </p>
            </div>

            <div className="h-px w-full bg-[#C9A227]/35" />

            <p className="text-sm sm:text-base text-[#3A302B] leading-loose">
              {selectedFigure.detailedBio}
            </p>

            <div className="pt-4 border-t border-[#C9A227]/30">
              <p className="text-xs font-semibold text-[#6F5D4E]">أبرز محطة وطنية</p>
              <p className="text-sm font-bold text-[#0E5A3E] mt-1">
                {selectedFigure.keyMilestone}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
