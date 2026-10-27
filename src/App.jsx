import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { LanguageProvider } from './i18n';
import { useLanguage } from './useLanguage';
import { siteRoutes } from './data/siteData';

function RouteScroll() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);
  return null;
}

function HomePage() {
  return <>
    <Hero />
    <About />
    <Products />
    <WhyUs />
    <Contact />
  </>;
}

function ProductsPage() {
  const { t } = useLanguage();
  return <div className="standalone-page">
    <h1 className="sr-only">{t.products.eyebrow}</h1>
    <Products />
  </div>;
}

function ContactPage() {
  const { t } = useLanguage();
  return <div className="standalone-page">
    <h1 className="sr-only">{t.contact.eyebrow}</h1>
    <Contact />
  </div>;
}

function Site() {
  const { language, direction } = useLanguage();
  const location = useLocation();
  return (
    <div className={`site-shell min-h-screen bg-white font-['Somar','Somar_Sans',sans-serif] ${location.pathname === '/' ? '' : 'inner-page'}`} dir={direction} lang={language}>
      <Navbar />
      <RouteScroll />
      <main>
        <Routes>
          <Route path={siteRoutes.home} element={<HomePage />} />
          <Route path={siteRoutes.products} element={<ProductsPage />} />
          <Route path={siteRoutes.contact} element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return <LanguageProvider><BrowserRouter><Site /></BrowserRouter></LanguageProvider>;
}

