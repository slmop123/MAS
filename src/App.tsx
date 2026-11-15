/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { RosePetalsCanvas } from './components/RosePetalsCanvas';
import { AnthemSection } from './components/AnthemSection';
import { RoyalGallery } from './components/RoyalGallery';
import { SawtAlHassanPage } from './components/SawtAlHassanPage';
import { IndependenceMemoryPage } from './components/IndependenceMemoryPage';
import { MoroccanStarIcon } from './components/MoroccanOrnaments';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('anthem');
  const [petalsEnabled, setPetalsEnabled] = useState<boolean>(true);

  const handleNavigate = (view: ActiveView, anchorId?: string) => {
    setActiveView(view);

    window.requestAnimationFrame(() => {
      if (anchorId) {
        window.setTimeout(() => {
          const el = document.getElementById(anchorId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-[#F5EFE2] text-[#1C1613] relative">
      {/* Persistent Calm Crimson & Emerald Rose Petals */}
      <RosePetalsCanvas enabled={petalsEnabled} />

      {/* 3-Zone Top Navigation Bar */}
      <Navbar activeView={activeView} onNavigate={handleNavigate} />

      {/* Active View Content */}
      <div className="flex-1">
        {activeView === 'anthem' && (
          <>
            <AnthemSection
              petalsEnabled={petalsEnabled}
              onTogglePetals={() => setPetalsEnabled((prev) => !prev)}
              onJumpToGallery={() => handleNavigate('anthem', 'royal-gallery')}
            />
            <RoyalGallery />
          </>
        )}

        {activeView === 'sawt-al-hassan' && (
          <SawtAlHassanPage
            onGoToMemory={() => handleNavigate('memory-document')}
          />
        )}

        {activeView === 'memory-document' && <IndependenceMemoryPage />}
      </div>

      {/* Dignified Archival Beige Footer */}
      <footer className="bg-[#EAE0CA] text-[#2D241E] border-t border-[#C9A227]/45 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <MoroccanStarIcon className="w-6 h-6 text-[#0E5A3E]" />
            <div>
              <p className="font-display text-lg font-bold text-[#8B1522]">
                ذكرى عيد الاستقلال المغربي المجيد
              </p>
              <p className="text-xs text-[#5A4B40] font-semibold">
                اللَّهُ · الوَطَنُ · المَلِكْ
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => handleNavigate('anthem', 'anthem-stage')}
              className="hover:text-[#8B1522] transition-colors cursor-pointer"
            >
              النشيد الوطني
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('anthem', 'royal-gallery')}
              className="hover:text-[#8B1522] transition-colors cursor-pointer"
            >
              المعرض الملكي
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('sawt-al-hassan')}
              className="hover:text-[#0E5A3E] transition-colors cursor-pointer"
            >
              صوت الحسن ينادي
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('memory-document')}
              className="hover:text-[#8B1522] transition-colors cursor-pointer"
            >
              ذاكرة الاستقلال
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
