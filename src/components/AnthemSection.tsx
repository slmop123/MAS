import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, BookOpen, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ANTHEM_STANZAS, HERO_PALACE_IMAGE } from '../data/moroccanHeritage';
import { AndalusianArchSilhouette, MoroccanStarIcon } from './MoroccanOrnaments';

interface AnthemSectionProps {
  petalsEnabled: boolean;
  onTogglePetals: () => void;
  onJumpToGallery: () => void;
}

type CrawlSpeed = 'slow' | 'normal' | 'fast';

const SPEED_DURATIONS: Record<CrawlSpeed, number> = {
  slow: 98,
  normal: 70,
  fast: 46,
};

export const AnthemSection: React.FC<AnthemSectionProps> = ({
  petalsEnabled,
  onTogglePetals,
  onJumpToGallery,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<CrawlSpeed>('normal');
  const [crawlKey, setCrawlKey] = useState(0);
  const [showFullStatic, setShowFullStatic] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioTimerRef = useRef<number | null>(null);

  const stopCeremonialAudio = () => {
    if (audioTimerRef.current !== null) {
      window.clearTimeout(audioTimerRef.current);
      audioTimerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setAudioPlaying(false);
  };

  const playCeremonialChordSequence = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      setAudioPlaying(true);

      const notes = [
        { freq: 293.66, dur: 0.45 },
        { freq: 349.23, dur: 0.45 },
        { freq: 440.0, dur: 0.7 },
        { freq: 392.0, dur: 0.4 },
        { freq: 440.0, dur: 0.4 },
        { freq: 523.25, dur: 0.85 },
        { freq: 440.0, dur: 0.45 },
        { freq: 392.0, dur: 0.45 },
        { freq: 349.23, dur: 0.6 },
        { freq: 329.63, dur: 0.45 },
        { freq: 293.66, dur: 1.0 },
      ];

      let currentTime = ctx.currentTime + 0.08;
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const harmonic = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.freq, currentTime);

        harmonic.type = 'sine';
        harmonic.frequency.setValueAtTime(n.freq * 2, currentTime);

        gain.gain.setValueAtTime(0.001, currentTime);
        gain.gain.exponentialRampToValueAtTime(0.09, currentTime + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, currentTime + n.dur);

        osc.connect(gain);
        harmonic.connect(gain);
        gain.connect(ctx.destination);

        osc.start(currentTime);
        harmonic.start(currentTime);
        osc.stop(currentTime + n.dur + 0.02);
        harmonic.stop(currentTime + n.dur + 0.02);

        currentTime += n.dur * 0.92;
      });

      const totalMs = (currentTime - ctx.currentTime) * 1000 + 200;
      audioTimerRef.current = window.setTimeout(() => {
        stopCeremonialAudio();
      }, totalMs);
    } catch {
      setAudioPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCeremonialAudio();
    };
  }, []);

  const handleRestart = () => {
    setCrawlKey((prev) => prev + 1);
    setIsPlaying(true);
  };

  const handleToggleAudio = () => {
    if (audioPlaying) {
      stopCeremonialAudio();
    } else {
      playCeremonialChordSequence();
    }
  };

  return (
    <section
      id="anthem-stage"
      className="relative bg-zellige-beige text-[#1C1613] overflow-hidden border-b border-[#C9A227]/35"
    >
      {/* Subtle Blended Andalusian Palace Photography over Warm Beige */}
      {!heroImgFailed && (
        <img
          src={HERO_PALACE_IMAGE}
          alt="ساحة قصر مغربي أندلسي مزخرف بالزليج والأقواس الذهبية"
          referrerPolicy="no-referrer"
          onError={() => setHeroImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover opacity-12 scale-105 pointer-events-none"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#F5EFE2]/92 via-[#EFE6D3]/82 to-[#F5EFE2]/95 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Andalusian Multifoil Arch Architectural Ornament */}
      <AndalusianArchSilhouette className="absolute top-0 inset-x-0 w-full h-28 sm:h-36 pointer-events-none opacity-75" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20">
        {/* Editorial Kicker & Headline */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold text-[#0E5A3E] tracking-wide mb-3">
            <span>المملكة المغربية</span>
            <span aria-hidden="true">·</span>
            <span>عيد الاستقلال المجيد 18 نونبر</span>
            <span aria-hidden="true">·</span>
            <span>النشيد الشريف</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-[#8B1522] leading-tight mb-4 [text-wrap:balance]">
            النشيد الوطني المغربي
          </h1>

          <p className="text-sm sm:text-base text-[#4A3E37] leading-relaxed max-w-2xl mx-auto">
            كلمات الشاعر علي الصقلي الحسيني، في عرض سينمائي متدرج يخلد معاني السيادة والوحدة والولاء الخالد لشعار المملكة: اللَّهُ، الوَطَنُ، المَلِكْ.
          </p>
        </div>

        {/* Beige Parchment Cinema Screen Frame with Moroccan Gold Trim */}
        <div className="relative mx-auto max-w-4xl rounded-xl border border-[#C9A227]/60 bg-gradient-to-b from-[#FBF6EA] via-[#F2E9D5] to-[#EAE0CA] shadow-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#C9A227]/35 bg-[#EFE6D3]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1522]">
              <MoroccanStarIcon className="w-4 h-4 text-[#0E5A3E]" />
              <span>منبت الأحرار — عرض التتر السينمائي</span>
            </div>
            <div className="text-xs font-medium text-[#5C4D42] tabular-nums">
              1956 · السيادة الوطنية
            </div>
          </div>

          {/* 3D Perspective Crawl Stage OR Static Full Text View */}
          {!showFullStatic ? (
            <div className="relative h-[420px] sm:h-[470px] w-full anthem-perspective-stage flex justify-center px-4 sm:px-10">
              {/* Top & Bottom Beige Horizon Fades */}
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
                      النشيد الوطني للمملكة المغربية
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#8B1522]">
                      مَنْبِتَ الأَحْرَارْ
                    </h2>
                  </div>

                  {ANTHEM_STANZAS.map((stanza) => (
                    <div key={stanza.id} className="space-y-3">
                      {stanza.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className={`font-display leading-relaxed ${
                            stanza.id === 5
                              ? 'text-2xl sm:text-4xl font-bold text-[#0E5A3E] tracking-wide'
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
            <div className="p-6 sm:p-10 max-h-[470px] overflow-y-auto bg-[#F8F2E4]">
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <div className="pb-4 border-b border-[#C9A227]/35">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#8B1522]">
                    النص الكامل للنشيد الوطني المغربي
                  </h2>
                  <p className="text-xs text-[#5C4D42] mt-1">
                    كلمات: علي الصقلي الحسيني · ألحان: ليو مورغان
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                  {ANTHEM_STANZAS.map((stanza) => (
                    <div
                      key={stanza.id}
                      className={`p-5 rounded-lg border border-[#C9A227]/35 bg-[#F2E9D5]/75 space-y-2 ${
                        stanza.id === 5 ? 'sm:col-span-2 bg-[#8B1522]/10 border-[#8B1522]/35' : ''
                      }`}
                    >
                      {stanza.lines.map((line, idx) => (
                        <p
                          key={idx}
                          className={`font-display text-xl sm:text-2xl font-bold leading-relaxed ${
                            stanza.id === 5 ? 'text-[#0E5A3E]' : 'text-[#8B1522]'
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
          )}

          {/* Interactive Theater Control Bar */}
          <div className="px-4 sm:px-6 py-4 border-t border-[#C9A227]/35 bg-[#EFE6D3] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {!showFullStatic && (
                <>
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-md bg-[#8B1522] hover:bg-[#6E101B] text-[#FAF7F0] border border-[#C9A227]/40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'إيقاف التمرير' : 'تشغيل التمرير'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md bg-[#F8F2E4] hover:bg-[#E7DAC0] text-[#3B2E28] border border-[#C9A227]/45 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة</span>
                  </button>

                  {/* Speed Segmented Control */}
                  <div className="inline-flex items-center p-1 rounded-md bg-[#E4D7BE] border border-[#C9A227]/40">
                    {(['slow', 'normal', 'fast'] as CrawlSpeed[]).map((sp) => (
                      <button
                        key={sp}
                        type="button"
                        onClick={() => setSpeed(sp)}
                        className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          speed === sp
                            ? 'bg-[#8B1522] text-[#FAF7F0] font-bold'
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
                onClick={() => setShowFullStatic((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md bg-[#F8F2E4] hover:bg-[#E7DAC0] text-[#8B1522] border border-[#C9A227]/45 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{showFullStatic ? 'العودة للعرض السينمائي' : 'النص الكامل الثابت'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleToggleAudio}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  audioPlaying
                    ? 'bg-[#0E5A3E] text-[#FAF7F0] border-[#0E5A3E]'
                    : 'bg-[#F8F2E4] text-[#3B2E28] border-[#C9A227]/45 hover:bg-[#E7DAC0]'
                }`}
              >
                {audioPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{audioPlaying ? 'إيقاف النغمة' : 'نغمة احتفالية'}</span>
              </button>

              <button
                type="button"
                onClick={onTogglePetals}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  petalsEnabled
                    ? 'bg-[#8B1522]/12 text-[#8B1522] border-[#8B1522]/40'
                    : 'bg-[#F8F2E4] text-[#5C4D42] border-[#C9A227]/35 hover:text-[#1C1613]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{petalsEnabled ? 'البتلات: مفعلة' : 'البتلات: متوقفة'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll down anchor cue to Royal Gallery */}
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={onJumpToGallery}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-[#8B1522] hover:text-[#0E5A3E] border-b border-[#C9A227]/60 hover:border-[#0E5A3E] transition-colors cursor-pointer"
          >
            <span>اكتشف المعرض الملكي للعرش العلوي</span>
            <span aria-hidden="true">↓</span>
          </button>
        </div>
      </div>
    </section>
  );
};
