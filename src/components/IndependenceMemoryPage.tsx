import React from 'react';
import { ZelligeDivider } from './MoroccanOrnaments';

export const IndependenceMemoryPage: React.FC = () => {
  return (
    <main className="bg-zellige-subtle min-h-screen">
      {/* Warm Beige Editorial Header */}
      <section className="bg-zellige-beige text-[#1C1613] border-b border-[#C9A227]/40 py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0E5A3E] mb-3">
            <span>المملكة المغربية</span>
            <span aria-hidden="true">·</span>
            <span>18 نونبر 1955</span>
            <span aria-hidden="true">·</span>
            <span>18 Novembre 1955</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#8B1522] leading-tight mb-4 [text-wrap:balance]">
            ذاكرة عيد الاستقلال المغربي
          </h1>

          <p className="text-sm sm:text-lg text-[#4A3E37] leading-relaxed max-w-2xl mx-auto">
            التعريف التاريخي لعيد الاستقلال المجيد باللغتين العربية والفرنسية
          </p>
        </div>
      </section>

      {/* Bilingual Definition: Right in Arabic (dir=rtl) & Left in French (dir=ltr) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* RIGHT COLUMN: Arabic Definition (first child in dir="rtl" renders on the right) */}
          <article
            dir="rtl"
            lang="ar"
            className="bg-[#FAF3E6] border border-[#C9A227]/55 rounded-xl p-7 sm:p-10 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#C9A227]/35">
                <span className="text-xs font-bold text-[#0E5A3E]">
                  التعريف بالعربية
                </span>
                <span className="text-xs font-semibold text-[#6F5D4E] tabular-nums">
                  18 نونبر 1955
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#8B1522] leading-snug">
                عيد الاستقلال المجيد
              </h2>

              <p className="text-base text-[#2F2621] leading-loose">
                يُخلِّد الشعب المغربي في الثامن عشر من نونبر من كل سنة ذكرى عيد الاستقلال المجيد، وهو الحدث التاريخي المفصلي الذي أعلن فيه جلالة المغفور له الملك محمد الخامس سنة 1955، غداة عودته المظفرة من المنفى رفقة الأسرة الملكية، انتهاء عهد الحجر والحماية وبزوغ فجر الحرية والسيادة الوطنية.
              </p>

              <p className="text-base text-[#2F2621] leading-loose">
                يجسد هذا العيد أسمى صور التلاحم الوثيق بين العرش العلوي والشعب المغربي عبر عقود من المقاومة والكفاح الوطني من أجل التحرير والوحدة، والانتقال نحو مسيرة بناء المغرب الحديث وترسيخ مؤسساته الدستورية والتنموية.
              </p>
            </div>

            <blockquote className="pt-5 border-t border-[#C9A227]/35 text-center">
              <p className="font-display text-xl sm:text-2xl italic font-bold text-[#8B1522] leading-relaxed">
                «لقد خرجنا من الجهاد الأصغر إلى الجهاد الأكبر»
              </p>
              <footer className="text-xs font-semibold text-[#52453E] mt-2">
                المغفور له الملك محمد الخامس — 18 نونبر 1955
              </footer>
            </blockquote>
          </article>

          {/* LEFT COLUMN: French Definition (second child in dir="rtl" renders on the left) */}
          <article
            dir="ltr"
            lang="fr"
            className="bg-[#FAF3E6] border border-[#C9A227]/55 rounded-xl p-7 sm:p-10 shadow-sm flex flex-col justify-between space-y-6 text-left"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#C9A227]/35">
                <span className="text-xs font-bold text-[#0E5A3E]">
                  Présentation en Français
                </span>
                <span className="text-xs font-semibold text-[#6F5D4E] tabular-nums">
                  18 Novembre 1955
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#8B1522] leading-snug">
                La Fête de l'Indépendance du Maroc
              </h2>

              <p className="text-base text-[#2F2621] leading-relaxed">
                Célébrée chaque 18 novembre, la Fête de l'Indépendance commémore l'événement historique majeur de 1955 au cours duquel Feu Sa Majesté le Roi Mohammed V, de retour triomphal d'exil avec la Famille Royale, annonça solennellement la fin du Protectorat et l'avènement de la liberté et de la souveraineté nationale.
              </p>

              <p className="text-base text-[#2F2621] leading-relaxed">
                Cette journée emblématique incarne la symbiose indéfectible entre le Trône Alaouite et le Peuple marocain tout au long de la lutte pour la libération, marquant le passage vers l'édification d'un Maroc moderne, uni et souverain.
              </p>
            </div>

            <blockquote className="pt-5 border-t border-[#C9A227]/35 text-center">
              <p className="font-display text-xl sm:text-2xl italic font-bold text-[#8B1522] leading-relaxed">
                « Nous sommes sortis du petit Jihad vers le grand Jihad »
              </p>
              <footer className="text-xs font-semibold text-[#52453E] mt-2">
                Feu S.M. le Roi Mohammed V — 18 novembre 1955
              </footer>
            </blockquote>
          </article>
        </div>

        <ZelligeDivider variant="light" />
      </section>
    </main>
  );
};
