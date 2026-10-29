import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../useLanguage';
import { navigationLinks } from '../data/siteData';

export default function Footer() {
  const { language, t } = useLanguage();
  return (
    <footer className="bg-sizzler-bg-dark text-white relative">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="header-logo-frame mb-6">
              <img
                src="/images/logo/sizzler-logo.jpg"
                alt="Sizzler"
                className="header-logo"
              />
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              {t.footer.summary}
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/962770034042"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-green-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="tel:0770034042"
                className="w-10 h-10 bg-white/10 hover:bg-sizzler-red rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
              <a
                href="mailto:Firas@abutawileh.com"
                className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">{t.footer.links}</h4>
            <ul className="space-y-3">
              {navigationLinks.map(({ labelKey, to }) => (
                <li key={labelKey}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-sizzler-red transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-sizzler-red rounded-full" />
                    {t.nav[labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-sizzler-red flex-shrink-0 mt-1" />
                <span>{language === 'ar' ? 'عمّان، الأردن' : 'Amman, Jordan'}</span>
              </li>
              <li>
                <a href="tel:0770034042" className="flex items-start gap-3 text-gray-400 hover:text-sizzler-red transition-colors">
                  <Phone size={20} className="text-sizzler-red flex-shrink-0 mt-1" />
                  <span dir="ltr">0770034042</span>
                </a>
              </li>
              <li>
                <a href="mailto:Firas@abutawileh.com" className="flex items-start gap-3 text-gray-400 hover:text-sizzler-red transition-colors">
                  <Mail size={20} className="text-sizzler-red flex-shrink-0 mt-1" />
                  <span>Firas@abutawileh.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sizzler. {t.footer.copyright}
          </p>
          <p className="text-gray-500 text-sm">
            {language === 'ar' ? 'سزلر... أجهزة أقوى و أوفر' : 'Sizzler... Stronger & Bigger Savings'} 🔴
          </p>
        </div>
      </div>

    </footer>
  );
}