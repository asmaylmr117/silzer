import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../useLanguage';
import { contactDetails, logoHomeLink, navigationLinks, siteAssets } from '../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const links = navigationLinks.map(({ labelKey, to }) => ({ name: t.nav[labelKey], to }));
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-nav absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8" aria-label={t.nav.ariaLabel}>
        <Link to={logoHomeLink} onClick={closeMenu} className="header-logo-frame shrink-0" aria-label={siteAssets.brandName}>
          <img src={siteAssets.logo} alt={siteAssets.brandName} className="header-logo" />
        </Link>

        <div className="hidden items-center gap-5 xl:flex">
          {links.map((link) => <Link key={link.to} to={link.to} className="nav-link whitespace-nowrap text-sm font-bold transition-colors">{link.name}</Link>)}
          <a href={contactDetails.phoneHref} className="flex items-center gap-2 rounded-full bg-sizzler-red px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-sizzler-red-dark">
            <Phone size={15} /><span dir="ltr">{t.contact.phoneValue}</span>
          </a>
          <button type="button" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="language-toggle rounded-full border border-white/60 px-3 py-2 text-sm font-extrabold transition hover:bg-white/15" aria-label={t.nav.switchLanguage}>
            {t.nav.languageButtonLabel}
          </button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <button type="button" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="language-toggle rounded-full border border-white/60 px-3 py-2 text-sm font-extrabold" aria-label={t.nav.switchLanguage}>{t.nav.languageButtonLabel}</button>
          <button type="button" onClick={() => setIsOpen((open) => !open)} className="menu-toggle rounded-xl p-2" aria-expanded={isOpen} aria-label={isOpen ? t.nav.closeMenu : t.nav.openMenu}>
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </nav>

      {isOpen && <div className="mobile-menu absolute inset-x-4 top-[calc(100%-2px)] rounded-2xl p-4 shadow-2xl xl:hidden sm:inset-x-6">
        <div className="grid gap-1">
          {links.map((link) => <Link key={link.to} to={link.to} onClick={closeMenu} className="rounded-xl px-4 py-3 font-bold transition hover:bg-sizzler-red/10 hover:text-sizzler-red">{link.name}</Link>)}
          <a href={contactDetails.phoneHref} onClick={closeMenu} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-sizzler-red px-4 py-3 font-bold text-white"><Phone size={16} /><span>{t.nav.call} · <bdi>{t.contact.phoneValue}</bdi></span></a>
        </div>
      </div>}
    </header>
  );
}
