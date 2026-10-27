import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Eye, X } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../useLanguage';
import { allProductsCategoryId, contactDetails, productCatalog, productCategories } from '../data/siteData';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState(allProductsCategoryId);
  const [selectedId, setSelectedId] = useState(null);
  const [ref, isInView] = useInView();
  const { language, t } = useLanguage();
  const products = useMemo(
    () => productCatalog.map((item) => ({ ...(t.productData[item.id] || {}), ...item })),
    [t.productData]
  );
  const categories = [{ id: allProductsCategoryId, label: t.products.all }, ...t.products.categories.map((label, index) => ({ id: productCategories[index], label }))];
  const visibleProducts = activeCategory === allProductsCategoryId ? products : products.filter((product) => product.categoryId === activeCategory);
  const selectedProduct = products.find((product) => product.id === selectedId);

  useEffect(() => {
    if (!selectedProduct) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setSelectedId(null); };
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedProduct]);

  return (
    <section id="products" className="section-anchor relative overflow-hidden bg-sizzler-bg py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true"><div className="absolute end-[8%] top-14 h-52 w-52 rounded-full border border-sizzler-red/10" /><div className="absolute start-[5%] bottom-12 h-72 w-72 rounded-full border border-sizzler-gray/10" /></div>
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mx-auto mb-9 max-w-3xl text-center sm:mb-11 ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`}>
          <span className="section-eyebrow">{t.products.eyebrow}</span>
          <h2 className="section-title">{t.products.title.split(t.products.highlight)[0]}<span className="text-sizzler-red">{t.products.highlight}</span>{t.products.title.split(t.products.highlight)[1]}</h2>
          <p className="mt-4 text-base leading-7 text-sizzler-gray-light sm:text-lg">{t.products.description}</p>
        </div>

        <div className={`mb-8 flex flex-wrap justify-center gap-2.5 sm:mb-10 ${isInView ? 'animate-fadeInUp delay-100' : 'opacity-0'}`} role="group" aria-label={t.products.filterLabel}>
          {categories.map(({ id, label }) => <button key={id} type="button" onClick={() => setActiveCategory(id)} aria-pressed={activeCategory === id} className={`rounded-full px-4 py-2 text-sm font-bold transition sm:px-5 ${activeCategory === id ? 'bg-sizzler-red text-white shadow-lg shadow-sizzler-red/20' : 'bg-white text-sizzler-gray hover:bg-sizzler-red/10 hover:text-sizzler-red'}`}>{label}</button>)}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
          {visibleProducts.map((product, index) => <article key={product.id} className={`product-card ${isInView ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: `${Math.min(index, 5) * 0.07}s` }}>
            <button type="button" className="product-image-button group relative block w-full overflow-hidden bg-[#f2efed]" onClick={() => setSelectedId(product.id)} aria-label={`${t.products.quickView}: ${product.name}`}>
              <img src={product.image} alt={product.name} className="product-image w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]" loading="lazy" />
              <span className="product-badge absolute top-3 rounded-full bg-sizzler-red px-3 py-1 text-xs font-bold text-white shadow">{product.category}</span>
              <span className="product-quick-view absolute bottom-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-extrabold text-sizzler-gray-dark shadow-lg transition group-hover:bg-sizzler-red group-hover:text-white"><Eye size={15} />{t.products.quickView}</span>
            </button>
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="text-lg font-extrabold leading-snug text-sizzler-gray-dark">{product.name}</h3>
              <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-sizzler-gray-light">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">{(product.features || []).map((feature) => <span key={feature} className="rounded-full bg-sizzler-bg px-2.5 py-1 text-[11px] font-semibold text-sizzler-gray">{feature}</span>)}</div>
              <button type="button" onClick={() => setSelectedId(product.id)} className="mt-5 inline-flex items-center gap-1 self-start text-sm font-extrabold text-sizzler-red transition hover:gap-2">{t.products.quickView}<ArrowUpRight size={16} /></button>
            </div>
          </article>)}
        </div>
      </div>

      {selectedProduct && <div className="product-modal fixed inset-0 z-[60] flex items-center justify-center bg-black/65 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedId(null); }}>
        <article role="dialog" aria-modal="true" aria-labelledby="product-modal-title" className="relative grid max-h-[94dvh] w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-3xl bg-white shadow-2xl md:grid-cols-2">
          <button type="button" onClick={() => setSelectedId(null)} className="modal-close absolute top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg transition hover:bg-sizzler-red hover:text-white" aria-label={t.products.close}><X size={21} /></button>
          <div className="product-modal-image bg-[#f2efed]"><img src={selectedProduct.image} alt={selectedProduct.name} className="h-full w-full object-contain" /></div>
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <span className="self-start rounded-full bg-sizzler-red/10 px-3 py-1 text-xs font-bold text-sizzler-red">{selectedProduct.category}</span>
            <h3 id="product-modal-title" className="mt-4 text-2xl font-black text-sizzler-gray-dark sm:text-3xl">{selectedProduct.name}</h3>
            <p className="mt-3 text-base leading-7 text-sizzler-gray-light">{selectedProduct.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">{(selectedProduct.features || []).map((feature) => <span key={feature} className="rounded-full bg-sizzler-bg px-3 py-1.5 text-sm font-bold text-sizzler-gray">{feature}</span>)}</div>
            <a href={contactDetails.phoneHref} className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-sizzler-red px-5 py-3.5 font-extrabold text-white transition hover:bg-sizzler-red-dark"><span>{t.products.inquire}</span><bdi dir="ltr">{t.contact.phoneValue}</bdi></a>
          </div>
        </article>
      </div>}
    </section>
  );
}
