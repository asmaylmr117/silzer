import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Eye, X, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../useLanguage';
import { allProductsCategoryId, contactDetails, productCatalog, productCategories, siteRoutes } from '../data/siteData';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(allProductsCategoryId);
  const [selectedId, setSelectedId] = useState(null);
  const [ref, isInView] = useInView({ threshold: 0, rootMargin: '100px' });
  const location = useLocation();
  const { language, t } = useLanguage();

  // If on the dedicated /products route, display content immediately without waiting for scroll
  const isStandalone = location.pathname === siteRoutes.products;
  const shouldShow = isStandalone || isInView;

  const products = useMemo(
    () => productCatalog.map((item) => ({ ...(t.productData[item.id] || {}), ...item })),
    [t.productData]
  );
  const categories = [
    { id: allProductsCategoryId, label: t.products.all },
    ...t.products.categories.map((label, index) => ({ id: productCategories[index], label })),
  ];
  const visibleProducts = activeCategory === allProductsCategoryId
    ? products
    : products.filter((product) => product.categoryId === activeCategory);
  const selectedProduct = products.find((product) => product.id === selectedId);

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedId(null);
    };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedProduct]);

  return (
    <section id="products" className="section-anchor relative overflow-hidden bg-sizzler-bg py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute end-[8%] top-14 h-52 w-52 rounded-full border border-sizzler-red/10" />
        <div className="absolute start-[5%] bottom-12 h-72 w-72 rounded-full border border-sizzler-gray/10" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto mb-9 max-w-3xl text-center sm:mb-11 ${shouldShow ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <span className="section-eyebrow">{t.products.eyebrow}</span>
          <h2 className="section-title">
            {t.products.title.split(t.products.highlight)[0]}
            <span className="text-sizzler-red">{t.products.highlight}</span>
            {t.products.title.split(t.products.highlight)[1]}
          </h2>
          <p className="mt-4 text-base leading-7 text-sizzler-gray-light sm:text-lg">
            {t.products.description}
          </p>
        </div>

        <div
          className={`mb-8 flex flex-wrap justify-center gap-2.5 sm:mb-10 ${shouldShow ? 'animate-fadeInUp delay-100' : 'opacity-0'}`}
          role="group"
          aria-label={t.products.filterLabel}
        >
          {categories.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveCategory(id)}
              aria-pressed={activeCategory === id}
              className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-5 cursor-pointer ${
                activeCategory === id
                  ? 'bg-sizzler-red text-white shadow-lg shadow-sizzler-red/20'
                  : 'bg-white text-sizzler-gray hover:bg-sizzler-red/10 hover:text-sizzler-red'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {visibleProducts.map((product, index) => (
            <article
              key={product.id}
              className={`product-card ${shouldShow ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: isStandalone ? `${Math.min(index, 6) * 0.05}s` : `${Math.min(index, 5) * 0.07}s` }}
            >
              <button
                type="button"
                className="product-image-button group relative block w-full overflow-hidden bg-[#f2efed] cursor-pointer"
                onClick={() => setSelectedId(product.id)}
                aria-label={`${t.products.quickView}: ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                  loading="lazy"
                />
                <span className="product-badge absolute top-3 rounded-full bg-sizzler-red px-3 py-1 text-xs font-bold text-white shadow">
                  {product.category}
                </span>
                <span className="product-quick-view absolute bottom-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-sizzler-gray-dark shadow-lg transition group-hover:bg-sizzler-red group-hover:text-white">
                  <Eye size={15} />
                  {t.products.quickView}
                </span>
              </button>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="text-lg font-extrabold leading-snug text-sizzler-gray-dark">
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-sizzler-gray-light">
                  {product.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(product.features || []).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-sizzler-bg px-2.5 py-1 text-[11px] font-semibold text-sizzler-gray"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(product.id)}
                  className="mt-5 inline-flex items-center gap-1 self-start text-sm font-extrabold text-sizzler-red transition hover:gap-2 cursor-pointer"
                >
                  {t.products.quickView}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Product Quick View Modal - Compact on small screens */}
      {selectedProduct && (
        <div
          className="product-modal fixed inset-0 z-[80] flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedId(null);
          }}
        >
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="relative grid max-h-[82vh] md:max-h-[90dvh] w-full max-w-sm sm:max-w-md md:max-w-4xl grid-cols-1 overflow-y-auto rounded-2xl md:rounded-3xl bg-white shadow-2xl md:grid-cols-2"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="modal-close absolute top-2.5 md:top-3 z-10 grid h-8 w-8 md:h-10 md:w-10 place-items-center rounded-full bg-white shadow-md transition hover:bg-sizzler-red hover:text-white cursor-pointer"
              aria-label={t.products.close}
            >
              <X size={18} />
            </button>

            {/* Modal Image */}
            <div className="product-modal-image bg-[#f2efed] flex items-center justify-center p-2 sm:p-4 md:p-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-contain max-h-[170px] sm:max-h-[220px] md:max-h-full"
              />
            </div>

            {/* Modal Info */}
            <div className="flex flex-col justify-between p-4 sm:p-6 md:p-8">
              <div>
                <span className="self-start rounded-full bg-sizzler-red/10 px-2.5 py-0.5 text-[11px] md:text-xs font-bold text-sizzler-red">
                  {selectedProduct.category}
                </span>
                <h3
                  id="product-modal-title"
                  className="mt-2 md:mt-4 text-base sm:text-xl md:text-2xl font-black text-sizzler-gray-dark leading-tight"
                >
                  {selectedProduct.name}
                </h3>
                <p className="mt-1.5 md:mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-sizzler-gray-light line-clamp-3 md:line-clamp-none">
                  {selectedProduct.description}
                </p>
                <div className="mt-3 md:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                  {(selectedProduct.features || []).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-sizzler-bg px-2.5 py-1 text-[11px] md:text-xs font-bold text-sizzler-gray"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 md:mt-6 pt-3 border-t border-gray-100">
                <a
                  href={contactDetails.phoneHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sizzler-red px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-extrabold text-white transition hover:bg-sizzler-red-dark shadow-sm"
                >
                  <Phone size={15} />
                  <span>{t.products.inquire} · </span>
                  <bdi dir="ltr">{t.contact.phoneValue}</bdi>
                </a>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
