import React, { useState } from 'react';
import { Crown, Maximize2, Minimize2 } from 'lucide-react';
import { WavingMoroccanFlagCanvas } from './WavingMoroccanFlagCanvas';
import { MoroccanStarIcon, ZelligeDivider } from './MoroccanOrnaments';
import cornerMohammedV from '../assets/images/corner_mohammed_v.png';
import cornerHassanII from '../assets/images/corner_hassan_ii.png';
import cornerMohammedVI from '../assets/images/corner_mohammed_vi.png';
import cornerMoulayHassan from '../assets/images/corner_moulay_hassan.png';

interface CornerKingCard {
  id: string;
  name: string;
  title: string;
  image: string;
  positionClass: string;
}

const CORNER_KINGS: CornerKingCard[] = [
  {
    id: 'mohammed-v',
    name: 'المغفور له الملك محمد الخامس',
    title: 'أب الاستقلال وبطل التحرير',
    image: cornerMohammedV,
    positionClass: 'md:top-6 md:right-6',
  },
  {
    id: 'hassan-ii',
    name: 'المغفور له الملك الحسن الثاني',
    title: 'باني المغرب الحديث',
    image: cornerHassanII,
    positionClass: 'md:top-6 md:left-6',
  },
  {
    id: 'mohammed-vi',
    name: 'جلالة الملك محمد السادس',
    title: 'ملك المملكة المغربية',
    image: cornerMohammedVI,
    positionClass: 'md:bottom-6 md:right-6',
  },
  {
    id: 'moulay-hassan',
    name: 'الأمير مولاي الحسن',
    title: 'ولي عهد المملكة المغربية',
    image: cornerMoulayHassan,
    positionClass: 'md:bottom-6 md:left-6',
  },
];

export const AlMasrahiyaPage: React.FC = () => {
  const [failedCorners, setFailedCorners] = useState<Record<string, boolean>>({});
  const [theaterFullscreen, setTheaterFullscreen] = useState(false);

  const handleToggleTheaterMode = () => {
    setTheaterFullscreen((prev) => !prev);
  };

  const renderCornerFrame = (king: CornerKingCard, isMobileGrid = false) => (
    <figure
      key={king.id}
      className={`${
        isMobileGrid
          ? 'w-full'
          : `hidden md:block md:absolute ${king.positionClass} w-44 lg:w-52 xl:w-56 z-20`
      } bg-[#FAF3E6]/95 backdrop-blur-sm p-2.5 rounded-xl border-2 border-[#C9A227]/80 shadow-lg`}
    >
      <div className="aspect-[4/4.3] w-full rounded-lg overflow-hidden border border-[#8B1522]/30 bg-[#EFE6D3]">
        {!failedCorners[king.id] ? (
          <img
            src={king.image}
            alt={`${king.name} — ${king.title}`}
            referrerPolicy="no-referrer"
            onError={() =>
              setFailedCorners((prev) => ({ ...prev, [king.id]: true }))
            }
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-[#EFE6D3] text-[#8B1522]">
            <Crown className="w-7 h-7 text-[#C9A227] mb-1" />
            <span className="font-display text-sm font-bold">{king.name}</span>
          </div>
        )}
      </div>
      <figcaption className="pt-2 text-center">
        <p className="font-display text-sm font-bold text-[#8B1522] leading-tight">
          {king.name}
        </p>
        <p className="text-[11px] font-semibold text-[#0E5A3E] mt-0.5">
          {king.title}
        </p>
      </figcaption>
    </figure>
  );

  return (
    <main className="bg-zellige-subtle min-h-[calc(100vh-4rem)] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <section
        className={`relative mx-auto rounded-2xl border-2 border-[#C9A227]/65 bg-zellige-beige shadow-2xl overflow-hidden flex flex-col justify-between transition-all ${
          theaterFullscreen
            ? 'fixed inset-3 z-50 min-h-[calc(100vh-1.5rem)]'
            : 'max-w-7xl min-h-[760px] lg:min-h-[820px]'
        }`}
      >
        {/* Waving Moroccan Flag Canvas in Background */}
        <WavingMoroccanFlagCanvas />

        {/* Soft Warm Beige Radial Wash around Center Title for Crisp Legibility */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,239,226,0.88)_0%,rgba(239,230,211,0.45)_52%,rgba(234,224,202,0.72)_100%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Desktop 4 Corner Royal Portraits */}
        {CORNER_KINGS.map((king) => renderCornerFrame(king, false))}

        {/* Top Bar Inside Stage (Mobile Top 2 Kings + Stage Mode Toggle) */}
        <div className="relative z-20 p-4 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 md:justify-center">
            <span className="md:hidden text-xs font-bold text-[#0E5A3E]">
              مسرحية عيد الاستقلال
            </span>
            <button
              type="button"
              onClick={handleToggleTheaterMode}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#FAF3E6]/90 hover:bg-[#EFE6D3] text-[#8B1522] border border-[#C9A227]/60 shadow-sm transition-colors cursor-pointer"
            >
              {theaterFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>الخروج من العرض المسرحي</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>تكبير للعرض المسرحي</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Top Row: Mohammed V & Hassan II */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {renderCornerFrame(CORNER_KINGS[0], true)}
            {renderCornerFrame(CORNER_KINGS[1], true)}
          </div>
        </div>

        {/* Centerpiece Stage Title */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-12 md:px-60 lg:px-64 py-10">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0E5A3E] mb-4">
            <MoroccanStarIcon className="w-5 h-5 text-[#0E5A3E]" />
            <span>خشبة الاحتفال بعيد الاستقلال المجيد</span>
            <MoroccanStarIcon className="w-5 h-5 text-[#0E5A3E]" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#8B1522] leading-tight drop-shadow-sm [text-wrap:balance]">
            الاستقلال نعــــــــــــمة
          </h1>

          <ZelligeDivider variant="light" />

          <p className="font-display text-xl sm:text-2xl text-[#2F2621] font-bold max-w-xl leading-relaxed">
            عرض مسرحي وطني يمجد نعمة الحرية والسيادة وتلاحم العرش والشعب
          </p>
          <p className="text-xs sm:text-sm font-semibold text-[#5C4D42] mt-2">
            اللَّهُ · الوَطَنُ · المَلِكْ
          </p>
        </div>

        {/* Mobile Bottom Row: Mohammed VI & Moulay El Hassan */}
        <div className="relative z-20 p-4 md:hidden">
          <div className="grid grid-cols-2 gap-3">
            {renderCornerFrame(CORNER_KINGS[2], true)}
            {renderCornerFrame(CORNER_KINGS[3], true)}
          </div>
        </div>

        {/* Desktop Bottom Subtle Spacer */}
        <div className="hidden md:block h-6 relative z-20" aria-hidden="true" />
      </section>
    </main>
  );
};
