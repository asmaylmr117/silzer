import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Truck, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../useLanguage';
import { Particles } from './Effects';
import { contactDetails, siteAssets, siteRoutes } from '../data/siteData';

export default function Hero() {
  const { language, t } = useLanguage();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-[#0c0d11] via-[#121319] to-[#0a0a0d] text-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 end-0 w-96 h-96 bg-red-600/15 rounded-full blur-3xl animate-drift" />
      <div className="pointer-events-none absolute bottom-0 start-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-drift" />
      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Column 1: Marketing Content & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Top Pill */}
            <div className="hero-in d1 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles size={15} className="text-red-400 shrink-0" />
              <span>
                {language === 'ar'
                  ? 'سزلر للأجهزة الكهربائية المنزلية · عمّان، الأردن'
                  : 'Sizzler Home Appliances · Amman, Jordan'}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-in d2 text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
              {t.hero.titleStart}{' '}
              <span className="shimmer-text text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-400">
                {t.hero.strong}
              </span>{' '}
              {t.hero.join}{' '}
              <span className="shimmer-text text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-400">
                {t.hero.strongEnd}
              </span>
            </h1>

            {/* Slogan Pill */}
            <p className="hero-in d3 text-lg sm:text-xl font-extrabold text-red-400/95 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>{language === 'ar' ? 'قيمة أكبر.. ومصاريف أقل!' : 'More Value.. Less Expenses!'}</span>
            </p>

            {/* Description */}
            <p className="hero-in d4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              {t.hero.description}
            </p>

            {/* CTAs */}
            <div className="hero-in d5 pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to={siteRoutes.products}
                className="shine bg-red-600 hover:bg-red-700 text-white font-extrabold px-7 py-3.5 rounded-full text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg shadow-red-600/30 flex items-center gap-2"
              >
                <span>{t.hero.primary}</span>
                <ArrowIcon size={18} />
              </Link>

              <a
                href="#about"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-7 py-3.5 rounded-full text-sm sm:text-base transition-colors backdrop-blur-xs"
              >
                {t.hero.secondary}
              </a>

              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pulse-ring bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold p-3.5 rounded-full transition-transform hover:scale-105 shadow-md"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>

            {/* 3 Quick Value Badges */}
            <div className="hero-in d6 pt-6 border-t border-gray-800/80 grid grid-cols-3 gap-2 sm:gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-bold">
                <ShieldCheck size={18} className="text-red-500 shrink-0" />
                <span>{language === 'ar' ? 'كفالة معتمدة' : 'Official Warranty'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-bold">
                <Zap size={18} className="text-red-500 shrink-0" />
                <span>{language === 'ar' ? 'توفير طاقة' : 'Energy Saving'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-bold">
                <Truck size={18} className="text-red-500 shrink-0" />
                <span>{language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Modern Product Showcase Card */}
          <div className="lg:col-span-5 hero-in d4" data-tilt>
            <div className="relative mx-auto max-w-md lg:max-w-none float-slow">
              {/* Card Ambient Glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-red-600/40 via-red-700/20 to-red-600/30 blur-xl opacity-75" />
              <div className="absolute -inset-[3px] rounded-3xl glow-ring" />
              <div className="absolute -top-4 end-4 z-20 float-slow-2 flex items-center gap-1.5 rounded-2xl bg-white px-3 py-2 text-xs font-extrabold text-gray-900 shadow-xl"><ShieldCheck size={14} className="text-red-600" />{language === 'ar' ? 'كفالة معتمدة' : 'Official Warranty'}</div>
              <div className="absolute top-1/2 -start-5 z-20 hidden sm:flex float-slow items-center gap-1.5 rounded-2xl bg-red-600 px-3 py-2 text-xs font-extrabold text-white shadow-xl"><Zap size={14} />{language === 'ar' ? 'توفير طاقة' : 'Energy Saving'}</div>

              {/* Showcase Frame */}
              <div className="relative rounded-3xl bg-gradient-to-b from-gray-800/80 via-gray-900/90 to-black p-3.5 sm:p-4 border border-gray-700/60 shadow-2xl backdrop-blur-md overflow-hidden group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#14151a] flex items-center justify-center">
                  <img
                    src={siteAssets.hero}
                    alt="Sizzler Appliances"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Bottom Card */}
                  <div className="absolute bottom-3 start-3 end-3 p-3.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-white text-xs font-bold flex items-center justify-between">
                    <div>
                      <span className="text-red-400 font-extrabold block text-sm">
                        {siteAssets.brandName}
                      </span>
                      <span className="text-gray-300 text-[11px]">
                        {language === 'ar' ? 'أقوى أجهزة منزلية متكاملة' : 'Complete Home Appliances'}
                      </span>
                    </div>
                    <a
                      href={contactDetails.phoneHref}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Phone size={12} />
                      <span dir="ltr">0770034042</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <a href="#about" className="scroll-cue hero-in d6 hidden lg:flex" aria-label={t.hero.scrollNext}><span /></a>
    </section>
  );
}
