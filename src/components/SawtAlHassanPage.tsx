import React, { useState } from 'react';
import {
  Copy,
  Check,
  Flag,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { GREEN_MARCH_IMAGE, SAWT_AL_HASSAN_STANZAS } from '../data/moroccanHeritage';
import { MoroccanStarIcon, ZelligeDivider } from './MoroccanOrnaments';

interface SawtAlHassanPageProps {
  onGoToMemory: () => void;
}

type CrawlSpeed = 'slow' | 'normal' | 'fast';

const SPEED_DURATIONS: Record<CrawlSpeed, number> = {
  slow: 120,
  normal: 85,
  fast: 55,
};

export const SawtAlHassanPage: React.FC<SawtAlHassanPageProps> = ({ onGoToMemory }) => {
  const [activeStanzaId, setActiveStanzaId] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [bannerImgFailed, setBannerImgFailed] = useState(false);

  // Rising crawl controls for "صوت الحسن ينادي"
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<CrawlSpeed>('normal');
  const [crawlKey, setCrawlKey] = useState(0);
  const [showFullStaticInStage, setShowFullStaticInStage] = useState(false);

  const handleCopyLyrics = async () => {
    const fullText = SAWT_AL_HASSAN_STANZAS.map(
      (s) => `${s.sectionLabel}\n${s.lines.join('\n')}`
    ).join('\n\n');

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleStepStanza = (dir: 'next' | 'prev') => {
    setActiveStanzaId((curr) => {
      if (dir === 'next') {
        return curr < SAWT_AL_HASSAN_STANZAS.length ? curr + 1 : 1;
      }
      return curr > 1 ? curr - 1 : SAWT_AL_HASSAN_STANZAS.length;
    });
  };

  const handleRestartCrawl = () => {
    setCrawlKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  return (
    <main className="bg-zellige-subtle min-h-screen">
      {/* Warm Beige Commemorative Hero Banner */}
      <section className="relative bg-zellige-beige text-[#1C1613] border-b border-[#C9A227]/40 overflow-hidden">
        {!bannerImgFailed && (
          <img
            src={GREEN_MARCH_IMAGE}
            alt="لوحة تاريخية للمسيرة الخضراء المظفرة سنة 1975 نحو الأقاليم الصحراوية المغربية"
            referrerPolicy="no-referrer"
            onError={() => setBannerImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-18 pointer-events-none"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#F5EFE2] via-[#EFE6D3]/80 to-[#F5EFE2]/88 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="max-w-3xl mb-10">
            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0E5A3E] mb-3">
              <span>ملحمة المسيرة الخضراء</span>
              <span aria-hidden="true">·</span>
              <span>6 نونبر 1975</span>
              <span aria-hidden="true">·</span>
              <span>الوحدة الترابية</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#8B1522] leading-tight mb-4 [text-wrap:balance]">
              أغنية «صوت الحسن ينادي»
            </h1>

            <p className="text-sm sm:text-lg text-[#4A3E37] leading-relaxed max-w-2xl">
              النشيد الخالد الذي رافق خطى ثلاثمائة وخمسين ألف مغربي ومغربية نحو الصحراء المغربية، حاملاً قيم السلم والإيمان ووحدة التراب الوطني من طنجة إلى الكويرة.
            </p>
          </div>

          {/* Rising Star-Wars-Style Crawl Stage for "صوت الحسن ينادي" */}
          <div className="relative mx-auto max-w-4xl rounded-xl border border-[#C9A227]/60 bg-gradient-to-b from-[#FBF6EA] via-[#F2E9D5] to-[#EAE0CA] shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#C9A227]/35 bg-[#EFE6D3]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0E5A3E]">
                <MoroccanStarIcon className="w-4 h-4 text-[#8B1522]" />
                <span>صوت الحسن ينادي — العرض الصاعد الكامل</span>
              </div>
              <div className="text-xs font-medium text-[#5C4D42] tabular-nums">
                1975 · المسيرة الخضراء
              </div>
            </div>

            {!showFullStaticInStage ? (
              <div className="relative h-[420px] sm:h-[460px] w-full anthem-perspective-stage flex justify-center px-4 sm:px-10">
                <div
                  className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FBF6EA] via-[#FBF6EA]/75 to-transparent pointer-events-none z-10"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#EAE0CA] via-[#EAE0CA]/70 to-transparent pointer-events-none z-10"
                  aria-hidden="true"
                />
                <div className="anthem-crawl-plane w-full max-w-2xl relative">
                  <div
                    key={crawlKey}
                    className="anthem-crawl-track text-center space-y-10 pb-16"
                    style={{
                      animationDuration: `${SPEED_DURATIONS[speed]}s`,
                      animationPlayState: isPlaying ? 'running' : 'paused',
                    }}
                  >
                    <div className="space-y-2 pb-4 border-b border-[#C9A227]/45">
                      <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#0E5A3E]">
                        نشيد المسيرة الخضراء المظفرة
                      </p>
                      <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#8B1522]">
                        صَوْتُ الحَسَنْ يُنَادِي
                      </h2>
                    </div>

                    {SAWT_AL_HASSAN_STANZAS.map((stanza) => (
                      <div key={stanza.id} className="space-y-3">
                        <p className="text-xs font-semibold text-[#6F5D4E]">
                          {stanza.sectionLabel}
                        </p>
                        {stanza.lines.map((line, idx) => (
                          <p
                            key={idx}
                            className={`font-display leading-relaxed ${
                              line.includes('الله الله') || line.includes('الله اكبر')
                                ? 'text-2xl sm:text-3xl font-bold text-[#0E5A3E]'
                                : 'text-2xl sm:text-3xl font-bold text-[#8B1522]'
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-10 max-h-[460px] overflow-y-auto bg-[#F8F2E4]">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#8B1522] pb-3 border-b border-[#C9A227]/35">
                    كلمات نشيد «صوت الحسن ينادي» كاملة
                  </h2>
                  {SAWT_AL_HASSAN_STANZAS.map((stanza) => (
                    <div key={stanza.id} className="p-5 rounded-lg bg-[#F2E9D5]/75 border border-[#C9A227]/35 space-y-2">
                      <p className="text-xs font-semibold text-[#0E5A3E] mb-1">
                        {stanza.sectionLabel}
                      </p>
                      {stanza.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className={`font-display text-xl sm:text-2xl font-bold leading-relaxed ${
                            line.includes('الله الله') || line.includes('الله اكبر') ? 'text-[#0E5A3E]' : 'text-[#8B1522]'
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crawl Control Bar */}
            <div className="px-4 sm:px-6 py-4 border-t border-[#C9A227]/35 bg-[#EFE6D3] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {!showFullStaticInStage && (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsPlaying((prev) => !prev)}
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md bg-[#0E5A3E] hover:bg-[#09442E] text-[#FAF7F0] border border-[#C9A227]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      <span>{isPlaying ? 'إيقاف التمرير' : 'تشغيل التمرير'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRestartCrawl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md bg-[#F8F2E4] hover:bg-[#E7DAC0] text-[#3B2E28] border border-[#C9A227]/45 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة</span>
                    </button>

                    <div className="inline-flex items-center p-1 rounded-md bg-[#E4D7BE] border border-[#C9A227]/40">
                      {(['slow', 'normal', 'fast'] as CrawlSpeed[]).map((sp) => (
                        <button
                          key={sp}
                          type="button"
                          onClick={() => setSpeed(sp)}
                          className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            speed === sp
                              ? 'bg-[#0E5A3E] text-[#FAF7F0] font-bold'
                              : 'text-[#3B2E28] hover:text-[#1C1613]'
                          }`}
                        >
                          {sp === 'slow' ? 'بطيء جداً' : sp === 'normal' ? 'بطيء' : 'متوسط'}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setShowFullStaticInStage((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md bg-[#F8F2E4] hover:bg-[#E7DAC0] text-[#8B1522] border border-[#C9A227]/45 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{showFullStaticInStage ? 'العودة للعرض الصاعد' : 'عرض الكلمات ثابتة'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Spread */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Primary Traditional Calligraphic Lyrics Column (70% / 8 cols) */}
          <div className="lg:col-span-8 bg-[#FAF3E6] border border-[#C9A227]/45 rounded-xl shadow-md overflow-hidden">
            {/* Manuscript Header Controls */}
            <div className="px-6 py-4 bg-gradient-to-l from-[#0E5A3E]/10 via-[#EFE6D3] to-[#8B1522]/10 border-b border-[#C9A227]/35 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <MoroccanStarIcon className="w-5 h-5 text-[#0E5A3E]" />
                <span className="font-display text-xl font-bold text-[#1C1613]">
                  القصيدة الوطنية الكاملة — تنسيق المخطوط
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepStanza('prev')}
                  aria-label="المقطع السابق"
                  className="p-2 rounded-md border border-[#C9A227]/40 text-[#3B2E28] hover:bg-[#EFE6D2] transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-[#52453E] tabular-nums px-1">
                  المقطع {activeStanzaId} / {SAWT_AL_HASSAN_STANZAS.length}
                </span>
                <button
                  type="button"
                  onClick={() => handleStepStanza('next')}
                  aria-label="المقطع التالي"
                  className="p-2 rounded-md border border-[#C9A227]/40 text-[#3B2E28] hover:bg-[#EFE6D2] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyLyrics}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-md bg-[#0E5A3E] hover:bg-[#09442E] text-[#FAF7F0] transition-colors whitespace-nowrap shrink-0 cursor-pointer mr-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ الكلمات'}</span>
                </button>
              </div>
            </div>

            {/* Traditional Moroccan Framed Lyrics Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {SAWT_AL_HASSAN_STANZAS.map((stanza) => {
                const isActive = stanza.id === activeStanzaId;
                return (
                  <article
                    key={stanza.id}
                    onClick={() => setActiveStanzaId(stanza.id)}
                    className={`p-6 sm:p-8 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-b from-[#EFE4CC] to-[#FAF3E6] border-[#C9A227] shadow-sm'
                        : 'bg-[#FAF3E6] border-[#C9A227]/25 hover:border-[#C9A227]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-[#C9A227]/25">
                      <span className="text-xs font-semibold text-[#0E5A3E]">
                        0{stanza.id}. {stanza.sectionLabel}
                      </span>
                      {stanza.refrain && (
                        <span className="text-xs font-semibold text-[#8B1522]">
                          اللازمة الخالدة
                        </span>
                      )}
                    </div>

                    <div className="space-y-3 text-center">
                      {stanza.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className={`font-display leading-loose ${
                            line.includes('الله الله') || line.includes('الله اكبر')
                              ? 'text-2xl sm:text-3xl font-bold text-[#0E5A3E]'
                              : 'text-xl sm:text-2xl font-bold text-[#1C1613]'
                          }`}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Curatorial Context Sidebar (30% / 4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-7 bg-[#FAF3E6] border border-[#C9A227]/45 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1522]">
                <Flag className="w-4 h-4" />
                <span>بطاقة توثيقية</span>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#1C1613]">
                روح المسيرة الخضراء
              </h2>

              <p className="text-sm text-[#4A3E37] leading-loose">
                انبثقت أغنية «صوت الحسن ينادي» سنة 1975 لتكون اللسان الشعبي الصادق لنداء الملك الراحل الحسن الثاني، حيث لبى مئات الآلاف من المغاربة نداء الوطن بروح سلمية أبهرت العالم، متسلحين بالقرآن الكريم والعلم المغربي الأحمر المتوج بالنجمة الخضراء.
              </p>

              <div className="pt-4 border-t border-[#C9A227]/25 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#6F5D4E]">التاريخ المرجعي</span>
                  <span className="font-semibold text-[#1C1613] tabular-nums">6 نونبر 1975</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#6F5D4E]">عدد المتطوعين</span>
                  <span className="font-semibold text-[#0E5A3E] tabular-nums">350,000 متطوع</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#6F5D4E]">الدلالة الوطنية</span>
                  <span className="font-semibold text-[#8B1522]">استكمال الوحدة الترابية</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 bg-[#EAE0CA] text-[#1C1613] border border-[#C9A227]/55 rounded-xl space-y-4">
              <h3 className="font-display text-2xl font-bold text-[#8B1522]">
                من وثيقة الاستقلال إلى المسيرة الخضراء
              </h3>
              <p className="text-sm text-[#4A3E37] leading-relaxed">
                لم تكن المسيرة الخضراء إلا امتداداً متجدداً للميثاق الوطني الذي تأسس في ملحمة 11 يناير 1944 وعيد الاستقلال في 18 نونبر 1955.
              </p>
              <button
                type="button"
                onClick={onGoToMemory}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-bold rounded-md bg-[#8B1522] hover:bg-[#6E101B] text-[#FAF7F0] border border-[#C9A227]/40 transition-colors cursor-pointer"
              >
                استعراض تعريف عيد الاستقلال ←
              </button>
            </div>
          </aside>
        </div>

        <ZelligeDivider variant="light" />
      </section>
    </main>
  );
};
