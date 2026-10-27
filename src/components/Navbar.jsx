import { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../useLanguage';
import { contactDetails, logoHomeLink, navigationLinks, siteAssets } from '../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const links = navigationLinks.map(({ labelKey, to }) => ({ name: t.nav[labelKey], to }));
  const closeMenu = () => setIsOpen(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  const ArrowIcon = language === 'ar' ? ChevronLeft : ChevronRight;
  const drawerTransform = isOpen
    ? 'translate-x-0'
    : language === 'ar'
    ? 'translate-x-full'
    : '-translate-x-full';

  return (
    <>
      <header className="site-nav absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8" aria-label={t.nav.ariaLabel}>
          <Link to={logoHomeLink} onClick={closeMenu} className="header-logo-frame shrink-0" aria-label={siteAssets.brandName}>
            <img src={siteAssets.logo} alt={siteAssets.brandName} className="header-logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 xl:flex">
            {links.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link whitespace-nowrap text-sm font-bold transition-colors">
                {link.name}
              </Link>
            ))}
            <a href={contactDetails.phoneHref} className="flex items-center gap-2 rounded-full bg-sizzler-red px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-sizzler-red-dark">
              <Phone size={15} /><span dir="ltr">{t.contact.phoneValue}</span>
            </a>
            <button type="button" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="language-toggle rounded-full border border-white/60 px-3 py-2 text-sm font-extrabold transition hover:bg-white/15 cursor-pointer" aria-label={t.nav.switchLanguage}>
              {t.nav.languageButtonLabel}
            </button>
          </div>

          {/* Mobile Header Buttons */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="language-toggle rounded-full border border-white/60 px-2.5 py-1.5 text-xs font-extrabold cursor-pointer"
              aria-label={t.nav.switchLanguage}
            >
              {t.nav.languageButtonLabel}
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="menu-toggle rounded-xl p-2 cursor-pointer"
              aria-expanded={isOpen}
              aria-label={t.nav.openMenu}
            >
              <Menu size={26} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Side Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs transition-opacity duration-300 xl:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Side Drawer Panel (Slides in from the side) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.openMenu}
        className={`fixed inset-y-0 start-0 z-[70] w-[82vw] max-w-[320px] bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out xl:hidden ${drawerTransform}`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <Link to={logoHomeLink} onClick={closeMenu} className="header-logo-frame" style={{ width: '150px', height: '46px' }}>
            <img src={siteAssets.logo} alt={siteAssets.brandName} className="header-logo" />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-sizzler-red hover:text-white flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            aria-label={t.nav.closeMenu}
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sizzler-gray-dark hover:bg-sizzler-red/10 hover:text-sizzler-red transition-all"
            >
              <span>{link.name}</span>
              <ArrowIcon size={16} className="text-gray-400" />
            </Link>
          ))}

          {/* Language Switcher inside Drawer */}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => {
                setLanguage(language === 'ar' ? 'en' : 'ar');
                closeMenu();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-extrabold border border-gray-200 text-gray-700 hover:border-sizzler-red hover:text-sizzler-red transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-sizzler-red" />
                <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
              </div>
              <span className="text-[11px] font-bold text-gray-400">
                {t.nav.switchLanguage}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2.5 bg-gray-50/80">
          <a
            href={contactDetails.phoneHref}
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-sizzler-red px-4 py-3 text-sm font-extrabold text-white shadow-md hover:bg-sizzler-red-dark transition-colors"
          >
            <Phone size={16} />
            <span>{t.nav.call} · <bdi dir="ltr">{t.contact.phoneValue}</bdi></span>
          </a>

          <a
            href={contactDetails.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-extrabold text-white shadow-md hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle size={16} />
            <span>{language === 'ar' ? 'واتساب مباشر' : 'WhatsApp'}</span>
          </a>

          <p className="text-[11px] text-center text-gray-400 pt-1 font-medium">
            {language === 'ar' ? 'سزلر... أجهزة أقوى و أوفر · عمّان' : 'Sizzler... Stronger & Bigger Savings · Amman'}
          </p>
        </div>
      </aside>
    </>
  );
}
